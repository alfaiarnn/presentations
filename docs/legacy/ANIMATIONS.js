/**
 * ANIMATIONS.js — Biblioteca de Animações GSAP
 * Apresentação SEPOG: Produtos Estratégicos
 * Design System: DGEPP/GEA
 *
 * Dependências:
 *   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
 *   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
 *
 * Uso:
 *   import { Animations } from './ANIMATIONS.js'
 *   Animations.init()
 */

// ─── Registro de plugins ──────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ─── Tokens de duração (espelham o DS) ───────────────────────────────────────
const DURATION = {
  fast:   0.15,   // --duration-fast: 150ms
  base:   0.25,   // --duration-base: 250ms
  slow:   0.50,   // --duration-slow: 500ms
  page:   0.70,   // entrada de seção completa
};

// ─── Easings padrão ──────────────────────────────────────────────────────────
const EASE = {
  default:  "power2.out",       // --ease-default: cubic-bezier(0.4,0,0.2,1)
  in:       "power2.in",
  inOut:    "power2.inOut",
  bounce:   "back.out(1.4)",    // elemento "pula" levemente ao entrar
  smooth:   "sine.inOut",       // transições muito suaves
  sharp:    "expo.out",         // entrada rápida, parada precisa
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. ANIMAÇÕES DE ENTRADA (Scroll-triggered)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * fadeInUp — Elemento entra de baixo com fade
 * Uso padrão para parágrafos, blocos de conteúdo, labels
 *
 * @param {string|Element} target  — seletor CSS ou elemento DOM
 * @param {object}         options — sobrescrever defaults
 */
function fadeInUp(target, options = {}) {
  const defaults = {
    opacity:  0,
    y:        24,
    duration: DURATION.slow,
    ease:     EASE.default,
    scrollTrigger: {
      trigger:      target,
      start:        "top 88%",
      toggleActions:"play none none none",
      once:         true,
    },
  };
  return gsap.from(target, { ...defaults, ...options });
}

/**
 * fadeInLeft — Elemento entra da esquerda
 * Uso: títulos de seção, labels de produto
 */
function fadeInLeft(target, options = {}) {
  return gsap.from(target, {
    opacity:  0,
    x:        -32,
    duration: DURATION.slow,
    ease:     EASE.default,
    scrollTrigger: {
      trigger:      target,
      start:        "top 88%",
      toggleActions:"play none none none",
      once:         true,
    },
    ...options,
  });
}

/**
 * fadeIn — Simples fade, sem movimento
 * Uso: overlays, badges, elementos decorativos
 */
function fadeIn(target, options = {}) {
  return gsap.from(target, {
    opacity:  0,
    duration: DURATION.page,
    ease:     EASE.smooth,
    scrollTrigger: {
      trigger:      target,
      start:        "top 90%",
      toggleActions:"play none none none",
      once:         true,
    },
    ...options,
  });
}

/**
 * scaleIn — Elemento cresce do centro
 * Uso: ícones de produto, elemento geométrico da capa
 */
function scaleIn(target, options = {}) {
  return gsap.from(target, {
    opacity:  0,
    scale:    0.75,
    duration: DURATION.page,
    ease:     EASE.bounce,
    scrollTrigger: {
      trigger:      target,
      start:        "top 85%",
      toggleActions:"play none none none",
      once:         true,
    },
    ...options,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ANIMAÇÕES EM STAGGER (grupos de elementos)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * staggerFadeInUp — Grupo de elementos entra em cascata de baixo
 * Uso: os 4 cards de produto no S02, os 3 pilares do Watchtower,
 *      listas de itens, chips de fontes de dados
 *
 * @param {string} parent   — seletor do container pai (usado como trigger)
 * @param {string} children — seletor dos filhos a animar
 * @param {number} stagger  — delay entre cada item (segundos)
 */
function staggerFadeInUp(parent, children, stagger = 0.1, options = {}) {
  return gsap.from(children, {
    opacity:  0,
    y:        32,
    duration: DURATION.slow,
    ease:     EASE.default,
    stagger:  stagger,
    scrollTrigger: {
      trigger:      parent,
      start:        "top 80%",
      toggleActions:"play none none none",
      once:         true,
    },
    ...options,
  });
}

/**
 * staggerFadeInLeft — Cascata da esquerda
 * Uso: blocos de conteúdo de produto (O que é → Problema → Solução → Status)
 */
function staggerFadeInLeft(parent, children, stagger = 0.12, options = {}) {
  return gsap.from(children, {
    opacity:  0,
    x:        -24,
    duration: DURATION.slow,
    ease:     EASE.default,
    stagger:  stagger,
    scrollTrigger: {
      trigger:      parent,
      start:        "top 80%",
      toggleActions:"play none none none",
      once:         true,
    },
    ...options,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ANIMAÇÕES DE SEÇÃO (hero e transições de slide)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * heroEntrance — Animação de entrada da capa (S01)
 * Timeline sequenciada: header → título → subtítulo → forma geométrica
 */
function heroEntrance() {
  const tl = gsap.timeline({ delay: 0.2 });

  tl.from(".hero-header", {
    opacity:  0,
    y:        -16,
    duration: DURATION.base,
    ease:     EASE.default,
  })
  .from(".hero-title", {
    opacity:  0,
    y:        32,
    duration: DURATION.page,
    ease:     EASE.sharp,
  }, "-=0.05")
  .from(".hero-subtitle", {
    opacity:  0,
    y:        20,
    duration: DURATION.slow,
    ease:     EASE.default,
  }, "-=0.3")
  .from(".geo-shape", {
    opacity:  0,
    scale:    0.8,
    x:        40,
    duration: DURATION.page,
    ease:     EASE.bounce,
  }, "-=0.5");

  return tl;
}

/**
 * sectionEntrance — Entrada genérica de seção
 * Anima: label da seção → título → conteúdo
 *
 * @param {string} sectionId — ex: "#s03"
 */
function sectionEntrance(sectionId) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger:      sectionId,
      start:        "top 70%",
      toggleActions:"play none none none",
      once:         true,
    },
  });

  tl.from(`${sectionId} .section-eyebrow`, {
    opacity:  0,
    x:        -16,
    duration: DURATION.base,
    ease:     EASE.default,
  })
  .from(`${sectionId} .section-title`, {
    opacity:  0,
    y:        24,
    duration: DURATION.slow,
    ease:     EASE.sharp,
  }, "-=0.1")
  .from(`${sectionId} .content-block`, {
    opacity:  0,
    y:        20,
    duration: DURATION.slow,
    ease:     EASE.default,
    stagger:  0.12,
  }, "-=0.2");

  return tl;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ANIMAÇÕES DE CARDS DE PRODUTO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * productCardsEntrance — S02: entrada dos 4 cards
 * Cards ativos entram normalmente; cards WIP entram com leve delay
 * e iniciam sua animação de loading contínua
 */
function productCardsEntrance() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger:      "#s02",
      start:        "top 75%",
      toggleActions:"play none none none",
      once:         true,
    },
  });

  // Título da seção
  tl.from("#s02 .section-title", {
    opacity:  0,
    y:        24,
    duration: DURATION.slow,
    ease:     EASE.sharp,
  });

  // Os 4 cards em cascata
  tl.from(".product-card", {
    opacity:  0,
    y:        40,
    duration: DURATION.page,
    ease:     EASE.default,
    stagger:  0.12,
  }, "-=0.2");

  // Badges dos cards WIP aparecem após os cards
  tl.from(".badge--wip", {
    opacity:  0,
    scale:    0.8,
    duration: DURATION.base,
    ease:     EASE.bounce,
    stagger:  0.1,
  }, "-=0.3");

  return tl;
}

