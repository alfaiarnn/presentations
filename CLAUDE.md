# SEPOG: Produtos Estratégicos

Apresentação institucional da SEPOG/DGEPP/GEA (Governo de Rondônia) — landing page scroll-based construída com Astro e GSAP.

## Contexto

Apresentação para auditório (~100 pessoas). Projetada para legibilidade à distância (5-15m).
Produtos: SIPP (em operação), Watchtower (em operação), Delphos (em desenvolvimento), Novo Portal (em desenvolvimento).

## Stack

- **Framework:** Astro 4.16+ (SSG)
- **Animações:** GSAP 3.12.5 (ScrollTrigger + ScrollTo)
- **Estilos:** Vanilla CSS (Design Tokens em `src/styles/global.css`)
- **Fontes:** DM Sans (Google Fonts) + JetBrains Mono (monospaced)

## Estrutura de Pastas

- `src/content/slides/`: Conteúdo dos slides em arquivos YAML seguindo o schema Zod.
- `src/layouts/`: Templates de slides: `SlideHero`, `SlideOverviewGrid`, `SlideProductDetail`, `SlideContext`, `SlideClosing`.
- `src/components/`: Componentes UI: `Badge`, `Chip`, `ContentBlock`, `ProductCard`, `PillarCard`, `MockupFrame`, `SlideNav`.
- `src/components/motions/`: Animações complexas: `DelphosMotion`, `PortalMotion`.
- `src/scripts/animations.ts`: Lógica principal de animações GSAP e ScrollTrigger.
- `src/styles/global.css`: Design system, tokens e estilos globais.
- `docs/`: Documentação organizada:
- `/design-system/`: Source of truth visual.
- `/slides/`: Planejamento e notas de design de cada slide.
- `/legacy/`: Versões estáticas originais (não-Astro).

## Comandos

- `npm run dev` — Servidor de desenvolvimento (porta 4321)
- `npm run build` — Build de produção (saída em `dist/`)
- `npm run preview` — Preview local do build de produção
- `npm run check` — Validação de tipos e diagnósticos Astro

## Deploy

- **GitHub Pages:** <https://alfaiarnn.github.io/presentations/>
- **Workflow:** `.github/workflows/deploy.yml` (disparado no push para `main`)
- **Base Path:** `/presentations/` (configurado em `astro.config.mjs`)

## Convenções

- **Idioma:** PT-BR formal e institucional.
- **Nomenclatura slides:** `sNN-slug.yaml` (ex: `s03-sipp.yaml`). O número no nome não define a ordem (definida pela propriedade `order` no YAML).
- **CSS:** Uso intensivo de CSS variables com prefixos (`--brand-`, `--dark-`, `--text-`, `--space-`).
- **Animações:** Sempre via GSAP (`src/scripts/animations.ts`). Evitar transitions CSS para efeitos complexos de scroll.
- **UX Copy:**
  - Labels: "O que é", "Desafio", "Solução", "Status atual".
  - Badges: "Em operação" (variant: active), "Em desenvolvimento" (variant: wip).

## Skills disponíveis

- `/slide-manager` — Gerenciador completo de slides e layouts.
- `/new-slide` — Atalho para criação de novos slides via manager.
- `/deploy-check` — Validador de pré-vôo para o build de produção.
