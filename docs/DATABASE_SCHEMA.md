# VS SERVICES — Database Schema (MongoDB)

## 1. User Collection
```js
{
  _id: ObjectId,
  name: String,
  mobile: String (unique, 10 digit),
  email: String,
  role: String (customer/admin/staff),
  addresses: [
    { label, line1, city, state, pincode, lat, lng }
  ],
  cars: [
    { brand, model, carNumber, year, fuelType }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## 2. Service Collection (Service types offered)
```js
{
  _id: ObjectId,
  name: String,         // Basic Service, Full Service, AC Service
  description: String,
  basePrice: Number,
  estimatedTime: String,
  category: String,     // service / checkup / repair
  image: String,
  isActive: Boolean
}
```

## 3. Booking Collection
```js
{
  _id: ObjectId,
  bookingId: String (VS-0001),
  userId: ObjectId (ref User),
  serviceId: ObjectId (ref Service),
  car: { brand, model, carNumber },
  bookingDate: Date,
  timeSlot: String,
  serviceMode: String,     // at_garage / home_service
  address: { ... },
  assignedStaff: ObjectId,
  status: String,          // booked/confirmed/assigned/in_progress/completed/cancelled
  totalAmount: Number,
  paymentMode: String,     // online / pay_on_service
  paymentStatus: String,   // pending / paid / failed
  notes: String,
  createdAt: Date
}
```

## 4. Product/Accessory Collection
```js
{
  _id: ObjectId,
  name: String,
  category: String,       // seat_cover, mats, perfume, audio, lights
  description: String,
  price: Number,
  discountPrice: Number,
  stock: Number,
  images: [String],
  rating: Number,
  isActive: Boolean
}
```

## 5. Order Collection (for accessories)
```js
{
  _id: ObjectId,
  orderId: String,
  userId: ObjectId,
  items: [
    { productId, name, price, quantity }
  ],
  totalAmount: Number,
  shippingAddress: { ... },
  paymentMode: String,
  paymentStatus: String,
  orderStatus: String,   // placed/shipped/delivered/cancelled
  createdAt: Date
}
```

## 6. Payment Collection
```js
{
  _id: ObjectId,
  userId: ObjectId,
  bookingId: ObjectId,
  orderId: ObjectId,
  amount: Number,
  paymentMode: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: String,
  createdAt: Date
}
```

## 7. Staff Collection
```js
{
  _id: ObjectId,
  name: String,
  mobile: String,
  role: String,          // mechanic / delivery
  isAvailable: Boolean,
  currentLocation: { lat, lng },
  assignedBookings: [ObjectId]
}
```
