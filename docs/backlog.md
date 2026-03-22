# Agile Planner — SEPOG: Produtos Estratégicos

## Context

Este plano é uma análise ágil completa do projeto "SEPOG: Produtos Estratégicos", uma landing page institucional de apresentação para a Secretaria de Estado do Planejamento, Orçamento e Gestão (SEPOG) do Governo de Rondônia. O objetivo é mapear personas, requisitos, histórias de usuário e sprints para evoluir o projeto de um HTML estático monolítico para uma apresentação componentizada, mantível e escalável.

---

## Projeto

| Campo | Detalhe |
|-------|---------|
| **Nome** | SEPOG: Produtos Estratégicos |
| **Tipo** | Landing page institucional / Apresentação scroll-based (7 slides) |
| **Organização** | SEPOG — DGEPP / GEA (Governo de Rondônia) |
| **Stack atual** | HTML5 + CSS3 (inline) + Vanilla JS + GSAP 3.12.5 (ScrollTrigger) |
| **Stack planejada** | Astro (configs .claude já referenciam) + YAML content + componentes |
| **Maturidade** | MVP — 1 commit, sem testes, sem CI/CD, sem build pipeline |
| **Repositório** | Git (master), 1 commit (`fb2115f`), autor: alfaiarnn + Claude Sonnet 4.6 |
| **Deploy** | Estático (qualquer servidor web) — sem pipeline configurado |

**Produtos apresentados:**
1. **SIPP** — Sistema Integrado de Políticas Públicas (em operação)
2. **Watchtower** — Monitoramento do SIPP (em operação)
3. **Delphos** — Hub de Dados da GEA (em desenvolvimento)
4. **Novo Portal** — Portal do Observatório (em desenvolvimento)

---

## Personas

### Contexto de apresentação

A landing page será projetada em **auditório para ~100 pessoas**. Isso impacta diretamente:
- **Tipografia:** Tamanhos mínimos maiores (hero ≥ 4rem, body ≥ 1.25rem projetado)
- **Contraste:** WCAG AAA preferível (não apenas AA) — projetor reduz contraste
- **Densidade:** Menos texto por slide; frases curtas, métricas grandes
- **Legibilidade à distância:** Evitar text-xs e text-sm para conteúdo essencial
- **Animações:** Transições suaves mas visíveis; evitar micro-interações hover (irrelevantes em projeção)

### P1 — Gestor Público (Secretário / Diretor)
- **Objetivo:** Visualizar rapidamente o portfólio de produtos estratégicos da SEPOG para tomada de decisão e alocação de recursos
- **Dores:** Falta de visão consolidada dos projetos; dificuldade de entender status técnico em linguagem executiva; necessidade de material para apresentações a superiores
- **Contexto de uso:** Auditório (~100 pessoas), projetor, distância de 5-15m da tela; também acesso posterior via link no desktop/mobile

### P2 — Servidor Técnico da GEA/DGEPP
- **Objetivo:** Consultar e atualizar o conteúdo da apresentação conforme produtos evoluem
- **Dores:** Atualmente precisa editar HTML cru para mudar qualquer texto; risco de quebrar layout ao atualizar conteúdo; sem preview fácil
- **Contexto de uso:** Desktop, editor de código; usa a skill `slide-manager` para gerenciar conteúdo

### P3 — Equipe de Comunicação / Assessoria
- **Objetivo:** Garantir que a apresentação esteja alinhada com identidade visual do governo e transmita profissionalismo
- **Dores:** Sem controle de versão do conteúdo; dificuldade de validar consistência visual entre slides; sem processo de revisão

---

## Requisitos

### Funcionais

