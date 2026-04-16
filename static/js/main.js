// ── PAGE NAVIGATION ──
function nav(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const t = document.getElementById('page-' + id);
  if (t) { t.classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }
  const sm = document.getElementById('srchModal');
  if (sm) sm.classList.remove('open');
}

// ── SEARCH ──
function toggleSearch() {
  const m = document.getElementById('srchModal');
  if (!m) return;
  m.classList.toggle('open');
  if (m.classList.contains('open')) setTimeout(() => document.getElementById('srchInput')?.focus(), 80);
}
function closeSrchModal(e) { if (e.target.id === 'srchModal') toggleSearch(); }
function doSearch() {
  const v = (document.getElementById('srchInput')?.value || '').toLowerCase();
  if (v.includes('service') || v.includes('care') || v.includes('nursing')) nav('services');
  else if (v.includes('contact') || v.includes('phone') || v.includes('email')) nav('contact');
  else if (v.includes('schedule') || v.includes('book') || v.includes('appoint')) nav('schedule');
  else if (v.includes('staff') || v.includes('nurse') || v.includes('caregiver')) nav('staff');
  else if (v.includes('faq') || v.includes('question')) nav('faq');
  else if (v.includes('career') || v.includes('job')) nav('careers');
  else if (v.includes('news') || v.includes('blog')) nav('news');
  else if (v.includes('payment') || v.includes('billing')) nav('payment');
  else if (v.includes('forum') || v.includes('community')) nav('forum');
  else if (v.includes('gallery') || v.includes('photo')) nav('gallery');
  else if (v.includes('video')) nav('videos');
  else if (v.includes('portal') || v.includes('login') || v.includes('account')) nav('portal');
  else nav('faq');
  toggleSearch();
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const sm = document.getElementById('srchModal');
    if (sm && sm.classList.contains('open')) toggleSearch();
    const vm = document.getElementById('vidModal');
    if (vm && vm.classList.contains('open')) closeVideoModal();
  }
  if (e.key === 'Enter') {
    const sm = document.getElementById('srchModal');
    if (sm && sm.classList.contains('open')) doSearch();
  }
});

// ── VIDEO MODAL ──
let vidPlaying = false;
let vidProgress = 0;
let vidInterval = null;
const VID_DURATION = 204; // 3:24 in seconds

function openVideoModal() {
  const m = document.getElementById('vidModal');
  if (m) { m.classList.add('open'); startVideo(); }
}
function closeVideoModal() {
  const m = document.getElementById('vidModal');
  if (m) { m.classList.remove('open'); pauseVideo(); resetVideo(); }
}
function closeVidModal(e) { if (e.target.id === 'vidModal') closeVideoModal(); }
function startVideo() {
  vidPlaying = true;
  updatePlayBtn();
  vidInterval = setInterval(() => {
    vidProgress += 1;
    if (vidProgress >= VID_DURATION) { vidProgress = 0; pauseVideo(); }
    const pct = (vidProgress / VID_DURATION) * 100;
    const fill = document.getElementById('vidFill');
    const time = document.getElementById('vidTime');
    if (fill) fill.style.width = pct + '%';
    if (time) time.textContent = formatTime(vidProgress) + ' / 3:24';
  }, 1000);
}
function pauseVideo() {
  vidPlaying = false;
  if (vidInterval) { clearInterval(vidInterval); vidInterval = null; }
  updatePlayBtn();
}
function resetVideo() {
  vidProgress = 0;
  const fill = document.getElementById('vidFill');
  const time = document.getElementById('vidTime');
  if (fill) fill.style.width = '0%';
  if (time) time.textContent = '0:00 / 3:24';
}
function toggleVideo() {
  if (vidPlaying) pauseVideo(); else startVideo();
}
function updatePlayBtn() {
  const btn = document.getElementById('vidPlayBtn');
  if (!btn) return;
  if (vidPlaying) {
    btn.innerHTML = '<div class="vid-pause"><span></span><span></span></div>';
  } else {
    btn.innerHTML = '<div class="vid-play-tri"></div>';
  }
}
function formatTime(s) {
  const m = Math.floor(s/60), sec = s%60;
  return m + ':' + (sec < 10 ? '0'+sec : sec);
}

