# CMakeLists.txt - shablloni Android per Eagle Script (Qt 6 Widgets + QuickJS-ng)
#
# Ky skedar kopjohet nga "eagle app.es --jeteso android" ne <app>-android/ bashke me
#   src/ (host.cpp, eaglegui_qt.cpp, napi_quickjs.h)
#   third_party/quickjs-ng/   (git clone https://github.com/quickjs-ng/quickjs ...)
#   resources/ (bundle.js, gui_mobile.js, assets/...)  <- gjenerohen nga packager-i
#
# Ndertim dorazi (nga dosja e projektit te gjeneruar):
#   <Qt>/6.x/android_arm64_v8a/bin/qt-cmake -S . -B build -DCMAKE_BUILD_TYPE=Release \
#       -DANDROID_SDK_ROOT=<SDK> -DANDROID_NDK_ROOT=<NDK>
#   cmake --build build --target apk
# APK-ja del nen build/ (android-build/build/outputs/apk/...).

cmake_minimum_required(VERSION 3.21)
project(Biblioteka LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_C_STANDARD 11)

find_package(Qt6 REQUIRED COMPONENTS Widgets)
qt_standard_project_setup()

# --- QuickJS-ng (ndertohet direkt nga burimet; nuk varet nga CMake-u i tyre) ---
set(QJS_DIR ${CMAKE_CURRENT_SOURCE_DIR}/third_party/quickjs-ng)
set(QJS_SOURCES)
foreach(f quickjs libregexp libunicode cutils dtoa libbf)
  if(EXISTS ${QJS_DIR}/${f}.c)
    list(APPEND QJS_SOURCES ${QJS_DIR}/${f}.c)
  endif()
endforeach()
if(NOT QJS_SOURCES)
  message(FATAL_ERROR "QuickJS-ng nuk u gjet ne ${QJS_DIR}")
endif()
add_library(quickjs_eagle STATIC ${QJS_SOURCES})
target_include_directories(quickjs_eagle PUBLIC ${QJS_DIR})
target_compile_definitions(quickjs_eagle PRIVATE _GNU_SOURCE CONFIG_VERSION="eagle")
set_target_properties(quickjs_eagle PROPERTIES POSITION_INDEPENDENT_CODE ON)

# --- Aplikacioni ---
qt_add_executable(Biblioteka
  src/host.cpp
  src/eaglegui_qt.cpp
)
target_include_directories(Biblioteka PRIVATE src)
target_link_libraries(Biblioteka PRIVATE Qt6::Widgets quickjs_eagle)

# Resurset: JS-ja e paketuar + asetet (imazhe) -> :/bundle.js, :/gui_mobile.js, :/assets/*
file(GLOB_RECURSE EAGLE_ASETE RELATIVE ${CMAKE_CURRENT_SOURCE_DIR}
     ${CMAKE_CURRENT_SOURCE_DIR}/resources/assets/*)
qt_add_resources(Biblioteka "eagle_resurset"
  PREFIX "/"
  BASE ${CMAKE_CURRENT_SOURCE_DIR}/resources
  FILES resources/bundle.js resources/gui_mobile.js ${EAGLE_ASETE}
)

set_target_properties(Biblioteka PROPERTIES
  QT_ANDROID_ABIS "arm64-v8a"
  QT_ANDROID_MIN_SDK_VERSION 26
)
