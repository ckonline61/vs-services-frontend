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
    home: 'Home', shop: 'Shop', bookings: 'Bookings', profile: 'Profile', more: 'More',
    login: 'Demo / Guest Login',
    welcome: 'Complete car care — booking, parts, reminders, rewards — all in one place.',
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
    emergency: 'Emergency Help',
    greetMorning: 'Good morning',
    greetAfternoon: 'Good afternoon',
    greetEvening: 'Good evening',
    welcomeUser: 'Welcome!',
    bookService: 'Book Service',
    callUs: 'Call Us',
    shopParts: 'Shop Parts',
    myOrders: 'My Orders',
    wishlist: 'Wishlist',
    trackBooking: 'Track Booking',
    statBookings: 'SERVICES',
    statPoints: 'POINTS',
    statStreak: 'STREAK',
    confirm: 'Confirm Booking',
    cancel: 'Cancel',
    save: 'Save',
    submit: 'Submit',
    selectService: 'Select Service',
    carProfile: 'Car Profile',
    serviceMode: 'Service Mode',
    atGarage: 'At Garage',
    homeService: 'Home Service',
    pickupDrop: 'Pickup & Drop',
    payment: 'Payment',
    couponCode: 'Coupon code',
    addCart: 'Add to Cart',
    placeOrder: 'Place Order',
    cart: 'Cart',
    cartEmpty: 'Cart is empty',
    delivery: 'Delivery',
    free: 'FREE',
    total: 'Total',
    address: 'Address',
    city: 'City',
    pincode: 'Pincode',
    name: 'Name',
    mobile: 'Mobile Number',
    email: 'Email',
    continue: 'Continue',
    skip: 'Skip for now',
    yourName: 'Your Name',
    bookings_lc: 'Bookings',
    notifications: 'Notifications',
    chatSupport: 'Chat with Support',
    aiAssistant: 'AI Assistant',
    leaderboard: 'Leaderboard',
    serviceGallery: 'Service Gallery',
    setBirthday: 'Set Birthday',
    offers: 'Offers & Coupons',
    referEarn: 'Refer & Earn',
    packages: 'Service Packages',
    findBranch: 'Find a Branch',
    supportHub: 'Support Hub',
    logout: 'Logout',
    pickOnMap: 'Pick Location on Map',
    voiceNote: 'Voice Note for Staff',
    record: 'Record',
    rerecord: 'Re-record',
    nextDue: 'Next Service Due',
    bookAgain: 'Book Again',
    rateDriver: 'Rate Driver',
    share: 'Share',
    invoice: 'Invoice',
    payNow: 'Pay Now',
    cancelBooking: 'Cancel Booking',
    submitReview: 'Submit Review',
    feedback: 'Write your feedback',
    seeAllOffers: 'active offers',
    referralCode: 'YOUR REFERRAL CODE',
    earnInfo: 'Earn ₹100 per friend',
    referDesc: 'Invite friends. Both get ₹100 wallet credit on their first service.',
    silver: 'Silver Care',
    gold: 'Gold Care',
    mostPopular: 'Most Popular',
    bookThisPackage: 'Book This Package',
    directions: 'Directions',
    call: 'Call',
    showOnMap: 'Show on Map',
    distanceAway: 'km away',
    nearest: 'Nearest',
    roadsideAssistance: '24x7 Roadside Assistance',
    callNow: 'Call Now',
    whatsapp: 'WhatsApp',
    youAreHere: 'You are here',
    addCar: 'Add Car',
    brand: 'Brand',
    model: 'Model',
    carNumber: 'Car Number',
    fuel: 'Fuel',
    year: 'Year',
    rcNumber: 'RC Number',
    addReminder: 'Add Reminder',
    reminderTitle: 'Reminder title',
    reminderNote: 'Reminder note',
    advancedApi: 'Advanced: change API URL'
  },
  hi: {
    appName: 'VS SERVICES',
    tagline: 'जाँच · सर्विस · सुरक्षित ड्राइव',
    home: 'होम', shop: 'शॉप', bookings: 'बुकिंग', profile: 'प्रोफाइल', more: 'More',
    login: 'डेमो / गेस्ट लॉगिन',
    welcome: 'आपकी कार की पूरी देखभाल — बुकिंग, पार्ट्स, रिमाइंडर, रिवॉर्ड — एक जगह।',
    quick: 'त्वरित विकल्प',
    services: 'सेवाएँ',
    support: 'सपोर्ट',
    estimate: 'अनुमान',
    book: 'बुक करें',
    rewards: 'इनाम',
    history: 'सर्विस इतिहास',
    reminders: 'रिमाइंडर',
    tips: 'कार केयर टिप्स',
    faq: 'सामान्य प्रश्न',
    branches: 'नज़दीकी गैरेज',
    emergency: 'आपातकालीन सहायता',
    greetMorning: 'सुप्रभात',
    greetAfternoon: 'नमस्ते',
    greetEvening: 'शुभ संध्या',
    welcomeUser: 'स्वागत है!',
    bookService: 'सर्विस बुक करें',
    callUs: 'कॉल करें',
    shopParts: 'पार्ट्स खरीदें',
    myOrders: 'मेरे ऑर्डर',
    wishlist: 'पसंदीदा',
    trackBooking: 'बुकिंग ट्रैक करें',
    statBookings: 'सर्विस',
    statPoints: 'पॉइंट्स',
    statStreak: 'स्ट्रीक',
    confirm: 'बुकिंग पक्की करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    submit: 'सबमिट',
    selectService: 'सर्विस चुनें',
    carProfile: 'कार की जानकारी',
    serviceMode: 'सर्विस मोड',
    atGarage: 'गैरेज पर',
    homeService: 'घर पर सर्विस',
    pickupDrop: 'पिकअप & ड्रॉप',
    payment: 'भुगतान',
    couponCode: 'कूपन कोड',
    addCart: 'कार्ट में डालें',
    placeOrder: 'ऑर्डर करें',
    cart: 'कार्ट',
    cartEmpty: 'कार्ट खाली है',
    delivery: 'डिलीवरी',
    free: 'मुफ़्त',
    total: 'कुल',
    address: 'पता',
    city: 'शहर',
    pincode: 'पिनकोड',
    name: 'नाम',
    mobile: 'मोबाइल नंबर',
    email: 'ईमेल',
    continue: 'आगे बढ़ें',
    skip: 'अभी छोड़ें',
    yourName: 'आपका नाम',
    bookings_lc: 'बुकिंग्स',
    notifications: 'सूचनाएँ',
    chatSupport: 'सपोर्ट से चैट करें',
    aiAssistant: 'AI सहायक',
    leaderboard: 'लीडरबोर्ड',
    serviceGallery: 'सर्विस गैलरी',
    setBirthday: 'जन्मदिन सेट करें',
    offers: 'ऑफ़र & कूपन',
    referEarn: 'दोस्त को बुलाओ - कमाओ',
    packages: 'सर्विस पैकेज',
    findBranch: 'गैरेज ढूँढें',
    supportHub: 'सपोर्ट हब',
    logout: 'लॉग आउट',
    pickOnMap: 'मैप पर लोकेशन चुनें',
    voiceNote: 'स्टाफ के लिए वॉइस नोट',
    record: 'रिकॉर्ड करें',
    rerecord: 'फिर से रिकॉर्ड',
    nextDue: 'अगली सर्विस कब',
    bookAgain: 'फिर से बुक करें',
    rateDriver: 'ड्राइवर को रेट करें',
    share: 'शेयर',
    invoice: 'इनवॉइस',
    payNow: 'अभी भुगतान करें',
    cancelBooking: 'बुकिंग रद्द करें',
    submitReview: 'समीक्षा सबमिट',
    feedback: 'अपनी राय लिखें',
    seeAllOffers: 'चालू ऑफ़र',
    referralCode: 'आपका रेफरल कोड',
    earnInfo: 'हर दोस्त पर ₹100 कमाओ',
    referDesc: 'दोस्तों को बुलाओ। पहली सर्विस पर दोनों को ₹100 वॉलेट क्रेडिट।',
    silver: 'सिल्वर केयर',
    gold: 'गोल्ड केयर',
    mostPopular: 'सबसे लोकप्रिय',
    bookThisPackage: 'यह पैकेज बुक करें',
    directions: 'दिशा',
    call: 'कॉल',
    showOnMap: 'मैप पर दिखाएँ',
    distanceAway: 'किमी दूर',
    nearest: 'सबसे नज़दीक',
    roadsideAssistance: '24x7 रोडसाइड सहायता',
    callNow: 'अभी कॉल करें',
    whatsapp: 'व्हाट्सऐप',
    youAreHere: 'आप यहाँ हैं',
    addCar: 'कार जोड़ें',
    brand: 'ब्रांड',
    model: 'मॉडल',
    carNumber: 'कार नंबर',
    fuel: 'फ्यूल',
    year: 'साल',
    rcNumber: 'RC नंबर',
    addReminder: 'रिमाइंडर जोड़ें',
    reminderTitle: 'रिमाइंडर का शीर्षक',
    reminderNote: 'रिमाइंडर नोट',
    advancedApi: 'एडवांस्ड: API URL बदलें'
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
  notifUnread: 0,
  chatMessages: JSON.parse(localStorage.getItem('chatMessages') || '[]'),
  chatSuggestions: [],
  chatTyping: false,
  tipOfDay: null,
  leaderboard: [],
  myRank: null,
  birthdayShown: false,
  supportMessages: [],
  supportLastSeen: 0,
  flags: JSON.parse(localStorage.getItem('appFlags') || '{}'),
  cfgValues: JSON.parse(localStorage.getItem('appCfgValues') || '{}'),
  uiTextDefaults: JSON.parse(localStorage.getItem('uiTextDefaults') || '[]')
};

// Helper — check if a feature is enabled (defaults to true if no config yet)
function flag(key) {
  return STATE.flags?.[key] !== false;  // undefined or true → on; false → off
}
function cfgVal(key, fallback = '') {
  return Object.prototype.hasOwnProperty.call(STATE.cfgValues || {}, key) ? STATE.cfgValues[key] : fallback;
}
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}
function cfgText(key, fallback = '') {
  return escapeHtml(cfgVal(key, fallback)).replace(/\n/g, '<br>');
}
function makeUiTextKey(text) {
  return 'uiText.' + String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);
}
function applyUiTextOverrides(root = app) {
  if (!root || !STATE.uiTextDefaults?.length) return;
  const pairs = STATE.uiTextDefaults
    .map(item => ({ from: String(item.default || ''), to: cfgVal(item.key, item.default || '') }))
    .filter(item => item.from && item.to !== item.from)
    .sort((a, b) => b.from.length - a.from.length);
  if (!pairs.length) return;
  const replaceText = (value) => {
    let next = value;
    pairs.forEach(({ from, to }) => {
      if (next.includes(from)) next = next.split(from).join(to);
    });
    return next;
  };
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(node => {
    const next = replaceText(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  });
  root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el => {
    ['placeholder', 'title', 'aria-label'].forEach(attr => {
      const val = el.getAttribute(attr);
      if (!val) return;
      const next = replaceText(val);
      if (next !== val) el.setAttribute(attr, next);
    });
  });
}
function getCareTips() {
  const remote = [
    { title: cfgVal('careTip1Title'), body: cfgVal('careTip1Body') },
    { title: cfgVal('careTip2Title'), body: cfgVal('careTip2Body') }
  ].filter(tip => tip.title || tip.body);
  return remote.length ? remote : (STATE.support.tips || []);
}

let _lastConfigFetch = 0;
function normalizeConfigState() {
  const mode = STATE.bookingForm.mode;
  if (mode === 'home_service' && !flag('showHomeService')) STATE.bookingForm.mode = 'at_garage';
  if (mode === 'pickup_drop' && !flag('showPickupDrop')) STATE.bookingForm.mode = 'at_garage';
  if (STATE.bookingForm.pay === 'online' && !flag('showOnlinePayment')) STATE.bookingForm.pay = 'pay_on_service';
  if (STATE.payMode === 'online' && !flag('showOnlinePayment')) STATE.payMode = 'cod';
  if (!flag('showAccessoriesShop') && ['accessories', 'cart', 'productDetail'].includes(STATE.current)) {
    STATE.current = 'home';
    STATE.data = {};
  }
  if (!flag('showWishlist') && STATE.current === 'wishlist') {
    STATE.current = 'home';
    STATE.data = {};
  }
  if (!flag('showRewards') && STATE.current === 'rewards') {
    STATE.current = 'home';
    STATE.data = {};
  }
  if (!flag('showLeaderboard') && STATE.current === 'leaderboard') {
    STATE.current = 'profile';
    STATE.data = {};
  }
  if (!flag('showGallery') && STATE.current === 'gallery') {
    STATE.current = 'profile';
    STATE.data = {};
  }
  if (!flag('showChatbot') && STATE.current === 'chatbot') {
    STATE.current = 'home';
    STATE.data = {};
  }
  if (!flag('showSupportChat') && STATE.current === 'supportChat') {
    STATE.current = 'profile';
    STATE.data = {};
  }
  if (!flag('showOffers') && STATE.current === 'offers') {
    STATE.current = 'home';
    STATE.data = {};
  }
  if (!flag('showPackages') && STATE.current === 'packages') {
    STATE.current = 'home';
    STATE.data = {};
  }
  if (!flag('showBranches') && STATE.current === 'branches') {
    STATE.current = 'home';
    STATE.data = {};
  }
  if (!flag('showEmergency') && STATE.current === 'emergency') {
    STATE.current = 'home';
    STATE.data = {};
  }
}

async function refreshAppConfig(options = {}) {
  const { force = false, rerender = false } = options;
  if (!force && Date.now() - _lastConfigFetch < 5000) return false;
  _lastConfigFetch = Date.now();
  try {
    const cfg = await api('/config', 'GET', null, { silent: true });
    if (!cfg.success) return false;
    const nextFlags = cfg.flags || {};
    const nextValues = cfg.values || {};
    const nextTextDefaults = cfg.textDefaults || STATE.uiTextDefaults || [];
    const changed =
      JSON.stringify(STATE.flags || {}) !== JSON.stringify(nextFlags) ||
      JSON.stringify(STATE.cfgValues || {}) !== JSON.stringify(nextValues) ||
      JSON.stringify(STATE.uiTextDefaults || []) !== JSON.stringify(nextTextDefaults);
    STATE.flags = nextFlags;
    STATE.cfgValues = nextValues;
    STATE.uiTextDefaults = nextTextDefaults;
    localStorage.setItem('appFlags', JSON.stringify(STATE.flags));
    localStorage.setItem('appCfgValues', JSON.stringify(STATE.cfgValues));
    localStorage.setItem('uiTextDefaults', JSON.stringify(STATE.uiTextDefaults));
    normalizeConfigState();
    if (changed && rerender) render();
    return changed;
  } catch (e) {
    return false;
  }
}

// Loyalty tier metadata
const TIER_META = {
  bronze:   { icon: '🥉', label: 'Bronze',   next: 'silver',   needed: 5,  color: '#A0522D' },
  silver:   { icon: '🥈', label: 'Silver',   next: 'gold',     needed: 10, color: '#9E9E9E' },
  gold:     { icon: '🥇', label: 'Gold',     next: 'platinum', needed: 20, color: '#FFA500' },
  platinum: { icon: '💎', label: 'Platinum', next: null,       needed: 0,  color: '#A8B5C9' }
};

