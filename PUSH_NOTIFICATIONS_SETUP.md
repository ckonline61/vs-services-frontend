# 🔔 Push Notifications — Admin App

## ✅ What Works Now (Free, no setup)

When admin app is **OPEN** (foreground) or **recently used** (background, app not force-closed):

1. **Backend polls every 20 seconds** for new bookings, orders, and customer messages
2. On any new item, the admin phone:
   - 🔔 Fires a **native Android system notification** (top of screen, with sound)
   - 🔊 Plays an **alert beep** (3-tone chime)
   - 📳 Vibrates the phone
   - 📩 Shows an **in-app banner** at the top
3. Tapping the notification opens the relevant tab (Bookings / Orders / Chats)
4. Sound + vibration even when phone is on silent for some Android versions

### Permission Flow
- App requests **POST_NOTIFICATIONS** permission on first launch (Android 13+)
- Toast popup: "Allow notifications?" → tap **Allow**
- Plus camera/mic/location permissions (handled in same flow)

### Test it Right Now
1. Install fresh APK
2. Login as admin
3. Tap **More → 🔔 Send Test Notification**
4. You should see:
   - System notification at top of screen
   - Hear beep sound
   - Phone vibrates
   - Blue banner at top of app

### Real-world test
1. Admin app open on Phone A
2. From Phone B: open mobile app → book a service
3. Within 20 seconds, Phone A should:
   - Get a system notification: **"🔧 New Booking! [Customer name] · [Service] · ₹[amount]"**
   - Play alert sound
   - Show banner

---

## ⚠️ Limitation (Without FCM)

When admin app is **fully closed** (force-stopped or rebooted phone), notifications won't fire because there's nothing running to poll. The native Android notification scheduler can't make HTTP calls on its own.

**Workaround:** Keep admin app open (even minimized). Battery use is minimal (only HTTP poll every 20s).

---

## 🚀 OPTIONAL UPGRADE: True Push (App Closed) via Firebase FCM

If you need notifications when admin app is **fully closed**, set up Firebase Cloud Messaging. **100% free**, but requires one-time Firebase setup.

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Sign in with Google → **Add project** → name it "VS Services"
3. Disable Google Analytics (not needed) → Create

### Step 2: Add Android App
1. In project overview, tap **Add app → Android (icon)**
2. Package name: `com.vsservices.admin` (for admin) — repeat for `com.vsservices.app` (mobile)
3. App nickname: VS Admin
4. **Skip** SHA-1 (optional)
5. Click **Register app**
6. Download `google-services.json`
7. Place at: `vs_services_app/admin-apk/android/app/google-services.json`

### Step 3: Update Capacitor Plugin
```cmd
cd vs_services_app/admin-apk
npm install @capacitor/push-notifications
npx cap sync android
```

### Step 4: Update build.gradle files
**Project-level** (`android/build.gradle`):
```gradle
buildscript {
  dependencies {
    classpath 'com.google.gms:google-services:4.4.2'
  }
}
```

**App-level** (`android/app/build.gradle`):
```gradle
apply plugin: 'com.google.gms.google-services'

dependencies {
  implementation platform('com.google.firebase:firebase-bom:33.1.0')
  implementation 'com.google.firebase:firebase-messaging'
}
```

### Step 5: Get Firebase Server Key
1. Firebase console → ⚙ Project Settings → **Cloud Messaging** tab
2. **Service Accounts** → "Generate new private key" → download JSON
3. Or use legacy server key (deprecated but simpler)

### Step 6: Update Backend
Add to `backend/package.json`:
```json
"firebase-admin": "^12.1.0"
```

Create `backend/services/fcm.js`:
```javascript
const admin = require('firebase-admin');
if (process.env.FCM_SERVICE_ACCOUNT) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FCM_SERVICE_ACCOUNT))
  });
}

exports.sendToTokens = async (tokens, title, body, data = {}) => {
  if (!admin.apps.length || !tokens.length) return;
  return admin.messaging().sendEachForMulticast({
    tokens,
    notification: { title, body },
    data,
    android: { priority: 'high', notification: { sound: 'default' } }
  });
};
```

### Step 7: Add `fcmToken` to User model
```javascript
fcmTokens: [String]   // a user can have multiple devices
```

### Step 8: Endpoint to register FCM token
```javascript
// POST /api/users/register-fcm
exports.registerFCMToken = async (req, res) => {
  const { token } = req.body;
  await User.updateOne({ _id: req.user._id }, { $addToSet: { fcmTokens: token } });
  res.json({ success: true });
};
```

### Step 9: In Admin App JS
```javascript
import { PushNotifications } from '@capacitor/push-notifications';

PushNotifications.requestPermissions().then(p => {
  if (p.receive === 'granted') PushNotifications.register();
});

PushNotifications.addListener('registration', (token) => {
  // Send token to backend
  fetch(API + '/users/register-fcm', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: token.value })
  });
});
```

### Step 10: Send FCM on new booking (backend)
In `bookingController.js` `createBooking`:
```javascript
const admins = await User.find({ role: 'admin' });
const adminTokens = admins.flatMap(a => a.fcmTokens || []);
require('../services/fcm').sendToTokens(
  adminTokens,
  '🔧 New Booking!',
  `${req.user.name} booked ${service.name} for ₹${booking.totalAmount}`,
  { type: 'booking', id: booking._id.toString() }
);
```

### Step 11: Add Service Account to Render
Render dashboard → vs-services-api → Environment:
- `FCM_SERVICE_ACCOUNT` = paste the entire JSON content from step 5

That's it. Now admin app gets notifications **even when fully closed or phone is asleep**.

**Free Tier Limits (Firebase FCM):**
- Unlimited messages
- No cost ever for messaging

---

## 📊 Summary

| Approach | Closed App | Setup Effort | Cost |
|---|---|---|---|
| **Local Polling (current)** | ❌ | None — already done | ₹0 |
| **FCM (optional upgrade)** | ✅ | 30 min one-time | ₹0 |

For most college projects and small garages, **local polling is enough** — admin keeps the app minimized in background.

For production with multiple staff, FCM is recommended.