/**
 * wipCardPulse — Animação contínua no overlay dos cards em construção
 * Cria um efeito de "respiração" sutil no overlay do card
 *
 * @param {string} target — seletor do overlay dentro do card WIP
 */
function wipCardPulse(target) {
  return gsap.to(target, {
    opacity:  0.6,
    duration: 1.6,
    ease:     EASE.smooth,
    yoyo:     true,
    repeat:   -1,   // infinito
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. NAVEGAÇÃO E SCROLL
// ─────────────────────────────────────────────────────────────────────────────

/**
 * navDotHighlight — Destaca o ponto de navegação lateral
 * conforme a seção ativa no scroll
 *
 * @param {Array<string>} sections — array com IDs das seções: ["#s01","#s02",...]
 */
function navDotHighlight(sections) {
  sections.forEach((sectionId, index) => {
    ScrollTrigger.create({
      trigger:  sectionId,
      start:    "top center",
      end:      "bottom center",
      onToggle: (self) => {
        const dots = document.querySelectorAll(".nav-dot");
        dots.forEach((d, i) => {
          d.classList.toggle("nav-dot--active", i === index && self.isActive);
        });
      },
    });
  });
}

/**
 * scrollToSection — Scroll suave para uma seção ao clicar no nav dot
 *
 * @param {string} sectionId — ex: "#s03"
 */
function scrollToSection(sectionId) {
  gsap.to(window, {
    duration:       0.8,
    scrollTo:       { y: sectionId, offsetY: 0 },
    ease:           "power2.inOut",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. ANIMAÇÃO DE ENCERRAMENTO (S07)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * closingEntrance — Entrada da seção de encerramento
 * Logo entra com scale + fade, depois linhas institucionais em cascata
 */
function closingEntrance() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger:      "#s07",
      start:        "top 70%",
      toggleActions:"play none none none",
      once:         true,
    },
  });

  tl.from("#s07 .closing-logo", {
    opacity:  0,
    scale:    0.6,
    duration: DURATION.page,
    ease:     EASE.bounce,
  })
  .from("#s07 .closing-title", {
    opacity:  0,
    y:        20,
    duration: DURATION.slow,
    ease:     EASE.default,
  }, "-=0.3")
  .from("#s07 .closing-line", {
    opacity:  0,
    y:        12,
    duration: DURATION.slow,
    ease:     EASE.default,
    stagger:  0.1,
  }, "-=0.2");

  return tl;
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. INICIALIZAÇÃO GLOBAL
// ─────────────────────────────────────────────────────────────────────────────

/**
 * init — Inicializa todas as animações da apresentação
 * Chamar após DOMContentLoaded
 */
function init() {
  // Capa
  heroEntrance();

  // Visão Geral
  productCardsEntrance();
  wipCardPulse(".product-card--wip .wip-overlay");

  // Seções de produto
  ["#s03", "#s04", "#s05", "#s06"].forEach(sectionEntrance);

  // Chips de fontes (S05)
  staggerFadeInUp("#s05 .chips-row", "#s05 .chip", 0.08);

  // Lista de problemas (S06)
  staggerFadeInLeft("#s06 .problems-list", "#s06 .problems-list li", 0.1);

  // Encerramento
  closingEntrance();

  // Navegação lateral
  navDotHighlight(["#s01","#s02","#s03","#s04","#s05","#s06","#s07"]);

  console.log("[ANIMATIONS] GSAP + ScrollTrigger inicializados. ✓");
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. UTILITÁRIOS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * killAll — Remove todas as animações e ScrollTriggers
 * Útil para cleanup em SPAs ou ao recarregar seções
 */
function killAll() {
  ScrollTrigger.killAll();
  gsap.killTweensOf("*");
}

/**
 * pauseAll / resumeAll — Pausa/retoma todas as animações
 * Útil para acessibilidade (prefers-reduced-motion)
 */
function pauseAll()  { gsap.globalTimeline.pause(); }
function resumeAll() { gsap.globalTimeline.resume(); }

/**
 * Respeita prefers-reduced-motion automaticamente
 */
gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
  gsap.globalTimeline.timeScale(100); // executa animações instantaneamente
  ScrollTrigger.getAll().forEach(st => st.kill());
});

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS (para uso modular)
// ─────────────────────────────────────────────────────────────────────────────

const Animations = {
  init,
  killAll,
  pauseAll,
  resumeAll,
  // Primitivas (para uso customizado em seções específicas)
  fadeInUp,
  fadeInLeft,
  fadeIn,
  scaleIn,
  staggerFadeInUp,
  staggerFadeInLeft,
  heroEntrance,
  sectionEntrance,
  productCardsEntrance,
  wipCardPulse,
  closingEntrance,
  navDotHighlight,
  scrollToSection,
  // Tokens expostos
  DURATION,
  EASE,
};

// Expõe globalmente se não houver bundler
if (typeof window !== "undefined") {
  window.Animations = Animations;
}
