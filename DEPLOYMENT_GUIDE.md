# 🚀 VS SERVICES — Production Deployment Guide

Complete step-by-step: MongoDB Atlas + Render backend + production APK. **Total time: 45-60 min. Cost: ₹0.**

---

## What You'll Have After This

- ✅ MongoDB Atlas (free 512 MB, permanent)
- ✅ Backend deployed on Render (free tier, always-on with UptimeRobot)
- ✅ Public API URL (works from anywhere, any network)
- ✅ APK connected to production — real-world usable

---

# 📦 PART 1: MongoDB Atlas Setup (15 min)

## 1.1 Signup

**URL:** https://www.mongodb.com/cloud/atlas/register

- **Sign up with Google** (easiest)
- Goal: *Build a new application*
- Language: *JavaScript/Node.js*
- Click **Finish**

## 1.2 Free Cluster

1. Plan: **M0 FREE** (leftmost)
2. Provider: **AWS**
3. Region: **Mumbai (ap-south-1)** — India ke liye best
4. Cluster Name: `vs-services`
5. **Create Deployment**

3-5 min wait.

## 1.3 Database User

"Security Quickstart" screen pe:
1. **Username and Password**
2. Username: `vsadmin`
3. **Autogenerate Secure Password** → password **copy karke Notepad me save** (ye fir nahi dikhega!)
4. **Create User**

## 1.4 Network Access

Same screen, neeche:
1. Select **My Local Environment**
2. IP Address: `0.0.0.0/0` (sab IPs allow — Render dynamic IPs ke liye zaroori)
3. Description: `Allow all`
4. **Add Entry** → **Finish and Close**

## 1.5 Connection String

1. Left sidebar → **Database** (home icon)
2. Cluster ke saamne **Connect** → **Drivers** → **Node.js**
3. String copy:
   ```
   mongodb+srv://vsadmin:<db_password>@vs-services.abc12.mongodb.net/?retryWrites=true&w=majority
   ```
4. `<db_password>` ko apne actual password se replace karo
5. URL me database name add karo — `/?` ki jagah `/vs_services?`:
   ```
   mongodb+srv://vsadmin:RealPass123@vs-services.abc12.mongodb.net/vs_services?retryWrites=true&w=majority
   ```

Ye aapka `MONGO_URI` hai.

## 1.6 Local Me Test (Optional but recommended)

`backend/.env` file me:
```env
MONGO_URI=mongodb+srv://vsadmin:RealPass123@vs-services.abc12.mongodb.net/vs_services?retryWrites=true&w=majority
```

```cmd
cd vs_services_app\backend
npm run dev
```

Output:
```
MongoDB Connected: vs-services-shard-00-02.abc12.mongodb.net
VS SERVICES server running on port 5000
```

Seed chalao:
```cmd
node seed.js
```

Atlas dashboard → **Browse Collections** → `vs_services` database me 3 collections dikhenge: `users`, `services`, `products`. ✅

---

# 🐙 PART 2: GitHub Setup (10 min)

## 2.1 GitHub Account

https://github.com/signup (agar nahi hai)

## 2.2 Git Install

```cmd
git --version
```

Agar error aaye: https://git-scm.com/download/win → install default options.

## 2.3 Push Backend

```cmd
cd "C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app\backend"

git init
git add .
git commit -m "Initial VS Services backend"
```

GitHub pe new repo:
1. https://github.com/new
2. Repository name: `vs-services-backend`
3. **Private** (recommended)
4. **Create repository**

Next screen ke "push existing repository" commands use karo:
```cmd
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vs-services-backend.git
git push -u origin main
```

Push ke time Personal Access Token mangega:
- GitHub → Settings → Developer settings → Personal access tokens → **Tokens (classic)** → **Generate new token**
- Name: `vs-services`, Expiration: **90 days**, Scope: **repo** (check)
- Generate → token copy karo → password ki jagah ye paste karo

---

# ☁️ PART 3: Render Deploy (15 min)

## 3.1 Signup

**URL:** https://dashboard.render.com/register

**Sign in with GitHub** — sabse easy (repos auto-link).

## 3.2 New Web Service

1. Top right **New +** → **Web Service**
2. **Build and deploy from a Git repository** → Next
3. `vs-services-backend` repo → **Connect**

## 3.3 Configuration

| Field | Value |
|-------|-------|
| **Name** | `vs-services-api` |
| **Region** | **Singapore** (India ke closest free region) |
| **Branch** | `main` |
| **Root Directory** | *(blank)* |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | **Free** |

## 3.4 Environment Variables

Scroll down → **Environment Variables** → add each:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGO_URI` | `mongodb+srv://vsadmin:YourPass@vs-services.abc.mongodb.net/vs_services?retryWrites=true&w=majority` |
| `JWT_SECRET` | *long random string, 32+ chars* (e.g. `vs_prod_secret_2026_xyz789_random_long_string`) |
| `JWT_EXPIRES_IN` | `30d` |
| `ADMIN_MOBILE` | `9999999999` (ya apna number) |
| `ADMIN_DEFAULT_PASSWORD` | **strong password** (e.g. `VsAdmin@2026#Strong`) |
| `CORS_ORIGINS` | *(blank for now)* |

**Create Web Service** click.

## 3.5 Deploy Logs

Build 3-5 min me complete. Logs me aise dikhna chahiye:
```
==> Installing dependencies with 'npm install'
==> Running 'node server.js'
VS SERVICES server running on port 10000  (env: production)
MongoDB Connected: ...
```

