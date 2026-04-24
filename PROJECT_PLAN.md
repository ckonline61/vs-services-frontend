# VS SERVICES — Mobile App Project Plan

**Company:** VS SERVICES
**Business:** Car Servicing, Check-up, Accessories, Home Delivery Service
**Date:** 2026-04-23

---

## 1. App ka Purpose
Car servicing, check-up, accessories aur home delivery service book karne ke liye customer-facing mobile app. Online + Cash-on-Service payment dono support.

## 2. Tech Stack
- **Frontend:** React Native (Android + iOS ek hi codebase)
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Payment Gateway:** Razorpay
- **Push Notifications:** Firebase Cloud Messaging
- **Maps/Location:** Google Maps API
- **Authentication:** OTP based (Firebase Auth)

## 3. User Roles
1. **Customer** — booking, payment, tracking
2. **Admin** — bookings manage, pricing, staff assign
3. **Service Staff/Mechanic** — assigned jobs, status update

## 4. Core Features (Customer App)

### A. Onboarding
- Splash screen + VS SERVICES logo
- Mobile number + OTP login
- Profile setup (Name, Car model, Car number, Address)

### B. Home Screen
- Banner/Offers slider
- Quick actions: Book Service | Check-up | Accessories | Home Service
- My Cars section (multiple cars)

### C. Service Booking Module
- Service type: Basic / Full / AC / Denting-Painting / Check-up
- Car details select
- Date & Time slot
- Location: At Garage / Home Service
- Address + Google Map pin
- Price estimate

### D. Accessories Module
- Categories: Seat Covers, Mats, Perfumes, Audio, Lights
- Product listing with images, price
- Add to Cart → Checkout
- Home delivery

### E. Payment Module
- Online Pay (Razorpay — UPI/Card/NetBanking/Wallet)
- Pay on Service (cash/UPI at doorstep)
- Invoice generate + download

### F. Booking Tracking
- Status: Booked → Confirmed → Mechanic Assigned → In Progress → Completed
- Live mechanic location (home service)
- Call/Chat with staff

### G. History & Profile
- Past bookings, invoices
- Service reminders
- Rate & Review
- Support / WhatsApp integration

## 5. Admin Panel (Web)
- Dashboard (bookings, revenue, today's jobs)
- Manage services & pricing
- Assign staff
- Accessories inventory
- Customer list
- Payment reports

## 6. Development Phases

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| 1. Planning & UI/UX Design | 1-2 weeks | Figma mockups |
| 2. Backend + DB + APIs | 3-4 weeks | REST APIs |
| 3. Customer App Development | 4-5 weeks | Android + iOS build |
| 4. Admin Panel | 2 weeks | Web dashboard |
| 5. Payment Integration | 1 week | Razorpay live |
| 6. Testing (QA) | 2 weeks | Bug-free build |
| 7. Launch | 1 week | Play Store + App Store |

**Total: ~3-4 months**

## 7. Estimated Cost (India)
- Freelancer team: ₹1.5 – 3 Lakh
- Agency: ₹4 – 8 Lakh
- Maintenance: ₹5-10k/month

## 8. Folder Structure Plan
```
vs_services_app/
├── PROJECT_PLAN.md
├── docs/                  # Design docs, wireframes
├── backend/               # Node.js + Express API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── mobile/                # React Native app
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── navigation/
│   │   └── services/
│   └── App.js
└── admin-panel/           # Web admin (React)
    └── src/
```

## 9. Step-by-Step Execution Plan

- [x] **Step 0:** Plan file create
- [ ] **Step 1:** Folder structure setup
- [ ] **Step 2:** Database schema design (MongoDB models)
- [ ] **Step 3:** Backend API skeleton (Node.js + Express)
- [ ] **Step 4:** Authentication APIs (OTP)
- [ ] **Step 5:** Service booking APIs
- [ ] **Step 6:** Accessories/Product APIs
- [ ] **Step 7:** Payment integration (Razorpay)
- [ ] **Step 8:** React Native app setup
- [ ] **Step 9:** UI screens (Login, Home, Booking, Cart, Payment)
- [ ] **Step 10:** Admin panel
- [ ] **Step 11:** Testing & deployment