| ID | Épico | Requisito |
|----|-------|-----------|
| RF-01 | Migração Astro | Migrar estrutura HTML monolítica para projeto Astro com componentes reutilizáveis |
| RF-02 | Conteúdo YAML | Externalizar conteúdo dos slides em arquivos YAML editáveis separadamente |
| RF-03 | Componentes | Criar biblioteca de componentes: ProductCard, Badge, ContentBlock, PillarCard, Chip, MockupFrame |
| RF-04 | Layouts | Implementar layouts reutilizáveis: SlideHero, SlideOverviewGrid, SlideProductDetail, SlideContext, SlideClosing (+ variações da skill slide-manager) |
| RF-05 | Navegação | Manter navegação por dots laterais com scroll-snap e smooth scroll |
| RF-06 | Animações | Preservar todas as animações GSAP (hero, stagger, WIP pulse, section entrance) |
| RF-07 | Responsividade | Garantir 3 breakpoints funcionais: Desktop (≥1024), Tablet (640-1023), Mobile (<640) |
| RF-08 | Novo Slide | Permitir adição de novos slides sem alterar código (apenas YAML + escolha de layout) |
| RF-09 | Assets | Implementar sistema de assets (imagens, mockups, logos) com otimização |
| RF-10 | Acessibilidade | Garantir suporte a prefers-reduced-motion, navegação por teclado e contraste WCAG AAA para projeção |
| RF-11 | Deploy | Configurar pipeline de build e deploy estático (GitHub Pages ou similar) |
| RF-12 | Preview | Configurar dev server com hot-reload para preview em tempo real |
| RF-13 | Projeção | Garantir legibilidade em auditório (~100 pessoas): tipografia mínima aumentada, alto contraste, densidade reduzida |

### Não Funcionais

| ID | Categoria | Requisito |
|----|-----------|-----------|
| RNF-01 | Performance | Lighthouse Performance ≥ 90 (first contentful paint < 1.5s) |
| RNF-02 | Acessibilidade | Lighthouse Accessibility ≥ 90; WCAG 2.1 AAA preferencial (projetor reduz contraste) |
| RNF-03 | SEO | Meta tags institucionais, Open Graph para compartilhamento |
| RNF-04 | Manutenibilidade | Conteúdo editável sem conhecimento de HTML/CSS |
| RNF-05 | Compatibilidade | Chrome, Edge, Firefox (últimas 2 versões); Safari 16+ |
| RNF-06 | Segurança | CSP headers; sem dependências com vulnerabilidades conhecidas |

---

## Épicos

| ID | Épico | Descrição |
|----|-------|-----------|
| E-01 | Migração para Astro | Estruturar projeto Astro, migrar HTML/CSS/JS para componentes |
| E-02 | Sistema de Conteúdo | YAML schemas, content collections, desacoplamento dados/apresentação |
| E-03 | Biblioteca de Componentes | Componentes Astro reutilizáveis com design system tokens |
| E-04 | Animações e Interatividade | Integração GSAP com lifecycle Astro, scroll-snap, navegação |
| E-05 | Qualidade e Deploy | Testes, CI/CD, Lighthouse, acessibilidade |

---

## Histórias de Usuário

### US-01 — Scaffold do Projeto Astro
**Épico:** E-01 | **Prioridade:** Alta | **Pontos:** 5

> Como **servidor técnico da GEA**, quero que o projeto use Astro com estrutura de pastas padronizada para que eu consiga fazer alterações com confiança usando ferramentas modernas.

**Critérios de aceite:**
- Dado que o projeto foi inicializado, quando executo `npm run dev`, então o servidor Astro inicia na porta 4321
- Dado que o projeto existe, quando listo a estrutura, então encontro `src/pages/`, `src/layouts/`, `src/components/`, `src/content/`, `src/styles/`
- Dado que o build roda, quando executo `npm run build`, então gera output estático em `dist/` sem erros
- Dado que o design system existe em MD, quando verifico `src/styles/global.css`, então todas as CSS variables do design system estão migradas

---

### US-02 — Content Collections com YAML
**Épico:** E-02 | **Prioridade:** Alta | **Pontos:** 5

> Como **servidor técnico da GEA**, quero editar o conteúdo dos slides em arquivos YAML simples para que eu não precise mexer em HTML ou componentes.

**Critérios de aceite:**
- Dado que existem 7 slides, quando listo `src/content/slides/`, então encontro 7 arquivos YAML (s01-capa.yaml a s07-encerramento.yaml)
- Dado que edito o título no YAML do slide 3, quando o dev server recarrega, então o novo título aparece na apresentação
- Dado que o schema está definido, quando insiro um campo inválido no YAML, então o build falha com mensagem clara de erro

