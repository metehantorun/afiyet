// ============================================================
// CORE LAYER — state.js
// Singleton uygulama durumu ve kalıcılık (persist) yönetimi.
// Tasarım Deseni: Singleton (tek state nesnesi)
// SRS: NFR-kalıcılık
// ============================================================

let favorites       = new Set();
let activeCategory  = 'all';
let currentView     = 'home';
let portions        = {};
let shoppingItems   = JSON.parse(JSON.stringify(initialShoppingItems));
let mealPlan        = JSON.parse(JSON.stringify(initialMealPlan));
let ingredientTags  = [];
let filteredRecipes = [...recipes];
let activeDetailTab = 'ingredients';
let searchQuery     = '';
let suggestFilterCat    = 'all';   
let suggestMaxMissing   = 99;      
let modalContext    = null;        
let modalAllRecipes = [];
let pantryItems     = JSON.parse(JSON.stringify(initialPantryItems));

function saveAppState() {
  try {
    localStorage.setItem(APP_STATE_KEY, JSON.stringify({
      favorites: [...favorites], shoppingItems, mealPlan, pantryItems,
      portions, ingredientTags, activeCategory, currentView,
      searchQuery, suggestFilterCat, suggestMaxMissing,
    }));
  } catch (_) { }
}

function loadAppState() {
  try {
    const raw = localStorage.getItem(APP_STATE_KEY);
    if (!raw) return false;
    const s = JSON.parse(raw);
    if (!s || typeof s !== 'object') return false;

    if (Array.isArray(s.favorites))      favorites      = new Set(s.favorites);
    if (Array.isArray(s.shoppingItems))  shoppingItems  = s.shoppingItems;
    if (Array.isArray(s.pantryItems))    pantryItems    = s.pantryItems;
    if (Array.isArray(s.ingredientTags)) ingredientTags = s.ingredientTags;
    if (s.mealPlan  && typeof s.mealPlan  === 'object') mealPlan = s.mealPlan;
    if (s.portions  && typeof s.portions  === 'object') portions = s.portions;
    if (typeof s.activeCategory    === 'string') activeCategory    = s.activeCategory;
    if (typeof s.searchQuery       === 'string') searchQuery       = s.searchQuery;
    if (typeof s.suggestFilterCat  === 'string') suggestFilterCat  = s.suggestFilterCat;
    if (typeof s.suggestMaxMissing === 'number' && s.suggestMaxMissing >= 0)
      suggestMaxMissing = s.suggestMaxMissing;
    if (typeof s.currentView === 'string' && VALID_VIEWS.includes(s.currentView))
      currentView = s.currentView;
    return true;
  } catch (_) { return false; }
}
