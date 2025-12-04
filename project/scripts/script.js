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
});

/* Utility functions */
function setYear() {
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #year2, #year3, #year4').forEach(el => {
    if (el) el.textContent = y;
  });
}

/* NAV toggle for small screens */
function setupNavToggle(){
  const btn = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav-list');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'block';
  });
}

/* DATA: menu items — objects in an array */
const menuItems = [
  { id:1, name: "Erica's Jollof", category:'meat', price:1200, img:'images/dish1-400.jpg', alt:'Jollof rice with plantain', featured:true },
  { id:2, name: "Vegetarian Egusi", category:'vegetarian', price:1000, img:'images/dish2-400.jpg', alt:'Bowl of egusi with greens', featured:true },
  { id:3, name: "Puff Puff", category:'dessert', price:300, img:'images/dish3-400.jpg', alt:'Pile of puff puff', featured:false }
];

/* Render menu using template literals */
function initMenu(){
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  const filterSelect = document.getElementById('filter');
  const showFavBtn = document.getElementById('show-favorites');

  function render(items){
    grid.innerHTML = items.map(item => {
      const favs = getFavorites();
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
    // re-run image observer to pick up new lazy images
    observeLazyImages();
  }

  function applyFilter(){
    const v = filterSelect ? filterSelect.value : 'all';
    let result = menuItems;
    if (v !== 'all') {
      result = menuItems.filter(i => i.category === v);
    }
    render(result);
  }

  if (filterSelect) filterSelect.addEventListener('change', applyFilter);
  if (showFavBtn) showFavBtn.addEventListener('click', () => {
    const favs = getFavorites();
    if (favs.length === 0) {
      alert('No favorites yet. Click "Favorite" on menu items to add.');
      return;
    }
    const items = menuItems.filter(i => favs.includes(String(i.id)));
    render(items);
  });

  // initial render
  render(menuItems);
}

/* attach listeners to buttons inside menu after render */
function attachMenuListeners(){
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      toggleFavorite(id);
      // update aria and text
      const isFav = getFavorites().includes(String(id));
      e.currentTarget.setAttribute('aria-pressed', String(isFav));
      e.currentTarget.textContent = isFav ? '★ Favorited' : '☆ Favorite';
    });
  });

  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const item = menuItems.find(m => m.id === id);
      if (item) {
        // conditional branching: confirm order if price above a threshold
        if (item.price > 1000) {
          if (!confirm(`"${item.name}" costs ₦${item.price}. Proceed to order?`)) return;
        }
        alert(`Added "${item.name}" to your order (demo).`);
      }
    });
  });
}

/* Favorites using localStorage */
function getFavorites(){
  return JSON.parse(localStorage.getItem('ek_favorites') || '[]');
}
function toggleFavorite(id){
  const favs = getFavorites();
  const idx = favs.indexOf(String(id));
  if (idx === -1) favs.push(String(id));
  else favs.splice(idx,1);
  localStorage.setItem('ek_favorites', JSON.stringify(favs));
}

/* SPECIALS (used on home page) — use objects + array methods */
function initSpecials(){
  const specialGrid = document.getElementById('specials-grid');
  if (!specialGrid) return;
  // get featured items using filter (array method)
  const specials = menuItems.filter(item => item.featured);
  specialGrid.innerHTML = specials.map(s => {
    return `
      <div class="card">
        <img data-src="${s.img}" alt="${s.alt}" class="lazy" loading="lazy" width="400" height="300">
        <h4>${s.name}</h4>
        <p>₦${s.price}</p>
      </div>
    `;
  }).join('');
  observeLazyImages();
}

/* REVIEW FORM — uses localStorage and local count */
function initReviews(){
  const countEl = document.getElementById('reviewCount');
  if (countEl) {
    const c = Number(localStorage.getItem('ek_reviewCount') || 0);
    countEl.textContent = c;
  }
  const rf = document.getElementById('reviewForm');
  if (!rf) return;
  rf.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value.trim();
    // conditional branching: simple validation aside from HTML required attributes
    if (rating < 1 || rating > 5) {
      alert('Rating must be between 1 and 5');
      return;
    }
    const stored = JSON.parse(localStorage.getItem('ek_reviews') || '[]');
    stored.push({name, rating:Number(rating), comment, date: new Date().toISOString()});
    localStorage.setItem('ek_reviews', JSON.stringify(stored));
    // update count
    const newCount = stored.length;
    localStorage.setItem('ek_reviewCount', String(newCount));
    document.getElementById('reviewCount').textContent = newCount;
    rf.reset();
    alert('Thanks for your review — stored locally (demo).');
  });
}

/* CONTACT FORM — stores submissions in localStorage and lists them */
function initContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  function renderSubmissions(){
    const container = document.getElementById('submissions');
    const subs = JSON.parse(localStorage.getItem('ek_contacts') || '[]');
    if (!container) return;
    if (subs.length === 0) {
      container.innerHTML = '<p>No saved submissions.</p>';
      return;
    }
    container.innerHTML = `
      <ul>
        ${subs.map(s => `<li><strong>${s.name}</strong> (${s.email}) — ${s.message} <small>${new Date(s.date).toLocaleString()}</small></li>`).join('')}
      </ul>
    `;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // gather values
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    // conditional branching example: require email domain check (demo)
    if (!email.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
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

/* Lazy loading using IntersectionObserver */
let lazyObserver = null;
function initImageObserver(){
  observeLazyImages();
}

function observeLazyImages(){
  const lazyImages = Array.from(document.querySelectorAll('img.lazy'));
  if ('IntersectionObserver' in window) {
    if (!lazyObserver) {
      lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: "200px 0px" });
    }
    lazyImages.forEach(img => lazyObserver.observe(img));
  } else {
    // fallback: load all
    lazyImages.forEach(img => img.src = img.dataset.src);
  }
}