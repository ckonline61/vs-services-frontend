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
  theme: localStorage.getItem('theme') || 'light',
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  services: [],
  products: [],
  bookings: [],
  orders: [],
  history: [],
  reminders: [],
  rewards: null,
  wishlist: [],
  recommendations: [],
  productSearch: '',
  productCategory: '',
  support: { branches: [], emergency: [], faq: [], tips: [], packages: [], coupons: [] },
  current: 'splash',
  data: {},
  bookingForm: {},
  payMode: 'cod',
  navStack: [],
  loading: false,
  coupons: [],
  notifications: [],
  notifUnread: 0
};

const t = (key) => I18N[STATE.lang]?.[key] || I18N.en[key] || key;

let _apiInflight = 0;
async function api(path, method = 'GET', body, opts = {}) {
  const showSpin = opts.silent !== true;
  if (showSpin) { _apiInflight++; if (_apiInflight === 1) showLoader('Loading...'); }
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
  } finally {
    if (showSpin) { _apiInflight = Math.max(0, _apiInflight - 1); if (_apiInflight === 0) hideLoader(); }
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
  localStorage.setItem('theme', STATE.theme);
}

function applyTheme() {
  document.body.setAttribute('data-theme', STATE.theme === 'dark' ? 'dark' : 'light');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', STATE.theme === 'dark' ? '#0A1933' : '#0A1933');
}

function toggleTheme() {
  STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
  save();
  applyTheme();
  if (STATE.token) api('/users/me', 'PUT', { themePreference: STATE.theme });
  render();
}

function isWished(productId) {
  return (STATE.wishlist || []).some(p => (p._id || p) === productId);
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
  if (STATE.current && STATE.current !== screen && STATE.current !== 'splash') {
    STATE.navStack.push({ screen: STATE.current, data: STATE.data });
    if (STATE.navStack.length > 30) STATE.navStack.shift();
  }
  STATE.current = screen;
  STATE.data = data || {};
  try { history.pushState({ screen }, '', '#' + screen); } catch (e) {}
  render();
}

function navBack() {
  if (STATE.navStack && STATE.navStack.length > 0) {
    const prev = STATE.navStack.pop();
    STATE.current = prev.screen;
    STATE.data = prev.data || {};
    render();
    return true;
  }
  // top-level tabs: jump to home if not already
  if (STATE.current !== 'home' && STATE.current !== 'splash' && STATE.current !== 'login') {
    STATE.current = 'home';
    STATE.data = {};
    render();
    return true;
  }
  return false; // allow app to exit
}

function showLoader(msg) {
  let el = document.getElementById('globalLoader');
  if (!el) {
    el = document.createElement('div');
    el.id = 'globalLoader';
    el.className = 'global-loader';
    el.innerHTML = '<div class="gl-card"><div class="loader"></div><div class="gl-msg"></div></div>';
    document.body.appendChild(el);
  }
  el.querySelector('.gl-msg').textContent = msg || 'Loading...';
  el.classList.add('show');
}

function hideLoader() {
  const el = document.getElementById('globalLoader');
  if (el) el.classList.remove('show');
}

function logo(compact = false) {
  return `<div class="brand ${compact ? 'compact' : ''}"><img class="brand-logo" src="assets/vs-services-logo.png" alt="VS Services"></div>`;
}

function topbar(title, back) {
  return `<div class="topbar">
    ${back ? `<span class="back" onclick="nav('${back.screen}', ${back.data ? JSON.stringify(back.data).replace(/"/g, '&quot;') : 'null'})">&#8592;</span>` : ''}
    <span>${title}</span>
    <span style="flex:1"></span>
    ${STATE.token ? `<button class="lang-toggle" onclick="openNotifications()" style="margin-right:6px;position:relative">🔔${STATE.notifUnread ? `<span style="position:absolute;top:-4px;right:-4px;background:#FF4D6D;color:#fff;border-radius:50%;min-width:16px;height:16px;font-size:9px;display:flex;align-items:center;justify-content:center;font-weight:700;border:1.5px solid var(--navy)">${STATE.notifUnread}</span>` : ''}</button>` : ''}
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
  const s = String(status || '').toLowerCase();
  return `<span class="badge-dot badge-${s}">${s.replace(/_/g, ' ')}</span>`;
}

