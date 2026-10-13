export interface AnimationStep {
  id: string;
  target: string;
  trigger: "Mount (Otomatik)" | "Tap / Tıklama" | "Sürükleme (Drag / Wheel)" | "Zamanlayıcı (Timer)" | "State Değişimi";
  delayMs?: number;
  durationMs: number | string;
  easing: string;
  properties: string[];
  description: string;
  codeSnippet?: string;
}

export interface ScreenAnimationSpec {
  pageId: string;
  title: string;
  category: string;
  summary: string;
  totalDurationMs?: number | string;
  framework: string;
  gpuAccelerated: boolean;
  steps: AnimationStep[];
  microInteractions?: {
    name: string;
    durationMs: number | string;
    details: string;
  }[];
  notes?: string[];
}

export const ANIMATION_SPECS: Record<string, ScreenAnimationSpec> = {
  "splash-screen": {
    pageId: "splash-screen",
    title: "Splash Screen",
    category: "Açılış / Karşılama",
    summary:
      "Fizik tabanlı düşüş (physics drop) ve çarpışma rezonansına sahip hero DOİ logosu, bağımsız ve seyrek aralıklı mikro harf titreşimleri (D, O, İ), kademeli (staggered) başlık ve buton girişleri.",
    totalDurationMs: "1,850 ms (Giriş) + 8.0s / 8.8s / 9.5s (Ayrık Harf Döngüleri)",
    framework: "Framer Motion (motion.div / motion.button / motion.g)",
    gpuAccelerated: true,
    steps: [
      {
        id: "logo-letter-jiggle",
        target: "DOİ Harfleri Bağımsız Mikro Titreşim (D - O - İ)",
        trigger: "Mount (Otomatik)",
        delayMs: 2600,
        durationMs: "450 ms (8.0s - 9.5s aralıklı döngü)",
        easing: "easeInOut (repeat: Infinity)",
        properties: [
          "Harf 'D': rotate [0, -2.5°, 2.5°, 0], x [-1.5px, 1.5px, 0] (her 8.0s, pivot 50% 60%)",
          "Harf 'İ': rotate [0, -3.0°, 3.0°, 0] (her 8.8s, pivot 50% 90%)",
          "Harf 'O': rotate [0, 2.5°, -2.5°, 0], scale [1, 1.025, 0.985, 1] (her 9.5s, pivot center)",
          "Ayrık başlangıç gecikmeleri (D: 2.6s, O: 5.0s, İ: 7.4s) ile asla aynı anda titremez",
        ],
        description:
          "Arka plan ambient ışığı kaldırılarak logonun dinamizmini koruyan, göz yormayan, birbirinden bağımsız ve seyrek aralıklı harf titreşimleri uygulandı.",
        codeSnippet: `transition={{ duration: 8.0, repeat: Infinity, delay: 2.6, times: [0, 0.015, ..., 0.09, 1] }}`,
      },
      {
        id: "hero-drop",
        target: "Hero Vektör Logo (D-O-İ Harfleri & İllüstrasyon)",
        trigger: "Mount (Otomatik)",
        delayMs: 150,
        durationMs: "750 ms",
        easing: "Spring (stiffness: 260, damping: 20)",
        properties: [
          "y: -180px → 0px",
          "scale: 0.85 → 1.0",
          "opacity: 0 → 1",
        ],
        description:
          "Doğal yerçekimi hissi veren yaylı fizik düşüşü (overshoot olmadan yumuşak iniş).",
        codeSnippet: `transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}`,
      },
      {
        id: "hero-wobble",
        target: "Logo Titreşimi / Rezonans (Wobble)",
        trigger: "Mount (Otomatik)",
        delayMs: 400,
        durationMs: "500 ms",
        easing: "easeOut",
        properties: ["rotate: [0deg, -3deg, 2deg, -1deg, 0deg]"],
        description:
          "Yere çarptıktan sonra nesnenin kütle dengesini bulma hissi veren mikro açısal salınım.",
      },
      {
        id: "headline-in",
        target: "Başlık ('Yeni Nesil Kütüphaneye Hoş Geldin!')",
        trigger: "Mount (Otomatik)",
        delayMs: 950,
        durationMs: "650 ms",
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        properties: ["y: 32px → 0px", "opacity: 0 → 1"],
        description:
          "Logo oturduktan hemen sonra aşağıdan yukarıya pürüzsüz yumuşak giriş (ease-out quint).",
        codeSnippet: `transition={{ duration: 0.65, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}`,
      },
      {
        id: "btn-start-in",
        target: "Birincil Buton ('Hadi Başlayalım')",
        trigger: "Mount (Otomatik)",
        delayMs: 1150,
        durationMs: "550 ms",
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        properties: ["y: 28px → 0px", "opacity: 0 → 1"],
        description:
          "Kademeli (stagger) akışın ilk adımı, başlığın 200ms ardından sahneye gelir.",
      },
      {
        id: "btn-login-in",
        target: "İkincil Buton ('Giriş Yap')",
        trigger: "Mount (Otomatik)",
        delayMs: 1300,
        durationMs: "550 ms",
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        properties: ["y: 28px → 0px", "opacity: 0 → 1"],
        description:
          "Kademeli akışın son adımı, ana butondan 150ms sonra transparan cam efektiyle belirir.",
      },
    ],
    microInteractions: [
      {
        name: "Buton Dokunma (Tap Feedback)",
        durationMs: "150 ms",
        details: "whileTap={{ scale: 0.98 }} ile parmak basıldığında anında %2 küçülme ve haptic tepki.",
      },
      {
        name: "Yeniden Oynat (Replay Trigger)",
        durationMs: "Anlık",
        details: "Sağ üstteki replay butonu veya logoya dokunulduğunda tüm timeline sıfırdan tetiklenir.",
      },
    ],
    notes: [
      "Tüm elemanlar GPU donanım hızlandırmalı transform (translate3d) ile 60/120 FPS akıcı render edilir.",
      "Status bar 30px boş yer tutucu güvenli alanı korunur.",
    ],
  },

  "areas-of-interest": {
    pageId: "areas-of-interest",
    title: "İlgi Alanları",
    category: "Kişiselleştirme / Tercihler",
    summary:
      "Aşağıdan yukarıya kademeli (staggered) giriş yapan dinamik eğimli (tilt) ve farklı boyutlu ilgi alanı hapları. Seçilmemiş kutuya basıldığında dokunsal titreme (shake) ve turuncu dolgu geçişi.",
    totalDurationMs: "900 ms (Giriş) + 380 ms (Titreme)",
    framework: "Framer Motion",
    gpuAccelerated: true,
    steps: [
      {
        id: "staggered-entrance",
        target: "Koleksiyon Kartları Girişi",
        trigger: "Mount (Otomatik)",
        delayMs: 0,
        durationMs: "600 ms",
        easing: "Spring (stiffness: 300, damping: 24)",
        properties: [
          "y: 60px → 0px (her eleman index * 60ms gecikmeli)",
          "opacity: 0 → 1",
          "scale: 0.92 → 1.0",
        ],
        description:
          "Kelimelerin aşağıdan yukarıya şelale (cascade) şeklinde akarak yerleşmesi.",
      },
      {
        id: "tactile-shake",
        target: "Kutu Seçimi & Titreme Efekti (Tactile Shake)",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "380 ms",
        easing: "easeOut",
        properties: [
          "x: [0, -5px, 5px, -4px, 4px, -2px, 2px, 0]",
          "Haptic dokunsal geri bildirim",
        ],
        description:
          "Kullanıcı seçilmemiş bir kutuya dokunduğunda kutu hafifçe titreyerek seçili hale gelir.",
        codeSnippet: `animate={{ x: isTriggered ? [0, -5, 5, -4, 4, -2, 2, 0] : 0 }}\ntransition={{ duration: 0.38, ease: "easeOut" }}`,
      },
      {
        id: "color-toggle",
        target: "Renk ve Tick İkon Geçişi",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "220 ms",
        easing: "easeOut",
        properties: [
          "backgroundColor: #FFFFFF → #EF4823",
          "color: #111111 → #FFFFFF",
          "checkmark scale: 0 → 1.1 → 1.0",
        ],
        description:
          "Kutunun beyaz default halinden DOİ turuncusuna geçişi ve onay tikinin belirip oturması.",
      },
    ],
    microInteractions: [
      {
        name: "Hafif Eğim (Dynamic Tilt)",
        durationMs: "Statik / GPU",
        details: "-3° ile +4° arasında değişen organik açılarla dergi ve kitap kapağı kolaj hissi verilir.",
      },
      {
        name: "Alt Buton 'Devam Et'",
        durationMs: "150 ms",
        details: "Seçim yapıldığında buton canlı turuncu olarak aktifleşir.",
      },
    ],
    notes: [
      "Başlık üzerinde 30px safe-area boşluğu bırakılmıştır.",
      "Alt tarafta pürüzsüz degrade maske (fade mask) ile akıcı liste bitimi sağlanır.",
    ],
  },

  "interested-content-types": {
    pageId: "interested-content-types",
    title: "İçerik Türleri",
    category: "Seçim / Dairesel Carousel",
    summary:
      "Kutuların bükülmediği, daima ön yüzden göründüğü silindirik dikey carousel yapısı. Merkezdeki kart %100 ölçekte ve odakta, uzaklaşanlar açı, ölçek ve opaklık derinliğiyle arkaya döner.",
    totalDurationMs: "Sürekli Etkileşimli (Touch/Wheel)",
    framework: "Framer Motion (Pan / Drag Gesture)",
    gpuAccelerated: true,
    steps: [
      {
        id: "vertical-carousel-wheel",
        target: "Dikey Silindirik Carousel (Wheel Stack)",
        trigger: "Sürükleme (Drag / Wheel)",
        delayMs: 0,
        durationMs: "350 ms (Snap Süresi)",
        easing: "Spring (stiffness: 350, damping: 30)",
        properties: [
          "Merkez Kart: scale(1.0), opacity: 1.0, zIndex: 30",
          "Komşu Kartlar: scale(0.85), opacity: 0.65, y: ±85px",
          "Uzak Kartlar: scale(0.70), opacity: 0.30, y: ±150px",
          "backface-visibility: hidden (bükülme yok, ön yüz sabit)",
        ],
        description:
          "Kutular fiziksel olarak katlanmaz veya bükülmez; arkaya doğru dönerek derinlik ve şeffaflık farkıyla dairesel akış hissi yaratır.",
      },
      {
        id: "box-selection-toggle",
        target: "Kutu Tıklama & Seçim Geçişi",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "200 ms",
        easing: "easeInOut",
        properties: [
          "Seçilince: bg-white → bg-[#EF4823], text-black → text-white",
          "Tekrar basılınca: bg-[#EF4823] → bg-white (Default)",
          "whileTap: scale(0.97)",
        ],
        description:
          "Carousel içerisindeki herhangi bir kutuya dokunulduğunda turuncuya döner, tekrar tıklandığında beyaz default haline geri döner.",
      },
    ],
    microInteractions: [
      {
        name: "Aralık Genişletme (Generous Spacing)",
        durationMs: "Layout",
        details: "Kutular arası mesafe açılmış, başlık ile alt buton arasına mükemmel dikey ortalanmıştır.",
      },
    ],
    notes: [
      "Başlığın üstüne 30px safe-area boşluğu entegre edilmiştir.",
    ],
  },

  "contents": {
    pageId: "contents",
    title: "Önerilen İçerikler",
    category: "Galeri / Öneri Izgarası",
    summary:
      "16 farklı kitap, podcast ve belgesel örneğinden oluşan 2 sütunlu grid. Kare (1:1) thumbnail'lar, 4px net kart boşluğu ve dış kenarlık onay tiki animasyonu.",
    totalDurationMs: "600 ms (Staggered Grid)",
    framework: "Framer Motion",
    gpuAccelerated: true,
    steps: [
      {
        id: "grid-stagger",
        target: "16 İçerik Kartı Girişi",
        trigger: "Mount (Otomatik)",
        delayMs: 0,
        durationMs: "350 ms",
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        properties: [
          "y: 20px → 0px (her eleman index * 35ms gecikmeli)",
          "opacity: 0 → 1",
        ],
        description:
          "Sayfa açıldığında 16 kart kademeli bir şekilde aşağıdan yukarıya pürüzsüzce belirir.",
      },
      {
        id: "checkbox-tick",
        target: "Dış Kenarlık Checkmark (Tick) Belirme",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "180 ms",
        easing: "Spring (stiffness: 400, damping: 25)",
        properties: [
          "scale: 0 → 1.15 → 1.0",
          "opacity: 0 → 1",
          "border: 2px solid #EF4823",
        ],
        description:
          "Kare thumbnail'ın sağ üstünde, dış kenarlığa oturtulmuş onay tikinin pop efektiyle görünmesi.",
      },
    ],
    microInteractions: [
      {
        name: "4px Kart Aralığı (Precise Spacing)",
        durationMs: "CSS Grid",
        details: "Kartlar arası boşluk Figma spesifikasyonuna uygun olarak tam 4px olarak ayarlanmıştır.",
      },
    ],
    notes: [
      "Başlık üzerinde 30px safe-area boşluğu bulunmaktadır.",
    ],
  },

  "personalization": {
    pageId: "personalization",
    title: "Kişiselleştirme Animasyonu",
    category: "Yükleme & Hazırlık Süreci",
    summary:
      "Canlı ve net kütüphane mozaik kapak arka planı üzerinde, %0'dan %100'e soldan sağa dolarak turuncuya bürünen modern ilerleme kapsülü ve dönen yükleme ikonu.",
    totalDurationMs: "2,800 ms (İlerleme) + 600 ms (Geçiş)",
    framework: "Framer Motion + React Timer",
    gpuAccelerated: true,
    steps: [
      {
        id: "linear-progress-fill",
        target: "Soldan Sağa Dolan Turuncu Kapsül Dolgusu",
        trigger: "Zamanlayıcı (Timer)",
        delayMs: 0,
        durationMs: "2,800 ms (28ms x 100 adım)",
        easing: "linear",
        properties: [
          "width: 0% → 100%",
          "background: linear-gradient(to right, #EF4823, #FF5C35)",
        ],
        description:
          "Her 28ms'de %1 artan sayaç ile senkronize şekilde turuncu katman soldan sağa kesintisiz dolar.",
        codeSnippet: `style={{ width: \`\${progress}%\` }}\ntransition={{ ease: "linear", duration: 0.05 }}`,
      },
      {
        id: "counter-tick",
        target: "Yüzde Sayacı (%0 → %100)",
        trigger: "Zamanlayıcı (Timer)",
        delayMs: 0,
        durationMs: "2,800 ms",
        easing: "Linear Counter",
        properties: ["Sayım: %0, %1, ... %100", "font-mono, font-bold"],
        description:
          "Dolan dolgunun üzerinde her daim ortalanmış, net beyaz tipografi.",
      },
      {
        id: "spinner-rotation",
        target: "Dönen Çark İkonu (Loader Spinner)",
        trigger: "Mount (Otomatik)",
        delayMs: 0,
        durationMs: "1,000 ms (Sonsuz Döngü)",
        easing: "linear",
        properties: ["rotate: 0deg → 360deg"],
        description:
          "Yüzde rakamının yanında kesintisiz dönen akıcı yükleme animasyonu.",
      },
      {
        id: "completion-handshake",
        target: "Tamamlanma & Sayfa Geçişi",
        trigger: "State Değişimi",
        delayMs: 600,
        durationMs: "250 ms",
        easing: "easeOut",
        properties: ["scale: 1.02", "Ekran Geçişi: PersonalizationDoneScreen"],
        description:
          "%100 değerine ulaşıldıktan sonra 600ms beklenir ve 'Kişiselleştirme Tamamlandı' ekranına pürüzsüz geçilir.",
      },
    ],
    microInteractions: [
      {
        name: "Yeniden Başlatma (Restart on Click)",
        durationMs: "Anlık",
        details: "Kapsüle tıklandığında veya sağ üstteki butonla ilerleme sıfırlanıp baştan doldurulabilir.",
      },
    ],
    notes: [
      "Arka plan için Figma'dan çıkarılan tertemiz mozaik kapak gridi (mosaic-background-clean.png) kullanılmıştır; silik/hayalet metin içermez.",
    ],
  },

  "personalization-done": {
    pageId: "personalization-done",
    title: "Kişiselleştirme Tamamlandı",
    category: "Sonuç / Üyelik Çağrısı",
    summary:
      "Üst yarısında canlı mozaik kapakların net göründüğü, alt yarısında yumuşak degrade ile koyulaşan alanda 'DOİ'ye üye olmaya hazır mısın?' çağrısı ve iki adet 292px kapsül buton.",
    totalDurationMs: "450 ms (Giriş)",
    framework: "Framer Motion",
    gpuAccelerated: true,
    steps: [
      {
        id: "content-fade-up",
        target: "Alt Metin Grubu & Butonlar",
        trigger: "Mount (Otomatik)",
        delayMs: 100,
        durationMs: "400 ms",
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        properties: ["y: 20px → 0px", "opacity: 0 → 1"],
        description:
          "Sayfa açıldığında çağrı başlığı ve aksiyon butonları yumuşak bir yükselişle sahneye oturur.",
      },
      {
        id: "primary-button-tap",
        target: "Hemen Üye Ol Butonu (#EF4823)",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: ["scale: 0.98", "Gölge yoğunluğu değişimi"],
        description: "Sağ oklu turuncu birincil butona dokunma geri bildirimi.",
      },
      {
        id: "secondary-button-tap",
        target: "Üyeliksiz Devam Et Butonu (Buzlu Cam)",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: ["scale: 0.98", "backdrop-blur-md"],
        description: "Yarı saydam karanlık cam butona dokunma geri bildirimi.",
      },
    ],
    notes: [
      "Arka planda hiçbir blur filtresi yoktur; Atatürk, Suç ve Ceza, İlber Ortaylı gibi kapaklar kristal netliğindedir.",
      "Degrade katmanı: üstte rgba(17,17,17, 0.35), altta rgba(17,17,17, 0.95).",
    ],
  },

  "membership-plans": {
    pageId: "membership-plans",
    title: "Üyelik Planları",
    category: "Abonelik & Ödeme Seçimi",
    summary:
      "Arka planda blur(7.5px) lens bulanıklığına sahip renkli mozaik grid. 'Yıllık' planının daha yüksek kutu (py-7), 4px turuncu kenarlık ve turuncu fiyatla varsayılan öne çıkarıldığı, etkileşimli kart boyutu ve seçim animasyonu.",
    totalDurationMs: "200 ms (Kart Geçişi)",
    framework: "Framer Motion",
    gpuAccelerated: true,
    steps: [
      {
        id: "plan-card-resize",
        target: "Seçili Kart Dikey Boyut & Padding Animasyonu",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "200 ms",
        easing: "easeOut",
        properties: [
          "Seçilince: py-5 px-4 (150px yükseklik) → py-7 px-4.5 (185px yükseklik)",
          "Kenarlık: border-white/10 (1px) → border-[#EF4823] (4px)",
          "Gölge: shadow-2xl shadow-[#EF4823]/25",
          "Fiyat Rengi: #FFFFFF → #EF4823",
        ],
        description:
          "Kullanıcı 'Aylık' veya 'Yıllık' kutusuna dokunduğunda kart dikeyde uzayarak kalın turuncu çerçevesiyle öne çıkar.",
        codeSnippet: `transition={{ duration: 0.2, ease: "easeOut" }}`,
      },
      {
        id: "button-interactions",
        target: "Alt Butonlar (7 Günlük Deneme / Üye Olmadan Devam)",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: ["scale: 0.98"],
        description: "330px genişliğindeki her iki kapsül butonda dokunsal mikro basılma hissi.",
      },
    ],
    notes: [
      "Arka plan düz siyah değildir; blur(7.5px) ile kapakların kırmızı, yeşil ve mavi renkleri zengin bir derinlik verir.",
      "Geri butonu, plan kartları ve aksiyon butonları Figma #14203:145004 koordinatlarına birebir eşlenmiştir.",
    ],
  },

  "login": {
    pageId: "login",
    title: "Giriş Ekranı",
    category: "Kimlik Doğrulama",
    summary:
      "E-posta, şifre alanları ve sosyal medya girişleri (Apple, Google). Input odaklanma glow geçişleri ve şifremi unuttum modal/sayfa akışı.",
    totalDurationMs: "200 ms",
    framework: "Framer Motion + CSS Transitions",
    gpuAccelerated: true,
    steps: [
      {
        id: "input-focus-glow",
        target: "Girdi Alanı Odaklanma (Focus State)",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: ["border-color: #27272a → #EF4823", "ring: 1px #EF4823"],
        description: "Girdi kutusuna tıklandığında turuncu kenarlık yumuşakça belirir.",
      },
    ],
  },

  "forgot-password": {
    pageId: "forgot-password",
    title: "Şifremi Unuttum",
    category: "Kurtarma Adımları",
    summary:
      "3 aşamalı şifre sıfırlama adımları: E-posta girme, 6 haneli doğrulama kodu (OTP) ve yeni şifre belirleme.",
    totalDurationMs: "250 ms (Adım Geçişleri)",
    framework: "Framer Motion",
    gpuAccelerated: true,
    steps: [
      {
        id: "step-slide",
        target: "Adım Geçiş Animasyonu",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "250 ms",
        easing: "easeInOut",
        properties: ["x: 20px → 0px", "opacity: 0 → 1"],
        description: "Adımlar arası geçişlerde pürüzsüz yatay akış.",
      },
    ],
  },
};
