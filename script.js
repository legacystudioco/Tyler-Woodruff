/**
 * PORTFOLIO 2026 — MAIN SCRIPT
 *
 * Responsibilities:
 *   1. Detect device (desktop / mobile) from viewport width.
 *   2. Build .scene elements and inject images for every vertical section.
 *   3. Build .panel elements for the horizontal "What I Build" section.
 *   4. Lazy-load all non-first scenes via IntersectionObserver.
 *   5. Eagerly preload the very first hero scene and all horizontal panels.
 *   6. GSAP: pin + horizontal scroll for the desktop horizontal section.
 *   7. Mobile: hide swipe hint after first touch.
 *   8. Rebuild on breakpoint-crossing resize (desktop ↔ mobile).
 */

'use strict';

const IS_MOBILE = window.innerWidth <= 768;

/* ===========================================
   CONFIG
   =========================================== */

/**
 * Vertical sections.
 * name           : matches data-section attr + folder under assets/
 * desktopCount   : number of desktop artboard images (sequential from 01)
 * mobileCount    : number of mobile artboard images (sequential from 01)
 * desktopIndices : explicit index list — overrides desktopCount when present
 * mobileIndices  : explicit index list — overrides mobileCount when present
 */
const SECTIONS = [
  { name: 'hero',          desktopCount: 1,             mobileCount: 1 },
  { name: 'about',         desktopCount: 1,             mobileCount: 1 },
  { name: 'toc',           desktopCount: 1,             mobileCount: 1 },
  { name: 'selected-work', desktopCount: 4,             mobileCount: 4 },
  { name: 'contact',       desktopCount: 1,             mobileCount: 1 },
];

/** Horizontal section config */
const H_SECTION = {
  name:         'what-i-build',
  desktopCount: 3,
  mobileCount:  4,
};


/** Width (px) at which we switch from mobile to desktop assets */
const BREAKPOINT = 1024;

/** Artboard dimensions (used for width/height attrs — helps browser reserve space) */
const DIM = {
  desktop: { w: 1920, h: 1080 },
  mobile:  { w: 1080, h: 1661 },
};

/** Build a sequential index array [1, 2, …, n] */
const seq = (n) => Array.from({ length: n }, (_, i) => i + 1);


/* ===========================================
   HOTSPOT DATA — DESKTOP ONLY (1920×1080)
   Coordinates are top-left artboard px values.
   % conversion happens at injection time.
   =========================================== */

const ABOUT_HOTSPOTS_DESKTOP = [
  { href: 'tel:5136008006',                                    label: 'Phone',
    x: 121.2842,  y: 922.5779, w: 199.2123, h: 39.3228 },
  { href: 'mailto:pastor.tyler.woodruff@gmail.com',            label: 'Email',
    x: 115.0631,  y: 970.9142, w: 330.8287, h: 39.3228 },
  { href: 'https://www.linkedin.com/in/tyler-woodruff-a8179a175',
    label: 'LinkedIn', target: '_blank', rel: 'noopener noreferrer',
    x: 450.1795,  y: 922.5779, w: 282.1037, h: 39.3228 },
];

const TOC_HOTSPOTS_DESKTOP = [
  // Selected Work — label + box
  { target: '#selected-work', label: 'Selected Work',
    x: 390.2552, y:  493.794,  w: 249.8781, h:  59.8587 },
  { target: '#selected-work', label: 'Selected Work',
    x: 390.2552, y:  571.5253, w: 249.8781, h: 215.9152 },
  // What I Build — label + box
  { target: '#what-i-build',  label: 'What I Build',
    x: 852.8191, y:  493.794,  w: 249.8781, h:  59.8587 },
  { target: '#what-i-build',  label: 'What I Build',
    x: 852.8191, y:  571.5253, w: 249.8781, h: 215.9152 },
  // Contact — label + box
  { target: '#contact',       label: 'Contact',
    x: 1288.7564, y:  493.794,  w: 249.8781, h:  59.8587 },
  { target: '#contact',       label: 'Contact',
    x: 1288.7564, y:  575.5869, w: 249.8781, h: 211.8536 },
];

const CONTACT_HOTSPOTS_DESKTOP = [
  { href: 'tel:5136008006',                                    label: 'Phone',
    x: 863.9603, y: 614.7281, w: 380.0438, h: 77.9692 },
  { href: 'mailto:pastor.tyler.woodruff@gmail.com',            label: 'Email',
    x: 863.9603, y: 707.9216, w: 623.6298, h: 77.9692 },
  { href: 'https://www.linkedin.com/in/tyler-woodruff-a8179a175',
    label: 'LinkedIn', target: '_blank', rel: 'noopener noreferrer',
    x: 863.9603, y: 801.5664, w: 623.6298, h: 77.9692 },
];


