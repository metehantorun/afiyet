// ============================================================
// UTILS LAYER — unitConverter.js
// Birim Dönüşüm Modülü (Adapter Tasarım Deseni)
// Tarif birimleri (su bardağı, kaşık…) → kanonik birimler (g, ml, adet)
// Bu modül YALNIZCA birim işi yapar (SRP).
// ============================================================

function normalizeIngredientName(raw) {
  return (raw || '').toLocaleLowerCase('tr-TR').replace(/\s+/g, ' ').trim();
}

function normalizeUnit(raw) {
  const u = (raw || '').toLocaleLowerCase('tr-TR').trim();
  if (/^k(g|ilo(gram)?)$/.test(u)) return 'kg';
  if (/^g(r|ram)?$/.test(u))       return 'g';
  if (/^m(l|ililitre)$/.test(u))   return 'ml';
  if (/^l(t|itre|iter)?$/.test(u)) return 'L';
  if (/^a(det|dt)|tane$/.test(u))  return 'adet';
  if (u === 'paket')                return 'paket';
  return u;
}

function isLiquidIngredient(name) {
  return /süt|sut|yoğurt|yogurt|zeytinyağı|sıvı|çorba|sos/.test(name);
}


function toCanonical(name, amount, unitRaw) {
  const n = normalizeIngredientName(name);
  const u = (unitRaw || '').toLocaleLowerCase('tr-TR').trim();

  if (u === 'g')  return { n, v: amount,        dim: 'g'    };
  if (u === 'kg') return { n, v: amount * 1000,  dim: 'g'    };

  if (u === 'ml')                          return { n, v: amount,        dim: 'ml'   };
  if (/^l(t|itre|iter)?$/.test(u))         return { n, v: amount * 1000, dim: 'ml'   };

  if (/adet|diş|dis|paket|demet|kavanoz/.test(u)) return { n, v: amount, dim: 'adet' };

  if (/su bardağ/.test(u))  return { n, v: amount * 200, dim: isLiquidIngredient(n) ? 'ml' : 'g' };
  if (/çay bardağ/.test(u)) return { n, v: amount * 100, dim: 'g' };
  if (/tatlı kaşığ/.test(u)) {
    const isOil = /tereyağ|yağ|zeytin/.test(n);
    return { n, v: amount * (isOil ? 10 : 5), dim: 'g' };
  }
  if (/yemek kaşığ/.test(u)) {
    const isLiquid = /yağ|zeytin|süt|sıvı/.test(n);
    return { n, v: amount * 15, dim: isLiquid ? 'ml' : 'g' };
  }

  return { n, v: amount, dim: 'adet' };
}

function formatAmount(value, dim) {
  const round = v => Number.isInteger(v) ? v : parseFloat(v.toFixed(1));
  if (dim === 'g'  && value >= 1000) return `${round(value / 1000)} kg`;
  if (dim === 'ml' && value >= 1000) return `${round(value / 1000)} L`;
  if (dim === 'adet') return `${round(value)} adet`;
  return `${round(value)} ${dim}`;
}

function scaleAmount(amount, unit, factor) {
  const scaled = amount * factor;
  return `${Number.isInteger(scaled) ? scaled : parseFloat(scaled.toFixed(1))} ${unit}`;
}

function parseAmountString(amountString) {
  if (!amountString || typeof amountString !== 'string') return null;
  const match = /^([\d.,]+)\s+(.+)$/.exec(amountString.trim().toLocaleLowerCase('tr-TR'));
  if (!match) return null;
  const amount = parseFloat(match[1].replace(',', '.'));
  return (!Number.isNaN(amount) && amount >= 0) ? { amount, unit: match[2].trim() } : null;
}
