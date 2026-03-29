// ── Year in footer ──────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Mobile nav toggle ────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── Navbar shadow on scroll ──────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.5)' : '';
});

// ── Active nav link on scroll ────────────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const links    = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// ── Render data from data.json ───────────────────────────────
fetch('data.json')
  .then(r => r.json())
  .then(data => {
    renderHighlightCounts(data);
    renderPublications(data.publications);
    renderPresentations(data.presentations);
    renderAwards(data.awards);
  })
  .catch(err => console.error('Could not load data.json:', err));

function renderHighlightCounts(data) {
  const pubs = document.getElementById('stat-publications');
  const pres = document.getElementById('stat-presentations');
  const aw = document.getElementById('stat-awards');
  if (Array.isArray(data.publications) && pubs) {
    pubs.textContent = data.publications.length;
  }
  if (Array.isArray(data.presentations) && pres) {
    pres.textContent = data.presentations.length;
  }
  if (Array.isArray(data.awards) && aw) {
    aw.textContent = data.awards.length;
  }
}

function renderPublications(pubs) {
  const list = document.getElementById('pub-list');
  list.innerHTML = pubs.map(p => `
    <div class="pub-item">
      <span class="pub-year">${p.year}</span>
      <div class="pub-details">
        <p class="pub-title">${p.title}</p>
        <p class="pub-authors">${p.authors}</p>
        <p class="pub-journal">${p.journal}</p>
        <a href="https://doi.org/${p.doi}" target="_blank" rel="noopener" class="pub-doi">doi:${p.doi}</a>
      </div>
    </div>
  `).join('');
}

function renderPresentations(pres) {
  const list = document.getElementById('pres-list');
  list.innerHTML = pres.map(p => `
    <div class="pres-item">
      <div class="pres-meta">
        <span class="pres-year">${p.year}</span>
        <span class="pres-type ${p.type === 'talk' ? 'pres-talk' : 'pres-poster'}">${p.type}</span>
      </div>
      <div class="pres-details">
        <strong>${p.event}</strong> — ${p.location}
        <p><em>${p.title}</em></p>
      </div>
    </div>
  `).join('');
}

function renderAwards(awards) {
  const grid = document.getElementById('awards-grid');
  grid.innerHTML = awards.map(a => `
    <div class="award-card">
      <div class="award-year">${a.year}</div>
      <div class="award-body">
        <h3>${a.title}</h3>
        <p>${a.body}</p>
      </div>
    </div>
  `).join('');
}

// ── TNG Easter Egg ───────────────────────────────────────────
const tngModal   = document.getElementById('tng-modal');
const tngTrigger = document.getElementById('tng-trigger');
const tngClose   = document.getElementById('tng-close');
const tngEngage  = document.getElementById('tng-engage');

function openTNG() {
  tngModal.classList.add('active');
  tngModal.setAttribute('aria-hidden', 'false');
  spawnStars();
  document.body.style.overflow = 'hidden';
}

function closeTNG() {
  tngModal.classList.remove('active');
  tngModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

tngTrigger.addEventListener('click', openTNG);
tngClose.addEventListener('click', closeTNG);
tngModal.addEventListener('click', e => { if (e.target === tngModal) closeTNG(); });
tngEngage.addEventListener('click', closeTNG);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTNG(); });

function spawnStars() {
  const field = document.getElementById('tng-starfield');
  field.innerHTML = '';
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'tng-star';
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${Math.random() < 0.2 ? '3px' : '2px'};
      height: ${Math.random() < 0.2 ? '3px' : '2px'};
      animation-delay: ${(Math.random() * 3).toFixed(2)}s;
      animation-duration: ${(2 + Math.random() * 3).toFixed(2)}s;
      opacity: ${(0.2 + Math.random() * 0.8).toFixed(2)};
    `;
    field.appendChild(star);
  }
}

// Konami code bonus
const KONAMI = [38,38,40,40,37,39,37,39,66,65];
let konamiIdx = 0;
document.addEventListener('keydown', e => {
  if (e.keyCode === KONAMI[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === KONAMI.length) { openTNG(); konamiIdx = 0; }
  } else {
    konamiIdx = 0;
  }
});

console.log('%c🖖 Greetings, fellow explorer.', 'font-size:18px;color:#99ccff;font-weight:bold;');
console.log('%cYou found the developer console. Well done — a true sign of scientific curiosity.', 'color:#f5a623;');
console.log('%cTry the Konami code on the page: ↑↑↓↓←→←→BA', 'color:#7aa4cc;font-style:italic;');
