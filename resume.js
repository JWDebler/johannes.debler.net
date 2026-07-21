document.getElementById('print-btn').addEventListener('click', () => window.print());

fetch('data.json')
  .then(r => r.json())
  .then(data => {
    renderPubs(data.publications || []);
    renderAwards(data.awards || []);
  })
  .catch(err => console.error('Could not load data.json:', err));

function renderPubs(pubs) {
  const el = document.getElementById('r-pubs');
  el.innerHTML = pubs.slice(0, 6).map(p => `
    <div class="r-pub-item">
      <p class="r-pub-title"><span class="r-pub-year">${p.year}</span>${p.title}</p>
      <p class="r-pub-meta">${p.authors} — <em>${p.journal}</em></p>
    </div>
  `).join('');
}

function renderAwards(awards) {
  const el = document.getElementById('r-awards');
  el.innerHTML = awards.map(a => `
    <div class="r-award-item">
      <p class="r-award-title"><span class="r-award-year">${a.year}</span>${a.title}</p>
    </div>
  `).join('');
}