---

### US-03 — Componentes Base (Badge, ContentBlock, Chip)
**Épico:** E-03 | **Prioridade:** Alta | **Pontos:** 5

> Como **equipe de comunicação**, quero que os elementos visuais (badges, blocos de conteúdo, chips) sejam consistentes em todos os slides para que a apresentação transmita profissionalismo.

**Critérios de aceite:**
- Dado que o componente Badge existe, quando passo `variant="active"`, então renderiza com estilo verde/sucesso; quando passo `variant="wip"`, renderiza com estilo amarelo/warning
- Dado que o ContentBlock recebe título e texto, quando renderiza, então exibe borda esquerda brand-500, título em heading e texto em base
- Dado que o Chip recebe label e ícone, quando renderiza, então exibe com estilo info e hover com elevação

---

### US-04 — Componente ProductCard
**Épico:** E-03 | **Prioridade:** Alta | **Pontos:** 3

> Como **gestor público**, quero ver cards de produto com status visual claro para que eu identifique instantaneamente quais produtos estão operacionais e quais estão em desenvolvimento.

**Critérios de aceite:**
- Dado que um produto está ativo, quando o card renderiza, então exibe badge "Em operação" e estilo normal
- Dado que um produto está em desenvolvimento, quando o card renderiza, então exibe overlay semitransparente, loading bar animada e badge "Em construção"
- Dado que passo o mouse sobre o card, quando hover é ativado, então o card escala com efeito 3D e glow

---

### US-05 — Layouts de Slide (Hero, Grid, Detail, Closing)
**Épico:** E-01 | **Prioridade:** Alta | **Pontos:** 8

> Como **servidor técnico da GEA**, quero layouts prontos para cada tipo de slide para que eu adicione novos slides apenas escolhendo um layout e preenchendo o YAML.

**Critérios de aceite:**
- Dado que uso SlideHero, quando renderiza, então exibe 2 colunas (60/40), header institucional, título hero, subtitle e elemento decorativo
- Dado que uso SlideOverviewGrid, quando renderiza, então exibe grid responsivo (4→2→1 cols) com ProductCards
- Dado que uso SlideProductDetail, quando renderiza, então exibe 2 colunas com ContentBlocks à esquerda e MockupFrame à direita
- Dado que uso SlideClosing, quando renderiza, então exibe fundo brand-600, logo centralizado e texto institucional branco

---

### US-06 — Integração GSAP com Astro
**Épico:** E-04 | **Prioridade:** Alta | **Pontos:** 8

> Como **gestor público**, quero que as animações de entrada e scroll funcionem de forma fluida para que a apresentação cause impacto visual em reuniões.

**Critérios de aceite:**
- Dado que a página carrega, quando o hero section aparece, então header, título, subtitle e orbe geométrico animam em sequência
- Dado que faço scroll para S02, quando os cards entram no viewport, então animam em stagger (cascata)
- Dado que navego entre seções, quando a seção entra no viewport, então eyebrow, título e content blocks animam com fade/slide
- Dado que o usuário tem prefers-reduced-motion ativado, quando a página carrega, então todas as animações são suprimidas

---

### US-07 — Navegação por Dots e Scroll-Snap
**Épico:** E-04 | **Prioridade:** Média | **Pontos:** 3

> Como **gestor público**, quero navegar entre slides clicando nos dots laterais ou fazendo scroll para que a navegação seja intuitiva como um PowerPoint.

**Critérios de aceite:**
- Dado que estou no desktop, quando visualizo a página, então 7 dots aparecem no lado direito
- Dado que clico no dot 4, quando o scroll completa, então a seção S04 está visível e o dot 4 está highlighted
- Dado que faço scroll manual, quando passo de S02 para S03, então o dot ativo muda automaticamente

---

### US-08 — Responsividade Completa
**Épico:** E-03 | **Prioridade:** Média | **Pontos:** 5

> Como **gestor público**, quero acessar a apresentação pelo celular para que eu possa compartilhar o link com superiores que consultarão no smartphone.

