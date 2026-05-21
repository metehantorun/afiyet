// ============================================================
// UI LAYER — components.js
// Ortak yeniden kullanılabilir UI bileşenleri (DRY prensibi).
// ============================================================

function recipeCard(recipe, showMissing = false, missingCount = 0) {
  const isFav = favorites.has(recipe.id);
  const bg    = catColors[recipe.cat] || '#f8f8f8';
  return `
    <div class="recipe-card" onclick="openDetail(${recipe.id})">
      <div class="recipe-img" style="background:${bg}">
        ${recipe.emoji}
        <button class="fav-btn ${isFav ? 'faved' : ''}"
          onclick="event.stopPropagation(); toggleFav(${recipe.id}, this)">♥</button>
      </div>
      <div class="recipe-body">
        <div class="recipe-cat">${recipe.cat}</div>
        <div class="recipe-name">${recipe.name}</div>
        <div class="recipe-meta">
          <span class="meta-item">⏱ ${recipe.time} dk</span>
          <span class="meta-item">⭐ ${recipe.rating}</span>
          ${showMissing ? `<span class="missing-tag">−${missingCount} malzeme</span>` : ''}
        </div>
      </div>
    </div>`;
}

function categoryPills() {
  return ['Tümü','Çorba','Et Yemekleri','Sebze','Tatlı','Kahvaltı','Makarna','Salata']
    .map(label => {
      const key = label === 'Tümü' ? 'all' : label;
      return `<span class="cat-pill ${activeCategory === key ? 'active' : ''}"
        onclick="filterCat('${key}', null)">${label}</span>`;
    }).join('');
}

function emptyState(emoji, message) {
  return `
    <div class="empty-state">
      <div class="big-emoji">${emoji}</div>
      <p>${message}</p>
    </div>`;
}
