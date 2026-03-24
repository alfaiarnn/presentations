# Design System — SEPOG: Produtos Estratégicos

## Landing page de apresentação institucional (Astro + GSAP)

> Fusão entre os tokens do Design System interno (DGEPP/GEA) e a linguagem visual
> do template Bluey (Figma Slides). Usar este documento como source of truth
> para a implementação dos componentes em `src/components/`.

---

## 🗒️ Arquitetura de Documentação

Este projeto segue uma estrutura organizada em `/docs`:

- `/design-system/`: Este documento (Identidade visual e tokens).
- `/slides/`: Detalhamento de conteúdo e design por slide.
- `/legacy/`: Registro das versões estáticas originais.

---


## 1. IDENTIDADE E TOM

### Conceito visual

**Institucional, moderno e orientado a produto** — a apresentação precisa comunicar
competência técnica e clareza de propósito. Referência: GOV.BR modernizado, Linear,
Notion limpo. Não é uma apresentação de startup — é um portfólio de produtos públicos.

### Tom

- Objetivo e direto: cada seção entrega uma informação, não um catálogo
- Linguagem em português brasileiro, formal e acessível
- Labels dos produtos sempre em português
- Badges de status usam emojis institucionais: ✅ 🔄 ⚠️

### Público

- Gestores e secretários de Estado (desktop, atenção limitada)
- Equipe técnica interna GEA/DGEPP
- Formato: tela 1366×768 a 1920×1080, leitura em apresentação projetada

---


## 2. PALETA DE CORES

### 2.1 Paleta principal (DGEPP DS)

```css
/* Brand */
--brand-600:   #2E7D32;   /* títulos de seção, hover */
--brand-500:   #4CAF4F;   /* cor primária, elementos ativos, bordas */
--brand-200:   #A5D6A7;   /* bordas de cards ativos */
--brand-100:   #E8F5E9;   /* fundo de badges sucesso, highlights */
--brand-50:    #F1F8E9;   /* fundo de seções alternadas */

/* Neutras */
--gray-900:    #111827;   /* títulos principais */
--gray-700:    #374151;   /* corpo de texto */
--gray-500:    #6B7280;   /* texto secundário, labels */
--gray-400:    #9CA3AF;   /* placeholders, meta */
--gray-200:    #E5E7EB;   /* bordas, divisores */
--gray-100:    #F3F4F6;   /* fundo skeleton */
--gray-50:     #F9FAFB;   /* fundo body */
--white:       #FFFFFF;   /* cards, fundos principais */

/* Semânticas */
--success-bg:      #E8F5E9;
--success-text:    #2E7D32;
--success-border:  #A5D6A7;

--warning-bg:      #FFF8E1;
--warning-text:    #F57F17;
--warning-border:  #FFE082;

--info-bg:         #E3F2FD;
--info-text:       #1565C0;
--info-border:     #90CAF9;
```

### 2.2 Extensões do Bluey (adaptadas)

