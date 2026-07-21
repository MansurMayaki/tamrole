// Portline Auto — front-end only interactions.
// Swap the form handler out for a real endpoint (email service, CRM, etc.) when ready.

const quoteForm = document.getElementById('quote-form');

if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = quoteForm.querySelector('button');
    button.textContent = 'Request sent';
    button.disabled = true;
  });
}

// ---------- Inventory: brand filter ----------
const filterBar = document.getElementById('filter-bar');
const listingCards = Array.from(document.querySelectorAll('.listing-card'));
const emptyState = document.getElementById('empty-state');

function applyFilter(brand) {
  let visibleCount = 0;
  listingCards.forEach((card) => {
    const matches = brand === 'all' || card.dataset.brand === brand;
    card.classList.toggle('hidden', !matches);
    if (matches) visibleCount += 1;
  });
  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

if (filterBar) {
  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-pill');
    if (!button) return;
    filterBar.querySelectorAll('.filter-pill').forEach((pill) => pill.classList.remove('active'));
    button.classList.add('active');
    applyFilter(button.dataset.brand);
  });
}

// ---------- Inventory: sort by price ----------
const sortSelect = document.getElementById('sort-select');
const listingsContainer = document.getElementById('listings');

if (sortSelect && listingsContainer) {
  sortSelect.addEventListener('change', () => {
    const value = sortSelect.value;
    const cards = Array.from(listingsContainer.querySelectorAll('.listing-card'));

    if (value === 'featured') {
      cards.sort((a, b) => cards.indexOf(a) - cards.indexOf(b));
    } else {
      cards.sort((a, b) => {
        const priceA = Number(a.dataset.price);
        const priceB = Number(b.dataset.price);
        return value === 'low' ? priceA - priceB : priceB - priceA;
      });
    }
    cards.forEach((card) => listingsContainer.appendChild(card));
  });
}

// ---------- Wishlist toggle ----------
document.querySelectorAll('.wishlist').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});

// ---------- Buy now: prefill the quote form and scroll to it ----------
document.querySelectorAll('.buy-btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    const carName = button.dataset.car;
    const firstInput = document.querySelector('#quote-form input[type="text"]');
    if (carName && firstInput) {
      firstInput.value = carName;
    }
  });
});
