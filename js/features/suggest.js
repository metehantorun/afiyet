// ============================================================
// FEATURES LAYER — suggest.js
// Malzeme tabanlı tarif öneri motoru.
// SRS: FR-11, FR-12, FR-13, FR-14
// Tasarım Deseni: Strategy (sıralama kriteri)
// ============================================================

function scoreRecipeByIngredients(recipe) {
  const have = ingredientTags.map(t => t.toLowerCase());
  const need = recipe.ingredients.map(i => i.n.toLowerCase());
  const matched = need.filter(n => have.some(h => n.includes(h) || h.includes(n))).length;
  return { recipe, matched, missing: need.length - matched };
}

function computeSuggestions() {
  if (ingredientTags.length === 0) return [];
  return recipes
    .map(scoreRecipeByIngredients)
    .filter(s => s.matched > 0)
    .filter(s => suggestFilterCat === 'all' || s.recipe.cat === suggestFilterCat)
    .filter(s => s.missing <= suggestMaxMissing)
    .sort((a, b) => b.matched !== a.matched ? b.matched - a.matched : a.missing - b.missing);
}

function setSuggestFilterCat(v) {
  suggestFilterCat = v || 'all';
  renderSuggest(document.getElementById('mainContent'));
  saveAppState();
}

function setSuggestMaxMissing(n) {
  suggestMaxMissing = Number.isFinite(n) ? n : 99;
  renderSuggest(document.getElementById('mainContent'));
  saveAppState();
}

function addTag() {
  const inp = document.getElementById('ingInput');
  const val = inp.value.trim();
  if (val && !ingredientTags.includes(val) && ingredientTags.length < 20) {
    ingredientTags.push(val);
    inp.value = '';
    renderSuggest(document.getElementById('mainContent'));
    saveAppState();
  }
}

function removeTag(i) {
  ingredientTags.splice(i, 1);
  renderSuggest(document.getElementById('mainContent'));
  saveAppState();
}

function renderSuggest(container) {
  const suggestions = computeSuggestions();
  const allCats = [...new Set(recipes.map(r => r.cat))].sort();

  container.innerHTML = `
    <div class="suggest-input-area">
      <div class="suggest-view-title">🥕 Elimdeki Malzemelerle Ne Pişirebilirim?</div>
      <div class="ingredient-tags">
        ${ingredientTags.length === 0
          ? '<span style="color:var(--text-muted);font-size:13px">Malzeme ekleyerek başlayın...</span>'
          : ingredientTags.map((t, i) => `
              <div class="ing-tag">${t}
                <button type="button" class="rm" onclick="removeTag(${i})">×</button>
              </div>`).join('')}
      </div>
      <div class="suggest-input-row">
        <input type="text" id="ingInput"
          placeholder="Malzeme adı yazın (örn: domates, soğan...)"
          onkeydown="if(event.key==='Enter') addTag()">
        <button type="button" class="suggest-btn" onclick="addTag()">+ Ekle</button>
      </div>
      ${ingredientTags.length > 0 ? renderSuggestFilters(allCats) : ''}
    </div>
    ${renderSuggestionResults(suggestions)}
  `;
}

function renderSuggestFilters(allCats) {
  const catOptions = allCats.map(c =>
    `<option value="${c}" ${suggestFilterCat === c ? 'selected' : ''}>${c}</option>`
  ).join('');
  const missOptions = [99,0,1,2,3,4,5].map(n =>
    `<option value="${n}" ${suggestMaxMissing === n ? 'selected' : ''}>${n === 99 ? 'Sınır yok' : n === 0 ? '0 (tam eşleşme)' : n}</option>`
  ).join('');
  return `
    <div class="suggest-filters">
      <label class="suggest-filter-lbl">Kategori
        <select class="suggest-filter-select" onchange="setSuggestFilterCat(this.value)">
          <option value="all" ${suggestFilterCat === 'all' ? 'selected' : ''}>Tümü</option>
          ${catOptions}
        </select>
      </label>
      <label class="suggest-filter-lbl">En fazla eksik
        <select class="suggest-filter-select" onchange="setSuggestMaxMissing(parseInt(this.value,10))">
          ${missOptions}
        </select>
      </label>
    </div>`;
}

function renderSuggestionResults(suggestions) {
  if (ingredientTags.length === 0)
    return emptyState('🧺', 'Elinizdekileri ekleyin,<br>sistem en uygun tarifleri önerecek!');
  if (suggestions.length === 0)
    return emptyState('🧩', '<strong>Bu filtrelerle tarif yok.</strong><br>Filtreleri değiştirmeyi deneyin.');
  return `
    <div class="section-header">
      <span class="section-title">Öneriler (${suggestions.length} tarif)</span>
      <span style="font-size:13px;color:var(--text-muted)">${ingredientTags.length} malzeme</span>
    </div>
    <div class="recipe-grid">
      ${suggestions.map(s => recipeCard(s.recipe, true, s.missing)).join('')}
    </div>`;
}