// ── FORMS ──
function showSuccess(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 5000); }
}

// ── PORTAL LOGIN WITH SAMPLE CREDENTIALS ──
function portalLogin() {
  const id = document.getElementById('portalId')?.value?.trim();
  const pw = document.getElementById('portalPw')?.value?.trim();
  if (id === 'MHC-2024-00142' && pw === 'Demo@Manzanita1') {
    showSuccess('portal-ok');
  } else if (id && pw) {
    showSuccess('portal-ok'); // In demo, accept any filled credentials
  } else {
    alert('Please enter your Patient ID and Password.');
  }
}

// ── FAQ ──
function toggleFaq(btn) {
  const ans = btn.nextElementSibling;
  const wasOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q').forEach(q => { q.classList.remove('open'); if (q.nextElementSibling) q.nextElementSibling.classList.remove('open'); });
  if (!wasOpen) { btn.classList.add('open'); if (ans) ans.classList.add('open'); }
}

// ── TIME SLOT ──
function selSlot(el) {
  if (el.classList.contains('na')) return;
  document.querySelectorAll('.tslot').forEach(s => s.classList.remove('sel'));
  el.classList.add('sel');
}

// ── PAYMENT ──
function selPay(el) {
  document.querySelectorAll('.popt').forEach(p => p.classList.remove('sel'));
  el.classList.add('sel');
}

// ── STARS ──
function rateStar(n) {
  document.querySelectorAll('.star-b').forEach((s,i) => s.classList.toggle('lit', i < n));
}

// ── GALLERY ──
function selGal(btn) {
  document.querySelectorAll('.gal-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── PORTAL TABS ──
function switchTab(el) {
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ── LIVE CHAT ──
const replies = [
  "Thank you for reaching out! A care coordinator will follow up shortly.",
  "I'd be happy to help with that. Can you share a bit more about the situation?",
  "Great question! For the most accurate answer, I'll connect you with our clinical team.",
  "We have availability this week. Would you like me to transfer you to scheduling?",
  "Understood. I'm noting that in your care file and will flag it for your coordinator.",
  "Absolutely! You can also call us at (415) 823-4400 for immediate assistance."
];
let replyIdx = 0;
function sendChat() {
  const inp = document.getElementById('chatInp');
  const msgs = document.getElementById('chatMsgs');
  if (!inp || !msgs || !inp.value.trim()) return;
  const userDiv = document.createElement('div');
  userDiv.className = 'cmsg usr';
  userDiv.innerHTML = `<div class="cbubble">${inp.value}</div><div class="ctime">Just now</div>`;
  msgs.appendChild(userDiv);
  inp.value = '';
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    const agDiv = document.createElement('div');
    agDiv.className = 'cmsg agent';
    agDiv.innerHTML = `<div class="cbubble">${replies[replyIdx % replies.length]}</div><div class="ctime">Just now</div>`;
    msgs.appendChild(agDiv);
    msgs.scrollTop = msgs.scrollHeight;
    replyIdx++;
  }, 900);
}

// ── FORUM ──
function postQ() {
  const inp = document.getElementById('forumQ');
  if (!inp || !inp.value.trim()) return;
  showSuccess('forum-ok');
  inp.value = '';
}

// ── MOBILE MENU ──
function toggleMobile() {
  const menu = document.querySelector('.nav-menu');
  if (!menu) return;
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
  } else {
    Object.assign(menu.style, {display:'flex',flexDirection:'column',position:'absolute',top:'68px',left:'0',right:'0',background:'white',borderBottom:'1px solid #DDE4EE',padding:'16px 6%',zIndex:'999',gap:'4px'});
  }
}
