---
name: new-slide
description: Cria um novo slide Astro seguindo o padrão visual e estrutural do projeto (layouts, YAML, navegação)
disable-model-invocation: true
---

O projeto tem a seguinte estrutura de slides:
- Conteúdo em `src/content/slides/*.yaml`
- Layouts disponíveis: SlideHero, SlideOverviewGrid, SlideProductDetail, SlideClosing (em `src/layouts/`)
- Componentes: Badge, Chip, ContentBlock, KpiCard, MockupFrame, PillarCard, ProductCard, SlideNav
- Registro de navegação em `src/pages/index.astro`

Dado o argumento fornecido como nome/tema do slide:
1. Crie o arquivo YAML em `src/content/slides/` com nomenclatura `sNN-<slug>.yaml` (incrementando o número)
2. Escolha o layout mais adequado ao conteúdo
3. Adicione a referência ao slide em `src/pages/index.astro`
4. Confirme os arquivos criados/modificados
