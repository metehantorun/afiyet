# AFİYET — Yemek & Tarif Planlayıcı

Marmara Üniversitesi, Bilgisayar Mühendisliği — Yazılım Mühendisliği dersi, **Grup 8** prototipi.

## README’nin amacı ve önemi

Bu dosya, projeyi ilk kez açan kişiye ne olduğunu, nasıl çalıştırılacağını ve hangi kapsamda geliştirildiğini özetler. Ekip içi iletişim, teslim ve sürüm paylaşımı için standart bir giriş noktasıdır.

## Proje tanımı

AFİYET, tarif keşfi, malzemeye göre öneri, tarif detayı ve porsiyon ölçekleme, haftalık yemek planı ve kiler stokuna göre eksik malzeme alışveriş listesi sunan istemci taraflı bir arayüz prototipidir. SRS/SDD’de tariflenen tam yığın (JWT, REST, veritabanı) bu sürümde bilinçli olarak yoktur; ders dokümanlarındaki hedef mimari ile bu repo ön yüz + yerel mantık düzeyindedir.

## Özellikler

- Tarif kartları, kategori filtreleri, arama
- Malzeme etiketleriyle öneri (eksik malzeme sayısı)
- Tarif detayı, porsiyon ölçekleme, favoriler
- Kiler (ev stoku) girişi; plan veya tek tıkla eklenen tarif listelerinde **kiler düşülerek** güncelleme
- Haftalık plan slotları ve plandan alışveriş üretimi
- Alışveriş satırlarında tamamlandı işaretleme; işaretlenenler kilere eklenir
- **FR-14 (kısmen):** Malzeme ile Ara ekranında tarif kategorisi ve “en fazla eksik malzeme” filtresi
- **FR-22 (kısmen):** Alışveriş listesini **.txt** indirme; **Yazdır** ile tarayıcıdan PDF kaydetme (Chrome “Hedef: PDF”)

## Kullanılan teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Ön yüz | HTML5, CSS3, vanilla JavaScript |
| Veri (örnek) | `data.js` içinde statik dizi yapıları |
| Sunucu / DB / API | Bu prototipte **yok** (SRS/SDD’deki Node/PostgreSQL/JWT ayrı bir tam sürüm için) |

## Kurulum

Sunucu gerekmez.

1. Depoyu veya zip’i bilgisayara alın.
2. `afiyet` klasöründeki **`index.html`** dosyasını modern bir tarayıcıda açın.

İsteğe bağlı yerel sunucu:

```bash
cd afiyet
npx --yes serve .
```

## Kullanım (kısa)

- **Ana sayfa:** tariflere göz atın, arayın, kategoriye filtreleyin.
- **Malzeme ile Ara:** malzeme ekleyin; öneriler sıralanır.
- **Kiler:** evdeki stoku girin; miktar değişince **plan ve “tariften ekle” ile oluşan alışveriş grupları** yeniden hesaplanır.
- **Yemek planı:** slota tıklayınca uygun tarif atanır; **Alışveriş Listesi Oluştur** ile kiler düşülerek liste üretilir.
- **Alışveriş:** satırları işaretleyerek ilerleyin; işaretlenen satırlar kilere eklenir.
- **Veri:** favoriler, kiler, plan, alışveriş listesi, porsiyonlar, malzeme etiketleri, **arama metni** ve öneri filtreleri tarayıcıda **`localStorage`** anahtarı `afiyet_v1` ile saklanır; sayfa yenilense de kalır. Sıfırlamak için tarayıcı geliştirici araçlarından bu anahtarı silin veya gizli pencerede açın.
- **Silme onayı:** kilerdeki bir satırı çöp kutusuyla silerken veya planı temizlerken tarayıcı **onay** penceresi sorulur.

## Katkı (Contribution)

1. `main` veya `develop` dalından dal açın.  
2. Anlamlı commit mesajları kullanın.  
3. Küçük, tek konulu değişiklikleri tercih edin.  
4. Pull request açıklamasında **ne / neden** yazın.


## Proje yapısı
js/
├── core/           ← Uygulama omurgası
│   ├── constants.js    (sabitler: DAY_KEYS, MEAL_TYPES vb.)
│   ├── state.js        (Singleton state + localStorage persist)
│   ├── router.js       (render router)
│   └── bootstrap.js    (init — en son yüklenir)
│
├── data/           ← Saf veri katmanı
│   ├── recipes.js      (35 tarif)
│   └── seedData.js     (catColors, başlangıç alışveriş/plan/kiler)
│
├── utils/          ← Teknik yardımcılar
│   ├── unitConverter.js (Adapter deseni — birim dönüşümü)
│   ├── dateHelper.js    (hafta hesaplama)
│   └── categoryHelper.js (malzeme kategorisi tahmini)
│
├── ui/             ← UI primitifleri
│   ├── toast.js         (toast + badge güncelleme)
│   ├── navigation.js    (tab/sidebar vurgulama, switchView)
│   └── components.js    (recipeCard, categoryPills, emptyState)
│
└── features/       ← Özellik modülleri (1 sorumluluk = 1 dosya)
    ├── home.js
    ├── recipeFilter.js  (FR-05, FR-06)
    ├── suggest.js       (FR-11–14, Strategy deseni)
    ├── pantry.js        (FR-20)
    ├── shopping.js      (FR-21–22, Facade + Observer deseni)
    ├── mealPlan.js      (FR-18–19)
    ├── recipeModal.js   (FR-18–19)
    ├── recipeDetail.js  (FR-15–16)
    └── favorites.js     (FR-10)


## SRS fonksiyonel gereksinim özeti 

| ID | Açıklama | Bu prototipte |
|----|----------|----------------|
| FR-01–04, FR-08–09, FR-23–24 | Kayıt, profil, içerik üretici, admin | Yok |
| FR-05–07, FR-10–13, FR-15–20 | Tarif, arama, detay, öneri, plan, otomatik liste (kiler ile) | Kısmen / Evet |
| FR-14 | Öneri filtreleri (kategori, max eksik) | Kısmen (sıralama var; ayrı filtre UI yok) |
| FR-21 | Listeyi düzenleme (ekle/çıkar/miktar) | Kısmen (yalnızca tamamlandı işareti) |
| FR-22 | PDF / metin dışa aktarma | Kısmen (düğme + bildirim; gerçek dosya yok) |

## Grup üyeleri

- Ahmet Gemici – 170423041  
- Berkant Ermiş – 170423852  
- Zeynep Sude Can – 100619047  
- Metehan Muhammed Torun – 170423016  

## GitHub bağlantısı



## Renk paleti (SDD)

- Birincil: `#FF6B35`  
- İkincil: `#004E89`  
- Arka plan: `#F7F6F2`