**Critérios de aceite:**
- Dado que acesso em tela ≥1024px, quando visualizo, então scroll-snap está ativo, nav dots visíveis, grids em 4 colunas
- Dado que acesso em tela 640-1023px, quando visualizo, então grids em 2 colunas, nav dots ocultos
- Dado que acesso em tela <640px, quando visualizo, então 1 coluna, scroll livre, tipografia reduzida proporcionalmente

---

### US-09 — Pipeline de Deploy (GitHub Pages)
**Épico:** E-05 | **Prioridade:** Média | **Pontos:** 3

> Como **servidor técnico da GEA**, quero que ao fazer push na main o site seja publicado automaticamente para que eu não precise de processo manual de deploy.

**Critérios de aceite:**
- Dado que faço push na branch main, quando o workflow executa, então o site é buildado e publicado no GitHub Pages
- Dado que o build falha, quando verifico o GitHub Actions, então vejo log claro do erro
- Dado que o deploy completa, quando acesso a URL pública, então a apresentação está acessível

---

### US-10 — Otimização de Performance e Acessibilidade
**Épico:** E-05 | **Prioridade:** Média | **Pontos:** 5

> Como **equipe de comunicação**, quero que a apresentação carregue rápido e seja acessível para que atenda padrões do governo digital.

**Critérios de aceite:**
- Dado que rodo Lighthouse, quando verifico Performance, então score ≥ 90
- Dado que rodo Lighthouse, quando verifico Accessibility, então score ≥ 90
- Dado que a página renderiza, quando inspeciono o HTML, então todas as seções têm landmarks semânticos e headings hierárquicos
- Dado que verifico meta tags, quando inspeciono o head, então Open Graph e meta description estão presentes

---

### US-11 — Slide de Contexto Estratégico (novo)
**Épico:** E-02 | **Prioridade:** Alta | **Pontos:** 3

> Como **gestor público**, quero entender POR QUE esses produtos existem antes de ver os detalhes para que eu compreenda a urgência e relevância do portfólio.

**Critérios de aceite:**
- Dado que navego da capa (S01), quando chego ao próximo slide, então vejo um contexto dos desafios do estado antes do grid de produtos
- Dado que leio o slide, quando verifico o conteúdo, então encontro 2-3 problemas concretos que os produtos resolvem (gestão fragmentada, dados dispersos, falta de transparência)
- Dado que sou um secretário, quando leio, então entendo o impacto sem jargão técnico

**Justificativa (User Research):** A jornada atual pula direto de "4 produtos" para detalhes sem explicar o cenário que motivou a criação. Gestores perdem contexto de priorização.

---

### US-12 — Slide/Seção de CTA e Próximos Passos (novo)
**Épico:** E-02 | **Prioridade:** Alta | **Pontos:** 2

> Como **gestor público**, quero saber o que fazer depois de ver a apresentação para que eu possa agir (adotar SIPP, solicitar demo, agendar reunião).

**Critérios de aceite:**
- Dado que chego ao encerramento, quando visualizo, então encontro pelo menos 1 CTA claro (contato, link, próxima reunião)
- Dado que sou secretário, quando leio, então sei como solicitar integração da minha secretaria ao SIPP
- Dado que sou técnico, quando leio, então encontro link para documentação ou canal de suporte

**Justificativa (User Research):** O slide de encerramento atual termina "frio" — sem ação. O espectador não sabe o que fazer a seguir.

---

### US-13 — Consistência de UX Copy (novo)
**Épico:** E-02 | **Prioridade:** Média | **Pontos:** 2

> Como **equipe de comunicação**, quero que os rótulos e termos sejam consistentes entre todos os slides para que a apresentação transmita profissionalismo.

**Critérios de aceite:**
- Dado que verifico os content blocks, quando comparo labels entre slides, então todos usam o mesmo padrão: "O que é" / "Desafio" / "Solução" / "Status atual"
- Dado que verifico badges, quando comparo entre slides, então "Em operação" e "Em desenvolvimento" são os únicos termos usados (sem variações como "MVP em operação")
- Dado que verifico o tom, quando leio S04 (Watchtower), então a linguagem está acessível para gestores (sem jargão técnico como "observabilidade")

