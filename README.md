# VS SERVICES - Car Service Mobile App

Complete full-stack mobile app for car servicing, check-up, accessories shopping, and home service booking with online plus cash-on-service payment.

## Structure
```text
vs_services_app/
|-- PROJECT_PLAN.md          # Complete project plan
|-- docs/                    # Database schema and design docs
|-- backend/                 # Node.js + Express + MongoDB API
|-- mobile/                  # React Native app (Android + iOS)
`-- admin-panel/             # Static web admin dashboard
```

## Backend Setup
```bash
cd backend
npm install
cp .env.example .env        # Fill Mongo URI and JWT secret
node seed.js                # Seed services, products, and admin user
npm run dev                 # Starts on http://localhost:5000
```

Razorpay keys are optional for local development. If they are not configured, the backend uses a demo payment flow.

### API Endpoints
- `POST /api/auth/send-otp` - send OTP to mobile
- `POST /api/auth/verify-otp` - verify OTP and return JWT
- `GET /api/users/me` - current user profile
- `GET /api/services` - list all services
- `POST /api/bookings` - create service booking
- `GET /api/bookings/my` - user's bookings
- `GET /api/products` - list accessories
- `POST /api/orders` - place accessory order
- `POST /api/payments/create-order` - Razorpay order
- `POST /api/payments/verify` - verify payment signature
- `POST /api/payments/cash-confirm` - mark cash payment by staff/admin

## Mobile App Setup
```bash
cd mobile
npm install --legacy-peer-deps
npx react-native run-android   # or run-ios
```

Update `API_BASE_URL` in `mobile/src/services/api.js`:
- Android Emulator: `http://10.0.2.2:5000/api`
- Physical device: `http://<your-LAN-IP>:5000/api`

### Screens Implemented
- Splash, Login (mobile + OTP), OTP verification
- Home (services, quick actions)
- Service Booking (car details, date, slot, home/garage, payment mode)
- Accessories list, Product Detail, Cart, Checkout
- Bookings list and detail with cancel/pay
- Payment
- Profile (edit info, add/remove cars, logout)

## Payment Flow
1. Online - User selects "Pay Online", Razorpay starts, signature is verified, booking/order is marked paid.
2. Demo online mode - If Razorpay keys are missing in local setup, the app completes a mock success flow for development.
3. Pay on Service / COD - Booking or order stays pending until staff/admin confirms payment.

## Next Steps
- Push notifications (Firebase FCM)
- Live mechanic tracking (Google Maps)
- Twilio SMS integration for real OTP
- Store deployment

## Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Razorpay
- Mobile: React Native, React Navigation, Axios, AsyncStorage, Razorpay SDK
- Payments: Razorpay plus cash/UPI on service