O Bluey usa azul (#0D99FF) como cor primária. Na nossa implementação,
**substituímos o azul pelo brand-500 (#4CAF4F)** mantendo a mesma lógica de uso:

| Bluey original | Nossa implementação | Uso |
| :--- | :--- | :--- |
| `#0D99FF` | `#4CAF4F` (brand-500) | Cor de destaque principal |
| `#E8F3FF` | `#E8F5E9` (brand-100) | Fundo de seção destacada |
| `rgba(13,153,255,0.1)` | `rgba(76,175,79,0.1)` | Overlay sutil |

### 2.3 Fundo de seções (alternância)

```text
S01 Capa          → white
S02 Visão Geral   → gray-50
S03 SIPP          → white
S04 Watchtower    → brand-50
S05 Delphos       → white
S06 Novo Portal   → brand-50
S07 Encerramento  → brand-600 (fundo escuro, texto white)
```


---

## 3. TIPOGRAFIA

```css
/* Fontes */
--font-sans:  "DM Sans", system-ui, -apple-system, sans-serif;
--font-mono:  "JetBrains Mono", "Fira Code", monospace;

/* Escala para apresentação */
--text-hero:    3rem   / 48px;   /* título de capa */
--text-display: 2rem   / 32px;   /* título de seção */
--text-heading: 1.5rem / 24px;   /* subtítulos */
--text-lg:      1.125rem / 18px; /* texto de card destacado */
--text-base:    0.875rem / 14px; /* corpo de texto */
--text-sm:      0.8125rem / 13px; /* labels, badges */
--text-xs:      0.6875rem / 11px; /* meta, rodapé */

/* Pesos */
/* Regular: 400 | Medium: 500 | Semibold: 600 | Bold: 700 */
```

---

## 4. ESPAÇAMENTO

```css
/* Base unit: 4px */
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;   /* gap entre seções da landing */
--space-20:  80px;   /* padding vertical de seções */
--space-24:  96px;   /* seção hero */
```

---

## 5. BORDAS E SOMBRAS

```css
--radius-sm:    4px;
--radius-md:    6px;
--radius-lg:    8px;
--radius-xl:    12px;
--radius-full:  9999px;

--border-default:  1px solid #E5E7EB;
--border-brand:    1px solid #4CAF4F;
--border-warning:  1px solid #FFE082;

--shadow-card:   0 1px 3px rgba(0,0,0,0.08);
--shadow-md:     0 4px 12px rgba(0,0,0,0.08);
--shadow-hover:  0 8px 24px rgba(0,0,0,0.12);
```

---

## 6. COMPONENTES

### 6.1 Seção (Section wrapper)

```css
.section {
  width: 100%;
  min-height: 100vh;          /* cada seção ocupa a tela cheia */
  padding: var(--space-20) var(--space-8);
  display: flex;
  align-items: center;
  scroll-snap-align: start;   /* scroll suave entre seções */
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
```

### 6.2 Section Label (label de seção)

```
Estilo: text-xs, uppercase, letter-spacing: 0.1em
Cor:    brand-500
Peso:   semibold
Margin: 0 0 space-3 0
Ex:     "O QUE É" / "PROBLEMA" / "SOLUÇÃO" / "STATUS ATUAL"
```

### 6.3 Product Card (card de produto — S02)

```css
/* Card ativo (SIPP, Watchtower) */
.product-card {
  background: white;
  border: var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: var(--space-6);
  transition: box-shadow 0.2s ease;
}
.product-card:hover {
  box-shadow: var(--shadow-hover);
}

/* Card em construção (Delphos, Novo Portal) */
.product-card--wip {
  background: white;
  border: var(--border-warning);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: var(--space-6);
  position: relative;
  overflow: hidden;
}

/* Barra de progresso indeterminada (loading) */
.product-card--wip::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--warning-text) 40%,
    var(--brand-500) 60%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: loading-bar 1.8s ease-in-out infinite;
}

@keyframes loading-bar {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 6.4 Badge de status

```css
/* Ativo */
.badge--active {
  background: var(--success-bg);
  color: var(--success-text);
  border: 1px solid var(--success-border);
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
}

/* Em desenvolvimento */
.badge--wip {
  background: var(--warning-bg);
  color: var(--warning-text);
  border: 1px solid var(--warning-border);
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
}
```

### 6.5 Chip de fonte de dados

```css
.chip {
  background: var(--info-bg);
  color: var(--info-text);
  border: 1px solid var(--info-border);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}
```

### 6.6 Bloco de conteúdo (content block)

```
Borda esquerda: 3px solid brand-500
Padding esq.:   space-4
Margin bottom:  space-8
Label:          text-xs uppercase brand-600
Título:         text-heading gray-900
Texto:          text-base gray-700 line-height: 1.6
```

### 6.7 Seção Hero (S01)

```
Layout:         2 colunas (texto 60% | visual 40%)
Título:         text-hero, bold, gray-900
Subtítulo:      text-lg, semibold, brand-600
Header:         text-xs, gray-500, border-bottom gray-200
Visual:         forma geométrica brand-500 com blur radial brand-100
```

### 6.8 Seção de Encerramento (S07)

```
Fundo:          brand-600
Texto:          white
Logo:           centralizado, white, tamanho generoso
Título:         text-display, bold
Subtítulo:      text-lg, opacity 0.85
Linha inst.:    text-sm, opacity 0.65
```

### 6.9 Elemento decorativo geométrico

Inspirado no círculo do Bluey, adaptado para a identidade GEA:

```css
.geo-shape {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand-500) 0%, var(--brand-100) 100%);
  opacity: 0.9;
  position: relative;
}
.geo-shape::before {
  /* metade direita mais escura — efeito Bluey */
  content: '';
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 50%;
  background: var(--brand-600);
  border-radius: 0 50% 50% 0;
}
```

---

## 7. NAVEGAÇÃO E SCROLL

```
Tipo:         scroll-snap, vertical
Comportamento: scroll-snap-type: y mandatory (desktop)
               scroll suave em mobile (sem snap)
Nav lateral:   pontos de navegação à direita (1 por seção)
               visível em desktop, oculto em mobile
Indicador:    ponto ativo em brand-500, inativos em gray-300
```

---

## 8. ANIMAÇÕES

```css
/* Entrada de seção */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-in {
  animation: fadeInUp 0.5s ease-out forwards;
}

/* Skeleton pulse (cards WIP) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

/* Loading bar (barra na base dos cards WIP) */
@keyframes loading-bar {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Durations */
--duration-fast:   150ms;
--duration-base:   250ms;
--duration-slow:   500ms;
--ease-default:    cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 9. RESPONSIVIDADE

```
Desktop (≥1024px):  scroll-snap, nav lateral, layout 2 colunas
Tablet (640–1023px): sem snap, sem nav, layout 1 coluna
Mobile (<640px):    sem snap, sem nav, cards empilhados

Grid de cards S02:
  Desktop:  4 colunas
  Tablet:   2 colunas
  Mobile:   1 coluna
```

---

## 10. ESTRUTURA HTML

```html
<body>
  <nav class="slide-nav"><!-- dots de navegação --></nav>
  
  <main class="slides-container">
    <section id="s01" class="section section--white">   <!-- Capa -->
    <section id="s02" class="section section--gray">    <!-- Visão Geral -->
    <section id="s03" class="section section--white">   <!-- SIPP -->
    <section id="s04" class="section section--green">   <!-- Watchtower -->
    <section id="s05" class="section section--white">   <!-- Delphos -->
    <section id="s06" class="section section--green">   <!-- Novo Portal -->
    <section id="s07" class="section section--dark">    <!-- Encerramento -->
  </main>
</body>
```

---

*DESIGN_SYSTEM_APRESENTACAO.md v1.0 — 20/03/2026*
*Fusão: Bluey Template (Figma) + DGEPP Design System*
*SEPOG — Governo do Estado de Rondônia*