**Problemas detectados (UX Copy Review):**
| Conceito | S03 | S04 | S05 | S06 |
|----------|-----|-----|-----|-----|
| Introdução | "O que é" | "O que é" | "Contexto" | "Contexto" |
| Problema | "Problema" | "Problemas resolvidos" | — | "Problemas a resolver" |
| Status | "MVP em operação" | — | texto livre | texto livre |

---

### US-14 — Acessibilidade: Focus States e Navegação por Teclado (novo)
**Épico:** E-05 | **Prioridade:** Alta | **Pontos:** 3

> Como **pessoa com deficiência motora**, quero navegar pela apresentação usando apenas o teclado para que eu tenha acesso igualitário ao conteúdo.

**Critérios de aceite:**
- Dado que pressiono Tab, quando navego pela página, então todos os elementos interativos (dots, cards, links) recebem foco visível (`:focus-visible` com outline brand-500)
- Dado que pressiono Enter em um nav dot, quando o foco está no dot, então a página scrolla para a seção correspondente
- Dado que a página carrega, quando verifico o HTML, então existe um skip link "Ir para conteúdo principal"
- Dado que verifico contraste, quando uso ferramenta WCAG, então nenhum texto usa brand-400 (#66BB6A) sobre fundo claro

**Problemas detectados (Frontend Design Review):**
- Zero `:focus` ou `:focus-visible` states definidos (apenas `:hover`)
- Sem skip links
- brand-400 sobre branco falha WCAG AA
- Warning text (#F57F17) sobre fundo amarelo é marginal

---

### US-15 — Otimização para Projeção em Auditório (novo)
**Épico:** E-03 | **Prioridade:** Alta | **Pontos:** 5

> Como **gestor público no auditório**, quero que todo o conteúdo seja legível a 15 metros de distância do projetor para que eu acompanhe a apresentação sem esforço.

**Critérios de aceite:**
- Dado que projeto em auditório, quando verifico tipografia, então o menor texto visível é ≥ 1rem (16px) — text-xs e text-sm só para elementos decorativos não essenciais
- Dado que projeto em auditório, quando verifico hero/títulos, então text-hero é ≥ 4rem e text-display ≥ 2.5rem
- Dado que projeto em auditório, quando verifico contraste, então todas as combinações de cor passam WCAG AAA (7:1) — projetor degrada contraste em ~30%
- Dado que projeto em auditório, quando verifico densidade, então nenhum slide tem mais de 3 content blocks ou mais de 4 itens em lista
- Dado que projeto em auditório, quando verifico animações hover, então efeitos de hover (3D tilt, glow, mouse tracking) são desabilitados — irrelevantes em projeção

**Impactos no design system:**
- Aumentar `--text-base` de 0.9375rem para 1.125rem
- Aumentar `--text-sm` de 0.8125rem para 1rem
- Remover/condicionar mouse tracking CSS (`--mouse-x`, `--mouse-y`)
- Considerar media query `@media (display-mode: fullscreen)` para modo apresentação
- Revisar S06 que tem 4 itens na lista de problemas (reduzir para 2-3)

---

## Sprints (Atualizado)

### Sprint 1 — Fundação (Semanas 1-2)
**Objetivo:** Estrutura Astro funcional com design system migrado e componentes base, já otimizado para projeção

| ID | História | Pontos |
|----|----------|--------|
| US-01 | Scaffold do Projeto Astro | 5 |
| US-02 | Content Collections com YAML | 5 |
| US-03 | Componentes Base (Badge, ContentBlock, Chip) | 5 |
| US-04 | Componente ProductCard | 3 |
| US-15 | Otimização para Projeção em Auditório | 5 |

**Total:** 23 pontos

**Entregável:** Projeto Astro rodando com dev server, conteúdo externalizado em YAML, componentes base renderizando corretamente, tipografia e contraste otimizados para auditório.

---

### Sprint 2 — Apresentação Completa (Semanas 3-4)
**Objetivo:** Todos os slides renderizando com layouts, animações, navegação + conteúdo revisado

| ID | História | Pontos |
|----|----------|--------|
| US-05 | Layouts de Slide (Hero, Grid, Detail, Closing) | 8 |
| US-06 | Integração GSAP com Astro | 8 |
| US-07 | Navegação por Dots e Scroll-Snap | 3 |
| US-11 | Slide de Contexto Estratégico (novo) | 3 |
| US-12 | Slide/Seção de CTA e Próximos Passos (novo) | 2 |

**Total:** 24 pontos

**Entregável:** Apresentação completa (agora com 9 slides: +contexto estratégico +CTA), animações GSAP funcionando, navegação por dots e scroll-snap — superando o index.html original em conteúdo.

---

### Sprint 3 — Qualidade e Entrega (Semanas 5-6)
**Objetivo:** Responsividade, performance, acessibilidade, copy review e deploy automatizado

| ID | História | Pontos |
|----|----------|--------|
| US-08 | Responsividade Completa | 5 |
| US-09 | Pipeline de Deploy (GitHub Pages) | 3 |
| US-10 | Otimização de Performance e Acessibilidade | 5 |
| US-13 | Consistência de UX Copy | 2 |
| US-14 | Acessibilidade: Focus States e Teclado | 3 |

**Total:** 18 pontos

**Entregável:** Apresentação responsiva, acessível por teclado, copy consistente, Lighthouse ≥ 90, deploy automático via GitHub Actions.

---

**Velocidade total:** 65 pontos em 3 sprints (~22 pontos/sprint)

---

## Riscos

| # | Risco | Impacto | Mitigação |
|---|-------|---------|-----------|
| 1 | **Complexidade da migração GSAP → Astro**: ScrollTrigger depende de lifecycle do DOM; Astro com islands pode conflitar com timing das animações | Alto | Usar `client:load` directive nos componentes animados; testar animações isoladamente antes de integrar; manter ANIMATIONS.js como módulo externo importado no client-side |
| 2 | **Conteúdo hardcoded em HTML (1462 linhas)**: Risco de perda de fidelidade visual ao decompor em componentes | Médio | Fazer migração slide por slide com comparação visual (screenshot diff); manter index.html original como referência até paridade confirmada |
| 3 | **Configs .claude apontam para projeto errado**: hooks referenciam `pos-gabi/template`, skills assumem estrutura Astro que não existe | Baixo | Atualizar `.claude/settings.json`, `launch.json` e skills para apontar para a estrutura real do projeto após Sprint 1 |
| 4 | **Sem testes automatizados**: Qualquer alteração pode quebrar layout/animações sem detecção | Médio | Introduzir visual regression tests (Playwright screenshots) no Sprint 3; usar `astro check` como gate no pre-commit |
| 5 | **Dependência de CDN para GSAP**: Sem fallback se CDN ficar indisponível | Baixo | No Sprint 1, instalar GSAP via npm como dependência local; bundlar com o build do Astro |

---

## Claude Code Automation Recommendations

### Perfil do Codebase
- **Tipo:** HTML estático → migrando para Astro (SSG)
- **Framework alvo:** Astro 4+
- **Bibliotecas-chave:** GSAP 3.12.5, Google Fonts
- **Estado atual das configs:** Hooks e skills apontam para projeto errado (`pos-gabi/template`); sem CLAUDE.md; sem `.mcp.json`

### Diagnóstico das Configs Atuais

**Problemas encontrados:**
1. `.claude/settings.json` — hook PostToolUse roda `astro check` em `C:\1. projetos\pos-gabi\template` (projeto errado)
2. `.claude/launch.json` — referencia `template/` que não existe neste projeto
3. `.claude/agents/slide-reviewer.md` — busca arquivos em `template/src/content/slides/` (inexistente); description menciona "terminologia clínica" (copiado de outro projeto)
4. `.claude/skills/new-slide/SKILL.md` — referencia estrutura Astro que ainda não foi criada
5. `.claude/skills/deploy-check/SKILL.md` — referencia `template/` inexistente
6. Sem `CLAUDE.md` — Claude não tem contexto persistente sobre o projeto
7. Sem `.mcp.json` — nenhum MCP server configurado

### Recomendações

---

#### 1. CLAUDE.md (Criar — Prioridade Sprint 0)

Criar `CLAUDE.md` na raiz com contexto do projeto para que o Claude entenda o repositório em qualquer conversa:

```markdown
# SEPOG: Produtos Estratégicos

Apresentação institucional da SEPOG/DGEPP/GEA (Governo de Rondônia) — landing page scroll-based com 7 slides.

## Stack
- Astro 4+ (SSG)
- GSAP 3.12.5 (animações scroll-triggered)
- CSS custom properties (design tokens em src/styles/global.css)
- Google Fonts: DM Sans + JetBrains Mono

## Estrutura
- Conteúdo: src/content/slides/*.yaml
- Layouts: src/layouts/ (SlideHero, SlideOverviewGrid, SlideProductDetail, SlideClosing)
- Componentes: src/components/ (Badge, Chip, ContentBlock, ProductCard, PillarCard, MockupFrame, SlideNav)
- Estilos: src/styles/global.css (design tokens)

## Comandos
- npm run dev — servidor de desenvolvimento (porta 4321)
- npm run build — build de produção
- npm run preview — preview do build

## Convenções
- Conteúdo em PT-BR formal/institucional
- Nomenclatura YAML: sNN-slug.yaml (ex: s03-sipp.yaml)
- CSS variables com prefixo semântico (--brand-*, --gray-*, --text-*, --space-*)
- Animações via GSAP, nunca CSS transitions para efeitos complexos
```

---

#### 2. Hooks (Corrigir e Expandir)

**Hook atual (QUEBRADO):** Roda `astro check` no projeto errado.

**Hooks recomendados após migração Astro:**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx astro check 2>&1"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "node -e \"const f=process.argv[1]; if(f&&(f.includes('.env')||f.includes('package-lock'))) { console.error('BLOCKED: não edite '+f); process.exit(1); }\" \"$CLAUDE_FILE_PATH\""
          }
        ]
      }
    ]
  }
}
```

- **PostToolUse (Edit|Write):** `astro check` no diretório correto
- **PreToolUse (Edit|Write):** Bloquear edição de `.env` e `package-lock.json`

---

#### 3. Subagent: slide-reviewer (Corrigir)

**Atual:** Descrição menciona "terminologia clínica" e busca em `template/src/`. Claramente copiado de outro projeto.

**Corrigido:**

```markdown
---
name: slide-reviewer
description: Revisa todos os slides Astro em busca de inconsistências visuais, de conteúdo e terminologia institucional
---

