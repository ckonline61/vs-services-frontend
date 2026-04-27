# 🎨 Replace App Icon with VS SERVICES Logo

## Step 1: Save your logo image

Save the VS SERVICES logo image (the one you uploaded — dark navy background with car+wrench in circle, "CHECK. SERVICE. DRIVE SAFE.") as:

```
C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app\mobile-apk\www\assets\vs-services-logo.png
```

**Yes — overwrite the existing file.** Both apps use this single file as the source.

## Step 2: Generate launcher icons

Open PowerShell in the project folder and run:

```powershell
cd "C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app"
powershell -ExecutionPolicy Bypass -File GENERATE_ICONS.ps1
```

Script will:
- Auto-detect that your logo has its own dark navy background
- Use it AS-IS for legacy launcher icons (no extra padding)
- Generate adaptive icons for Android 8+ (rounded square / circle / squircle)
- Save into mipmap folders for both apps in all 5 densities (mdpi → xxxhdpi)

**Output you'll see:**
```
Source has own background: True
Generating icons for mobile-apk...
  mipmap-mdpi -> 48x48
  mipmap-hdpi -> 72x72
  ...
  Adaptive icon configured (#0A1933)
Generating icons for admin-apk...
  ...
```

## Step 3: Sync + Rebuild APKs

```cmd
cd /d "C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app\mobile-apk" && npx cap sync android && cd android && set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr" && set "ANDROID_HOME=C:\Users\ASPIRE 3\AppData\Local\Android\Sdk" && set "PATH=%JAVA_HOME%\bin;%PATH%" && gradlew.bat assembleDebug
```

```cmd
cd /d "C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app\admin-apk" && npx cap sync android && cd android && set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr" && set "ANDROID_HOME=C:\Users\ASPIRE 3\AppData\Local\Android\Sdk" && set "PATH=%JAVA_HOME%\bin;%PATH%" && gradlew.bat assembleDebug
```

## Step 4: Install APKs

**IMPORTANT:** Uninstall the old APKs first, then install fresh — Android caches launcher icons aggressively.

```
mobile-apk\android\app\build\outputs\apk\debug\app-debug.apk
admin-apk\android\app\build\outputs\apk\debug\app-debug.apk
```

You'll see your VS SERVICES logo in:
- ✅ Phone home screen / app drawer
- ✅ App splash screen (since it uses same `vs-services-logo.png`)
- ✅ App login screen
- ✅ Recent apps drawer

---

## ✅ All 4 Issues Fixed Together

### 1. ✅ Coupon notifications to customer mobile app

**How it works now:**
- Admin creates a coupon (Admin app → Coupons → Add) → backend automatically creates an in-app notification for **every customer**
- Customer mobile app polls every 30 seconds → fires native Android notification with sound + vibration
- Notification text: "🎟 New Offer Just for You! Use code WELCOME10 — 10% OFF (max ₹500)"
- Tapping the notification → opens Offers screen in app

**Test:**
1. Admin app → Coupons → Add new coupon "TEST20"
2. Within 30s, all customer phones get notification
3. Tapping → mobile app opens to Offers screen with the new coupon

### 2. ✅ Admin logout button — clean SVG icon

The weird "⏻" character replaced with a clean **logout arrow icon (SVG)** — the standard "exit/logout" symbol used in modern apps. Looks professional on every Android version (no missing-glyph rendering).

### 3. ✅ Dashboard stat cards clickable

| Stat Card | Tap action |
|---|---|
| **Total Bookings** | Opens Bookings tab (all) |
| **Pending** | Opens Bookings tab filtered to ⏳ Pending |
| **Total Orders** | Opens Orders tab |
| **Revenue** | Opens Monthly Report tab |

Plus the bookings tab now has a new **"⏳ Pending"** filter chip showing bookings in active states (booked / confirmed / assigned / in_progress / pickup_scheduled).

### 4. ✅ App icon = your VS SERVICES logo

Your uploaded logo image will be the actual launcher icon on both phones (admin + customer) once you do steps 1-4 above.

---

## 🚀 What's Now Live

After rebuild + install:

| Action | Result |
|---|---|
| Admin creates a new coupon | Customer phones get push notification within 30s |
| Customer books a service | Admin phone gets push notification within 20s |
| Customer sends chat message | Admin phone gets push within 20s |
| Customer places order | Admin gets push within 20s |
| New booking status changed | Customer gets push (already implemented) |

**All FREE. No FCM, no Firebase. Pure local polling + Capacitor LocalNotifications.**

---

## 💡 Logo Image Tips

For best icon quality:
- Use a **square** image (1080×1080 or 1024×1024 ideal)
- Keep some padding around the main logo so it's not cut off in circular masks
- The image you provided is perfect — already square, has padding, has dark bg

If your image is too high-res, the script auto-resizes. Just save as PNG at the exact path mentioned in Step 1.
