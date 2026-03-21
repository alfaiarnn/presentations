# CLAUDE.md — Apresentação SEPOG: Produtos Estratégicos

Guia para assistentes de IA trabalhando neste repositório.

---

## O que é este projeto

Landing page de apresentação institucional dos produtos estratégicos da
**GEA/DGEPP/SEPOG** (Governo do Estado de Rondônia). Funciona como uma
apresentação de slides no browser: 7 seções em scroll-snap vertical, com
animações GSAP e design system próprio.

**Público-alvo da apresentação:** gestores e secretários de Estado, equipe técnica interna.
**Resolução alvo:** 1366×768 a 1920×1080 (projetado).

---

## Estrutura de arquivos

```
presentations/
├── index.html                    # Arquivo principal — todo o HTML e CSS inline
├── ANIMATIONS.js                 # Biblioteca GSAP de animações (modular)
├── DESIGN_SYSTEM_APRESENTACAO.md # Source of truth de design (tokens, componentes)
├── S01_capa.md                   # Conteúdo do slide 1: Capa / Hero
├── S02_visao_geral.md            # Conteúdo do slide 2: Visão Geral (4 cards)
├── S03_sipp.md                   # Conteúdo do slide 3: SIPP
├── S04_watchtower.md             # Conteúdo do slide 4: SIPP Watchtower
├── S05_delphos.md                # Conteúdo do slide 5: Delphos
├── S06_novo_portal.md            # Conteúdo do slide 6: Novo Portal
└── S07_encerramento.md           # Conteúdo do slide 7: Encerramento
```

### Papéis dos arquivos

| Arquivo | Papel |
|---|---|
| `index.html` | Implementação — HTML estrutural + CSS completo inline na tag `<style>` |
| `ANIMATIONS.js` | Biblioteca GSAP — importada/referenciada pelo `index.html` |
| `DESIGN_SYSTEM_APRESENTACAO.md` | Especificação de design — **consultar antes de qualquer mudança visual** |
| `S0X_*.md` | Especificação de conteúdo por slide — fonte da verdade do texto |

---

## Arquitetura

### Apresentação como landing page

- **Sem framework, sem bundler** — HTML/CSS/JS puros
- CSS completo embutido dentro de `<style>` no `<head>` do `index.html`
- Scroll-snap vertical: cada `<section>` ocupa `min-height: 100vh`
- Navegação lateral por pontos (`.nav-dot`), visível apenas em desktop

### Dependências externas (CDN)

```html
<!-- Fontes -->
Google Fonts: DM Sans + JetBrains Mono

<!-- Animações -->
GSAP 3.12.5 (gsap.min.js)
GSAP ScrollTrigger 3.12.5
GSAP ScrollToPlugin 3.12.5
```

Todas via `cdnjs.cloudflare.com`. Carregadas com `defer`.

### Estrutura HTML das seções

```html
<body>
  <nav class="slide-nav"><!-- pontos de navegação --></nav>
  <main class="slides-container">
    <section id="s01" class="section section--dark">        <!-- Capa -->
    <section id="s02" class="section section--light-alt">  <!-- Visão Geral -->
    <section id="s03" class="section section--light">      <!-- SIPP -->
    <section id="s04" class="section section--green-light"><!-- Watchtower -->
    <section id="s05" class="section section--light">      <!-- Delphos -->
    <section id="s06" class="section section--green-light"><!-- Novo Portal -->
    <section id="s07" class="section section--dark">       <!-- Encerramento -->
  </main>
</body>
```

---

## Design System

**Arquivo de referência:** `DESIGN_SYSTEM_APRESENTACAO.md`

Fusão entre o Design System interno DGEPP/GEA e o template Bluey (Figma Slides).
O azul Bluey (`#0D99FF`) foi substituído pelo `brand-500` (`#4CAF4F`).

### Tokens principais

```css
/* Brand (verde) */
--brand-600: #2E7D32   /* títulos de seção, hover */
--brand-500: #4CAF4F   /* cor primária, elementos ativos */
--brand-100: #E8F5E9   /* fundo de badges sucesso */
--brand-50:  #F1F8E9   /* fundo de seções alternadas */

/* Dark mode (S01 e S07) */
--dark-950:  #050a05
--dark-900:  #0a120a

/* Neutras */
--gray-900: #111827    /* títulos */
--gray-700: #374151    /* corpo */
--gray-500: #6B7280    /* secundário */
--gray-200: #E5E7EB    /* bordas */

/* Semânticas */
--success-*: green     /* badges de produtos em operação */
--warning-*: amber     /* badges de produtos em construção */
--info-*:    blue      /* chips de fontes de dados */
```

### Tipografia

- **Família:** `DM Sans` (sans) + `JetBrains Mono` (mono)
- **Escala:** hero → display → heading → lg → base → sm → xs
- Tamanho hero usa `clamp()` para responsividade

### Variantes de fundo por seção

| Seção | Classe CSS | Background |
|---|---|---|
| S01 | `section--dark` | `#050a05` (dark-950) |
| S02 | `section--light-alt` | `#F9FAFB` (gray-50) |
| S03 | `section--light` | `#FFFFFF` |
| S04 | `section--green-light` | gradiente brand-50 → white |
| S05 | `section--light` | `#FFFFFF` |
| S06 | `section--green-light` | gradiente brand-50 → white |
| S07 | `section--dark` | `#050a05` (dark-950) |

### Estados de card de produto

- **Ativo** (SIPP, Watchtower): `border: var(--border-default)` + `shadow-card`
- **Em construção** (Delphos, Novo Portal): `border: var(--border-warning)` + barra de progresso animada na base + badge warning

---

## Animações (`ANIMATIONS.js`)

