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
    framework: "Framer Motion (motion.div / motion.button)",
    gpuAccelerated: true,
    steps: [
      {
        id: "staggered-entrance",
        target: "15 İlgi Alanı Kartı Kademeli Girişi",
        trigger: "Mount (Otomatik)",
        delayMs: 60,
        durationMs: "600 ms - 840 ms",
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        properties: [
          "opacity: 0 → 1, y: 480px → 0px",
          "rotate: 0° → item.rotation (-6° ile +4.8° organik tilt)",
          "Gecikme: 0.06s - 0.66s (sıra bazlı cascade)",
        ],
        description:
          "Sayfa açıldığında kartlar organik hız ve açılarla aşağıdan fırlayarak yerlerine oturur.",
        codeSnippet: `initial={{ opacity: 0, y: 480, rotate: 0 }}\nanimate={{ opacity: 1, y: 0, rotate: item.rotation }}\ntransition={{ duration: item.duration, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}`,
      },
      {
        id: "tactile-shake",
        target: "Kutu Seçimi & Dokunsal Titreme (Tactile Shake)",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "380 ms",
        easing: "easeInOut",
        properties: [
          "rotate: [0°, -3.5°, 3.5°, -2°, 2°, -1°, 1°, 0°]",
          "x: [0px, -3.5px, 3.5px, -2.5px, 2.5px, -1px, 1px, 0px]",
          "scale: [1.0, 1.04, 0.97, 1.02, 1.0]",
          "Dokunma anı: whileTap={{ scale: 0.94 }}",
        ],
        description:
          "Kullanıcı seçilmemiş bir kutuya dokunduğunda kutu açısal ve yatay olarak titreyerek canlı bir fiziksel geri bildirim verir.",
        codeSnippet: `animate={isShaking ? { rotate: [0, -3.5, 3.5, -2, 2, -1, 1, 0], x: [0, -3.5, 3.5, -2.5, 2.5, -1, 1, 0], scale: [1, 1.04, 0.97, 1.02, 1] } : { rotate: 0, x: 0, scale: 1 }}\ntransition={{ duration: 0.38, ease: "easeInOut" }}`,
      },
      {
        id: "color-toggle",
        target: "Seçim & Renk Değişimi (Selection State)",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "200 ms",
        easing: "easeOut",
        properties: [
          "Seçilince: bg-white → bg-[#EF4823], text-[#111111] → text-white",
          "Gölge: shadow-[0_2px_10px_rgba(0,0,0,0.03)] → shadow-md shadow-[#EF4823]/25",
          "Seçim kaldırılınca: bg-[#EF4823] → bg-white (titreme olmadan sakin dönüş)",
        ],
        description:
          "Seçilen kutu DOİ turuncusuna boyanır ve hafif sıcak bir gölgeyle öne çıkar. Tekrar basıldığında sakin bir geçişle seçimi iptal eder.",
      },
      {
        id: "cta-activation",
        target: "Alt Çubuk 'Devam' Butonu Aktivasyonu",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: [
          "Seçim < 3: opacity-60, text-[#777777] (Pasif)",
          "Seçim >= 3: opacity-100, text-[#111111] font-semibold hover:text-[#EF4823] (Aktif)",
        ],
        description:
          "En az 3 ilgi alanı seçildiğinde alt yüzen kontrol çubuğundaki 'Devam' aksiyonu canlı hale gelir.",
      },
    ],
    microInteractions: [
      {
        name: "Organik Eğim (Organic Tilt Angle)",
        durationMs: "Statik",
        details: "-5.5° ile +4.8° arasında değişen açılarla gazete ve dergi kupürü kolaj hissi verir.",
      },
      {
        name: "Yeniden Oynat (Replay Trigger)",
        durationMs: "Anlık",
        details: "Sağ üstteki geri sar butonu tüm staggered fırlama animasyonunu baştan oynatır.",
      },
    ],
    notes: [
      "Başlık üzerinde 30px safe-area boşluğu bırakılmıştır.",
      "Listede üstte 32px ve altta 74px pürüzsüz CSS mask degrade geçişi uygulanmıştır.",
    ],
  },

  "interested-content-types": {
    pageId: "interested-content-types",
    title: "İçerik Türleri",
    category: "Seçim / Dairesel Carousel",
    summary:
      "Kutuların bükülmediği, daima ön yüzden göründüğü katmanlı dikey carousel çarkı. Karta basıldığında yaylanarak merkeze oturma ve turuncu seçim geri bildirimi.",
    totalDurationMs: "Sürekli Etkileşimli (Gesture / Spring)",
    framework: "Framer Motion (animate / gesture)",
    gpuAccelerated: true,
    steps: [
      {
        id: "card-tap-recenter",
        target: "Karta Tıklama & Merkeze Yaylanarak Oturma",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "350 ms",
        easing: "Spring (stiffness: 360, damping: 28, mass: 0.8)",
        properties: [
          "Tıklanan kartın dikey konumu tam merkeze (k=offset) yay hareketiyle kayar",
          "Aynı anda toggleItem(id) tetiklenerek seçim durumu tersine çevrilir",
        ],
        description:
          "Kullanıcı liste içindeki herhangi bir karta dokunduğunda kart hızla merkeze kayar ve seçimi aktifleşir.",
        codeSnippet: `animate(offset, k, { type: "spring", stiffness: 360, damping: 28, mass: 0.8, onUpdate: (latest) => setOffset(latest) })`,
      },
      {
        id: "selection-visual-toggle",
        target: "Kutu Seçim Görseli & Onay İkonu",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "200 ms",
        easing: "easeOut",
        properties: [
          "Seçilince: bg-white → bg-[#EF4823], text-[#111111] → text-white",
          "İkon: text-[#EF4823] → text-white",
          "Sağ Kenar İkonu: CheckCircle2 (w-5 h-5 beyaz) anında görünür",
          "Gölge: shadow-[0_8px_25px_rgba(239,72,35,0.35)]",
          "Seçim kaldırılınca: bg-white, ikon #EF4823, checkmark gizlenir",
        ],
        description:
          "Kutu seçildiğinde canlı DOİ turuncusuna boyanır, ikon beyazlaşır ve sağ tarafına onay çemberi eklenir.",
      },
      {
        id: "vertical-carousel-drag",
        target: "Dikey Sürükleme & Momentum İnertia Snap",
        trigger: "Sürükleme (Drag / Wheel)",
        delayMs: 0,
        durationMs: "340 ms (Snap)",
        easing: "Spring (stiffness: 340, damping: 28, mass: 0.8)",
        properties: [
          "Hassasiyet: 62px dikey mesafe = 1 kart adımı",
          "Bırakıldığında: velocity * 75 momentumu hesaplanıp en yakın karta spring ile oturur",
          "Tekerlek (Wheel): ±1 adım ile yumuşak yay geçişi",
        ],
        description:
          "Kullanıcı parmağıyla veya fare tekerleğiyle dikey çarkı çevirebilir; bırakıldığında kartlar en yakın merkeze pürüzsüz yaylanır.",
      },
      {
        id: "depth-layering",
        target: "Derinlik Katmanları (Scale & Opacity Falloff)",
        trigger: "Sürükleme (Drag / Wheel)",
        delayMs: 0,
        durationMs: "Dinamik (Frame başı)",
        easing: "Linear / Transform",
        properties: [
          "Merkez Kart: scale(1.0), opacity: 1.0, zIndex: 50",
          "Uzaklaşan Kartlar: scale = max(0.72, 1 - absD * 0.075)",
          "Opaklık: |delta| < 1 için 1-0.12, |delta| < 2 için 0.88-0.28, uzaklar < 0.60",
          "Kartlar kesinlikle katlanmaz; düz bir ön yüz ile arkaya doğru süzülür",
        ],
        description:
          "Merkezden uzaklaşan kartlar arkaya doğru küçülerek ve silikleşerek doğal bir 3D derinlik oluşturur.",
      },
      {
        id: "cta-activation-types",
        target: "Alt Çubuk 'Devam' Butonu Aktivasyonu",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: [
          "Seçim < 3: opacity-60, text-[#777777]",
          "Seçim >= 3: opacity-100, text-[#111111] font-semibold hover:text-[#EF4823]",
        ],
        description: "En az 3 içerik türü seçildiğinde alttaki Devam butonu aktifleşir.",
      },
    ],
    microInteractions: [
      {
        name: "Touch-Action / Pointer Lock",
        durationMs: "Pointer Events",
        details: "Dikey sürükleme sırasında sayfanın yerinden oynamaması için touch-none ve pointer yakalama uygulanır.",
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
      "16 farklı kitap, podcast ve video içeriğinden oluşan liste. Kare kapaklar, sağ kenarlık onay tiki animasyonu ve dokunma geri bildirimi.",
    totalDurationMs: "600 ms (Giriş) + 200 ms (Seçim)",
    framework: "Framer Motion (motion.div)",
    gpuAccelerated: true,
    steps: [
      {
        id: "item-tap-feedback",
        target: "Karta Dokunma Geri Bildirimi",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "120 ms",
        easing: "easeOut",
        properties: ["whileTap={{ scale: 0.985 }}"],
        description: "Kullanıcı içerik kartına bastığında parmak altında hafifçe esner.",
      },
      {
        id: "item-selection-toggle",
        target: "Kart Seçim Durumu & Dış Kenarlık Onay Tiki",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "200 ms",
        easing: "easeOut",
        properties: [
          "Seçilince: border-[2px] border-[#EF4823], shadow-md shadow-[#EF4823]/10",
          "Onay Tiki: Sağ dış sınırda (absolute -right-[12px] top-1/2 -translate-y-1/2) 24px turuncu daire içinde beyaz tick belirir",
          "Seçim kaldırılınca: border-transparent, standart gölge, onay tiki kaybolur",
        ],
        description:
          "İçerik seçildiğinde kart çerçevesi turuncu olur ve Figma tasarımındaki gibi sağ kenarlık üzerine oturan turuncu onay rozeti çıkar.",
      },
      {
        id: "grid-stagger",
        target: "İçerik Kartları Sayfa Girişi",
        trigger: "Mount (Otomatik)",
        delayMs: 0,
        durationMs: "350 ms",
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        properties: [
          "opacity: 0 → 1, y: 16px → 0px",
          "4px net kart boşluğu ve üst/alt fade mask",
        ],
        description: "Sayfa açıldığında içerikler pürüzsüzce yüklenir.",
      },
      {
        id: "cta-activation-contents",
        target: "Alt Çubuk 'Devam' Butonu Aktivasyonu",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: [
          "Seçim < 3: opacity-60, text-[#777777]",
          "Seçim >= 3: opacity-100, text-[#111111] font-semibold hover:text-[#EF4823]",
        ],
        description: "En az 3 içerik seçildiğinde alttaki Devam butonu aktifleşir.",
      },
    ],
    microInteractions: [
      {
        name: "Tür İkonu Rozeti (Media Type Badge)",
        durationMs: "Statik",
        details: "Kapağın sağ dikey kenarında kitap için BookOpen, sesli kitap için Headphones, video için Play ikonu yer alır.",
      },
    ],
    notes: [
      "Başlık üzerinde 30px safe-area boşluğu bulunmaktadır.",
      "Listede üstte 24px, altta 64px pürüzsüz CSS degrade maske yer alır.",
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
    category: "Kimlik Doğrulama / Modal",
    summary:
      "Arka plandaki dev illüstrasyon üzerinde açılan yarı saydam buzlu cam modal kartı (Figma #14203:145541). Input odaklanma halkaları, buton basılma mikro animasyonu ve form gönderim yükleniyor durumu.",
    totalDurationMs: "300 ms (Modal Girişi) + 600 ms (Yükleme)",
    framework: "Framer Motion (motion.div / motion.button)",
    gpuAccelerated: true,
    steps: [
      {
        id: "modal-spring-entrance",
        target: "Giriş Modal Kartı Yaylanarak Giriş",
        trigger: "Mount (Otomatik)",
        delayMs: 0,
        durationMs: "300 ms",
        easing: "Spring (stiffness: 300, damping: 28)",
        properties: [
          "y: 40px → 0px, opacity: 0 → 1",
          "Arka plan: #111111/70 backdrop-blur-xl border border-white/10",
        ],
        description:
          "Giriş ekranı açıldığında koyu buzlu cam modal kartı aşağıdan yukarıya yaylanarak yerleşir.",
        codeSnippet: `initial={{ y: 40, opacity: 0 }}\nanimate={{ y: 0, opacity: 1 }}\ntransition={{ type: "spring", stiffness: 300, damping: 28 }}`,
      },
      {
        id: "input-focus-interaction",
        target: "Input Odaklanma (Focus Highlight)",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: [
          "focus:ring-2 focus:ring-[#EF4823]",
          "bg-[#EFEFEF] text-[#111111]",
        ],
        description: "Girdi alanlarına dokunulduğunda DOİ turuncusu odaklanma halkası yumuşakça belirir.",
      },
      {
        id: "submit-button-loading",
        target: "Devam Et Butonu & Giriş Yükleme Durumu",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "600 ms",
        easing: "easeOut",
        properties: [
          "Basılma: whileTap={{ scale: 0.98 }}",
          "Gönderim: Metin 'Giriş yapılıyor...' olarak güncellenir ve 600ms sonra yönlendirir",
        ],
        description: "Giriş butonuna tıklandığında dokunma geri bildirimi verilir ve form doğrulanır.",
      },
      {
        id: "close-button-tap",
        target: "Modal Kapatma & Geri Dönüş",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "120 ms",
        easing: "easeOut",
        properties: ["active:scale-95", "bg-white/15 → bg-white/25"],
        description: "Sağ üstteki yuvarlak çarpı butonuna basıldığında modal kapanarak karşılama ekranına döner.",
      },
    ],
    notes: [
      "Sosyal medya giriş butonları (Apple, Google, Facebook) ve 'Şifremi Unuttum' bağlantısı entegredir.",
    ],
  },

  "forgot-password": {
    pageId: "forgot-password",
    title: "Şifremi Unuttum",
    category: "Kurtarma Akışı (3 Adım)",
    summary:
      "3 aşamalı şifre sıfırlama adımları: 1. E-posta/Telefon talebi, 2. 6 haneli OTP kodu girme, 3. Yeni şifre belirleme. Adımlar arası yatay kayma ve otomatik input odaklanma.",
    totalDurationMs: "250 ms (Adım Geçişleri)",
    framework: "Framer Motion (AnimatePresence / motion.div)",
    gpuAccelerated: true,
    steps: [
      {
        id: "step-slide-transition",
        target: "Adımlar Arası Yatay Kayma Geçişi",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "250 ms",
        easing: "easeInOut",
        properties: [
          "Giriş: initial={{ opacity: 0, x: 15 }} → animate={{ opacity: 1, x: 0 }}",
          "Çıkış: exit={{ opacity: 0, x: -15 }}",
          "AnimatePresence mode='wait' ile sıralı geçiş",
        ],
        description: "Her adım tamamlandığında içerik soldan sağa pürüzsüzce kayarak yenilenir.",
      },
      {
        id: "otp-input-auto-advance",
        target: "6 Haneli OTP Kod Kutuları & Otomatik İlerleme",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: [
          "Hane girildiğinde: Otomatik olarak sonraki kutuya (otp-input-N+1) focus() yapılır",
          "Odaklanınca: border-[#EF4823], shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        ],
        description: "Kullanıcı her rakamı girdiğinde imleç bir sonraki kutuya otomatik atlar.",
      },
      {
        id: "virtual-keyboard-tap",
        target: "Ekran Klavyesi Tuş Dokunma Geri Bildirimi",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "100 ms",
        easing: "easeOut",
        properties: ["active:scale-90", "Haptic mikro basılma hissi"],
        description: "Alttaki iOS tarzı sanal klavye tuşlarına basıldığında hızlı dokunsal küçülme simülasyonu.",
      },
      {
        id: "button-tap-action",
        target: "Adım İlerleme Butonları (#EF4823)",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "120 ms",
        easing: "easeOut",
        properties: ["whileTap={{ scale: 0.98 }}", "hover:bg-[#ff5530]"],
        description: "Her adımdaki birincil turuncu aksiyon butonunda mikro basılma esnemesi.",
      },
    ],
    notes: [
      "Geri butonuna basıldığında mevcut adımdan bir önceki adıma döner, adım 1'de ise giriş ekranına yönlendirir.",
    ],
  },

  "register-non-konya": {
    pageId: "register-non-konya",
    title: "Kayıt Ol (Konya Dışı)",
    category: "Üyelik Formu & Doğrulama",
    summary:
      "Şehir seçimi, kişisel bilgiler, şifre kriterleri kontrolü ve iOS tarzı FaceID anahtarlama etkileşimine sahip kayıt formu.",
    totalDurationMs: "200 ms (Etkileşim Geçişleri)",
    framework: "Framer Motion + CSS Transitions",
    gpuAccelerated: true,
    steps: [
      {
        id: "city-selection-routing",
        target: "Şehir Seçimi & Dinamik Rota Yönlendirme",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: [
          "Bursa / İstanbul / Ankara seçildiğinde standart kayıt akışı korunur",
          "'Konya (Ücretsiz 1 Yıl)' seçildiğinde anında Konya Millet Kütüphanesi 1 Yıl Ücretsiz sayfasına yönlendirilir",
        ],
        description: "Şehir seçiminde Konya tercih edildiğinde sistem özel kütüphane avantaj akışını otomatik tetikler.",
      },
      {
        id: "faceid-switch-toggle",
        target: "Yüz Tanıma (FaceID) iOS Tarzı Toggle Switch",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "200 ms",
        easing: "easeInOut",
        properties: [
          "Aktif: bg-[#EF4823], Daire: translate-x-5",
          "Pasif: bg-zinc-300, Daire: translate-x-0",
          "duration-200 ease-in-out pürüzsüz kayma",
        ],
        description: "Kullanıcı yüz tanımayı açıp kapattığında düğme iOS native akıcılığında sağa/sola kayar.",
      },
      {
        id: "password-criteria-live",
        target: "Canlı Şifre Kriter Doğrulama",
        trigger: "State Değişimi",
        delayMs: 0,
        durationMs: "180 ms",
        easing: "easeOut",
        properties: [
          "Şart sağlandığında: CheckCircle2 ikonu ve metin #EF4823 turuncusuna boyanır",
          "Sağlanmadığında: CircleDashed ikonu ve text-zinc-400 olarak kalır",
        ],
        description: "Büyük harf, rakam, özel karakter ve 8 hane kriterleri gerçek zamanlı olarak renk değiştirir.",
      },
      {
        id: "form-submit-tap",
        target: "Devam Et Butonu (#EF4823)",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "120 ms",
        easing: "easeOut",
        properties: ["whileTap={{ scale: 0.98 }}", "shadow-xl shadow-[#EF4823]/25"],
        description: "Kayıt butonuna dokunulduğunda dokunsal basılma geri bildirimi.",
      },
    ],
    notes: [
      "Bölünmüş beyaz kart yapısı (divided card) ve form doğrulama kuralları Figma #14203:145619 ile tam uyumludur.",
    ],
  },

  "register-konyali-step4": {
    pageId: "register-konyali-step4",
    title: "Kayıt Ol (Konyalı - KMK Doğrulama)",
    category: "Kütüphane Entegrasyonu",
    summary:
      "Konya Millet Kütüphanesi 1 yıl ücretsiz üyelik doğrulama kartı. T.C. Kimlik / Doğum tarihi alanları odaklanma ve MERNİS / YÖK onay kutusu seçim animasyonları.",
    totalDurationMs: "150 ms (Seçim Geçişleri)",
    framework: "Framer Motion + CSS Transitions",
    gpuAccelerated: true,
    steps: [
      {
        id: "consent-checkbox-toggle",
        target: "MERNİS & YÖK Onay Kutucuğu Seçimi (Consent Checkbox)",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: [
          "Seçilince: bg-[#EF4823] text-white (Onay tiki görünür)",
          "Seçim kaldırılınca: border border-zinc-400 (Boş kutu)",
          "Etiket tıklanabilirliği ile anında toggle",
        ],
        description: "Kullanıcı rıza metnine veya kutuya tıkladığında onay kutusu turuncu dolguyla aktifleşir.",
      },
      {
        id: "input-outline-focus",
        target: "T.C. No & Doğum Tarihi Giriş Alanı Odaklanma",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: ["focus-within:border-[#EF4823]", "border-2 border-zinc-300"],
        description: "Kullanıcı bilgi girdiğinde kalın çerçeve turuncu renk ile vurgulanır.",
      },
      {
        id: "verify-action-tap",
        target: "Doğrula ve Devam Et Butonları",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "120 ms",
        easing: "easeOut",
        properties: ["whileTap={{ scale: 0.98 }}"],
        description: "Onay butonuna basıldığında dokunsal basılma geri bildirimi verilir.",
      },
    ],
    notes: [
      "Özel KMK amblemli kart ve onay metinleri Figma #14203:145955 tasarımıyla birebir eşlenmiştir.",
    ],
  },

  "register-konyali-step5": {
    pageId: "register-konyali-step5",
    title: "Kayıt Ol (Konyalı - Onay & Başlatma)",
    category: "Başarı & Abonelik Başlatma",
    summary:
      "KMK üyeliği doğrulanmış kullanıcı için kutlama kartı (PartyPopper), önceden doldurulmuş profil bilgileri ve '1 Yıllık Ücretsiz Aboneliği Başlat' aksiyonu.",
    totalDurationMs: "200 ms (Giriş & Buton)",
    framework: "Framer Motion (motion.button)",
    gpuAccelerated: true,
    steps: [
      {
        id: "welcome-card-display",
        target: "Tebrikler & Doğrulandı Kartı",
        trigger: "Mount (Otomatik)",
        delayMs: 0,
        durationMs: "300 ms",
        easing: "easeOut",
        properties: [
          "PartyPopper ikonu: text-[#EF4823]",
          "Doğrulanmış MERNİS ve KMK kayıt verileri hazır doldurulmuş gelir",
        ],
        description: "Kullanıcı başarıyla doğrulandığında tebrik mesajı ve formu görüntülenir.",
      },
      {
        id: "start-subscription-tap",
        target: "1 Yıllık Ücretsiz Aboneliği Başlat Butonu",
        trigger: "Tap / Tıklama",
        delayMs: 0,
        durationMs: "150 ms",
        easing: "easeOut",
        properties: [
          "whileTap={{ scale: 0.98 }}",
          "Gölge: shadow-xl shadow-[#EF4823]/25",
          "bg-[#EF4823] hover:bg-[#ff5530]",
        ],
        description: "Kullanıcı butona bastığında abonelik başlatılarak ana deneyime aktarılır.",
      },
    ],
    notes: [
      "Figma #14203:146137 onay ekranı standartlarına uygun şekilde tasarlanmıştır.",
    ],
  },
};
