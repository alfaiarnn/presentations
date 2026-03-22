# SEPOG: Produtos Estratégicos

Apresentação institucional da SEPOG/DGEPP/GEA (Governo de Rondônia) — landing page scroll-based com slides em scroll-snap vertical.

## Contexto

Apresentação para auditório (~100 pessoas). Projetada para legibilidade à distância (5-15m).
Produtos: SIPP (em operação), Watchtower (em operação), Delphos (em desenvolvimento), Novo Portal (em desenvolvimento).

## Stack

- Astro 4+ (SSG)
- GSAP 3.12.5 (animações scroll-triggered)
- CSS custom properties (design tokens em src/styles/global.css)
- Google Fonts: DM Sans + JetBrains Mono

## Estrutura

- Conteúdo: src/content/slides/*.yaml
- Layouts: src/layouts/ (SlideHero, SlideOverviewGrid, SlideProductDetail, SlideContext, SlideClosing)
- Componentes: src/components/ (Badge, Chip, ContentBlock, ProductCard, PillarCard, MockupFrame, SlideNav)
- Estilos: src/styles/global.css (design tokens)
- Animações: src/scripts/animations.js (GSAP + ScrollTrigger)

## Comandos

- npm run dev — servidor de desenvolvimento (porta 4321)
- npm run build — build de produção
- npm run preview — preview do build

## Convenções

- Conteúdo em PT-BR formal/institucional
- Nomenclatura YAML: sNN-slug.yaml (ex: s03-sipp.yaml)
- CSS variables com prefixo semântico (--brand-*, --gray-*, --text-*, --space-*)
- Animações via GSAP, nunca CSS transitions para efeitos complexos
- Ordem dos slides definida em src/pages/index.astro (número no filename é ID, não posição)
- Nunca renumerar arquivos existentes ao adicionar/remover slides

## UX Copy

- Labels padronizados: "O que é" / "Desafio" / "Solução" / "Status atual"
- Badges apenas: "Em operação" ou "Em desenvolvimento"
- Tom acessível para gestores públicos — sem jargão técnico
- Tipografia mínima: 1rem para body, 4rem para hero (otimizado para projeção)

## Skills disponíveis

- /slide-manager — editar, criar, navegar layouts e gerenciar slides
- /new-slide — criar novo slide (delega para slide-manager)
- /deploy-check — validar build antes de push