Você é um revisor especializado em apresentações institucionais governamentais.

Analise todos os arquivos em:
- `src/content/slides/*.yaml` — conteúdo dos slides
- `src/layouts/*.astro` — layouts usados
- `src/pages/index.astro` — ordem e navegação

Reporte:
1. **Consistência terminológica**: termos institucionais usados de formas diferentes entre slides (SEPOG, DGEPP, GEA)
2. **Consistência estrutural**: slides que fogem do padrão de layout ou campos YAML
3. **Navegação**: slides faltando ou fora de ordem em index.astro
4. **Coesão visual**: uso inconsistente de componentes (badges, chips, cards) entre slides similares
5. **Status dos produtos**: verificar se badges de status (ativo/em desenvolvimento) estão corretos
```

---

#### 4. Skills (Corrigir + Nova skill slide-manager)

**Corrigir:** `new-slide` e `deploy-check` — remover referências a `template/` e apontar para raiz do projeto (após migração Astro).

**Nova skill `slide-manager`** (já especificada pelo usuário): Orquestra edição (M1), biblioteca de layouts (M2), criação guiada (M3), handoff com new-slide (M4) e nova apresentação (M5). Inclui regras de UX Copy integradas (alinhadas com US-13) e catálogo de layouts com variações (SlideHero, SlideOverviewGrid, SlideProductDetail, SlideContext, SlideClosing + variações deriváveis). Instalar em `.claude/skills/slide-manager/SKILL.md` no Sprint 0.

---

#### 5. launch.json (Corrigir)

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "Astro Dev Server",
      "runtimeExecutable": "cmd.exe",
      "runtimeArgs": ["/c", "npm run dev"],
      "port": 4321
    },
    {
      "name": "Astro Preview (build)",
      "runtimeExecutable": "cmd.exe",
      "runtimeArgs": ["/c", "npm run preview"],
      "port": 4321
    }
  ]
}
```

