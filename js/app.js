// UPWORLD - SHARED DATA & UTILS

const MOCK_FREELANCERS = [
  {id:1,name:"Ahmet Yılmaz",title:"Full-Stack Developer",initials:"AY",rating:4.9,reviewCount:142,hourlyRate:450,location:"İstanbul",level:"Expert",skills:["React","Node.js","PostgreSQL","AWS"],bio:"7+ yıl deneyimli full-stack developer. Her ölçekte proje.",completedJobs:89,successRate:98,responseTime:"2 saat",badges:["Top Rated","Fast Delivery"],online:true},
  {id:2,name:"Selin Kaya",title:"UI/UX Designer",initials:"SK",rating:4.8,reviewCount:97,hourlyRate:350,location:"Ankara",level:"Expert",skills:["Figma","Adobe XD","Prototyping","User Research"],bio:"Kullanıcı odaklı tasarımlar ve marka deneyimleri.",completedJobs:67,successRate:97,responseTime:"1 saat",badges:["Top Rated","Rising Talent"],online:true},
  {id:3,name:"Mehmet Demir",title:"Mobile Developer",initials:"MD",rating:4.7,reviewCount:78,hourlyRate:500,location:"İzmir",level:"Expert",skills:["Flutter","Swift","Kotlin","Firebase"],bio:"iOS ve Android native & cross-platform uzmanı.",completedJobs:54,successRate:96,responseTime:"3 saat",badges:["Verified"],online:false},
  {id:4,name:"Zeynep Arslan",title:"Content & Copywriter",initials:"ZA",rating:4.9,reviewCount:203,hourlyRate:200,location:"Bursa",level:"Expert",skills:["SEO","Blog","Sosyal Medya","Email"],bio:"Dönüştüren içerikler, güçlü stratejiler.",completedJobs:156,successRate:99,responseTime:"30 dk",badges:["Top Rated","Best Seller"],online:true},
  {id:5,name:"Can Öztürk",title:"Data Scientist & ML",initials:"CÖ",rating:4.8,reviewCount:61,hourlyRate:600,location:"İstanbul",level:"Expert",skills:["Python","TensorFlow","NLP","SQL"],bio:"Veriden değer üretiyorum. ML modelleri ve analitik.",completedJobs:43,successRate:97,responseTime:"4 saat",badges:["Verified","Top Rated"],online:true},
  {id:6,name:"Elif Şahin",title:"Graphic Designer",initials:"EŞ",rating:4.6,reviewCount:119,hourlyRate:250,location:"Antalya",level:"Intermediate",skills:["Illustrator","Photoshop","Branding"],bio:"Marka kimlikleri ve görsel iletişim tasarımları.",completedJobs:94,successRate:95,responseTime:"2 saat",badges:["Rising Talent"],online:false}
];

const MOCK_JOBS = [
  {id:1,title:"E-ticaret Web Sitesi Geliştirme",company:"TechRetail A.Ş.",companyInitials:"TR",budget:"15.000 – 25.000 ₺",category:"Web Geliştirme",deadline:"30 gün",skills:["React","Node.js","MongoDB","Stripe"],description:"Mevcut statik sitemizi tam işlevli bir e-ticaret platformuna dönüştürmek istiyoruz.",proposals:12,level:"Expert",postedAt:"2 saat önce",urgent:true,verified:true,employer:"Murat Kaya",employerRating:4.7,totalSpent:"₺85K+"},
  {id:2,title:"Mobil Uygulama UI/UX Tasarımı",company:"StartupHub",companyInitials:"SH",budget:"8.000 – 12.000 ₺",category:"Tasarım",deadline:"15 gün",skills:["Figma","Mobile UI","Prototyping"],description:"Fitness uygulamam için modern arayüz tasarımı. 20+ ekran ve design system.",proposals:8,level:"Intermediate",postedAt:"5 saat önce",urgent:false,verified:true,employer:"Ayşe Demir",employerRating:4.9,totalSpent:"₺32K+"},
  {id:3,title:"İçerik Yazarlığı – Teknoloji Blogu",company:"DigiContent",companyInitials:"DC",budget:"500 ₺/makale",category:"İçerik",deadline:"Sürekli",skills:["SEO","Blog Yazarlığı"],description:"Haftalık 4 makale, SEO uyumlu, 1500-2000 kelime.",proposals:24,level:"Intermediate",postedAt:"1 gün önce",urgent:false,verified:false,employer:"Emre Şahin",employerRating:4.5,totalSpent:"₺15K+"},
  {id:4,title:"Data Analizi & Dashboard",company:"Analytics Pro",companyInitials:"AP",budget:"600 ₺/saat",category:"Veri Bilimi",deadline:"45 gün",skills:["Python","SQL","Power BI"],description:"Satış verisi analizi ve interaktif dashboard.",proposals:6,level:"Expert",postedAt:"3 saat önce",urgent:true,verified:true,employer:"Fatma Kılıç",employerRating:5.0,totalSpent:"₺120K+"},
  {id:5,title:"Logo & Kurumsal Kimlik",company:"NewBrand Co.",companyInitials:"NB",budget:"3.000 – 5.000 ₺",category:"Tasarım",deadline:"10 gün",skills:["Logo","Branding","Illustrator"],description:"Fintech girişimi için logo ve kurumsal kimlik paketi.",proposals:31,level:"Intermediate",postedAt:"6 saat önce",urgent:false,verified:true,employer:"Berk Yıldız",employerRating:4.6,totalSpent:"₺8K+"},
  {id:6,title:"Flutter Mobil Uygulama",company:"AppVentures",companyInitials:"AV",budget:"20.000 – 35.000 ₺",category:"Mobil",deadline:"60 gün",skills:["Flutter","Firebase","REST API"],description:"Online market uygulaması, iOS + Android.",proposals:9,level:"Expert",postedAt:"12 saat önce",urgent:false,verified:true,employer:"Hasan Çelik",employerRating:4.8,totalSpent:"₺67K+"}
];

