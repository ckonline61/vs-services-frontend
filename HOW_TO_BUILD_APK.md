# 📱 VS SERVICES — APK Build Guide

## ⚠️ Why CLI Build Failed
McAfee antivirus apke system pe Java ke loopback socket banane ko block kar raha hai (this is a known issue with McAfee + JDK 17 on Windows). Yeh `java.io.IOException: Unable to establish loopback connection` error deta hai jab CLI se gradle chalate hai.

**Solution:** Android Studio se build karo — wo whitelisted process hai aur seedha APK bana dega. Ya temporarily McAfee ko disable karke CLI build chalao.

---

## ✅ Method 1: Android Studio (Recommended — 100% works)

### Steps:
1. **Open Android Studio**
2. **File → Open** → select folder:
   ```
   C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app\mobile-apk\android
   ```
3. Wait for **Gradle sync** to complete (5-10 min first time, downloads dependencies)
4. From menu: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
5. APK ban jane ke baad notification aayega — click **"locate"** to find it
6. APK location:
   ```
   mobile-apk\android\app\build\outputs\apk\debug\app-debug.apk
   ```
7. Yeh APK aap apne phone me install kar sakte ho (USB se transfer ya WhatsApp se bhejo)

### Phone install:
- Phone ke Settings me **"Install from Unknown Sources"** enable karo
- APK file open karo → Install

---

## ✅ Method 2: CLI Build (after disabling McAfee)

```bash
# 1. McAfee Real-Time Scanning ko temporarily DISABLE karo (10 min ke liye)
# 2. Then run:
cd "C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app\mobile-apk\android"
.\gradlew.bat assembleDebug
# 3. APK ready: app\build\outputs\apk\debug\app-debug.apk
# 4. McAfee dobara enable karna mat bhulna
```

---

## 🚀 Before Installing — Backend Setup

App ko data load karne ke liye backend chahiye:

```bash
# Terminal 1 — MongoDB chalao
mongod
# (ya MongoDB Atlas free cluster use karo)

# Terminal 2 — Backend
cd vs_services_app\backend
npm install
copy .env.example .env       # MONGO_URI set karo
node seed.js                 # Sample services + products + admin add karega
npm run dev                  # http://localhost:5000 pe chalega
```

**Apna LAN IP nikalo:** `ipconfig` me `IPv4 Address` (e.g. `192.168.1.5`)

---

## 📲 First Time App Open Karne Pe

1. App open hote hi **API URL** screen aayega
2. Enter karo: `http://192.168.1.5:5000/api` (apna LAN IP)
3. Mobile number daalo: koi bhi 10-digit number (test ke liye `9999999999` admin hai)
4. **Send OTP** → backend console me OTP print hoga
5. OTP daal ke login karo

**Phone aur PC same WiFi network pe hone chahiye!**

---

## 🛠️ Admin Panel Test (Browser me)

```
1. Backend chalu rakho
2. Browser me kholo: vs_services_app\admin-panel\index.html
3. Mobile: 9999999999, API: http://localhost:5000/api
4. OTP backend console se le ke daalo
```

---

## 🔧 Project File Structure

```
vs_services_app/
├── backend/                  # Node.js API (MongoDB)
├── mobile-apk/               # ⭐ APK BUILD HERE
│   ├── www/                  # Mobile app HTML/JS
│   ├── android/              # Android Studio project
│   │   └── app/build/outputs/apk/debug/app-debug.apk  ← Final APK
│   └── capacitor.config.json
├── admin-panel/              # Web admin dashboard
├── mobile/                   # React Native source (alternative, not used for APK)
└── docs/
```

---

## 🐛 Common Issues

| Problem | Fix |
|---------|-----|
| App "Network error" dikha raha | Backend chalu hai? Phone PC same WiFi? LAN IP sahi? |
| OTP nahi mil raha | Backend console me dikhega — Twilio configured nahi hai |
| Gradle sync fail | Internet check, McAfee me Android Studio whitelist karo |
| APK install nahi ho rahi | Settings → Apps → Special access → Install unknown apps → enable for File Manager |
| Razorpay payment nahi chal raha | `.env` me Razorpay keys nahi hai → demo/mock payment use ho raha hai (auto success) |

---

## 📦 Release APK (Production)

Debug APK testing ke liye theek hai. Play Store ya production ke liye:

1. Android Studio: **Build → Generate Signed Bundle / APK**
2. Keystore generate karo
3. Release variant select karo
4. Final signed APK Play Store pe upload kar sakte ho