---

#### 6. MCP Server: Playwright (Recomendado — Sprint 3)

Para visual regression testing da apresentação após migração:

```bash
claude mcp add playwright -- npx @anthropic-ai/mcp-playwright
```

Permite capturar screenshots de cada slide e comparar visualmente com o index.html original.

---

### Impacto no Plano de Sprints

As correções de automação devem ser incorporadas como **Sprint 0** (pré-requisito):

#### Sprint 0 — Configuração do Ambiente (1-2 dias)
| Tarefa | Descrição |
|--------|-----------|
| Criar `CLAUDE.md` | Contexto do projeto para todas as sessões |
| Corrigir `.claude/settings.json` | Remover path errado; ajustar após Astro |
| Corrigir `.claude/launch.json` | Remover `cd template &&` |
| Corrigir `slide-reviewer.md` | Remover "clínica", corrigir paths |
| Corrigir skills (new-slide, deploy-check) | Remover referências a `template/` |
| Instalar skill `slide-manager` | Salvar spec em `.claude/skills/slide-manager/SKILL.md` |
| Criar `.mcp.json` | Placeholder para MCP servers futuros |

> **Nota:** Os hooks de `astro check` só serão ativados após Sprint 1 (scaffold Astro). Até lá, o hook PostToolUse deve ser desabilitado para não falhar em cada edição.

