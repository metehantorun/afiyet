// ============================================================
// DATA LAYER — seedData.js
// Uygulama başlangıç (seed) verileri. Yalnızca veri tanımı (SRP).
// ============================================================

const catColors = {
  'Çorba':       '#fff3ee',
  'Et Yemekleri':'#fff0f0',
  'Tatlı':       '#ffeef6',
  'Sebze':       '#eefff5',
  'Kahvaltı':    '#fffaee',
  'Makarna':     '#fff3ee',
  'Salata':      '#f0fff4',
};

const initialShoppingItems = [
  {
    cat: '🥦 Sebze & Meyve',
    items: [
      { n: 'Domates', a: '6 adet', done: false },
      { n: 'Yeşil biber', a: '4 adet', done: false },
      { n: 'Soğan', a: '3 adet', done: true }
    ]
  },
  {
    cat: '🥩 Et & Protein',
    items: [
      { n: 'Kıyma', a: '300 g', done: false },
      { n: 'Dana eti', a: '400 g', done: false }
    ]
  },
  {
    cat: '🥛 Süt Ürünleri',
    items: [
      { n: 'Süzme yoğurt', a: '400 g', done: true },
      { n: 'Süt', a: '1 litre', done: false },
      { n: 'Tereyağı', a: '150 g', done: false }
    ]
  },
  {
    cat: '🌾 Bakliyat & Tahıl',
    items: [
      { n: 'Kırmızı mercimek', a: '500 g', done: false },
      { n: 'Pirinç', a: '1 kg', done: false }
    ]
  }
];

const initialMealPlan = {
  Mon: { breakfast: [{ n: 'Menemen', e: '🍳' }, null, null], lunch: [null, null, null], dinner: [{ n: 'Mercimek Çorbası', e: '🍲' }, { n: 'Fettuccine Alfredo', e: '🍝' }, null] },
  Tue: { breakfast: [null, null, null], lunch: [{ n: 'Zeytinyağlı Fasulye', e: '🫘' }, null, null], dinner: [{ n: 'Ezogelin Çorbası', e: '🥣' }, { n: 'İskender Kebap', e: '🥩' }, { n: 'Sütlaç', e: '🍮' }] },
  Wed: { breakfast: [{ n: 'Pankek', e: '🥞' }, null, null], lunch: [null, null, null], dinner: [null, { n: 'Karnıyarık', e: '🍆' }, null] },
  Thu: { breakfast: [null, null, null], lunch: [{ n: 'Semizotu Salatası', e: '🥗' }, null, null], dinner: [null, null, null] },
  Fri: { breakfast: [{ n: 'Sucuklu Yumurta', e: '🥘' }, null, null], lunch: [{ n: 'Türlü', e: '🥘' }, null, null], dinner: [{ n: 'Tarhana Çorbası', e: '🥘' }, { n: 'Köfte Patates', e: '🧆' }, { n: 'Çikolatalı Sufle', e: '🍫' }] },
  Sat: { breakfast: [null, null, null], lunch: [null, null, null], dinner: [null, { n: 'Kıymalı Pide', e: '🥙' }, { n: 'Mozaik Pasta', e: '🍰' }] },
  Sun: { breakfast: [{ n: 'Mıhlama', e: '🧀' }, { n: 'Patatesli Yumurta', e: '🥔' }, null], lunch: [null, null, null], dinner: [null, null, null] },
};

const initialPantryItems = [
  { n: 'Kırmızı mercimek', a: 500,  u: 'g',  cat: 'Bakliyat & Tahıl' },
  { n: 'Pirinç',           a: 1000, u: 'g',  cat: 'Bakliyat & Tahıl' },
  { n: 'Bulgur',           a: 750,  u: 'g',  cat: 'Bakliyat & Tahıl' },
  { n: 'Nohut',            a: 250,  u: 'g',  cat: 'Bakliyat & Tahıl' },
  { n: 'Kuru Fasulye',     a: 400,  u: 'g',  cat: 'Bakliyat & Tahıl' },
];
