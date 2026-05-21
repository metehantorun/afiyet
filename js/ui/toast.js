// ============================================================
// UI LAYER — toast.js
// Toast bildirimi ve rozet güncelleme yardımcıları (SRP).
// ============================================================

function showToast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2400);
}

function updateFavBadge() {
  document.getElementById('favBadge').textContent = favorites.size;
}

function updateShopBadge() {
  const pending = shoppingItems.reduce(
    (sum, cat) => sum + cat.items.filter(i => !i.done).length, 0
  );
  document.getElementById('shopBadge').textContent = pending;
}