/* ===========================================
   HOTSPOT DATA — MOBILE ONLY (1080×1661 artboard)
   Coordinates are top-left artboard px values.
   % conversion uses img.naturalWidth / img.naturalHeight at injection time.
   =========================================== */

const MOBILE_HOTSPOTS = {

  about: [
    { x: 151.5188, y: 1534.9589, w: 255.8011, h:  46.1385,
      href: 'tel:5136008006',
      aria: 'Phone' },
    { x: 155.8810, y: 1430.8261, w: 781.9055, h:  90.8044,
      href: 'mailto:pastor.tyler.woodruff@gmail.com',
      aria: 'Email' },
    { x: 155.8810, y: 1546.1550, w: 781.9055, h:  90.8044,
      href: 'https://www.linkedin.com/in/tyler-woodruff-a8179a175',
      aria: 'LinkedIn', target: '_blank', rel: 'noopener noreferrer' },
  ],

  toc: [
    // Selected Work — label area
    { x: 151.5188, y: 1534.9589, w: 255.8011, h:  46.1385,
      scrollTarget: '#selected-work', aria: 'Selected Work' },
    // Selected Work — box area
    { x: 137.9617, y: 1596.3153, w: 431.1175, h:  50.3990,
      scrollTarget: '#selected-work', aria: 'Selected Work' },
    // What I Build — label area
    { x: 576.7777, y: 1534.9589, w: 379.4411, h:  44.2061,
      scrollTarget: '#what-i-build', aria: 'What I Build' },
    // What I Build — box area
    { x:  63.0103, y:  408.6304, w: 406.8836, h:  72.3793,
      scrollTarget: '#what-i-build', aria: 'What I Build' },
    // Contact — label area
    { x:  82.9766, y:  535.6282, w: 370.4908, h: 347.7252,
      scrollTarget: '#contact', aria: 'Contact' },
    // Contact — box area
    { x: 570.4167, y:  629.1394, w: 406.8836, h:  72.3793,
      scrollTarget: '#contact', aria: 'Contact' },
  ],

  contact: [
    { x: 222.6502, y: 1036.8874, w: 263.9162, h:  72.3793,
      href: 'tel:5136008006',
      aria: 'Phone' },
    { x: 185.5662, y: 1169.4246, w: 328.1333, h: 320.6106,
      href: 'mailto:pastor.tyler.woodruff@gmail.com',
      aria: 'Email' },
    { x: 155.8810, y: 1313.4762, w: 490.5809, h:  90.8044,
      href: 'https://www.linkedin.com/in/tyler-woodruff-a8179a175',
      aria: 'LinkedIn', target: '_blank', rel: 'noopener noreferrer' },
  ],

};


/* ===========================================
   DEVICE HELPERS
   =========================================== */

const isMobile    = () => window.innerWidth < BREAKPOINT;
const assetType    = () => (isMobile() ? 'M' : 'D');
const assetVariant = () => (isMobile() ? 'mobile' : 'desktop');


/* ===========================================
   PATH BUILDERS
   =========================================== */

/**
 * Build the PNG path for one artboard image.
 * e.g. buildPath('hero', 'D', 1) → 'assets/hero/desktop/hero_D_01.png'
 */
function buildPath(section, type, index) {
  const folder = type === 'D' ? 'desktop' : 'mobile';
  const padded = String(index).padStart(2, '0');
  return `assets/${section}/${folder}/${section}_${type}_${padded}.png`;
}

/** Same path with .webp extension — kept for future use */
function toWebP(pngPath) {
  return pngPath.replace(/\.png$/, '.webp');
}


/* ===========================================
   DOM FACTORY: one <picture> element
   =========================================== */

/**
 * Create a <picture><source webp /><img /></picture> element.
 *
 * @param {string}  src     – PNG path
 * @param {string}  alt     – alt text
 * @param {boolean} eager   – true = load immediately (fetchpriority high)
 * @param {string}  variant – 'desktop' | 'mobile' (for width/height attrs)
 * @returns {HTMLPictureElement}
 */
