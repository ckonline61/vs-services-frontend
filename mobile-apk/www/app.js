const $ = (id) => document.getElementById(id);
const app = $('app');

const PROD_API_URL = 'https://vs-services-api.onrender.com/api';
const isLocalBrowserPreview =
  (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') &&
  window.location.port === '4173';
const defaultApiUrl = isLocalBrowserPreview ? 'http://127.0.0.1:5000/api' : PROD_API_URL;

const I18N = {
  en: {
    appName: 'VS SERVICES',
    tagline: 'Check . Service . Drive Safe',
    home: 'Home',
    shop: 'Shop',
    bookings: 'Bookings',
    profile: 'Profile',
    login: 'Demo / Guest Login',
    welcome: 'Car care made simple',
    quick: 'Quick Actions',
    services: 'Services',
    support: 'Support Hub',
    estimate: 'Estimate',
    book: 'Book',
    rewards: 'Rewards',
    history: 'Service History',
    reminders: 'Reminders',
    tips: 'Car Care Tips',
    faq: 'FAQ',
    branches: 'Nearby Garage',
    emergency: 'Emergency Help'
  },
  hi: {
    appName: 'VS SERVICES',
    tagline: 'Check . Service . Drive Safe',
    home: 'Home',
    shop: 'Shop',
    bookings: 'Bookings',
    profile: 'Profile',
    login: 'Demo / Guest Login',
    welcome: 'Car care simple bana diya',
    quick: 'Quick Actions',
    services: 'Services',
    support: 'Support Hub',
    estimate: 'Estimate',
    book: 'Book',
    rewards: 'Rewards',
    history: 'Service History',
    reminders: 'Reminders',
    tips: 'Car Care Tips',
    faq: 'FAQ',
    branches: 'Nearby Garage',
    emergency: 'Emergency Help'
  }
};

const STATE = {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  apiUrl: localStorage.getItem('apiUrl') || defaultApiUrl,
  lang: localStorage.getItem('lang') || 'en',
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  services: [],
  products: [],
  bookings: [],
  history: [],
  reminders: [],
  rewards: null,
  support: { branches: [], emergency: [], faq: [], tips: [], packages: [], coupons: [] },
  current: 'splash',
  data: {},
  bookingForm: {},
  payMode: 'cod'
};

const t = (key) => I18N[STATE.lang]?.[key] || I18N.en[key] || key;

async function api(path, method = 'GET', body) {
  try {
    const response = await fetch(STATE.apiUrl + path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(STATE.token ? { Authorization: 'Bearer ' + STATE.token } : {})
      },
      body: body ? JSON.stringify(body) : undefined
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error: ' + e.message };
  }
}

function toast(msg) {
  const tNode = document.createElement('div');
  tNode.className = 'toast';
  tNode.textContent = msg;
  document.body.appendChild(tNode);
  setTimeout(() => tNode.remove(), 2500);
}

function save() {
  localStorage.setItem('token', STATE.token || '');
  localStorage.setItem('user', JSON.stringify(STATE.user));
  localStorage.setItem('cart', JSON.stringify(STATE.cart));
  localStorage.setItem('apiUrl', STATE.apiUrl);
  localStorage.setItem('lang', STATE.lang);
}

function money(value) {
  return `Rs ${Number(value || 0).toLocaleString('en-IN')}`;
}

function humanMode(mode) {
  return {
    at_garage: 'At Garage',
    home_service: 'Home Service',
    pickup_drop: 'Pickup & Drop'
  }[mode] || mode;
}

function nav(screen, data) {
  STATE.current = screen;
  STATE.data = data || {};
  render();
}

function logo(compact = false) {
  return `<div class="brand ${compact ? 'compact' : ''}"><img class="brand-logo" src="assets/vs-services-logo.png" alt="VS Services"></div>`;
}

function topbar(title, back) {
  return `<div class="topbar">
    ${back ? `<span class="back" onclick="nav('${back.screen}', ${back.data ? JSON.stringify(back.data).replace(/"/g, '&quot;') : 'null'})">&#8592;</span>` : ''}
    <span>${title}</span>
    <span style="flex:1"></span>
    <button class="lang-toggle" onclick="toggleLang()">${STATE.lang.toUpperCase()}</button>
  </div>`;
}

function tabbar(active) {
  const tabs = [
    ['home', 'Home', 'home'],
    ['accessories', 'Shop', 'shop'],
    ['bookings', 'Bookings', 'bookings'],
    ['profile', 'Profile', 'profile']
  ];
  return `<div class="tabbar">${tabs.map(([k, label, key]) => `
    <a class="${active === k ? 'active' : ''}" onclick="nav('${k}')">
      <span class="ic">${label === 'Home' ? 'H' : label === 'Shop' ? 'S' : label === 'Bookings' ? 'B' : 'P'}</span>${t(key)}
    </a>`).join('')}</div>`;
}

function bookingStatusBadge(status) {
  return `<span class="badge b-${status}">${String(status || '').replace(/_/g, ' ').toUpperCase()}</span>`;
}

function rewardCard() {
  const rewards = STATE.rewards || {
    walletPoints: STATE.user?.walletPoints || 0,
    walletBalance: STATE.user?.walletBalance || 0,
    referralCode: STATE.user?.referralCode || '-'
  };
  return `<div class="card">
    <div class="mini-title">${t('rewards')}</div>
    <div class="mini-grid">
      <div class="mini-stat"><b>${rewards.walletPoints || 0}</b><span>Points</span></div>
      <div class="mini-stat"><b>${money(rewards.walletBalance || 0)}</b><span>Wallet</span></div>
      <div class="mini-stat"><b>${rewards.referralCode || '-'}</b><span>Referral</span></div>
    </div>
  </div>`;
}

function remindersList() {
  return `${STATE.reminders.length ? STATE.reminders.map(reminder => `
    <div class="line-item">
      <div>
        <b>${reminder.title}</b>
        <div class="muted">${reminder.type} • ${new Date(reminder.dueDate).toDateString()}</div>
      </div>
      <button class="chip small" onclick="completeReminder('${reminder._id}', ${reminder.isCompleted ? 'false' : 'true'})">${reminder.isCompleted ? 'Pending' : 'Done'}</button>
    </div>`).join('') : `<div class="empty small">No reminders yet</div>`}`;
}

function historyList() {
  return `${STATE.history.length ? STATE.history.slice(0, 5).map(item => `
    <div class="line-item">
      <div>
        <b>${item.serviceName}</b>
        <div class="muted">${new Date(item.bookingDate).toDateString()} • ${bookingStatusBadge(item.status)}</div>
        ${item.estimatedNextServiceDue ? `<div class="muted">Next due: ${new Date(item.estimatedNextServiceDue).toDateString()}</div>` : ''}
      </div>
      <div class="amount">${money(item.amount)}</div>
    </div>`).join('') : `<div class="empty small">No service history yet</div>`}`;
}

const screens = {
  splash: () => `<div class="splash-wrap">
    <img class="brand-logo" src="assets/vs-services-logo.png" alt="VS Services">
    <div class="tag">${t('tagline')}</div>
    <div class="loader"></div>
  </div>`,

  login: () => `
    <div class="login">
      ${logo()}
      <div class="sub">Guest login, demo login, aur profile setup free hai. OTP ki zarurat nahi.</div>
      <label class="label">Name</label>
      <input id="setupName" placeholder="Vinod Kumar" value="${STATE.user?.name || ''}">
      <label class="label">Mobile</label>
      <input id="setupMobile" placeholder="10-digit mobile" maxlength="10" value="${STATE.user?.mobile || ''}">
      <button class="btn" onclick="registerGuest()">${t('login')}</button>
      <button class="btn btn-out" onclick="demoLogin()">One Tap Demo Login</button>
      <details style="margin-top:14px">
        <summary>Advanced API URL</summary>
        <input id="apiUrlInput" placeholder="https://..." value="${STATE.apiUrl}">
      </details>
    </div>`,

  home: () => `
    ${topbar(t('appName'))}
    <div class="screen">
      <div class="banner">
        ${logo(true)}
        <div class="hero-row">
          <div>
            <h2>${STATE.user?.name ? `Hi ${STATE.user.name}!` : t('welcome')}</h2>
            <p>Service history, car profile, reminders, pickup-drop, coupons, rewards aur admin-ready booking flow sab ek hi app me.</p>
          </div>
          <button class="chip active" onclick="nav('${STATE.token ? 'profile' : 'login'}')">${STATE.token ? 'Profile' : 'Login'}</button>
        </div>
      </div>
      <div class="section">${t('quick')}</div>
      <div class="grid quick-grid">
        <div class="action" onclick="nav('booking')"><div class="ic">SERVICE</div><div class="t">Book Service</div></div>
        <div class="action" onclick="nav('support')"><div class="ic">HELP</div><div class="t">Support Hub</div></div>
        <div class="action" onclick="nav('profile')"><div class="ic">CAR</div><div class="t">Car Profile</div></div>
        <div class="action" onclick="nav('bookings')"><div class="ic">TRACK</div><div class="t">Track Status</div></div>
      </div>
      ${rewardCard()}
      <div class="section">${t('services')}</div>
      ${STATE.services.map(service => `
        <div class="svc" onclick="nav('booking',{serviceId:'${service._id}'})">
          <div class="info">
            <div class="name">${service.name}</div>
            <div class="desc">${service.description || ''}</div>
            <div class="muted">${service.estimatedTime || '-'} • ${service.category}</div>
            <div class="price">${money(service.basePrice)}</div>
          </div>
          <div class="svc-actions">
            <button class="chip small" onclick="event.stopPropagation(); previewEstimate('${service._id}')">${t('estimate')}</button>
            <button class="chip small active" onclick="event.stopPropagation(); nav('booking',{serviceId:'${service._id}'})">${t('book')}</button>
          </div>
        </div>`).join('')}
      <div class="section">${t('tips')}</div>
      <div class="card stack-list">
        ${STATE.support.tips.slice(0, 2).map(tip => `<div><b>${tip.title}</b><div class="muted">${tip.body}</div></div>`).join('')}
        <button class="btn btn-out" onclick="nav('support')">Open Support Hub</button>
      </div>
    </div>
    ${tabbar('home')}`,

  accessories: () => `
    ${topbar('Accessories')}
    <div class="screen">
      <div class="section">Spare Parts & Accessories</div>
      <div class="pgrid">
        ${STATE.products.map(p => `
          <div class="pcard" onclick="nav('product',{id:'${p._id}'})">
            <div class="img">AUTO</div>
            <div class="pname">${p.name}</div>
            <div class="muted">${p.category}</div>
            <div><span class="price">${money(p.discountPrice || p.price)}</span>${p.discountPrice ? `<span class="strike">${money(p.price)}</span>` : ''}</div>
          </div>`).join('')}
      </div>
    </div>
    ${STATE.cart.length ? `<div class="fab" onclick="nav('cart')">Cart (${STATE.cart.length})</div>` : ''}
    ${tabbar('accessories')}`,

  product: () => {
    const p = STATE.products.find(x => x._id === STATE.data.id);
    if (!p) return `<div class="empty">Product not found</div>`;
    return `
      ${topbar(p.name, { screen: 'accessories' })}
      <div class="screen">
        <div class="card">
          <div class="img big">AUTO</div>
          <h2>${p.name}</h2>
          <div class="muted">${p.description || ''}</div>
          <div class="price big">${money(p.discountPrice || p.price)}</div>
          <div class="muted">Stock: ${p.stock}</div>
          <label class="label inline">Need this part with service?</label>
          <textarea id="partsReqText" placeholder="Example: Include this with my next service booking"></textarea>
          <button class="btn" onclick="addCart('${p._id}')">Add to Cart</button>
          <button class="btn btn-out" onclick="savePartsDraft('${p.name}')">Save as Spare Parts Request</button>
        </div>
      </div>`;
  },

  cart: () => {
    const total = STATE.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return `
      ${topbar('Cart', { screen: 'accessories' })}
      <div class="screen">
        ${STATE.cart.length ? STATE.cart.map(item => `
          <div class="line-item">
            <div>
              <b>${item.name}</b>
              <div class="muted">${money(item.price)} x ${item.quantity}</div>
            </div>
            <button class="chip small" onclick="removeCart('${item.productId}')">Remove</button>
          </div>`).join('') : `<div class="empty">Cart is empty</div>`}
        ${STATE.cart.length ? `<div class="card">
          <div class="kv"><span>Total</span><span>${money(total)}</span></div>
          <input id="addr" placeholder="Address line">
          <input id="city" placeholder="City">
          <input id="pin" placeholder="Pincode">
          <div class="row">
            <div class="chip ${STATE.payMode === 'cod' ? 'active' : ''}" onclick="STATE.payMode='cod';render()">Cash / UPI on Delivery</div>
            <div class="chip ${STATE.payMode === 'online' ? 'active' : ''}" onclick="STATE.payMode='online';render()">Demo Online</div>
          </div>
          <button class="btn" onclick="placeOrder()">Place Order</button>
        </div>` : '' }
      </div>
      ${tabbar('accessories')}`;
  },

  booking: () => {
    const selected = STATE.data.serviceId || STATE.bookingForm.serviceId;
    const list = STATE.services;
    return `
      ${topbar('Book Service', { screen: 'home' })}
      <div class="screen">
        <div class="label">Select Service</div>
        ${list.map(service => `<div class="card selectable ${selected === service._id ? 'selected' : ''}" onclick="STATE.bookingForm.serviceId='${service._id}';render()">
          <b>${service.name}</b><div class="muted">${service.description}</div><div class="price">${money(service.basePrice)}</div></div>`).join('')}
        <div class="label">Car Profile</div>
        <div class="card">
          <div class="row">
            <input id="cBrand" placeholder="Brand" value="${STATE.bookingForm.brand || STATE.user?.cars?.[0]?.brand || ''}">
            <input id="cModel" placeholder="Model" value="${STATE.bookingForm.model || STATE.user?.cars?.[0]?.model || ''}">
          </div>
          <div class="row">
            <input id="cNumber" placeholder="Car Number" value="${STATE.bookingForm.carNumber || STATE.user?.cars?.[0]?.carNumber || ''}">
            <select id="cFuel">
              ${['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'].map(f => `<option ${((STATE.bookingForm.fuelType || STATE.user?.cars?.[0]?.fuelType) === f) ? 'selected' : ''}>${f}</option>`).join('')}
            </select>
          </div>
          <div class="row">
            <input id="cYear" type="number" placeholder="Year" value="${STATE.bookingForm.year || STATE.user?.cars?.[0]?.year || ''}">
            <input id="cRc" placeholder="RC Number" value="${STATE.bookingForm.rcNumber || STATE.user?.cars?.[0]?.rcNumber || ''}">
          </div>
        </div>
        <div class="label">Service Mode</div>
        <div class="row">
          ${[['at_garage', 'At Garage'], ['home_service', 'Home Service'], ['pickup_drop', 'Pickup & Drop']].map(([mode, label]) => `<div class="chip ${(STATE.bookingForm.mode || 'at_garage') === mode ? 'active' : ''}" onclick="STATE.bookingForm.mode='${mode}';render()">${label}</div>`).join('')}
        </div>
        ${['home_service', 'pickup_drop'].includes(STATE.bookingForm.mode || 'at_garage') ? `
          <div class="card">
            <input id="bAddr" placeholder="Address line" value="${STATE.bookingForm.addr || ''}">
            <div class="row">
              <input id="bCity" placeholder="City" value="${STATE.bookingForm.city || ''}">
              <input id="bPin" placeholder="Pincode" value="${STATE.bookingForm.pin || ''}">
            </div>
          </div>` : ''}
        <div class="card">
          <div class="row">
            <input id="bDate" type="date" value="${STATE.bookingForm.date || ''}">
            <select id="bSlot">${['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'].map(slot => `<option ${((STATE.bookingForm.slot || '10:00 AM') === slot) ? 'selected' : ''}>${slot}</option>`).join('')}</select>
          </div>
          <input id="couponCode" placeholder="Coupon code (WELCOME10)" value="${STATE.bookingForm.couponCode || ''}">
          <input id="partsEstimate" type="number" placeholder="Estimated parts cost (optional)" value="${STATE.bookingForm.partsEstimate || ''}">
          <textarea id="sparePartsRequest" placeholder="Spare parts request">${STATE.bookingForm.sparePartsRequest || localStorage.getItem('sparePartsDraft') || ''}</textarea>
          <textarea id="inspectionPhotos" placeholder="Photo URLs comma separated">${STATE.bookingForm.inspectionPhotos || ''}</textarea>
          <div class="row">
            ${[['pay_on_service', 'Cash / UPI / Pay at garage'], ['online', 'Demo online payment']].map(([mode, label]) => `<div class="chip ${(STATE.bookingForm.pay || 'pay_on_service') === mode ? 'active' : ''}" onclick="STATE.bookingForm.pay='${mode}';render()">${label}</div>`).join('')}
          </div>
          <button class="btn btn-out" onclick="calculateEstimate()">Calculate Estimate</button>
          ${STATE.bookingForm.estimate ? `
            <div class="estimate-box">
              <div class="kv"><span>Base</span><span>${money(STATE.bookingForm.estimate.basePrice)}</span></div>
              <div class="kv"><span>Pickup/Home</span><span>${money((STATE.bookingForm.estimate.pickupCharge || 0) + (STATE.bookingForm.estimate.homeVisitCharge || 0))}</span></div>
              <div class="kv"><span>Parts</span><span>${money(STATE.bookingForm.estimate.partsEstimate)}</span></div>
              <div class="kv"><span>Discount</span><span>- ${money(STATE.bookingForm.estimate.discount)}</span></div>
              <div class="kv total"><span>Estimated Total</span><span>${money(STATE.bookingForm.estimate.finalAmount)}</span></div>
            </div>` : ''}
          <button class="btn" onclick="submitBooking()">Confirm Booking</button>
        </div>
      </div>`;
  },

  bookings: () => `
    ${topbar('My Bookings')}
    <div class="screen">
      ${STATE.bookings.length ? STATE.bookings.map(b => `
        <div class="bk" onclick="nav('bookingDetail',{id:'${b._id}'})">
          <div class="info">
            <div class="bid">${b.bookingId}</div>
            <div class="name">${b.serviceId?.name || 'Service'}</div>
            <div class="sub">${new Date(b.bookingDate).toDateString()} • ${b.timeSlot || '-'}</div>
            <div class="sub">${money(b.totalAmount)} • ${humanMode(b.serviceMode)}</div>
          </div>
          ${bookingStatusBadge(b.status)}
        </div>`).join('') : `<div class="empty">No bookings yet</div>`}
      <div class="section">${t('history')}</div>
      <div class="card">${historyList()}</div>
    </div>
    ${tabbar('bookings')}`,

  bookingDetail: () => {
    const booking = STATE.bookings.find(x => x._id === STATE.data.id);
    if (!booking) return `${topbar('Booking', { screen: 'bookings' })}<div class="empty">Booking not found</div>`;
    return `
      ${topbar(booking.bookingId, { screen: 'bookings' })}
      <div class="screen">
        <div class="card">
          <div class="kv"><span>Service</span><span>${booking.serviceId?.name || '-'}</span></div>
          <div class="kv"><span>Status</span><span>${bookingStatusBadge(booking.status)}</span></div>
          <div class="kv"><span>Mode</span><span>${humanMode(booking.serviceMode)}</span></div>
          <div class="kv"><span>Payment</span><span>${booking.paymentMode} • ${bookingStatusBadge(booking.paymentStatus)}</span></div>
          <div class="kv"><span>Total</span><span>${money(booking.totalAmount)}</span></div>
          ${booking.estimatedNextServiceDue ? `<div class="kv"><span>Next Service Due</span><span>${new Date(booking.estimatedNextServiceDue).toDateString()}</span></div>` : ''}
        </div>
        ${booking.statusTimeline?.length ? `<div class="card"><div class="mini-title">Status Timeline</div>${booking.statusTimeline.map(item => `
          <div class="timeline-item"><b>${item.status.replace(/_/g, ' ')}</b><div class="muted">${item.note || ''}</div><div class="muted">${new Date(item.at).toLocaleString()}</div></div>`).join('')}</div>` : ''}
        ${booking.estimate ? `<div class="card"><div class="mini-title">Estimate</div>
          <div class="kv"><span>Base</span><span>${money(booking.estimate.basePrice)}</span></div>
          <div class="kv"><span>Discount</span><span>${money(booking.estimate.discount)}</span></div>
          <div class="kv"><span>Final</span><span>${money(booking.estimate.finalAmount)}</span></div>
        </div>` : ''}
        ${booking.review ? `<div class="card"><div class="mini-title">Review</div><div>${'★'.repeat(booking.review.rating)}${'☆'.repeat(5 - booking.review.rating)}</div><div class="muted">${booking.review.comment || ''}</div></div>` : ''}
        ${booking.beforeAfterGallery?.length ? `<div class="card"><div class="mini-title">Before / After Gallery</div>${booking.beforeAfterGallery.map(item => `<div class="muted">${item.label}: ${item.url}</div>`).join('')}</div>` : ''}
        <div class="card">
          <div class="mini-title">Actions</div>
          ${booking.paymentStatus !== 'paid' && booking.paymentMode === 'online' ? `<button class="btn" onclick="payNow('${booking._id}', ${booking.totalAmount})">Pay Now</button>` : ''}
          ${['booked', 'confirmed'].includes(booking.status) ? `<button class="btn btn-er" onclick="cancelBooking('${booking._id}')">Cancel Booking</button>` : ''}
          ${booking.status === 'completed' && !booking.review ? `
            <select id="reviewRating"><option value="5">5 Star</option><option value="4">4 Star</option><option value="3">3 Star</option><option value="2">2 Star</option><option value="1">1 Star</option></select>
            <textarea id="reviewComment" placeholder="Write your feedback"></textarea>
            <button class="btn btn-out" onclick="submitReview('${booking._id}')">Submit Review</button>` : ''}
          <button class="btn btn-out" onclick="downloadInvoice('${booking._id}')">Invoice</button>
        </div>
      </div>`;
  },

  support: () => `
    ${topbar(t('support'), { screen: 'home' })}
    <div class="screen">
      <div class="section">${t('branches')}</div>
      <div class="card stack-list">${STATE.support.branches.map(branch => `<div>
        <b>${branch.name}</b>
        <div class="muted">${branch.address}</div>
        <a href="${branch.mapUrl}" target="_blank" class="mini-link">Open Map</a>
      </div>`).join('')}</div>
      <div class="section">${t('emergency')}</div>
      <div class="grid quick-grid">${STATE.support.emergency.map(item => `<div class="action">
        <div class="ic">SOS</div>
        <div class="t">${item.title}</div>
        <a href="tel:${item.phone.replace(/\s+/g, '')}" class="mini-link">${item.eta}</a>
      </div>`).join('')}</div>
      <div class="section">${t('tips')}</div>
      <div class="card stack-list">${STATE.support.tips.map(tip => `<div><b>${tip.title}</b><div class="muted">${tip.body}</div></div>`).join('')}</div>
      <div class="section">${t('faq')}</div>
      <div class="card stack-list">${STATE.support.faq.map(item => `<div><b>${item.q}</b><div class="muted">${item.a}</div></div>`).join('')}</div>
      <div class="section">Packages & Coupons</div>
      <div class="card stack-list">
        ${STATE.support.packages.map(item => `<div><b>${item.name} - ${money(item.price)}</b><div class="muted">${item.benefits.join(', ')}</div></div>`).join('')}
        ${STATE.support.coupons.map(item => `<div><b>${item.code}</b><div class="muted">${item.description} • ${item.value}</div></div>`).join('')}
      </div>
      <div class="card">
        <div class="mini-title">WhatsApp</div>
        <a class="btn" href="https://wa.me/918839533202?text=Hi%20I%20need%20car%20service%20help">Chat on WhatsApp</a>
      </div>
    </div>`,

  profile: () => `
    ${topbar('Profile')}
    <div class="screen">
      <div class="profile-h">
        ${logo(true)}
        <h2>${STATE.user?.name || 'Guest'}</h2>
        <div>${STATE.user?.mobile || 'No mobile linked'}</div>
      </div>
      <div class="card">
        <div class="mini-title">Profile & Language</div>
        <input id="pName" placeholder="Name" value="${STATE.user?.name || ''}">
        <input id="pEmail" placeholder="Email" value="${STATE.user?.email || ''}">
        <div class="row">
          <div class="chip ${STATE.lang === 'en' ? 'active' : ''}" onclick="setLang('en')">English</div>
          <div class="chip ${STATE.lang === 'hi' ? 'active' : ''}" onclick="setLang('hi')">Hindi</div>
        </div>
        <button class="btn" onclick="saveProfile()">Save Profile</button>
      </div>
      ${rewardCard()}
      <div class="card">
        <div class="mini-title">Car Profile</div>
        ${(STATE.user?.cars || []).map(car => `<div class="line-item">
          <div><b>${car.brand || ''} ${car.model || ''}</b><div class="muted">${car.carNumber} • ${car.fuelType || '-'}</div><div class="muted">RC: ${car.rcNumber || '-'} ${car.insuranceExpiry ? `• Insurance: ${new Date(car.insuranceExpiry).toDateString()}` : ''}</div></div>
          <button class="chip small" onclick="removeCar('${car._id}')">Remove</button>
        </div>`).join('')}
        <input id="carBrand" placeholder="Brand">
        <input id="carModel" placeholder="Model">
        <div class="row">
          <input id="carNumber" placeholder="Car Number">
          <select id="carFuel"><option>Petrol</option><option>Diesel</option><option>CNG</option><option>Electric</option><option>Hybrid</option></select>
        </div>
        <div class="row">
          <input id="carYear" type="number" placeholder="Year">
          <input id="carRc" placeholder="RC Number">
        </div>
        <div class="row">
          <input id="carInsurance" type="date" placeholder="Insurance expiry">
          <input id="carPuc" type="date" placeholder="PUC expiry">
        </div>
        <button class="btn btn-out" onclick="addCar()">Add Car</button>
      </div>
      <div class="card">
        <div class="mini-title">${t('reminders')}</div>
        ${remindersList()}
        <input id="remTitle" placeholder="Reminder title">
        <div class="row">
          <select id="remType"><option value="service">Service</option><option value="insurance">Insurance</option><option value="puc">PUC</option><option value="tyre">Tyre</option><option value="custom">Custom</option></select>
          <input id="remDate" type="date">
        </div>
        <textarea id="remNote" placeholder="Reminder note"></textarea>
        <button class="btn btn-out" onclick="addReminder()">Add Reminder</button>
      </div>
      <div class="card">
        <div class="mini-title">${t('history')}</div>
        ${historyList()}
      </div>
      <div class="card stack-list">
        <button class="btn btn-out" onclick="nav('support')">Open Support Hub</button>
        <button class="btn btn-er" onclick="logout()">Logout</button>
      </div>
    </div>
    ${tabbar('profile')}`
};

function render() {
  app.innerHTML = (screens[STATE.current] || screens.splash)();
}

async function loadInitData() {
  const [services, products, support] = await Promise.all([
    api('/services'),
    api('/products'),
    api('/support')
  ]);
  STATE.services = services.services || [];
  STATE.products = products.products || [];
  if (support.success) STATE.support = support;

  if (STATE.token) {
    const [me, bookings, history, reminders, rewards] = await Promise.all([
      api('/users/me'),
      api('/bookings/my'),
      api('/users/history'),
      api('/users/reminders'),
      api('/users/rewards')
    ]);
    if (me.success) STATE.user = me.user;
    STATE.bookings = bookings.bookings || [];
    STATE.history = history.history || [];
    STATE.reminders = reminders.reminders || [];
    STATE.rewards = rewards.rewards || null;
    save();
  }
}

async function registerGuest() {
  const name = ($('setupName')?.value || '').trim();
  const mobile = ($('setupMobile')?.value || '').trim();
  const apiUrlInput = ($('apiUrlInput')?.value || '').trim();
  if (apiUrlInput) STATE.apiUrl = apiUrlInput;
  if (name.length < 2) return toast('Please enter name');
  if (!/^\d{10}$/.test(mobile)) return toast('Enter valid 10-digit mobile');
  const response = await api('/auth/register-guest', 'POST', { name, mobile });
  if (!response.success) return toast(response.message || 'Login failed');
  STATE.token = response.token;
  STATE.user = response.user;
  save();
  await loadInitData();
  nav('home');
}

async function demoLogin() {
  const response = await api('/auth/demo-login', 'POST', {});
  if (!response.success) return toast(response.message || 'Demo login failed');
  STATE.token = response.token;
  STATE.user = response.user;
  save();
  await loadInitData();
  toast('Demo login ready');
  nav('home');
}

function logout() {
  STATE.token = null;
  STATE.user = null;
  STATE.bookings = [];
  STATE.history = [];
  STATE.reminders = [];
  STATE.rewards = null;
  save();
  nav('login');
}

function setLang(lang) {
  STATE.lang = lang;
  if (STATE.user) saveProfile(true);
  else {
    save();
    render();
  }
}

function toggleLang() {
  setLang(STATE.lang === 'en' ? 'hi' : 'en');
}

async function saveProfile(silent = false) {
  if (!STATE.token) return nav('login');
  const body = {
    name: $('pName')?.value || STATE.user?.name,
    email: $('pEmail')?.value || STATE.user?.email,
    preferredLanguage: STATE.lang
  };
  const response = await api('/users/me', 'PUT', body);
  if (!response.success) return toast(response.message || 'Profile save failed');
  STATE.user = response.user;
  save();
  render();
  if (!silent) toast('Profile saved');
}

async function addCar() {
  if (!STATE.token) return nav('login');
  const body = {
    brand: $('carBrand').value,
    model: $('carModel').value,
    carNumber: $('carNumber').value.toUpperCase(),
    fuelType: $('carFuel').value,
    year: $('carYear').value ? Number($('carYear').value) : undefined,
    rcNumber: $('carRc').value,
    insuranceExpiry: $('carInsurance').value || undefined,
    pucExpiry: $('carPuc').value || undefined
  };
  const response = await api('/users/cars', 'POST', body);
  if (!response.success) return toast(response.message || 'Car add failed');
  STATE.user.cars = response.cars;
  save();
  render();
  toast('Car profile added');
}

async function removeCar(id) {
  const response = await api('/users/cars/' + id, 'DELETE');
  if (!response.success) return toast(response.message || 'Remove failed');
  STATE.user.cars = response.cars;
  save();
  render();
}

async function addReminder() {
  const body = {
    title: $('remTitle').value,
    type: $('remType').value,
    dueDate: $('remDate').value,
    note: $('remNote').value
  };
  if (!body.title || !body.dueDate) return toast('Title and due date required');
  const response = await api('/users/reminders', 'POST', body);
  if (!response.success) return toast(response.message || 'Reminder failed');
  STATE.reminders = response.reminders;
  render();
}

async function completeReminder(id, done) {
  const isCompleted = done === true || done === 'true';
  const response = await api('/users/reminders/' + id, 'PUT', { isCompleted });
  if (!response.success) return toast(response.message || 'Reminder update failed');
  STATE.reminders = response.reminders;
  render();
}

function savePartsDraft(name) {
  const note = $('partsReqText')?.value || `Need ${name} with next service`;
  localStorage.setItem('sparePartsDraft', note);
  toast('Spare parts request saved');
}

async function calculateEstimate() {
  const serviceId = STATE.bookingForm.serviceId || STATE.data.serviceId;
  if (!serviceId) return toast('Select service first');
  STATE.bookingForm.serviceId = serviceId;
  STATE.bookingForm.mode = STATE.bookingForm.mode || 'at_garage';
  STATE.bookingForm.couponCode = $('couponCode')?.value || '';
  STATE.bookingForm.partsEstimate = $('partsEstimate')?.value || 0;
  const response = await api('/bookings/estimate', 'POST', {
    serviceId,
    serviceMode: STATE.bookingForm.mode,
    couponCode: STATE.bookingForm.couponCode,
    partsEstimate: STATE.bookingForm.partsEstimate
  });
  if (!response.success) return toast(response.message || 'Estimate failed');
  STATE.bookingForm.estimate = response.estimate;
  render();
}

async function previewEstimate(serviceId) {
  STATE.bookingForm.serviceId = serviceId;
  await calculateEstimate();
  nav('booking', { serviceId });
}

async function submitBooking() {
  if (!STATE.token) return nav('login');
  const serviceId = STATE.bookingForm.serviceId || STATE.data.serviceId;
  if (!serviceId) return toast('Select service');

  STATE.bookingForm = {
    ...STATE.bookingForm,
    serviceId,
    brand: $('cBrand').value,
    model: $('cModel').value,
    carNumber: $('cNumber').value.toUpperCase(),
    fuelType: $('cFuel').value,
    year: $('cYear').value,
    rcNumber: $('cRc').value,
    mode: STATE.bookingForm.mode || 'at_garage',
    date: $('bDate').value,
    slot: $('bSlot').value,
    couponCode: $('couponCode').value,
    partsEstimate: $('partsEstimate').value,
    sparePartsRequest: $('sparePartsRequest').value,
    inspectionPhotos: $('inspectionPhotos').value
  };

  if (!STATE.bookingForm.carNumber || !STATE.bookingForm.date) return toast('Car number and date required');

  const body = {
    serviceId,
    car: {
      brand: STATE.bookingForm.brand,
      model: STATE.bookingForm.model,
      carNumber: STATE.bookingForm.carNumber,
      fuelType: STATE.bookingForm.fuelType,
      year: STATE.bookingForm.year,
      rcNumber: STATE.bookingForm.rcNumber
    },
    bookingDate: STATE.bookingForm.date,
    timeSlot: STATE.bookingForm.slot,
    serviceMode: STATE.bookingForm.mode,
    address: ['home_service', 'pickup_drop'].includes(STATE.bookingForm.mode) ? {
      line1: $('bAddr').value,
      city: $('bCity').value,
      pincode: $('bPin').value
    } : undefined,
    paymentMode: STATE.bookingForm.pay || 'pay_on_service',
    couponCode: STATE.bookingForm.couponCode,
    partsEstimate: Number(STATE.bookingForm.partsEstimate || 0),
    sparePartsRequest: STATE.bookingForm.sparePartsRequest,
    inspectionPhotos: (STATE.bookingForm.inspectionPhotos || '').split(',').map(x => x.trim()).filter(Boolean)
  };

  const response = await api('/bookings', 'POST', body);
  if (!response.success) return toast(response.message || 'Booking failed');
  STATE.bookingForm = {};
  localStorage.removeItem('sparePartsDraft');
  await loadInitData();
  toast('Booking confirmed');
  if (body.paymentMode === 'online') payNow(response.booking._id, response.booking.totalAmount);
  else nav('bookingDetail', { id: response.booking._id });
}

async function cancelBooking(id) {
  const response = await api('/bookings/' + id + '/cancel', 'PUT');
  if (!response.success) return toast(response.message || 'Cancel failed');
  await loadInitData();
  nav('bookings');
}

async function submitReview(id) {
  const rating = Number($('reviewRating').value);
  const comment = $('reviewComment').value;
  const response = await api('/bookings/' + id + '/review', 'POST', { rating, comment });
  if (!response.success) return toast(response.message || 'Review failed');
  await loadInitData();
  nav('bookingDetail', { id });
}

async function downloadInvoice(id) {
  const response = await api('/bookings/' + id + '/invoice');
  if (!response.success) return toast(response.message || 'Invoice failed');
  const invoice = response.invoice;
  const blob = new Blob([invoice.html || 'Invoice unavailable'], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${invoice.invoiceNo}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

async function payNow(bookingId, amount) {
  const response = await api('/payments/create-order', 'POST', { amount, bookingId });
  if (!response.success) return toast(response.message || 'Payment init failed');
  const verify = await api('/payments/verify', 'POST', {
    razorpayOrderId: response.razorpayOrderId,
    razorpayPaymentId: 'mock_payment_' + Date.now(),
    razorpaySignature: 'mock_signature',
    paymentId: response.paymentId
  });
  if (!verify.success) return toast(verify.message || 'Payment failed');
  await loadInitData();
  toast('Payment successful');
  nav('bookings');
}

function addCart(id) {
  const product = STATE.products.find(p => p._id === id);
  if (!product) return;
  const existing = STATE.cart.find(item => item.productId === id);
  if (existing) existing.quantity += 1;
  else STATE.cart.push({ productId: id, name: product.name, price: product.discountPrice || product.price, quantity: 1 });
  save();
  toast('Added to cart');
}

function removeCart(id) {
  STATE.cart = STATE.cart.filter(item => item.productId !== id);
  save();
  render();
}

async function placeOrder() {
  if (!STATE.token) return nav('login');
  const response = await api('/orders', 'POST', {
    items: STATE.cart.map(item => ({ productId: item.productId, quantity: item.quantity })),
    shippingAddress: {
      line1: $('addr').value,
      city: $('city').value,
      pincode: $('pin').value
    },
    paymentMode: STATE.payMode === 'online' ? 'online' : 'cod'
  });
  if (!response.success) return toast(response.message || 'Order failed');
  STATE.cart = [];
  save();
  toast('Order placed');
  nav('home');
}

(async () => {
  render();
  const splashDelay = new Promise(resolve => setTimeout(resolve, 1200));
  await Promise.all([loadInitData(), splashDelay]);
  nav(STATE.token ? 'home' : 'home');
})();
