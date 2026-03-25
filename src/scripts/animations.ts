import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function initAnimations() {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    initNavDots();
    return;
  }

  initHeroAnimations();
  initSectionAnimations();
  initCardStagger();
  initTiltEffect();
  initWipPulse();
  initParallax();
  initKpiCounter();
  initNavDots();
  initNavDotColors();
  initKeyboardNav();
}

// ── Keyboard navigation (Arrow keys + Home/End) ──────────────
function initKeyboardNav() {
  const sections = document.querySelectorAll('.section');
  if (sections.length === 0) return;

  let currentIndex = 0;

  // Track current section via ScrollTrigger
  sections.forEach((sec, i) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => { currentIndex = i; },
      onEnterBack: () => { currentIndex = i; },
    });
  });

  document.addEventListener('keydown', (e) => {
    // Don't hijack when focus is on an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    let targetIndex = currentIndex;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      targetIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      targetIndex = Math.max(currentIndex - 1, 0);
    } else if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = sections.length - 1;
    } else {
      return;
    }

    if (targetIndex === currentIndex) return;

    e.preventDefault();
    currentIndex = targetIndex;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      sections[targetIndex].scrollIntoView({ behavior: 'auto' });
    } else {
      gsap.to(window, {
        scrollTo: { y: sections[targetIndex] as HTMLElement, autoKill: true },
        duration: 0.8,
        ease: 'power2.inOut',
      });
    }
  });
}

// ── Hero entrance animation ──────────────────────────────────
function initHeroAnimations() {
  const hero = document.querySelector('#s01');
  if (!hero) return;

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  tl.from(hero.querySelector('.hero-header'), {
    opacity: 0, y: 20, duration: 0.6,
  })
  .from(hero.querySelector('.hero-title'), {
    opacity: 0, y: 30, duration: 0.8,
  }, '-=0.3')
  .from(hero.querySelector('.hero-subtitle'), {
    opacity: 0, y: 20, duration: 0.6,
  }, '-=0.4')
  .from(hero.querySelector('.hero-geo'), {
    opacity: 0, scale: 0.8, duration: 1,
    ease: 'power3.out',
  }, '-=0.6')
  .from(hero.querySelectorAll('.particle'), {
    opacity: 0, scale: 0, stagger: 0.1, duration: 0.4,
  }, '-=0.5');
}

// ── Section entrance (fade + slide up) ───────────────────────
function initSectionAnimations() {
  document.querySelectorAll('.section').forEach((sec) => {
    if (sec.id === 's01') return; // Hero has its own animation

    const container = sec.querySelector('.section-container');
    if (!container) return;

    gsap.from(container, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sec,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    // Stagger content blocks within section
    const blocks = sec.querySelectorAll('.content-block, .context-card, .pillar-card');
    if (blocks.length > 0) {
      gsap.from(blocks, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 70%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }
  });
}

// ── Product cards stagger (S02) ──────────────────────────────
function initCardStagger() {
  const cards = document.querySelectorAll('.product-card');
  if (cards.length === 0) return;

  gsap.from(cards, {
    opacity: 0,
    y: 40,
    scale: 0.95,
    stagger: 0.12,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.cards-grid',
      start: 'top 75%',
      toggleActions: 'play none none none',
      once: true,
    },
  });
}

// ── 3D Tilt effect on cards ───────────────────────────────
function initTiltEffect() {
  document.querySelectorAll<HTMLElement>('.product-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── WIP Card Pulse (Breathing effect) ───────────────────────
function initWipPulse() {
  const overlays = document.querySelectorAll('.product-card--wip .wip-overlay');
  if (overlays.length === 0) return;

  gsap.to(overlays, {
    opacity: 0.6,
    duration: 1.6,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

// ── Parallax on scroll ───────────────────────────────────────
function initParallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.1');
    gsap.to(el, {
      y: () => ScrollTrigger.maxScroll(window) * speed * -0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('.section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
  });
}

// ── KPI counter animation ────────────────────────────────────
function initKpiCounter() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count || '0');
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from(el, {
          textContent: 0,
          duration: 1.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
        });
      },
    });
  });
}

// ── Nav dots: click to scroll ────────────────────────────────
function initNavDots() {
  const dots = document.querySelectorAll<HTMLButtonElement>('.nav-dot');

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = dot.dataset.target;
      if (!target) return;

      const section = document.querySelector(target);
      if (!section) return;

      // Use GSAP scroll if available, otherwise native
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        section.scrollIntoView({ behavior: 'auto' });
      } else {
        gsap.to(window, {
          scrollTo: { y: section, autoKill: true },
          duration: 0.8,
          ease: 'power2.inOut',
        });
      }
    });
  });

  // Update active dot on scroll
  const sections = document.querySelectorAll('.section');
  sections.forEach((sec, i) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveDot(i),
      onEnterBack: () => setActiveDot(i),
    });
  });

  function setActiveDot(index: number) {
    dots.forEach((d, i) => {
      d.classList.toggle('nav-dot--active', i === index);
    });
  }
}

