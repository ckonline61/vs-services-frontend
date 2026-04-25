@echo off
REM ====================================================
REM VS SERVICES - APK Build Script
REM ====================================================

echo.
echo [1/6] Setting environment variables...
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=C:\Users\ASPIRE 3\AppData\Local\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

cd /d "%~dp0"

if not exist "node_modules" (
  echo [2/6] Installing npm dependencies...
  call npm install
) else (
  echo [2/6] node_modules ok, installing any new deps...
  call npm install --no-audit --no-fund
)

if not exist "android" (
  echo [3/6] Adding Android platform...
  call npx cap add android
) else (
  echo [3/6] Syncing web assets to Android...
  call npx cap sync android
)

echo [4/6] Generating app icons (car logo)...
powershell -ExecutionPolicy Bypass -File "%~dp0..\GENERATE_ICONS.ps1"

echo [5/6] Java check:
"%JAVA_HOME%\bin\java.exe" -version
echo.

echo [6/6] Starting Gradle build...
echo ====================================================
cd /d "%~dp0android"
call gradlew.bat assembleDebug

echo.
echo ====================================================
if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo [SUCCESS] APK ready!
    echo Location: %CD%\app\build\outputs\apk\debug\app-debug.apk
) else (
    echo [FAILED] APK nahi bani. Upar errors padho.
)
echo ====================================================
pause
