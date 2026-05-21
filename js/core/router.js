// ============================================================
// CORE LAYER — router.js
// Render Router — Component-Based mimari.
// Her view kendi render fonksiyonuna yönlendirilir.
// ============================================================

function render() {
  const container = document.getElementById('mainContent');
  const renderers = {
    home:      () => renderHome(container),
    suggest:   () => renderSuggest(container),
    pantry:    () => renderPantry(container),
    plan:      () => renderPlan(container),
    shopping:  () => renderShopping(container),
    favorites: () => renderFavorites(container),
  };
  renderers[currentView]?.();
}
