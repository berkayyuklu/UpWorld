// UPWORLD – EMPLOYER PORTAL JS

let filteredJobs = [...MOCK_JOBS];
let currentJobView = 'list';

function renderJobs(list) {
  const container = document.getElementById('emJobsList');
  const count = document.getElementById('emResultCount');
  if (!container) return;
  if (count) count.textContent = list.length + ' ilan bulundu';
  if (list.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--gray-400)"><div style="font-size:48px;margin-bottom:16px">🔍</div><h3>Sonuç bulunamadı</h3><p>Farklı filtreler deneyin.</p></div>';
    return;
  }
  container.innerHTML = list.map(j => `
    <div class="em-job-card" onclick="openEMDetail(${j.id})">
      <div class="em-job-card-top">
        <div class="em-company-row">
          <div class="em-company-avatar" style="background:${getAvatarBg(j.companyInitials)}">${j.companyInitials}</div>
          <div>
            <div class="em-company-name">${j.company}</div>
            <div class="em-company-meta">
              ${j.verified ? '<span style="color:#10B981">✓ Doğrulandı</span>' : ''}
              <span>⭐ ${j.employerRating}</span>
              <span>💸 ${j.totalSpent} harcandı</span>
              <span>${j.postedAt}</span>
            </div>
          </div>
        </div>
        <div class="em-job-badges">
          ${j.urgent ? '<span class="em-urgent">🔥 ACİL</span>' : ''}
          ${j.verified ? '<span class="em-verified">✓ Doğrulandı</span>' : ''}
        </div>
      </div>
      <h3 class="em-job-title">${j.title}</h3>
      <p class="em-job-desc">${j.description}</p>
      <div class="em-job-skills">${j.skills.map(s => '<span class="skill-tag em-skill">' + s + '</span>').join('')}</div>
      <div class="em-job-footer">
        <div class="em-job-footer-left">
          <span class="em-job-budget">💰 ${j.budget}</span>
          <span class="em-job-stat">👥 ${j.proposals} teklif</span>
          <span class="em-job-stat">⏱ ${j.deadline}</span>
          <span class="em-job-stat">📍 ${j.location || 'Uzaktan'}</span>
          <span class="em-job-stat">🎯 ${j.level}</span>
        </div>
        <button class="em-apply-btn" onclick="event.stopPropagation();applyToJob(${j.id})">Teklif Ver →</button>
      </div>
    </div>
  `).join('');
}

function filterJobs() {
  const q = (document.getElementById('emSearchInput') || {}).value || '';
  const urgent = (document.getElementById('urgentFilter') || {}).checked;
  const verified = (document.getElementById('verifiedFilter') || {}).checked;
  const level = (document.getElementById('emLevel') || {}).value;

  filteredJobs = MOCK_JOBS.filter(j => {
    if (q && !j.title.toLowerCase().includes(q.toLowerCase()) &&
             !j.description.toLowerCase().includes(q.toLowerCase()) &&
             !j.skills.some(s => s.toLowerCase().includes(q.toLowerCase()))) return false;
    if (urgent && !j.urgent) return false;
    if (verified && !j.verified) return false;
    if (level && j.level !== level) return false;
    return true;
  });
  renderJobs(filteredJobs);
}

function sortJobs() {
  const sort = (document.getElementById('emSort') || {}).value;
  const sorted = [...filteredJobs];
  if (sort === 'newest') sorted.sort((a, b) => a.id - b.id);
  if (sort === 'budget-desc') sorted.sort((a, b) => b.id - a.id);
  if (sort === 'proposals') sorted.sort((a, b) => a.proposals - b.proposals);
  renderJobs(sorted);
}

function clearEMFilters() {
  document.querySelectorAll('.filter-opt input[type=checkbox]').forEach(c => c.checked = false);
  const el = document.getElementById('emLevel');
  const si = document.getElementById('emSearchInput');
  if (el) el.value = '';
  if (si) si.value = '';
  filteredJobs = [...MOCK_JOBS];
  renderJobs(filteredJobs);
}

function setJobView(view, btn) {
  currentJobView = view;
  document.querySelectorAll('.em-view-toggle').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const container = document.getElementById('emJobsList');
  if (!container) return;
  container.className = 'em-jobs-list' + (view === 'grid' ? ' grid-view' : '');
}

function openEMDetail(id) {
  const j = MOCK_JOBS.find(x => x.id === id);
  if (!j) return;
  const content = document.getElementById('emDetailContent');
  if (!content) return;
  content.innerHTML = `
    <div class="emdm-header">
      <div class="emdm-company">
        <div class="emdm-comp-av" style="background:${getAvatarBg(j.companyInitials)}">${j.companyInitials}</div>
        <div>
          <div class="emdm-comp-name">${j.company}</div>
          <div class="emdm-comp-meta">${j.postedAt} · ${j.location || 'Uzaktan'}</div>
        </div>
      </div>
      <div class="emdm-title">${j.title}</div>
      <div class="emdm-tags">
        ${j.urgent ? '<span class="em-urgent">🔥 ACİL</span>' : ''}
        ${j.verified ? '<span class="em-verified">✓ Doğrulandı</span>' : ''}
        <span style="padding:4px 10px;background:rgba(255,255,255,0.1);border-radius:99px;font-size:11px;color:rgba(255,255,255,.7)">${j.level}</span>
      </div>
    </div>
    <div class="emdm-body">
      <div class="emdm-section"><h4>Proje Açıklaması</h4><p>${j.description}</p></div>
      <div class="emdm-section"><h4>Gerekli Beceriler</h4><div class="fl-skills">${j.skills.map(s => '<span class="skill-tag em-skill">' + s + '</span>').join('')}</div></div>
      <div class="emdm-section"><h4>İstatistikler</h4>
        <div class="emdm-stats-row">
          <div class="emdm-stat-box"><strong>${j.proposals}</strong><span>Teklif</span></div>
          <div class="emdm-stat-box"><strong>${j.budget}</strong><span>Bütçe</span></div>
          <div class="emdm-stat-box"><strong>${j.deadline}</strong><span>Süre</span></div>
        </div>
      </div>
      <div class="emdm-section"><h4>İşveren Hakkında</h4>
        <div class="emdm-employer">
          <div class="emdm-emp-av">${j.employer[0]}${j.employer.split(' ')[1]?.[0] || ''}</div>
          <div class="emdm-emp-info">
            <strong>${j.employer}</strong>
            <span>⭐ ${j.employerRating} · ${j.totalSpent} toplam harcama</span>
          </div>
        </div>
      </div>
    </div>
    <div class="emdm-actions">
      <button class="emdm-apply-btn" onclick="applyToJob(${j.id})">✏️ Teklif Gönder</button>
      <button class="emdm-save-btn" onclick="saveJob(${j.id})">🔖 Kaydet</button>
    </div>
  `;
  openModal('emDetailModal');
}

