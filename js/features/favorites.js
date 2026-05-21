// ============================================================
// FEATURES LAYER — favorites.js
// Favori tarif yönetimi ve render.
// SRS: FR-10
// ============================================================

function renderFavorites(container) {
  const favRecipes = recipes.filter(r => favorites.has(r.id));
  container.innerHTML = `
    <div class="section-header">
      <span class="section-title">♥ Favorilerim</span>
      <span style="font-size:13px;color:var(--text-muted)">${favRecipes.length} tarif</span>
    </div>
    ${favRecipes.length === 0
      ? emptyState('💔', 'Henüz favori tarif yok.<br>Tarif kartlarındaki ♥ ikonuna tıklayın.')
      : `<div class="recipe-grid">${favRecipes.map(r => recipeCard(r)).join('')}</div>`}
  `;
}

function toggleFav(id, btn) {
  const isNowFav = !favorites.has(id);
  isNowFav ? favorites.add(id) : favorites.delete(id);
  if (btn) btn.classList.toggle('faved', isNowFav);
  showToast(isNowFav ? '♥ Favorilere eklendi' : 'Favorilerden çıkarıldı');
  updateFavBadge();
  if (currentView === 'favorites') renderFavorites(document.getElementById('mainContent'));
  saveAppState();
}
