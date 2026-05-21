// ============================================================
// FEATURES LAYER — shopping.js
// Alışveriş listesi yönetimi, kiler-plan senkronizasyonu ve export.
// SRS: FR-21, FR-22
// Tasarım Deseni: Facade (syncShoppingWithPantry) — Observer (kiler → alışveriş + rozetler)
// ============================================================

function aggregatePlanRequirements() {
  const requirements = {};
  DAY_KEYS.forEach(day => {
    MEAL_TYPES.forEach(type => {
      const slots = mealPlan[day][type];
      if (!Array.isArray(slots)) return;
      slots.forEach(meal => {
        if (!meal || !meal.n) return;
        const recipe = recipes.find(r => r.name === meal.n);
        if (!recipe) return;
        accumulateIngredients(requirements, recipe.ingredients, 1);
      });
    });
  });
  return requirements;
}

function accumulateIngredients(requirements, ingredients, scaleFactor) {
  ingredients.forEach(ing => {
    const canonical = toCanonical(ing.n, ing.a * scaleFactor, ing.u);
    const key = canonical.n + '|' + canonical.dim;
    if (!requirements[key]) requirements[key] = { displayName: ing.n, total: 0, dim: canonical.dim };
    requirements[key].total += canonical.v;
  });
}

function buildShoppingLines(requirements) {
  const stock = buildPantryStockMap();
  return Object.values(requirements)
    .map(row => ({ ...row, toBuy: row.total - (stock[row.displayName.toLowerCase().replace(/\s+/g,' ') + '|' + row.dim] || 0) }))
    .filter(row => {
      const key = normalizeIngredientName(row.displayName) + '|' + row.dim;
      const atHome = stock[key] || 0;
      return (row.total - atHome) > 0.0001;
    })
    .map(row => {
      const key = normalizeIngredientName(row.displayName) + '|' + row.dim;
      const atHome = stock[key] || 0;
      return { n: row.displayName, a: formatAmount(row.total - atHome, row.dim), done: false };
    });
}

function getRequirementsForRecipeShoppingGroup(shoppingCategory) {
  const match = /^🍽\s+(.+)$/.exec(shoppingCategory.cat);
  if (!match) return null;
  const recipe = recipes.find(r => r.name === match[1].trim());
  if (!recipe) return null;
  const scaleFactor = (portions[recipe.id] || recipe.servings) / recipe.servings;
  const requirements = {};
  accumulateIngredients(requirements, recipe.ingredients, scaleFactor);
  return requirements;
}


function syncShoppingWithPantry() {
  syncPlanShoppingGroup();
  syncRecipeShoppingGroups();
  updateShopBadge();
  if (currentView === 'shopping') renderShopping(document.getElementById('mainContent'));
  saveAppState();
}

function syncPlanShoppingGroup() {
  const planIndex = shoppingItems.findIndex(cat => cat.cat === '📅 Haftalık Yemek Planı');
  if (planIndex === -1) return;
  const requirements = aggregatePlanRequirements();
  if (Object.keys(requirements).length === 0) { shoppingItems.splice(planIndex, 1); return; }
  const newItems = buildShoppingLines(requirements);
  newItems.length === 0 ? shoppingItems.splice(planIndex, 1) : (shoppingItems[planIndex].items = newItems);
}

function syncRecipeShoppingGroups() {
  for (let i = shoppingItems.length - 1; i >= 0; i--) {
    const requirements = getRequirementsForRecipeShoppingGroup(shoppingItems[i]);
    if (!requirements) continue;
    const newItems = buildShoppingLines(requirements);
    newItems.length === 0 ? shoppingItems.splice(i, 1) : (shoppingItems[i].items = newItems);
  }
}

function genShoppingFromPlan() {
  const requirements = aggregatePlanRequirements();
  if (Object.keys(requirements).length === 0) { showToast('⚠️ Planınızda hiç yemek yok!'); return; }

  const newItems = buildShoppingLines(requirements);
  shoppingItems = shoppingItems.filter(cat => cat.cat !== '📅 Haftalık Yemek Planı');

  if (newItems.length === 0) {
    showToast('✅ Tüm malzemeler kilerde mevcut!');
  } else {
    shoppingItems.push({ cat: '📅 Haftalık Yemek Planı', items: newItems });
    showToast('🛒 Liste kilerdeki ürünler düşülerek güncellendi!');
  }

  updateShopBadge();
  saveAppState();
  setTimeout(() => {
    currentView = 'shopping';
    clearNavHighlights();
    document.querySelector('.nav-tab[data-view="shopping"]')?.classList.add('active');
    render(); saveAppState();
  }, 700);
}

