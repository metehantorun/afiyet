// ============================================================
// FEATURES LAYER — home.js
// Ana sayfa (tarif grid) render.
// SRS: FR-05, FR-06
// ============================================================

function renderHome(container) {
  const title = activeCategory !== 'all' ? activeCategory : 'Tüm Tarifler';
  container.innerHTML = `
    <div class="section-header">
      <span class="section-title">${title}</span>
      <span style="font-size:13px;color:var(--text-muted)">${filteredRecipes.length} tarif</span>
    </div>
    <div class="categories">${categoryPills()}</div>
    ${filteredRecipes.length === 0
      ? emptyState('🔎', '<strong>Sonuç bulunamadı.</strong><br>Arama veya kategori filtresini değiştirin.')
      : `<div class="recipe-grid">${filteredRecipes.map(r => recipeCard(r)).join('')}</div>`}
  `;
}