function initials(name) {
  if (!name) return 'VS';
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('');
}

function greetingText() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function emptyState(icon, title, desc) {
  return `<div class="empty"><span class="empty-ic">${icon}</span><div class="empty-title">${title}</div><div class="empty-desc">${desc || ''}</div></div>`;
}

function rewardCard() {
  const rewards = STATE.rewards || {
    walletPoints: STATE.user?.walletPoints || 0,
    walletBalance: STATE.user?.walletBalance || 0,
    referralCode: STATE.user?.referralCode || '-'
  };
  return `<div class="card reward-glow">
    <div class="mini-title">🎁 ${t('rewards')}</div>
    <div class="mini-grid">
      <div class="mini-stat"><b>${rewards.walletPoints || 0}</b><span>POINTS</span></div>
      <div class="mini-stat"><b>${money(rewards.walletBalance || 0)}</b><span>WALLET</span></div>
      <div class="mini-stat"><b>${rewards.referralCode || '-'}</b><span>REFERRAL</span></div>
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
      <button class="login-close" onclick="nav('home')" aria-label="Close">&times;</button>
      <div class="login-top">
        ${logo()}
        <div class="login-title">Welcome to VS SERVICES</div>
        <div class="sub">Guest login free hai • No OTP • No password<br>Sirf naam aur mobile daalo, ho gaya.</div>
      </div>
      <div class="login-form">
        <label class="label">Your Name</label>
        <input id="setupName" placeholder="e.g. Vinod Kumar" value="${STATE.user?.name || ''}">
        <label class="label">Mobile Number</label>
        <input id="setupMobile" placeholder="10-digit mobile" maxlength="10" inputmode="numeric" value="${STATE.user?.mobile || ''}">
        <button class="btn btn-gradient" onclick="registerGuest()">Continue &rarr;</button>
        <div class="divider"><span>OR</span></div>
        <button class="btn btn-out" onclick="demoLogin()">⚡ One-Tap Demo Login</button>
        <button class="btn btn-ghost" onclick="nav('home')">Skip for now</button>
        <details class="adv-api">
          <summary>Advanced: change API URL</summary>
          <input id="apiUrlInput" placeholder="https://..." value="${STATE.apiUrl}">
        </details>
        <div class="login-foot">Problem? Call <a href="tel:8839533202">8839533202</a> or <a href="https://wa.me/918839533202">WhatsApp</a></div>
      </div>
    </div>`,

  home: () => `
    ${topbar(t('appName'))}
    <div class="screen">
      <div class="hero">
        <div class="hero-greeting">${greetingText()}${STATE.user?.name ? ',' : ''}</div>
        <div class="hero-title">${STATE.user?.name ? STATE.user.name.split(' ')[0] : 'Welcome!'}</div>
        <div class="hero-sub">Aapki car ki complete care — booking, parts, reminders, rewards — sab ek jagah.</div>
        <div class="hero-cta">
          <span class="chip-cta primary" onclick="nav('booking')">🔧 Book Service</span>
          <span class="chip-cta" onclick="nav('${STATE.token ? 'profile' : 'login'}')">${STATE.token ? '👤 Profile' : '🔑 Login'}</span>
          <span class="chip-cta" onclick="window.location.href='tel:8839533202'">📞 Call Us</span>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><b>${STATE.bookings.length}</b><span>BOOKINGS</span></div>
          <div class="hero-stat"><b>${(STATE.rewards?.walletPoints || STATE.user?.walletPoints || 0)}</b><span>POINTS</span></div>
          <div class="hero-stat"><b>${STATE.user?.cars?.length || 0}</b><span>MY CARS</span></div>
        </div>
      </div>
      <div class="section">${t('quick')}</div>
      <div class="grid quick-grid">
        <div class="action" onclick="nav('booking')"><div class="ic-wrap">🔧</div><div class="t">Book Service</div></div>
        <div class="action" onclick="nav('accessories')"><div class="ic-wrap">🛒</div><div class="t">Shop Parts</div></div>
        <div class="action" onclick="nav('orders')"><div class="ic-wrap">📦</div><div class="t">My Orders</div></div>
        <div class="action" onclick="nav('wishlist')"><div class="ic-wrap">❤️</div><div class="t">Wishlist</div></div>
        <div class="action" onclick="nav('bookings')"><div class="ic-wrap">📅</div><div class="t">Track Booking</div></div>
        <div class="action" onclick="nav('support')"><div class="ic-wrap">🛟</div><div class="t">Support</div></div>
      </div>
      ${STATE.recommendations.length ? `<div class="rec-card">
        <div class="rec-title">🤖 Recommended for You</div>
        ${STATE.recommendations.slice(0, 3).map(rec => `
          <div class="rec-item" onclick="${rec.serviceId ? `nav('booking',{serviceId:'${rec.serviceId}'})` : 'nav(\'support\')'}">
            <div class="rec-name">${rec.name}</div>
            <div class="rec-reason">${rec.reason}</div>
            <span class="rec-prio ${rec.priority || ''}">${(rec.priority || 'info').toUpperCase()}</span>
            ${rec.basePrice ? `<span style="float:right;font-weight:700">${money(rec.basePrice)}</span>` : ''}
          </div>`).join('')}
      </div>` : ''}
      ${rewardCard()}
      <div class="section">${t('services')}</div>
      ${STATE.services.map(service => `
        <div class="svc" onclick="nav('booking',{serviceId:'${service._id}'})">
          <div class="info">
            <div class="name">${service.name}</div>
            <div class="desc">${service.description || ''}</div>
            <span class="badge-category">${service.category}</span>
            <div class="muted" style="margin-top:6px">⏱ ${service.estimatedTime || '-'}</div>
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

  accessories: () => {
    const search = (STATE.productSearch || '').toLowerCase();
    const cat = STATE.productCategory || '';
    const categories = [...new Set(STATE.products.map(p => p.category).filter(Boolean))];
    const filtered = STATE.products.filter(p => {
      if (cat && p.category !== cat) return false;
      if (search && !(p.name || '').toLowerCase().includes(search)) return false;
      return true;
    });
    return `
    ${topbar('Accessories')}
    <div class="search-wrap">
      <input id="productSearchInput" placeholder="Search products..." value="${STATE.productSearch || ''}" oninput="STATE.productSearch=this.value;filterProductsDebounced()">
      <button class="chip small" onclick="nav('wishlist')">❤ ${STATE.wishlist.length}</button>
    </div>
    <div class="cat-chips">
      <div class="chip ${!cat ? 'active' : ''}" onclick="STATE.productCategory='';render()">All</div>
      ${categories.map(c => `<div class="chip ${cat === c ? 'active' : ''}" onclick="STATE.productCategory='${c}';render()">${c}</div>`).join('')}
    </div>
    <div class="screen">
      <div class="pgrid">
        ${filtered.length ? filtered.map(p => `
          <div class="pcard" onclick="nav('product',{id:'${p._id}'})">
            <button class="wish-heart ${isWished(p._id) ? 'on' : ''}" onclick="event.stopPropagation();toggleWish('${p._id}')">${isWished(p._id) ? '♥' : '♡'}</button>
            <div class="img">AUTO</div>
            <div class="pname">${p.name}</div>
            <div class="muted">${p.category}</div>
            <div><span class="price">${money(p.discountPrice || p.price)}</span>${p.discountPrice ? `<span class="strike">${money(p.price)}</span>` : ''}</div>
          </div>`).join('') : `<div class="empty">No products match</div>`}
      </div>
    </div>
    ${STATE.cart.length ? `<div class="fab" onclick="nav('cart')">Cart (${STATE.cart.length})</div>` : ''}
    ${tabbar('accessories')}`;
  },

  wishlist: () => `
    ${topbar('My Wishlist', { screen: 'accessories' })}
    <div class="screen">
      ${STATE.wishlist.length ? `<div class="pgrid">${STATE.wishlist.map(p => `
        <div class="pcard" onclick="nav('product',{id:'${p._id}'})">
          <button class="wish-heart on" onclick="event.stopPropagation();toggleWish('${p._id}')">♥</button>
          <div class="img">AUTO</div>
          <div class="pname">${p.name}</div>
          <div class="muted">${p.category || ''}</div>
          <div><span class="price">${money(p.discountPrice || p.price)}</span></div>
        </div>`).join('')}</div>` : emptyState('💝', 'Wishlist khali hai', 'Shop me jake dil wala icon tap karo')}
    </div>
    ${tabbar('accessories')}`,

  orders: () => `
    ${topbar('My Orders', { screen: 'home' })}
    <div class="screen">
      ${STATE.orders.length ? STATE.orders.map(o => `
        <div class="bk">
          <div class="info">
            <div class="bid">${o.orderId}</div>
            <div class="name">${(o.items || []).map(i => i.name).join(', ')}</div>
            <div class="sub">${new Date(o.createdAt).toDateString()} • ${o.items?.length || 0} item(s)</div>
            <div class="sub">${money(o.totalAmount)} • ${(o.paymentMode || '').toUpperCase()}</div>
          </div>
          ${bookingStatusBadge(o.orderStatus)}
        </div>`).join('') : emptyState('📦', 'No orders yet', 'Shop me jake explore karo')}
    </div>
    ${tabbar('home')}`,

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
          <button class="btn btn-out" onclick="toggleWish('${p._id}')">${isWished(p._id) ? '♥ Remove from Wishlist' : '♡ Add to Wishlist'}</button>
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
            <div class="sub">📅 ${new Date(b.bookingDate).toDateString()} • ${b.timeSlot || '-'}</div>
            <div class="sub">💰 ${money(b.totalAmount)} • ${humanMode(b.serviceMode)}</div>
          </div>
          ${bookingStatusBadge(b.status)}
        </div>`).join('') : emptyState('🗓️', 'No bookings yet', 'Book your first service to see it here')}
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
        ${booking.statusTimeline?.length ? `<div class="card"><div class="mini-title">📍 Status Timeline</div><div class="timeline">${booking.statusTimeline.map((item, i) => `
          <div class="tl-item ${(i < booking.statusTimeline.length - 1 || booking.status === 'completed') ? 'done' : ''}">
            <div class="tl-status">${item.status.replace(/_/g, ' ')}</div>
            ${item.note ? `<div class="tl-note">${item.note}</div>` : ''}
            <div class="tl-time">${new Date(item.at).toLocaleString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'})}</div>
          </div>`).join('')}</div></div>` : ''}
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
        <div class="avatar">${initials(STATE.user?.name || 'Guest')}</div>
        <h2>${STATE.user?.name || 'Guest'}</h2>
        <div>${STATE.user?.mobile ? '📱 ' + STATE.user.mobile : 'No mobile linked'}</div>
      </div>
      <div class="card">
        <div class="mini-title">Profile & Settings</div>
        <input id="pName" placeholder="Name" value="${STATE.user?.name || ''}">
        <input id="pEmail" placeholder="Email" value="${STATE.user?.email || ''}">
        <div class="row">
          <div class="chip ${STATE.lang === 'en' ? 'active' : ''}" onclick="setLang('en')">English</div>
          <div class="chip ${STATE.lang === 'hi' ? 'active' : ''}" onclick="setLang('hi')">Hindi</div>
          <div class="chip ${STATE.theme === 'dark' ? 'active' : ''}" onclick="toggleTheme()">${STATE.theme === 'dark' ? '☀ Light' : '🌙 Dark'}</div>
        </div>
        <button class="btn" onclick="saveProfile()">Save Profile</button>
      </div>
      <div class="card">
        <div class="mini-title">⚡ Quick Links</div>
        <div class="quick-tray">
          <div class="chip" onclick="nav('orders')"><span class="tic">📦</span>Orders<br><small>${STATE.orders.length}</small></div>
          <div class="chip" onclick="nav('wishlist')"><span class="tic">❤️</span>Wishlist<br><small>${STATE.wishlist.length}</small></div>
          <div class="chip" onclick="nav('bookings')"><span class="tic">📅</span>Bookings<br><small>${STATE.bookings.length}</small></div>
        </div>
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
        <button class="btn btn-out" onclick="openNotifications()">🔔 Notifications ${STATE.notifUnread ? `<span style="background:#FF4D6D;color:#fff;border-radius:10px;padding:2px 8px;font-size:11px;margin-left:4px">${STATE.notifUnread}</span>` : ''}</button>
        <button class="btn btn-out" onclick="nav('offers')">🎟 Offers & Coupons</button>
        <button class="btn btn-out" onclick="nav('refer')">🎁 Refer & Earn ₹100</button>
        <button class="btn btn-out" onclick="nav('packages')">📦 Service Packages</button>
        <button class="btn btn-out" onclick="nav('branches')">📍 Find a Branch</button>
        <button class="btn btn-out" onclick="nav('emergency')">🚨 Emergency Help</button>
        <button class="btn btn-out" onclick="nav('support')">🛟 Support Hub</button>
        <button class="btn btn-er" onclick="logout()">Logout</button>
      </div>
    </div>
    ${tabbar('profile')}`,

  // ========== NEW SCREENS ==========

  notifications: () => `
    ${topbar('Notifications', { screen: 'profile' })}
    <div class="screen">
      ${(STATE.notifications || []).length ? STATE.notifications.map(n => `
        <div class="card" style="display:flex;gap:12px;align-items:flex-start;${n.isRead ? '' : 'border-left:4px solid var(--p)'}">
          <div style="width:40px;height:40px;border-radius:50%;background:#E8F1FB;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${n.title.split(' ')[0]}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:14px">${n.title}</div>
            <div class="muted" style="margin-top:2px">${n.body}</div>
            <div class="muted" style="font-size:11px;margin-top:4px">${new Date(n.createdAt).toLocaleString()}</div>
          </div>
        </div>`).join('') : `<div class="empty-pro"><div class="ep-icon">🔔</div><div class="ep-title">No notifications yet</div><div class="ep-msg">Booking & order updates aapko yahan dikhenge.</div></div>`}
    </div>
    ${tabbar('profile')}`,

  offers: () => {
    const list = (STATE.coupons && STATE.coupons.length) ? STATE.coupons : (STATE.support?.coupons || []).map(c => ({ code: c.code, description: c.description, discountValue: c.value }));
    return `
      ${topbar('Offers & Coupons', { screen: 'profile' })}
      <div class="screen">
        ${list.length ? list.map(c => `
          <div class="card" style="background:linear-gradient(135deg,#fff,#f0f7fd);border:1px dashed var(--p)">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:var(--p);letter-spacing:1px">${c.code}</div>
              <button class="btn btn-sm" onclick="copyCoupon('${c.code}')">Copy</button>
            </div>
            <div class="muted" style="margin-top:6px">${c.description || ''}</div>
            ${c.discountType === 'percent' ? `<div style="margin-top:6px;font-weight:600">${c.discountValue}% OFF${c.maxDiscount ? ' (max ' + money(c.maxDiscount) + ')' : ''}</div>` :
              c.discountType === 'flat' ? `<div style="margin-top:6px;font-weight:600">${money(c.discountValue)} OFF</div>` :
              c.discountValue ? `<div style="margin-top:6px;font-weight:600">${c.discountValue}</div>` : ''}
            ${c.minOrderAmount ? `<div class="muted" style="font-size:11px">Min order: ${money(c.minOrderAmount)}</div>` : ''}
            ${c.validUntil ? `<div class="muted" style="font-size:11px">Valid till ${new Date(c.validUntil).toDateString()}</div>` : ''}
          </div>`).join('') : `<div class="empty-pro"><div class="ep-icon">🎟</div><div class="ep-title">No active offers</div><div class="ep-msg">Naye offers ke liye baad me check karo.</div></div>`}
      </div>
      ${tabbar('profile')}`;
  },

  refer: () => `
    ${topbar('Refer & Earn', { screen: 'profile' })}
    <div class="screen">
      <div class="card" style="text-align:center;padding:30px 20px;background:linear-gradient(135deg,#0A1933,#1C4277);color:#fff">
        <div style="font-size:48px">🎁</div>
        <h2 style="margin:10px 0;font-size:22px;color:#fff">Earn ₹100 per friend</h2>
        <div style="opacity:.85;font-size:13px;margin-bottom:18px">Apne friends ko VS Services bulao. Unka pehla service hone par dono ko ₹100 wallet credit milega.</div>
        <div style="background:rgba(255,255,255,.15);padding:14px;border-radius:12px;border:2px dashed rgba(255,255,255,.4)">
          <div style="font-size:11px;opacity:.7;letter-spacing:2px;font-weight:600">YOUR REFERRAL CODE</div>
          <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:26px;font-weight:800;letter-spacing:3px;margin-top:6px">${STATE.user?.referralCode || '-'}</div>
        </div>
        <div style="display:flex;gap:8px;margin-top:18px;justify-content:center">
          <button class="btn btn-sm" style="background:#25D366" onclick="shareReferral('whatsapp')">📱 WhatsApp</button>
          <button class="btn btn-sm" style="background:#4267B2" onclick="shareReferral('share')">🔗 Share</button>
          <button class="btn btn-sm btn-out" onclick="copyCoupon('${STATE.user?.referralCode || ''}')">Copy</button>
        </div>
      </div>
      <div class="card">
        <div class="mini-title">How it works</div>
        <ol style="padding-left:20px;line-height:1.9;font-size:13px;color:var(--l)">
          <li>Apna referral code share karo friends ko</li>
          <li>Friend pehli baar app kholega aur code use karega</li>
          <li>Jab friend ka pehla service complete hoga, dono ko ₹100 wallet credit milega</li>
        </ol>
      </div>
    </div>
    ${tabbar('profile')}`,

  packages: () => `
    ${topbar('Service Packages', { screen: 'profile' })}
    <div class="screen">
      ${(STATE.support?.packages || []).map((pkg, i) => `
        <div class="card" style="background:linear-gradient(135deg,${i === 0 ? '#FFF8E1,#FFE0B2' : '#E8F5E9,#C8E6C9'});position:relative;overflow:hidden">
          ${i === 1 ? `<span class="offer-pill" style="position:absolute;top:14px;right:14px">Most Popular</span>` : ''}
          <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;color:var(--navy)">${pkg.name}</h3>
          <div style="font-size:32px;font-weight:800;color:var(--p);font-family:'Plus Jakarta Sans',sans-serif;margin:6px 0">${money(pkg.price)}</div>
          <ul style="list-style:none;padding:0;margin:14px 0 12px">
            ${pkg.benefits.map(b => `<li style="padding:6px 0;display:flex;gap:8px;font-size:13px"><span style="color:var(--accent);font-weight:700">✓</span> ${b}</li>`).join('')}
          </ul>
          <button class="btn" onclick="nav('booking')">Book This Package</button>
        </div>`).join('')}
      <div class="empty-pro" style="display:${(STATE.support?.packages || []).length ? 'none' : 'flex'}">
        <div class="ep-icon">📦</div>
        <div class="ep-title">Packages loading...</div>
      </div>
    </div>
    ${tabbar('profile')}`,

  branches: () => `
    ${topbar('Find a Branch', { screen: 'profile' })}
    <div class="screen">
      ${(STATE.support?.branches || []).map(branch => `
        <div class="card">
          <div style="display:flex;gap:14px;align-items:flex-start">
            <div style="width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,var(--p),var(--accent));color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">📍</div>
            <div style="flex:1">
              <div style="font-weight:700;font-size:15px">${branch.name}</div>
              <div class="muted" style="margin-top:4px">${branch.address}</div>
              <div class="muted" style="font-size:11px;margin-top:4px">⏰ ${branch.timings}</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;margin-top:14px">
            <a class="btn btn-sm" style="flex:1;text-decoration:none;text-align:center" href="${branch.mapUrl}" target="_blank">🗺 Directions</a>
            <a class="btn btn-sm btn-out" style="flex:1;text-decoration:none;text-align:center" href="tel:${branch.phone.replace(/\s+/g, '')}">📞 Call</a>
          </div>
        </div>`).join('')}
    </div>
    ${tabbar('profile')}`,

  emergency: () => `
    ${topbar('Emergency Help', { screen: 'profile' })}
    <div class="screen">
      <div class="card" style="background:linear-gradient(135deg,#FFE5E5,#FFCDD2);border:1px solid #FFAAAA;text-align:center">
        <div style="font-size:42px">🚨</div>
        <h3 style="margin:8px 0;color:#C62828;font-size:18px">24x7 Roadside Assistance</h3>
        <div class="muted" style="margin-bottom:14px">Sab kuch 30-60 min me reach karega.</div>
        <div style="display:flex;gap:8px;justify-content:center">
          <a class="btn" style="text-decoration:none;background:#C62828" href="tel:8839533202">📞 Call Now</a>
          <a class="btn btn-sm" style="text-decoration:none;background:#25D366" href="https://wa.me/918839533202?text=EMERGENCY:%20mujhe%20car%20help%20chahiye%20ASAP">💬 WhatsApp</a>
        </div>
      </div>
      <div class="grid quick-grid">${(STATE.support?.emergency || []).map(item => `
        <div class="action">
          <div class="ic" style="font-size:26px">${({ 'jump-start':'⚡', 'puncture':'🛞', 'battery':'🔋', 'towing':'🚚' })[item.id] || '🆘'}</div>
          <div class="t">${item.title}</div>
          <div class="muted" style="font-size:10px;margin-top:4px">ETA ${item.eta}</div>
          <a class="mini-link" href="tel:${item.phone.replace(/\s+/g, '')}">📞 Call</a>
        </div>`).join('')}</div>
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

  // Public coupons (offers screen)
  try {
    const c = await api('/coupons', 'GET', null, { silent: true });
    if (c.success) STATE.coupons = c.coupons || [];
  } catch (e) {}

  if (STATE.token) {
    const [me, bookings, orders, history, reminders, rewards, wishlist, recs, notif] = await Promise.all([
      api('/users/me'),
      api('/bookings/my'),
      api('/orders/my'),
      api('/users/history'),
      api('/users/reminders'),
      api('/users/rewards'),
      api('/users/wishlist'),
      api('/users/recommendations'),
      api('/notifications', 'GET', null, { silent: true })
    ]);
    STATE.notifications = notif?.notifications || [];
    STATE.notifUnread = notif?.unread || 0;
    if (me.success) {
      STATE.user = me.user;
      if (me.user?.themePreference && !localStorage.getItem('theme')) {
        STATE.theme = me.user.themePreference;
        applyTheme();
      }
    }
    STATE.bookings = bookings.bookings || [];
    STATE.orders = orders.orders || [];
    STATE.history = history.history || [];
    STATE.reminders = reminders.reminders || [];
    STATE.rewards = rewards.rewards || null;
    STATE.wishlist = wishlist.wishlist || [];
    STATE.recommendations = recs.recommendations || [];
    save();
  }
}

async function toggleWish(productId) {
  if (!STATE.token) return nav('login');
  const response = await api('/users/wishlist/' + productId, 'POST');
  if (!response.success) return toast(response.message || 'Wishlist update failed');
  STATE.wishlist = response.wishlist;
  toast(response.inWishlist ? 'Added to wishlist' : 'Removed from wishlist');
  render();
}

let _filterTimer;
function filterProductsDebounced() {
  clearTimeout(_filterTimer);
  _filterTimer = setTimeout(() => render(), 250);
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

async function ensureLoggedIn() {
  if (STATE.token) return true;
  // Inline quick register from booking form fields if available
  const name = (document.getElementById('cName')?.value || document.getElementById('setupName')?.value || STATE.user?.name || '').trim();
  const mobile = (document.getElementById('cMobile')?.value || document.getElementById('setupMobile')?.value || STATE.user?.mobile || '').trim();
  if (/^\d{10}$/.test(mobile) && name.length >= 2) {
    const response = await api('/auth/register-guest', 'POST', { name, mobile });
    if (response.success) {
      STATE.token = response.token;
      STATE.user = response.user;
      save();
      return true;
    }
    toast(response.message || 'Registration failed');
    return false;
  }
  // Otherwise prompt with name+mobile modal
  return new Promise((resolve) => {
    const wrap = document.createElement('div');
    wrap.className = 'modal-bg';
    wrap.style.cssText = 'position:fixed;inset:0;background:rgba(10,25,51,.6);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:9999';
    wrap.innerHTML = `<div style="background:#fff;padding:24px;border-radius:16px;width:88%;max-width:340px">
      <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:#0A1933;margin-bottom:6px">Quick Setup</h3>
      <p style="font-size:13px;color:#6B7A92;margin-bottom:14px">Booking ke liye sirf naam aur mobile chahiye — OTP nahi.</p>
      <input id="qrName" placeholder="Your Name" style="width:100%;padding:11px;border:1.5px solid #E2E8F0;border-radius:10px;margin-bottom:10px;font-size:14px">
      <input id="qrMobile" placeholder="10-digit Mobile" maxlength="10" inputmode="numeric" style="width:100%;padding:11px;border:1.5px solid #E2E8F0;border-radius:10px;margin-bottom:14px;font-size:14px">
      <button id="qrGo" style="width:100%;padding:12px;background:linear-gradient(135deg,#3DC97D,#4AE290);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer">Continue →</button>
      <button id="qrCancel" style="width:100%;padding:8px;margin-top:8px;background:none;color:#6B7A92;border:none;font-size:12px;cursor:pointer">Cancel</button>
    </div>`;
    document.body.appendChild(wrap);
    wrap.querySelector('#qrCancel').onclick = () => { wrap.remove(); resolve(false); };
    wrap.querySelector('#qrGo').onclick = async () => {
      const n = wrap.querySelector('#qrName').value.trim();
      const m = wrap.querySelector('#qrMobile').value.trim();
      if (n.length < 2) return toast('Enter name');
      if (!/^\d{10}$/.test(m)) return toast('Enter 10-digit mobile');
      const response = await api('/auth/register-guest', 'POST', { name: n, mobile: m });
      if (!response.success) { toast(response.message || 'Failed'); return; }
      STATE.token = response.token;
      STATE.user = response.user;
      save();
      wrap.remove();
      resolve(true);
    };
  });
}

async function submitBooking() {
  if (!STATE.token) {
    const ok = await ensureLoggedIn();
    if (!ok) return;
  }
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
  // Open in new tab for print/view; fallback to download
  const win = window.open(url, '_blank');
  if (!win) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoice.invoiceNo}.html`;
    a.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 8000);
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
  if (!STATE.token) {
    const ok = await ensureLoggedIn();
    if (!ok) return;
  }
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

