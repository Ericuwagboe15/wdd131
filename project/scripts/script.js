/* main.js — dynamic behavior for Erics Kitchen */
/* All DOM-built strings use template literals exclusively */

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  setupNavToggle();
  initMenu();
  initSpecials();
  initReviews();
  initContactForm();
  initImageObserver();
  setFooterMeta();
});

/* -------------------- UTILITY FUNCTIONS -------------------- */
function setYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('#year, #year2, #year3, #year4').forEach(el => el && (el.textContent = year));
}

/* -------------------- NAV TOGGLE -------------------- */
function setupNavToggle() {
  const btn = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav-list');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'block';
  });
}

/* -------------------- MENU DATA -------------------- */
const menuItems = [
  { id:1, name:"Erica's Jollof", category:'meat', price:1200, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6Jjlr6QK1urtfiaHAbCUmnpovknHFtxzLg&s', alt:'Jollof rice with plantain', featured:true },
  { id:2, name:"Vegetarian Egusi", category:'vegetarian', price:1000, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbvDRL-skKgQUSklmrWqoGaZt0iViNsrwkQ&s', alt:'Bowl of egusi with greens', featured:true },
  { id:3, name:"Puff Puff", category:'dessert', price:300, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6Jjlr6QK1urtfiaHAbCUmnpovknHFtxzLg&s', alt:'Pile of puff puff', featured:false }
];

/* -------------------- MENU RENDER -------------------- */
function initMenu() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  const filterSelect = document.getElementById('filter');
  const showFavBtn = document.getElementById('show-favorites');

  const render = items => {
    const favs = getFavorites();
    grid.innerHTML = items.map(item => {
      const isFav = favs.includes(String(item.id));
      return `
        <article class="card" data-id="${item.id}">
          <img data-src="${item.img}" alt="${item.alt}" class="lazy" loading="lazy" width="400" height="300">
          <h4>${item.name}</h4>
          <p class="muted">${item.category} — ₦${item.price}</p>
          <div>
            <button class="fav-btn" data-id="${item.id}" aria-pressed="${isFav}">${isFav ? '★ Favorited' : '☆ Favorite'}</button>
            <button class="order-btn" data-id="${item.id}">Order</button>
          </div>
        </article>
      `;
    }).join('');
    attachMenuListeners();
    observeLazyImages();
  };

  const applyFilter = () => {
    const v = filterSelect?.value || 'all';
    const filtered = v === 'all' ? menuItems : menuItems.filter(i => i.category === v);
    render(filtered);
  };

  filterSelect?.addEventListener('change', applyFilter);
  showFavBtn?.addEventListener('click', () => {
    const favs = getFavorites();
    if (!favs.length) return alert('No favorites yet. Click "Favorite" on menu items to add.');
    render(menuItems.filter(i => favs.includes(String(i.id))));
  });

  render(menuItems);
}

/* -------------------- MENU BUTTON LISTENERS -------------------- */
function attachMenuListeners() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.currentTarget.dataset.id;
      toggleFavorite(id);
      const isFav = getFavorites().includes(String(id));
      e.currentTarget.setAttribute('aria-pressed', String(isFav));
      e.currentTarget.textContent = isFav ? '★ Favorited' : '☆ Favorite';
    });
  });

  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = Number(e.currentTarget.dataset.id);
      const item = menuItems.find(m => m.id === id);
      if (!item) return;
      if (item.price > 1000 && !confirm(`"${item.name}" costs ₦${item.price}. Proceed to order?`)) return;
      alert(`Added "${item.name}" to your order (demo).`);
    });
  });
}

/* -------------------- FAVORITES STORAGE -------------------- */
function getFavorites() {
  return JSON.parse(localStorage.getItem('ek_favorites') || '[]');
}
function toggleFavorite(id) {
  const favs = getFavorites();
  const idx = favs.indexOf(String(id));
  idx === -1 ? favs.push(String(id)) : favs.splice(idx, 1);
  localStorage.setItem('ek_favorites', JSON.stringify(favs));
}

