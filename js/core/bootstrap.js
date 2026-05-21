// ============================================================
// CORE LAYER — bootstrap.js
// Uygulama başlatma (init) sırası.
// Tüm modüller yüklendikten sonra çalışır.
// ============================================================

loadAppState();
buildFilteredRecipes();
applyLoadedViewToChrome();

const searchInputEl = document.getElementById('searchInput');
if (searchInputEl) searchInputEl.value = searchQuery;

updateShopBadge();
updateFavBadge();
render();

window.addEventListener('beforeunload', saveAppState);
