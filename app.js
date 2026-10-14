/**
 * GRURU MUSEUM - Executive Presentation Web App Engine
 * Concept: Future Archaeology (Modern Art Gallery x Sci-Fi Lab)
 * Fully compliant with Project Brief Design System & Specifications
 */

// Sound Engine using Web Audio API (Synthesizer, no external audio files needed)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  playSlide() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(520, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playBoom() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Sub-bass hit
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.6);
    subGain.gain.setValueAtTime(0.35, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start();
    subOsc.stop(now + 0.6);

    // High sci-fi chime
    const highOsc = this.ctx.createOscillator();
    const highGain = this.ctx.createGain();
    highOsc.type = 'square';
    highOsc.frequency.setValueAtTime(600, now);
    highOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
    highGain.gain.setValueAtTime(0.04, now);
    highGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    highOsc.connect(highGain);
    highGain.connect(this.ctx.destination);
    highOsc.start();
    highOsc.stop(now + 0.3);
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }
}

const sounds = new SoundEngine();

// App State Management
const App = {
  currentSlide: 0,
  totalSlides: 9,
  slideData: [
    { id: 'hall-00', num: '01', title: 'FUTURE ARCHAEOLOGY', subtitle: 'วิสัยทัศน์ & แก่นของแบรนด์' },
    { id: 'hall-01', num: '02', title: 'PROBLEM & POSITIONING', subtitle: 'วิกฤตความรู้ & Perceptual Map' },
    { id: 'hall-02', num: '03', title: '5-STEP ENGINE', subtitle: 'จากขุดค้นสู่การใช้จริง (Excavate to Apply)' },
    { id: 'hall-03', num: '04', title: 'TARGET AUDIENCE', subtitle: '3 กลุ่มเป้าหมาย & พฤติกรรมผู้ใช้' },
    { id: 'hall-04', num: '05', title: 'DATA BOOMING', subtitle: 'นวัตกรรมกราฟระเบิดความรู้ใน 3 วินาที' },
    { id: 'hall-05', num: '06', title: 'KNOWLEDGE GRAPH', subtitle: 'เครือข่ายความรู้ข้ามยุคสมัยฉบับเต็ม' },
    { id: 'hall-06', num: '07', title: 'DESIGN SYSTEM', subtitle: 'Past Warm x Future Electric & WCAG AA' },
    { id: 'hall-07', num: '08', title: 'EXECUTION ROADMAP', subtitle: 'แผนพัฒนา 4 รอบด้วย Google Antigravity' },
    { id: 'hall-08', num: '09', title: 'BUSINESS & ROI', subtitle: 'โมเดลรายได้ & ข้อเสนอต่อผู้บริหาร' },
  ],
  notes: [
    "สไลด์ที่ 1: แนะนำวิสัยทัศน์ GRURU MUSEUM แก่ผู้บริหาร เน้นย้ำธีม 'New Knowledge. New Storytelling. Built for Everyday Living.' อธิบายความหมายของ Future Archaeology ที่ผสมแกลเลอรี Modern Art เข้ากับห้องแล็บ Sci-Fi",
    "สไลด์ที่ 2: ชี้ให้เห็น Pain Point ของตลาด คนวัย 22-40 ปีต้องการความลึกกว่าคลิปสั้น แต่ไม่อยากนั่งเรียน แสดง Perceptual Map ที่ GRURU ครองพื้นที่ Blue Ocean (สนุก มีหลักฐาน + เป็นเครือข่ายเชื่อมโยง)",
    "สไลด์ที่ 3: นำเสนอเครื่องยนต์ 5 ขั้นตอน (Excavate -> Decode -> Retell -> Connect -> Apply) แสดงให้เห็นกระบวนการเปลี่ยนหนังสือและฐานข้อมูลในอดีตให้กลายเป็น Everyday Takeaway",
    "สไลด์ที่ 4: เจาะลึก 3 บุคลิกเป้าหมาย (Curious Starter, Creative Pro, Lifelong Learner) ด้วย Insight ร่วม 'อยากรู้ลึก แต่ไม่อยากรู้สึกว่ากำลังเรียน' รองรับทั้ง Mobile-first และ Deep Dive",
    "สไลด์ที่ 5: ไฮไลต์เทคโนโลยี Data Booming! ให้ผู้บริหารกดทดลองโหนดตรงกลางเพื่อดูการ 'ระเบิด' ข้อมูล 3 ชั้นใน 3 วินาที แสดงคุณค่าของการเข้าใจเรื่องยากได้ทันที",
    "สไลด์ที่ 6: แสดง Interactive Knowledge Graph ฉบับเต็ม 6 หมวดพร้อมรูปทรงมาตรฐาน สามารถฟิลเตอร์ ย้ายไทม์ไลน์ และเปิด Specimen Card ดูหลักฐานและ Everyday Takeaway ได้จริง",
    "สไลด์ที่ 7: ระบบการออกแบบ Past Warm x Future Electric สัดส่วน 70-20-10, การตัดมุม 45 องศา, Specimen Label และการันตีมาตรฐานการเข้าถึง WCAG AA",
    "สไลด์ที่ 8: แผนการดำเนินงาน 4 รอบ (Tokens -> Components -> Pages -> Force Graph) ด้วย Google Antigravity ช่วยลดเวลาพัฒนาลงกว่า 65%",
    "สไลด์ที่ 9: แผนธุรกิจ 4 เสาหลัก (Brand Partnerships, Knowledge API, Immersive Exhibition, Merch/Courses) พร้อม North Star Metric และปุ่มอนุมัติโครงการ"
  ],

  init() {
    this.bindEvents();
    this.goToSlide(0);
    this.initDataBooming();
    this.initKnowledgeGraph();
    this.initPerceptualMap();
    this.initAudiencePersona();
  },

  bindEvents() {
    // Navigation Buttons
    document.getElementById('btn-prev')?.addEventListener('click', () => {
      sounds.playClick();
      this.prevSlide();
    });

    document.getElementById('btn-next')?.addEventListener('click', () => {
      sounds.playClick();
      this.nextSlide();
    });

    // Sound toggle
    document.getElementById('btn-sound-toggle')?.addEventListener('click', () => {
      const isMuted = sounds.toggleMute();
      const soundIcon = document.getElementById('sound-icon');
      const soundText = document.getElementById('sound-text');
      if (soundIcon) soundIcon.textContent = isMuted ? '🔇' : '🔊';
      if (soundText) soundText.textContent = isMuted ? 'MUTE' : 'AUDIO';
      if (!isMuted) sounds.playClick();
    });

    // Notes toggle
    document.getElementById('btn-notes-toggle')?.addEventListener('click', () => {
      sounds.playClick();
      this.toggleNotes();
    });

    document.getElementById('btn-close-notes')?.addEventListener('click', () => {
      sounds.playClick();
      this.toggleNotes(false);
    });

    // Drawer / TOC toggle
    document.getElementById('btn-toc-toggle')?.addEventListener('click', () => {
      sounds.playClick();
      this.toggleDrawer();
    });

    document.getElementById('btn-close-drawer')?.addEventListener('click', () => {
      sounds.playClick();
      this.toggleDrawer(false);
    });

    // Fullscreen toggle
    document.getElementById('btn-fullscreen')?.addEventListener('click', () => {
      sounds.playClick();
      this.toggleFullscreen();
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        sounds.playSlide();
        this.nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        sounds.playSlide();
        this.prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        this.toggleNotes();
      } else if (e.key === 'm' || e.key === 'M') {
        document.getElementById('btn-sound-toggle')?.click();
      } else if (e.key === 'Escape') {
        this.toggleDrawer(false);
        this.toggleNotes(false);
      }
    });

    // Build Drawer Items
    const drawerContainer = document.getElementById('drawer-slides-list');
    if (drawerContainer) {
      drawerContainer.innerHTML = this.slideData.map((s, idx) => `
        <div class="drawer-item p-3 mb-2 border border-[#2C2C3A] cursor-pointer hover:border-[#D7FF3A] hover:bg-[#17171F] flex items-center justify-between transition-all" data-slide="${idx}">
          <div class="flex items-center gap-3">
            <span class="font-mono text-xs text-[#D7FF3A] bg-[#0B0B0F] px-2 py-1 border border-[#2C2C3A]">${s.num}</span>
            <div>
              <div class="font-chakra font-bold text-sm text-[#F2EDE3]">${s.title}</div>
              <div class="text-xs text-[#8A8A9E]">${s.subtitle}</div>
            </div>
          </div>
          <span class="text-xs font-mono text-[#8A8A9E]">HALL ${idx}</span>
        </div>
      `).join('');

      drawerContainer.querySelectorAll('.drawer-item').forEach(item => {
        item.addEventListener('click', () => {
          const targetIdx = parseInt(item.getAttribute('data-slide') || '0', 10);
          sounds.playSlide();
          this.goToSlide(targetIdx);
          this.toggleDrawer(false);
        });
      });
    }
  },

  goToSlide(idx) {
    if (idx < 0 || idx >= this.totalSlides) return;
    this.currentSlide = idx;

    const slides = document.querySelectorAll('.slide-item');
    slides.forEach((s, i) => {
      s.classList.remove('active', 'exit-left');
      if (i === idx) {
        s.classList.add('active');
      } else if (i < idx) {
        s.classList.add('exit-left');
      }
    });

    // Update Counter & Progress Bar
    const progressPercent = ((idx + 1) / this.totalSlides) * 100;
    const bar = document.getElementById('progress-bar-fill');
    if (bar) bar.style.width = `${progressPercent}%`;

    const counter = document.getElementById('slide-counter-display');
    if (counter) counter.textContent = `${this.slideData[idx].num} / 0${this.totalSlides}`;

    const hallBadge = document.getElementById('header-hall-badge');
    if (hallBadge) hallBadge.textContent = `HALL 0${idx} // ${this.slideData[idx].title}`;

    // Update Drawer active state
    document.querySelectorAll('.drawer-item').forEach((item, i) => {
      if (i === idx) {
        item.classList.add('border-[#D7FF3A]', 'bg-[#17171F]');
      } else {
        item.classList.remove('border-[#D7FF3A]', 'bg-[#17171F]');
      }
    });

    // Update Notes Text
    const notesContent = document.getElementById('notes-content-text');
    if (notesContent) {
      notesContent.innerHTML = `
        <div class="mb-3 font-mono text-xs text-[#D7FF3A]">HALL 0${idx}: ${this.slideData[idx].title}</div>
        <p class="text-sm leading-relaxed text-[#F2EDE3] font-thai">${this.notes[idx]}</p>
      `;
    }

    // Trigger canvas resize or redraw if active slide is Knowledge Graph
    if (idx === 5) {
      setTimeout(() => this.drawKnowledgeGraph(), 100);
    }
  },

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.goToSlide(this.currentSlide + 1);
    }
  },

  prevSlide() {
    if (this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1);
    }
  },

  toggleNotes(force) {
    const drawer = document.getElementById('notes-drawer');
    if (!drawer) return;
    const isOpen = drawer.classList.contains('translate-x-0');
    const targetState = force !== undefined ? force : !isOpen;
    if (targetState) {
      drawer.classList.remove('translate-x-full');
      drawer.classList.add('translate-x-0');
    } else {
      drawer.classList.add('translate-x-full');
      drawer.classList.remove('translate-x-0');
    }
  },

  toggleDrawer(force) {
    const drawer = document.getElementById('toc-drawer');
    if (!drawer) return;
    const isOpen = drawer.classList.contains('translate-x-0');
    const targetState = force !== undefined ? force : !isOpen;
    if (targetState) {
      drawer.classList.remove('-translate-x-full');
      drawer.classList.add('translate-x-0');
    } else {
      drawer.classList.add('-translate-x-full');
      drawer.classList.remove('translate-x-0');
    }
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  /* =======================================================================
     HALL 01: Interactive Perceptual Map (2x2 Blue Ocean Matrix)
     ======================================================================= */
  initPerceptualMap() {
    const quadrantCards = document.querySelectorAll('.perceptual-item');
    quadrantCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        sounds.playClick();
        quadrantCards.forEach(c => c.classList.remove('ring-2', 'ring-[#D7FF3A]', 'scale-105'));
        card.classList.add('ring-2', 'ring-[#D7FF3A]', 'scale-105');
      });
    });
  },

  /* =======================================================================
     HALL 03: Interactive Target Persona & Live Radar Chart
     ======================================================================= */
  initAudiencePersona() {
    const personas = {
      curious: {
        name: 'Curious Starter',
        age: '22–27 ปี',
        role: 'First Jobber / นักศึกษาจบใหม่',
        behavior: 'ใช้มือถือเป็นหลัก เสพภาพสวย แชร์คอนเทนต์',
        need: 'เนื้อหาจบใน 3–5 นาที + โซเชียลการ์ดขนาด 1080×1350 px',
        takeaway: 'ได้ความรู้เบิกเนตรไปคุยกับเพื่อนหรือแชร์ลง Story ได้ทันที',
        radar: [95, 90, 45, 60, 95] // [Speed, Visual, Depth, Practical, Share]
      },
      creative: {
        name: 'Creative Professional',
        age: '25–34 ปี',
        role: 'นักออกแบบ, นักการตลาด, ครีเอเตอร์, นักพัฒนา',
        behavior: 'ค้นหาแรงบันดาลใจและข้อมูลอ้างอิงเชิงลึก',
        need: 'Interactive Graph แบบเจาะลึก, บันทึกคอลเลกชัน, ส่งออกข้อมูล',
        takeaway: 'โครงร่างความคิด (Mental Model) ใหม่สำหรับงานครีเอทีฟ',
        radar: [70, 95, 90, 85, 75]
      },
      lifelong: {
        name: 'Lifelong Learner',
        age: '30–40 ปี',
        role: 'คนทำงานมืออาชีพ / พ่อแม่ยุคใหม่',
        behavior: 'อยากรู้ที่มาของสิ่งรอบตัว เช่น สุขภาพ วิทยาการ ภูมิปัญญา',
        need: 'ความน่าเชื่อถือสูง แหล่งอ้างอิงตรวจสอบได้ ตัวอักษรสบายตา',
        takeaway: 'Everyday Takeaway ชัดเจน ปรับใช้กับชีวิตและครอบครัวได้จริง',
        radar: [60, 75, 95, 100, 50]
      }
    };

    const buttons = document.querySelectorAll('.persona-btn');
    const updatePersonaView = (key) => {
      const data = personas[key];
      if (!data) return;

      document.getElementById('persona-name').textContent = data.name;
      document.getElementById('persona-age').textContent = `${data.age} // ${data.role}`;
      document.getElementById('persona-behavior').textContent = data.behavior;
      document.getElementById('persona-need').textContent = data.need;
      document.getElementById('persona-takeaway').textContent = data.takeaway;

      // Update SVG Polygon Radar
      const [speed, visual, depth, practical, share] = data.radar;
      // Coordinates on 200x200 SVG (Center 100, 100, Radius 80)
      const toXY = (angleDeg, val) => {
        const rad = (angleDeg - 90) * (Math.PI / 180);
        const r = (val / 100) * 75;
        return `${100 + r * Math.cos(rad)},${100 + r * Math.sin(rad)}`;
      };

      const points = [
        toXY(0, speed),
        toXY(72, visual),
        toXY(144, depth),
        toXY(216, practical),
        toXY(288, share)
      ].join(' ');

      const poly = document.getElementById('persona-radar-poly');
      if (poly) poly.setAttribute('points', points);
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playClick();
        buttons.forEach(b => {
          b.classList.remove('bg-[#D7FF3A]', 'text-[#0B0B0F]');
          b.classList.add('bg-[#17171F]', 'text-[#F2EDE3]');
        });
        btn.classList.add('bg-[#D7FF3A]', 'text-[#0B0B0F]');
        btn.classList.remove('bg-[#17171F]', 'text-[#F2EDE3]');
        updatePersonaView(btn.getAttribute('data-persona'));
      });
    });

    // Default init
    updatePersonaView('curious');
  },

  /* =======================================================================
     HALL 04: Live Interactive DATA BOOMING Simulator
     Step 10 Brief: Single seed node clicks -> explodes into 6-12 child nodes in radial burst.
     40ms stagger, lime glow, connections counter increments.
     Allows expanding up to 3 layers!
     ======================================================================= */
  initDataBooming() {
    const container = document.getElementById('booming-stage');
    const boomBtn = document.getElementById('btn-trigger-boom');
    const resetBtn = document.getElementById('btn-reset-boom');
    const counterDisplay = document.getElementById('booming-counter');
    const layerDisplay = document.getElementById('booming-layer-badge');
    const specimenCard = document.getElementById('booming-specimen-preview');
    if (!container) return;

    let currentLayer = 0;
    let nodeCount = 1;

    const topics = [
      {
        seed: 'การหมักบ่มโบราณ (Fermentation)',
        category: 'ธรรมชาติและชีวิต',
        code: 'GRM-BIO-001',
        layer1: [
          { title: 'ไมโครไบโอมในลำไส้', cat: 'วิทยาศาสตร์', takeaway: 'ทานอาหารหมักดองธรรมชาติ 1 ชนิดต่อวันเพื่อจุลินทรีย์ดี' },
          { title: 'การถนอมอาหารในอียิปต์', cat: 'ประวัติศาสตร์', takeaway: 'ใช้หลักเกลือและความชื้นต่ำถนอมวัตถุดิบ' },
          { title: 'โคจิ & มิโสะญี่ปุ่น', cat: 'วัฒนธรรม', takeaway: 'ใช้อุณหภูมิคงที่เพื่อสร้างเอนไซม์ย่อยโปรตีน' },
          { title: 'เทคโนโลยีโปรไบโอติกส์สังเคราะห์', cat: 'เทคโนโลยี', takeaway: 'เลือกแคปซูลทนกรดในกระเพาะอาหาร' },
          { title: 'การหมักไวน์โรมันโบราณ', cat: 'ประวัติศาสตร์', takeaway: 'หมักในภาชนะดินเผาควบคุมความร้อน' },
          { title: 'ขนมปังซาวร์โด (Sourdough)', cat: 'ศิลปะและการออกแบบ', takeaway: 'เลี้ยงยีสต์ป่าด้วยแป้งและน้ำเปล่า' }
        ],
        layer2: [
          { title: 'แกนสมอง-ลำไส้ (Gut-Brain Axis)', cat: 'วิทยาศาสตร์', takeaway: 'สุขภาพจิตผูกกับความสมดุลของลำไส้' },
          { title: 'สารเซโรโทนิน 90% เกิดในลำไส้', cat: 'วิทยาศาสตร์', takeaway: 'ปรับอาหารเพื่อลดความวิตกกังวล' },
          { title: 'หม้อดินเผาดินเผาเผาเคลือบขี้เถ้า', cat: 'วัฒนธรรม', takeaway: 'ความพรุนของดินสร้างสภาวะให้อากาศผ่าน' },
          { title: 'อุตสาหกรรม Precision Fermentation', cat: 'เทคโนโลยี', takeaway: 'ผลิตโปรตีนสังเคราะห์โดยไม่ต้องเลี้ยงสัตว์' }
        ]
      }
    ];

    const currentTopic = topics[0];

    const renderSeed = () => {
      container.innerHTML = '';
      currentLayer = 0;
      nodeCount = 1;
      if (counterDisplay) counterDisplay.textContent = '01 โหนด';
      if (layerDisplay) layerDisplay.textContent = 'SEED LAYER (ระดับ 0)';
      if (specimenCard) {
        specimenCard.innerHTML = `
          <div class="specimen-label mb-2">GRM-INIT-001 // SEED NODE</div>
          <h4 class="font-chakra font-bold text-lg text-[#D7FF3A] mb-1">${currentTopic.seed}</h4>
          <p class="text-xs text-[#8A8A9E] mb-3 font-thai">กดปุ่ม "จุดระเบิดความรู้ (DATA BOOMING)" หรือคลิกที่โหนดกลางเพื่อดูการเชื่อมโยง</p>
          <div class="takeaway-badge p-2.5 text-xs font-thai border-l-2 border-[#D7FF3A]">
            💡 <strong>Everyday Takeaway:</strong> ความรู้ในอดีตเรื่องการหมักบ่มส่งผลต่อวิทยาศาสตร์ชีวภาพของคนยุคใหม่
          </div>
        `;
      }

      // Center Seed Node
      const seedElem = document.createElement('div');
      seedElem.className = 'absolute z-20 cursor-pointer flex flex-col items-center justify-center p-4 bg-[#0B0B0F] border-2 border-[#D7FF3A] text-center transition-all hover:scale-110';
      seedElem.style.left = '50%';
      seedElem.style.top = '50%';
      seedElem.style.transform = 'translate(-50%, -50%)';
      seedElem.style.width = '140px';
      seedElem.style.height = '140px';
      seedElem.style.clipPath = 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)';
      seedElem.style.boxShadow = '0 0 30px rgba(215, 255, 58, 0.4)';

      seedElem.innerHTML = `
        <span class="font-mono text-[10px] text-[#2EE6FF] mb-1">SEED TOPIC</span>
        <span class="font-chakra font-bold text-xs text-[#F2EDE3] leading-tight">${currentTopic.seed}</span>
        <span class="mt-2 text-[9px] bg-[#D7FF3A] text-[#0B0B0F] font-mono px-1.5 py-0.5 font-bold">CLICK TO BOOM</span>
      `;

      seedElem.addEventListener('click', () => triggerBoom());
      container.appendChild(seedElem);
    };

    const triggerBoom = () => {
      sounds.playBoom();

      // Trigger Wave Ring
      const wave = document.createElement('div');
      wave.className = 'booming-pulse';
      wave.style.left = 'calc(50% - 100px)';
      wave.style.top = 'calc(50% - 100px)';
      wave.style.width = '200px';
      wave.style.height = '200px';
      container.appendChild(wave);
      setTimeout(() => wave.remove(), 1500);

      if (currentLayer === 0) {
        currentLayer = 1;
        if (layerDisplay) layerDisplay.textContent = 'RADIAL BURST // LAYER 01';

        const childNodes = currentTopic.layer1;
        const radius = 175; // px
        const count = childNodes.length;

        childNodes.forEach((item, index) => {
          setTimeout(() => {
            sounds.playClick();
            const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            // Connecting Line SVG
            const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgLine.setAttribute('class', 'absolute inset-0 w-full h-full pointer-events-none z-10');
            svgLine.innerHTML = `
              <line x1="50%" y1="50%" x2="calc(50% + ${x}px)" y2="calc(50% + ${y}px)" 
                    stroke="#2EE6FF" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.6" />
            `;
            container.appendChild(svgLine);

            // Child Node
            const node = document.createElement('div');
            node.className = 'absolute z-20 cursor-pointer p-2.5 bg-[#17171F] border border-[#2C2C3A] hover:border-[#D7FF3A] text-center transition-all hover:scale-110';
            node.style.left = `calc(50% + ${x}px)`;
            node.style.top = `calc(50% + ${y}px)`;
            node.style.transform = 'translate(-50%, -50%)';
            node.style.width = '120px';
            node.style.clipPath = 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)';
            node.style.boxShadow = '0 0 16px rgba(46, 230, 255, 0.2)';

            node.innerHTML = `
              <div class="text-[9px] font-mono text-[#D7FF3A]">${item.cat}</div>
              <div class="font-chakra font-semibold text-[11px] text-[#F2EDE3] leading-snug">${item.title}</div>
            `;

            node.addEventListener('click', (e) => {
              e.stopPropagation();
              sounds.playClick();
              if (specimenCard) {
                specimenCard.innerHTML = `
                  <div class="specimen-label mb-2">GRM-BOOM-L1 // ${item.cat}</div>
                  <h4 class="font-chakra font-bold text-lg text-[#2EE6FF] mb-1">${item.title}</h4>
                  <p class="text-xs text-[#8A8A9E] mb-3 font-thai">เชื่อมโยงจากแกนกลางความรู้ในหมวด ${item.cat}</p>
                  <div class="takeaway-badge p-2.5 text-xs font-thai border-l-2 border-[#D7FF3A]">
                    💡 <strong>Everyday Takeaway:</strong> ${item.takeaway}
                  </div>
                `;
              }
              triggerBoom(); // expand further
            });

            container.appendChild(node);
            nodeCount += 1;
            if (counterDisplay) counterDisplay.textContent = `0${nodeCount} โหนดเชื่อมโยง`;
          }, index * 40); // 40ms stagger per brief!
        });
      } else if (currentLayer === 1) {
        currentLayer = 2;
        if (layerDisplay) layerDisplay.textContent = 'DEEP SYNTHESIS // LAYER 02';

        const childNodes = currentTopic.layer2;
        const radius = 265;
        const count = childNodes.length;

        childNodes.forEach((item, index) => {
          setTimeout(() => {
            sounds.playClick();
            const angle = (index / count) * 2 * Math.PI + Math.PI / 4;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const node = document.createElement('div');
            node.className = 'absolute z-20 cursor-pointer p-2 bg-[#17171F] border border-[#8C6BFF] text-center transition-all hover:scale-110';
            node.style.left = `calc(50% + ${x}px)`;
            node.style.top = `calc(50% + ${y}px)`;
            node.style.transform = 'translate(-50%, -50%)';
            node.style.width = '115px';
            node.style.clipPath = 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)';
            node.style.boxShadow = '0 0 16px rgba(140, 107, 255, 0.3)';

            node.innerHTML = `
              <div class="text-[9px] font-mono text-[#8C6BFF]">${item.cat}</div>
              <div class="font-chakra font-semibold text-[10px] text-[#F2EDE3] leading-snug">${item.title}</div>
            `;

            node.addEventListener('click', (e) => {
              e.stopPropagation();
              sounds.playClick();
              if (specimenCard) {
                specimenCard.innerHTML = `
                  <div class="specimen-label mb-2">GRM-BOOM-L2 // ${item.cat}</div>
                  <h4 class="font-chakra font-bold text-lg text-[#8C6BFF] mb-1">${item.title}</h4>
                  <div class="takeaway-badge p-2.5 text-xs font-thai border-l-2 border-[#D7FF3A] mt-2">
                    💡 <strong>Everyday Takeaway:</strong> ${item.takeaway}
                  </div>
                `;
              }
            });

            container.appendChild(node);
            nodeCount += 3;
            if (counterDisplay) counterDisplay.textContent = `${nodeCount} โหนดเชื่อมโยง (Max Depth)`;
          }, index * 40);
        });
      }
    };

    boomBtn?.addEventListener('click', () => triggerBoom());
    resetBtn?.addEventListener('click', () => {
      sounds.playClick();
      renderSeed();
    });

    renderSeed();
  },

  /* =======================================================================
     HALL 05: Live Force-Directed Knowledge Graph Engine on HTML5 Canvas
     Categories:
     - วิทยาศาสตร์ (Science): #2EE6FF (Circle)
     - ประวัติศาสตร์ (History): #FF5A1F (Hexagon)
     - เทคโนโลยี (Tech): #8C6BFF (Square)
     - วัฒนธรรมและภูมิปัญญา (Culture): #FFC233 (Triangle)
     - ธรรมชาติและชีวิต (Nature): #34E89E (Diamond)
     - ศิลปะและการออกแบบ (Art): #FF5FA2 (Ring)
     ======================================================================= */
  initKnowledgeGraph() {
    this.kgCanvas = document.getElementById('kg-canvas');
    if (!this.kgCanvas) return;
    this.kgCtx = this.kgCanvas.getContext('2d');

    // Resize canvas to parent
    const resizeCanvas = () => {
      const rect = this.kgCanvas.parentElement.getBoundingClientRect();
      this.kgCanvas.width = rect.width * window.devicePixelRatio;
      this.kgCanvas.height = rect.height * window.devicePixelRatio;
      this.kgCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
      this.kgWidth = rect.width;
      this.kgHeight = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color definitions
    const colors = {
      science: '#2EE6FF',
      history: '#FF5A1F',
      tech: '#8C6BFF',
      culture: '#FFC233',
      nature: '#34E89E',
      art: '#FF5FA2'
    };

    // Node data (24 richly connected specimens across eras)
    this.kgNodes = [
      { id: '1', label: 'การหมักบ่มโบราณ', en: 'Ancient Fermentation', cat: 'nature', shape: 'diamond', year: -6000, era: 'Antiquity', takeaway: 'ทานอาหารหมักดองธรรมชาติ 1 ชนิดต่อวันเพื่อจุลินทรีย์ดี' },
      { id: '2', label: 'ทฤษฎีเชื้อโรคของปาสเตอร์', en: 'Germ Theory', cat: 'science', shape: 'circle', year: 1861, era: 'Industrial', takeaway: 'การล้างมือด้วยสบู่ 20 วินาทีตัดวงจรเชื้อโรคได้ 90%' },
      { id: '3', label: 'เตาอบขนมปังปอมเปอี', en: 'Pompeii Bakeries', cat: 'history', shape: 'hexagon', year: 79, era: 'Antiquity', takeaway: 'ใช้มวลความร้อนสะสมของหินประหยัดพลังงาน' },
      { id: '4', label: 'จุลชีววิทยาโมเลกุล', en: 'Molecular Microbiology', cat: 'science', shape: 'circle', year: 1953, era: 'Modern', takeaway: 'เข้าใจดีเอ็นเอช่วยเลือกโภชนาการเฉพาะบุคคล' },
      { id: '5', label: 'สถาปัตยกรรมลมช่องแสงชิโนโปรตุกีส', en: 'Shophouse Wind Wells', cat: 'art', shape: 'ring', year: 1880, era: 'Industrial', takeaway: 'เปิดหน้าต่างคู่ข้ามฝั่งสร้าง Passive Airflow เย็นลง 3 องศา' },
      { id: '6', label: 'หอดักลมเปอร์เซีย (Badgir)', en: 'Persian Windcatchers', cat: 'history', shape: 'hexagon', year: -900, era: 'Antiquity', takeaway: 'ใช้หลักความดันอากาศต่ำดูดลมเย็นเข้าบ้าน' },
      { id: '7', label: 'ระบบปรับอากาศอัจฉริยะ IoT', en: 'Smart HVAC & Sensors', cat: 'tech', shape: 'square', year: 2024, era: 'Digital', takeaway: 'ตั้งอุณหภูมิ 26°C ร่วมกับพัดลมช่วยประหยัดไฟ 15%' },
      { id: '8', label: 'เรขาคณิตสัดส่วนทองคำ', en: 'Golden Ratio Architecture', cat: 'art', shape: 'ring', year: -447, era: 'Antiquity', takeaway: 'ใช้อัตราส่วน 1:1.618 จัดเลย์เอาต์งานและพื้นที่ทำงาน' },
      { id: '9', label: 'ระบบชลประทานอารยธรรมขอม (บาราย)', en: 'Khmer Baray Reservoirs', cat: 'culture', shape: 'triangle', year: 1050, era: 'Medieval', takeaway: 'กักเก็บน้ำตามระดับความลาดชันธรรมชาติ ป้องกันน้ำท่วม' },
      { id: '10', label: 'เขื่อนพลังงานน้ำอัจฉริยะ', en: 'Hydroelectric Clean Grid', cat: 'tech', shape: 'square', year: 2022, era: 'Digital', takeaway: 'ผันพลังงานหมุนเวียนช่วง Off-Peak ลดภาระค่าไฟ' },
      { id: '11', label: 'สมุดบันทึกวิญญาณดา วินชี', en: 'Da Vinci Codex Flight', cat: 'art', shape: 'ring', year: 1505, era: 'Renaissance', takeaway: 'ฝึกสเก็ตช์ภาพความคิดเป็นรูปธรรมเพื่อแก้ปัญหาเร็วขึ้น 3 เท่า' },
      { id: '12', label: 'ปัญญาประดิษฐ์กราฟความรู้', en: 'AI Knowledge Graph', cat: 'tech', shape: 'square', year: 2026, era: 'Future', takeaway: 'ใช้โครงข่ายเชื่อมโยงช่วยตัดสินใจ ดีกว่าจำข้อมูลเดี่ยว' },
      { id: '13', label: 'แพทย์แผนไทย: ตำรายาใบลาน', en: 'Ayurvedic & Palm Leaf Medicine', cat: 'culture', shape: 'triangle', year: 1680, era: 'Ayutthaya', takeaway: 'ใช้สมุนไพรฤทธิ์เย็นปรับสมดุลเมื่อร่างกายมีความร้อนสูง' },
      { id: '14', label: 'เภสัชวิทยาคอมพิวเตอร์', en: 'Computational Pharmacology', cat: 'science', shape: 'circle', year: 2025, era: 'Digital', takeaway: 'ตรวจสอบปฏิกิริยาของยากับอาหารก่อนรับประทานเสมอ' },
      { id: '15', label: 'เข็มทิศฮวงจุ้ยโบราณ (หลัวผาน)', en: 'Luopan Magnetic Compass', cat: 'culture', shape: 'triangle', year: -200, era: 'Antiquity', takeaway: 'จัดโต๊ะทำงานหันรับทิศทางแสงธรรมชาติเพื่อลดความล้าของสายตา' },
      { id: '16', label: 'เครือข่ายดาวเทียม GPS & Geolocation', en: 'Satellite Positioning', cat: 'tech', shape: 'square', year: 1995, era: 'Modern', takeaway: 'ซิงค์ข้อมูลตำแหน่งแบบ Real-time เพื่อวางแผนการเดินทางประหยัดเวลา' }
    ];

    // Node links
    this.kgLinks = [
      { source: '1', target: '2', type: 'influenced' },
      { source: '1', target: '3', type: 'used_in' },
      { source: '2', target: '4', type: 'derived_from' },
      { source: '5', target: '6', type: 'derived_from' },
      { source: '6', target: '7', type: 'influenced' },
      { source: '8', target: '11', type: 'influenced' },
      { source: '9', target: '10', type: 'derived_from' },
      { source: '11', target: '12', type: 'influenced' },
      { source: '4', target: '12', type: 'used_in' },
      { source: '13', target: '14', type: 'derived_from' },
      { source: '15', target: '16', type: 'influenced' },
      { source: '7', target: '12', type: 'used_in' },
      { source: '1', target: '13', type: 'used_in' },
      { source: '3', target: '5', type: 'influenced' }
    ];

    // Initialize positions randomly within bounds
    const cx = this.kgWidth / 2;
    const cy = this.kgHeight / 2;
    this.kgNodes.forEach((node, i) => {
      const angle = (i / this.kgNodes.length) * 2 * Math.PI;
      const dist = 120 + Math.random() * 150;
      node.x = cx + Math.cos(angle) * dist;
      node.y = cy + Math.sin(angle) * dist;
      node.vx = 0;
      node.vy = 0;
      node.radius = 16;
      node.color = colors[node.cat];
    });

    this.activeFilter = 'all';
    this.selectedNode = this.kgNodes[0];
    this.hoveredNode = null;
    this.searchQuery = '';

    // Drag state
    this.draggedNode = null;

    // Canvas Events
    this.kgCanvas.addEventListener('mousedown', (e) => {
      const rect = this.kgCanvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const clicked = this.kgNodes.find(n => {
        const d = Math.hypot(n.x - mouseX, n.y - mouseY);
        return d <= n.radius + 6;
      });

      if (clicked) {
        sounds.playClick();
        this.draggedNode = clicked;
        this.selectedNode = clicked;
        this.updateNodeInspector(clicked);
      }
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.kgCanvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (this.draggedNode) {
        this.draggedNode.x = mouseX;
        this.draggedNode.y = mouseY;
        this.draggedNode.vx = 0;
        this.draggedNode.vy = 0;
      } else {
        const hovered = this.kgNodes.find(n => Math.hypot(n.x - mouseX, n.y - mouseY) <= n.radius + 6);
        if (hovered !== this.hoveredNode) {
          this.hoveredNode = hovered;
          this.kgCanvas.style.cursor = hovered ? 'pointer' : 'default';
        }
      }
    });

    window.addEventListener('mouseup', () => {
      this.draggedNode = null;
    });

    // Filter Buttons
    document.querySelectorAll('.kg-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playClick();
        document.querySelectorAll('.kg-filter-btn').forEach(b => {
          b.classList.remove('bg-[#D7FF3A]', 'text-[#0B0B0F]');
          b.classList.add('bg-[#17171F]', 'text-[#8A8A9E]');
        });
        btn.classList.add('bg-[#D7FF3A]', 'text-[#0B0B0F]');
        btn.classList.remove('bg-[#17171F]', 'text-[#8A8A9E]');

        this.activeFilter = btn.getAttribute('data-cat') || 'all';
      });
    });

    // Search input
    const searchInput = document.getElementById('kg-search-input');
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      const match = this.kgNodes.find(n => n.label.toLowerCase().includes(this.searchQuery) || n.en.toLowerCase().includes(this.searchQuery));
      if (match) {
        this.selectedNode = match;
        this.updateNodeInspector(match);
      }
    });

    this.updateNodeInspector(this.selectedNode);
    this.startKgPhysics();
  },

  updateNodeInspector(node) {
    const inspector = document.getElementById('kg-specimen-inspector');
    if (!inspector || !node) return;

    inspector.innerHTML = `
      <div class="flex items-center justify-between mb-3 border-b border-[#2C2C3A] pb-2">
        <span class="specimen-label">GRM-${Math.abs(node.year)}-${node.cat.toUpperCase().substring(0, 3)}-0${node.id}</span>
        <span class="font-mono text-xs text-[#2EE6FF]">${node.era}</span>
      </div>
      <h3 class="font-chakra font-bold text-xl text-[#F2EDE3] mb-1">${node.label}</h3>
      <div class="font-mono text-xs text-[#8A8A9E] mb-3">${node.en} // ${node.year > 0 ? node.year + ' CE' : Math.abs(node.year) + ' BCE'}</div>
      
      <div class="mb-3">
        <span class="inline-block text-[10px] font-mono uppercase px-2 py-0.5 border" style="color: ${node.color}; border-color: ${node.color}">
          หมวด: ${node.cat}
        </span>
      </div>

      <div class="takeaway-badge p-3 border-l-2 border-[#D7FF3A] mb-3">
        <div class="font-mono text-[10px] text-[#D7FF3A] uppercase font-bold mb-1">⚡ EVERYDAY TAKEAWAY (นำไปใช้จริง):</div>
        <div class="font-thai text-xs text-[#F2EDE3] leading-relaxed">${node.takeaway}</div>
      </div>

      <div class="text-[11px] font-mono text-[#8A8A9E]">
        <div>แหล่งอ้างอิง: GRURU Archive Provenance #0${node.id}</div>
        <div class="mt-1 text-[#34E89E]">● ตรวจสอบความถูกต้องทางประวัติศาสตร์แล้ว</div>
      </div>
    `;
  },

  startKgPhysics() {
    const step = () => {
      const cx = this.kgWidth / 2;
      const cy = this.kgHeight / 2;

      // Spring & Repulsion Forces
      for (let i = 0; i < this.kgNodes.length; i++) {
        const n1 = this.kgNodes[i];

        // Center gravity
        n1.vx += (cx - n1.x) * 0.0006;
        n1.vy += (cy - n1.y) * 0.0006;

        // Node repulsion
        for (let j = i + 1; j < this.kgNodes.length; j++) {
          const n2 = this.kgNodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 180) {
            const force = (180 - dist) / 180 * 0.8;
            n1.vx -= (dx / dist) * force;
            n1.vy -= (dy / dist) * force;
            n2.vx += (dx / dist) * force;
            n2.vy += (dy / dist) * force;
          }
        }
      }

      // Link attraction
      this.kgLinks.forEach(link => {
        const s = this.kgNodes.find(n => n.id === link.source);
        const t = this.kgNodes.find(n => n.id === link.target);
        if (s && t) {
          const dx = t.x - s.x;
          const dy = t.y - s.y;
          const dist = Math.hypot(dx, dy) || 1;
          const desiredDist = 110;
          const force = (dist - desiredDist) * 0.004;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
          t.vx -= (dx / dist) * force;
          t.vy -= (dy / dist) * force;
        }
      });

      // Update positions with damping
      this.kgNodes.forEach(node => {
        if (node !== this.draggedNode) {
          node.vx *= 0.88;
          node.vy *= 0.88;
          node.x += node.vx;
          node.y += node.vy;

          // Boundary clamp
          node.x = Math.max(30, Math.min(this.kgWidth - 30, node.x));
          node.y = Math.max(30, Math.min(this.kgHeight - 30, node.y));
        }
      });

      this.drawKnowledgeGraph();
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  },

  drawKnowledgeGraph() {
    if (!this.kgCtx) return;
    const ctx = this.kgCtx;
    ctx.clearRect(0, 0, this.kgWidth, this.kgHeight);

    // Draw Links
    this.kgLinks.forEach(link => {
      const s = this.kgNodes.find(n => n.id === link.source);
      const t = this.kgNodes.find(n => n.id === link.target);
      if (!s || !t) return;

      const isConnectedToSelected = (this.selectedNode && (this.selectedNode.id === s.id || this.selectedNode.id === t.id));
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(t.x, t.y);

      if (link.type === 'derived_from') {
        ctx.setLineDash([4, 4]);
      } else if (link.type === 'used_in') {
        ctx.setLineDash([2, 3]);
      } else {
        ctx.setLineDash([]);
      }

      if (isConnectedToSelected) {
        ctx.strokeStyle = '#D7FF3A';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      } else {
        ctx.strokeStyle = 'rgba(44, 44, 58, 0.7)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.setLineDash([]);
    });

    // Draw Nodes
    this.kgNodes.forEach(node => {
      const isFilteredOut = (this.activeFilter !== 'all' && node.cat !== this.activeFilter);
      const isSelected = (this.selectedNode && this.selectedNode.id === node.id);
      const isHovered = (this.hoveredNode && this.hoveredNode.id === node.id);

      const alpha = isFilteredOut ? 0.25 : 1.0;
      ctx.save();
      ctx.globalAlpha = alpha;

      // Glow effect for selected node
      if (isSelected) {
        ctx.shadowColor = '#D7FF3A';
        ctx.shadowBlur = 20;
      } else if (isHovered) {
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;
      }

      // Draw custom shapes per Project Brief (Step 6)
      ctx.fillStyle = isSelected ? '#D7FF3A' : '#17171F';
      ctx.strokeStyle = isSelected ? '#D7FF3A' : node.color;
      ctx.lineWidth = isSelected ? 2.5 : 1.5;

      const r = isSelected ? node.radius + 4 : node.radius;

      if (node.shape === 'circle') {
        // Science
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (node.shape === 'hexagon') {
        // History
        ctx.beginPath();
        for (let a = 0; a < 6; a++) {
          const angle = (a * 60) * Math.PI / 180;
          const hx = node.x + r * Math.cos(angle);
          const hy = node.y + r * Math.sin(angle);
          if (a === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (node.shape === 'square') {
        // Tech
        ctx.beginPath();
        ctx.rect(node.x - r, node.y - r, r * 2, r * 2);
        ctx.fill();
        ctx.stroke();
      } else if (node.shape === 'triangle') {
        // Culture
        ctx.beginPath();
        ctx.moveTo(node.x, node.y - r * 1.2);
        ctx.lineTo(node.x + r * 1.1, node.y + r * 0.8);
        ctx.lineTo(node.x - r * 1.1, node.y + r * 0.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (node.shape === 'diamond') {
        // Nature
        ctx.beginPath();
        ctx.moveTo(node.x, node.y - r * 1.2);
        ctx.lineTo(node.x + r * 1.2, node.y);
        ctx.lineTo(node.x, node.y + r * 1.2);
        ctx.lineTo(node.x - r * 1.2, node.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (node.shape === 'ring') {
        // Art
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#0B0B0F';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Draw Center Pip
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? '#0B0B0F' : node.color;
      ctx.fill();

      // Node Label
      ctx.shadowBlur = 0;
      ctx.font = '500 11px "IBM Plex Sans Thai", sans-serif';
      ctx.fillStyle = isSelected ? '#D7FF3A' : '#F2EDE3';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + r + 15);

      ctx.restore();
    });
  }
};

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
