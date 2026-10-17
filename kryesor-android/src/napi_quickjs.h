// napi_quickjs.h - nenseti i vogel i Node-API (Napi::) mbi QuickJS.
//
// Qellimi: main.cpp i eaglegui (shtojca Node) te ndertohet per Android PA e
// rishkruar logjiken e widget-eve. Implementon vetem ate pjese te Napi:: qe
// perdor main.cpp: Env, Value/String/Number/Boolean/Object/Array/Function/
// Buffer<T>, FunctionReference, Persistent, CallbackInfo, ObjectWrap<T> me
// DefineClass/InstanceMethod, Error/TypeError, HandleScope.
//
// Pranon QuickJS-ng (rekomandohet) dhe QuickJS te Bellard.

#pragma once

#include "quickjs.h"

#include <cstdint>
#include <cstdio>
#include <cstring>
#include <functional>
#include <memory>
#include <string>
#include <utility>
#include <vector>

#if defined(QJS_VERSION_MAJOR)  // quickjs-ng
#define EAGLE_NEW_CLASS_ID(rt, idp) JS_NewClassID((rt), (idp))
#else                           // quickjs (Bellard)
#define EAGLE_NEW_CLASS_ID(rt, idp) JS_NewClassID((idp))
#endif

namespace Napi {

class Env;
class Value;
class String;
class Number;
class Boolean;
class Object;
class Array;
class Function;
class CallbackInfo;

namespace detail {
inline bool& threw() { static bool t = false; return t; }
inline int& depth() { static int d = 0; return d; }
inline std::function<void(const std::string&)>& logger() {
  static std::function<void(const std::string&)> f = [](const std::string& s) {
    std::fprintf(stderr, "%s\n", s.c_str());
  };
  return f;
}
inline std::string toStd(JSContext* ctx, JSValueConst v) {
  size_t n = 0;
  const char* s = JS_ToCStringLen(ctx, &n, v);
  std::string r = s ? std::string(s, n) : std::string();
  if (s) JS_FreeCString(ctx, s);
  return r;
}
inline void clearException(JSContext* ctx) { JS_FreeValue(ctx, JS_GetException(ctx)); }
inline std::string describe(JSContext* ctx, JSValueConst ex) {
  std::string r = toStd(ctx, ex);
  JSValue st = JS_GetPropertyStr(ctx, ex, "stack");
  if (!JS_IsUndefined(st)) {
    const std::string s = toStd(ctx, st);
    if (!s.empty()) r += "\n" + s;
  }
  JS_FreeValue(ctx, st);
  return r;
}
// Ekzekuton detyrat (Promise) pasi te perfundoje JS-ja e nivelit te siperm.
inline void runJobs(JSContext* ctx) {
  if (depth() > 0) return;
  JSContext* c1 = nullptr;
  int r;
  while ((r = JS_ExecutePendingJob(JS_GetRuntime(ctx), &c1)) > 0) {}
  if (r < 0) {
    JSValue ex = JS_GetException(c1 ? c1 : ctx);
    logger()("Gabim ne detyre asinkrone: " + describe(ctx, ex));
    JS_FreeValue(ctx, ex);
  }
}
}  // namespace detail

// ---------------------------------------------------------------- Env
class Env {
 public:
  Env() : ctx_(nullptr) {}
  explicit Env(JSContext* ctx) : ctx_(ctx) {}
  JSContext* ctx() const { return ctx_; }
  inline Napi::Value Undefined() const;
  inline Napi::Value Null() const;

 private:
  JSContext* ctx_;
};

// ---------------------------------------------------------------- Value
class Value {
 public:
  Value() : ctx_(nullptr), v_(JS_UNDEFINED) {}
  // dup=true: numeron nje reference te re; dup=false: merr pronesine e vleres.
  Value(JSContext* ctx, JSValueConst v, bool dup = true)
      : ctx_(ctx), v_(dup && ctx ? JS_DupValue(ctx, v) : v) {}
  Value(const Value& o)
      : ctx_(o.ctx_), v_(o.ctx_ ? JS_DupValue(o.ctx_, o.v_) : o.v_) {}
  Value(Value&& o) noexcept : ctx_(o.ctx_), v_(o.v_), owned_(o.owned_) {
    o.ctx_ = nullptr;
    o.v_ = JS_UNDEFINED;
  }
  Value& operator=(const Value& o) {
    if (this != &o) {
      Value tmp(o);
      swap(tmp);
    }
    return *this;
  }
  Value& operator=(Value&& o) noexcept {
    if (this != &o) {
      Value tmp(std::move(o));
      swap(tmp);
    }
    return *this;
  }
  ~Value() {
    if (ctx_ && owned_) JS_FreeValue(ctx_, v_);
  }