### Como funciona

Biblioteca modular sobre GSAP 3 + ScrollTrigger. Exposta globalmente como `window.Animations`.

```js
// Inicialização (chamar após DOMContentLoaded)
Animations.init()
```

### Funções disponíveis

| Função | Uso |
|---|---|
| `heroEntrance()` | Animação sequenciada da capa S01 |
| `sectionEntrance(sectionId)` | Entrada genérica de seção (eyebrow → título → blocos) |
| `productCardsEntrance()` | Entrada em cascata dos 4 cards do S02 |
| `wipCardPulse(target)` | Animação de "respiração" contínua nos cards WIP |
| `closingEntrance()` | Entrada do encerramento S07 |
| `fadeInUp(target, opts)` | Fade + movimento de baixo (parágrafos, blocos) |
| `fadeInLeft(target, opts)` | Fade + movimento da esquerda (títulos) |
| `fadeIn(target, opts)` | Fade simples (overlays, badges) |
| `scaleIn(target, opts)` | Cresce do centro (ícones, forma geométrica) |
| `staggerFadeInUp(parent, children, stagger)` | Cascata de baixo para grupos |
| `staggerFadeInLeft(parent, children, stagger)` | Cascata da esquerda para grupos |
| `navDotHighlight(sections)` | Destaca nav dot conforme seção ativa |
| `scrollToSection(sectionId)` | Scroll suave programático |
| `killAll()` | Remove todas as animações (cleanup) |
| `pauseAll()` / `resumeAll()` | Pausa/retoma (acessibilidade) |

### Tokens de duração e easing

```js
DURATION: { fast: 0.15, base: 0.25, slow: 0.50, page: 0.70 }
EASE: { default, in, inOut, bounce, smooth, sharp }
```

### `prefers-reduced-motion`

Tratado automaticamente: quando ativo, as animações são executadas instantaneamente via `timeScale(100)`.

---

## Conteúdo dos slides

Cada arquivo `S0X_*.md` contém:
- **Metadados:** número da seção, tipo, referência Figma
- **Conteúdo:** textos exatos a exibir (labels, títulos, parágrafos, badges)
- **Notas de design:** layout, cores, comportamentos especiais

### Produtos da apresentação

| Produto | Status | Seção |
|---|---|---|
| SIPP (Sistema Integrado de Políticas Públicas) | ✅ Em operação (testes internos) | S03 |
| SIPP Watchtower (monitoramento em tempo real) | ✅ Em operação | S04 |
| Delphos (Hub de Dados da GEA) | 🔄 Em desenvolvimento | S05 |
| Novo Portal do Observatório | 🔄 Em desenvolvimento | S06 |

---

## Convenções

### CSS

- **Variáveis CSS** (`--token-name`) para todos os valores — não hardcodar cores, tamanhos ou espaçamentos
- Classes em kebab-case: `.section-title`, `.product-card--wip`, `.badge--active`
- Modificadores BEM com `--`: `.product-card--wip`, `.section--dark`
- CSS inline no `<style>` do `index.html` — não criar arquivos `.css` separados

### HTML

- IDs de seção: `s01` a `s07` (minúsculo, sem `#`)
- Classes semânticas por função: `.section-eyebrow`, `.section-title`, `.content-block`, `.product-card`, `.chip`, `.badge--*`, `.nav-dot`
- Texto sempre em **português brasileiro**, formal e acessível
- Labels de seção: maiúsculo, `text-xs`, `letter-spacing: 0.1em`, cor `brand-500`

### Animações

- Toda animação de entrada via GSAP no `ANIMATIONS.js` — não adicionar animações CSS `@keyframes` ad-hoc para entradas de seção
- Animações CSS puras são aceitáveis apenas para loops contínuos (ex: barra de loading dos cards WIP)
- Sempre testar com `prefers-reduced-motion: reduce`

### Conteúdo

- Alterar texto de um slide: editar o arquivo `S0X_*.md` correspondente **e** refletir no `index.html`
- Os arquivos `.md` são a fonte da verdade do conteúdo — manter sincronizados
- Não inventar textos: usar exatamente o que está especificado nos arquivos de slide

### Responsividade

| Breakpoint | Comportamento |
|---|---|
| Desktop (≥1024px) | scroll-snap ativo, nav lateral visível, layouts 2 colunas |
| Tablet (640–1023px) | sem snap, sem nav, layout 1 coluna |
| Mobile (<640px) | sem snap, sem nav, cards empilhados, grid 1 coluna |

---

## Fluxo de desenvolvimento

1. **Alteração de conteúdo:** editar o `.md` do slide → refletir no `index.html`
2. **Alteração visual:** consultar `DESIGN_SYSTEM_APRESENTACAO.md` → usar tokens existentes → editar CSS no `index.html`
3. **Nova animação:** adicionar função no `ANIMATIONS.js` → chamar em `init()` → testar scroll
4. **Abrir no browser:** basta abrir `index.html` diretamente — sem servidor necessário
5. **Testar:** verificar em 1366×768 e 1920×1080; testar scroll-snap; verificar responsividade

Não há build step, lint, testes automatizados ou package manager neste repositório.

---

## Contexto institucional

- **SEPOG:** Secretaria de Estado do Planejamento, Orçamento e Gestão — Rondônia
- **DGEPP:** Diretoria de Gestão Estratégica e Políticas Públicas
- **GEA:** Gerência de Estudos e Análises Socioeconômicas
- **PDES:** Plano de Desenvolvimento Estadual Sustentável (referência estratégica do SIPP)
- Tom: institucional, formal, direto — não startup, não comercial
- Idioma: português brasileiro em todo o conteúdo visível