// Hardware back button — Capacitor App plugin (if available) + popstate fallback
window.addEventListener('popstate', (e) => {
  if (!navBack()) {
    // No screen left — let WebView handle (will exit app)
    if (window.Capacitor?.Plugins?.App) window.Capacitor.Plugins.App.exitApp();
  } else {
    try { history.pushState({ screen: STATE.current }, '', '#' + STATE.current); } catch (e2) {}
  }
});

document.addEventListener('deviceready', () => {
  if (window.Capacitor?.Plugins?.App?.addListener) {
    window.Capacitor.Plugins.App.addListener('backButton', () => {
      if (!navBack()) window.Capacitor.Plugins.App.exitApp();
    });
  }
}, false);

// Restrict numeric inputs (mobile, OTP, pincode) to digits only
document.addEventListener('input', (e) => {
  const el = e.target;
  if (!el || !el.matches) return;
  if (el.matches('input[inputmode="numeric"], input[type="tel"]')) {
    const max = parseInt(el.getAttribute('maxlength') || '0', 10);
    let v = (el.value || '').replace(/\D/g, '');
    if (max > 0) v = v.slice(0, max);
    if (v !== el.value) el.value = v;
  }
}, true);

// ========== Helpers for new screens ==========
function copyCoupon(code) {
  if (!code) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => toast('Copied: ' + code));
  } else {
    const ta = document.createElement('textarea');
    ta.value = code; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy'); ta.remove();
    toast('Copied: ' + code);
  }
}

function shareReferral(via) {
  const code = STATE.user?.referralCode || '';
  const text = `Hey! VS Services app try karo — apne car ke liye easy booking + ₹100 wallet credit milega referral code se: ${code}\nDownload: https://vs-services-api.onrender.com`;
  if (via === 'whatsapp') {
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  } else if (navigator.share) {
    navigator.share({ title: 'VS Services Referral', text }).catch(() => {});
  } else {
    copyCoupon(text);
    toast('Copied — paste anywhere');
  }
}

async function openNotifications() {
  nav('notifications');
  if (STATE.notifUnread > 0) {
    await api('/notifications/read', 'PUT', null, { silent: true });
    STATE.notifUnread = 0;
    STATE.notifications = (STATE.notifications || []).map(n => ({ ...n, isRead: true }));
  }
}

(async () => {
  applyTheme();
  render();
  try { history.replaceState({ screen: 'splash' }, '', '#splash'); } catch (e) {}
  const splashDelay = new Promise(resolve => setTimeout(resolve, 1200));
  await Promise.all([loadInitData(), splashDelay]);
  STATE.navStack = [];
  STATE.current = 'home';
  STATE.data = {};
  try { history.replaceState({ screen: 'home' }, '', '#home'); } catch (e) {}
  render();
})();