  JSContext* ctx() const { return ctx_; }
  JSValueConst raw() const { return v_; }
  Napi::Env Env() const { return Napi::Env(ctx_); }
  // Perdoret per objekte globale qe nuk duhen çliruar kurrë (shih SuppressDestruct).
  void leak() { owned_ = false; }

  bool IsUndefined() const { return JS_IsUndefined(v_); }
  bool IsNull() const { return JS_IsNull(v_); }
  bool IsString() const { return JS_IsString(v_); }
  bool IsNumber() const { return JS_IsNumber(v_); }
  bool IsObject() const { return JS_IsObject(v_); }
  bool IsFunction() const { return ctx_ && JS_IsFunction(ctx_, v_); }
  inline bool IsArray() const;
  inline bool IsBuffer() const;

  template <class T>
  T As() const { return T(ctx_, v_, true); }

  inline Napi::Boolean ToBoolean() const;
  inline Napi::String ToString() const;

 protected:
  void swap(Value& o) {
    std::swap(ctx_, o.ctx_);
    std::swap(v_, o.v_);
    std::swap(owned_, o.owned_);
  }
  JSContext* ctx_;
  JSValue v_;
  bool owned_ = true;
};

inline Napi::Value Env::Undefined() const { return Napi::Value(ctx_, JS_UNDEFINED, false); }
inline Napi::Value Env::Null() const { return Napi::Value(ctx_, JS_NULL, false); }

#define EAGLE_DERIVED(Name)                                                   \
  Name() = default;                                                           \
  Name(JSContext* c, JSValueConst v, bool dup = true) : Napi::Value(c, v, dup) {}

class String : public Napi::Value {
 public:
  EAGLE_DERIVED(String)
  static String New(Napi::Env env, const char* s, size_t len) {
    return String(env.ctx(), JS_NewStringLen(env.ctx(), s, len), false);
  }
  static String New(Napi::Env env, const std::string& s) { return New(env, s.data(), s.size()); }
  std::string Utf8Value() const { return detail::toStd(ctx_, v_); }
};

class Number : public Napi::Value {
 public:
  EAGLE_DERIVED(Number)
  static Number New(Napi::Env env, double d) {
    return Number(env.ctx(), JS_NewFloat64(env.ctx(), d), false);
  }
  int32_t Int32Value() const {
    int32_t r = 0;
    JS_ToInt32(ctx_, &r, v_);
    return r;
  }
  double DoubleValue() const {
    double r = 0;
    JS_ToFloat64(ctx_, &r, v_);
    return r;
  }
};

class Boolean : public Napi::Value {
 public:
  EAGLE_DERIVED(Boolean)
  static Boolean New(Napi::Env env, bool b) {
    return Boolean(env.ctx(), JS_NewBool(env.ctx(), b), false);
  }
  bool Value() const { return JS_ToBool(ctx_, v_) != 0; }
};

inline Napi::Boolean Value::ToBoolean() const {
  return Napi::Boolean(ctx_, JS_NewBool(ctx_, JS_ToBool(ctx_, v_) != 0), false);
}
inline Napi::String Value::ToString() const {
  return Napi::String(ctx_, JS_ToString(ctx_, v_), false);
}

class Function : public Napi::Value {
 public:
  EAGLE_DERIVED(Function)
  using Native = Napi::Value (*)(const CallbackInfo&);

  inline static Function New(Napi::Env env, Native fn, const char* name = "");

  Napi::Value Call(const std::vector<Napi::Value>& args) const {
    std::vector<JSValue> argv;
    argv.reserve(args.size());
    for (const auto& a : args) argv.push_back(a.raw());
    JSValue r = JS_Call(ctx_, v_, JS_UNDEFINED, static_cast<int>(argv.size()), argv.data());
    if (JS_IsException(r)) {
      JSValue ex = JS_GetException(ctx_);
      detail::logger()("Gabim ne callback JS: " + detail::describe(ctx_, ex));
      JS_FreeValue(ctx_, ex);
      r = JS_UNDEFINED;
    }
    Napi::Value out(ctx_, r, false);
    detail::runJobs(ctx_);
    return out;
  }
};

class FunctionReference {
 public:
  FunctionReference() = default;
  explicit FunctionReference(const Function& f) : f_(f) {}
  Function Value() const { return f_; }
  Napi::Value Call(const std::vector<Napi::Value>& args) const { return f_.Call(args); }
  void SuppressDestruct() { f_.leak(); }