/* -------------------- SPECIALS -------------------- */
function initSpecials() {
  const grid = document.getElementById('specials-grid');
  if (!grid) return;

  const specials = menuItems.filter(item => item.featured);
  grid.innerHTML = specials.map(s => `
    <div class="card">
      <img data-src="${s.img}" alt="${s.alt}" class="lazy" loading="lazy" width="400" height="300">
      <h4>${s.name}</h4>
      <p>₦${s.price}</p>
    </div>
  `).join('');

  observeLazyImages();
}

/* -------------------- REVIEWS -------------------- */
function initReviews() {
  const countEl = document.getElementById('reviewCount');
  if (countEl) countEl.textContent = Number(localStorage.getItem('ek_reviewCount') || 0);

  const form = document.getElementById('reviewForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const rating = Number(document.getElementById('rating').value);
    const comment = document.getElementById('comment').value.trim();
    if (rating < 1 || rating > 5) return alert('Rating must be between 1 and 5');

    const stored = JSON.parse(localStorage.getItem('ek_reviews') || '[]');
    stored.push({ name, rating, comment, date: new Date().toISOString() });
    localStorage.setItem('ek_reviews', JSON.stringify(stored));
    const newCount = stored.length;
    localStorage.setItem('ek_reviewCount', String(newCount));
    countEl.textContent = newCount;
    form.reset();
    alert('Thanks for your review — stored locally (demo).');
  });
}

/* -------------------- CONTACT FORM -------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const renderSubmissions = () => {
    const container = document.getElementById('submissions');
    const subs = JSON.parse(localStorage.getItem('ek_contacts') || '[]');
    if (!container) return;
    container.innerHTML = subs.length ? `<ul>${subs.map(s => `<li><strong>${s.name}</strong> (${s.email}) — ${s.message} <small>${new Date(s.date).toLocaleString()}</small></li>`).join('')}</ul>` : '<p>No saved submissions.</p>';
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    if (!email.includes('@')) return alert('Please enter a valid email.');

    const method = form.querySelector('input[name="contact-method"]:checked').value;
    const subscribe = document.getElementById('subscribe').checked;

    const stored = JSON.parse(localStorage.getItem('ek_contacts') || '[]');
    stored.push({ name, email, message, method, subscribe, date: new Date().toISOString() });
    localStorage.setItem('ek_contacts', JSON.stringify(stored));
    alert('Thanks! Your message is saved locally (demo).');
    form.reset();
    renderSubmissions();
  });

  document.getElementById('clear-submissions')?.addEventListener('click', () => {
    if (confirm('Clear saved submissions?')) {
      localStorage.removeItem('ek_contacts');
      renderSubmissions();
    }
  });

  renderSubmissions();
}

/* -------------------- LAZY LOADING -------------------- */
let lazyObserver = null;
function initImageObserver() { observeLazyImages(); }

function observeLazyImages() {
  const lazyImages = Array.from(document.querySelectorAll('img.lazy'));
  if ('IntersectionObserver' in window) {
    if (!lazyObserver) {
      lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        });
      }, { rootMargin: "200px 0px" });
    }
    lazyImages.forEach(img => lazyObserver.observe(img));
  } else {
    lazyImages.forEach(img => img.src = img.dataset.src);
  }
}

/* -------------------- FOOTER METADATA -------------------- */
function setFooterMeta() {
  setYear();
  document.querySelectorAll('.created-by').forEach(el => el.textContent = 'De Ericas Tech');

  const lmEl = document.getElementById('lastModified');
  if (!lmEl) return;

  const lmDate = new Date(document.lastModified || new Date().toString());
  lmEl.textContent = lmDate.toLocaleString(undefined, {
    weekday:'long', day:'numeric', month:'long', year:'numeric',
    hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false
  });
}