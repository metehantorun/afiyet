// ============================================================
// DATA LAYER — recipes.js
// Statik tarif veritabanı. Yalnızca veri tanımı içerir (SRP).
// ============================================================

const recipes = [
  {
    id: 1, name: 'Mercimek Çorbası', cat: 'Çorba', time: 25, servings: 4, emoji: '🍲', rating: 4.9,
    desc: 'Kırmızı mercimekten yapılan klasik Türk çorbası.',
    ingredients: [{ n: 'Kırmızı mercimek', a: 200, u: 'g' }, { n: 'Soğan', a: 1, u: 'adet' }, { n: 'Havuç', a: 1, u: 'adet' }, { n: 'Domates salçası', a: 1, u: 'tatlı kaşığı' }, { n: 'Tereyağı', a: 2, u: 'tatlı kaşığı' }, { n: 'Tuz', a: 1, u: 'tatlı kaşığı' }, { n: 'Kimyon', a: 0.5, u: 'tatlı kaşığı' }],
    steps: ['Sebzeleri kavurun.', 'Mercimeği ekleyip su ilave edin.', 'Pişince blenderdan geçirin.']
  },
  {
    id: 10, name: 'Ezogelin Çorbası', cat: 'Çorba', time: 30, servings: 4, emoji: '🥣', rating: 4.8,
    desc: 'Bol baharatlı, pirinç ve bulgurlu doyurucu Anadolu çorbası.',
    ingredients: [{ n: 'Kırmızı mercimek', a: 1, u: 'su bardağı' }, { n: 'Bulgur', a: 1, u: 'yemek kaşığı' }, { n: 'Pirinç', a: 1, u: 'yemek kaşığı' }, { n: 'Soğan', a: 1, u: 'adet' }, { n: 'Nane', a: 1, u: 'tatlı kaşığı' }],
    steps: ['Bakliyatları yıkayıp haşlayın.', 'Soğan ve salçayı kavurup ekleyin.', 'Baharatlarla lezzetlendirin.']
  },
  {
    id: 11, name: 'Yayla Çorbası', cat: 'Çorba', time: 20, servings: 4, emoji: '🥛', rating: 4.7,
    desc: 'Yoğurt ve nanenin ferahlatıcı uyumu.',
    ingredients: [{ n: 'Yoğurt', a: 2, u: 'su bardağı' }, { n: 'Pirinç', a: 0.5, u: 'çay bardağı' }, { n: 'Yumurta sarısı', a: 1, u: 'adet' }, { n: 'Nane', a: 1, u: 'yemek kaşığı' }, { n: 'Tereyağı', a: 1, u: 'yemek kaşığı' }],
    steps: ['Pirinçleri haşlayın.', 'Yoğurt ve yumurtayı çırpıp terbiye yapın.', 'Üzerine naneli tereyağı yakın.']
  },
  {
    id: 12, name: 'Domates Çorbası', cat: 'Çorba', time: 20, servings: 4, emoji: '🍅', rating: 4.6,
    desc: 'Köz tadında, kaşar peyniri eşliğinde servis edilen klasik.',
    ingredients: [{ n: 'Domates', a: 5, u: 'adet' }, { n: 'Un', a: 2, u: 'yemek kaşığı' }, { n: 'Süt', a: 1, u: 'su bardağı' }, { n: 'Tereyağı', a: 1, u: 'yemek kaşığı' }, { n: 'Kaşar peyniri', a: 50, u: 'g' }],
    steps: ['Unu yağda kavurun.', 'Domates rendesini ekleyip pişirin.', 'Sütü ekleyip blenderdan geçirin.']
  },
  {
    id: 13, name: 'Tarhana Çorbası', cat: 'Çorba', time: 15, servings: 4, emoji: '🥘', rating: 4.9,
    desc: 'Şifa deposu, geleneksel fermente Anadolu çorbası.',
    ingredients: [{ n: 'Toz tarhana', a: 4, u: 'yemek kaşığı' }, { n: 'Sarımsak', a: 2, u: 'diş' }, { n: 'Salça', a: 1, u: 'yemek kaşığı' }, { n: 'Tereyağı', a: 1, u: 'yemek kaşığı' }],
    steps: ['Tarhanayı suda çözdürün.', 'Salça ve sarımsağı kavurun.', 'Karıştırarak koyulaşana kadar pişirin.']
  },

  {
    id: 2, name: 'Kıymalı Pide', cat: 'Et Yemekleri', time: 40, servings: 6, emoji: '🥙', rating: 4.7,
    desc: 'Ev yapımı çıtır hamurlu pide.',
    ingredients: [{ n: 'Un', a: 500, u: 'g' }, { n: 'Kıyma', a: 300, u: 'g' }, { n: 'Soğan', a: 1, u: 'adet' }],
    steps: ['Hamuru yoğurun.', 'Harcı hazırlayın.', 'Fırınlayın.']
  },
  {
    id: 14, name: 'Karnıyarık', cat: 'Et Yemekleri', time: 50, servings: 4, emoji: '🍆', rating: 4.9,
    desc: 'Patlıcan ve kıymanın en lezzetli buluşması.',
    ingredients: [{ n: 'Patlıcan', a: 4, u: 'adet' }, { n: 'Kıyma', a: 250, u: 'g' }, { n: 'Soğan', a: 1, u: 'adet' }, { n: 'Sivri biber', a: 2, u: 'adet' }, { n: 'Domates', a: 2, u: 'adet' }],
    steps: ['Patlıcanları kızartın.', 'Kıymalı harcı hazırlayıp içine doldurun.', 'Fırında pişirin.']
  },
  {
    id: 15, name: 'Köfte Patates', cat: 'Et Yemekleri', time: 35, servings: 4, emoji: '🧆', rating: 4.8,
    desc: 'Anne eli değmiş gibi, klasik bir akşam yemeği.',
    ingredients: [{ n: 'Kıyma', a: 500, u: 'g' }, { n: 'Patates', a: 3, u: 'adet' }, { n: 'Galeta unu', a: 3, u: 'yemek kaşığı' }, { n: 'Soğan', a: 1, u: 'adet' }],
    steps: ['Köfteleri yoğurup şekil verin.', 'Patatesleri elma dilim doğrayın.', 'Fırında veya tavada pişirin.']
  },
  {
    id: 16, name: 'Tavuk Sote', cat: 'Et Yemekleri', time: 25, servings: 3, emoji: '🍗', rating: 4.5,
    desc: 'Renkli biberlerle hazırlanan pratik ve proteinli tarif.',
    ingredients: [{ n: 'Tavuk göğsü', a: 500, u: 'g' }, { n: 'Kırmızı biber', a: 1, u: 'adet' }, { n: 'Yeşil biber', a: 2, u: 'adet' }, { n: 'Mantar', a: 200, u: 'g' }],
    steps: ['Tavukları soteleyin.', 'Sebzeleri ekleyip yüksek ateşte çevirin.', 'Baharatlarını ekleyip servis edin.']
  },
  {
    id: 8, name: 'İskender Kebap', cat: 'Et Yemekleri', time: 50, servings: 4, emoji: '🥩', rating: 4.8,
    desc: "Bursa'nın meşhur kebabı.",
    ingredients: [{ n: 'Dana eti (döner)', a: 400, u: 'g' }, { n: 'Pide ekmeği', a: 2, u: 'adet' }],
    steps: ['Pideleri dizin.', 'Etleri pişirin.', 'Sos ve tereyağı ekleyin.']
  },

  {
    id: 4, name: 'Zeytinyağlı Fasulye', cat: 'Sebze', time: 60, servings: 4, emoji: '🫘', rating: 4.6,
    desc: 'Taze fasulye ile hafif bir Ege yemeği.',
    ingredients: [{ n: 'Taze fasulye', a: 500, u: 'g' }, { n: 'Soğan', a: 2, u: 'adet' }],
    steps: ['Fasulyeleri ayıklayın.', 'Zeytinyağında pişirin.']
  },
  {
    id: 17, name: 'Mücver', cat: 'Sebze', time: 30, servings: 4, emoji: '🥒', rating: 4.7,
    desc: 'Kabak, dereotu ve peynirin çıtır uyumu.',
    ingredients: [{ n: 'Kabak', a: 3, u: 'adet' }, { n: 'Yumurta', a: 2, u: 'adet' }, { n: 'Un', a: 3, u: 'yemek kaşığı' }, { n: 'Dereotu', a: 0.5, u: 'demet' }, { n: 'Beyaz peynir', a: 100, u: 'g' }],
    steps: ['Kabakları rendeleyip suyunu sıkın.', 'Tüm malzemeyi karıştırın.', 'Tavada kaşıkla dökerek kızartın.']
  },
  {
    id: 18, name: 'İmambayıldı', cat: 'Sebze', time: 50, servings: 4, emoji: '🍆', rating: 4.8,
    desc: 'Bol soğanlı ve sarımsaklı klasik zeytinyağlı patlıcan.',
    ingredients: [{ n: 'Patlıcan', a: 4, u: 'adet' }, { n: 'Soğan', a: 3, u: 'adet' }, { n: 'Sarımsak', a: 5, u: 'diş' }, { n: 'Zeytinyağı', a: 100, u: 'ml' }],
    steps: ['Patlıcanları alacalı soyup kızartın.', 'Soğanlı iç harcı hazırlayın.', 'Patlıcanları doldurup tencerede pişirin.']
  },
  {
    id: 19, name: 'Zeytinyağlı Enginar', cat: 'Sebze', time: 40, servings: 2, emoji: '🌿', rating: 4.6,
    desc: 'Garnitürlü, limonlu ve çok sağlıklı bir bahar yemeği.',
    ingredients: [{ n: 'Enginar', a: 4, u: 'adet' }, { n: 'Garnitür', a: 1, u: 'kavanoz' }, { n: 'Limon', a: 1, u: 'adet' }, { n: 'Dereotu', a: 0.5, u: 'demet' }],
    steps: ['Enginarları limonlu suda haşlayın.', 'Garnitürü üzerine yerleştirin.', 'Zeytinyağı ve sosla pişirin.']
  },
  {
    id: 20, name: 'Türlü', cat: 'Sebze', time: 45, servings: 5, emoji: '🥘', rating: 4.5,
    desc: 'Mevsim sebzelerinin güveçte muhteşem buluşması.',
    ingredients: [{ n: 'Patates', a: 2, u: 'adet' }, { n: 'Patlıcan', a: 1, u: 'adet' }, { n: 'Bamya', a: 100, u: 'g' }, { n: 'Taze fasulye', a: 100, u: 'g' }],
    steps: ['Sebzeleri küp doğrayın.', 'Salçalı su ile tencereye dizin.', 'Kısık ateşte pişirin.']
  },

  {
    id: 3, name: 'Sütlaç', cat: 'Tatlı', time: 45, servings: 6, emoji: '🍮', rating: 4.8,
    desc: 'Fırında pişirilmiş klasik Türk pirinç pudingi.',
    ingredients: [{ n: 'Pirinç', a: 100, u: 'g' }, { n: 'Süt', a: 1000, u: 'ml' }],
    steps: ['Pirinçleri haşlayın.', 'Sütle pişirip fırınlayın.']
  },
  {
    id: 21, name: 'Baklava', cat: 'Tatlı', time: 90, servings: 12, emoji: '🥐', rating: 4.9,
    desc: 'Kat kat hamur, bol fıstık ve tam kıvamında şerbet.',
    ingredients: [{ n: 'Baklavalık yufka', a: 1, u: 'paket' }, { n: 'Antep fıstığı', a: 200, u: 'g' }, { n: 'Tereyağı', a: 250, u: 'g' }, { n: 'Şeker', a: 3, u: 'su bardağı' }],
    steps: ['Yufkaları yağlayıp dizin.', 'Araya fıstık serpin.', 'Fırınlayıp sıcak şerbeti dökün.']
  },
  {
    id: 22, name: 'Mozaik Pasta', cat: 'Tatlı', time: 20, servings: 8, emoji: '🍰', rating: 4.7,
    desc: 'Pişirme gerektirmeyen, bisküvili ve çikolatalı çocukluk favorisi.',
    ingredients: [{ n: 'Pötibör bisküvi', a: 2, u: 'paket' }, { n: 'Kakaolu sos', a: 1, u: 'su bardağı' }, { n: 'Ceviz', a: 50, u: 'g' }],
    steps: ['Bisküvileri kırın.', 'Sosla karıştırın.', 'Buzlukta dondurup servis edin.']
  },
  {
    id: 23, name: 'Magnolia', cat: 'Tatlı', time: 30, servings: 4, emoji: '🍌', rating: 4.8,
    desc: 'Bebek bisküvisi, krema ve taze meyvelerle hafif bir kavanoz tatlısı.',
    ingredients: [{ n: 'Muz', a: 2, u: 'adet' }, { n: 'Süt', a: 500, u: 'ml' }, { n: 'Bisküvi', a: 1, u: 'paket' }, { n: 'Nişasta', a: 2, u: 'yemek kaşığı' }],
    steps: ['Muhallebiyi pişirin.', 'Bisküvileri ezin.', 'Meyvelerle kat kat dizin.']
  },
  {
    id: 9, name: 'Çikolatalı Sufle', cat: 'Tatlı', time: 30, servings: 4, emoji: '🍫', rating: 4.7,
    desc: 'İçi akışkan çikolatalı nefis sufle.',
    ingredients: [{ n: 'Bitter çikolata', a: 150, u: 'g' }, { n: 'Tereyağı', a: 100, u: 'g' }],
    steps: ['Çikolatayı eritin.', 'Yumurtayla karıştırıp fırınlayın.']
  },

  {
    id: 5, name: 'Menemen', cat: 'Kahvaltı', time: 15, servings: 2, emoji: '🍳', rating: 4.9,
    desc: 'Türk kahvaltısının tartışmasız klasiği.',
    ingredients: [{ n: 'Yumurta', a: 3, u: 'adet' }, { n: 'Domates', a: 2, u: 'adet' }],
    steps: ['Biberleri kavurun.', 'Domatesi ekleyip yumurtaları kırın.']
  },
  {
    id: 24, name: 'Sucuklu Yumurta', cat: 'Kahvaltı', time: 10, servings: 2, emoji: '🥘', rating: 4.9,
    desc: 'Baharatlı sucuk ve sahanda yumurta keyfi.',
    ingredients: [{ n: 'Sucuk', a: 100, u: 'g' }, { n: 'Yumurta', a: 2, u: 'adet' }, { n: 'Tereyağı', a: 1, u: 'yemek kaşığı' }],
    steps: ['Sucukları dilimleyip tavada çevirin.', 'Yumurtaları üzerine kırın.', 'Sıcak servis edin.']
  },
  {
    id: 25, name: 'Mıhlama', cat: 'Kahvaltı', time: 20, servings: 3, emoji: '🧀', rating: 4.9,
    desc: 'Karadeniz mutfağından uzayan peyniriyle meşhur lezzet.',
    ingredients: [{ n: 'Mısır unu', a: 3, u: 'yemek kaşığı' }, { n: 'Kolot peyniri', a: 200, u: 'g' }, { n: 'Tereyağı', a: 2, u: 'yemek kaşığı' }],
    steps: ['Tereyağında unu kavurun.', 'Suyu ekleyip peyniri ilave edin.', 'Peynir eriyip yağını salana kadar pişirin.']
  },
  {
    id: 26, name: 'Pankek', cat: 'Kahvaltı', time: 20, servings: 2, emoji: '🥞', rating: 4.7,
    desc: 'Bal veya çikolata ile servis edilen yumuşacık kahvaltılık.',
    ingredients: [{ n: 'Un', a: 1.5, u: 'su bardağı' }, { n: 'Süt', a: 1, u: 'su bardağı' }, { n: 'Yumurta', a: 1, u: 'adet' }, { n: 'Şeker', a: 2, u: 'yemek kaşığı' }],
    steps: ['Tüm malzemeyi pürüzsüzce çırpın.', 'Yağsız tavada arkalı önlü pişirin.']
  },
  {
    id: 27, name: 'Patatesli Yumurta', cat: 'Kahvaltı', time: 20, servings: 3, emoji: '🥔', rating: 4.6,
    desc: 'Küp doğranmış patateslerle doyurucu bir sahan lezzeti.',
    ingredients: [{ n: 'Patates', a: 2, u: 'adet' }, { n: 'Yumurta', a: 3, u: 'adet' }, { n: 'Zeytinyağı', a: 2, u: 'yemek kaşığı' }],
    steps: ['Patatesleri küp küp doğrayıp kızartın.', 'Yumurtaları üzerine çırpıp dökün.']
  },

  {
    id: 6, name: 'Fettuccine Alfredo', cat: 'Makarna', time: 20, servings: 3, emoji: '🍝', rating: 4.5,
    desc: 'Krema ve parmesanlı İtalyan klasiği.',
    ingredients: [{ n: 'Fettuccine', a: 300, u: 'g' }, { n: 'Krema', a: 200, u: 'ml' }],
    steps: ['Makarnayı haşlayın.', 'Sosla karıştırın.']
  },
  {
    id: 28, name: 'Spaghetti Bolognese', cat: 'Makarna', time: 30, servings: 4, emoji: '🍝', rating: 4.8,
    desc: 'Zengin kıymalı ve domates soslu geleneksel makarna.',
    ingredients: [{ n: 'Spaghetti', a: 500, u: 'g' }, { n: 'Kıyma', a: 200, u: 'g' }, { n: 'Domates sosu', a: 1, u: 'su bardağı' }, { n: 'Soğan', a: 1, u: 'adet' }],
    steps: ['Kıymalı sosu hazırlayın.', 'Makarnayı haşlayın.', 'Sosla harmanlayıp servis edin.']
  },
  {
    id: 29, name: 'Penne Arrabbiata', cat: 'Makarna', time: 20, servings: 3, emoji: '🌶️', rating: 4.6,
    desc: 'Acı sevenler için sarımsaklı ve acı biberli İtalyan sosu.',
    ingredients: [{ n: 'Penne', a: 300, u: 'g' }, { n: 'Domates', a: 3, u: 'adet' }, { n: 'Acı süs biberi', a: 2, u: 'adet' }, { n: 'Sarımsak', a: 2, u: 'diş' }],
    steps: ['Acı sosu hazırlayın.', 'Makarnaları al dente haşlayın.', 'Sosta çevirip servis edin.']
  },
  {
    id: 30, name: 'Mantı', cat: 'Makarna', time: 60, servings: 4, emoji: '🥟', rating: 5.0,
    desc: 'Sarımsaklı yoğurt ve salçalı soslu el açması Kayseri mantısı.',
    ingredients: [{ n: 'Mantı (Hazır veya El açması)', a: 500, u: 'g' }, { n: 'Yoğurt', a: 1, u: 'su bardağı' }, { n: 'Sarımsak', a: 2, u: 'diş' }, { n: 'Tereyağı', a: 1, u: 'yemek kaşığı' }],
    steps: ['Mantıları haşlayın.', 'Üzerine sarımsaklı yoğurt dökün.', 'Kızdırılmış yağlı sosu gezdirin.']
  },
  {
    id: 31, name: 'Pesto Soslu Makarna', cat: 'Makarna', time: 15, servings: 2, emoji: '🌿', rating: 4.7,
    desc: 'Fesleğen, çam fıstığı ve zeytinyağlı tazeleyici bir lezzet.',
    ingredients: [{ n: 'Makarna', a: 250, u: 'g' }, { n: 'Pesto sos', a: 3, u: 'yemek kaşığı' }, { n: 'Çeri domates', a: 5, u: 'adet' }],
    steps: ['Makarnayı haşlayıp süzün.', 'Sıcakken pesto sosla karıştırın.']
  },

  {
    id: 7, name: 'Yoğurtlu Semizotu Salatası', cat: 'Salata', time: 10, servings: 3, emoji: '🥗', rating: 4.4,
    desc: 'Sarımsaklı yoğurtlu taze salata.',
    ingredients: [{ n: 'Semizotu', a: 300, u: 'g' }, { n: 'Süzme yoğurt', a: 200, u: 'g' }],
    steps: ['Yoğurdu karıştırın.', 'Semizotuyla harmanlayın.']
  },
  {
    id: 32, name: 'Çoban Salatası', cat: 'Salata', time: 15, servings: 4, emoji: '🥗', rating: 4.8,
    desc: 'Domates, salatalık ve soğanın en doğal hali.',
    ingredients: [{ n: 'Domates', a: 3, u: 'adet' }, { n: 'Salatalık', a: 2, u: 'adet' }, { n: 'Yeşil biber', a: 2, u: 'adet' }, { n: 'Soğan', a: 1, u: 'adet' }],
    steps: ['Tüm sebzeleri küçük küpler halinde doğrayın.', 'Limon ve zeytinyağı ile soslayın.']
  },
  {
    id: 33, name: 'Sezar Salata', cat: 'Salata', time: 25, servings: 2, emoji: '🥗', rating: 4.6,
    desc: 'Izgara tavuk, kruton ekmek ve özel sosuyla doyurucu bir salata.',
    ingredients: [{ n: 'Marul', a: 1, u: 'adet' }, { n: 'Tavuk göğsü', a: 150, u: 'g' }, { n: 'Kruton ekmek', a: 1, u: 'avuç' }, { n: 'Sezar sos', a: 2, u: 'yemek kaşığı' }],
    steps: ['Tavukları ızgara yapın.', 'Marulları doğrayıp sosla karıştırın.', 'Tavuk ve ekmekleri üzerine dizin.']
  },
  {
    id: 34, name: 'Gavurdağı Salatası', cat: 'Salata', time: 20, servings: 4, emoji: '🥣', rating: 4.9,
    desc: 'Bol cevizli ve nar ekşili, kebapların vazgeçilmez eşlikçisi.',
    ingredients: [{ n: 'Domates', a: 4, u: 'adet' }, { n: 'Ceviz içi', a: 1, u: 'su bardağı' }, { n: 'Nar ekşisi', a: 2, u: 'yemek kaşığı' }, { n: 'Maydanoz', a: 0.5, u: 'demet' }],
    steps: ['Sebzeleri çok ince doğrayın.', 'Üzerine bol ceviz serpin.', 'Nar ekşili sosu dökün.']
  },
  {
    id: 35, name: 'Kısır', cat: 'Salata', time: 30, servings: 6, emoji: '🥗', rating: 5.0,
    desc: 'Altın günlerinin ve çay saatlerinin başrol oyuncusu.',
    ingredients: [{ n: 'İnce bulgur', a: 2, u: 'su bardağı' }, { n: 'Salça', a: 2, u: 'yemek kaşığı' }, { n: 'Taze soğan', a: 1, u: 'demet' }, { n: 'Nar ekşisi', a: 0.5, u: 'çay bardağı' }],
    steps: ['Bulguru sıcak suyla ıslatın.', 'Salçayla yoğurup yeşillikleri ekleyin.', 'Limon ve nar ekşisini dökün.']
  }
];