function createPicture(src, alt, eager, variant) {
  const { w, h } = DIM[variant];

  const picture = document.createElement('picture');

  // WebP source — srcset intentionally left unset until webp assets exist.
  // An absent srcset causes browsers to skip this source entirely and fall
  // through to the <img> PNG below. Setting srcset to a 404 URL would
  // break the image because browsers do not fall back from a failed fetch.
  const webpSrc = document.createElement('source');
  webpSrc.type  = 'image/webp';

  // PNG fallback img
  const img    = document.createElement('img');
  img.alt      = alt;
  img.width    = w;
  img.height   = h;
  img.decoding = 'async';

  if (eager) {
    // Load immediately; highest priority for above-the-fold content.
    img.loading       = 'eager';
    img.fetchPriority = 'high';
    img.src           = src;
  } else {
    // Lazy: store real src in data-src; IntersectionObserver swaps it in.
    // Do NOT set img.src — an absent src renders as empty space, whereas
    // src="" triggers a request to the current URL and shows a broken-image icon.
    img.loading     = 'lazy';
    img.dataset.src = src;
  }

  picture.appendChild(webpSrc);
  picture.appendChild(img);
  return picture;
}


/* ===========================================
   DOM FACTORY: one .scene element
   =========================================== */

/**
 * Build a .scene > .canvas > picture structure.
 *
 * @param {string}  src     – PNG path
 * @param {string}  alt     – accessible alt text
 * @param {boolean} eager   – preload immediately?
 * @param {string}  variant – 'desktop' | 'mobile'
 * @returns {HTMLDivElement} .scene element
 */
function createScene(src, alt, eager, variant) {
  const scene = document.createElement('div');
  scene.className = 'scene';

  const canvas = document.createElement('div');
  canvas.className = `canvas canvas--${variant}`;

  canvas.appendChild(createPicture(src, alt, eager, variant));
  scene.appendChild(canvas);
  return scene;
}


/* ===========================================
   BUILD: vertical sections
   =========================================== */

function buildSections() {
  const type    = assetType();
  const variant = assetVariant();

  SECTIONS.forEach((cfg, sectionIdx) => {
    const el = document.querySelector(`[data-section="${cfg.name}"]`);
    if (!el) return;

    // Use explicit index list when provided; otherwise derive from count.
    const indices = isMobile()
      ? (cfg.mobileIndices  || seq(cfg.mobileCount))
      : (cfg.desktopIndices || seq(cfg.desktopCount));

    indices.forEach((idx, i) => {
      const src   = buildPath(cfg.name, type, idx);
      const alt   = `${cfg.name} — scene ${idx}`;
      // Only the very first image of the very first section loads eagerly.
      const eager = (sectionIdx === 0 && i === 0);

      const scene = createScene(src, alt, eager, variant);

      // selected-work scene 03 is 1920×1144 — mark it for the tall-ratio override
      if (cfg.name === 'selected-work' && idx === 3 && variant === 'desktop') {
        scene.classList.add('scene--tall');
      }

      el.appendChild(scene);
    });
  });
}


/* ===========================================
   BUILD: horizontal panels
   =========================================== */

function buildHorizontalSection() {
  const track = document.querySelector('#what-i-build .horizontal-track');
  if (!track) return;

  if (window.innerWidth >= BREAKPOINT) {
    // Desktop: build multiple panels from artboard images
    const count = H_SECTION.desktopCount;

    for (let i = 1; i <= count; i++) {
      const src = buildPath(H_SECTION.name, 'D', i);
      const alt = `What I Build — panel ${i}`;

      const panel = document.createElement('div');
      panel.className = 'panel';
      panel.setAttribute('role',       'listitem');
      panel.setAttribute('aria-label', alt);
      panel.setAttribute('tabindex',   '0');

      const canvas = document.createElement('div');
      canvas.className = 'canvas canvas--desktop';
      // Panels load eagerly — they must render immediately when the section is visible.
      canvas.appendChild(createPicture(src, alt, true /* eager */, 'desktop'));

      panel.appendChild(canvas);
      track.appendChild(panel);
    }
  } else {
    // Mobile: tall scroll-space + sticky inner + GPU-promoted img
    const space = document.createElement('div');
    space.className = 'h-scroll-space';

    const inner = document.createElement('div');
    inner.className = 'horizontal-inner';

    const img         = document.createElement('img');
    img.alt           = 'What I Build';
    img.width         = 4337;
    img.height        = 1662;
    img.loading       = 'eager';
    img.fetchPriority = 'high';
    img.decoding      = 'async';
    img.src           = 'assets/what-i-build/mobile/what-i-build_M_01.webp';

    inner.appendChild(img);
    space.appendChild(inner);
    track.appendChild(space);
  }
}