// ── Helper: rgba string → hex (with optional alpha) ─────────
const rgbaToHex = (rgba: string, alpha?: number): string => {
  if (rgba.startsWith('#')) return rgba;
  const parts = rgba.match(/\d+/g);
  if (!parts || parts.length < 3) return rgba;
  const r = parseInt(parts[0]).toString(16).padStart(2, '0');
  const g = parseInt(parts[1]).toString(16).padStart(2, '0');
  const b = parseInt(parts[2]).toString(16).padStart(2, '0');
  const a = alpha ? Math.round(alpha * 255).toString(16).padStart(2, '0') : '';
  return `#${r}${g}${b}${a}`;
};

// ── Delphos cinematic animation ──────────────────────────────
export function initDelphosMotion() {
  const stage = document.getElementById('delphos-stage');
  const statusText = document.getElementById('delphos-status');

  if (!stage || !statusText || stage.dataset.initialized === 'true') return;
  stage.dataset.initialized = 'true';

  const inTracks = document.querySelectorAll<SVGPathElement>('.in-track');
  const outTracks = document.querySelectorAll<SVGPathElement>('.out-track');

  [...Array.from(inTracks), ...Array.from(outTracks)].forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });

  gsap.set('.delphos-core', { scale: 0.8, opacity: 0 });
  gsap.set('.input-node', { opacity: 0, x: -20 });
  gsap.set('.output-node', { opacity: 0, x: 20 });
  gsap.set('.flow-line', { opacity: 0 });
  gsap.set('.core-glass', { boxShadow: '0 0 30px rgba(0,0,0,0.5)' });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stage,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });

  tl.to('.delphos-core', { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' });

  gsap.to('.ring-1', { rotation: 360, duration: 20, repeat: -1, ease: 'linear' });
  gsap.to('.ring-2', { rotation: -360, duration: 15, repeat: -1, ease: 'linear' });
  gsap.to('.ring-3', { rotation: 180, duration: 30, repeat: -1, ease: 'linear' });

  const inNodes = document.querySelectorAll('.input-node');
  const inLines = document.querySelectorAll('.in-line');

  inNodes.forEach((node, i) => {
    const track = inTracks[i];
    const line = inLines[i];
    tl.to(node, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, i === 0 ? '-=0.2' : '-=0.1');
    tl.to(track, { strokeDashoffset: 0, duration: 0.5, ease: 'power1.inOut' }, '<0.1');
    tl.to(line, { opacity: 1, duration: 0.3 }, '<0.3');
  });

  tl.add(() => {
    statusText.innerText = 'PROCESSANDO...';
    statusText.style.color = '#8b5cf6';
  });

  gsap.to('.core-glass', {
    boxShadow: '0 0 50px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.5)',
    duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut',
  });

  const outNodes = document.querySelectorAll('.output-node');
  const outLines = document.querySelectorAll('.out-line');

  outNodes.forEach((node, i) => {
    const track = outTracks[i];
    const line = outLines[i];
    tl.to(track, { strokeDashoffset: 0, duration: 0.5, ease: 'power1.inOut' }, i === 0 ? '+=0.3' : '-=0.2');
    tl.to(node, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '<0.3');
    tl.to(line, { opacity: 1, duration: 0.3 }, '<0.1');
  });

  tl.add(() => {
    statusText.innerText = 'HUB ATIVO';
    statusText.style.color = '#10b981';
    gsap.to('.core-glass', {
      boxShadow: '0 0 50px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.4)',
      duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut', overwrite: 'auto',
    });
  });

  gsap.to('.in-line', { strokeDashoffset: -50, duration: 1, repeat: -1, ease: 'linear' });
  gsap.to('.out-line', { strokeDashoffset: -50, duration: 0.8, repeat: -1, ease: 'linear' });
}

// ── Portal do Observatório: desktop→mobile metamorphosis ─────
export const initPortalMotion = () => {
  const stage = document.getElementById('portal-infinite-stage');
  const windowEl = document.getElementById('portal-window-el');

  if (!stage || !windowEl || stage.dataset.initialized === 'true') return;
  stage.dataset.initialized = 'true';

  const styles = getComputedStyle(document.documentElement);
  const blueGea = styles.getPropertyValue('--color-primary').trim() || '#3b82f6';
  const greenRo = styles.getPropertyValue('--color-success').trim() || '#10b981';
  const wireBase = 'rgba(148, 163, 184, 0.15)';
  const textBase = 'rgba(148, 163, 184, 0.4)';
  const emptyHeights = [0.2, 0.3, 0.1, 0.4, 0.2];
  const fullHeights = [0.6, 0.8, 0.4, 0.9, 0.7];

  gsap.set(windowEl, { scale: 1, opacity: 1, width: 600, height: 360, clearProps: 'boxShadow,borderColor' });
  gsap.set('.wire-body', { flexDirection: 'row' });
  gsap.set('.wire-sidebar', { width: '40px', flexDirection: 'column', height: 'auto' });
  gsap.set('.side-item', { width: '100%', height: '24px' });
  gsap.set('.feed-line', { opacity: 0, strokeDashoffset: 60 });

  document.querySelectorAll('#portal-infinite-stage .wire-block, #portal-infinite-stage .bar').forEach((el) => {
    el.classList.add('skeleton');
    gsap.set(el, { clearProps: 'backgroundColor,boxShadow' });
  });
  emptyHeights.forEach((h, i) => gsap.set(`#portal-infinite-stage .bar-${i + 1}`, { scaleY: h }));

  const tl = gsap.timeline({
    repeat: -1,
    scrollTrigger: {
      trigger: stage,
      start: 'top 75%',
      toggleActions: 'play pause resume pause',
    },
  });

  tl.addLabel('desktop');
  tl.to(windowEl, { width: 260, height: 440, duration: 1.5, ease: 'power3.inOut' }, '+=2');
  tl.to('.wire-body', { flexDirection: 'column' }, '<');
  tl.to('.wire-sidebar', { width: '100%', flexDirection: 'row', height: '30px' }, '<');
  tl.to('.side-item', { width: '30%', height: '100%' }, '<');

  tl.addLabel('mobileEmpty');
  tl.to('.feed-line', { opacity: 1, duration: 0.3 }, '+=0.5');
  tl.to('.feed-line', { strokeDashoffset: -120, duration: 0.8, ease: 'linear' });
  tl.to('.sync-flash', { opacity: 1, duration: 0.1, yoyo: true, repeat: 1 });
  tl.to(windowEl, { borderColor: 'rgba(16, 185, 129, 0.4)', boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(16, 185, 129, 0.1)', duration: 0.3 });

  tl.add(() => {
    document.querySelectorAll('#portal-infinite-stage .wire-block, #portal-infinite-stage .bar').forEach((el) => el.classList.remove('skeleton'));
  });
  tl.to('.logo-block', { backgroundColor: blueGea, boxShadow: `0 0 10px ${blueGea}`, duration: 0.5 }, '<');
  tl.to('.title-block', { backgroundColor: 'rgba(255, 255, 255, 0.8)', duration: 0.5 }, '<');
  tl.to('.kpi-box', { backgroundColor: rgbaToHex(greenRo, 0.8), boxShadow: `0 0 10px ${greenRo}`, duration: 0.5, stagger: 0.1 }, '<');
  tl.to('#portal-infinite-stage .bar', { backgroundColor: rgbaToHex(blueGea, 0.8), boxShadow: `0 0 10px ${blueGea}`, duration: 0.5, stagger: 0.05 }, '<');
  fullHeights.forEach((h, i) => {
    tl.to(`#portal-infinite-stage .bar-${i + 1}`, { scaleY: h, duration: 0.8, ease: 'elastic.out(1, 0.6)' }, '<0.05');
  });
  tl.to('.feed-line', { opacity: 0, duration: 0.5 }, '+=0.5');

  tl.addLabel('mobileFull');
  tl.set({}, {}, '+=3');

  tl.addLabel('resetDataStart');
  emptyHeights.forEach((h, i) => {
    tl.to(`#portal-infinite-stage .bar-${i + 1}`, { scaleY: h, duration: 0.6, ease: 'power2.inOut' }, '<0.05');
  });
  tl.to(windowEl, { borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', duration: 0.5 }, '<');
  tl.to('.kpi-box, #portal-infinite-stage .bar', { backgroundColor: wireBase, boxShadow: 'none', duration: 0.5 }, '<');
  tl.to('.logo-block', { backgroundColor: wireBase, boxShadow: 'none', duration: 0.5 }, '<');
  tl.to('.title-block, .subtitle-block', { backgroundColor: textBase, duration: 0.5 }, '<');
  tl.add(() => {
    document.querySelectorAll('#portal-infinite-stage .wire-block, #portal-infinite-stage .bar').forEach((el) => el.classList.add('skeleton'));
  }, '-=0.2');
  tl.to('.feed-line', { opacity: 0, duration: 0.3 }, '-=0.3');

  tl.addLabel('resetLayoutStart');
  tl.to(windowEl, { width: 600, height: 360, duration: 1.5, ease: 'power3.inOut' }, '+=1');
  tl.to('.wire-body', { flexDirection: 'row' }, '<');
  tl.to('.wire-sidebar', { width: '40px', flexDirection: 'column', height: 'auto' }, '<');
  tl.to('.side-item', { width: '100%', height: '24px' }, '<');
};

// ── Nav dots: adapt color based on section background ────────
function initNavDotColors() {
  const nav = document.querySelector('.slide-nav');
  if (!nav) return;

  const lightSections = document.querySelectorAll('.section--light, .section--light-alt, .section--green-light');
  lightSections.forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => nav.classList.add('slide-nav--light'),
      onLeave: () => nav.classList.remove('slide-nav--light'),
      onEnterBack: () => nav.classList.add('slide-nav--light'),
      onLeaveBack: () => nav.classList.remove('slide-nav--light'),
    });
  });
}
