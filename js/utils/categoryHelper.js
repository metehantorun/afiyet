// ============================================================
// UTILS LAYER — categoryHelper.js
// Malzeme adından kiler kategorisini tahmin eden yardımcı.
// ============================================================

function guessCategoryByName(name) {
  const n = normalizeIngredientName(name);
  if (/kıyma|köfte|tavuk|et|dana|balık|sosis|göğüs|hindi/.test(n))           return 'Et & Protein';
  if (/süt|yoğurt|peynir|tereyağ|kaymak|krema|kaşar|lor|mozzarella/.test(n)) return 'Süt Ürünleri';
  if (/mercimek|nohut|bulgur|pirinç|un|fasulye|makarna|erişte|tarhana/.test(n)) return 'Bakliyat & Tahıl';
  if (/domates|biber|soğan|patates|havuç|sarımsak|limon|salata|kabak|patlıcan/.test(n)) return 'Sebze & Meyve';
  return 'Diğer';
}
