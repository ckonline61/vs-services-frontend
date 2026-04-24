# 📱 MSG91 Real SMS OTP Setup Guide

Ab app real SMS OTP bhejne ke liye ready hai. Bas MSG91 me account banake 3 values le lo aur `.env` me daal do.

---

## Step 1: MSG91 Account Banao (5 min)

1. Open: **https://control.msg91.com/signup/**
2. Sign up with email + mobile
3. Free trial me ₹25 ka credit milta hai (~50 SMS free) — testing ke liye enough
4. Email verify karo, login karo

---

## Step 2: AuthKey Lo

1. Dashboard me left sidebar → **User Settings** (ya top-right profile icon)
2. **API** section me jao
3. **Auth Key** copy karo — dikhta hai jaise: `412345AabCdEfGhIjK123456`

Ye hai aapka `MSG91_AUTH_KEY`.

---

## Step 3: DLT Template Banao (India me mandatory — TRAI rule)

India me koi bhi SMS bhejne se pehle **DLT registered template** banani padti hai. MSG91 dashboard me:

1. Left sidebar → **SMS → Templates** → **Add Template**
2. Category: **Service Implicit** (for OTP)
3. Template type: **OTP**
4. Template body (exact):
   ```
   ##OTP## is your OTP for VS Services login. Valid for 5 minutes. Do not share.
   ```
   ya simpler:
   ```
   Your VS Services OTP is ##OTP##. Valid 5 min.
   ```
5. **Save** karo → MSG91 DLT approve karega (5-30 min lagte hain)
6. Approve hone ke baad template id milegi — kuch aisa: `6712ab34567de890fghij123`

Ye hai aapka `MSG91_TEMPLATE_ID`.

> **Note:** Variable name exactly `##OTP##` rakhna — code me isi ke hisaab se `OTP` key pass kar raha hun.

---

## Step 4: Sender ID (optional but recommended)

- Default sender `MSGIND` use ho sakta hai (free)
- Apna custom 6-letter sender (jaise `VSSRVC`) chahiye to DLT portal pe register karo
- `.env` me `MSG91_SENDER_ID` me jo bhi use karna hai daalo

---

## Step 5: Backend me Keys Daalo

`backend/.env` file me ye line add/update karo:

```env
NODE_ENV=production
MSG91_AUTH_KEY=412345AabCdEfGhIjK123456
MSG91_TEMPLATE_ID=6712ab34567de890fghij123
MSG91_SENDER_ID=VSSRVC
```

> `NODE_ENV=production` kar do — isse response me `devOtp` nahi aayega (security).

---

## Step 6: Backend Restart Karo

```bash
cd vs_services_app/backend
npm run dev
```

Terminal me ye dikhna chahiye:
```
[SMS-MSG91] OTP sent to 9876543210. RequestId: 412abc...
```

Agar galat keys hain ya DLT template approve nahi hui:
```
[SMS-MSG91] Failed: { type: 'error', message: 'Invalid template' }
```

---

## Step 7: App Me Test

1. Mobile app me login karo → koi bhi real 10-digit mobile number daalo
2. **Send OTP** click karo
3. Us mobile pe actual SMS aayega (5-10 second me)
4. OTP daal ke login ho jao 🎉

---

## Dev Mode (Keys ke Bina)

Agar MSG91 keys `.env` me nahi hain, to app **automatically dev mode** pe chalega:
- OTP generate hogi
- SMS **nahi** jayega
- Backend console me print hogi: `[SMS-DEV] OTP for 9876543210: 123456`
- Response me bhi `devOtp` field aayegi (app me auto-fill kar sakte ho testing ke liye)

Matlab development me paisa kharch nahi hoga, production me real SMS jayega.

---

## Pricing Reference

| Plan | Rate |
|------|------|
| Trial (signup) | ₹25 free (~50 SMS) |
| Transactional/OTP | ~₹0.15-0.20 per SMS |
| 1000 SMS pack | ~₹150-200 |

Bulk use ke liye MSG91 dashboard se recharge karo.

---

## Common Errors

| Error | Fix |
|-------|-----|
| `Invalid authkey` | AuthKey galat hai ya copy me space aa gaya |
| `Template not found` | Template ID galat ya DLT me approve nahi hua |
| `Invalid mobile` | Mobile 10 digit hona chahiye, no +91 |
| `Insufficient balance` | Dashboard se recharge karo |
| `DLT not registered` | Template DLT portal pe register nahi hai — MSG91 dashboard se link hai, follow karo |

---

## Files Changed

- ✅ `backend/services/smsService.js` — New MSG91 sender module
- ✅ `backend/controllers/authController.js` — Now uses smsService
- ✅ `backend/.env.example` — MSG91 vars added

Code production-ready hai. Bas `.env` me keys daalne ki der hai.