/* ===========================================
   LAZY LOAD — IntersectionObserver
   =========================================== */

let lazyObserver = null;

/** Swap data-src → src for a lazy img */
function revealImage(img) {
  const src = img.dataset.src;
  if (!src) return;   // already loaded or not lazy

  img.src = src;
  delete img.dataset.src;
}

function initLazyLoad() {
  // Disconnect any previous observer (used during rebuild)
  if (lazyObserver) {
    lazyObserver.disconnect();
    lazyObserver = null;
  }

  const lazySrcs = document.querySelectorAll('img[data-src]');
  if (!lazySrcs.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: load everything synchronously
    lazySrcs.forEach(revealImage);
    return;
  }

  lazyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealImage(entry.target);
          lazyObserver.unobserve(entry.target);
        }
      });
    },
    {
      // Start loading 300px before the image enters the viewport
      rootMargin: '300px 0px',
      threshold:  0,
    }
  );

  lazySrcs.forEach((img) => lazyObserver.observe(img));
}


/* ===========================================
   GSAP — HORIZONTAL SCROLL (ALL DEVICES)
   =========================================== */

function initHorizontalScroll() {

  const section = document.querySelector('#what-i-build');
  const track = section?.querySelector('.horizontal-track');
  if (!section || !track) return;

  // Kill existing triggers tied to this section
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.trigger === section) {
      trigger.kill(true);
    }
  });

  if (window.innerWidth <= 768) {

    const space = track.querySelector('.h-scroll-space');
    if (!space) return;

    const inner = space.querySelector('.horizontal-inner');
    if (!inner) return;

    const img = inner.querySelector('img');
    if (!img) return;

    const init = () => {

      // Rendered width = natural width scaled to 100vh height
      const renderedWidth = Math.round(img.naturalWidth * (window.innerHeight / img.naturalHeight));
      const travel = Math.max(0, renderedWidth - window.innerWidth);

      // Give the track enough height to scroll through the full travel distance
      space.style.height = (window.innerHeight + travel) + 'px';

      // Cache section offset from page top (getBoundingClientRect forces reflow after height is set)
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;

      const onScroll = () => {
        const progress = Math.min(1, Math.max(0, (window.scrollY - sectionTop) / travel));
        img.style.transform = `translateX(${-Math.round(travel * progress)}px)`;
      };

      mobileScrollListener = onScroll;
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll(); // set initial position
    };

    img.complete ? init() : img.onload = init;

    return;
  }

  /* ── DESKTOP: multiple panels ── */
  const panels = gsap.utils.toArray('#what-i-build .panel');
  if (!panels.length) return;

  /*
   * Travel distance = actual scrollable width of the track minus the viewport.
   * Recalculated on every refresh so it stays correct after resize or rebuild.
   */
  const getTravelDistance = () => track.scrollWidth - window.innerWidth;

  /*
   * Pin the section and animate the track's X position.
   * scrub: 1 → continuous glide directly tied to scroll, no snap.
   */
  gsap.to(track, {
    x: () => -getTravelDistance(),
    ease: 'none',
    scrollTrigger: {
      id:                  'horizontal-scroll',
      trigger:             section,
      start:               'top top',
      end:                 () => `+=${getTravelDistance()}`,
      scrub:               1,
      pin:                 true,
      anticipatePin:       1,
      invalidateOnRefresh: true,
    },
  });

  // Keyboard: Tab into a panel → scroll to it
  if (panels.length > 1) {
    panels.forEach((panel, i) => {
      panel.addEventListener('focus', () => {
        const st = ScrollTrigger.getById('horizontal-scroll');
        if (!st) return;
        const progress = i / (panels.length - 1);
        const targetY  = st.start + progress * getTravelDistance();
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      });
    });
  }
}


/* ===========================================
   GSAP — INIT
   =========================================== */

function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({
    limitCallbacks:     true,
    ignoreMobileResize: true,
  });

  // Horizontal scroll runs on all devices — GSAP handles both desktop and mobile
  initHorizontalScroll();
}


/* ===========================================
   MOBILE: hide swipe hint after first interaction
   =========================================== */

