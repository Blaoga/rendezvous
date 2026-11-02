/* ==========================================================================
   APP.JS — EXPÉRIENCE ROMANTIQUE 100% CAMEROUNAISE EN 5 ÉTAPES 🇨🇲❤️
   Auteur : Antigravity UI/UX Senior Full-Stack
   ========================================================================== */

(function () {
  'use strict';

  // ==========================================================================
  // ÉTAT GLOBAL DE L'APPLICATION (5 ÉTAPES ÉPURÉES & ESSENTIELLES)
  // ==========================================================================
  const state = {
    herName: '',
    city: 'Yaoundé',
    placeId: '',
    placeTitle: '',
    customPlace: '',
    foods: new Set(),
    customFood: '',
    drinks: new Set(),
    customDrink: '',
    extras: new Set(),
    moment: 'Soirée',
    date: '',
    time: '18:30',
    customNote: '',
    singleSurpriseOpened: false,
    currentStepId: 'step-1',
    escapeCount: 0,
    soundEnabled: true,
    musicPlaying: false,
    musicVolume: 0.3,
    generatedProposal: null,
    whatsappNumber: (window.APP_CONFIG && window.APP_CONFIG.whatsappNumber) || '237655752004'
  };

  // Messages taquins camerounais lorsque le bouton "Non" s'enfuit
  const escapeMessages = [
    "Oups, le bouton a glissé ! 🙈",
    "Le ndolé n'attend pas, dis oui ! 😋❤️",
    "Tu veux esquiver comme ça ? Impossible au Mboa ! 🇨🇲",
    "Erreur 404 : Le 'Non' est introuvable au Cameroun ❤️",
    "Même les gars de Bonanjo n'ont jamais vu ce bouton marcher 😂",
    "Allez, dis oui… tu vas voir comment la suite est chic ✨",
    "Ce bouton fuit plus vite qu'un bend-skin à l'heure de pointe ! 🏍️💨",
    "Regarde le bouton 'Oui', il brille rien que pour toi ! 🌟",
    "Impossible de refuser, c'est l'affaire de cœur ! 😌❤️",
    "Tu as déjà vu quelqu'un refuser du poisson braisé ? Jamais ! 😉"
  ];

  // ==========================================================================
  // BASE DE DONNÉES DES LIEUX PAR VILLE CAMEROUNAISE 🇨🇲
  // ==========================================================================
  const placesDatabase = {
    'Yaoundé': [
      {
        id: 'bois-sainte-anastasie',
        title: 'Bois Sainte Anastasie',
        badge: '🌳 Havre de verdure',
        desc: 'Allées boisées ombragées, fleurs tropicales et cadre calme pour discuter en toute sérénité.',
        img: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'lac-municipal-yde',
        title: 'Lac municipal',
        badge: '🌊 Balade paisible',
        desc: 'Promenade apaisante au bord de l’eau au cœur de Yaoundé, idéale pour une marche complice.',
        img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'mont-febe',
        title: 'Mont Fébé',
        badge: '⛰️ Vue panoramique',
        desc: 'Vue majestueuse dominant les collines de Yaoundé, air frais et coucher de soleil féerique.',
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'restaurant-chic-yde',
        title: 'Restaurant chic & terrasse',
        badge: '🍷 Dîner raffiné',
        desc: 'Cadre feutré, lumières tamisées, plats succulents et service attentif.',
        img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'centre-ville-yde',
        title: 'Centre-ville & café cosy',
        badge: '✨ Ambiance urbaine',
        desc: 'Café moderne, lumières scintillantes et atmosphère vibrante de la capitale.',
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'autre',
        title: 'Je choisis mon propre endroit',
        badge: '✨ Ton choix',
        desc: 'Dis-moi ton endroit coup de cœur ou un lieu secret que tu aimes.',
        img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'
      }
    ],

    'Douala': [
      {
        id: 'bonanjo',
        title: 'Bonanjo sous les palmiers',
        badge: '🏛️ Quartier historique',
        desc: 'Rues calmes bordées de grands arbres, terrasses discrètes et charme colonial.',
        img: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'bonapriso',
        title: 'Bonapriso lounge chic',
        badge: '🍸 Chic & branché',
        desc: 'Les plus belles terrasses et lounges intimistes pour une soirée tout en style.',
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'bord-de-mer-dla',
        title: 'Bord de mer / Fleuve Wouri',
        badge: '🌊 Brise marine',
        desc: 'Coucher de soleil doré sur l’eau, vue panoramique et atmosphère romantique.',
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'jardin-botanique-dla',
        title: 'Jardin botanique',
        badge: '🌿 Oasis tropicale',
        desc: 'Un coin de nature préservé en pleine ville pour se couper du bruit du monde.',
        img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'autre',
        title: 'Je choisis mon propre endroit',
        badge: '✨ Ton choix',
        desc: 'Propose ton resto ou lounge préféré à Douala.',
        img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'
      }
    ],

    'Kribi': [
      {
        id: 'plage-kribi',
        title: 'Plage de sable blanc',
        badge: '🏖️ Paradis doré',
        desc: 'Sable fin, cocotiers et clapotis apaisant des vagues de l’océan Atlantique.',
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'chutes-lobe',
        title: 'Chutes de la Lobé',
        badge: '🌊 Merveille du monde',
        desc: 'Le fleuve qui se jette directement dans l’océan en cascades avec crevettes braisées fraîches.',
        img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'resto-bord-mer-kribi',
        title: 'Restaurant en bord de mer',
        badge: '🦞 Pieds dans le sable',
        desc: 'Poisson braisé du jour et douceur des vagues au coucher du soleil.',
        img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'autre',
        title: 'Je choisis mon propre endroit',
        badge: '✨ Ton choix',
        desc: 'Ton spot préféré à Kribi pour un moment inoubliable.',
        img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'
      }
    ],

    'Limbe': [
      {
        id: 'jardin-botanique-limbe',
        title: 'Jardin botanique de Limbe',
        badge: '🌺 Paradis vert',
        desc: 'Arbres centenaires, fleurs exotiques et allées ombragées à la brise marine.',
        img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'plage-limbe',
        title: 'Plage de sable volcanique',
        badge: '🌋 Insolite & sauvage',
        desc: 'Une plage singulière de sable volcanique noir caressée par l’Atlantique.',
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'resto-vue-mer-limbe',
        title: 'Restaurant vue sur l’océan',
        badge: '🐟 Saveurs côtières',
        desc: 'Poissons braisés et coucher de soleil sur l’Atlantique.',
        img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'autre',
        title: 'Je choisis mon propre endroit',
        badge: '✨ Ton choix',
        desc: 'Un lieu secret que tu aimes à Limbe.',
        img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'
      }
    ],

    'Buea': [
      {
        id: 'pied-mont-cameroun',
        title: 'Au pied du Mont Cameroun',
        badge: '🌋 Air pur & brume',
        desc: 'Fraîcheur des hauteurs et romantisme avec le majestueux Mont Fako en toile de fond.',
        img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'tea-estate-buea',
        title: 'Tea Estate (Champs de thé)',
        badge: '🌿 Vagues vertes',
        desc: 'Promenade au milieu des plantations de thé verdoyantes à perte de vue.',
        img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'autre',
        title: 'Je choisis mon propre endroit',
        badge: '✨ Ton choix',
        desc: 'Ton endroit préféré à Buea.',
        img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'
      }
    ],

    'Bafoussam': [
      {
        id: 'collines-bafoussam',
        title: 'Belvédère des collines',
        badge: '⛰️ Hauts plateaux',
        desc: 'Fraîcheur vivifiante et panorama splendide sur le pays Bamiléké.',
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'resto-chic-bafoussam',
        title: 'Restaurant traditionnel soigné',
        badge: '🍲 Délices locaux',
        desc: 'Taro sauce jaune, koki doré et viandes braisées savoureuses.',
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'autre',
        title: 'Je choisis mon propre endroit',
        badge: '✨ Ton choix',
        desc: 'Propose ton lieu favori à Bafoussam.',
        img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'
      }
    ],

    'Dschang': [
      {
        id: 'lac-dschang',
        title: 'Lac municipal de Dschang',
        badge: '🛶 Promenade romantique',
        desc: 'Balade en pédalo, allées paisibles et fraîcheur d’altitude réputée.',
        img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'musee-dschang',
        title: 'Jardins du Musée des Civilisations',
        badge: '🏛️ Charme culturel',
        desc: 'Cadre fleuri et élégant, parfait pour une balade complice.',
        img: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'autre',
        title: 'Je choisis mon propre endroit',
        badge: '✨ Ton choix',
        desc: 'Ton adresse secrète à Dschang.',
        img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'
      }
    ],

    'Garoua': [
      {
        id: 'benoue-garoua',
        title: 'Rives de la Bénoué',
        badge: '🌅 Coucher de soleil sahélien',
        desc: 'Lumières dorées éclatantes sur l’eau du fleuve au crépuscule.',
        img: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'autre',
        title: 'Je choisis mon propre endroit',
        badge: '✨ Ton choix',
        desc: 'Ton lieu de prédilection à Garoua.',
        img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'
      }
    ],

    'Bamenda': [
      {
        id: 'falaise-bamenda',
        title: 'Falaise d’Up-Station',
        badge: '⛰️ Panorama d’exception',
        desc: 'Vue plongeante spectaculaire sur toute la vallée de Bamenda.',
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'autre',
        title: 'Je choisis mon propre endroit',
        badge: '✨ Ton choix',
        desc: 'Ton lieu favori à Bamenda.',
        img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'
      }
    ],

    'Autre ville': [
      {
        id: 'resto-chic-autre',
        title: 'Restaurant chic & soigné',
        badge: '🍷 Belle table',
        desc: 'Une table réservée dans un restaurant accueillant et gourmand.',
        img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'terrasse-vue-autre',
        title: 'Terrasse romantique en plein air',
        badge: '✨ Cadre aéré',
        desc: 'Une terrasse agréable pour profiter d’un moment à deux.',
        img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'autre',
        title: 'Je choisis mon propre endroit',
        badge: '✨ Ton choix',
        desc: 'Dis-moi précisément quel endroit tu as en tête.',
        img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'
      }
    ]
  };

  // ==========================================================================
  // SYSTÈME AUDIO & SONS DOUX (Web Audio API)
  // ==========================================================================
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration, type = 'sine', gainVal = 0.12) {
    if (!state.soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silencieux
    }
  }

  function playChime() {
    playTone(523.25, 0.22, 'triangle', 0.1);
    setTimeout(() => playTone(659.25, 0.3, 'sine', 0.08), 100);
  }

  function playEscapeSound() {
    playTone(320, 0.08, 'sine', 0.12);
    setTimeout(() => playTone(480, 0.12, 'triangle', 0.1), 50);
  }

  function playCelebrationFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playTone(freq, 0.38, 'sine', 0.14);
      }, idx * 100);
    });
  }

  // ==========================================================================
  // LECTEUR MUSICAL DISCRET (Synthèse Lo-Fi Piano Romantique)
  // ==========================================================================
  let musicMasterGain = null;
  let musicInterval = null;

  const romanticChords = [
    [174.61, 261.63, 329.63, 392.00, 440.00], // Fmaj9
    [146.83, 220.00, 261.63, 329.63, 349.23], // Dmin9
    [116.54, 174.61, 220.00, 293.66, 349.23], // Bbmaj7
    [130.81, 196.00, 246.94, 293.66, 392.00]  // C9
  ];

  let chordIndex = 0;

  function startMusicLoop() {
    if (!audioCtx) initAudio();
    if (!audioCtx) return;

    if (!musicMasterGain) {
      musicMasterGain = audioCtx.createGain();
      musicMasterGain.gain.setValueAtTime(state.musicVolume, audioCtx.currentTime);
      musicMasterGain.connect(audioCtx.destination);
    }

    function playArpeggio() {
      if (!state.musicPlaying) return;
      const currentChord = romanticChords[chordIndex % romanticChords.length];
      chordIndex++;

      currentChord.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(750, audioCtx.currentTime);

        const startTime = audioCtx.currentTime + i * 0.45;
        const dur = 2.4;

        noteGain.gain.setValueAtTime(0.001, startTime);
        noteGain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.12);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(musicMasterGain);

        osc.start(startTime);
        osc.stop(startTime + dur);
      });
    }

    playArpeggio();
    musicInterval = setInterval(() => {
      if (state.musicPlaying) {
        playArpeggio();
      }
    }, 2400);
  }

  function stopMusicLoop() {
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
  }

  function setupMusicPlayer() {
    const toggleBtn = document.getElementById('music-toggle-btn');
    const volumeSlider = document.getElementById('music-volume');
    const musicIcon = document.getElementById('music-icon');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        initAudio();
        state.musicPlaying = !state.musicPlaying;

        if (state.musicPlaying) {
          toggleBtn.classList.add('playing');
          if (musicIcon) musicIcon.textContent = '⏸️';
          startMusicLoop();
        } else {
          toggleBtn.classList.remove('playing');
          if (musicIcon) musicIcon.textContent = '🎵';
          stopMusicLoop();
        }
      });
    }

    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        state.musicVolume = parseFloat(e.target.value);
        if (musicMasterGain && audioCtx) {
          musicMasterGain.gain.setValueAtTime(state.musicVolume, audioCtx.currentTime);
        }
      });
    }
  }

    // ==========================================================================
  // CANVAS D'AMBIANCE CINÃ‰MATOGRAPHIQUE : PÃ‰TALES DE ROSES & POUSSIÃˆRES D'Ã‰TOILES DORÃ‰ES âœ¨ðŸŒ¹
  // ==========================================================================
  function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let petals = [];
    let sparkles = [];
    let hearts = [];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // PÃ©tales de roses flottants et tombant doucement
    class RosePetal {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -30;
        this.size = Math.random() * 12 + 10;
        this.speedY = Math.random() * 0.75 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = Math.random() * 0.03 + 0.01;
        this.opacity = Math.random() * 0.4 + 0.35;
        this.color = Math.random() > 0.4 ? '#E11D48' : '#FDA4AF';
      }
      update() {
        this.wobble += this.wobbleSpeed;
        this.rotation += this.rotSpeed;
        this.flip += this.flipSpeed;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.wobble) * 0.8;
        if (this.y > height + 35) {
          this.reset(false);
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(Math.cos(this.flip), 1);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.7);
        ctx.bezierCurveTo(s * 0.7, -s * 0.7, s * 0.8, s * 0.5, 0, s);
        ctx.bezierCurveTo(-s * 0.8, s * 0.5, -s * 0.7, -s * 0.7, 0, -s * 0.7);
        ctx.fill();
        ctx.restore();
      }
    }

    // PoussiÃ¨res d'Ã©toiles dorÃ©es scintillantes
    class GoldSparkle {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 15;
        this.size = Math.random() * 3 + 1.5;
        this.speedY = Math.random() * 0.35 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.04 + 0.02;
        this.baseOpacity = Math.random() * 0.4 + 0.3;
      }
      update() {
        this.twinkle += this.twinkleSpeed;
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -15) this.reset(false);
      }
      draw() {
        const alpha = this.baseOpacity + Math.sin(this.twinkle) * 0.25;
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
        ctx.fillStyle = '#F59E0B';
        ctx.shadowColor = '#FDE68A';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // CÅ“urs doux flottants
    class SoftHeart {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 20;
        this.size = Math.random() * 10 + 7;
        this.speedY = Math.random() * 0.4 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.25 + 0.1;
        this.rotation = Math.random() * Math.PI;
        this.rotSpeed = (Math.random() - 0.5) * 0.015;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.rotation += this.rotSpeed;
        if (this.y < -30) this.reset(false);
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#E11D48';
        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
        ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);
        ctx.fill();
        ctx.restore();
      }
    }

    if (!prefersReducedMotion) {
      const petalCount = Math.min(18, Math.max(8, Math.floor(window.innerWidth / 70)));
      const sparkleCount = Math.min(22, Math.max(10, Math.floor(window.innerWidth / 60)));
      const heartCount = 6;

      for (let i = 0; i < petalCount; i++) petals.push(new RosePetal());
      for (let i = 0; i < sparkleCount; i++) sparkles.push(new GoldSparkle());
      for (let i = 0; i < heartCount; i++) hearts.push(new SoftHeart());

      function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let p of petals) { p.update(); p.draw(); }
        for (let s of sparkles) { s.update(); s.draw(); }
        for (let h of hearts) { h.update(); h.draw(); }
        requestAnimationFrame(animate);
      }
      animate();
    }
  }

  // ==========================================================================
  // CONFETTI ROMANTIQUE DISCRET
  // ==========================================================================
  function fireRomanticConfetti(customCount = 100) {
    if (typeof confetti !== 'function') return;

    confetti({
      particleCount: customCount,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#E11D48', '#BE123C', '#F43F5E', '#FECDD3', '#F59E0B']
    });
  }

  // ==========================================================================
  // GESTIONNAIRE DES 5 ÉTAPES ESSENTIELLES
  // ==========================================================================
  const stepsMetadata = {
    'step-1': { title: 'Bienvenue', percent: 20, stepNum: 1 },
    'step-2': { title: 'L’Invitation', percent: 40, stepNum: 2 },
    'step-3': { title: 'Le Rendez-vous', percent: 60, stepNum: 3 },
    'step-4': { title: 'Ta Surprise', percent: 80, stepNum: 4 },
    'step-5': { title: 'Récapitulatif', percent: 100, stepNum: 5 }
  };

  function goToStep(stepId) {
    const prevEl = document.getElementById(state.currentStepId);
    const nextEl = document.getElementById(stepId);

    if (prevEl) prevEl.classList.remove('active');

    state.currentStepId = stepId;

    if (nextEl) {
      nextEl.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateProgress();
    playChime();
  }

  function updateProgress() {
    const progressContainer = document.getElementById('progress-container');
    const fillEl = document.getElementById('progress-fill');
    const stepTextEl = document.getElementById('progress-step-text');
    const badgeEl = document.getElementById('progress-percent-badge');

    if (!progressContainer) return;
    progressContainer.style.display = 'block';

    const info = stepsMetadata[state.currentStepId] || { title: 'Bienvenue', percent: 20, stepNum: 1 };
    if (fillEl) fillEl.style.width = `${info.percent}%`;
    if (stepTextEl) stepTextEl.textContent = `Étape ${info.stepNum} sur 5 — ${info.title}`;
    if (badgeEl) badgeEl.textContent = `${info.percent}%`;
  }

  // ==========================================================================
  // ÉTAPE 1 : ACCUEIL PERSONNALISÉ & LETTRE ROMANTIQUE DANS L'ENVELOPPE
  // ==========================================================================
  function submitName() {
    const input = document.getElementById('her-name-input');
    const formWrap = document.getElementById('step-1-form-wrap');
    const envelopeBox = document.getElementById('step-1-envelope-box');

    if (!input) return;

    let val = input.value.trim();
    if (!val) {
      input.focus();
      return;
    }

    val = val.charAt(0).toUpperCase() + val.slice(1);
    state.herName = val;

    document.querySelectorAll('.user-name-target').forEach(el => {
      el.textContent = val;
    });

    // Révéler harmonieusement l'enveloppe
    if (formWrap) formWrap.style.display = 'none';
    if (envelopeBox) {
      envelopeBox.style.display = 'block';
      envelopeBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    playChime();
  }

  
  // ==========================================================================
  // 1. ARRIVÃ‰E SPECTACULAIRE CINÃ‰MATOGRAPHIQUE
  // ==========================================================================
  function setupArrivalOverlay() {
    const overlay = document.getElementById('intro-arrival-overlay');
    const btnEnter = document.getElementById('btn-enter-experience');
    const nameInput = document.getElementById('her-name-input');

    if (!overlay || !btnEnter) return;

    btnEnter.addEventListener('click', () => {
      playTone(523.25, 0.25, 'sine', 0.1);
      setTimeout(() => playTone(659.25, 0.25, 'sine', 0.1), 100);
      setTimeout(() => playTone(783.99, 0.35, 'sine', 0.12), 200);

      fireRomanticConfetti(45);

      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.style.display = 'none';
        if (nameInput) nameInput.focus();
      }, 750);
    });
  }
  function setupSecretEnvelope() {
    const trigger = document.getElementById('secret-envelope-trigger');
    const envelopeEl = document.getElementById('secret-envelope-el');
    const hint = document.getElementById('envelope-click-hint');
    const btnOpen = document.getElementById('btn-open-envelope');

    if (!trigger || !envelopeEl) return;

    trigger.addEventListener('click', () => {
      if (!envelopeEl.classList.contains('opened')) {
        envelopeEl.classList.add('opened');
        if (hint) hint.style.display = 'none';
        if (btnOpen) btnOpen.style.display = 'inline-flex';

        playCelebrationFanfare();
        fireRomanticConfetti(60);
      }
    });

    if (btnOpen) {
      btnOpen.addEventListener('click', () => {
        goToStep('step-2');
      });
    }
  }

  // ==========================================================================
  // ÉTAPE 2 : L'INVITATION (OUI / BOUTON NON FUGITIF AMUSANT)
  // ==========================================================================
  function setupEvasiveButton() {
    const btnNo = document.getElementById('btn-no');
    const arena = document.getElementById('arena-actions');
    const toast = document.getElementById('escape-toast');
    const btnBack = document.getElementById('btn-back-step-2');
    const declineModal = document.getElementById('polite-decline-modal');
    const btnChangeMind = document.getElementById('btn-decline-change-mind');
    const btnCloseDecline = document.getElementById('btn-decline-close');

    if (!btnNo || !arena) return;
    let toastTimeout = null;

    function showToast() {
      if (!toast) return;
      const msg = escapeMessages[state.escapeCount % escapeMessages.length];
      toast.textContent = msg;
      toast.classList.add('show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 2200);
    }

    function openPoliteDeclineModal() {
      if (declineModal) {
        declineModal.classList.add('show');
        playTone(440, 0.2, 'sine', 0.08);
      }
    }

    function dodge(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      // AprÃ¨s 4 esquives, le bouton cesse de fuir et permet d'ouvrir le modal poli
      if (state.escapeCount >= 4) {
        openPoliteDeclineModal();
        return;
      }

      state.escapeCount++;
      playEscapeSound();
      showToast();

      const maxRangeX = Math.min(150, window.innerWidth * 0.32);
      const maxRangeY = 55;
      const angle = Math.random() * Math.PI * 2;
      const distanceX = (Math.cos(angle) * maxRangeX) * (Math.random() * 0.5 + 0.6);
      const distanceY = (Math.sin(angle) * maxRangeY) * (Math.random() * 0.5 + 0.6);

      btnNo.style.transform = 	ranslate(px, px);
    }

    btnNo.addEventListener('mouseenter', dodge);
    btnNo.addEventListener('mouseover', dodge);
    btnNo.addEventListener('touchstart', dodge, { passive: false });
    btnNo.addEventListener('pointerdown', dodge, { passive: false });
    btnNo.addEventListener('click', (e) => {
      if (state.escapeCount >= 3) {
        openPoliteDeclineModal();
      } else {
        dodge(e);
      }
    });

    if (btnChangeMind) {
      btnChangeMind.addEventListener('click', () => {
        if (declineModal) declineModal.classList.remove('show');
        onYesClicked();
      });
    }

    if (btnCloseDecline) {
      btnCloseDecline.addEventListener('click', () => {
        if (declineModal) declineModal.classList.remove('show');
      });
    }

    if (btnBack) {
      btnBack.addEventListener('click', () => goToStep('step-1'));
    }
  }

  function onYesClicked() {
    playCelebrationFanfare();
    fireRomanticConfetti(120);

    const overlay = document.getElementById('celebration-overlay');
    if (overlay) overlay.classList.add('show');

    setTimeout(() => {
      if (overlay) overlay.classList.remove('show');
      goToStep('step-3');
    }, 1800);
  }

  // ==========================================================================
  // ÉTAPE 3 : ORGANISATION DU RENDEZ-VOUS (HUB UNIQUE & FLUIDE)
  // ==========================================================================
  function setupRendezvousHub() {
    const tabAuto = document.getElementById('tab-mode-auto');
    const tabManual = document.getElementById('tab-mode-manual');
    const viewAuto = document.getElementById('view-mode-auto');
    const viewManual = document.getElementById('view-mode-manual');

    const cityPills = document.querySelectorAll('.city-pill');
    const currentCityLabel = document.getElementById('current-city-label');
    const placesGrid = document.getElementById('places-grid');
    const customPlaceBox = document.getElementById('custom-place-box');
    const customPlaceInput = document.getElementById('custom-place-input');

    const tabCameroon = document.getElementById('tab-food-cameroon');
    const tabIntl = document.getElementById('tab-food-international');
    const gridCameroon = document.getElementById('food-cameroon-grid');
    const gridIntl = document.getElementById('food-intl-grid');
    const btnSurpriseFood = document.getElementById('btn-surprise-food');
    const customFoodInput = document.getElementById('custom-food-input');

    const drinksGrid = document.getElementById('drinks-grid');
    const customDrinkBox = document.getElementById('custom-drink-box');
    const customDrinkInput = document.getElementById('custom-drink-input');

    const extrasList = document.getElementById('extras-list');
    const momentPills = document.getElementById('moment-pills');
    const dateInput = document.getElementById('date-picker-input');
    const timeInput = document.getElementById('time-picker-input');
    const noteInput = document.getElementById('custom-note-input');

    const btnRunGen = document.getElementById('btn-run-generator');
    const btnRegen = document.getElementById('btn-regen-proposal');
    const btnApply = document.getElementById('btn-apply-proposal');

    const btnContinue = document.getElementById('btn-continue-step-3');
    const btnBack = document.getElementById('btn-back-step-3');

    // 1. Toggle Mode Automatique vs Manuel
    if (tabAuto && tabManual && viewAuto && viewManual) {
      tabAuto.addEventListener('click', () => {
        tabAuto.classList.add('active');
        tabManual.classList.remove('active');
        viewAuto.style.display = 'block';
        viewManual.style.display = 'none';
        playTone(620, 0.1, 'sine', 0.06);
      });

      tabManual.addEventListener('click', () => {
        tabManual.classList.add('active');
        tabAuto.classList.remove('active');
        viewManual.style.display = 'block';
        viewAuto.style.display = 'none';
        renderPlacesForCity(state.city);
        playTone(620, 0.1, 'sine', 0.06);
      });
    }

    function checkRendezvousValidity() {
      // Pour continuer, au moins un lieu doit être sélectionné
      const hasPlace = state.placeTitle.length > 0 || state.customPlace.length > 0;
      if (btnContinue) {
        btnContinue.disabled = !hasPlace;
      }
    }

    // 2. Rendu des Lieux par Ville
    function renderPlacesForCity(cityName) {
      state.city = cityName;
      if (currentCityLabel) currentCityLabel.textContent = cityName;

      if (!placesGrid) return;
      placesGrid.innerHTML = '';

      const places = placesDatabase[cityName] || placesDatabase['Yaoundé'];

      places.forEach(p => {
        const card = document.createElement('div');
        card.className = 'choice-card';
        card.setAttribute('data-id', p.id);
        card.setAttribute('data-title', p.title);

        if (state.placeId === p.id) {
          card.classList.add('selected');
        }

        card.innerHTML = `
          <div class="choice-card-img-wrap">
            <img src="${p.img}" alt="${p.title}" class="choice-card-img" loading="lazy">
            <span class="choice-card-badge">${p.badge}</span>
            <span class="choice-card-check">✓</span>
          </div>
          <div class="choice-card-body">
            <div class="choice-card-title">${p.title}</div>
            <div class="choice-card-desc">${p.desc}</div>
          </div>
        `;

        card.addEventListener('click', () => {
          placesGrid.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');

          state.placeId = p.id;
          state.placeTitle = p.title;

          if (p.id === 'autre') {
            if (customPlaceBox) customPlaceBox.classList.add('show');
            if (customPlaceInput) customPlaceInput.focus();
          } else {
            if (customPlaceBox) customPlaceBox.classList.remove('show');
          }

          checkRendezvousValidity();
          playTone(660, 0.12, 'sine', 0.08);
        });

        placesGrid.appendChild(card);
      });
    }

    // 3. Pilules de villes
    cityPills.forEach(pill => {
      pill.addEventListener('click', () => {
        cityPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cityName = pill.getAttribute('data-city');
        renderPlacesForCity(cityName);

        const genCitySelect = document.getElementById('gen-city');
        if (genCitySelect) genCitySelect.value = cityName;

        playTone(550, 0.1, 'sine', 0.08);
      });
    });

    if (customPlaceInput) {
      customPlaceInput.addEventListener('input', () => {
        state.customPlace = customPlaceInput.value.trim();
        checkRendezvousValidity();
      });
    }

    renderPlacesForCity('Yaoundé');

    // 4. Moteur du Générateur « Organise notre date 🇨🇲 »
    function generateDateProposal() {
      const city = document.getElementById('gen-city')?.value || 'Yaoundé';
      const style = document.getElementById('gen-style')?.value || 'Dîner intime';
      const mood = document.getElementById('gen-mood')?.value || 'Romantique';
      const moment = document.getElementById('gen-moment')?.value || 'Soirée';

      const placeSuggestions = {
        'Yaoundé': [
          "Terrasse panoramique du Mont Fébé avec vue scintillante",
          "Bois Sainte Anastasie et balade fleurie intime",
          "Table feutrée dans un restaurant chic du centre-ville",
          "Lac municipal pour une promenade douce au bord de l'eau"
        ],
        'Douala': [
          "Rooftop lounge à Bonapriso avec musique douce",
          "Terrasse aérée à Bonanjo sous les palmiers",
          "Dîner face au fleuve Wouri au coucher du soleil",
          "Restaurant lounge intime avec vue sur les lumières de la ville"
        ],
        'Kribi': [
          "Dîner les pieds dans le sable à la Plage de Kribi face aux vagues",
          "Chutes de la Lobé avec dégustation de crevettes braisées au bord de l'eau",
          "Restaurant en bord de mer éclairé par des torches douces",
          "Balade les pieds dans l'eau au coucher du soleil doré"
        ],
        'Limbe': [
          "Restaurant face à la mer avec brise atlantique à Down Beach",
          "Allées fleuries du Jardin botanique de Limbe",
          "Plage de sable volcanique noir au crépuscule"
        ],
        'Bafoussam': [
          "Belvédère des collines au grand air des hauts plateaux",
          "Restaurant traditionnel chic avec ambiance feutrée"
        ],
        'Buea': [
          "Pause douceur au pied du Mont Cameroun avec brume poétique",
          "Tea Estate et promenade romantique au milieu des collines de thé"
        ],
        'Dschang': [
          "Balade en pédalo sur le Lac municipal de Dschang",
          "Allées romantiques du Musée des Civilisations"
        ],
        'Garoua': [
          "Coucher de soleil doré sur les rives de la Bénoué"
        ],
        'Bamenda': [
          "Falaise d'Up-Station avec vue panoramique spectaculaire"
        ],
        'Autre ville': [
          "Restaurant chic et confidentiel sélectionné avec soin"
        ]
      };

      const foodSuggestions = [
        "Ndolé royal aux crevettes et miondo bien chaud",
        "Poulet DG croustillant et plantains mûrs dorés",
        "Poisson braisé tendre aux épices du pays et bâton de manioc",
        "Soya braisé au feu de bois avec kan-kan et oignons frais",
        "Koki fondant avec plantains vapeur",
        "Eru savoureux et water fufu",
        "Taro sauce jaune noble et généreux",
        "Pizza artisanale gourmande ou grillades savoureuses"
      ];

      const drinkSuggestions = [
        "Jus de foléré glacé parfumé à la menthe",
        "Cocktail fruité sans alcool (ananas, bissap & passion)",
        "Jus de baobab onctueux et rafraîchissant",
        "Jus d'ananas naturel fraîchement pressé",
        "Jus de gingembre tonique et citronné"
      ];

      const activitySuggestions = [
        "Balade complice main dans la main, rires et dégustation partagée",
        "Longue discussion sans voir le temps passer, regards complices et musique douce",
        "Séance photo spontanée pour garder un joli souvenir de cette rencontre",
        "Coucher de soleil à deux et confidences sous les étoiles",
        "Sortie glace gourmande et promenade tranquille"
      ];

      const giftSuggestions = [
        "Une rose délicate déposée avec soin sur la table 🌹",
        "Une douceur sucrée surprise à déguster ensemble 🍰",
        "Une playlist personnalisée avec nos morceaux préférés 🎶",
        "Un petit mot doux secret écrit spécialement pour toi 💌"
      ];

      const sweetMessages = [
        `« ${state.herName || 'Ma star'}, tout est pensé pour que tu passes un moment magique, sans stress et avec le plus beau sourire. ❤️ »`,
        `« Le programme est calé ! Promis, on va s'occuper de toi comme une vraie reine du Mboa. 🇨🇲✨ »`,
        `« Affaire de cœur seulement : prépare juste ta bonne humeur, je m'occupe de tout le reste ! 😌❤️ »`,
        `« Parce que certaines rencontres méritent qu'on mette les petits plats dans les grands… Hâte de partager ça avec toi ! 🌹 »`
      ];

      const cityPlaces = placeSuggestions[city] || placeSuggestions['Yaoundé'];
      const pickedPlace = cityPlaces[Math.floor(Math.random() * cityPlaces.length)];
      const pickedFood = foodSuggestions[Math.floor(Math.random() * foodSuggestions.length)];
      const pickedDrink = drinkSuggestions[Math.floor(Math.random() * drinkSuggestions.length)];
      const pickedActivity = activitySuggestions[Math.floor(Math.random() * activitySuggestions.length)];
      const pickedGift = giftSuggestions[Math.floor(Math.random() * giftSuggestions.length)];
      const pickedMessage = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];

      state.generatedProposal = {
        city,
        style,
        mood,
        moment,
        place: pickedPlace,
        food: pickedFood,
        drink: pickedDrink,
        activity: pickedActivity,
        gift: pickedGift,
        message: pickedMessage
      };

      const cardEl = document.getElementById('date-proposal-card');
      const tagEl = document.getElementById('proposal-city-tag');
      const placeEl = document.getElementById('proposal-place');
      const foodEl = document.getElementById('proposal-food');
      const drinkEl = document.getElementById('proposal-drink');
      const actEl = document.getElementById('proposal-activity');
      const giftEl = document.getElementById('proposal-gift');
      const msgEl = document.getElementById('proposal-message');

      if (tagEl) tagEl.textContent = `${city} • ${mood} (${moment})`;
      if (placeEl) placeEl.textContent = pickedPlace;
      if (foodEl) foodEl.textContent = pickedFood;
      if (drinkEl) drinkEl.textContent = pickedDrink;
      if (actEl) actEl.textContent = pickedActivity;
      if (giftEl) giftEl.textContent = pickedGift;
      if (msgEl) msgEl.textContent = pickedMessage;

      if (cardEl) {
        cardEl.classList.add('show');
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      playCelebrationFanfare();
      fireRomanticConfetti(50);
    }

    if (btnRunGen) btnRunGen.addEventListener('click', generateDateProposal);
    if (btnRegen) btnRegen.addEventListener('click', generateDateProposal);

    if (btnApply) {
      btnApply.addEventListener('click', () => {
        if (!state.generatedProposal) return;
        const p = state.generatedProposal;

        state.city = p.city;
        state.placeTitle = p.place;
        state.placeId = 'gen-' + Date.now();
        state.foods.clear();
        state.foods.add(p.food);
        state.drinks.clear();
        state.drinks.add(p.drink);
        state.extras.clear();
        state.extras.add(p.activity);
        state.moment = p.moment;

        if (btnContinue) btnContinue.disabled = false;

        playCelebrationFanfare();
        fireRomanticConfetti(80);

        setTimeout(() => {
          goToStep('step-4');
        }, 500);
      });
    }

    // 5. Onglets Cuisine & Cartes nourriture
    if (tabCameroon && tabIntl && gridCameroon && gridIntl) {
      tabCameroon.addEventListener('click', () => {
        tabCameroon.classList.add('active');
        tabIntl.classList.remove('active');
        gridCameroon.style.display = 'grid';
        gridIntl.style.display = 'none';
        playTone(600, 0.1, 'sine', 0.06);
      });

      tabIntl.addEventListener('click', () => {
        tabIntl.classList.add('active');
        tabCameroon.classList.remove('active');
        gridIntl.style.display = 'grid';
        gridCameroon.style.display = 'none';
        playTone(600, 0.1, 'sine', 0.06);
      });
    }

      // Compliments flatteurs et amusants par plat camerounais
  const dishCompliments = {
    'ndole': "NdolÃ© royal ! Madame a du goÃ»t, c'est du trÃ¨s haut niveau ! ðŸ‘‘ðŸ²",
    'poulet-dg': "Poulet DG ! Madame aime les choses de Directeur GÃ©nÃ©ral ðŸ˜‚ðŸ‘‘",
    'poisson-braise': "Poisson braisÃ© ! Avec les miondos bien chauds, c'est validÃ© ! ðŸŸðŸ”¥",
    'eru': "Eru complet ! Le vrai goÃ»t du Mboa, tu connais les vrais bails ! ðŸŒ¿âœ¨",
    'koki': "Koki royal ! Doux et raffinÃ© comme toi ! ðŸ’›",
    'soya': "Soya pimentÃ© ! Ambiance nocturne et complicitÃ© garantie ! ðŸ¢ðŸ”¥",
    'achu': "Achu soup jaune ! La gastronomie des grands jours, respect ! ðŸ²âœ¨",
    'kondre': "KondrÃ© bien mijotÃ© ! Un plat rÃ©confortant pour une personne spÃ©ciale ! ðŸŒâ¤ï¸",
    'burger': "Burger gourmand ! Moderne et gÃ©nÃ©reux ! ðŸ”âœ¨",
    'pizza': "Pizza artisanale ! Parfait pour les regards complices ! ðŸ•â¤ï¸",
    'pates': "PÃ¢tes fraÃ®ches Ã  l'italienne ! TrÃ¨s romantique, bella ! ðŸâœ¨",
    'grillades': "Grillades & salade ! FraÃ®cheur et Ã©lÃ©gance ! ðŸ¥—âœ¨"
  };

  function showDishToast(dishId, dishTitle) {
    const toast = document.getElementById('dish-reaction-toast');
    if (!toast) return;

    let compliment = dishCompliments[dishId];
    if (!compliment) {
      compliment = Â«  Â» ! Madame a un goÃ»t exquis, on va se rÃ©galer ! ðŸ˜‹âœ¨;
    }

    toast.innerHTML = <span>âœ¨</span><span></span>;
    toast.classList.add('show');
    playTone(720, 0.15, 'sine', 0.08);

    clearTimeout(window._dishToastTimeout);
    window._dishToastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
    const allFoodCards = document.querySelectorAll('#food-cameroon-grid .choice-card, #food-intl-grid .choice-card');
    allFoodCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-title');

        if (state.foods.has(title)) {
          state.foods.delete(title);
          card.classList.remove('selected');
        } else {
          state.foods.add(title);
          card.classList.add('selected');
          const dishId = card.getAttribute('data-id');
          showDishToast(dishId, title);
        }
      });
    });

    if (btnSurpriseFood) {
      btnSurpriseFood.addEventListener('click', () => {
        const cameroonCards = Array.from(document.querySelectorAll('#food-cameroon-grid .choice-card'));
        if (cameroonCards.length === 0) return;

        cameroonCards.forEach(c => c.classList.remove('selected'));
        state.foods.clear();

        const shuffled = cameroonCards.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2);

        selected.forEach(card => {
          card.classList.add('selected');
          state.foods.add(card.getAttribute('data-title'));
        });

        if (tabCameroon && tabIntl && gridCameroon && gridIntl) {
          tabCameroon.classList.add('active');
          tabIntl.classList.remove('active');
          gridCameroon.style.display = 'grid';
          gridIntl.style.display = 'none';
        }

        playCelebrationFanfare();
        fireRomanticConfetti(50);
      });
    }

    if (customFoodInput) {
      customFoodInput.addEventListener('input', () => {
        state.customFood = customFoodInput.value.trim();
      });
    }

    // 6. Boissons
    if (drinksGrid) {
      drinksGrid.querySelectorAll('.drink-card').forEach(card => {
        card.addEventListener('click', () => {
          const drink = card.getAttribute('data-drink');

          if (state.drinks.has(drink)) {
            state.drinks.delete(drink);
            card.classList.remove('selected');
            if (drink === 'Autre boisson' && customDrinkBox) {
              customDrinkBox.classList.remove('show');
            }
          } else {
            state.drinks.add(drink);
            card.classList.add('selected');
            playTone(740, 0.12, 'sine', 0.07);

            if (drink === 'Autre boisson') {
              if (customDrinkBox) customDrinkBox.classList.add('show');
              if (customDrinkInput) customDrinkInput.focus();
            }
          }
        });
      });
    }

    if (customDrinkInput) {
      customDrinkInput.addEventListener('input', () => {
        state.customDrink = customDrinkInput.value.trim();
      });
    }

    // 7. Activités
    if (extrasList) {
      extrasList.querySelectorAll('.extra-item').forEach(item => {
        item.addEventListener('click', () => {
          const label = item.querySelector('.extra-label').textContent.trim();
          if (state.extras.has(label)) {
            state.extras.delete(label);
            item.classList.remove('selected');
          } else {
            state.extras.add(label);
            item.classList.add('selected');
            playTone(720, 0.1, 'sine', 0.08);
          }
        });
      });
    }

    // 8. Moment, Date & Heure
    if (momentPills) {
      momentPills.querySelectorAll('.moment-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          momentPills.querySelectorAll('.moment-pill').forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');
          state.moment = pill.getAttribute('data-moment');
          playTone(650, 0.1, 'sine', 0.08);
        });
      });
    }

    if (dateInput) {
      dateInput.min = new Date().toISOString().split('T')[0];
      dateInput.addEventListener('change', () => {
        state.date = dateInput.value;
      });
    }

    if (timeInput) {
      timeInput.addEventListener('change', () => {
        state.time = timeInput.value;
      });
    }

    if (noteInput) {
      noteInput.addEventListener('input', () => {
        state.customNote = noteInput.value.trim();
      });
    }

    if (btnContinue) {
      btnContinue.addEventListener('click', () => {
        goToStep('step-4');
      });
    }

    if (btnBack) {
      btnBack.addEventListener('click', () => goToStep('step-2'));
    }
  }

  // ==========================================================================
  // ÉTAPE 4 : LA SURPRISE UNIQUE 🎁 (BOÎTE DE LUXE ÉLÉGANTE)
  // ==========================================================================
  function setupSingleSurprise() {
    const giftBox = document.getElementById('single-gift-box');
    const btnOpen = document.getElementById('btn-open-single-gift');
    const revealedCard = document.getElementById('surprise-revealed-card');
    const btnContinue = document.getElementById('btn-continue-surprises');
    const btnBack = document.getElementById('btn-back-step-4');
    const dimmer = document.getElementById('gift-cinematic-dimmer');
    const rays = document.getElementById('gift-golden-rays');

    function openTheSurprise() {
      if (state.singleSurpriseOpened) return;
      state.singleSurpriseOpened = true;

      if (dimmer) {
        dimmer.classList.add('active');
        setTimeout(() => dimmer.classList.remove('active'), 2500);
      }
      if (rays) {
        rays.classList.add('burst');
      }

      if (giftBox) giftBox.classList.add('opened');
      if (btnOpen) btnOpen.style.display = 'none';

      playCelebrationFanfare();
      fireRomanticConfetti(120);

      setTimeout(() => {
        if (revealedCard) {
          revealedCard.classList.add('show');
          revealedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 400);
    }

    if (giftBox) giftBox.addEventListener('click', openTheSurprise);
    if (btnOpen) btnOpen.addEventListener('click', openTheSurprise);

    if (btnContinue) {
      btnContinue.addEventListener('click', () => {
        populateRecap();
        goToStep('step-5');
      });
    }

    if (btnBack) {
      btnBack.addEventListener('click', () => goToStep('step-3'));
    }
  }

  // ==========================================================================
  // Ã‰TAPE 5 : RÃ‰CAPITULATIF FINAL & DISPATCH WHATSAPP
  // ==========================================================================
  function populateRecap() {
    const nameEl = document.getElementById('recap-name');
    const cityEl = document.getElementById('recap-city');
    const placeEl = document.getElementById('recap-place');
    const foodEl = document.getElementById('recap-food');
    const drinksEl = document.getElementById('recap-drinks');
    const extrasEl = document.getElementById('recap-extras');
    const datetimeEl = document.getElementById('recap-datetime');
    const messageEl = document.getElementById('recap-message');

    if (nameEl) nameEl.textContent = state.herName || 'Non précisé';
    if (cityEl) cityEl.textContent = `${state.city || 'Yaoundé'} 🇨🇲`;

    let finalPlace = state.placeTitle || 'Une belle surprise';
    if (state.placeId === 'autre' && state.customPlace) {
      finalPlace = `${state.customPlace} ✨`;
    }
    if (placeEl) placeEl.textContent = finalPlace;

    const foodArr = Array.from(state.foods);
    if (state.customFood) foodArr.push(state.customFood);
    if (foodEl) foodEl.textContent = foodArr.length > 0 ? foodArr.join(', ') : 'Au gré de nos envies 😋';

    const drinksArr = Array.from(state.drinks);
    if (state.customDrink) drinksArr.push(state.customDrink);
    if (drinksEl) drinksEl.textContent = drinksArr.length > 0 ? drinksArr.join(', ') : 'Jus frais ou cocktail 🥤';

    const extrasArr = Array.from(state.extras);
    if (extrasEl) extrasEl.textContent = extrasArr.length > 0 ? extrasArr.join(' • ') : 'Juste nous deux ❤️';

    let dt = [];
    if (state.date) {
      try {
        const dObj = new Date(state.date + 'T12:00:00');
        const formattedDate = dObj.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        });
        dt.push(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
      } catch (e) {
        dt.push(state.date);
      }
    }
    if (state.time) dt.push(`à ${state.time}`);
    if (state.moment) dt.push(`(${state.moment})`);
    if (datetimeEl) datetimeEl.textContent = dt.length > 0 ? dt.join(' ') : 'À définir ensemble 😊';

    if (messageEl) {
      messageEl.textContent = state.customNote || '« Rendez-vous très bientôt ! »';
    }
  }

  function generateWhatsAppText() {
    let finalPlace = state.placeTitle || 'Une belle surprise';
    if (state.placeId === 'autre' && state.customPlace) {
      finalPlace = state.customPlace;
    }

    const foodArr = Array.from(state.foods);
    if (state.customFood) foodArr.push(state.customFood);
    const finalFood = foodArr.length > 0 ? foodArr.join(', ') : 'Ce que tu choisiras avec amour';

    const drinksArr = Array.from(state.drinks);
    if (state.customDrink) drinksArr.push(state.customDrink);
    const finalDrinks = drinksArr.length > 0 ? drinksArr.join(', ') : 'Jus de foléré ou cocktail glacé';

    const extrasArr = Array.from(state.extras);
    const finalExtras = extrasArr.length > 0 ? extrasArr.join(', ') : 'Notre complicité et nos sourires';

    let dt = [];
    if (state.date) {
      try {
        const dObj = new Date(state.date + 'T12:00:00');
        dt.push(dObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }));
      } catch (e) {
        dt.push(state.date);
      }
    }
    if (state.time) dt.push(`à ${state.time}`);
    if (state.moment) dt.push(`(${state.moment})`);
    const finalDateTime = dt.length > 0 ? dt.join(' ') : 'À convenir ensemble';

    const text = 
