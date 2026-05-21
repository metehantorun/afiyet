// ============================================================
// FEATURES LAYER — recipeFilter.js
// Tarif filtreleme ve arama mantığı.
// SRS: FR-05 (kategori filtresi), FR-06 (metin araması)
// ============================================================

function buildFilteredRecipes() {
  const byCategory = activeCategory === 'all'
    ? [...recipes]
    : recipes.filter(r => r.cat === activeCategory);

  const query = (searchQuery || '').trim().toLocaleLowerCase('tr-TR');
  filteredRecipes = query
    ? byCategory.filter(r =>
        r.name.toLocaleLowerCase('tr-TR').includes(query) ||
        r.cat.toLocaleLowerCase('tr-TR').includes(query)  ||
        r.ingredients.some(i => i.n.toLocaleLowerCase('tr-TR').includes(query))
      )
    : byCategory;
}

function handleSearch(query) {
  searchQuery = typeof query === 'string' ? query : '';
  buildFilteredRecipes();
  render();
  saveAppState();
}
