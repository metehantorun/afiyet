// ============================================================
// FEATURES LAYER — pantry.js
// Kiler (evdeki malzeme stok) yönetimi ve render.
// SRS: FR-20
// ============================================================

function renderPantry(container) {
  const categoriesInUse = [...new Set(pantryItems.map(i => i.cat))];
  container.innerHTML = `
    <div class="section-header">
      <span class="section-title">📦 Kilerim (Evdeki Malzemeler)</span>
      <span style="font-size:13px;color:var(--text-muted)">${pantryItems.length} ürün</span>
    </div>
    ${renderPantryAddForm()}
    ${pantryItems.length === 0
      ? emptyState('📦', 'Kiler boş.<br>Yukarıdan malzeme ekleyerek başlayın.')
      : `<div class="pantry-grid">${categoriesInUse.map(renderPantryCategory).join('')}</div>`}
  `;
}

function renderPantryAddForm() {
  return `
    <div class="suggest-input-area" style="margin-bottom:24px;padding:16px">
      <div class="suggest-view-title" style="font-size:13.5px;margin-bottom:12px;color:var(--primary)">➕ Yeni Malzeme Ekle</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <input type="text" id="pantryName" placeholder="Malzeme (örn: Domates)"
          style="flex:2;min-width:140px;border:0.5px solid var(--border);border-radius:8px;padding:8px 12px;outline:none;background:var(--bg)">
        <input type="number" id="pantryAmt" placeholder="Miktar" min="0"
          style="flex:1;min-width:80px;border:0.5px solid var(--border);border-radius:8px;padding:8px 12px;outline:none;background:var(--bg)">
        <select id="pantryUnit" style="flex:1;min-width:80px;border:0.5px solid var(--border);border-radius:8px;padding:8px;outline:none;background:var(--bg)">
          <option value="adet">adet</option><option value="g">g</option><option value="kg">kg</option>
          <option value="ml">ml</option><option value="L">litre</option><option value="paket">paket</option>
        </select>
        <select id="pantryCat" style="flex:2;min-width:120px;border:0.5px solid var(--border);border-radius:8px;padding:8px;outline:none;background:var(--bg)">
          <option value="Sebze & Meyve">Sebze & Meyve</option>
          <option value="Bakliyat & Tahıl">Bakliyat & Tahıl</option>
          <option value="Süt Ürünleri">Süt Ürünleri</option>
          <option value="Et & Protein">Et & Protein</option>
          <option value="Diğer">Diğer</option>
        </select>
        <button class="suggest-btn" onclick="addPantryItem()" style="padding:0 20px">Ekle</button>
      </div>
    </div>`;
}

function renderPantryCategory(category) {
  const items = pantryItems.filter(i => i.cat === category);
  return `
    <div class="pantry-category">
      <div class="shop-cat-header" style="margin-top:10px">${category}</div>
      ${items.map(renderPantryItem).join('')}
    </div>`;
}

function renderPantryItem(item) {
  const index = pantryItems.indexOf(item);
  return `
    <div class="pantry-item">
      <div class="pantry-info">
        <span class="pantry-name">${item.n}</span>
        <div style="display:flex;align-items:center;gap:6px;margin-top:2px">
          <input type="number" class="pantry-amount-input" value="${item.a}" min="0"
            onchange="updatePantryAmount(${index}, this.value)"
            onclick="event.stopPropagation()">
          <span style="font-size:12px;color:var(--text-muted)">${item.u}</span>
        </div>
      </div>
      <div class="pantry-ctrls">
        <button onclick="removePantryItem(${index})" title="Sil"
          style="color:#e74c3c;border-color:#fcebeb;background:#fdf2f2">🗑</button>
      </div>
    </div>`;
}

function addPantryItem() {
  const name   = document.getElementById('pantryName').value.trim();
  const amount = parseFloat(document.getElementById('pantryAmt').value);
  const unit   = document.getElementById('pantryUnit').value;
  const cat    = document.getElementById('pantryCat').value;

  if (!name || isNaN(amount) || amount <= 0) {
    showToast('⚠️ Lütfen geçerli bir isim ve miktar girin!'); return;
  }

  const existing = findPantryItem(name, unit);
  if (existing) {
    existing.a += amount;
    showToast(`✅ ${name} miktarı güncellendi!`);
  } else {
    pantryItems.push({ n: name, a: amount, u: unit, cat });
    showToast(`✅ ${name} kilere eklendi!`);
  }

  syncShoppingWithPantry();
  renderPantry(document.getElementById('mainContent'));
}

function updatePantryAmount(index, rawValue) {
  const value = parseFloat(rawValue);
  if (isNaN(value) || value < 0) { showToast('⚠️ Geçersiz miktar'); return; }
  if (value === 0) {
    if (confirm(`"${pantryItems[index].n}" miktarı 0. Ürünü silmek ister misiniz?`)) {
      pantryItems.splice(index, 1);
    } else { renderPantry(document.getElementById('mainContent')); return; }
  } else {
    pantryItems[index].a = value;
  }
  syncShoppingWithPantry();
  renderPantry(document.getElementById('mainContent'));
}

function removePantryItem(index) {
  const item = pantryItems[index];
  if (!confirm(`"${item.n}" kilere kaydını silmek istediğinize emin misiniz?`)) return;
  pantryItems.splice(index, 1);
  syncShoppingWithPantry();
  renderPantry(document.getElementById('mainContent'));
  showToast('🗑️ Malzeme silindi');
}

function findPantryItem(name, unit) {
  return pantryItems.find(i =>
    normalizeIngredientName(i.n) === normalizeIngredientName(name) && i.u === unit
  );
}

function buildPantryStockMap() {
  const stock = {};
  pantryItems.forEach(item => {
    const c = toCanonical(item.n, item.a, item.u);
    const key = c.n + '|' + c.dim;
    stock[key] = (stock[key] || 0) + c.v;
  });
  return stock;
}

function mergeIngredientIntoPantry(name, amount, rawUnit) {
  const unit = normalizeUnit(rawUnit);
  const cat  = guessCategoryByName(name);
  const existing = pantryItems.find(i =>
    normalizeIngredientName(i.n) === normalizeIngredientName(name) && normalizeUnit(i.u) === unit
  );
  if (existing) existing.a += amount;
  else pantryItems.push({ n: name.trim(), a: amount, u: unit, cat });
}

function removeIngredientFromPantry(name, amount, rawUnit) {
  const unit = normalizeUnit(rawUnit);
  const idx = pantryItems.findIndex(i =>
    normalizeIngredientName(i.n) === normalizeIngredientName(name) && normalizeUnit(i.u) === unit
  );
  if (idx === -1) return;
  pantryItems[idx].a -= amount;
  if (pantryItems[idx].a <= 0.0001) pantryItems.splice(idx, 1);
}