`Coucou ma star ! ❤️

J'ai répondu à ton invitation ! Le programme est calé :

👤 Mon prénom : ${state.herName || 'Moi'}
🇨🇲 Ville : ${state.city || 'Yaoundé'}
📍 Lieu choisi : ${finalPlace}
🍲 Ce qu'on mange : ${finalFood}
🥤 Boisson : ${finalDrinks}
✨ Notre ambiance : ${finalExtras}
📅 Date & Heure : ${finalDateTime}
💬 Mon mot doux : ${state.customNote || 'Rendez-vous bientôt ! 😊'}

« Ce rendez-vous est mon invitation. Toi, viens simplement avec ton sourire. ❤️ »

Affaire de cœur seulement ! J'attends notre rendez-vous avec impatience 😊❤️`;

    return text;
  }

  function formatWhatsAppNumber(num) {
    let cleaned = (num || '').replace(/[^0-9]/g, '');
    if (cleaned.length === 9 && cleaned.startsWith('6')) {
      cleaned = '237' + cleaned;
    }
    return cleaned;
  }

  function sendWhatsApp() {
    const rawNumber = formatWhatsAppNumber(state.whatsappNumber);
    const message = generateWhatsAppText();
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${rawNumber}?text=${encoded}`;

    fireRomanticConfetti(150);
    playCelebrationFanfare();

    const overlay = document.getElementById('celebration-overlay');
    const titleEl = document.getElementById('celebration-title');
    const descEl = document.getElementById('celebration-desc');
    const emojiEl = document.getElementById('celebration-emoji');

    if (titleEl) titleEl.textContent = "Invitation prête à être envoyée ❤️";
    if (descEl) descEl.textContent = "WhatsApp s'ouvre pour transmettre tes réponses… Le programme est calé au Mboa ! 🇨🇲";
    if (emojiEl) emojiEl.textContent = "💌✨";
    if (overlay) overlay.classList.add('show');

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 700);

    setTimeout(() => {
      if (overlay) overlay.classList.remove('show');
    }, 4500);
  }

  function copySummaryToClipboard() {
    const message = generateWhatsAppText();
    const btn = document.getElementById('btn-copy-summary');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message).then(() => {
        if (btn) {
          const original = btn.innerHTML;
          btn.innerHTML = '<span>Copié dans le presse-papier ! ✨</span>';
          setTimeout(() => {
            btn.innerHTML = original;
          }, 2500);
        }
      });
    }
  }

  // ==========================================================================
  // CONFIGURATION MODAL WHATSAPP
  // ==========================================================================
  function setupConfigModal() {
    const openBtn = document.getElementById('open-config-btn');
    const closeBtn = document.getElementById('close-config-btn');
    const modal = document.getElementById('config-modal');
    const saveBtn = document.getElementById('cfg-save-btn');
    const input = document.getElementById('cfg-whatsapp-input');

    const saved = localStorage.getItem('romantic_wa_number');
    if (saved && saved !== '33612345678') {
      state.whatsappNumber = saved;
    } else {
      state.whatsappNumber = (window.APP_CONFIG && window.APP_CONFIG.whatsappNumber) || '237655752004';
      localStorage.setItem('romantic_wa_number', state.whatsappNumber);
    }
    if (input) input.value = state.whatsappNumber;

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        if (input) input.value = state.whatsappNumber;
        modal.classList.add('show');
      });
    }

    const closeModal = () => {
      if (modal) modal.classList.remove('show');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    if (saveBtn && input && modal) {
      saveBtn.addEventListener('click', () => {
        let val = input.value.trim().replace(/[^0-9]/g, '');
        if (val.length === 9 && val.startsWith('6')) {
          val = '237' + val;
        }
        if (val.length >= 7) {
          state.whatsappNumber = val;
          localStorage.setItem('romantic_wa_number', val);
          modal.classList.remove('show');
          playTone(800, 0.2, 'sine', 0.1);
        } else {
          alert('Veuillez entrer un numéro valide (ex: 655752004 ou 237655752004)');
        }
      });
    }
  }

  // ==========================================================================
  // TOGGLE SONS BRUITAGES
  // ==========================================================================
  function setupAudioToggle() {
    const btn = document.getElementById('audio-toggle-btn');
    const onIcon = document.getElementById('sound-on-icon');
    const offIcon = document.getElementById('sound-off-icon');

    const saved = localStorage.getItem('romantic_sound_enabled');
    if (saved !== null) {
      state.soundEnabled = saved === 'true';
    }

    function updateIcons() {
      if (onIcon && offIcon) {
        onIcon.style.display = state.soundEnabled ? 'block' : 'none';
        offIcon.style.display = state.soundEnabled ? 'none' : 'block';
      }
    }
    updateIcons();

    if (btn) {
      btn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        localStorage.setItem('romantic_sound_enabled', state.soundEnabled);
        updateIcons();
        if (state.soundEnabled) {
          playTone(550, 0.15, 'sine', 0.1);
        }
      });
    }
  }

  // Fallback sécurisé en cas de problème d'image externe
  function setupImageFallbacks() {
    document.querySelectorAll('.choice-card-img').forEach(img => {
      img.addEventListener('error', () => {
        img.style.display = 'none';
      });
    });
  }

  // ==========================================================================
  // INITIALISATION GLOBALE
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    setupArrivalOverlay();
    initAmbientCanvas();
    setupImageFallbacks();
    setupAudioToggle();
    setupMusicPlayer();
    setupConfigModal();
    setupSecretEnvelope();
    setupEvasiveButton();
    setupRendezvousHub();
    setupSingleSurprise();

    // Bouton OUI de l'étape 2
    const btnYes = document.getElementById('btn-yes');
    if (btnYes) btnYes.addEventListener('click', onYesClicked);

    // Bouton Retour étape 5 vers étape 3
    const btnBack5 = document.getElementById('btn-back-step-5');
    if (btnBack5) btnBack5.addEventListener('click', () => goToStep('step-3'));

    // Bouton WhatsApp
    const btnWa = document.getElementById('btn-send-whatsapp');
    if (btnWa) btnWa.addEventListener('click', sendWhatsApp);

    // Bouton Copier
    const btnCopy = document.getElementById('btn-copy-summary');
    if (btnCopy) btnCopy.addEventListener('click', copySummaryToClipboard);

    // Prise en charge des clics pour l'AudioContext
    window.addEventListener('click', () => initAudio(), { once: true });
    window.addEventListener('touchstart', () => initAudio(), { once: true });
  });

  // Export dans l'objet global window.App
  window.App = {
    state,
    goToStep,
    submitName,
    onYesClicked,
    sendWhatsApp,
    copySummaryToClipboard
  };

})();
