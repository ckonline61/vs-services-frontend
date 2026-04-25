@echo off
REM ====================================================
REM VS SERVICES ADMIN - APK Build Script
REM ====================================================

echo.
echo [1/5] Setting environment variables...
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=C:\Users\ASPIRE 3\AppData\Local\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo.
echo [2/5] Java version check:
"%JAVA_HOME%\bin\java.exe" -version
echo.

cd /d "%~dp0"

if not exist "node_modules" (
  echo [3/5] Installing npm dependencies...
  call npm install
) else (
  echo [3/5] node_modules already exists, skipping npm install.
)

if not exist "android" (
  echo [4/5] Adding Android platform via Capacitor...
  call npx cap add android
) else (
  echo [4/5] Syncing web assets to Android...
  call npx cap sync android
)

echo Generating app icons (car logo)...
powershell -ExecutionPolicy Bypass -File "%~dp0..\GENERATE_ICONS.ps1"

echo.
echo [5/5] Starting Gradle build... (5-20 min lag sakta hai)
echo ====================================================
cd /d "%~dp0android"
call gradlew.bat assembleDebug

echo.
echo ====================================================
if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo [SUCCESS] Admin APK banake ready hai!
    echo.
    echo Location:
    echo   %CD%\app\build\outputs\apk\debug\app-debug.apk
    echo.
    dir "app\build\outputs\apk\debug\app-debug.apk" | findstr "app-debug.apk"
) else (
    echo [FAILED] APK nahi bani. Upar ke error padho.
)
echo ====================================================
pause
