// ============================================================
// UI LAYER — navigation.js
// Navigasyon sekme/sidebar vurgulama ve view değiştirme (SRP).
// ============================================================

function clearNavHighlights() {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.sidebar .sidebar-item').forEach(s => s.classList.remove('active'));
}

function applyLoadedViewToChrome() {
  clearNavHighlights();
  if (currentView === 'favorites') {
    document.querySelector('.sidebar-item[data-view="favorites"]')?.classList.add('active');
    return;
  }
  document.querySelector(`.nav-tab[data-view="${currentView}"]`)?.classList.add('active');
  if (currentView === 'home') {
    const key = activeCategory === 'all' ? 'all' : activeCategory;
    document.querySelector(`.sidebar-item[data-cat="${key}"]`)?.classList.add('active');
  }
}

function switchView(view, btn) {
  currentView = view;
  clearNavHighlights();
  if (btn) btn.classList.add('active');
  closeDetail();
  render();
  saveAppState();
}

function filterCat(cat, btn) {
  activeCategory = cat;
  currentView = 'home';
  buildFilteredRecipes();
  clearNavHighlights();
  if (btn) btn.classList.add('active');
  document.querySelector('.nav-tab')?.classList.add('active');
  render();
  saveAppState();
}
