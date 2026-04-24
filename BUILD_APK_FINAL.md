# 🎯 APK Build — FINAL Working Steps

Pichli 2 errors fix ho chuki hain:
- ✅ McAfee loopback error → McAfee exclusion/disable se solve
- ✅ "invalid source release: 21" → JBR 21 use karne se solve (JDK 17 nahi, JBR 21)

Ab bas ye **ek baar me chalao**:

---

## Step 1: McAfee Disable (1 minute)

1. System tray me **McAfee icon** right-click
2. **Change settings → Real-Time Scanning → Turn Off**
3. Duration: **When I restart my PC** ya **1 hour** select karo (15 min kam padta hai first build me)

> ⚠️ 15 min wala option select mat karna — first Gradle build 10-20 min le sakta hai, beech me McAfee wapas on ho jayega aur build fail ho jayegi.

---

## Step 2: Build Command (PowerShell me copy-paste karo)

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "C:\Users\ASPIRE 3\AppData\Local\Android\Sdk"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

cd "C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app\mobile-apk\android"

.\gradlew.bat assembleDebug
```

**Important:** `JAVA_HOME` ko **JBR 21** pe point karna zaroori hai (Microsoft JDK 17 nahi). Capacitor ke cordova plugins Java 21 source release mangte hain.

---

## Step 3: Wait (5-20 min)

First build time lagti hai — ye sab download karta hai:
- Gradle 8.14.3 (~150 MB)
- Android Gradle Plugin
- AndroidX libraries
- Capacitor runtime
- Build tools

Terminal me aise dikhega:
```
> Task :app:preBuild UP-TO-DATE
> Task :capacitor-android:compileDebugJavaWithJavac
> Task :app:mergeDebugResources
...
> Task :app:assembleDebug
BUILD SUCCESSFUL in 12m 34s
```

---

## Step 4: APK Location

```
C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app\mobile-apk\android\app\build\outputs\apk\debug\app-debug.apk
```

Size: ~4-6 MB

---

## Step 5: Verify & Install

```powershell
# APK bana hai check karo
Get-Item "app\build\outputs\apk\debug\app-debug.apk" | Select-Object Name, @{N='SizeMB';E={[math]::Round($_.Length/1MB,2)}}
```

Phone me install:
1. APK ko phone me bhejo (WhatsApp/USB/Email)
2. Phone: Settings → Apps → Special access → Install unknown apps → File Manager ko allow karo
3. APK open karo → Install → Open

---

## Step 6: McAfee Wapas On Karo
Build ho jaye to McAfee Real-Time Scanning wapas enable karna mat bhulna.

---

## Agar Phir Bhi Error Aaye

| Error | Fix |
|-------|-----|
| `Unable to establish loopback connection` | McAfee abhi bhi on hai — dobara off karo |
| `invalid source release: 21` | JAVA_HOME JBR 21 pe nahi hai — Step 2 ka pehla line check karo |
| `SDK location not found` | `android\local.properties` me `sdk.dir` check karo |
| Build 30 min se zyada chal raha | Internet slow — cancel karke dobara chalao, cache use hoga |
| `Task :app:processDebugResources FAILED` | SDK 35/36 missing — Android Studio SDK Manager kholo, install karo |

---

## Ek Shot Me Sab Karo (Copy-paste friendly)

McAfee off karne ke baad PowerShell me:

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"; $env:ANDROID_HOME = "C:\Users\ASPIRE 3\AppData\Local\Android\Sdk"; $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"; cd "C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app\mobile-apk\android"; .\gradlew.bat assembleDebug
```

Done. APK ready ho jayegi.