function applyToJob(id) {
  if (!currentUser) { showToast('Teklif vermek için lütfen giriş yapın.', 'error'); openModal('emLoginModal'); return; }
  closeAllModals();
  showToast('Teklif formunuz hazırlanıyor...', 'info');
  setTimeout(() => showToast('Teklifiniz başarıyla gönderildi! 🎉', 'success'), 1200);
}

function saveJob(id) {
  showToast('İlan kaydedildi!', 'success');
}

// POST JOB FORM
let currentEMStep = 1;
let selectedBudgetType = 'fixed';

function nextEMStep(n) {
  document.getElementById('efs' + currentEMStep).classList.add('hidden');
  document.getElementById('epstep' + currentEMStep).classList.remove('active');
  currentEMStep = n;
  document.getElementById('efs' + n).classList.remove('hidden');
  document.getElementById('epstep' + n).classList.add('active');
}

function selectBudgetType(type) {
  selectedBudgetType = type;
  ['fixed','hourly','unit'].forEach(t => {
    const btn = document.getElementById('bt' + t.charAt(0).toUpperCase() + t.slice(1));
    if (btn) btn.classList.toggle('active', t === type);
  });
}

function submitJob() {
  const title = (document.getElementById('ep_title') || {}).value;
  const desc = (document.getElementById('ep_desc') || {}).value;
  if (!title || !desc) { showToast('Lütfen zorunlu alanları doldurun.', 'error'); return; }
  showToast('İlanınız yayınlandı! Teklifler gelmeye başlayacak.', 'success');
  setTimeout(() => setEMView('dashboard'), 2000);
}

// VIEW SWITCHING
function setEMView(view) {
  ['browse','post','dashboard'].forEach(v => {
    const key = 'emView' + v.charAt(0).toUpperCase() + v.slice(1);
    const el = document.getElementById(key);
    if (el) el.classList.add('hidden');
  });
  const key = 'emView' + view.charAt(0).toUpperCase() + view.slice(1);
  const target = document.getElementById(key);
  if (target) target.classList.remove('hidden');
  document.querySelectorAll('.em-nav-tab').forEach((t, i) => {
    t.classList.toggle('active', ['browse','post','dashboard'][i] === view);
  });
}

// AUTH
function handleEMLogin() {
  mockGoogleSignIn(user => {
    user.role = 'employer';
    saveUser(user);
    localStorage.setItem('upworld_mode', 'employer');
    closeAllModals();
    showToast('Hoş geldin, ' + user.name + '!', 'success');
    updateEMNav();
  });
}

function updateEMNav() {
  if (!currentUser) return;
  const actions = document.getElementById('emNavActions');
  if (!actions) return;
  actions.innerHTML = `
    <a href="freelancer.html" class="em-switch-btn">Freelancer Portalı →</a>
    <div class="nav-user" onclick="toggleEMUserMenu()" style="color:white;background:rgba(255,255,255,.1)">
      <div class="nav-avatar" style="background:${getAvatarBg(currentUser.initials || 'UU')};color:black">${currentUser.initials || '?'}</div>
      <span>${currentUser.name}</span> ▾
    </div>
    <div class="user-dropdown hidden" id="emUserDropdown" style="background:#1a1a1a;border-color:rgba(255,214,0,.3)">
      <a href="#" onclick="setEMView('dashboard');closeEMMenus()" style="color:rgba(255,255,255,.8)">📊 Panelim</a>
      <a href="#" onclick="setEMView('post');closeEMMenus()" style="color:rgba(255,255,255,.8)">➕ İlan Ver</a>
      <hr style="border-color:rgba(255,255,255,.1)">
      <button onclick="signOut()" style="color:rgba(255,255,255,.6)">🚪 Çıkış</button>
    </div>
  `;
}

function toggleEMUserMenu() {
  const d = document.getElementById('emUserDropdown');
  if (d) d.classList.toggle('hidden');
}

function closeEMMenus() {
  document.querySelectorAll('.user-dropdown').forEach(d => d.classList.add('hidden'));
}

// URL PARAMS
function handleEMURLParams() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const q = params.get('q');
  if (id) setTimeout(() => openEMDetail(parseInt(id)), 300);
  if (q) { const el = document.getElementById('emSearchInput'); if (el) { el.value = q; filterJobs(); } }
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  renderJobs(MOCK_JOBS);
  if (currentUser) updateEMNav();
  handleEMURLParams();
  const input = document.getElementById('emSearchInput');
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') filterJobs(); });
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  });
});