Top me green dot + URL:
```
https://vs-services-api.onrender.com
```

## 3.6 Test

Browser me URL kholo:
```json
{
  "message": "VS SERVICES API is running",
  "version": "1.0.0",
  "env": "production",
  "timestamp": "..."
}
```

## 3.7 Seed Production DB (ek baar)

Render dashboard → Web Service → **Shell** tab → terminal me:
```bash
node seed.js
```

Output:
```
✓ Admin created — mobile: 9999999999, password: VsAdmin@2026#Strong
✓ Seed data inserted: 4 services, 5 products
```

## 3.8 Keep Alive (UptimeRobot)

Free tier 15 min idle ke baad sleep hota hai. UptimeRobot se har 5 min ping karo:

1. https://uptimerobot.com/signUp
2. Dashboard → **+ New Monitor**
3. Monitor Type: **HTTP(s)**
4. Friendly Name: `VS Services API`
5. URL: `https://vs-services-api.onrender.com/api/health`
6. Monitoring Interval: **5 minutes**
7. **Create Monitor** ✅

Service kabhi sleep nahi hogi.

---

# 📱 PART 4: APK Me Production URL (5 min)

## 4.1 Update app.js

File: `vs_services_app/mobile-apk/www/app.js`

Line ~5 pe `PROD_API_URL` update karo apni Render URL se:

```js
const PROD_API_URL = 'https://vs-services-api.onrender.com/api';
```

(Apni actual URL daalo — jo Render ne di)

## 4.2 Sync + Build APK

```cmd
cd "C:\Users\ASPIRE 3\Desktop\MCA FINAL YEAR PROJECT REPORT\claude\new\vs_services_app\mobile-apk"
npx cap sync android
cd android
gradlew.bat assembleDebug
```

APK: `android\app\build\outputs\apk\debug\app-debug.apk`

Ya `BUILD_APK.bat` double-click karo (automatic).

## 4.3 Phone Pe Install & Test

1. APK phone me send karo (WhatsApp/USB)
2. Install → Open
3. First-time setup screen: naam + mobile daalo → **Continue**
4. Home screen khul jayega — services load honge from Render API

**Koi LAN, koi WiFi — kahin bhi kaam karega.** Production-ready. ✅

---

# 👨‍💼 PART 5: Admin Panel Access (2 min)

Browser me kholo: `vs_services_app/admin-panel/index.html`

Login:
- **Mobile:** `9999999999` (ya jo `ADMIN_MOBILE` me set kiya)
- **Password:** jo `ADMIN_DEFAULT_PASSWORD` me set kiya
- **API URL:** `https://vs-services-api.onrender.com/api`

Bookings, orders, services, products — sab manage kar sakte ho.

---

# 🔐 PART 6: Security Checklist (Production Must-Do)

- [x] `JWT_SECRET` long random string hai (not default)
- [x] `ADMIN_DEFAULT_PASSWORD` strong hai (not `admin123`)
- [x] `NODE_ENV=production` set hai (devOtp response me nahi jayegi)
- [x] `.env` file `.gitignore` me hai (GitHub pe push nahi hui)
- [x] MongoDB password strong hai
- [ ] Periodically Atlas dashboard check karo (free tier usage)
- [ ] Weekly Atlas me manual backup lo (Collections → Export)

---

# 🔄 Future Updates Kaise Karein

Code me change karne ke baad:
```cmd
cd vs_services_app\backend
git add .
git commit -m "your change description"
git push
```

Render automatic detect karega aur redeploy karega (3-5 min). **No downtime.**

---

# 🆘 Common Issues

| Problem | Fix |
|---------|-----|
| Render build fails: `MongooseError: bad auth` | MONGO_URI me password galat — special chars (`@`, `#`) ko URL-encode karo (`@`→`%40`) |
| `MongooseServerSelectionError: IP not whitelisted` | Atlas → Network Access → `0.0.0.0/0` allow karo |
| Render service sleeping | UptimeRobot set karo (Part 3.8) |
| APK me "Network error" | `PROD_API_URL` sahi daala? `https` hai? Internet on hai? |
| Admin login fail | `ADMIN_DEFAULT_PASSWORD` Render env me set hai? Seed chalaya? |
| `free tier limit exceeded` | Atlas: 512 MB full (bahut zyada data) — upgrade ya purane records clean |

---

# 💰 Ongoing Costs

| Service | Free Tier | Paid Upgrade Trigger |
|---------|-----------|---------------------|
| MongoDB Atlas | ₹0 for 512 MB (kai saal) | ~500+ bookings/month |
| Render Web Service | ₹0 (with UptimeRobot) | 100+ concurrent users |
| UptimeRobot | ₹0 (50 monitors, 5-min interval) | Never (free tier is enough) |
| GitHub (private) | ₹0 unlimited | Never |
| **TOTAL** | **₹0 / month** | — |

Bas jab SMS OTP / Razorpay integrate karo, tab per-transaction cost lagega.

---

# 🎯 Quick Reference — All URLs You'll Use

- **MongoDB Atlas:** https://cloud.mongodb.com
- **GitHub repo:** https://github.com/YOUR_USERNAME/vs-services-backend
- **Render dashboard:** https://dashboard.render.com
- **Production API:** `https://vs-services-api.onrender.com`
- **Admin Panel:** `file:///.../admin-panel/index.html` (local file)
- **UptimeRobot:** https://uptimerobot.com

Save kar lo bookmark me.

---

Done. Follow this step-by-step, kahin stuck ho to bolo — main help kar dunga.
