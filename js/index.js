// UPWORLD - INDEX PAGE LOGIC

// ---- CATEGORIES ----
function renderCategories() {
  const grid = document.getElementById('catGrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-item" onclick="window.location='freelancer.html?cat=${encodeURIComponent(c.name)}'">
      <span class="cat-emoji">${c.emoji}</span>
      <span class="cat-name">${c.name}</span>
      <span class="cat-count">${c.count} ilan</span>
    </div>
  `).join('');
}

// ---- FEATURED FREELANCERS ----
function renderFeaturedFreelancers() {
  const grid = document.getElementById('featuredFreelancers');
  if (!grid) return;
  grid.innerHTML = MOCK_FREELANCERS.slice(0, 3).map(f => `
    <div class="fl-card" onclick="openFreelancerDetail(${f.id})">
      <div class="fl-card-top">
        <div class="fl-avatar" style="background:${getAvatarBg(f.initials)}">${f.initials}</div>
        <div class="fl-info">
          <div class="fl-name-row">
            <span class="fl-name">${f.name}</span>
            ${f.online ? '<span class="online-dot"></span>' : ''}
          </div>
          <span class="fl-title">${f.title}</span>
          <span class="fl-location">📍 ${f.location}</span>
        </div>
      </div>
      <div class="fl-rating-row">
        ${renderStars(f.rating)}
        <span class="fl-rating-num">${f.rating}</span>
        <span class="fl-review-count">(${f.reviewCount} yorum)</span>
      </div>
      <p class="fl-bio">${f.bio}</p>
      <div class="fl-skills">
        ${f.skills.slice(0,3).map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
      <div class="fl-card-footer">
        <span class="fl-rate"><strong>${f.hourlyRate}₺</strong>/saat</span>
        <div class="fl-badges">
          ${f.badges.map(b => `<span class="fl-badge">${b}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ---- FEATURED JOBS ----
function renderFeaturedJobs() {
  const grid = document.getElementById('featuredJobs');
  if (!grid) return;
  grid.innerHTML = MOCK_JOBS.slice(0, 3).map(j => `
    <div class="job-card" onclick="openJobDetail(${j.id})">
      <div class="job-card-top">
        <div class="company-avatar" style="background:${getAvatarBg(j.companyInitials)}">${j.companyInitials}</div>
        <div class="job-meta">
          <span class="job-company">${j.company}</span>
          <span class="job-time">${j.postedAt}</span>
        </div>
        ${j.urgent ? '<span class="urgent-badge">ACİL</span>' : ''}
      </div>
      <h3 class="job-title">${j.title}</h3>
      <p class="job-desc">${j.description.substring(0,100)}...</p>
      <div class="job-skills">
        ${j.skills.slice(0,3).map(s => `<span class="skill-tag em-skill">${s}</span>`).join('')}
      </div>
      <div class="job-footer">
        <span class="job-budget">💰 ${j.budget}</span>
        <span class="job-proposals">👥 ${j.proposals} teklif</span>
        <span class="job-deadline">⏱ ${j.deadline}</span>
      </div>
    </div>
  `).join('');
}

// ---- HOW IT WORKS ----
const HOW_DATA = {
  fl: [
    {icon:"👤", title:"Profil Oluştur", desc:"Yeteneklerini, deneyimlerini ve portföyünü ekle. Profesyonel bir profil hazırla."},
    {icon:"🔍", title:"İş İlanlarını Bul", desc:"Binlerce iş ilanı arasından sana uygun projeleri filtrele ve keşfet."},
    {icon:"💬", title:"Teklif Ver & Kazan", desc:"Teklif gönder, müşteriyle iletişime geç, projeyi tamamla ve güvenle öde al."}
  ],
  em: [
    {icon:"📋", title:"Görev Yayınla", desc:"Ne istediğini anlat. Bütçeni ve zaman dilimini belirle. 2 dakikada yayınla."},
    {icon:"👥", title:"Teklifleri Karşılaştır", desc:"Gelen teklifleri incele, freelancer profillerini gör, en iyisini seç."},
    {icon:"🚀", title:"Projeni Tamamla", desc:"Güvenli ödeme ile çalışmaya başla. Milestone sistemi ile her adımı kontrol et."}
  ]
};

function renderHowSteps(mode) {
  const steps = HOW_DATA[mode];
  const container = document.getElementById('howSteps');
  if (!container) return;
  container.innerHTML = steps.map((s, i) => `
    <div class="how-step ${mode === 'fl' ? 'fl-step' : 'em-step'}">
      <div class="how-num">${i + 1}</div>
      <div class="how-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>
  `).join('');
}

function switchHow(mode, btn) {
  document.querySelectorAll('.how-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderHowSteps(mode);
}

// ---- SEARCH ----
function doSearch() {
  const q = document.getElementById('heroSearch').value.trim();
  if (q) window.location.href = 'freelancer.html?q=' + encodeURIComponent(q);
}

function searchTag(tag) {
  window.location.href = 'freelancer.html?q=' + encodeURIComponent(tag);
}

// ---- AUTH HANDLERS ----
function handleGoogleLogin() {
  const btn = document.getElementById('loginGoogleBtn');
  if (btn) { btn.textContent = 'Giriş yapılıyor...'; btn.disabled = true; }
  mockGoogleSignIn(user => {
    saveUser(user);
    closeAllModals();
    showToast('Hoş geldin, ' + user.name + '! 🎉', 'success');
    setTimeout(() => updateNavForUser(), 300);
  });
}

function handleEmailLogin() {
  const email = document.getElementById('loginEmail').value;
  const pass  = document.getElementById('loginPass').value;
  if (!email || !pass) { showToast('Lütfen tüm alanları doldurun.', 'error'); return; }
  const fakeUser = { id: 'local1', name: email.split('@')[0], email, initials: email[0].toUpperCase() + (email[1] || '').toUpperCase() };
  saveUser(fakeUser);
  closeAllModals();
  showToast('Giriş başarılı!', 'success');
  updateNavForUser();
}

function handleGoogleRegister() {
  if (!selectedRole) { showToast('Lütfen bir rol seçin: Freelancer veya İşveren', 'error'); return; }
  mockGoogleSignIn(user => {
    user.role = selectedRole;
    saveUser(user);
    localStorage.setItem('upworld_mode', selectedRole);
    closeAllModals();
    showToast('Hoş geldin, ' + user.name + '!', 'success');
    setTimeout(() => {
      window.location.href = selectedRole === 'freelancer' ? 'freelancer.html' : 'employer.html';
    }, 800);
  });
}

function selectRole(role) {
  selectedRole = role;
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
  const el = document.getElementById('role' + (role === 'freelancer' ? 'FL' : 'EM'));
  if (el) el.classList.add('active');
}

function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('hidden');
}

function updateNavForUser() {
  if (!currentUser) return;
  const actions = document.querySelector('.nav-actions');
  if (!actions) return;
  actions.innerHTML = `
    <div class="nav-user" onclick="toggleUserMenu()">
      <div class="nav-avatar" style="background:${getAvatarBg(currentUser.initials || 'UU')}">${currentUser.initials || '?'}</div>
      <span>${currentUser.name}</span>
      <span>▾</span>
    </div>
    <div class="user-dropdown hidden" id="userDropdown">
      <a href="freelancer.html">👤 Freelancer Portalı</a>
      <a href="employer.html">🏢 İşveren Portalı</a>
      <hr>
      <button onclick="signOut()">🚪 Çıkış Yap</button>
    </div>
  `;
}

function toggleUserMenu() {
  const d = document.getElementById('userDropdown');
  if (d) d.classList.toggle('hidden');
}

function openFreelancerDetail(id) {
  window.location.href = 'freelancer.html?id=' + id;
}

function openJobDetail(id) {
  window.location.href = 'employer.html?id=' + id;
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderFeaturedFreelancers();
  renderFeaturedJobs();
  renderHowSteps('fl');
  if (currentUser) updateNavForUser();
  // Enter tuşu ile arama
  const input = document.getElementById('heroSearch');
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
});
