// UPWORLD – FREELANCER PORTAL JS

let filteredFreelancers = [...MOCK_FREELANCERS];

function renderFreelancers(list) {
  const grid = document.getElementById('flCardsGrid');
  const count = document.getElementById('flResultCount');
  if (!grid) return;
  if (count) count.textContent = list.length + ' freelancer bulundu';
  if (list.length === 0) {
    grid.innerHTML = '<div style="text-align:center;padding:60px;color:var(--gray-400)"><div style="font-size:48px;margin-bottom:16px">🔍</div><h3>Sonuç bulunamadı</h3><p>Farklı filtreler deneyin.</p></div>';
    return;
  }
  grid.innerHTML = list.map(f => `
    <div class="fl-list-card" onclick="openFLDetail(${f.id})">
      <div class="fl-card-avatar ${f.online ? 'fl-online-ring' : ''}" style="background:${getAvatarBg(f.initials)}">${f.initials}</div>
      <div class="fl-card-body">
        <div class="fl-card-row1">
          <div>
            <div class="fl-card-name">${f.name} ${f.online ? '<span style="color:#10B981;font-size:12px">● Çevrimiçi</span>' : ''}</div>
            <div class="fl-card-title">${f.title} · ${f.location}</div>
          </div>
          <div class="fl-card-rate">${f.hourlyRate}₺<span>/saat</span></div>
        </div>
        <div class="fl-card-meta">
          ${renderStars(f.rating)}
          <span class="fl-rating-num">${f.rating}</span>
          <span class="fl-review-count">(${f.reviewCount} yorum)</span>
          <span class="fl-card-loc">· ${f.level}</span>
        </div>
        <div class="fl-card-bio">${f.bio}</div>
        <div class="fl-card-tags">${f.skills.map(s => '<span class="skill-tag">' + s + '</span>').join('')}</div>
        <div class="fl-card-footer2">
          <span class="fl-jobs-done">💼 ${f.completedJobs} proje</span>
          <span class="fl-success-rate">✓ %${f.successRate} başarı</span>
          <span class="fl-response">⚡ ${f.responseTime} yanıt</span>
          <div class="fl-card-badges">${f.badges.map(b => '<span class="fl-badge-tag' + (b === 'Top Rated' ? ' top' : '') + '">' + b + '</span>').join('')}</div>
          <button class="fl-action-btn" onclick="event.stopPropagation();openFLDetail(${f.id})">Profili Gör</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterFreelancers() {
  const q = (document.getElementById('flSearchInput') || {}).value || '';
  const minR = parseFloat((document.getElementById('minRate') || {}).value) || 0;
  const maxR = parseFloat((document.getElementById('maxRate') || {}).value) || Infinity;
  const minRating = parseFloat((document.getElementById('ratingFilter') || {}).value) || 0;
  const onlineOnly = (document.getElementById('onlineFilter') || {}).checked;
  const levelEl = document.querySelector('input[name="level"]:checked');
  const level = levelEl ? levelEl.value : '';

  filteredFreelancers = MOCK_FREELANCERS.filter(f => {
    if (q && !f.name.toLowerCase().includes(q.toLowerCase()) &&
            !f.title.toLowerCase().includes(q.toLowerCase()) &&
            !f.skills.some(s => s.toLowerCase().includes(q.toLowerCase()))) return false;
    if (f.hourlyRate < minR || f.hourlyRate > maxR) return false;
    if (f.rating < minRating) return false;
    if (onlineOnly && !f.online) return false;
    if (level && f.level !== level) return false;
    return true;
  });
  renderFreelancers(filteredFreelancers);
}

function sortFreelancers() {
  const sort = document.getElementById('flSort').value;
  const sorted = [...filteredFreelancers];
  if (sort === 'rating')    sorted.sort((a, b) => b.rating - a.rating);
  if (sort === 'rate-asc')  sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
  if (sort === 'rate-desc') sorted.sort((a, b) => b.hourlyRate - a.hourlyRate);
  if (sort === 'reviews')   sorted.sort((a, b) => b.reviewCount - a.reviewCount);
  renderFreelancers(sorted);
}

function clearFilters() {
  document.querySelectorAll('.filter-opt input[type=checkbox]').forEach(c => c.checked = false);
  const def = document.querySelector('input[name="level"][value=""]');
  if (def) def.checked = true;
  const minR = document.getElementById('minRate');
  const maxR = document.getElementById('maxRate');
  const rf = document.getElementById('ratingFilter');
  const of = document.getElementById('onlineFilter');
  const si = document.getElementById('flSearchInput');
  if (minR) minR.value = '';
  if (maxR) maxR.value = '';
  if (rf) rf.value = '';
  if (of) of.checked = false;
  if (si) si.value = '';
  filteredFreelancers = [...MOCK_FREELANCERS];
  renderFreelancers(filteredFreelancers);
}

function openFLDetail(id) {
  const f = MOCK_FREELANCERS.find(x => x.id === id);
  if (!f) return;
  const content = document.getElementById('flDetailContent');
  if (!content) return;
  content.innerHTML = `
    <div class="fdm-header">
      <div class="fdm-avatar" style="background:${getAvatarBg(f.initials)}">${f.initials}</div>
      <div class="fdm-info">
        <div class="fdm-name">${f.name} ${f.online ? '<span style="color:#4FFFCB;font-size:13px">● Çevrimiçi</span>' : ''}</div>
        <div class="fdm-title">${f.title}</div>
        <div class="fdm-meta">
          <span>📍 ${f.location}</span>
          <span>⭐ ${f.rating} (${f.reviewCount} yorum)</span>
          <span>🏆 ${f.level}</span>
          <span>⚡ ${f.responseTime} yanıt</span>
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0"><div style="font-size:28px;font-weight:900;color:var(--fl-primary)">${f.hourlyRate}₺</div><div style="font-size:13px;color:rgba(255,255,255,.6)">/saat</div></div>
    </div>
    <div class="fdm-body">
      <div class="fdm-section"><h4>Hakkında</h4><p>${f.bio}</p></div>
      <div class="fdm-section"><h4>Beceriler</h4><div class="fdm-skills">${f.skills.map(s => '<span class="skill-tag">' + s + '</span>').join('')}</div></div>
      <div class="fdm-section"><h4>İstatistikler</h4>
        <div class="fdm-stats-row">
          <div class="fdm-stat-box"><strong>${f.completedJobs}</strong><span>Proje</span></div>
          <div class="fdm-stat-box"><strong>%${f.successRate}</strong><span>Başarı</span></div>
          <div class="fdm-stat-box"><strong>${f.reviewCount}</strong><span>Yorum</span></div>
        </div>
      </div>
      <div class="fdm-section"><h4>Rozetler</h4><div style="display:flex;gap:8px;flex-wrap:wrap">${f.badges.map(b => '<span class="fl-badge-tag' + (b === 'Top Rated' ? ' top' : '') + '">' + b + '</span>').join('')}</div></div>
    </div>
    <div class="fdm-actions">
      <button class="fdm-hire-btn" onclick="hireFreelancer(${f.id})">💼 İşe Al / Teklif Gönder</button>
      <button class="fdm-msg-btn" onclick="messageFreelancer(${f.id})">💬 Mesaj Gönder</button>
    </div>
  `;
  openModal('flDetailModal');
}

function hireFreelancer(id) {
  closeAllModals();
  showToast('Teklif formu açılıyor...', 'info');
  setTimeout(() => showToast('Teklif gönderildi! İşveren portalından takip edebilirsiniz.', 'success'), 1500);
}

function messageFreelancer(id) {
  showToast('Mesajlaşma özelliği yakında aktif olacak!', 'info');
}

// POST FORM
let currentStep = 1;

function nextStep(n) {
  document.getElementById('fs' + currentStep).classList.add('hidden');
  document.getElementById('pstep' + currentStep).classList.remove('active');
  currentStep = n;
  document.getElementById('fs' + n).classList.remove('hidden');
  document.getElementById('pstep' + n).classList.add('active');
  updatePreview();
}

function updatePreview() {
  const name = (document.getElementById('p_name') || {}).value || 'Adınız Soyadınız';
  const title = (document.getElementById('p_title') || {}).value || 'Unvanınız';
  const bio = (document.getElementById('p_bio') || {}).value || 'Hakkınızda yazdıklarınız burada görünecek...';
  const skillsRaw = (document.getElementById('p_skills') || {}).value || '';
  const rate = (document.getElementById('p_rate') || {}).value || '0';
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || '??';
  const av = document.getElementById('pvAvatar');
  const nm = document.getElementById('pvName');
  const ti = document.getElementById('pvTitle');
  const bi = document.getElementById('pvBio');
  const sk = document.getElementById('pvSkills');
  const rt = document.getElementById('pvRate');
  if (av) { av.textContent = initials; av.style.background = getAvatarBg(initials || 'AB'); }
  if (nm) nm.textContent = name;
  if (ti) ti.textContent = title;
  if (bi) bi.textContent = bio;
  if (sk && skillsRaw) sk.innerHTML = skillsRaw.split(',').map(s => '<span class="skill-tag">' + s.trim() + '</span>').join('');
  if (rt) rt.textContent = '₺' + rate + ' / saat';
}

function submitFreelancerPost() {
  const name = (document.getElementById('p_name') || {}).value;
  const title = (document.getElementById('p_title') || {}).value;
  if (!name || !title) { showToast('Lütfen zorunlu alanları doldurun.', 'error'); return; }
  showToast('İlanınız yayınlandı! Profil sayfanız hazırlanıyor...', 'success');
  setTimeout(() => setView('browse'), 2000);
}

// VIEW SWITCHING
function setView(view) {
  ['browse', 'post', 'dashboard'].forEach(v => {
    const el = document.getElementById('view' + v.charAt(0).toUpperCase() + v.slice(1));
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById('view' + view.charAt(0).toUpperCase() + view.slice(1));
  if (target) target.classList.remove('hidden');
  document.querySelectorAll('.fl-nav-tab').forEach((t, i) => {
    t.classList.toggle('active', ['browse','post','dashboard'][i] === view);
  });
}

// AUTH
function handleFLLogin() {
  mockGoogleSignIn(user => {
    user.role = 'freelancer';
    saveUser(user);
    localStorage.setItem('upworld_mode', 'freelancer');
    closeAllModals();
    showToast('Hoş geldin, ' + user.name + '! 🎉', 'success');
    updateFLNav();
  });
}

function updateFLNav() {
  if (!currentUser) return;
  const actions = document.getElementById('flNavActions');
  if (!actions) return;
  actions.innerHTML = `
    <a href="employer.html" class="switch-btn">İşveren Portalı →</a>
    <div class="nav-user" onclick="toggleFLUserMenu()" style="color:white">
      <div class="nav-avatar" style="background:${getAvatarBg(currentUser.initials || 'UU')}">${currentUser.initials || '?'}</div>
      <span>${currentUser.name}</span> ▾
    </div>
    <div class="user-dropdown hidden" id="flUserDropdown" style="background:#1a2a4a;border-color:rgba(0,200,150,.3)">
      <a href="#" onclick="setView('dashboard');closeAllMenus()" style="color:rgba(255,255,255,.8)">📊 Panelim</a>
      <a href="#" onclick="setView('post');closeAllMenus()" style="color:rgba(255,255,255,.8)">➕ İlan Ver</a>
      <hr style="border-color:rgba(255,255,255,.1)">
      <button onclick="signOut()" style="color:rgba(255,255,255,.6)">🚪 Çıkış</button>
    </div>
  `;
}

function toggleFLUserMenu() {
  const d = document.getElementById('flUserDropdown');
  if (d) d.classList.toggle('hidden');
}

function closeAllMenus() {
  document.querySelectorAll('.user-dropdown').forEach(d => d.classList.add('hidden'));
}

// URL PARAMS
function handleURLParams() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  const id = params.get('id');
  const cat = params.get('cat');
  if (q) { const input = document.getElementById('flSearchInput'); if (input) { input.value = q; filterFreelancers(); } }
  if (id) { setTimeout(() => openFLDetail(parseInt(id)), 300); }
  if (cat) { const input = document.getElementById('flSearchInput'); if (input) { input.value = cat; filterFreelancers(); } }
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  renderFreelancers(MOCK_FREELANCERS);
  if (currentUser) updateFLNav();
  handleURLParams();
  ['p_name','p_title','p_bio','p_skills','p_rate'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updatePreview);
  });
});