 private:
  Function f_;
};

inline FunctionReference Persistent(const Function& f) { return FunctionReference(f); }

class Object : public Napi::Value {
 public:
  EAGLE_DERIVED(Object)
  static Object New(Napi::Env env) { return Object(env.ctx(), JS_NewObject(env.ctx()), false); }
  void Set(const char* key, const Napi::Value& v) {
    JS_SetPropertyStr(ctx_, v_, key, JS_DupValue(ctx_, v.raw()));
  }
  Napi::Value Get(const char* key) const {
    return Napi::Value(ctx_, JS_GetPropertyStr(ctx_, v_, key), false);
  }
  bool InstanceOf(const Function& f) const { return JS_IsInstanceOf(ctx_, v_, f.raw()) > 0; }
};

class Array : public Napi::Object {
 public:
  Array() = default;
  Array(JSContext* c, JSValueConst v, bool dup = true) : Napi::Object(c, v, dup) {}
  uint32_t Length() const {
    return static_cast<uint32_t>(Get("length").As<Number>().Int32Value());
  }
  Napi::Value Get(uint32_t i) const {
    return Napi::Value(ctx_, JS_GetPropertyUint32(ctx_, v_, i), false);
  }
  using Napi::Object::Get;
};

inline bool Value::IsArray() const {
  if (!IsObject() || IsFunction()) return false;
  JSValue l = JS_GetPropertyStr(ctx_, v_, "length");
  const bool ok = JS_IsNumber(l);
  JS_FreeValue(ctx_, l);
  return ok;
}

template <class T>
class Buffer : public Napi::Value {
 public:
  Buffer() = default;
  Buffer(JSContext* c, JSValueConst v, bool dup = true) : Napi::Value(c, v, dup) { resolve(); }
  T* Data() const { return reinterpret_cast<T*>(data_); }
  size_t Length() const { return len_ / sizeof(T); }
  bool Valid() const { return valid_; }

 private:
  void resolve() {
    if (!ctx_ || !JS_IsObject(v_)) return;
    size_t off = 0, len = 0, bpe = 0;
    JSValue ab = JS_GetTypedArrayBuffer(ctx_, v_, &off, &len, &bpe);
    if (!JS_IsException(ab)) {
      size_t sz = 0;
      uint8_t* p = JS_GetArrayBuffer(ctx_, &sz, ab);
      JS_FreeValue(ctx_, ab);
      if (p) {
        data_ = p + off;
        len_ = len;
        valid_ = true;
      } else {
        detail::clearException(ctx_);
      }
      return;
    }
    detail::clearException(ctx_);
    size_t sz = 0;
    uint8_t* p = JS_GetArrayBuffer(ctx_, &sz, v_);
    if (p) {
      data_ = p;
      len_ = sz;
      valid_ = true;
    } else {
      detail::clearException(ctx_);
    }
  }
  uint8_t* data_ = nullptr;
  size_t len_ = 0;
  bool valid_ = false;
};

inline bool Value::IsBuffer() const { return As<Buffer<uint8_t>>().Valid(); }

// ---------------------------------------------------------------- CallbackInfo
class CallbackInfo {
 public:
  CallbackInfo(Napi::Env env, int argc, JSValueConst* argv) : env_(env), argc_(argc), argv_(argv) {}
  Napi::Env Env() const { return env_; }
  size_t Length() const { return static_cast<size_t>(argc_); }
  Napi::Value operator[](size_t i) const {
    if (i >= static_cast<size_t>(argc_)) return env_.Undefined();
    return Napi::Value(env_.ctx(), argv_[i], true);
  }

 private:
  Napi::Env env_;
  int argc_;
  JSValueConst* argv_;
};

namespace detail {
inline std::vector<Function::Native>& natives() {
  static std::vector<Function::Native> v;
  return v;
}
inline JSValue nativeTrampoline(JSContext* ctx, JSValueConst, int argc, JSValueConst* argv, int magic) {
  CallbackInfo info(Env(ctx), argc, argv);
  threw() = false;
  ++depth();
  Napi::Value r = natives()[static_cast<size_t>(magic)](info);
  --depth();
  if (threw()) {
    threw() = false;
    return JS_EXCEPTION;
  }
  return JS_DupValue(ctx, r.raw());
}
}  // namespace detail

inline Function Function::New(Napi::Env env, Native fn, const char* name) {
  detail::natives().push_back(fn);
  const int idx = static_cast<int>(detail::natives().size() - 1);
  return Function(env.ctx(),
                  JS_NewCFunctionMagic(env.ctx(), &detail::nativeTrampoline, name, 0,
                                       JS_CFUNC_generic_magic, idx),
                  false);
}

// ---------------------------------------------------------------- Error
class Error {
 public:
  static Error New(Napi::Env env, const char* msg) { return Error(env, msg, false); }
  void ThrowAsJavaScriptException() const {
    detail::threw() = true;
    if (type_) JS_ThrowTypeError(env_.ctx(), "%s", msg_.c_str());
    else JS_ThrowInternalError(env_.ctx(), "%s", msg_.c_str());
  }