function renderShopping(container) {
  const total = shoppingItems.reduce((sum, cat) => sum + cat.items.length, 0);
  const done  = shoppingItems.reduce((sum, cat) => sum + cat.items.filter(i => i.done).length, 0);

  container.innerHTML = `
    <div class="section-header">
      <span class="section-title">🛒 Alışveriş Listesi</span>
      <div class="shop-actions">
        <button type="button" class="btn-primary"
          style="padding:7px 14px;font-size:12.5px;border-radius:20px;max-width:fit-content"
          onclick="exportShoppingListTxt()">📄 Metin (.txt)</button>
        <button type="button" class="btn-primary"
          style="padding:7px 14px;font-size:12.5px;border-radius:20px;max-width:fit-content;background:var(--secondary)"
          onclick="window.print()">🖨 Yazdır / PDF</button>
      </div>
    </div>
    ${total === 0
      ? emptyState('🛒',
          '<strong>Alışveriş listeniz boş.</strong><br>' +
          'Tarif detayından "Alışveriş Listesine Ekle" kullanın<br>' +
          'veya Yemek Planı → <em>Alışveriş Listesi Oluştur</em> butonuna tıklayın.')
      : `${shoppingItems.map((cat, ci) => renderShoppingCategory(cat, ci)).join('')}
         <div class="success-bar">
           ✅ ${done} / ${total} ürün alındı
           ${done === total && total > 0 ? ' — Tebrikler, alışveriş tamamlandı! 🎉' : ''}
         </div>`}
  `;
}

function renderShoppingCategory(category, categoryIndex) {
  return `
    <div class="shopping-category">
      <div class="shop-cat-header">${category.cat}</div>
      ${category.items.map((item, itemIndex) => renderShoppingItem(item, categoryIndex, itemIndex)).join('')}
    </div>`;
}

function renderShoppingItem(item, categoryIndex, itemIndex) {
  return `
    <div class="shop-item">
      <div class="shop-check ${item.done ? 'checked' : ''}"
        onclick="toggleShopItem(${categoryIndex},${itemIndex})">${item.done ? '✓' : ''}</div>
      <div class="shop-name ${item.done ? 'done' : ''}">${item.n}</div>
      <div class="shop-amount">${item.a}</div>
    </div>`;
}

function toggleShopItem(categoryIndex, itemIndex) {
  const item   = shoppingItems[categoryIndex].items[itemIndex];
  const parsed = parseAmountString(item.a);

  if (!parsed) { showToast('⚠️ Miktar okunamadı; kilere eklenemedi'); return; }

  if (!item.done) {
    mergeIngredientIntoPantry(item.n, parsed.amount, parsed.unit);
    item.done = true;
    showToast(`📦 ${item.n} kilere eklendi`);
  } else {
    removeIngredientFromPantry(item.n, parsed.amount, parsed.unit);
    item.done = false;
    showToast('↩️ İşaret kaldırıldı, kilerden düşüldü');
  }

  syncShoppingWithPantry();
  updateShopBadge();
}

function buildShoppingListText() {
  const header = ['AFİYET – Alışveriş listesi', `Tarih: ${new Date().toLocaleString('tr-TR')}`, '---', ''];
  const body = shoppingItems.flatMap(cat => [
    `## ${cat.cat}`,
    ...cat.items.map(it => `${it.done ? '[x]' : '[ ]'} ${it.n} — ${it.a}`),
    '',
  ]);
  return [...header, ...body].join('\n');
}

function exportShoppingListTxt() {
  const blob = new Blob([buildShoppingListText()], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `afiyet-alisveris-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  showToast('📄 Liste indirildi (.txt)');
}

function exportList() { exportShoppingListTxt(); }