---

## Próximos Passos

1. **Sprint 0:** Corrigir configs .claude + instalar slide-manager (1-2 dias)
2. **Sprint 1:** Scaffold Astro + YAML + Componentes base + Otimização auditório (2 semanas, 23pts)
3. **Sprint 2:** Layouts + GSAP + Navegação + Novos slides de contexto/CTA (2 semanas, 24pts)
4. **Sprint 3:** Responsividade + Deploy + Performance + UX Copy + Acessibilidade teclado (2 semanas, 18pts)

Após aprovação, o backlog será salvo em `docs/backlog.md` no repositório.

---

## Achados das Revisões Especializadas

### User Research — Lacunas Críticas

| Achado | Severidade | Sprint |
|--------|-----------|--------|
| **Sem slide de contexto** — pula direto para produtos sem explicar o cenário | Alta | Sprint 2 (US-11) |
| **Sem CTA** — encerramento termina "frio", sem próximos passos | Alta | Sprint 2 (US-12) |
| **Dependências entre produtos não explicitadas** — Novo Portal depende de Delphos? | Média | Conteúdo YAML |
| **Linguagem mista** — S04 usa jargão técnico para público executivo | Média | Sprint 3 (US-13) |
| **Métricas ausentes** — "bom desempenho" sem quantificar | Baixa | Conteúdo YAML |

### UX Copy — Inconsistências

| Local | Problema | Correção |
|-------|----------|----------|
| Labels de content block | "O que é" (S03-04) vs "Contexto" (S05-06) | Padronizar: "O que é" para todos |
| Labels de problema | "Problema" / "Problemas resolvidos" / "Problemas a resolver" | Padronizar: "Desafio" para todos |
| Badge de status | "MVP em operação" (S03) vs "Em operação" (S02) | Padronizar: "Em operação" |
| Placeholders de mockup | "Screenshot do SIPP", "Conceito do Delphos" | Substituir por imagens reais |

### Frontend Design — Problemas Técnicos

| Problema | Impacto | Sprint |
|----------|---------|--------|
| Zero `:focus-visible` states | Acessibilidade quebrada para teclado | Sprint 3 (US-14) |
| Sem skip links | Falha WCAG 2.1 | Sprint 3 (US-14) |
| brand-400 sobre branco | Falha contraste WCAG AA | Sprint 3 (US-14) |
| Mouse tracking sem throttle | Repaint contínuo (60fps) | Sprint 2 (US-06) |
| 950 linhas CSS inline | Sem cache do browser | Sprint 1 (US-01, migração para arquivo externo) |
| Magic numbers em padding | 6px, 14px fora do token system | Sprint 1 (US-03) |