const CATEGORIES = [
  {emoji:"💻",name:"Web Geliştirme",count:"2.4K"},
  {emoji:"📱",name:"Mobil Uygulama",count:"1.8K"},
  {emoji:"🎨",name:"Tasarım & UI/UX",count:"3.1K"},
  {emoji:"✍️",name:"İçerik & Metin",count:"2.7K"},
  {emoji:"📊",name:"Veri & Analitik",count:"987"},
  {emoji:"🤖",name:"AI & ML",count:"654"},
  {emoji:"📢",name:"Dijital Pazarlama",count:"1.5K"},
  {emoji:"🎬",name:"Video & Animasyon",count:"876"}
];

// ---- AUTH ----
let currentUser = null;
let selectedRole = null;

function loadUser() {
  const s = localStorage.getItem('upworld_user');
  if (s) currentUser = JSON.parse(s);
}

function saveUser(u) {
  currentUser = u;
  localStorage.setItem('upworld_user', JSON.stringify(u));
}

function signOut() {
  currentUser = null;
  localStorage.removeItem('upworld_user');
  localStorage.removeItem('upworld_mode');
  window.location.href = 'index.html';
}

function mockGoogleSignIn(cb) {
  const profiles = [
    {id:"g1", name:"Ahmet Kılıç", email:"ahmet@gmail.com", initials:"AK"},
    {id:"g2", name:"Selin Öz",    email:"selin@gmail.com", initials:"SÖ"},
    {id:"g3", name:"Mert Can",    email:"mert@gmail.com",  initials:"MC"}
  ];
  setTimeout(() => cb(profiles[Math.floor(Math.random() * profiles.length)]), 800);
}

// ---- TOAST ----
function showToast(msg, type) {
  type = type || 'info';
  let c = document.querySelector('.toast-container');
  if (!c) { c = document.createElement('div'); c.className = 'toast-container'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
}

// ---- HELPERS ----
function renderStars(r) {
  let h = '<div class="stars">';
  for (let i = 1; i <= 5; i++) h += '<span class="star' + (i > Math.round(r) ? ' empty' : '') + '">★</span>';
  return h + '</div>';
}

function getAvatarBg(initials) {
  const cols = ['#00C896','#4F46E5','#E83E8C','#FF6B35','#06B6D4','#8B5CF6','#F59E0B','#EF4444'];
  const i = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % cols.length;
  return cols[i];
}

function openModal(id)  { const el = document.getElementById(id); if (el) el.classList.add('active'); }
function closeModal(id) { const el = document.getElementById(id); if (el) el.classList.remove('active'); }
function closeAllModals() { document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active')); }

function switchModal(from, to) { closeModal(from); setTimeout(() => openModal(to), 200); }

document.addEventListener('click',   e => { if (e.target.classList.contains('modal-overlay')) closeAllModals(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });

loadUser();
