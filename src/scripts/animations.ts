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