const CAR_CATALOG = {
  'Maruti Suzuki': ['Alto 800','Alto K10','S-Presso','Celerio','Wagon R','Ignis','Swift','Baleno','Dzire','Fronx','Brezza','Ertiga','XL6','Ciaz','Jimny','Grand Vitara','Eeco','Omni','Ritz','A-Star','Zen Estilo','SX4','S-Cross','Vitara Brezza'],
  Hyundai: ['Santro','Eon','Grand i10','Grand i10 Nios','i10','i20','i20 N Line','Aura','Xcent','Verna','Venue','Venue N Line','Creta','Alcazar','Tucson','Elantra','Kona Electric','Exter','Accent','Getz','Sonata'],
  Tata: ['Nano','Tiago','Tigor','Altroz','Punch','Nexon','Nexon EV','Harrier','Safari','Curvv','Curvv EV','Indica','Indigo','Zest','Bolt','Hexa','Aria','Sumo','Vista','Manza'],
  Mahindra: ['Bolero','Bolero Neo','Scorpio','Scorpio N','XUV300','XUV400','XUV500','XUV700','Thar','Thar Roxx','Marazzo','KUV100','TUV300','Quanto','Xylo','Verito','Alturas G4','BE 6','XEV 9e'],
  Honda: ['City','City iVTEC','City iDTEC','City ZX','Amaze','Jazz','Brio','Civic','Accord','Accord Hybrid','WR-V','BR-V','CR-V','Mobilio','Elevate'],
  Toyota: ['Glanza','Urban Cruiser','Urban Cruiser Hyryder','Innova','Innova Crysta','Innova Hycross','Fortuner','Camry','Corolla Altis','Etios','Etios Liva','Yaris','Vellfire','Hilux','Land Cruiser','Qualis'],
  Kia: ['Sonet','Seltos','Carens','Carnival','EV6','EV9','Syros'],
  Renault: ['Kwid','Triber','Kiger','Duster','Lodgy','Captur','Scala','Fluence','Pulse'],
  Nissan: ['Magnite','Micra','Sunny','Terrano','Kicks','Evalia','Teana','X-Trail'],
  Skoda: ['Kushaq','Slavia','Rapid','Octavia','Superb','Kodiaq','Fabia','Yeti','Laura'],
  Volkswagen: ['Polo','Vento','Virtus','Taigun','Tiguan','Jetta','Ameo','Passat','Beetle'],
  MG: ['Hector','Hector Plus','Astor','Gloster','ZS EV','Comet EV','Windsor EV'],
  Jeep: ['Compass','Meridian','Wrangler','Grand Cherokee','Renegade'],
  Ford: ['Figo','Aspire','Freestyle','EcoSport','Endeavour','Fiesta','Classic','Ikon','Mondeo'],
  Chevrolet: ['Beat','Spark','Sail','Enjoy','Tavera','Cruze','Optra','Aveo','Captiva'],
  Fiat: ['Punto','Linea','Avventura','Urban Cross','Palio','Uno'],
  Datsun: ['Redi-Go','Go','Go Plus'],
  Citroen: ['C3','eC3','C3 Aircross','C5 Aircross','Basalt'],
  Isuzu: ['D-Max','V-Cross','MU-X','S-Cab'],
  'Mercedes-Benz': ['A-Class','B-Class','C-Class','E-Class','S-Class','CLA','GLA','GLB','GLC','GLE','GLS','G-Class','AMG GT'],
  BMW: ['1 Series','2 Series','3 Series','3 Series GT','5 Series','5 Series GT','6 Series','6 Series GT','7 Series','X1','X3','X4','X5','X6','X7','Z4','M3','M5'],
  Audi: ['A3','A4','A6','A8','Q2','Q3','Q5','Q7','Q8','TT','RS5','e-tron'],
  Volvo: ['S60','S90','V40','XC40','XC60','XC90','C40 Recharge','EX40'],
  'Land Rover': ['Discovery Sport','Discovery','Defender','Range Rover Evoque','Range Rover Velar','Range Rover Sport','Range Rover'],
  Jaguar: ['XE','XF','XJ','F-Pace','E-Pace','F-Type','I-Pace'],
  Lexus: ['ES','NX','RX','LS','LX','LM'],
  Porsche: ['Macan','Cayenne','Panamera','911','718','Taycan'],
  Mini: ['Cooper','Cooper S','Countryman','Clubman','Convertible'],
  Force: ['Gurkha','Trax','Traveller'],
  Mitsubishi: ['Pajero','Pajero Sport','Outlander','Lancer','Cedia','Montero']
};

// ========== Haptic feedback (Vibration API) ==========
function haptic(pattern = 'light') {
  if (!navigator.vibrate) return;
  const PATTERNS = {
    light: 10,
    medium: [25],
    heavy: [40],
    success: [15, 30, 30],
    error: [80, 40, 80],
    notify: [10, 50, 10]
  };
  navigator.vibrate(PATTERNS[pattern] || pattern);
}

// ========== Native share ==========
async function nativeShare(title, text, url) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch (e) { return false; }
  }
  return false;
}

// ========== Lazy image observer ==========
let _imgObserver;
function setupLazyImages() {
  if (!('IntersectionObserver' in window)) return;
  if (_imgObserver) _imgObserver.disconnect();
  _imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.onload = () => img.classList.add('loaded');
          _imgObserver.unobserve(img);
        }
      }
    });
  }, { rootMargin: '100px' });
  document.querySelectorAll('img.lazy[data-src]').forEach(img => _imgObserver.observe(img));
}

// ========== Skeleton ==========
function skeletonList(n = 3) {
  let s = '<div class="sk-list">';
  for (let i = 0; i < n; i++) {
    s += `<div class="sk-card">
      <div class="sk-thumb"></div>
      <div class="sk-lines">
        <div class="sk-line w70"></div>
        <div class="sk-line w90"></div>
        <div class="sk-line w40"></div>
      </div>
    </div>`;
  }
  return s + '</div>';
}

// ========== Bottom sheet ==========
function bottomSheet(title, html, onClose) {
  const wrap = document.createElement('div');
  wrap.className = 'bsheet-wrap';
  wrap.id = 'bsheetWrap';
  wrap.innerHTML = `<div class="bsheet" onclick="event.stopPropagation()">
    <div class="bsheet-handle"></div>
    <div class="bsheet-head"><span>${title}</span><button class="bsheet-close" onclick="closeBottomSheet()">×</button></div>
    ${html}
  </div>`;
  wrap.onclick = () => { closeBottomSheet(); if (onClose) onClose(); };
  document.body.appendChild(wrap);
  haptic('light');
}
function closeBottomSheet() {
  document.getElementById('bsheetWrap')?.remove();
}

function vehicleInitials(brand, model = '') {
  return String(brand || 'VS').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'VS';
}

function vehicleSummary(brand, model) {
  return [brand, model].filter(Boolean).join(' ');
}

function applyVehicleSelection(target, brand, model) {
  if (target === 'profile') {
    if ($('carBrand')) $('carBrand').value = brand;
    if ($('carModel')) $('carModel').value = model;
  } else {
    STATE.bookingForm.brand = brand;
    STATE.bookingForm.model = model;
    render();
  }
  closeBottomSheet();
  toast('Vehicle selected', 'success');
}

function openVehiclePicker(target = 'booking', selectedBrand = '') {
  document.getElementById('bsheetWrap')?.remove();
  const brands = Object.keys(CAR_CATALOG);
  if (!selectedBrand) {
    bottomSheet('Select Your Vehicle', `
      <div class="vehicle-search-wrap">
        <input id="vehicleBrandSearch" placeholder="Search brand..." oninput="filterVehicleBrands('${target}')">
      </div>
      <div id="vehicleBrandGrid" class="vehicle-brand-grid">
        ${brands.map(brand => `<button class="vehicle-brand-tile" onclick="openVehiclePicker('${target}','${brand.replace(/'/g, "\\'")}')">
          <span class="vehicle-logo">${vehicleInitials(brand)}</span>
          <b>${brand}</b>
        </button>`).join('')}
      </div>
    `);
    return;
  }
  const models = CAR_CATALOG[selectedBrand] || [];
  bottomSheet('Select Model', `
    <div class="vehicle-sheet-kicker">${selectedBrand}</div>
    <button class="vehicle-back" onclick="openVehiclePicker('${target}')">Back to brands</button>
    <div class="vehicle-model-grid">
      ${models.map(model => `<button class="vehicle-model-tile" onclick="applyVehicleSelection('${target}','${selectedBrand.replace(/'/g, "\\'")}','${model.replace(/'/g, "\\'")}')">
        <span class="vehicle-car-art">${vehicleInitials(selectedBrand, model)}</span>
        <b>${model}</b>
      </button>`).join('')}
    </div>
  `);
}

function filterVehicleBrands(target = 'booking') {
  const q = ($('vehicleBrandSearch')?.value || '').toLowerCase().trim();
  const grid = $('vehicleBrandGrid');
  if (!grid) return;
  const brands = Object.keys(CAR_CATALOG).filter(brand => !q || brand.toLowerCase().includes(q));
  grid.innerHTML = brands.map(brand => `<button class="vehicle-brand-tile" onclick="openVehiclePicker('${target}','${brand.replace(/'/g, "\\'")}')">
    <span class="vehicle-logo">${vehicleInitials(brand)}</span>
    <b>${brand}</b>
  </button>`).join('') || '<div class="empty small">No brand found</div>';
}

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

