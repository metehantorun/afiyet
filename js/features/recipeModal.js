// ============================================================
// FEATURES LAYER — recipeModal.js
// Yemek planı için tarif seçim modal yönetimi.
// SRS: FR-18, FR-19
// ============================================================

function getRecipesForSlot(type, slotIndex) {
  if (type === 'breakfast') return recipes.filter(r => r.cat === 'Kahvaltı');
  if (type === 'dinner') {
    const filtersBySlot = {
      0: r => r.cat === 'Çorba',
      1: r => ['Et Yemekleri', 'Sebze', 'Makarna'].includes(r.cat),
      2: r => r.cat === 'Tatlı',
    };
    return recipes.filter(filtersBySlot[slotIndex] || (() => true));
  }
  return recipes.filter(r => r.cat !== 'Kahvaltı'); 
}

function openRecipeModal(day, type, slotIndex) {
  modalContext = { day, type, slotIndex };
  modalAllRecipes = getRecipesForSlot(type, slotIndex);

  const slotLabel = type === 'dinner' ? DINNER_LABELS[slotIndex] : MEAL_LABELS[type];
  document.getElementById('modalTitle').textContent = `${slotLabel} — Tarif Seç`;

  const currentMeal = mealPlan[day][type][slotIndex];
  document.getElementById('modalClearBtn').style.display = (currentMeal && currentMeal.n) ? 'block' : 'none';

  document.getElementById('modalSearch').value = '';
  renderModalRecipes(modalAllRecipes);
  document.getElementById('recipeModal').style.display = 'flex';
  setTimeout(() => document.getElementById('modalSearch').focus(), 100);
}

function renderModalRecipes(list) {
  const container = document.getElementById('modalRecipeList');
  if (list.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:32px 20px;color:var(--text-muted);font-size:13px">Eşleşen tarif bulunamadı</div>`;
    return;
  }
  container.innerHTML = list.map(r => `
    <div class="modal-recipe-row" onclick="selectMealFromModal(${r.id})">
      <div class="mr-emoji">${r.emoji}</div>
      <div class="mr-info">
        <div class="mr-name">${r.name}</div>
        <div class="mr-meta">⏱ ${r.time} dk · ⭐ ${r.rating} · ${r.ingredients.length} malzeme</div>
      </div>
      <span class="mr-badge">${r.cat}</span>
    </div>`).join('');
}

function filterModalRecipes(query) {
  if (!query.trim()) { renderModalRecipes(modalAllRecipes); return; }
  const q = query.toLocaleLowerCase('tr-TR');
  renderModalRecipes(modalAllRecipes.filter(r =>
    r.name.toLocaleLowerCase('tr-TR').includes(q) ||
    r.ingredients.some(i => i.n.toLocaleLowerCase('tr-TR').includes(q))
  ));
}

function selectMealFromModal(recipeId) {
  const { day, type, slotIndex } = modalContext;
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;
  assignMealToSlot(day, type, slotIndex, recipe);
  closeRecipeModal();
}

function pickRandomMeal() {
  if (modalAllRecipes.length === 0) return;
  const recipe = modalAllRecipes[Math.floor(Math.random() * modalAllRecipes.length)];
  const { day, type, slotIndex } = modalContext;
  assignMealToSlot(day, type, slotIndex, recipe);
  closeRecipeModal();
}

function assignMealToSlot(day, type, slotIndex, recipe) {
  mealPlan[day][type][slotIndex] = { n: recipe.name, e: recipe.emoji };
  syncShoppingWithPantry();
  renderPlan(document.getElementById('mainContent'));
  showToast(`✅ ${recipe.name} plana eklendi`);
  saveAppState();
}

function clearMealSlot() {
  const { day, type, slotIndex } = modalContext;
  mealPlan[day][type][slotIndex] = null;
  closeRecipeModal();
  syncShoppingWithPantry();
  renderPlan(document.getElementById('mainContent'));
  showToast('🗑 Slot temizlendi');
  saveAppState();
}

function closeRecipeModal() {
  document.getElementById('recipeModal').style.display = 'none';
  modalContext = null;
}

function closeModal(event) {
  if (event.target === document.getElementById('recipeModal')) closeRecipeModal();
}
