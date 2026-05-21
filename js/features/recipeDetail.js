// ============================================================
// FEATURES LAYER — recipeDetail.js
// Tarif detay paneli, porsiyon ölçekleme ve alışveriş ekleme.
// SRS: FR-15 (malzeme listesi), FR-16 (porsiyon ölçekleme)
// ============================================================

function openDetail(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;
  portions[id] = portions[id] || recipe.servings;
  activeDetailTab = 'ingredients';
  const panel = document.getElementById('detailPanel');
  panel.style.display = 'flex';
  panel.style.flexDirection = 'column';
  renderDetailBody(recipe);
}

function renderDetailBody(recipe) {
  const portion = portions[recipe.id];
  const factor  = portion / recipe.servings;
  const heroBg  = catColors[recipe.cat] || '#f8f8f8';

  document.getElementById('detailBody').innerHTML = `
    <div class="recipe-hero" style="background:${heroBg}">${recipe.emoji}</div>
    <div class="detail-body">
      <div class="detail-name">${recipe.name}</div>
      <div class="detail-desc">${recipe.desc}</div>
      <div class="detail-stats">
        <div class="stat-box"><div class="stat-val">${recipe.time} dk</div><div class="stat-lbl">Pişirme</div></div>
        <div class="stat-box"><div class="stat-val">${recipe.ingredients.length}</div><div class="stat-lbl">Malzeme</div></div>
        <div class="stat-box"><div class="stat-val">⭐ ${recipe.rating}</div><div class="stat-lbl">Puan</div></div>
      </div>
      <div class="portions-row">
        <span class="portions-label">Porsiyon:</span>
        <div class="portions-ctrl">
          <button class="portions-btn" onclick="changePortion(${recipe.id},-1)">−</button>
          <span class="portions-val">${portion}</span>
          <button class="portions-btn" onclick="changePortion(${recipe.id},1)">+</button>
        </div>
        <span style="font-size:12px;color:var(--text-muted)">kişi</span>
      </div>
      <div class="detail-tabs">
        <button class="detail-tab ${activeDetailTab === 'ingredients' ? 'active' : ''}"
          onclick="switchDetailTab(${recipe.id},'ingredients')">🥕 Malzemeler</button>
        <button class="detail-tab ${activeDetailTab === 'steps' ? 'active' : ''}"
          onclick="switchDetailTab(${recipe.id},'steps')">📋 Yapılış</button>
      </div>
      ${activeDetailTab === 'ingredients'
        ? renderIngredientList(recipe.ingredients, factor)
        : renderStepList(recipe.steps)}
      <div class="action-btns">
        <button class="btn-primary" onclick="addToShop(${recipe.id})">🛒 Alışveriş Listesine Ekle</button>
        <button class="btn-secondary ${favorites.has(recipe.id) ? 'faved' : ''}"
          onclick="toggleFav(${recipe.id},this)"
          style="${favorites.has(recipe.id) ? 'color:#e74c3c' : ''}">♥</button>
      </div>
    </div>
  `;
}

function renderIngredientList(ingredients, factor) {
  return `
    <div class="detail-section-title">Malzeme Listesi</div>
    <ul class="ingredient-list">
      ${ingredients.map(i => `
        <li class="ingredient-item">
          <div class="ing-dot"></div>
          <span class="ing-name">${i.n}</span>
          <span class="ing-amount">${scaleAmount(i.a, i.u, factor)}</span>
        </li>`).join('')}
    </ul>`;
}

function renderStepList(steps) {
  return `
    <div class="detail-section-title">Yapılış Adımları</div>
    <ol class="steps-list">
      ${steps.map((step, i) => `
        <li class="step-item">
          <div class="step-num">${i + 1}</div>
          <span>${step}</span>
        </li>`).join('')}
    </ol>`;
}

function switchDetailTab(id, tab) {
  activeDetailTab = tab;
  renderDetailBody(recipes.find(r => r.id === id));
}

function changePortion(id, delta) {
  const recipe = recipes.find(r => r.id === id);
  portions[id] = Math.max(1, (portions[id] || recipe.servings) + delta);
  renderDetailBody(recipe);
  saveAppState();
}

function closeDetail() {
  document.getElementById('detailPanel').style.display = 'none';
}

function addToShop(id) {
  const recipe      = recipes.find(r => r.id === id);
  const scaleFactor = (portions[id] || recipe.servings) / recipe.servings;
  const requirements = {};
  accumulateIngredients(requirements, recipe.ingredients, scaleFactor);
  const newItems = buildShoppingLines(requirements);
  if (newItems.length === 0) {
    showToast(`✅ ${recipe.name}: Kilerdeki stok bu porsiyon için yeterli`);
    return;
  }
  shoppingItems.push({ cat: `🍽 ${recipe.name}`, items: newItems });
  updateShopBadge();
  showToast(`✅ ${recipe.name} için eksik malzemeler listeye eklendi`);
  saveAppState();
}