function toast(msg, type = 'info') {
  const tNode = document.createElement('div');
  tNode.className = 'toast ' + type;
  const icons = { success: '✓', error: '!', warn: '⚠', info: 'ⓘ' };
  tNode.innerHTML = `<span style="margin-right:8px;font-weight:800">${icons[type] || ''}</span>${msg}`;
  document.body.appendChild(tNode);
  haptic(type === 'error' ? 'error' : type === 'success' ? 'success' : 'light');
  setTimeout(() => tNode.remove(), 2800);
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

function quoteLabel() {
  return 'Price on call/chat';
}

function productImage(product, big = false) {
  const src = (product?.images || []).find(Boolean) || fallbackProductImage(product);
  if (!src) return `<div class="img ${big ? 'big' : ''}">AUTO</div>`;
  return `<img class="product-img ${big ? 'big' : ''}" src="${src}" alt="${product?.name || 'Product'}" loading="lazy">`;
}

function fallbackProductImage(product) {
  const pics = [
    'https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=700&q=70',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=70',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=70',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=700&q=70',
    'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=700&q=70',
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=700&q=70'
  ];
  const key = String(product?._id || product?.name || 'vs');
  const idx = [...key].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % pics.length;
  return pics[idx];
}

function humanMode(mode) {
  return {
    at_garage: 'At Garage',
    home_service: 'Home Service',
    pickup_drop: 'Pickup & Drop'
  }[mode] || mode;
}

function _captureScroll() {
  // .screen is the scrollable container inside each rendered screen
  const el = document.querySelector('.screen, .chat-body, #adminChatBody');
  return el ? el.scrollTop : 0;
}

function _restoreScroll(top) {
  // Wait for the new render to paint, then restore
  setTimeout(() => {
    const el = document.querySelector('.screen, .chat-body, #adminChatBody');
    if (el) el.scrollTop = top || 0;
  }, 30);
}

function renderKeepingScroll(updateFn) {
  const top = _captureScroll();
  if (typeof updateFn === 'function') updateFn();
  render();
  _restoreScroll(top);
}

function setBookingMode(mode) {
  renderKeepingScroll(() => {
    STATE.bookingForm.mode = mode;
  });
}

function setBookingPay(mode) {
  renderKeepingScroll(() => {
    STATE.bookingForm.pay = mode;
  });
}

function setProductCategory(category) {
  renderKeepingScroll(() => {
    STATE.productCategory = category || '';
  });
}

function nav(screen, data) {
  refreshAppConfig({ rerender: false });
  if (!flag('showAccessoriesShop') && ['accessories', 'cart', 'productDetail'].includes(screen)) screen = 'home';
  if (!flag('showWishlist') && screen === 'wishlist') screen = 'home';
  if (!flag('showRewards') && screen === 'rewards') screen = 'home';
  if (!flag('showLeaderboard') && screen === 'leaderboard') screen = 'profile';
  if (!flag('showGallery') && screen === 'gallery') screen = 'profile';
  if (!flag('showChatbot') && screen === 'chatbot') screen = 'home';
  if (!flag('showSupportChat') && screen === 'supportChat') screen = 'profile';
  if (!flag('showOffers') && screen === 'offers') screen = 'home';
  if (!flag('showPackages') && screen === 'packages') screen = 'home';
  if (!flag('showBranches') && screen === 'branches') screen = 'home';
  if (!flag('showEmergency') && screen === 'emergency') screen = 'home';
  if (STATE.current && STATE.current !== screen && STATE.current !== 'splash') {
    STATE.navStack.push({
      screen: STATE.current,
      data: STATE.data,
      scrollTop: _captureScroll()
    });
    if (STATE.navStack.length > 30) STATE.navStack.shift();
  }
  STATE.current = screen;
  STATE.data = data || {};
  try { history.pushState({ screen }, '', '#' + screen); } catch (e) {}
  render();
  _restoreScroll(0); // forward navigation = top
}

function navBack() {
  if (STATE.navStack && STATE.navStack.length > 0) {
    const prev = STATE.navStack.pop();
    STATE.current = prev.screen;
    STATE.data = prev.data || {};
    render();
    _restoreScroll(prev.scrollTop || 0); // restore where user was
    return true;
  }
  // top-level tabs: jump to home if not already
  if (STATE.current !== 'home' && STATE.current !== 'splash' && STATE.current !== 'login') {
    STATE.current = 'home';
    STATE.data = {};
    render();
    _restoreScroll(0);
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
    <span class="tb-title">${title}</span>
    <span style="flex:1"></span>
    ${STATE.token ? `<button class="tb-icon-btn" onclick="openNotifications()" aria-label="Notifications">🔔${STATE.notifUnread ? `<span class="tb-dot">${STATE.notifUnread > 9 ? '9+' : STATE.notifUnread}</span>` : ''}</button>` : ''}
    ${flag('showLanguageToggle') ? `<button class="lang-toggle" onclick="toggleLang()">${STATE.lang.toUpperCase()}</button>` : ''}
  </div>`;
}

function tabbar(active) {
  const tabs = [
    ['home', 'Home', 'H'],
    ['support', 'Help', '?'],
    flag('showAccessoriesShop') ? ['accessories', 'GoStore', '+'] : null,
    ['profile', 'My Vehicles', 'V'],
    ['more', 'Account', 'A']
  ].filter(Boolean);
  const cartBadge = STATE.cart.length;
  return `<div class="tabbar gm-tabbar">${tabs.map(([k, label, icon]) => `
    <a class="${active === k ? 'active' : ''}" onclick="nav('${k}')">
      <span class="ic">${icon}</span>${label}
      ${k === 'accessories' && cartBadge ? `<span class="tab-badge">${cartBadge}</span>` : ''}
    </a>`).join('')}</div>`;
}

function cleanPhone(phone) {
  return String(phone || '').replace(/[^\d+]/g, '');
}

function mapsSearchUrl(query, lat, lng) {
  const q = encodeURIComponent(query || 'nearby tow service');
  if (lat && lng) return `https://www.google.com/maps/search/${q}/@${lat},${lng},14z`;
  return `https://www.google.com/maps/search/${q}`;
}

function openNearbyService(type = 'tow') {
  const query = type === 'emergency'
    ? cfgVal('emergencySearchQuery', 'nearby emergency roadside assistance')
    : cfgVal('towSearchQuery', 'nearby tow service');
  const openUrl = (lat, lng) => window.open(mapsSearchUrl(query, lat, lng), '_blank');
  if (!navigator.geolocation) return openUrl();
  toast('Location check ho rahi hai...');
  navigator.geolocation.getCurrentPosition(
    pos => openUrl(pos.coords.latitude, pos.coords.longitude),
    () => openUrl(),
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
  );
}

function sosCard() {
  const towName = cfgVal('towServiceName', 'Nearby Tow Service');
  const towPhone = cfgVal('towServicePhone', cfgVal('helplinePhone', '+91 8839533202'));
  const govName = cfgVal('govEmergencyName', 'Government Emergency Helpline');
  const govPhone = cfgVal('govEmergencyPhone', '112');
  const wa = cfgVal('whatsappNumber', '918839533202');
  return `<div class="sos-home-card">
    <div class="sos-head">
      <span class="sos-badge">SOS</span>
      <span class="sos-sub">Roadside emergency help</span>
    </div>
    <div class="sos-title">Tow service aur emergency helpline</div>
    <div class="sos-copy">Location ke hisab se nearby tow ya emergency services search karo, ya direct call karo.</div>
    <div class="sos-grid">
      <a class="sos-action danger" href="tel:${cleanPhone(govPhone)}"><b>${govName}</b><span>${govPhone}</span></a>
      <a class="sos-action" href="tel:${cleanPhone(towPhone)}"><b>${towName}</b><span>${towPhone}</span></a>
    </div>
    <div class="sos-row">
      <button class="sos-btn" onclick="openNearbyService('tow')">Nearby Tow</button>
      <button class="sos-btn" onclick="openNearbyService('emergency')">Nearby Emergency</button>
      <a class="sos-btn whatsapp" href="https://wa.me/${cleanPhone(wa)}?text=SOS:%20mujhe%20roadside%20help%20chahiye">WhatsApp</a>
    </div>
  </div>`;
}

function moreLinks() {
  return `<div class="card-section-title" style="font-size:11px;font-weight:700;color:var(--l);text-transform:uppercase;letter-spacing:1px;margin:18px 14px 8px">More</div>
      <div class="qlink-card">
        <div class="qlink" onclick="openNotifications()">
          <div class="qlink-icon notif">🔔</div>
          <div class="qlink-text"><div class="qlink-title">Notifications</div><div class="qlink-sub">Booking & order updates</div></div>
          ${STATE.notifUnread ? `<span class="qlink-pill">${STATE.notifUnread}</span>` : ''}
          <span class="qlink-arrow">›</span>
        </div>
        ${flag('showOffers') ? `<div class="qlink" onclick="nav('offers')">
          <div class="qlink-icon offer">🎟</div>
          <div class="qlink-text"><div class="qlink-title">Offers & Coupons</div><div class="qlink-sub">${(STATE.coupons || []).length || 3} active offers</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showSupportChat') ? `<div class="qlink" onclick="nav('supportChat')">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB);color:#1565C0">💬</div>
          <div class="qlink-text"><div class="qlink-title">Chat with Support</div><div class="qlink-sub">Voice note bhi bhej sakte ho</div></div>
          <span class="qlink-pill" style="background:linear-gradient(135deg,#1565C0,#1B6FC2)">LIVE</span>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showChatbot') ? `<div class="qlink" onclick="nav('chatbot')">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#F3E5F5,#E1BEE7);color:#7B1FA2">🤖</div>
          <div class="qlink-text"><div class="qlink-title">CarBot AI Assistant</div><div class="qlink-sub">Car ke baare me kuch bhi pucho</div></div>
          <span class="qlink-pill" style="background:linear-gradient(135deg,#7B1FA2,#9C27B0)">NEW</span>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showLeaderboard') ? `<div class="qlink" onclick="openLeaderboard()">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#FFF8E1,#FFE082);color:#F57C00">🏆</div>
          <div class="qlink-text"><div class="qlink-title">Leaderboard</div><div class="qlink-sub">Top referrers ko dekho</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showGallery') ? `<div class="qlink" onclick="nav('gallery')">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#E0F2F1,#B2DFDB);color:#00695C">📸</div>
          <div class="qlink-text"><div class="qlink-title">Service Gallery</div><div class="qlink-sub">Pichli services ke before/after photos</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        <div class="qlink" onclick="setBirthday()">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#FCE4EC,#F8BBD0);color:#C2185B">🎂</div>
          <div class="qlink-text"><div class="qlink-title">Birthday ${STATE.user?.birthday ? '✓' : 'Set Birthday'}</div><div class="qlink-sub">${STATE.user?.birthday ? 'Birthday me 20% off automatic' : 'Set karne par birthday me special offer milega'}</div></div>
          <span class="qlink-arrow">›</span>
        </div>
        ${flag('showRefer') ? `<div class="qlink" onclick="nav('refer')">
          <div class="qlink-icon refer">🎁</div>
          <div class="qlink-text"><div class="qlink-title">Refer & Earn Rs 100</div><div class="qlink-sub">Friends ko bulao, dono ko benefit</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showPackages') ? `<div class="qlink" onclick="nav('packages')">
          <div class="qlink-icon pkg">📦</div>
          <div class="qlink-text"><div class="qlink-title">Service Packages</div><div class="qlink-sub">Silver & Gold care plans</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showBranches') ? `<div class="qlink" onclick="nav('branches')">
          <div class="qlink-icon branch">📍</div>
          <div class="qlink-text"><div class="qlink-title">Find a Branch</div><div class="qlink-sub">${(STATE.support?.branches || []).length} branches</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showEmergency') ? `<div class="qlink" onclick="nav('emergency')">
          <div class="qlink-icon sos">🚨</div>
          <div class="qlink-text"><div class="qlink-title">Emergency Help</div><div class="qlink-sub">24x7 roadside assistance</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        <div class="qlink" onclick="nav('support')">
          <div class="qlink-icon support">🛟</div>
          <div class="qlink-text"><div class="qlink-title">Support Hub</div><div class="qlink-sub">FAQ, tips, packages</div></div>
          <span class="qlink-arrow">›</span>
        </div>
        <div class="qlink" onclick="logout()" style="color:var(--er)">
          <div class="qlink-icon logout">⏻</div>
          <div class="qlink-text"><div class="qlink-title">Logout</div><div class="qlink-sub">Sign out of this account</div></div>
          <span class="qlink-arrow">›</span>
        </div>
      </div>`;
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
  if (!flag('showRewards')) return '';
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
      ${flag('showRefer') ? `<div class="mini-stat"><b>${rewards.referralCode || '-'}</b><span>REFERRAL</span></div>` : ''}
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

// ===== Engagement helpers =====
function isBirthdayToday() {
  if (!STATE.user?.birthday) return false;
  const b = new Date(STATE.user.birthday);
  const t = new Date();
  return b.getDate() === t.getDate() && b.getMonth() === t.getMonth();
}

function bdayBanner() {
  const code = `BDAY${(STATE.user?.referralCode || 'YOU').slice(-4)}`;
  return `<div class="bday-banner">
    <h3>🎂 Happy Birthday ${STATE.user?.name?.split(' ')[0] || ''}!</h3>
    <p>Aapke special day par 20% off — saari services valid till midnight.</p>
    <div class="bday-code" onclick="copyCoupon('BDAY20')">BDAY20</div>
  </div>`;
}

function tierProgress(user) {
  const tier = user?.loyaltyTier || 'bronze';
  const meta = TIER_META[tier];
  const count = user?.serviceCount || 0;
  if (!meta || !meta.next) return '';
  const remaining = Math.max(0, meta.needed - count);
  const pct = Math.min(100, (count / meta.needed) * 100);
  return `<div style="margin-top:8px">
    <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:600;color:var(--l)">
      <span>Next: ${TIER_META[meta.next].label}</span>
      <span>${remaining} more service${remaining === 1 ? '' : 's'}</span>
    </div>
    <div class="tier-progress"><div class="tier-progress-bar" style="width:${pct}%"></div></div>
  </div>`;
}

const screens = {
  splash: () => `<div class="splash-wrap">
    <img class="brand-logo" src="assets/vs-services-logo.png" alt="VS Services">
    <div class="tag">${cfgText('homeTagline', t('tagline'))}</div>
    <div class="loader"></div>
  </div>`,

  login: () => `
    <div class="login">
      <button class="login-close" onclick="nav('home')" aria-label="Close">&times;</button>
      <div class="login-top">
        ${logo()}
        <div class="login-title">Welcome to VS SERVICES</div>
      </div>
        <div class="login-form">
        <label class="label">Your Name</label>
        <input id="setupName" placeholder="e.g. Vinod Kumar" value="${STATE.user?.name || ''}">
        <button class="btn btn-out" onclick="googleLogin()">Continue with Google</button>
        <div class="divider"><span>OR</span></div>
        <button class="btn btn-out" onclick="nav('home')">Skip for now</button>
        <div class="login-foot">Problem? Call <a href="tel:8839533202">8839533202</a> or <a href="https://wa.me/918839533202">WhatsApp</a></div>
      </div>
    </div>`,

  home: () => {
    const isBirthday = isBirthdayToday();
    return `
    ${topbar(t('appName'))}
    <div class="screen">
      ${isBirthday ? bdayBanner() : ''}
      <div class="hero">
        <div class="hero-title">${STATE.user?.name ? STATE.user.name.split(' ')[0] : cfgText('homeHeroTitleGuest', 'Welcome!')}${isBirthday ? ' 🎂' : ''}</div>
        ${STATE.user?.loyaltyTier ? `<div style="margin-top:6px;position:relative;z-index:2"><span class="tier-badge tier-${STATE.user.loyaltyTier}"><span class="tier-icon">${TIER_META[STATE.user.loyaltyTier]?.icon}</span>${TIER_META[STATE.user.loyaltyTier]?.label} Member</span></div>` : ''}
        <div class="hero-sub" style="margin-top:8px">
          ${cfgText('homeHeroSubtitle', 'Trusted car care with fair pricing.\\nSirf zaroori service, sahi daam par.\\nExtra repair ya parts replacement se pehle aapki approval zaroori.')}
        </div>
        <div class="hero-cta">
          <span class="chip-cta primary" onclick="nav('booking')">🔧 Book Service</span>
          <span class="chip-cta" onclick="nav('${STATE.token ? 'profile' : 'login'}')">${STATE.token ? '👤 Profile' : '🔑 Login'}</span>
          <span class="chip-cta" onclick="window.location.href='tel:8839533202'">📞 Call Us</span>
        </div>
        <div class="trust-badges">
          <span>Fair Pricing</span>
          <span>No Forced Repairs</span>
          <span>Approval Before Extra Work</span>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><b>${STATE.user?.serviceCount || STATE.bookings.length}</b><span>SERVICES</span></div>
          <div class="hero-stat"><b>${(STATE.rewards?.walletPoints || STATE.user?.walletPoints || 0)}</b><span>POINTS</span></div>
          ${flag('showStreak') ? `<div class="hero-stat"><b>${STATE.user?.streakDays || 0}🔥</b><span>STREAK</span></div>` : ''}
        </div>
      </div>
      ${flag('showStreak') && STATE.user?.streakDays > 1 ? `<div class="streak-card" onclick="nav('profile')">
        <div class="streak-flame">🔥</div>
        <div class="streak-info"><b>${STATE.user.streakDays}-day streak!</b><span>Keep visiting daily for bonus points</span></div>
      </div>` : ''}
      <div class="trust-panel">
        <div class="trust-panel-kicker">${cfgText('trustKicker', 'Why customers trust VS Services')}</div>
        <div class="trust-panel-title">${cfgText('trustTitle', 'Pehle inspection, phir approval')}</div>
        <div class="trust-panel-sub">${cfgText('trustSubtitle', 'Bina aapki permission ke extra kaam nahi.')}</div>
        <div class="trust-points">
          <div class="trust-point">
            <div class="trust-icon">S</div>
            <div><b>No unnecessary work</b><span>Jo kaam zaroori hoga, wahi suggest hoga.</span></div>
          </div>
          <div class="trust-point">
            <div class="trust-icon">₹</div>
            <div><b>Fair estimate first</b><span>Service se pehle clear estimate milega.</span></div>
          </div>
          <div class="trust-point">
            <div class="trust-icon">Q</div>
            <div><b>Quality service</b><span>Genuine parts aur trained mechanic support.</span></div>
          </div>
        </div>
      </div>
      ${flag('showDailyTip') && (cfgVal('tipOfDayTitle') || STATE.tipOfDay) ? `<div class="tip-card" onclick="nav('support')">
        <span class="tip-label">💡 Tip of the day</span>
        <div class="tip-title">${cfgText('tipOfDayTitle', STATE.tipOfDay?.title || '')}</div>
        <div class="tip-body">${cfgText('tipOfDayBody', STATE.tipOfDay?.body || '')}</div>
      </div>` : ''}
      <div class="section">${t('quick')}</div>
      <div class="grid quick-grid">
        <div class="action" onclick="nav('booking')"><div class="ic-wrap">🔧</div><div class="t">Book Service</div></div>
        ${flag('showAccessoriesShop') ? `<div class="action" onclick="nav('accessories')"><div class="ic-wrap">🛒</div><div class="t">Shop Parts</div></div>` : ''}
        <div class="action" onclick="nav('orders')"><div class="ic-wrap">📦</div><div class="t">My Orders</div></div>
        ${flag('showWishlist') ? `<div class="action" onclick="nav('wishlist')"><div class="ic-wrap">❤️</div><div class="t">Wishlist</div></div>` : ''}
        <div class="action" onclick="nav('bookings')"><div class="ic-wrap">📅</div><div class="t">Track Booking</div></div>
        <div class="action" onclick="nav('support')"><div class="ic-wrap">🛟</div><div class="t">Support</div></div>
      </div>
      <div class="gm-membership" onclick="nav('packages')">
        <div><span>Miles</span><b>VS Care Membership</b><small>Save on service, inspection and roadside help</small></div>
        <strong>></strong>
      </div>
      <div class="section gm-section-head">Value Added Services</div>
      <div class="gm-service-grid">
        <div class="gm-promo-card red" onclick="nav('packages')"><b>Service Plans</b><span>Periodic care packages</span></div>
        <div class="gm-promo-card blue" onclick="nav('support')"><b>Protect+</b><span>Inspection and support</span></div>
        <div class="gm-promo-card purple" onclick="nav('emergency')"><b>Top Assist</b><span>Roadside emergency help</span></div>
        <div class="gm-promo-card peach" onclick="nav('booking')"><b>GoShine</b><span>Cleaning and detailing</span></div>
      </div>
      <div class="gm-parts-strip">
        <div><b>Original Spare Parts</b><span>Genuine parts support with service approval</span></div>
        <button onclick="nav('accessories')">Explore</button>
      </div>
      ${flag('showRecommendations') && STATE.recommendations.length ? `<div class="rec-card">
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
      ${flag('showEmergency') ? sosCard() : ''}
      <div class="section">${t('services')}</div>
      ${STATE.services.map(service => {
        const icon = ({checkup:'🩺',repair:'🔧',denting_painting:'🎨',service:'⚙️'})[service.category] || '🔧';
        return `
        <div class="svc" onclick="nav('booking',{serviceId:'${service._id}'})">
          <div class="svc-thumb ${service.category || ''}">${icon}</div>
          <div class="info">
            <div class="name">${service.name}</div>
            <div class="desc">${service.description || ''}</div>
            <span class="badge-category">${(service.category || '').replace(/_/g, ' ')}</span>
            <div class="muted" style="margin-top:4px">⏱ ${service.estimatedTime || '-'}</div>
            <div class="price">${money(service.basePrice)}</div>
          </div>
          <div class="svc-actions">
            <button class="chip small" onclick="event.stopPropagation(); previewEstimate('${service._id}')">${t('estimate')}</button>
            <button class="chip small active" onclick="event.stopPropagation(); nav('booking',{serviceId:'${service._id}'})">${t('book')}</button>
          </div>
        </div>`}).join('')}
      <div class="section">${t('tips')}</div>
      <div class="care-tip-panel" onclick="nav('support')">
        <div class="care-tip-head">
          <span class="care-tip-badge">SMART TIP</span>
          <span class="care-tip-icon">💡</span>
        </div>
        ${getCareTips().slice(0, 2).map((tip, index) => `<div class="care-tip-item ${index === 0 ? 'featured' : ''}">
          <div class="care-tip-title">${tip.title}</div>
          <div class="care-tip-body">${tip.body}</div>
        </div>`).join('')}
        <div class="care-tip-cta">Open Support Hub →</div>
      </div>
    </div>
    ${tabbar('home')}`;
  },

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
      <div class="chip ${!cat ? 'active' : ''}" onclick="setProductCategory('')">All</div>
      ${categories.map(c => `<div class="chip ${cat === c ? 'active' : ''}" onclick="setProductCategory('${c}')">${c}</div>`).join('')}
    </div>
    <div class="screen">
      <div class="pgrid">
        ${filtered.length ? filtered.map(p => `
          <div class="pcard" onclick="nav('product',{id:'${p._id}'})">
            <button class="wish-heart ${isWished(p._id) ? 'on' : ''}" onclick="event.stopPropagation();toggleWish('${p._id}')">${isWished(p._id) ? '♥' : '♡'}</button>
            ${productImage(p)}
            <div class="pname">${p.name}</div>
            <div class="muted">${p.category}</div>
            <div class="quote-price">${quoteLabel()}</div>
          </div>`).join('') : `<div class="empty">No products match</div>`}
      </div>
    </div>
    ${STATE.cart.length ? `<div class="fab cart-fab-left" onclick="nav('cart')">Cart (${STATE.cart.length})</div>` : ''}
    ${tabbar('accessories')}`;
  },

  wishlist: () => `
    ${topbar('My Wishlist', { screen: 'accessories' })}
    <div class="screen">
      ${STATE.wishlist.length ? `<div class="pgrid">${STATE.wishlist.map(p => `
        <div class="pcard" onclick="nav('product',{id:'${p._id}'})">
          <button class="wish-heart on" onclick="event.stopPropagation();toggleWish('${p._id}')">♥</button>
          ${productImage(p)}
          <div class="pname">${p.name}</div>
          <div class="muted">${p.category || ''}</div>
          <div class="quote-price">${quoteLabel()}</div>
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
          ${productImage(p, true)}
          <h2>${p.name}</h2>
          <div class="muted">${p.description || ''}</div>
          <div class="quote-box">
            <b>${quoteLabel()}</b>
            <span>Price confirm karne ke liye chat ya call karein. Checkout me shop se bataya gaya amount manually fill kar sakte hain.</span>
          </div>
          <div class="muted">Stock: ${p.stock}</div>
          <label class="label inline">Need this part with service?</label>
          <textarea id="partsReqText" placeholder="Example: Include this with my next service booking"></textarea>
          <button id="addCartBtn-${p._id}" class="btn" onclick="addCart('${p._id}')">${STATE.cart.some(item => item.productId === p._id) ? 'Added to Cart' : 'Add to Cart'}</button>
          ${STATE.cart.some(item => item.productId === p._id) ? `<button class="btn btn-out" onclick="nav('cart')">View Cart</button>` : ''}
          <button class="btn btn-out" onclick="toggleWish('${p._id}')">${isWished(p._id) ? '♥ Remove from Wishlist' : '♡ Add to Wishlist'}</button>
          <button class="btn btn-out" onclick="savePartsDraft('${p.name}')">Save as Spare Parts Request</button>
        </div>
      </div>`;
  },

  cart: () => {
    const itemCount = STATE.cart.reduce((s, i) => s + i.quantity, 0);
    return `
      ${topbar('Cart' + (itemCount ? ` (${itemCount})` : ''), { screen: 'accessories' })}
      <div class="screen">
        ${STATE.cart.length ? STATE.cart.map(item => `
          <div class="cart-item">
            <div class="cart-thumb">🛍</div>
            <div class="cart-info">
              <div class="cart-name">${item.name}</div>
              <div class="cart-price">${quoteLabel()}</div>
            </div>
            <div class="cart-qty">
              <button onclick="changeQty('${item.productId}',-1)">−</button>
              <span class="q">${item.quantity}</span>
              <button onclick="changeQty('${item.productId}',1)">+</button>
            </div>
          </div>`).join('') : `<div class="empty-pro"><div class="ep-icon">🛒</div><div class="ep-title">Cart khali hai</div><div class="ep-msg">Shop me jake apne pasand ke products add karo.</div><button class="ep-cta" onclick="nav('accessories')">Browse Shop</button></div>`}
        ${STATE.cart.length ? `<div class="cart-summary">
          <div class="kv"><span>Items</span><span>${itemCount}</span></div>
          <div class="quote-box compact">
            <b>Amount shop se confirm hoga</b>
            <span>Jo amount call/chat par bataya gaya ho use niche fill karein. Blank chhodne par delivery/garage par pay kar sakte hain.</span>
          </div>
          <div style="margin-top:14px">
            <label class="label" style="margin:6px 0">Delivery Address</label>
            <input id="addr" placeholder="Address line" value="${STATE.user?.addresses?.[0]?.line1 || ''}">
            <div class="row" style="padding:0">
              <input id="city" placeholder="City" value="${STATE.user?.addresses?.[0]?.city || ''}">
              <input id="pin" placeholder="Pincode" maxlength="6" inputmode="numeric" value="${STATE.user?.addresses?.[0]?.pincode || ''}">
            </div>
            ${flag('showMapPicker') ? `<button class="btn btn-out" style="margin-top:8px" onclick="openMapPicker('cart')">Pick Location on Map</button>` : ''}
            <div id="cartLocationHint" class="muted" style="margin-top:6px">${STATE.cartLocation?.address ? `Selected: ${STATE.cartLocation.address}` : ''}</div>
          </div>
          <label class="label" style="margin:14px 0 6px">Amount Told by Shop (optional)</label>
          <input id="manualOrderAmount" type="number" min="0" inputmode="numeric" placeholder="e.g. 1200">
          <label class="label" style="margin:14px 0 6px">Payment Mode</label>
          <div class="row" style="padding:0">
            <div class="chip ${STATE.payMode === 'cod' ? 'active' : ''}" onclick="STATE.payMode='cod';render()">💵 Cash/UPI on Delivery</div>
            ${flag('showOnlinePayment') ? `<div class="chip ${STATE.payMode === 'online' ? 'active' : ''}" onclick="STATE.payMode='online';render()">💳 Payment</div>` : ''}
          </div>
          <button class="btn btn-gradient" onclick="placeOrder()">Place Order</button>
        </div>` : '' }
      </div>
      ${tabbar('accessories')}`;
  },

  booking: () => {
    const selected = STATE.data.serviceId || STATE.bookingForm.serviceId;
    const list = STATE.services;
    const serviceModes = [
      ['at_garage', 'At Garage'],
      ...(flag('showHomeService') ? [['home_service', 'Home Service']] : []),
      ...(flag('showPickupDrop') ? [['pickup_drop', 'Pickup & Drop']] : [])
    ];
    if (!serviceModes.some(([mode]) => mode === (STATE.bookingForm.mode || 'at_garage'))) {
      STATE.bookingForm.mode = 'at_garage';
    }
    const paymentModes = [
      ['pay_on_service', 'Cash / UPI / Pay at garage'],
      ...(flag('showOnlinePayment') ? [['online', 'Demo online payment']] : [])
    ];
    if ((STATE.bookingForm.pay || 'pay_on_service') === 'online' && !flag('showOnlinePayment')) {
      STATE.bookingForm.pay = 'pay_on_service';
    }
    const showBookingExtras = flag('showCouponInput') || flag('showPartsRequest') || flag('showInspectionPhotos');
    return `
      ${topbar('Book Service', { screen: 'home' })}
      <div class="screen">
        <div class="label">Select Service</div>
        ${list.map(service => `<div class="card selectable ${selected === service._id ? 'selected' : ''}" onclick="STATE.bookingForm.serviceId='${service._id}';render()">
          <b>${service.name}</b><div class="muted">${service.description}</div><div class="price">${money(service.basePrice)}</div></div>`).join('')}
        <div class="label">Car Profile</div>
        <div class="card vehicle-card">
          <button class="vehicle-select-card" onclick="openVehiclePicker('booking')">
            <span class="vehicle-car-art">${vehicleInitials(STATE.bookingForm.brand || STATE.user?.cars?.[0]?.brand, STATE.bookingForm.model || STATE.user?.cars?.[0]?.model)}</span>
            <span><b>${vehicleSummary(STATE.bookingForm.brand || STATE.user?.cars?.[0]?.brand, STATE.bookingForm.model || STATE.user?.cars?.[0]?.model) || 'Select your vehicle'}</b><em>Tap to choose brand and model</em></span>
          </button>
          <input id="cBrand" type="hidden" value="${STATE.bookingForm.brand || STATE.user?.cars?.[0]?.brand || ''}">
          <input id="cModel" type="hidden" value="${STATE.bookingForm.model || STATE.user?.cars?.[0]?.model || ''}">
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
          ${serviceModes.map(([mode, label]) => `<div class="chip ${(STATE.bookingForm.mode || 'at_garage') === mode ? 'active' : ''}" onclick="setBookingMode('${mode}')">${label}</div>`).join('')}
        </div>
        ${['home_service', 'pickup_drop'].includes(STATE.bookingForm.mode || 'at_garage') ? `
          <div class="card">
            ${flag('showMapPicker') ? `<button class="btn btn-out" style="margin-bottom:10px" onclick="openMapPicker()">📍 Pick Location on Map</button>` : ''}
            <input id="bAddr" placeholder="Address line" value="${STATE.bookingForm.addr || ''}">
            <div class="row">
              <input id="bCity" placeholder="City" value="${STATE.bookingForm.city || ''}">
              <input id="bPin" placeholder="Pincode" maxlength="6" inputmode="numeric" value="${STATE.bookingForm.pin || ''}">
            </div>
          </div>` : ''}
        <div class="card">
          <div class="row">
            <input id="bDate" type="date" value="${STATE.bookingForm.date || ''}">
            <select id="bSlot">${['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'].map(slot => `<option ${((STATE.bookingForm.slot || '10:00 AM') === slot) ? 'selected' : ''}>${slot}</option>`).join('')}</select>
          </div>
          ${showBookingExtras ? `
            ${flag('showCouponInput') ? `<input id="couponCode" placeholder="Coupon code (WELCOME10)" value="${STATE.bookingForm.couponCode || ''}">` : ''}
            ${flag('showPartsRequest') ? `<input id="partsEstimate" type="number" placeholder="Estimated parts cost (optional)" value="${STATE.bookingForm.partsEstimate || ''}">
            <textarea id="sparePartsRequest" placeholder="Spare parts request">${STATE.bookingForm.sparePartsRequest || localStorage.getItem('sparePartsDraft') || ''}</textarea>` : ''}
            ${flag('showInspectionPhotos') ? `<textarea id="inspectionPhotos" placeholder="Photo URLs comma separated">${STATE.bookingForm.inspectionPhotos || ''}</textarea>` : ''}
          ` : ''}
          <div class="row">
            ${paymentModes.map(([mode, label]) => `<div class="chip ${(STATE.bookingForm.pay || 'pay_on_service') === mode ? 'active' : ''}" onclick="setBookingPay('${mode}')">${label}</div>`).join('')}
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
      ${STATE.bookings.length ? STATE.bookings.map(b => {
        const isCompleted = b.status === 'completed';
        const isPickup = ['pickup_drop', 'home_service'].includes(b.serviceMode) && b.assignedStaff;
        return `
        <div class="bk">
          <div class="info" onclick="nav('bookingDetail',{id:'${b._id}'})">
            <div class="bid">${b.bookingId}</div>
            <div class="name">${b.serviceId?.name || 'Service'}</div>
            <div class="sub">📅 ${new Date(b.bookingDate).toDateString()} • ${b.timeSlot || '-'}</div>
            <div class="sub">💰 ${money(b.totalAmount)} • ${humanMode(b.serviceMode)}</div>
            <div style="margin-top:6px">${bookingStatusBadge(b.status)}</div>
          </div>
          <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;border-top:1px solid var(--b);padding-top:10px">
            <button class="btn btn-sm btn-out" onclick="event.stopPropagation();shareBooking('${b._id}')" style="flex:1;min-width:80px">📤 Share</button>
            ${isCompleted ? `<button class="btn btn-sm" onclick="event.stopPropagation();bookAgain('${b._id}')" style="flex:1;min-width:80px">🔄 Book Again</button>` : ''}
            ${isCompleted && isPickup ? `<button class="btn btn-sm btn-out" onclick="event.stopPropagation();rateDriverModal('${b._id}')" style="flex:1;min-width:80px">⭐ Rate Driver</button>` : ''}
          </div>
        </div>`;
      }).join('') : `<div class="empty-pro">
        <div class="ep-icon">🗓️</div>
        <div class="ep-title">No bookings yet</div>
        <div class="ep-msg">Apni car ki pehli service book karo, sab kuch yahan dikhega.</div>
        <div class="ep-cta-row">
          <button class="ep-cta" onclick="nav('booking')">Book Now</button>
          <button class="ep-cta-secondary" onclick="nav('packages')">View Packages</button>
        </div>
      </div>`}
      ${flag('showHistory') ? `<div class="section">${t('history')}</div>
      <div class="card">${historyList()}</div>` : ''}
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
        ${flag('showVoiceNotes') ? `<div class="card">
          <div class="mini-title">🎤 Voice Note for Staff</div>
          <div class="muted" style="font-size:12px;margin-bottom:8px">Apni car ki problem describe karo voice me — staff sune se pehle.</div>
          ${booking.voiceNote ? voiceBubble(booking.voiceNote, booking.voiceNoteDuration, 'bvn-' + booking._id) : '<div class="muted small">No voice note yet</div>'}
          ${['booked','confirmed','assigned','pickup_scheduled','in_progress'].includes(booking.status) ? `
            <button class="voice-rec-btn" id="bookingRecBtn" onclick="toggleVoiceRec('booking','${booking._id}')" style="margin-top:10px">
              <span class="rec-dot"></span>${booking.voiceNote ? 'Re-record' : 'Record'} Voice Note
            </button>` : ''}
        </div>` : ''}
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
    ${topbar(cfgVal('supportHubTitle', t('support')), { screen: 'home' })}
    <div class="screen">
      <div class="card"><div class="mini-title">${cfgText('supportHubTitle', t('support'))}</div><div class="muted">${cfgText('supportHubSubtitle', 'FAQ, tips, branches aur emergency help ek jagah.')}</div></div>
      ${flag('showBranches') ? `<div class="section">${t('branches')}</div>
      <div class="card stack-list">${STATE.support.branches.map(branch => `<div>
        <b>${branch.name}</b>
        <div class="muted">${branch.address}</div>
        <a href="${branch.mapUrl}" target="_blank" class="mini-link">Open Map</a>
      </div>`).join('')}</div>` : ''}
      ${flag('showEmergency') ? `<div class="section">${t('emergency')}</div>
      <div class="grid quick-grid">${STATE.support.emergency.map(item => `<div class="action">
        <div class="ic">SOS</div>
        <div class="t">${item.title}</div>
        <a href="tel:${item.phone.replace(/\s+/g, '')}" class="mini-link">${item.eta}</a>
      </div>`).join('')}</div>` : ''}
      ${flag('showDailyTip') ? `<div class="section">${t('tips')}</div>
      <div class="card stack-list">${getCareTips().map(tip => `<div><b>${tip.title}</b><div class="muted">${tip.body}</div></div>`).join('')}</div>` : ''}
      <div class="section">${t('faq')}</div>
      <div class="card stack-list">${STATE.support.faq.map(item => `<div><b>${item.q}</b><div class="muted">${item.a}</div></div>`).join('')}</div>
      ${flag('showPackages') || flag('showOffers') ? `<div class="section">Packages & Coupons</div>
      <div class="card stack-list">
        ${flag('showPackages') ? STATE.support.packages.map(item => `<div><b>${item.name} - ${money(item.price)}</b><div class="muted">${item.benefits.join(', ')}</div></div>`).join('') : ''}
        ${flag('showOffers') ? STATE.support.coupons.map(item => `<div><b>${item.code}</b><div class="muted">${item.description} • ${item.value}</div></div>`).join('') : ''}
      </div>` : ''}
      <div class="card">
        <div class="mini-title">WhatsApp</div>
        <a class="btn" href="https://wa.me/${cleanPhone(cfgVal('whatsappNumber', '918839533202'))}?text=${encodeURIComponent(cfgVal('supportWhatsappText', 'Hi I need car service help'))}">Chat on WhatsApp</a>
      </div>
    </div>
    ${tabbar('support')}`,

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
        <input id="pMobile" placeholder="10-digit mobile number" maxlength="10" inputmode="numeric" value="${STATE.user?.mobile || ''}">
        <input id="pEmail" placeholder="Email" value="${STATE.user?.email || ''}">
        <div class="row">
          ${flag('showLanguageToggle') ? `<div class="chip ${STATE.lang === 'en' ? 'active' : ''}" onclick="setLang('en')">English</div>
          <div class="chip ${STATE.lang === 'hi' ? 'active' : ''}" onclick="setLang('hi')">Hindi</div>` : ''}
          ${flag('showDarkMode') ? `<div class="chip ${STATE.theme === 'dark' ? 'active' : ''}" onclick="toggleTheme()">${STATE.theme === 'dark' ? '☀ Light' : '🌙 Dark'}</div>` : ''}
        </div>
        <button class="btn" onclick="saveProfile()">Save Profile</button>
      </div>
      <div class="card">
        <div class="mini-title">⚡ Quick Links</div>
        <div class="quick-tray">
          <div class="chip" onclick="nav('orders')"><span class="tic">📦</span>Orders<br><small>${STATE.orders.length}</small></div>
          ${flag('showWishlist') ? `<div class="chip" onclick="nav('wishlist')"><span class="tic">❤️</span>Wishlist<br><small>${STATE.wishlist.length}</small></div>` : ''}
          <div class="chip" onclick="nav('bookings')"><span class="tic">📅</span>Bookings<br><small>${STATE.bookings.length}</small></div>
        </div>
      </div>
      ${rewardCard()}
      ${flag('showCarProfile') ? `<div class="card">
        <div class="mini-title">Car Profile</div>
        ${(STATE.user?.cars || []).map(car => `<div class="line-item">
          <div><b>${car.brand || ''} ${car.model || ''}</b><div class="muted">${car.carNumber} • ${car.fuelType || '-'}</div><div class="muted">RC: ${car.rcNumber || '-'} ${car.insuranceExpiry ? `• Insurance: ${new Date(car.insuranceExpiry).toDateString()}` : ''}</div></div>
          <button class="chip small" onclick="removeCar('${car._id}')">Remove</button>
        </div>`).join('')}
        <button class="vehicle-select-card" onclick="openVehiclePicker('profile')">
          <span class="vehicle-car-art">VS</span>
          <span><b>Select your vehicle</b><em>Choose brand and model from catalog</em></span>
        </button>
        <input id="carBrand" placeholder="Brand" readonly>
        <input id="carModel" placeholder="Model" readonly>
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
      </div>` : ''}
      ${flag('showReminders') ? `<div class="card">
        <div class="mini-title">${t('reminders')}</div>
        ${remindersList()}
        <input id="remTitle" placeholder="Reminder title">
        <div class="row">
          <select id="remType"><option value="service">Service</option><option value="insurance">Insurance</option><option value="puc">PUC</option><option value="tyre">Tyre</option><option value="custom">Custom</option></select>
          <input id="remDate" type="date">
        </div>
        <textarea id="remNote" placeholder="Reminder note"></textarea>
        <button class="btn btn-out" onclick="addReminder()">Add Reminder</button>
      </div>` : ''}
      ${flag('showHistory') ? `<div class="card">
        <div class="mini-title">${t('history')}</div>
        ${historyList()}
      </div>` : ''}
      <div class="profile-more-hidden" style="display:none">
      <div class="card-section-title" style="font-size:11px;font-weight:700;color:var(--l);text-transform:uppercase;letter-spacing:1px;margin:18px 14px 8px">More</div>
      <div class="qlink-card">
        <div class="qlink" onclick="openNotifications()">
          <div class="qlink-icon notif">🔔</div>
          <div class="qlink-text"><div class="qlink-title">Notifications</div><div class="qlink-sub">Booking & order updates</div></div>
          ${STATE.notifUnread ? `<span class="qlink-pill">${STATE.notifUnread}</span>` : ''}
          <span class="qlink-arrow">›</span>
        </div>
        ${flag('showOffers') ? `<div class="qlink" onclick="nav('offers')">
          <div class="qlink-icon offer">🎟</div>
          <div class="qlink-text"><div class="qlink-title">Offers & Coupons</div><div class="qlink-sub">${(STATE.coupons || []).length || 3} active offers</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showSupportChat') ? `<div class="qlink" onclick="nav('supportChat')">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB);color:#1565C0">💬</div>
          <div class="qlink-text"><div class="qlink-title">Chat with Support</div><div class="qlink-sub">Voice note bhi bhej sakte ho</div></div>
          <span class="qlink-pill" style="background:linear-gradient(135deg,#1565C0,#1B6FC2)">LIVE</span>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showChatbot') ? `<div class="qlink" onclick="nav('chatbot')">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#F3E5F5,#E1BEE7);color:#7B1FA2">🤖</div>
          <div class="qlink-text"><div class="qlink-title">CarBot AI Assistant</div><div class="qlink-sub">Car ke baare me kuch bhi pucho</div></div>
          <span class="qlink-pill" style="background:linear-gradient(135deg,#7B1FA2,#9C27B0)">NEW</span>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showLeaderboard') ? `<div class="qlink" onclick="openLeaderboard()">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#FFF8E1,#FFE082);color:#F57C00">🏆</div>
          <div class="qlink-text"><div class="qlink-title">Leaderboard</div><div class="qlink-sub">Top referrers ko dekho</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showGallery') ? `<div class="qlink" onclick="nav('gallery')">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#E0F2F1,#B2DFDB);color:#00695C">📸</div>
          <div class="qlink-text"><div class="qlink-title">Service Gallery</div><div class="qlink-sub">Pichli services ke before/after photos</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        <div class="qlink" onclick="setBirthday()">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#FCE4EC,#F8BBD0);color:#C2185B">🎂</div>
          <div class="qlink-text"><div class="qlink-title">Birthday ${STATE.user?.birthday ? '✓' : 'Set Birthday'}</div><div class="qlink-sub">${STATE.user?.birthday ? 'Birthday me 20% off automatic' : 'Set karne par birthday me special offer milega'}</div></div>
          <span class="qlink-arrow">›</span>
        </div>
        ${flag('showRefer') ? `<div class="qlink" onclick="nav('refer')">
          <div class="qlink-icon refer">🎁</div>
          <div class="qlink-text"><div class="qlink-title">Refer & Earn ₹100</div><div class="qlink-sub">Friends ko bulao, dono ko ₹100</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showPackages') ? `<div class="qlink" onclick="nav('packages')">
          <div class="qlink-icon pkg">📦</div>
          <div class="qlink-text"><div class="qlink-title">Service Packages</div><div class="qlink-sub">Silver & Gold care plans</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showBranches') ? `<div class="qlink" onclick="nav('branches')">
          <div class="qlink-icon branch">📍</div>
          <div class="qlink-text"><div class="qlink-title">Find a Branch</div><div class="qlink-sub">${(STATE.support?.branches || []).length} branches</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        ${flag('showEmergency') ? `<div class="qlink" onclick="nav('emergency')">
          <div class="qlink-icon sos">🚨</div>
          <div class="qlink-text"><div class="qlink-title">Emergency Help</div><div class="qlink-sub">24x7 roadside assistance</div></div>
          <span class="qlink-arrow">›</span>
        </div>` : ''}
        <div class="qlink" onclick="nav('support')">
          <div class="qlink-icon support">🛟</div>
          <div class="qlink-text"><div class="qlink-title">Support Hub</div><div class="qlink-sub">FAQ, tips, packages</div></div>
          <span class="qlink-arrow">›</span>
        </div>
        <div class="qlink" onclick="nav('privacy')">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9);color:#2E7D32">i</div>
          <div class="qlink-text"><div class="qlink-title">Privacy Policy</div><div class="qlink-sub">Data collection and user choices</div></div>
          <span class="qlink-arrow">â€º</span>
        </div>
        <div class="qlink" onclick="nav('terms')">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB);color:#1565C0">§</div>
          <div class="qlink-text"><div class="qlink-title">Terms & Conditions</div><div class="qlink-sub">Service, booking, and payment rules</div></div>
          <span class="qlink-arrow">â€º</span>
        </div>
        <div class="qlink" onclick="window.open(STATE.apiUrl.replace(/\\/api\\/?$/, '') + '/legal/delete-account', '_blank')">
          <div class="qlink-icon" style="background:linear-gradient(135deg,#FFEBEE,#FFCDD2);color:#C62828">!</div>
          <div class="qlink-text"><div class="qlink-title">Request Account Deletion</div><div class="qlink-sub">Open deletion request instructions</div></div>
          <span class="qlink-arrow">â€º</span>
        </div>
        <div class="qlink" onclick="logout()" style="color:var(--er)">
          <div class="qlink-icon logout">⏻</div>
          <div class="qlink-text"><div class="qlink-title">Logout</div><div class="qlink-sub">Sign out of this account</div></div>
          <span class="qlink-arrow">›</span>
        </div>
      </div>
      </div>
    </div>
    ${tabbar('profile')}`,

  more: () => `
    ${topbar('More')}
    <div class="screen">
      ${moreLinks()}
    </div>
    ${tabbar('more')}`,

  // ========== NEW SCREENS ==========

  privacy: () => `
    ${topbar('Privacy Policy', { screen: 'profile' })}
    <div class="screen">
      <div class="card">
        <div class="mini-title">Privacy Policy</div>
        <p class="muted">VS SERVICES uses your information to create your account, book vehicle services, manage service history, process orders, send reminders, and provide support.</p>
        <div class="line-item"><div><b>Data we collect</b><div class="muted">Name, mobile number, email, vehicle details, booking details, address/location when you choose location features, optional voice notes, orders, wishlist, rewards, reminders, ratings, and support messages.</div></div></div>
        <div class="line-item"><div><b>How we use it</b><div class="muted">Service booking, customer support, order fulfilment, notifications, security, reminders, and app functionality.</div></div></div>
        <div class="line-item"><div><b>Sharing</b><div class="muted">Required details may be shared with authorized staff/admin only for service fulfilment, support, and delivery. We do not sell personal information.</div></div></div>
        <div class="line-item"><div><b>Security</b><div class="muted">Production API communication uses HTTPS. Users can contact support for account or data-related requests.</div></div></div>
      </div>
      <div class="card">
        <div class="mini-title">Contact</div>
        <div class="muted">Phone: 8839533202</div>
        <div class="muted">Support email: add official support email before Play Store release.</div>
      </div>
    </div>
    ${tabbar('profile')}`,

  terms: () => `
    ${topbar('Terms & Conditions', { screen: 'profile' })}
    <div class="screen">
      <div class="card">
        <div class="mini-title">Terms & Conditions</div>
        <div class="line-item"><div><b>Services</b><div class="muted">The app helps users book vehicle services, track bookings, manage reminders, contact support, and order accessories or spare parts where available.</div></div></div>
        <div class="line-item"><div><b>User responsibility</b><div class="muted">Users must provide accurate account, vehicle, booking, and address details before confirming a service.</div></div></div>
        <div class="line-item"><div><b>Bookings and payments</b><div class="muted">Pricing, time slots, pickup/drop, home service, offers, and spare parts depend on availability. Final cost may change after inspection if extra work or parts are required.</div></div></div>
        <div class="line-item"><div><b>Cancellations and refunds</b><div class="muted">Cancellation, refund, and rescheduling depend on booking status, work already done, parts ordered, and business policy.</div></div></div>
        <div class="line-item"><div><b>Offers and rewards</b><div class="muted">Coupons, wallet benefits, rewards, referrals, and packages can be changed, paused, or removed based on business rules and misuse prevention.</div></div></div>
      </div>
    </div>
    ${tabbar('profile')}`,

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
      <div class="map-wrap">
        <div id="branchMap" class="map-container tall"></div>
        <div class="map-controls">
          <button class="map-btn" onclick="locateMe()" title="My Location">📍</button>
          <button class="map-btn" onclick="fitBranches()" title="All branches">🗺</button>
        </div>
      </div>
      <div id="branchDistance"></div>
      <div class="section">All Branches</div>
      ${(STATE.support?.branches || []).map((branch, i) => `
        <div class="card" id="branch-card-${i}">
          <div style="display:flex;gap:14px;align-items:flex-start">
            <div style="width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,var(--p),var(--accent));color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">📍</div>
            <div style="flex:1">
              <div style="font-weight:700;font-size:15px">${branch.name}</div>
              <div class="muted" style="margin-top:4px">${branch.address}</div>
              <div class="muted" style="font-size:11px;margin-top:4px">⏰ ${branch.timings}</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;margin-top:14px">
            <button class="btn btn-sm" style="flex:1" onclick="focusBranch(${i})">🎯 Show on Map</button>
            <a class="btn btn-sm" style="flex:1;text-decoration:none;text-align:center" href="${branch.mapUrl}" target="_blank">🗺 Directions</a>
            <a class="btn btn-sm btn-out" style="flex:1;text-decoration:none;text-align:center" href="tel:${branch.phone.replace(/\s+/g, '')}">📞 Call</a>
          </div>
        </div>`).join('')}
    </div>
    ${tabbar('profile')}`,

  emergency: () => `
    ${topbar('Emergency Help', { screen: 'more' })}
    <div class="screen">
      ${sosCard()}
      <div class="grid quick-grid">${(STATE.support?.emergency || []).map(item => `
        <div class="action">
          <div class="ic" style="font-size:26px">${({ 'jump-start':'⚡', 'puncture':'🛞', 'battery':'🔋', 'towing':'🚚' })[item.id] || '🆘'}</div>
          <div class="t">${item.title}</div>
          <div class="muted" style="font-size:10px;margin-top:4px">ETA ${item.eta}</div>
          <a class="mini-link" href="tel:${item.phone.replace(/\s+/g, '')}">📞 Call</a>
        </div>`).join('')}</div>
    </div>
    ${tabbar('more')}`,

  chatbot: () => {
    const msgs = STATE.chatMessages || [];
    const suggestions = STATE.chatSuggestions.length ? STATE.chatSuggestions : [
      'Engine oil kab change?', 'AC kam thanda', 'Battery check signs', 'Active coupons',
      'Tyre pressure?', 'Service cost?', 'How to book?', 'Emergency help'
    ];
    return `<div class="chat-screen">
      <div class="chat-head">
        <div class="back" onclick="navBack() || nav('home')">←</div>
        <div class="ch-avatar">🤖</div>
        <div class="ch-info">
          <div class="ch-name">CarBot AI</div>
          <div class="ch-status">Online · Ready to help</div>
        </div>
        <button class="back" onclick="clearChat()" title="New chat">↻</button>
      </div>
      <div class="chat-body" id="chatBody">
        ${msgs.length === 0 ? `
          <div class="msg-row">
            <div class="msg-avatar">🤖</div>
            <div class="msg bot">
              Namaste! 👋 Main <b>CarBot</b> hu — VS Services ka AI assistant.
              <br><br>Apni car ke baare me kuch bhi pucho:
              <br>🔧 Service & maintenance
              <br>🛢 Oil, brake, AC, battery
              <br>💰 Cost estimates
              <br>📅 Booking help
              <br>🎟 Offers & coupons
              <br><br>Chalo, kya help chahiye?
            </div>
          </div>` :
          msgs.map(m => `
            <div class="msg-row ${m.role === 'user' ? 'user-row' : ''}">
              <div class="msg-avatar">${m.role === 'user' ? (initials(STATE.user?.name || 'U')) : '🤖'}</div>
              <div>
                <div class="msg ${m.role === 'user' ? 'user' : 'bot'}">${escapeHtml(m.content).replace(/\n/g, '<br>')}</div>
                ${m.source && m.role === 'assistant' ? `<div class="bot-source">${m.source === 'gemini' ? '✨ AI' : m.source === 'local' ? '📚 KB' : 'Reply'}</div>` : ''}
              </div>
            </div>`).join('')
        }
        ${STATE.chatTyping ? `<div class="msg-row"><div class="msg-avatar">🤖</div><div class="typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div></div>` : ''}
      </div>
      <div class="chat-suggestions">
        ${suggestions.map(s => `<button class="chat-sugg" onclick="sendChatMessage('${s.replace(/'/g, "\\'")}', true)">${s}</button>`).join('')}
      </div>
      <div class="chat-input-bar">
        <textarea id="chatInput" placeholder="Apni car ke baare me kuch pucho..." rows="1" onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault();sendChatMessage()}" oninput="autoResize(this)"></textarea>
        <button class="chat-send" onclick="sendChatMessage()">➤</button>
      </div>
    </div>`;
  },

  // ===== Customer Support Chat (admin <-> customer) =====
  supportChat: () => {
    const msgs = STATE.supportMessages || [];
    return `<div class="chat-screen">
      <div class="chat-head support">
        <div class="back" onclick="navBack() || nav('home')">←</div>
        <div class="ch-avatar">💬</div>
        <div class="ch-info">
          <div class="ch-name">VS Support Team</div>
          <div class="ch-status">Usually replies within 1 hour</div>
        </div>
      </div>
      <div class="chat-body" id="supportBody">
        ${msgs.length === 0 ? `
          <div class="msg-row">
            <div class="msg-avatar">💬</div>
            <div class="msg bot">
              Namaste! 👋 Hum VS Services ka support team hain.<br><br>
              Booking-related koi issue, doubt, ya feedback ho — yahan message karo. Voice note bhi bhej sakte ho 🎤
            </div>
          </div>` :
          msgs.map(m => `
            <div class="msg-row ${m.fromRole === 'customer' ? 'user-row' : ''}">
              <div class="msg-avatar">${m.fromRole === 'customer' ? initials(STATE.user?.name || 'U') : '💬'}</div>
              <div>
                ${m.text ? `<div class="msg ${m.fromRole === 'customer' ? 'user' : 'bot'}">${escapeHtml(m.text).replace(/\n/g,'<br>')}</div>` : ''}
                ${m.voiceData ? voiceBubble(m.voiceData, m.voiceDuration, m._id || 'v' + Math.random()) : ''}
                <div class="bot-source">${new Date(m.createdAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
              </div>
            </div>`).join('')
        }
      </div>
      <div class="chat-input-bar">
        <textarea id="supportInput" placeholder="Type message..." rows="1" onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault();sendSupportMsg()}" oninput="autoResize(this)"></textarea>
        <button class="chat-send" id="supportRecBtn" onclick="toggleVoiceRec('support')" style="background:linear-gradient(135deg,#FF4D6D,#FF8E53)">🎤</button>
        <button class="chat-send" onclick="sendSupportMsg()">➤</button>
      </div>
    </div>`;
  },

  // ===== NEW ENGAGEMENT SCREENS =====

  leaderboard: () => {
    const lb = STATE.leaderboard || [];
    const my = STATE.myRank;
    return `
      ${topbar('Top Referrers', { screen: 'profile' })}
      <div class="screen">
        ${my ? `<div class="card" style="background:linear-gradient(135deg,var(--navy),var(--navy2));color:#fff;text-align:center">
          <div style="font-size:11px;opacity:.75;letter-spacing:1px">YOUR RANK</div>
          <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:36px;font-weight:800;margin:6px 0">#${my.rank}</div>
          <div style="opacity:.85;font-size:13px">${my.referrals} referrals · ${my.services} services</div>
          <span class="tier-badge tier-${my.tier}" style="margin-top:8px">${TIER_META[my.tier]?.icon} ${TIER_META[my.tier]?.label}</span>
        </div>` : ''}
        <div class="section">🏆 Top 20</div>
        ${lb.length ? lb.map(u => `
          <div class="lb-row ${my && my.rank === u.rank ? 'me' : ''}">
            <div class="lb-rank ${u.rank === 1 ? 'gold' : u.rank === 2 ? 'silver' : u.rank === 3 ? 'bronze' : ''}">${u.rank <= 3 ? (['🥇','🥈','🥉'][u.rank-1]) : u.rank}</div>
            <div class="lb-info">
              <div class="lb-name">${u.name}</div>
              <div class="lb-stat">${TIER_META[u.tier]?.icon} ${u.services} services</div>
            </div>
            <div class="lb-points">${u.referrals}<span style="font-size:10px;color:var(--l);font-weight:600;margin-left:2px">refs</span></div>
          </div>`).join('') : `<div class="empty-pro"><div class="ep-icon">🏆</div><div class="ep-title">No referrals yet</div><div class="ep-msg">Be the first! Share your referral code and earn ₹100 per friend.</div><button class="ep-cta" onclick="nav('refer')">Share My Code</button></div>`}
      </div>
      ${tabbar('profile')}`;
  },

  gallery: () => {
    const completed = STATE.bookings.filter(b => b.status === 'completed' && (b.gallery?.length || b.beforeAfterGallery?.length));
    const allPics = completed.flatMap(b =>
      [...(b.beforeAfterGallery || []), ...(b.gallery || [])].map(url => ({ url, bookingId: b.bookingId, date: b.bookingDate }))
    );
    return `
      ${topbar('Service Gallery', { screen: 'profile' })}
      <div class="screen">
        ${allPics.length ? `
          <div class="card">
            <div style="font-size:13px;color:var(--l);margin-bottom:8px">${allPics.length} photo${allPics.length === 1 ? '' : 's'} from ${completed.length} service${completed.length === 1 ? '' : 's'}</div>
          </div>
          <div class="gallery-grid">
            ${allPics.map((p, i) => `<div class="gallery-item" onclick="viewGalleryPic(${i})"><img class="lazy" data-src="${p.url}" alt=""></div>`).join('')}
          </div>` :
          `<div class="empty-pro"><div class="ep-icon">📸</div><div class="ep-title">No service photos yet</div><div class="ep-msg">Service complete hone par before/after photos yahan dikhenge.</div><button class="ep-cta" onclick="nav('booking')">Book a Service</button></div>`}
      </div>
      ${tabbar('profile')}`;
  }
};

let _galleryUrls = [];
function viewGalleryPic(idx) {
  const completed = STATE.bookings.filter(b => b.status === 'completed' && (b.gallery?.length || b.beforeAfterGallery?.length));
  _galleryUrls = completed.flatMap(b => [...(b.beforeAfterGallery || []), ...(b.gallery || [])].map(u => u));
  const ov = document.createElement('div');
  ov.className = 'gallery-overlay';
  ov.onclick = (e) => { if (e.target === ov) ov.remove(); };
  ov.innerHTML = `
    <button class="go-close" onclick="this.parentElement.remove()">×</button>
    <img src="${_galleryUrls[idx]}">
    <div style="color:#fff;margin-top:14px;font-size:13px">${idx + 1} / ${_galleryUrls.length}</div>`;
  document.body.appendChild(ov);
  haptic('light');
}

function rateDriverModal(bookingId) {
  bottomSheet('Rate your driver',
    `<div style="text-align:center;color:var(--l);font-size:13px;margin-bottom:6px">Aapka pickup/drop kaisa raha?</div>
    <div class="star-rating" id="starRating">
      ${[1,2,3,4,5].map(i => `<span class="star" data-rating="${i}" onclick="setRating(${i})">★</span>`).join('')}
    </div>
    <textarea id="rateComment" placeholder="Comments (optional)" style="width:100%;padding:12px;border:1px solid var(--b);border-radius:10px;font-size:13px;min-height:60px;margin-bottom:12px"></textarea>
    <button class="btn btn-gradient" onclick="submitRating('${bookingId}')">Submit Rating</button>`);
  STATE._currentRating = 0;
}

function setRating(r) {
  STATE._currentRating = r;
  document.querySelectorAll('#starRating .star').forEach((s, i) => {
    s.classList.toggle('active', i < r);
  });
  haptic('light');
}

async function submitRating(bookingId) {
  if (!STATE._currentRating) return toast('Please select stars', 'warn');
  const comment = document.getElementById('rateComment').value.trim();
  const r = await api('/users/rate-driver', 'POST', { bookingId, rating: STATE._currentRating, comment });
  if (r.success) {
    toast(r.message || 'Thanks for rating!', 'success');
    closeBottomSheet();
  } else {
    toast(r.message || 'Failed', 'error');
  }
}

function render() {
  app.innerHTML = (screens[STATE.current] || screens.splash)();
  applyUiTextOverrides(app);
  // Initialize map for branches screen
  if (STATE.current === 'branches') {
    setTimeout(() => initBranchMap(), 100);
  }
  // Load support messages on enter
  if (STATE.current === 'supportChat' && STATE.token && !STATE._supportLoaded) {
    STATE._supportLoaded = true;
    loadSupportMessages();
    startSupportPolling();
  } else if (STATE.current !== 'supportChat') {
    STATE._supportLoaded = false;
  }
  // Lazy load images
  setupLazyImages();
  // Bot FAB on main screens (not on chatbot itself, login, splash)
  const showBot = flag('showChatbot') && ['home', 'accessories', 'bookings', 'profile', 'orders', 'wishlist', 'support', 'leaderboard', 'gallery', 'offers'].includes(STATE.current);
  if (showBot && !document.getElementById('botFab')) {
    const fab = document.createElement('button');
    fab.id = 'botFab';
    fab.className = 'bot-fab';
    fab.innerHTML = '🤖';
    fab.title = 'CarBot AI Assistant';
    fab.onclick = () => nav('chatbot');
    document.body.appendChild(fab);
  } else if (!showBot) {
    document.getElementById('botFab')?.remove();
  }
  // Auto-scroll chat
  if (STATE.current === 'chatbot') scrollChatBottom();
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

  // Daily tip
  try {
    const tip = await api('/support/tip-of-day', 'GET', null, { silent: true });
    if (tip.success) STATE.tipOfDay = tip.tip;
  } catch (e) {}

  // Remote feature flags + config values (admin can toggle from admin app)
  await refreshAppConfig({ force: true });

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
    // Touch streak (silent) — once per session
    const lastStreak = sessionStorage.getItem('streakTouched');
    const today = new Date().toDateString();
    if (flag('showStreak') && lastStreak !== today) {
      api('/users/streak', 'POST', null, { silent: true }).then(s => {
        if (s.success) {
          if (s.bonus) toast(`🔥 ${s.streakDays}-day streak! +${s.bonus} bonus points!`, 'success');
          sessionStorage.setItem('streakTouched', today);
        }
      });
    }
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
  if (name.length < 2) return toast('Please enter name');
  if (mobile && !/^\d{10}$/.test(mobile)) return toast('Enter valid 10-digit mobile');
  const response = await api('/auth/register-guest', 'POST', { name, mobile });
  if (!response.success) return toast(response.message || 'Login failed');
  STATE.token = response.token;
  STATE.user = response.user;
  save();
  await loadInitData();
  // Start push polling after login
  requestMobileNotifPermission().then(g => { if (g) startMobilePushPolling(); });
  nav('home');
}

function loadGoogleIdentityScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve();
    const existing = document.querySelector('script[data-google-identity]');
    if (existing) {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = 'true';
    script.onload = resolve;
    script.onerror = () => reject(new Error('Google login script failed to load'));
    document.head.appendChild(script);
  });
}

let nativeGoogleInitializedFor = '';

function isNativeCapacitorApp() {
  const cap = window.Capacitor;
  return !!cap && (cap.isNativePlatform?.() || cap.getPlatform?.() === 'android' || cap.getPlatform?.() === 'ios');
}

async function tryNativeGoogleLogin(clientId) {
  const SocialLogin = window.Capacitor?.Plugins?.SocialLogin;
  if (!isNativeCapacitorApp() || !SocialLogin?.initialize || !SocialLogin?.login) return false;

  if (nativeGoogleInitializedFor !== clientId) {
    await SocialLogin.initialize({
      google: {
        webClientId: clientId,
        mode: 'online'
      }
    });
    nativeGoogleInitializedFor = clientId;
  }

  const login = await SocialLogin.login({
    provider: 'google',
    options: { scopes: ['email', 'profile'] }
  });
  const idToken =
    login?.result?.idToken ||
    login?.idToken ||
    login?.result?.authentication?.idToken ||
    login?.authentication?.idToken;

  if (!idToken) {
    throw new Error('Google ID token nahi mila. Google Console me Android OAuth SHA-1 setup check karo.');
  }
  await handleGoogleCredential({ credential: idToken });
  return true;
}

async function googleLogin() {
  const clientId = cfgVal('googleClientId', '').trim();
  if (!clientId) {
    return toast('Google Client ID admin App Settings me add karo');
  }
  try {
    const handledByNative = await tryNativeGoogleLogin(clientId);
    if (handledByNative) return;

    await loadGoogleIdentityScript();
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCredential,
      auto_select: false,
      cancel_on_tap_outside: true
    });
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.()) {
        toast('Google sign-in popup blocked. Try again.');
      }
    });
  } catch (err) {
    toast(err.message || 'Google login unavailable');
  }
}

async function handleGoogleCredential(response) {
  if (!response?.credential) return toast('Google login cancelled');
  const result = await api('/auth/google-login', 'POST', { idToken: response.credential });
  if (!result.success) return toast(result.message || 'Google login failed');
  STATE.token = result.token;
  STATE.user = result.user;
  save();
  await loadInitData();
  toast(result.needsMobile ? 'Google login done. Booking ke liye mobile number add karein.' : 'Google login successful');
  requestMobileNotifPermission().then(g => { if (g) startMobilePushPolling(); });
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
    mobile: $('pMobile')?.value || STATE.user?.mobile,
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
  normalizeConfigState();
  STATE.bookingForm.couponCode = flag('showCouponInput') ? ($('couponCode')?.value || '') : '';
  STATE.bookingForm.partsEstimate = flag('showPartsRequest') ? ($('partsEstimate')?.value || 0) : 0;
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

async function ensureBookingMobile() {
  if (/^\d{10}$/.test(String(STATE.user?.mobile || ''))) return true;
  return new Promise((resolve) => {
    const wrap = document.createElement('div');
    wrap.className = 'modal-bg';
    wrap.style.cssText = 'position:fixed;inset:0;background:rgba(10,25,51,.6);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:9999';
    wrap.innerHTML = `<div style="background:#fff;padding:24px;border-radius:16px;width:88%;max-width:340px">
      <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:#0A1933;margin-bottom:6px">Mobile Number Required</h3>
      <p style="font-size:13px;color:#6B7A92;margin-bottom:14px">Booking confirm karne ke liye 10-digit mobile number zaroori hai.</p>
      <input id="bmMobile" placeholder="10-digit Mobile" maxlength="10" inputmode="numeric" value="${STATE.user?.mobile || ''}" style="width:100%;padding:11px;border:1.5px solid #E2E8F0;border-radius:10px;margin-bottom:14px;font-size:14px">
      <button id="bmSave" style="width:100%;padding:12px;background:linear-gradient(135deg,#2D8FE6,#1B6FC2);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer">Save & Continue</button>
      <button id="bmCancel" style="width:100%;padding:8px;margin-top:8px;background:none;color:#6B7A92;border:none;font-size:12px;cursor:pointer">Cancel</button>
    </div>`;
    document.body.appendChild(wrap);
    wrap.querySelector('#bmCancel').onclick = () => { wrap.remove(); resolve(false); };
    wrap.querySelector('#bmSave').onclick = async () => {
      const mobile = wrap.querySelector('#bmMobile').value.trim();
      if (!/^\d{10}$/.test(mobile)) return toast('Enter valid 10-digit mobile');
      const response = await api('/users/me', 'PUT', { mobile }, { silent: true });
      if (!response.success) return toast(response.message || 'Mobile save failed');
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
  const hasMobile = await ensureBookingMobile();
  if (!hasMobile) return;
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
    couponCode: flag('showCouponInput') ? ($('couponCode')?.value || '') : '',
    partsEstimate: flag('showPartsRequest') ? ($('partsEstimate')?.value || 0) : 0,
    sparePartsRequest: flag('showPartsRequest') ? ($('sparePartsRequest')?.value || '') : '',
    inspectionPhotos: flag('showInspectionPhotos') ? ($('inspectionPhotos')?.value || '') : ''
  };
  normalizeConfigState();

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
    paymentMode: flag('showOnlinePayment') ? (STATE.bookingForm.pay || 'pay_on_service') : 'pay_on_service',
    couponCode: flag('showCouponInput') ? STATE.bookingForm.couponCode : undefined,
    partsEstimate: flag('showPartsRequest') ? Number(STATE.bookingForm.partsEstimate || 0) : 0,
    sparePartsRequest: flag('showPartsRequest') ? STATE.bookingForm.sparePartsRequest : undefined,
    inspectionPhotos: flag('showInspectionPhotos') ? (STATE.bookingForm.inspectionPhotos || '').split(',').map(x => x.trim()).filter(Boolean) : []
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
  return startOnlinePayment({ bookingId, amount, successScreen: 'bookings' });
}

async function startOnlinePayment({ bookingId, orderId, amount, successScreen = 'bookings' }) {
  if (!STATE.token) {
    const ok = await ensureLoggedIn();
    if (!ok) return false;
  }
  if (!Number(amount || 0)) {
    toast('Online payment ke liye amount enter karein', 'warn');
    return false;
  }
  showLoader('Opening Razorpay...');
  const response = await api('/payments/create-order', 'POST', { bookingId, orderId }, { silent: true });
  hideLoader();
  if (!response.success) return toast(response.message || 'Payment init failed', 'error');

  if (response.isMock || !window.Razorpay) {
    const verify = await api('/payments/verify', 'POST', {
      razorpayOrderId: response.razorpayOrderId,
      razorpayPaymentId: 'mock_payment_' + Date.now(),
      razorpaySignature: 'mock_signature',
      paymentId: response.paymentId
    });
    if (!verify.success) return toast(verify.message || 'Payment failed', 'error');
    await loadInitData();
    toast(response.isMock ? 'Demo payment successful' : 'Payment successful', 'success');
    nav(successScreen);
    return true;
  }

  const user = STATE.user || {};
  return new Promise((resolve) => {
    const checkout = new Razorpay({
      key: response.key,
      amount: response.amount,
      currency: response.currency || 'INR',
      name: 'VS SERVICES',
      description: orderId ? 'Accessory order payment' : 'Service booking payment',
      order_id: response.razorpayOrderId,
      prefill: { name: user.name || '', email: user.email || '', contact: user.mobile || '' },
      theme: { color: '#2D8FE6' },
      handler: async (rp) => {
        showLoader('Verifying payment...');
        const verify = await api('/payments/verify', 'POST', {
          razorpayOrderId: rp.razorpay_order_id,
          razorpayPaymentId: rp.razorpay_payment_id,
          razorpaySignature: rp.razorpay_signature,
          paymentId: response.paymentId
        }, { silent: true });
        hideLoader();
        if (!verify.success) {
          toast(verify.message || 'Payment verification failed', 'error');
          resolve(false);
          return;
        }
        await loadInitData();
        toast('Payment successful', 'success');
        nav(successScreen);
        resolve(true);
      },
      modal: {
        ondismiss: () => {
          toast('Payment cancelled', 'warn');
          resolve(false);
        }
      }
    });
    checkout.on('payment.failed', (err) => {
      toast(err?.error?.description || 'Payment failed', 'error');
      resolve(false);
    });
    checkout.open();
  });
}

async function legacyMockPayNow(bookingId, amount) {
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
  else STATE.cart.push({ productId: id, name: product.name, price: 0, quantity: 1, image: (product.images || [])[0] || fallbackProductImage(product) || '' });
  save();
  const btn = document.getElementById(`addCartBtn-${id}`);
  if (btn) {
    btn.textContent = 'Added to Cart';
    btn.classList.add('btn-gradient');
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled = false;
      render();
    }, 650);
  } else {
    toast('Added to cart', 'success');
  }
}

function removeCart(id) {
  STATE.cart = STATE.cart.filter(item => item.productId !== id);
  save();
  render();
}

function changeQty(id, delta) {
  const item = STATE.cart.find(i => i.productId === id);
  if (!item) return;
  item.quantity = Math.max(0, (item.quantity || 1) + delta);
  if (item.quantity === 0) STATE.cart = STATE.cart.filter(i => i.productId !== id);
  save();
  render();
}

async function placeOrder() {
  if (!flag('showOnlinePayment') && STATE.payMode === 'online') STATE.payMode = 'cod';
  if (!STATE.token) {
    const ok = await ensureLoggedIn();
    if (!ok) return;
  }
  const manualAmount = Number($('manualOrderAmount')?.value || 0) || 0;
  if (STATE.payMode === 'online' && manualAmount <= 0) {
    toast('Online payment ke liye shop se confirmed amount enter karein', 'warn');
    return;
  }
  const shippingAddress = {
    line1: $('addr').value,
    city: $('city').value,
    pincode: $('pin').value
  };
  if (STATE.cartLocation) {
    shippingAddress.location = {
      lat: STATE.cartLocation.lat,
      lng: STATE.cartLocation.lng,
      address: STATE.cartLocation.address
    };
  }
  const response = await api('/orders', 'POST', {
    items: STATE.cart.map(item => ({ productId: item.productId, quantity: item.quantity })),
    shippingAddress,
    paymentMode: STATE.payMode === 'online' ? 'online' : 'cod',
    manualAmount: manualAmount || undefined
  });
  if (!response.success) return toast(response.message || 'Order failed');
  const createdOrder = response.order;
  STATE.cart = [];
  STATE.cartLocation = null;
  save();
  if (createdOrder) {
    STATE.orders = [createdOrder, ...(STATE.orders || []).filter(o => o._id !== createdOrder._id)];
  }
  toast('Order placed', 'success');
  if (STATE.payMode === 'online') {
    await startOnlinePayment({ orderId: createdOrder._id, amount: createdOrder.totalAmount, successScreen: 'orders' });
    return;
  }
  await loadInitData();
  nav('orders');
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

// ========== Push Notifications (Local, Free) ==========
const _LN = window.Capacitor?.Plugins?.LocalNotifications;
let _notifPoller = null;
let _lastNotifId = localStorage.getItem('lastNotifId') || '';

async function requestMobileNotifPermission() {
  if (_LN) {
    try { const p = await _LN.requestPermissions(); return p.display === 'granted'; } catch(e){}
  }
  if ('Notification' in window) {
    if (Notification.permission === 'default') return (await Notification.requestPermission()) === 'granted';
    return Notification.permission === 'granted';
  }
  return false;
}

function fireMobileNotif(title, body, link) {
  if (_LN) {
    try {
      _LN.schedule({
        notifications: [{
          id: Date.now() % 2147483647,
          title, body,
          smallIcon: 'ic_launcher',
          extra: { link },
          schedule: { at: new Date(Date.now() + 100) }
        }]
      });
    } catch(e){}
  } else if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body });
  }
  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
}

async function pollMobileNotifications() {
  if (!STATE.token) return;
  try {
    const r = await api('/notifications', 'GET', null, { silent: true });
    if (!r.success) return;
    const all = r.notifications || [];
    STATE.notifications = all;
    STATE.notifUnread = r.unread || 0;

    // Find notifications newer than last seen
    const newOnes = all.filter(n => !n.isRead && (!_lastNotifId || n._id > _lastNotifId));
    if (newOnes.length && _lastNotifId) {
      const n = newOnes[0];
      fireMobileNotif(n.title, n.body, n.link);
    }
    if (all.length) _lastNotifId = all[0]._id;
    localStorage.setItem('lastNotifId', _lastNotifId);

    // Update only the bell badge in topbar without full re-render (avoids screen flicker)
    updateBellBadge();
  } catch(e){}
}

function updateBellBadge() {
  const dot = document.querySelector('.tb-icon-btn .tb-dot');
  const btn = document.querySelector('.tb-icon-btn');
  if (!btn) return;
  const count = STATE.notifUnread || 0;
  if (count > 0) {
    if (dot) {
      dot.textContent = count > 9 ? '9+' : count;
    } else {
      const span = document.createElement('span');
      span.className = 'tb-dot';
      span.textContent = count > 9 ? '9+' : count;
      btn.appendChild(span);
    }
  } else if (dot) {
    dot.remove();
  }
}

function startMobilePushPolling() {
  if (_notifPoller) clearInterval(_notifPoller);
  setTimeout(pollMobileNotifications, 2000);
  _notifPoller = setInterval(pollMobileNotifications, 30000);
}

if (_LN) {
  _LN.addListener('localNotificationActionPerformed', (event) => {
    const link = event.notification?.extra?.link;
    if (link === 'offers') nav('offers');
    else if (link?.startsWith('booking:')) nav('bookings');
    else nav('notifications');
  });
}

// ========== AI Chatbot ==========
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(100, el.scrollHeight) + 'px';
}

function clearChat() {
  if (!confirm('Clear chat history?')) return;
  STATE.chatMessages = [];
  localStorage.setItem('chatMessages', '[]');
  render();
}

async function sendChatMessage(text, isSugg) {
  let msg = text;
  if (!msg) {
    const input = document.getElementById('chatInput');
    if (!input) return;
    msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    input.style.height = 'auto';
  }

  STATE.chatMessages.push({ role: 'user', content: msg });
  STATE.chatTyping = true;
  render();
  scrollChatBottom();

  try {
    const history = STATE.chatMessages.slice(-7, -1).map(m => ({ role: m.role, content: m.content }));
    const r = await api('/chatbot', 'POST', { message: msg, history }, { silent: true });
    STATE.chatTyping = false;
    if (r.success && r.reply) {
      STATE.chatMessages.push({ role: 'assistant', content: r.reply, source: r.source });
    } else {
      STATE.chatMessages.push({ role: 'assistant', content: 'Sorry, kuch error aaya. Phir try karo.', source: 'error' });
    }
  } catch (e) {
    STATE.chatTyping = false;
    STATE.chatMessages.push({ role: 'assistant', content: 'Network error. Internet check karo.', source: 'error' });
  }

  // Keep only last 50 messages
  if (STATE.chatMessages.length > 50) STATE.chatMessages = STATE.chatMessages.slice(-50);
  localStorage.setItem('chatMessages', JSON.stringify(STATE.chatMessages));
  render();
  scrollChatBottom();
}

function scrollChatBottom() {
  setTimeout(() => {
    const body = document.getElementById('chatBody');
    if (body) body.scrollTop = body.scrollHeight;
  }, 50);
}

async function loadChatSuggestions() {
  try {
    const r = await api('/chatbot/suggestions', 'GET', null, { silent: true });
    if (r.success) STATE.chatSuggestions = r.suggestions || [];
  } catch (e) {}
}

// ===== Leaderboard =====
async function openLeaderboard() {
  if (!flag('showLeaderboard')) return nav('profile');
  if (!STATE.token) return toast('Login first to see your rank', 'warn');
  nav('leaderboard');
  const r = await api('/users/leaderboard', 'GET', null, { silent: true });
  if (r.success) {
    STATE.leaderboard = r.leaderboard || [];
    STATE.myRank = r.myRank;
    render();
  }
}

// ===== Set birthday =====
function setBirthday() {
  if (!STATE.token) return toast('Login first to set birthday', 'warn');
  const today = new Date().toISOString().slice(0, 10);
  bottomSheet('Set Your Birthday',
    `<div style="color:var(--l);font-size:13px;margin-bottom:12px">Birthday me 20% discount + ₹100 wallet bonus milega.</div>
    <input type="date" id="bdayInput" value="${STATE.user?.birthday ? STATE.user.birthday.slice(0,10) : ''}" max="${today}" style="width:100%;padding:12px;border:1.5px solid var(--b);border-radius:10px;margin-bottom:12px">
    <button class="btn btn-gradient" onclick="saveBirthday()">Save</button>`);
}

async function saveBirthday() {
  const val = document.getElementById('bdayInput').value;
  if (!val) return toast('Pick a date', 'warn');
  const r = await api('/users/birthday', 'POST', { birthday: val });
  if (r.success) {
    STATE.user.birthday = r.birthday;
    save();
    closeBottomSheet();
    toast('🎂 Birthday saved! Get ready for discount on your special day', 'success');
    render();
  }
}

// ===== Share booking via WhatsApp / Native =====
async function shareBooking(bookingId) {
  const b = STATE.bookings.find(x => x._id === bookingId);
  if (!b) return;
  const text = `My VS Services car booking confirmed!\n\n` +
    `🆔 ${b.bookingId}\n` +
    `🔧 ${b.serviceId?.name || 'Service'}\n` +
    `🚗 ${b.car?.carNumber || ''}\n` +
    `📅 ${new Date(b.bookingDate).toDateString()} ${b.timeSlot || ''}\n` +
    `💰 ₹${b.totalAmount}\n\n` +
    `Track at https://vs-services-api.onrender.com`;
  const ok = await nativeShare('VS Services Booking', text);
  if (!ok) {
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  }
  haptic('light');
}

// ===== Voice recording (MediaRecorder) =====
let _mediaRec = null;
let _recChunks = [];
let _recStart = 0;
let _recContext = null; // 'support' or 'booking:<id>'

function voiceBubble(dataUrl, dur, id) {
  const seconds = Math.round(dur || 0);
  const bars = 12;
  return `<div class="voice-bubble">
    <button class="vb-play" onclick="playVoice('${id}', this)">▶</button>
    <div class="vb-bars">${[...Array(bars)].map((_,i) => `<div class="vb-bar" style="height:${8 + Math.sin(i)*8 + Math.random()*8}px"></div>`).join('')}</div>
    <span class="vb-dur">${seconds}s</span>
    <audio id="${id}" src="${dataUrl}" preload="metadata" style="display:none"></audio>
  </div>`;
}

function playVoice(id, btn) {
  const audio = document.getElementById(id);
  if (!audio) return;
  if (audio.paused) {
    document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
    document.querySelectorAll('.vb-play').forEach(b => b.textContent = '▶');
    audio.play();
    btn.textContent = '⏸';
    audio.onended = () => btn.textContent = '▶';
  } else {
    audio.pause();
    btn.textContent = '▶';
  }
}

async function toggleVoiceRec(context, bookingId) {
  if (_mediaRec && _mediaRec.state === 'recording') {
    _mediaRec.stop();
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    _recChunks = [];
    _mediaRec = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm' });
    _recContext = context === 'booking' ? 'booking:' + bookingId : 'support';
    _recStart = Date.now();
    _mediaRec.ondataavailable = (e) => { if (e.data.size > 0) _recChunks.push(e.data); };
    _mediaRec.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      const blob = new Blob(_recChunks, { type: 'audio/webm' });
      const duration = (Date.now() - _recStart) / 1000;
      if (duration < 1) return toast('Too short', 'warn');
      if (blob.size > 250000) return toast('Too long (max ~30s)', 'warn');
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result;
        if (_recContext === 'support') {
          const r = await api('/chat/my', 'POST', { voiceData: dataUrl, voiceDuration: duration });
          if (r.success) { STATE.supportMessages.push(r.message); render(); haptic('success'); }
          else toast(r.message || 'Failed', 'error');
        } else if (_recContext.startsWith('booking:')) {
          const id = _recContext.split(':')[1];
          const r = await api(`/bookings/${id}/voice-note`, 'POST', { voiceData: dataUrl, duration });
          if (r.success) { toast('Voice note attached', 'success'); haptic('success'); render(); }
          else toast(r.message || 'Failed', 'error');
        }
      };
      reader.readAsDataURL(blob);
      const btn = document.getElementById('supportRecBtn') || document.getElementById('bookingRecBtn');
      if (btn) btn.classList.remove('recording');
    };
    _mediaRec.start();
    haptic('medium');
    const btn = document.getElementById('supportRecBtn') || document.getElementById('bookingRecBtn');
    if (btn) btn.classList.add('recording');
    toast('🔴 Recording... tap again to stop (max 30s)', 'info');
    // Auto-stop at 30s
    setTimeout(() => { if (_mediaRec && _mediaRec.state === 'recording') _mediaRec.stop(); }, 30000);
  } catch (e) {
    toast('Mic permission denied', 'error');
  }
}

