# 🛠️ McAfee Fix + CLI APK Build (Step-by-Step)

## Problem
McAfee `Real-Time Scanning` Java ke loopback socket ko block kar raha hai → `Unable to establish loopback connection` error → gradle CLI build fail ho raha hai.

Main 3 alag JDKs (Microsoft JDK 17, Android Studio JBR 21) try kiye, sab same error de rahe hain. McAfee Windows Filtering Platform (WFP) layer pe block kar raha hai — koi gradle flag se bypass nahi hota.

## Solution — 2 Options

---

### ✅ Option A: Permanent Fix — Add Java to McAfee Exclusions (5 minutes, one-time)

1. **McAfee Total Protection** open karo (system tray me red shield icon)
2. **PC Security** → **Real-Time Scanning** → **Settings/Excluded Files**
   - (ya: Settings → Real-Time Scanning → Excluded Files)
3. **Add File** → ye 3 paths add karo:
   ```
   C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot\bin\java.exe
   C:\Program Files\Android\Android Studio\jbr\bin\java.exe
   C:\Users\ASPIRE 3\.gradle
   ```
4. Save karo, McAfee restart karne ki zarurat nahi
5. Now CLI build chalega ↓

---

### ⚡ Option B: Temporary Disable (1 minute, sirf build ke time)

1. System tray me **McAfee icon** right-click
2. **Change settings → Real-Time Scanning**
3. **Turn Off** → "When do you want to resume?" me **15 minutes** select karo
4. Build chalao (ye fast hai, 5-10 min lagega first time)
5. McAfee automatically wapas on ho jayega

---

## After Fix — CLI APK Build

McAfee fix karne ke baad ye exact commands chalao:

```powershell
# Set environment
$env:ANDROID_HOME = "C:\Users\ASPIRE 3\AppData\Local\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# Build directory me jao
cd "C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app\mobile-apk\android"

# DEBUG APK build (testing ke liye, no signing required)
.\gradlew.bat assembleDebug

# APK location:
# mobile-apk\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## Output Files

Build successful hone ke baad:
```
mobile-apk\android\app\build\outputs\apk\debug\
└── app-debug.apk     ← 4-6 MB ka file, phone me install karo
```

---

## Phone Pe Install

1. APK file ko phone me bhejo (USB / WhatsApp / Email)
2. Phone me file open karo
3. "Install from unknown sources" allow karo (Settings → Apps → Special access)
4. Install → Open

---

## Quick Verification (build success ke baad)

```powershell
# APK file size check karo
Get-Item "mobile-apk\android\app\build\outputs\apk\debug\app-debug.apk" | Select-Object Name, Length

# APK info dekhna ho to:
& "C:\Users\ASPIRE 3\AppData\Local\Android\Sdk\build-tools\36.1.0\aapt.exe" dump badging "mobile-apk\android\app\build\outputs\apk\debug\app-debug.apk" | Select-String "package|launchable"
```

---

## Common Errors

| Error | Reason | Fix |
|-------|--------|-----|
| `Unable to establish loopback connection` | McAfee blocking | Step Option A ya B follow karo |
| `SDK location not found` | ANDROID_HOME missing | `$env:ANDROID_HOME` set karo (upar wala command) |
| `Could not determine the dependencies` | Internet down ya gradle cache corrupt | `gradle\caches` delete karo, retry |
| `Build failed: compileSdk 35 not found` | SDK 35 missing | Android Studio SDK Manager se install karo |

---

## Aapke System Pe Verified

- ✅ Android SDK: `C:\Users\ASPIRE 3\AppData\Local\Android\Sdk` (build-tools 36.1, platforms android-36)
- ✅ JDK 17: `C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot`
- ✅ JBR 21 (backup): `C:\Program Files\Android\Android Studio\jbr`
- ✅ ADB: `platform-tools\adb.exe` (v37.0.0)
- ✅ Capacitor + Android project initialized
- ❌ McAfee: blocking gradle daemon (need exclusion)

McAfee fix karte hi sirf ek `gradlew.bat assembleDebug` se APK ready ho jayegi.
