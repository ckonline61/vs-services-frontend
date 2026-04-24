@echo off
REM ====================================================
REM VS SERVICES - APK Build Script (CMD compatible)
REM ====================================================

echo.
echo [1/4] Setting environment variables...
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=C:\Users\ASPIRE 3\AppData\Local\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo.
echo [2/4] Java version check:
"%JAVA_HOME%\bin\java.exe" -version
echo.

echo [3/4] Moving to android project folder...
cd /d "%~dp0android"

echo.
echo [4/4] Starting Gradle build... (5-20 min lag sakta hai)
echo ====================================================
call gradlew.bat assembleDebug

echo.
echo ====================================================
if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo [SUCCESS] APK banake ready hai!
    echo.
    echo Location:
    echo   %CD%\app\build\outputs\apk\debug\app-debug.apk
    echo.
    dir "app\build\outputs\apk\debug\app-debug.apk" | findstr "app-debug.apk"
) else (
    echo [FAILED] APK nahi bani. Upar ke error padho.
    echo.
    echo Common fixes:
    echo   - McAfee Real-Time Scanning OFF hai?
    echo   - Internet chalu hai?
)
echo ====================================================
pause