function initSwipeHint() {
  const hint    = document.querySelector('#what-i-build .swipe-hint');
  const section = document.querySelector('#what-i-build');
  if (!hint || !section) return;

  const hide = () => {
    hint.classList.add('is-hidden');
    section.removeEventListener('touchstart', hide, { passive: true });
    section.removeEventListener('scroll',     hide, { passive: true });
  };

  section.addEventListener('touchstart', hide, { once: true, passive: true });
  section.addEventListener('scroll',     hide, { once: true, passive: true });
}


/* ===========================================
   RESIZE — rebuild if breakpoint is crossed
   =========================================== */

let _currentMobile       = null;
let _resizeTimer         = null;
let mobileScrollListener = null;

function onResize() {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(() => {
    const nowMobile = isMobile();

    if (nowMobile !== _currentMobile) {
      // Crossed the breakpoint — full rebuild required
      _currentMobile = nowMobile;
      rebuild();
    } else {
      // Same mode, just recalculate ScrollTrigger measurements
      ScrollTrigger.refresh();
    }
  }, 250);
}

function rebuild() {
  // 1. Kill all GSAP ScrollTriggers
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // Clean up mobile scroll listener if active
  if (mobileScrollListener) {
    window.removeEventListener('scroll', mobileScrollListener);
    mobileScrollListener = null;
  }

  // 2. Clear injected scenes from every vertical section
  document.querySelectorAll('.section').forEach((el) => {
    el.innerHTML = '';
  });

  // 3. Clear horizontal panels
  const track = document.querySelector('#what-i-build .horizontal-track');
  if (track) track.innerHTML = '';

  // 4. Rebuild DOM
  buildSections();
  injectAboutHotspots();
  injectTocHotspots();
  injectContactHotspots();
  injectMobileAboutHotspots();
  injectMobileTOCHotspots();
  injectMobileContactHotspots();
  buildHorizontalSection();

  // 5. Re-attach lazy loading
  initLazyLoad();

  // 6. Re-init GSAP
  initGSAP();

  // 7. Re-init swipe hint (mobile only; no-op on desktop)
  if (isMobile()) initSwipeHint();
}


/* ===========================================
   INIT
   =========================================== */

/** Inject ABOUT contact hotspots — desktop only */
function injectAboutHotspots() {
  if (isMobile()) return;

  const canvas = document.querySelector('#about .canvas');
  if (!canvas) return;

  const existing = canvas.querySelector('.hotspot-layer');
  if (existing) existing.remove();

  const layer = document.createElement('div');
  layer.className = 'hotspot-layer';

  ABOUT_HOTSPOTS_DESKTOP.forEach((cfg) => {
    const a = document.createElement('a');
    a.href      = cfg.href;
    a.className = 'hotspot';
    a.setAttribute('aria-label', cfg.label);
    if (cfg.target) a.target = cfg.target;
    if (cfg.rel)    a.rel    = cfg.rel;
    a.style.left   = (cfg.x / 1920 * 100) + '%';
    a.style.top    = (cfg.y / 1080 * 100) + '%';
    a.style.width  = (cfg.w / 1920 * 100) + '%';
    a.style.height = (cfg.h / 1080 * 100) + '%';
    layer.appendChild(a);
  });

  canvas.appendChild(layer);
}

/** Inject CONTACT hotspots — desktop only */
function injectContactHotspots() {
  if (isMobile()) return;

  const canvas = document.querySelector('#contact .canvas');
  if (!canvas) return;

  const existing = canvas.querySelector('.hotspot-layer');
  if (existing) existing.remove();

  const layer = document.createElement('div');
  layer.className = 'hotspot-layer';

  CONTACT_HOTSPOTS_DESKTOP.forEach((cfg) => {
    const a = document.createElement('a');
    a.href      = cfg.href;
    a.className = 'hotspot';
    a.setAttribute('aria-label', cfg.label);
    if (cfg.target) a.target = cfg.target;
    if (cfg.rel)    a.rel    = cfg.rel;
    a.style.left   = (cfg.x / 1920 * 100) + '%';
    a.style.top    = (cfg.y / 1080 * 100) + '%';
    a.style.width  = (cfg.w / 1920 * 100) + '%';
    a.style.height = (cfg.h / 1080 * 100) + '%';
    layer.appendChild(a);
  });

  canvas.appendChild(layer);
}

