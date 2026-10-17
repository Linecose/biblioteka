// host.cpp - aplikacioni Qt per Android qe ekzekuton Eagle Script permes QuickJS.
//
// Rrjedha:
//   QApplication  ->  QuickJS (runtime + context)
//     -> prelude (console, process)           [kodi me poshte]
//     -> __nativ = eaglegui (Elementi, fillo, mesazh, pyet, zgjidhSkedar)
//     -> :/gui_mobile.js  (gui.js pa Node: krijo_dritare, buton_i_ri, ... globale)
//     -> :/bundle.js      (skriptet .es te perkthyera, me perfshi() te brendshem)
//   app.exec()   <- cikli i ngjarjeve e zoteron Qt (JS nuk e "pompon" me)
//
// Me qellim NUK therrasim JS_FreeContext/JS_FreeRuntime ne dalje: callback-et JS
// jetojne brenda objekteve Qt qe shkaterrohen pas main(); procesi mbyllet ne cdo rast.

#include <QApplication>
#include <QByteArray>
#include <QDebug>
#include <QFile>
#include <QHash>
#include <QMessageBox>
#include <QTimer>

#include <algorithm>
#include <memory>

#include "napi_quickjs.h"

Napi::Object EagleGuiInit(Napi::Env env, Napi::Object exports);

namespace {

JSContext* g_ctx = nullptr;

// ---------------------------------------------------------------- __print(niveli, tekst)
Napi::Value Printo(const Napi::CallbackInfo& info) {
  const int niveli = info.Length() > 0 ? info[0].As<Napi::Number>().Int32Value() : 0;
  const QString tekst = QString::fromUtf8(info.Length() > 1 ? info[1].ToString().Utf8Value().c_str() : "");
  if (niveli >= 2) qCritical().noquote() << tekst;
  else if (niveli == 1) qWarning().noquote() << tekst;
  else qInfo().noquote() << tekst;
  return info.Env().Undefined();
}

// ---------------------------------------------------------------- kohematuesit
QHash<int, QTimer*> g_kohematuesit;
int g_idTjeter = 0;

Napi::Value NisKohematues(const Napi::CallbackInfo& info, bool perseritet) {
  Napi::Env env = info.Env();
  if (info.Length() < 1 || !info[0].IsFunction()) {
    Napi::TypeError::New(env, "Pritej funksion (callback).").ThrowAsJavaScriptException();
    return env.Undefined();
  }
  const int ms = (info.Length() > 1 && info[1].IsNumber())
                     ? std::max(0, info[1].As<Napi::Number>().Int32Value()) : 0;
  auto ref = std::make_shared<Napi::FunctionReference>(Napi::Persistent(info[0].As<Napi::Function>()));
  const int id = ++g_idTjeter;
  auto* t = new QTimer(qApp);
  t->setSingleShot(!perseritet);
  g_kohematuesit.insert(id, t);
  QObject::connect(t, &QTimer::timeout, t, [ref, id, t, perseritet]() {
    ref->Call({});
    if (!perseritet && g_kohematuesit.contains(id)) {  // mund te jete pastruar brenda callback-ut
      g_kohematuesit.remove(id);
      t->deleteLater();
    }
  });
  t->start(ms);
  return Napi::Number::New(env, id);
}

Napi::Value SetTimeoutJS(const Napi::CallbackInfo& info) { return NisKohematues(info, false); }
Napi::Value SetIntervalJS(const Napi::CallbackInfo& info) { return NisKohematues(info, true); }

Napi::Value PastroKohematues(const Napi::CallbackInfo& info) {
  if (info.Length() > 0 && info[0].IsNumber()) {
    const int id = info[0].As<Napi::Number>().Int32Value();
    if (QTimer* t = g_kohematuesit.take(id)) {
      t->stop();
      t->deleteLater();
    }
  }
  return info.Env().Undefined();
}

// ---------------------------------------------------------------- prelude JS
const char* kPrelude = R"JS(
'use strict';
(function () {
  const fmt = (a) => {
    if (typeof a === 'string') return a;
    if (a instanceof Error) return a.stack ? String(a.stack) : String(a);
    if (typeof a === 'object' && a !== null) { try { return JSON.stringify(a); } catch (e) { return String(a); } }
    return String(a);
  };
  const nivel = (n) => (...a) => __print(n, a.map(fmt).join(' '));
  globalThis.console = { log: nivel(0), info: nivel(0), debug: nivel(0), warn: nivel(1), error: nivel(2) };
  globalThis.global = globalThis;
  globalThis.process = { argv: ['eagle-android', 'app.es'], env: {}, platform: 'android', exitCode: 0 };
  // prit(...) / prit_interval(...) ne Eagle Script perkthehen ne setTimeout/setInterval.
})();
)JS";

QByteArray lexoResurse(const QString& rruga) {
  QFile f(rruga);
  if (!f.open(QIODevice::ReadOnly)) return QByteArray();
  return f.readAll();
}

bool vleresoSkript(const QByteArray& burimi, const char* emri) {
  JSValue r = JS_Eval(g_ctx, burimi.constData(), static_cast<size_t>(burimi.size()), emri,
                      JS_EVAL_TYPE_GLOBAL);
  if (JS_IsException(r)) {
    JSValue ex = JS_GetException(g_ctx);
    const std::string mesazhi = Napi::detail::describe(g_ctx, ex);
    JS_FreeValue(g_ctx, ex);
    qCritical().noquote() << "Gabim ne" << emri << ":" << QString::fromUtf8(mesazhi.c_str());
    QMessageBox::critical(nullptr, QStringLiteral("Eagle Script"),
                          QString::fromUtf8(mesazhi.c_str()));
    return false;
  }
  JS_FreeValue(g_ctx, r);
  Napi::detail::runJobs(g_ctx);
  return true;
}

}  // namespace

int main(int argc, char* argv[]) {
  QApplication app(argc, argv);

  JSRuntime* rt = JS_NewRuntime();
  g_ctx = JS_NewContext(rt);
  if (!g_ctx) return 1;

  Napi::detail::logger() = [](const std::string& s) { qCritical().noquote() << QString::fromUtf8(s.c_str()); };

  Napi::Env env(g_ctx);
  Napi::Object global(g_ctx, JS_GetGlobalObject(g_ctx), false);
  global.Set("__print", Napi::Function::New(env, Printo, "__print"));
  global.Set("setTimeout", Napi::Function::New(env, SetTimeoutJS, "setTimeout"));
  global.Set("setInterval", Napi::Function::New(env, SetIntervalJS, "setInterval"));
  global.Set("clearTimeout", Napi::Function::New(env, PastroKohematues, "clearTimeout"));
  global.Set("clearInterval", Napi::Function::New(env, PastroKohematues, "clearInterval"));

  Napi::Object nativ = Napi::Object::New(env);
  EagleGuiInit(env, nativ);
  global.Set("__nativ", nativ);

  if (!vleresoSkript(QByteArray(kPrelude), "<prelude>")) return 1;

  const QByteArray gui = lexoResurse(QStringLiteral(":/gui_mobile.js"));
  const QByteArray paketa = lexoResurse(QStringLiteral(":/bundle.js"));
  if (gui.isEmpty() || paketa.isEmpty()) {
    QMessageBox::critical(nullptr, QStringLiteral("Eagle Script"),
                          QStringLiteral("Mungojne resurset gui_mobile.js / bundle.js."));
    return 1;
  }
  if (!vleresoSkript(gui, "gui_mobile.js")) return 1;
  if (!vleresoSkript(paketa, "app.es")) return 1;

  return app.exec();
}