 protected:
  Error(Napi::Env env, const char* msg, bool type) : env_(env), msg_(msg), type_(type) {}
  Napi::Env env_;
  std::string msg_;
  bool type_;
};
class TypeError : public Error {
 public:
  static TypeError New(Napi::Env env, const char* msg) { return TypeError(env, msg); }

 private:
  TypeError(Napi::Env env, const char* msg) : Error(env, msg, true) {}
};

class HandleScope {
 public:
  explicit HandleScope(Napi::Env) {}
};

// ---------------------------------------------------------------- ObjectWrap
template <class T>
class ObjectWrap {
 public:
  explicit ObjectWrap(const CallbackInfo&) {}
  virtual ~ObjectWrap() = default;

  static T* Unwrap(Object o) { return static_cast<T*>(JS_GetOpaque(o.raw(), classId())); }

 protected:
  struct PropertyDescriptor {
    std::string name;
    size_t index;
  };
  using MethodFn = std::function<Napi::Value(T*, const CallbackInfo&)>;

  template <class M>
  static PropertyDescriptor InstanceMethod(const char* name, M m, int /*atribute*/) {
    methods().push_back([m](T* self, const CallbackInfo& i) { return (self->*m)(i); });
    return PropertyDescriptor{name, methods().size() - 1};
  }

  static Function DefineClass(Napi::Env env, const char* name, std::vector<PropertyDescriptor> props) {
    JSContext* ctx = env.ctx();
    JSRuntime* rt = JS_GetRuntime(ctx);
    if (!classId()) {
      EAGLE_NEW_CLASS_ID(rt, &classId());
      static std::string emriKlases;
      emriKlases = name;
      JSClassDef def;
      std::memset(&def, 0, sizeof(def));
      def.class_name = emriKlases.c_str();
      def.finalizer = &ObjectWrap::finalizer;
      JS_NewClass(rt, classId(), &def);
    }
    JSValue proto = JS_NewObject(ctx);
    for (const auto& p : props) {
      JS_SetPropertyStr(ctx, proto, p.name.c_str(),
                        JS_NewCFunctionMagic(ctx, &ObjectWrap::trampoline, p.name.c_str(), 0,
                                             JS_CFUNC_generic_magic, static_cast<int>(p.index)));
    }
    JSValue ctor = JS_NewCFunction2(ctx, &ObjectWrap::construct, name, 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, ctor, proto);
    JS_SetClassProto(ctx, classId(), proto);  // merr pronesine e proto
    return Function(ctx, ctor, false);
  }

 private:
  static JSClassID& classId() {
    static JSClassID id = 0;
    return id;
  }
  static std::vector<MethodFn>& methods() {
    static std::vector<MethodFn> v;
    return v;
  }
  static void finalizer(JSRuntime*, JSValue val) {
    delete static_cast<T*>(JS_GetOpaque(val, classId()));
  }
  static JSValue trampoline(JSContext* ctx, JSValueConst thisv, int argc, JSValueConst* argv, int magic) {
    T* self = static_cast<T*>(JS_GetOpaque2(ctx, thisv, classId()));
    if (!self) return JS_EXCEPTION;
    CallbackInfo info(Env(ctx), argc, argv);
    detail::threw() = false;
    ++detail::depth();
    Napi::Value r = methods()[static_cast<size_t>(magic)](self, info);
    --detail::depth();
    if (detail::threw()) {
      detail::threw() = false;
      return JS_EXCEPTION;
    }
    return JS_DupValue(ctx, r.raw());
  }
  static JSValue construct(JSContext* ctx, JSValueConst newTarget, int argc, JSValueConst* argv) {
    JSValue proto = JS_GetPropertyStr(ctx, newTarget, "prototype");
    JSValue obj = JS_NewObjectProtoClass(ctx, proto, classId());
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj)) return obj;
    CallbackInfo info(Env(ctx), argc, argv);
    detail::threw() = false;
    ++detail::depth();
    T* self = new T(info);
    --detail::depth();
    JS_SetOpaque(obj, self);  // finalizer-i e fshin kur objekti çlirohet
    if (detail::threw()) {
      detail::threw() = false;
      JS_FreeValue(ctx, obj);
      return JS_EXCEPTION;
    }
    return obj;
  }
};

}  // namespace Napi

// Aliase te nivelit global qe perdor main.cpp.
using napi_value = Napi::Value;
enum napi_property_attributes { napi_default_method = 0 };