/** Inject TOC navigation hotspots — desktop only */
function injectTocHotspots() {
  if (isMobile()) return;

  const canvas = document.querySelector('#toc .canvas');
  if (!canvas) return;

  const existing = canvas.querySelector('.hotspot-layer');
  if (existing) existing.remove();

  const layer = document.createElement('div');
  layer.className = 'hotspot-layer';

  TOC_HOTSPOTS_DESKTOP.forEach((cfg) => {
    const a = document.createElement('a');
    a.href      = cfg.target;
    a.className = 'hotspot';
    a.setAttribute('aria-label', cfg.label);
    a.style.left   = (cfg.x / 1920 * 100) + '%';
    a.style.top    = (cfg.y / 1080 * 100) + '%';
    a.style.width  = (cfg.w / 1920 * 100) + '%';
    a.style.height = (cfg.h / 1080 * 100) + '%';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const dest = document.querySelector(cfg.target);
      if (dest) dest.scrollIntoView({ behavior: 'smooth' });
    });
    layer.appendChild(a);
  });

  canvas.appendChild(layer);
}


/* ===========================================
   MOBILE HOTSPOT HELPERS
   =========================================== */

/**
 * Build one hotspot <a> element, converting artboard px to % via naturalWidth/naturalHeight.
 * @param {object} cfg  – entry from MOBILE_HOTSPOTS
 * @param {number} nw   – img.naturalWidth
 * @param {number} nh   – img.naturalHeight
 */
function buildMobileHotspot(cfg, nw, nh) {
  const a = document.createElement('a');
  a.className = 'hotspot';
  a.setAttribute('aria-label', cfg.aria);

  a.style.left   = ((cfg.x / nw) * 100).toFixed(4) + '%';
  a.style.top    = ((cfg.y / nh) * 100).toFixed(4) + '%';
  a.style.width  = ((cfg.w / nw) * 100).toFixed(4) + '%';
  a.style.height = ((cfg.h / nh) * 100).toFixed(4) + '%';

  if (cfg.href) {
    // tel:, mailto:, or external link
    a.href = cfg.href;
    if (cfg.target) a.target = cfg.target;
    if (cfg.rel)    a.rel    = cfg.rel;
  } else if (cfg.scrollTarget) {
    // In-page scroll anchor
    a.href = cfg.scrollTarget;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const dest = document.querySelector(cfg.scrollTarget);
      if (dest) dest.scrollIntoView({ behavior: 'smooth' });
    });
  }

  return a;
}

/**
 * Create a hotspot layer inside a canvas, injecting once the img is loaded.
 * @param {HTMLElement} canvas     – .canvas element
 * @param {object[]}    hotspots   – array of hotspot config objects
 */
function injectMobileHotspotLayer(canvas, hotspots) {
  const img = canvas.querySelector('img');
  if (!img) return;

  const inject = () => {
    const existing = canvas.querySelector('.hotspot-layer');
    if (existing) existing.remove();

    const nw = img.naturalWidth;
    const nh = img.naturalHeight;

    const layer = document.createElement('div');
    layer.className = 'hotspot-layer';

    hotspots.forEach((cfg) => layer.appendChild(buildMobileHotspot(cfg, nw, nh)));

    canvas.appendChild(layer);
  };

  if (img.complete && img.naturalWidth > 0) {
    inject();
  } else {
    img.addEventListener('load', inject, { once: true });
  }
}

/** Inject ABOUT contact hotspots — mobile only */
function injectMobileAboutHotspots() {
  if (!isMobile()) return;
  const canvas = document.querySelector('#about .canvas');
  if (!canvas) return;
  injectMobileHotspotLayer(canvas, MOBILE_HOTSPOTS.about);
}

/** Inject TOC navigation hotspots — mobile only */
function injectMobileTOCHotspots() {
  if (!isMobile()) return;
  const canvas = document.querySelector('#toc .canvas');
  if (!canvas) return;
  injectMobileHotspotLayer(canvas, MOBILE_HOTSPOTS.toc);
}

/** Inject CONTACT hotspots — mobile only */
function injectMobileContactHotspots() {
  if (!isMobile()) return;
  const canvas = document.querySelector('#contact .canvas');
  if (!canvas) return;
  injectMobileHotspotLayer(canvas, MOBILE_HOTSPOTS.contact);
}


function init() {
  _currentMobile = isMobile();

  buildSections();
  injectAboutHotspots();
  injectTocHotspots();
  injectContactHotspots();
  injectMobileAboutHotspots();
  injectMobileTOCHotspots();
  injectMobileContactHotspots();
  buildHorizontalSection();
  initLazyLoad();
  initGSAP();

  if (isMobile()) initSwipeHint();

  window.addEventListener('resize', onResize, { passive: true });
}

// Run after DOM is ready (script has `defer` so DOM is always ready, but guard anyway)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