// ===== Support chat =====
async function loadSupportMessages() {
  const r = await api('/chat/my', 'GET', null, { silent: true });
  if (r.success) {
    STATE.supportMessages = r.messages || [];
    render();
    setTimeout(() => { const el = document.getElementById('supportBody'); if (el) el.scrollTop = el.scrollHeight; }, 50);
  }
}

async function sendSupportMsg() {
  const input = document.getElementById('supportInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  input.style.height = 'auto';
  const r = await api('/chat/my', 'POST', { text }, { silent: true });
  if (r.success) {
    STATE.supportMessages.push(r.message);
    render();
    setTimeout(() => { const el = document.getElementById('supportBody'); if (el) el.scrollTop = el.scrollHeight; }, 50);
  } else toast('Failed to send', 'error');
}

// Poll for new support messages every 15s while on support screen
let _supportPoller;
function startSupportPolling() {
  if (_supportPoller) clearInterval(_supportPoller);
  _supportPoller = setInterval(async () => {
    if (STATE.current !== 'supportChat' || !STATE.token) return;
    const last = STATE.supportMessages[STATE.supportMessages.length - 1];
    const since = last ? new Date(last.createdAt).getTime() : 0;
    const r = await api(`/chat/my?since=${since}`, 'GET', null, { silent: true });
    if (r.success && r.messages?.length) {
      STATE.supportMessages.push(...r.messages);
      render();
      setTimeout(() => { const el = document.getElementById('supportBody'); if (el) el.scrollTop = el.scrollHeight; }, 50);
      haptic('notify');
    }
  }, 15000);
}

// ===== Smart "Book Again" =====
function bookAgain(bookingId) {
  const b = STATE.bookings.find(x => x._id === bookingId);
  if (!b) return;
  STATE.bookingForm = {
    serviceId: b.serviceId?._id || b.serviceId,
    brand: b.car?.brand,
    model: b.car?.model,
    carNumber: b.car?.carNumber,
    fuelType: b.car?.fuelType,
    year: b.car?.year,
    rcNumber: b.car?.rcNumber,
    mode: b.serviceMode || 'at_garage',
    pay: b.paymentMode === 'online' ? 'online' : 'pay_on_service'
  };
  toast('Last booking details loaded', 'success');
  nav('booking');
}

// ========== Map (Leaflet + OpenStreetMap - 100% free) ==========
let _branchMap = null;
let _branchMarkers = [];
let _userMarker = null;
let _pickerMap = null;
let _pickerMarker = null;

function makeVsIcon(emoji = '🔧', isUser = false) {
  if (typeof L === 'undefined') return null;
  return L.divIcon({
    className: 'vs-marker-wrap',
    html: `<div class="vs-marker ${isUser ? 'user' : ''}"><span class="vs-icon">${emoji}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -32]
  });
}

function initBranchMap() {
  if (typeof L === 'undefined') return;
  const el = document.getElementById('branchMap');
  if (!el) return;
  if (_branchMap) { _branchMap.remove(); _branchMap = null; }

  const branches = STATE.support?.branches || [];
  const center = branches.length ? [branches[0].lat, branches[0].lng] : [23.2599, 77.4126];

  _branchMap = L.map('branchMap', { zoomControl: true, attributionControl: true }).setView(center, 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(_branchMap);

  _branchMarkers = branches.map((b, i) => {
    const m = L.marker([b.lat, b.lng], { icon: makeVsIcon('🔧') }).addTo(_branchMap);
    m.bindPopup(`
      <b>${b.name}</b>
      <div class="lp-row">📍 ${b.address}</div>
      <div class="lp-row">⏰ ${b.timings}</div>
      <div class="lp-actions">
        <a class="lp-btn" href="${b.mapUrl}" target="_blank">Directions</a>
        <a class="lp-btn alt" href="tel:${b.phone.replace(/\s+/g, '')}">Call</a>
      </div>`);
    return m;
  });

  if (branches.length > 1) fitBranches();
}

function fitBranches() {
  if (!_branchMap || !_branchMarkers.length) return;
  const grp = L.featureGroup(_branchMarkers);
  _branchMap.fitBounds(grp.getBounds().pad(0.3));
}

function focusBranch(idx) {
  if (!_branchMap) return;
  const b = (STATE.support?.branches || [])[idx];
  if (!b) return;
  _branchMap.setView([b.lat, b.lng], 16, { animate: true });
  _branchMarkers[idx]?.openPopup();
  document.getElementById('branchMap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function locateMe(targetMap) {
  const map = targetMap || _branchMap || _pickerMap;
  if (!map) return;
  if (!navigator.geolocation) return toast('Location not supported');
  toast('Locating...');
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    if (_userMarker) _userMarker.remove();
    _userMarker = L.marker([latitude, longitude], { icon: makeVsIcon('👤', true) })
      .addTo(map).bindPopup('You are here').openPopup();
    map.setView([latitude, longitude], 14, { animate: true });
    // distance to nearest branch (Haversine)
    const branches = STATE.support?.branches || [];
    if (branches.length) {
      const distances = branches.map(b => ({ b, d: haversine(latitude, longitude, b.lat, b.lng) }));
      distances.sort((a, b) => a.d - b.d);
      const nearest = distances[0];
      const distEl = document.getElementById('branchDistance');
      if (distEl) {
        distEl.innerHTML = `<div class="dist-card">
          <div class="di-icon">🚗</div>
          <div class="di-text">
            <b>${nearest.d.toFixed(1)} km away</b>
            Nearest: ${nearest.b.name}
          </div>
          <a class="btn btn-sm" style="text-decoration:none" href="https://www.google.com/maps/dir/${latitude},${longitude}/${nearest.b.lat},${nearest.b.lng}" target="_blank">Directions</a>
        </div>`;
      }
    }
    // For picker
    if (targetMap && _pickerMarker) {
      _pickerMarker.setLatLng([latitude, longitude]);
      reverseGeocode(latitude, longitude);
    }
  }, (err) => {
    toast('Location error: ' + (err.message || 'denied'));
  }, { enableHighAccuracy: true, timeout: 10000 });
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ========== Address Picker (booking flow) ==========
function openMapPicker(target = 'booking') {
  STATE._mapPickTarget = target;
  const wrap = document.createElement('div');
  wrap.id = 'mapPickerWrap';
  wrap.style.cssText = 'position:fixed;inset:0;background:#fff;z-index:9999;display:flex;flex-direction:column';
  wrap.innerHTML = `
    <div class="topbar">
      <span class="back" onclick="closeMapPicker()">&#8592;</span>
      <span>Select Location</span>
      <span style="flex:1"></span>
    </div>
    <div class="map-search">
      <input id="mapSearch" placeholder="Search address or area..." onkeydown="if(event.key==='Enter')mapSearchGo()">
    </div>
    <div id="pickerMap" style="flex:1;width:100%"></div>
    <div class="map-pin-info">
      <div class="pi-text">
        <div class="pi-addr" id="pickerAddr">Drag map to pick location</div>
        <div class="pi-coords" id="pickerCoords">-</div>
      </div>
      <button class="btn map-btn" onclick="locateMe(_pickerMap)" style="background:var(--p);color:#fff;width:auto;padding:9px 12px">📍 Me</button>
      <button class="btn" style="margin:0;width:auto;padding:9px 14px" onclick="confirmMapPick()">✓ Use</button>
    </div>`;
  document.body.appendChild(wrap);

  if (typeof L === 'undefined') return;
  const start = STATE.pickedLocation || (STATE.support?.branches?.[0] ? [STATE.support.branches[0].lat, STATE.support.branches[0].lng] : [23.2599, 77.4126]);
  _pickerMap = L.map('pickerMap', { zoomControl: true, attributionControl: false }).setView(start, 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM', maxZoom: 19 }).addTo(_pickerMap);
  _pickerMarker = L.marker(start, { draggable: true, icon: makeVsIcon('📍') }).addTo(_pickerMap);
  _pickerMarker.on('dragend', (e) => {
    const ll = e.target.getLatLng();
    reverseGeocode(ll.lat, ll.lng);
  });
  _pickerMap.on('click', (e) => {
    _pickerMarker.setLatLng(e.latlng);
    reverseGeocode(e.latlng.lat, e.latlng.lng);
  });
  reverseGeocode(start[0] || start.lat, start[1] || start.lng);
}

function closeMapPicker() {
  document.getElementById('mapPickerWrap')?.remove();
  if (_pickerMap) { _pickerMap.remove(); _pickerMap = null; }
  _pickerMarker = null;
}

async function reverseGeocode(lat, lng) {
  document.getElementById('pickerCoords').textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  document.getElementById('pickerAddr').textContent = 'Loading address...';
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
      headers: { 'Accept-Language': 'en' }
    });
    const data = await r.json();
    document.getElementById('pickerAddr').textContent = data.display_name || `${lat}, ${lng}`;
    STATE._pendingPick = {
      lat, lng,
      address: data.display_name || '',
      city: data.address?.city || data.address?.town || data.address?.village || '',
      pincode: data.address?.postcode || ''
    };
  } catch (e) {
    document.getElementById('pickerAddr').textContent = `Pinned: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    STATE._pendingPick = { lat, lng, address: '', city: '', pincode: '' };
  }
}

async function mapSearchGo() {
  const q = document.getElementById('mapSearch').value.trim();
  if (!q) return;
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`, {
      headers: { 'Accept-Language': 'en' }
    });
    const arr = await r.json();
    if (arr[0]) {
      const { lat, lon } = arr[0];
      _pickerMap.setView([+lat, +lon], 16);
      _pickerMarker.setLatLng([+lat, +lon]);
      reverseGeocode(+lat, +lon);
    } else toast('Not found');
  } catch (e) { toast('Search failed'); }
}

function confirmMapPick() {
  const p = STATE._pendingPick;
  if (!p) return closeMapPicker();
  STATE.pickedLocation = [p.lat, p.lng];
  if (STATE._mapPickTarget === 'cart') {
    if (document.getElementById('addr')) document.getElementById('addr').value = p.address;
    if (document.getElementById('city')) document.getElementById('city').value = p.city;
    if (document.getElementById('pin')) document.getElementById('pin').value = p.pincode;
    STATE.cartLocation = { lat: p.lat, lng: p.lng, address: p.address };
    const hint = document.getElementById('cartLocationHint');
    if (hint) hint.textContent = p.address ? `Selected: ${p.address}` : `Selected: ${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`;
  } else {
    // Fill into booking form
    if (document.getElementById('bAddr')) document.getElementById('bAddr').value = p.address;
    if (document.getElementById('bCity')) document.getElementById('bCity').value = p.city;
    if (document.getElementById('bPin')) document.getElementById('bPin').value = p.pincode;
    STATE.bookingForm = { ...STATE.bookingForm, addr: p.address, city: p.city, pin: p.pincode };
  }
  closeMapPicker();
  toast('Location set');
}

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
  setInterval(() => refreshAppConfig({ rerender: true }), 15000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshAppConfig({ force: true, rerender: true });
  });
  window.addEventListener('focus', () => refreshAppConfig({ force: true, rerender: true }));
  window.Capacitor?.Plugins?.App?.addListener?.('resume', () => refreshAppConfig({ force: true, rerender: true }));
  // Start push polling — request permission first if logged in
  if (STATE.token) {
    requestMobileNotifPermission().then(granted => {
      if (granted) startMobilePushPolling();
    });
  }
})();

// Also start push when user logs in mid-session
const _origRegisterGuest = window.registerGuest;
// (functions are top-level — we'll wrap them after they're defined if needed)
