---
name: slide-manager
description: Orquestra edição, criação e biblioteca de layouts da apresentação institucional Astro da GEA/SEPOG.
disable-model-invocation: true
---

# slide-manager

Skill de orquestração para a apresentação institucional do ecossistema GEA (SEPOG/Rondônia), construída em Astro com GSAP.

---

## Contexto do projeto

A apresentação é um site estático Astro com scroll-snap vertical, onde cada seção é um "slide".

### Estrutura relevante

```
src/
├── content/slides/*.yaml       ← conteúdo editável (1 arquivo por slide)
├── layouts/*.astro             ← componentes de layout de slide
├── components/*.astro          ← componentes visuais reutilizáveis
├── styles/global.css           ← design tokens (CSS custom properties)
└── pages/index.astro           ← registro e ordenação dos slides
```

### Convenções

- A **ordem dos slides** é definida exclusivamente pela sequência de imports/referências em `src/pages/index.astro`. O número no filename (`sNN`) é identificador, NÃO define ordem.
- Novos slides recebem o **próximo número sequencial disponível** independentemente de onde serão posicionados. Nunca renumerar arquivos existentes.
- O schema YAML de cada slide é validado pelo Astro Content Collections. Campos obrigatórios variam por layout.

### Personas de referência

- **P1 — Gestor Público:** Consome a apresentação. Precisa de linguagem executiva, zero jargão.
- **P2 — Servidor Técnico (GEA):** Edita conteúdo e estrutura. Trabalha com código.
- **P3 — Comunicação/Assessoria:** Valida identidade visual e consistência de linguagem.

---

## Detecção de modo

Analise a mensagem do usuário e classifique em um dos modos:

| Padrão na mensagem | Modo |
|---|---|
| editar, alterar, atualizar, corrigir, trocar texto/título/status | **M1 — edit** |
| ver layouts, como fica, preview, mostrar opções, biblioteca | **M2 — browse** |
| criar, novo slide, adicionar slide sobre X | **M3 — create** |
| invocado pela skill `new-slide` no step de layout | **M4 — handoff** |
| nova apresentação, começar do zero, resetar slides, novo deck | **M5 — new presentation** |
| excluir, remover, apagar, deletar slide | **M1 — edit (exclusão)** |
| ambíguo | Perguntar ao usuário |

---

## M1 — Edição de conteúdo

### Fluxo

```
IDENTIFICAR → LER → ENTENDER → [CLASSIFICAR] → PLANEJAR → APLICAR → VERIFICAR
```

#### 1. IDENTIFICAR
Pergunte ou deduza qual slide o usuário quer editar. Se ambíguo, liste os slides disponíveis lendo `src/content/slides/` e apresente:
```
Slides disponíveis:
  s01 — Capa (SlideHero)
  s02 — Contexto estratégico (SlideContext)
  s03 — Visão geral dos produtos (SlideOverviewGrid)
  ...
```

#### 2. LER
Leia o arquivo YAML do slide e mostre um resumo amigável (não o YAML cru):
```
📄 Slide s04 — SIPP (SlideProductDetail)
   Título: "SIPP — Sistema Integrado de Políticas Públicas"
   Status: Em operação ✅
   Blocos: O que é | Desafio | Solução
   Mockup: sipp-dashboard.png
   Chips: Gestão, Transparência, Integração
```

#### 3. ENTENDER
O que o usuário quer mudar? Identifique campos específicos.

#### 4. CLASSIFICAR — edição simples ou estrutural?

**Edição simples** (aplicar direto sem ciclo de aprovação):
- Trocar título, subtítulo, eyebrow
- Alterar texto de content blocks
- Mudar label de badge, chip
- Corrigir typo
- Alterar campo de status (active/wip)

**Edição estrutural** (requer aprovação explícita):
- Adicionar ou remover content blocks
- Trocar layout do slide
- Adicionar/remover campos do YAML
- Alterar a posição do slide na ordem
- Qualquer mudança que afete o componente .astro

#### 5. PLANEJAR
Mostre o diff em linguagem natural:
```
Plano de edição (s04-sipp.yaml):
  • title: "SIPP — Sistema Integrado..." → "SIPP"
  • subtitle: (vazio) → "Sistema Integrado de Políticas Públicas"
  ✅ Edição simples — aplicando.
```
Ou para estrutural:
```
Plano de edição (s04-sipp.yaml):
  • ADICIONAR content_block: { label: "Impacto", text: "..." }
  • REMOVER chip: "Integração"
  ⚠️ Edição estrutural — confirma? (s/n)
```

#### 6. APLICAR
Gravar o YAML. Se estrutural, apenas após confirmação.

#### 7. VERIFICAR
Confirmar que campos obrigatórios do schema estão presentes. Se algo ficou inconsistente, alertar imediatamente.

### Edição em lote
Se o usuário pedir mudanças em vários slides (ex: "padronize todos os badges"), montar plano completo, pedir uma aprovação geral, aplicar sequencialmente.

---

### Exclusão de slide

A exclusão é **sempre edição estrutural** — ciclo completo de aprovação obrigatório, sem exceções.

#### Fluxo

```
IDENTIFICAR → VERIFICAR DEPENDÊNCIAS → MOSTRAR CONTEÚDO → APROVAR → EXECUTAR → CONFIRMAR
```

#### 1. IDENTIFICAR
Qual slide excluir? Se ambíguo, listar os slides disponíveis.

#### 2. VERIFICAR DEPENDÊNCIAS
Antes de qualquer coisa, verificar:
- [ ] O slide é referenciado em `src/pages/index.astro`? (sempre será — remover)
- [ ] Algum outro arquivo `.astro` importa ou referencia esse slide diretamente? (raro, mas verificar)
- [ ] O YAML referencia assets específicos (imagens de mockup, ícones)? Se sim, listar para o usuário decidir se remove os assets também ou mantém

#### 3. MOSTRAR CONTEÚDO
Exibir resumo completo do que será perdido:
```
🗑️ Excluir slide s05 — Delphos (SlideProductDetail)
   Conteúdo que será perdido:
     • Título: "Delphos"
     • Status: Em desenvolvimento
     • Blocos: O que é | Desafio | Solução
     • Mockup: delphos-dashboard.png
     • Chips: Integração, Dados, APIs
   Arquivos afetados:
     • REMOVER: src/content/slides/s05-delphos.yaml
     • EDITAR: src/pages/index.astro (remover referência)
   ⚠️ Essa ação não pode ser desfeita pela skill. Confirma? (s/n)
```

#### 4. APROVAR
Apenas prosseguir com confirmação explícita do usuário.

#### 5. EXECUTAR
- Deletar o arquivo YAML de `src/content/slides/`
- Remover o import e a referência do slide em `src/pages/index.astro`
- NÃO renumerar outros slides (consistente com a regra geral)
- NÃO deletar assets automaticamente (informar quais ficaram órfãos para decisão manual)

#### 6. CONFIRMAR
```
✅ Slide s05-delphos removido.
   Ordem atual dos slides em index.astro:
     1. s01-capa
     2. s02-contexto
     3. s03-overview
     4. s04-sipp
     5. s06-cta
     6. s07-encerramento
   ⚠️ Assets potencialmente órfãos: delphos-dashboard.png
```

#### Exclusão em lote
Se o usuário pedir para excluir vários slides, montar plano único com todos os slides listados. Uma aprovação. Execução sequencial. Relatório final consolidado.

---

## M2 — Biblioteca de layouts

### Catálogo de layouts base

Quando o usuário pedir para ver layouts ou escolher um, apresente o catálogo abaixo. Para cada layout:
1. Mostre o **nome amigável** e descrição de uma linha
2. Renderize um **mini-preview HTML** de baixa fidelidade usando as cores do design system (CSS custom properties de `global.css`)
3. Liste os **campos YAML** que o layout consome

#### Layout: SlideHero → "Capa com destaque lateral"

Duas colunas (60/40). Lado esquerdo: header institucional, título grande, subtítulo. Lado direito: elemento decorativo (orbe geométrico, imagem, etc).

```
┌─────────────────────────────────────────────┐
│ [logo]            GOVERNO DE RONDÔNIA       │
│                                             │
│  ┌──────────────────┐  ┌────────────────┐   │
│  │                  │  │                │   │
│  │  TÍTULO GRANDE   │  │   elemento     │   │
│  │  Subtítulo       │  │   decorativo   │   │
│  │                  │  │   (orbe/img)   │   │
│  │  [eyebrow]       │  │                │   │
│  └──────────────────┘  └────────────────┘   │
│        60%                    40%            │
└─────────────────────────────────────────────┘
```

Campos YAML: `eyebrow`, `title`, `subtitle`, `decorative_element`

**Variações deriváveis:**
- **hero-centered** — Título centralizado, sem coluna lateral. Para capas minimalistas.
- **hero-media** — Coluna direita com imagem/vídeo em vez de orbe.
- **hero-stats** — Coluna direita com 2-3 KPIs grandes. Para slides de impacto.

---

#### Layout: SlideOverviewGrid → "Grade de produtos"

Título de seção + grid responsivo de ProductCards (4→2→1 colunas).

```
┌─────────────────────────────────────────────┐
│  [eyebrow]                                  │
│  TÍTULO DA SEÇÃO                            │
│                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐ │
│  │ Card 1 │ │ Card 2 │ │ Card 3 │ │Card 4│ │
│  │ badge  │ │ badge  │ │ badge  │ │badge │ │
│  │ desc   │ │ desc   │ │ desc   │ │desc  │ │
│  └────────┘ └────────┘ └────────┘ └──────┘ │
│       4 colunas (→ 2 tablet → 1 mobile)     │
└─────────────────────────────────────────────┘
```

Campos YAML: `eyebrow`, `title`, `products[]` (`name`, `description`, `status`, `badge_label`)

**Variações deriváveis:**
- **grid-featured** — 1 card grande (destaque) + 3 menores em grid. Para quando um produto é protagonista.
- **grid-compact** — Cards menores, até 6 itens, sem descrição. Para listagem densa.
- **grid-timeline** — Cards conectados por linha horizontal com datas. Para roadmap.

---

#### Layout: SlideProductDetail → "Detalhe de produto"

Duas colunas. Esquerda: content blocks empilhados (borda lateral brand). Direita: mockup frame + chips.

```
┌─────────────────────────────────────────────┐
│  [eyebrow]             [badge status]       │
│  NOME DO PRODUTO                            │
│                                             │
│  ┌──────────────────┐  ┌────────────────┐   │
│  │ ┃ O que é        │  │  ╔══════════╗  │   │
│  │ ┃ texto...       │  │  ║ MOCKUP   ║  │   │
│  │                  │  │  ║ FRAME    ║  │   │
│  │ ┃ Desafio        │  │  ║          ║  │   │
│  │ ┃ texto...       │  │  ╚══════════╝  │   │
│  │                  │  │                │   │
│  │ ┃ Solução        │  │  [chips...]    │   │
│  │ ┃ texto...       │  │                │   │
│  └──────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────┘
```

Campos YAML: `eyebrow`, `product_name`, `badge` (`variant`, `label`), `content_blocks[]` (`label`, `text`), `mockup_src`, `chips[]` (`label`, `icon`)

**Variações deriváveis:**
- **detail-mirrored** — Visual à esquerda, conteúdo à direita. Para variar ritmo visual.
- **detail-full** — Sem mockup. Conteúdo em 2 colunas de content blocks. Para produtos sem interface.
- **detail-metrics** — Coluna direita com KpiCards em vez de mockup. Para slides de resultados.
- **detail-comparison** — Duas colunas "antes/depois". Para mostrar transformação.

---

#### Layout: SlideContext → "Contexto estratégico"

Grade de 2-3 cards de problema + frase de transição. Para storytelling antes dos produtos.

```
┌─────────────────────────────────────────────┐
│  [eyebrow]                                  │
│  TÍTULO                                     │
│                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌───────┐ │
│  │ 🔴 Problema │ │ 🔴 Problema │ │ 🔴 P3 │ │
│  │   título    │ │   título    │ │ título│ │
│  │   texto     │ │   texto     │ │ texto │ │
│  └─────────────┘ └─────────────┘ └───────┘ │
│                                             │
│  ───── linha de transição ─────             │
│  "Esses produtos foram criados para..."     │
└─────────────────────────────────────────────┘
```

Campos YAML: `eyebrow`, `title`, `problems[]` (`title`, `text`, `icon`), `transition_text`

**Variações deriváveis:**
- **context-narrative** — Texto corrido com destaque lateral. Para 1 problema aprofundado.
- **context-data** — Problemas acompanhados de números/KPIs. Para argumentação com dados.

---

#### Layout: SlideClosing → "Encerramento"

Fundo brand-600. Logo centralizado. Texto institucional branco.

```
┌─────────────────────────────────────────────┐
│                                             │
│             ┌──────────────┐                │
│             │    [LOGO]    │                │
│             └──────────────┘                │
│                                             │
│          TEXTO INSTITUCIONAL                │
│          subtexto / tagline                 │
│                                             │
│          fundo: brand-600                   │
└─────────────────────────────────────────────┘
```

Campos YAML: `logo_src`, `title`, `subtitle`

**Variações deriváveis:**
- **closing-cta** — Botões/links de ação: contato, demo, documentação. (ref. US-12)
- **closing-team** — Grid de avatares/nomes da equipe.
- **closing-next-steps** — Lista de próximos passos com ícones ou mini-timeline.

---

### Fluxo de exploração de variações

Quando o usuário quiser ver uma variação:

```
1. Mostrar o wireframe ASCII da variação (do catálogo acima)
2. Gerar um mini-preview HTML de baixa fidelidade:
   - Usar CSS custom properties do design system (--brand-500, --brand-600, etc.)
   - Dimensões fixas simulando viewport (ex: 960x540)
   - Blocos coloridos representando áreas de conteúdo
   - Tipografia real (DM Sans) onde possível
   - Sem conteúdo real — usar placeholders descritivos
3. Perguntar: "Essa estrutura funciona? Quer ajustar algo?"
4. Se o usuário não gostar, gerar nova variação e repetir
5. Quando o usuário aprovar, ADICIONAR à biblioteca:
   - Criar o componente .astro em src/layouts/
   - Nomear como: Slide[Base][Variação].astro (ex: SlideProductDetailMirrored.astro)
   - Atualizar este catálogo mental (para futuras referências na sessão)
```

### Regras para mini-previews HTML

- Renderizar como bloco HTML inline na conversa (artifact ou code block)
- Usar variáveis CSS do projeto: `var(--brand-50)` a `var(--brand-900)`, `var(--neutral-*)`, etc.
- Fontes: `'DM Sans', sans-serif` para texto, `'JetBrains Mono', monospace` para código
- Blocos placeholder com bordas tracejadas e labels descritivos
- Tamanho: proporção 16:9, largura fixa ~800px
- NÃO incluir animações GSAP — é preview estático

---

## M3 — Criação guiada de slide

### Fluxo

```
TEMA → AUDIÊNCIA → LAYOUT → CAMPOS → REFINAR → APLICAR → POSICIONAR
```

#### 1. TEMA
Pergunte: "O que esse slide vai comunicar?"

#### 2. AUDIÊNCIA
Pergunte ou deduza: "Quem é o público principal?"
- P1 (gestor) → linguagem executiva, sem jargão
- P2 (técnico) → pode incluir detalhes de implementação
- P3 (comunicação) → foco em identidade visual e consistência

#### 3. LAYOUT
**Invocar M2 (browse)**: mostrar layouts relevantes para o tipo de conteúdo com mini-previews. Deixar o usuário escolher. Se nenhum layout existente serve, propor variação ou layout novo.

#### 4. CAMPOS
Gerar YAML skeleton baseado no layout escolhido. Preencher com placeholders inteligentes (não "Lorem ipsum" — usar texto indicativo do que vai ali):
```yaml
# src/content/slides/s08-capacitacao.yaml
eyebrow: "Formação"
title: "[título sobre capacitação — ex: Preparando servidores para o digital]"
content_blocks:
  - label: "O que é"
    text: "[descrever o programa de capacitação]"
  - label: "Desafio"
    text: "[descrever o problema que a capacitação resolve]"
  - label: "Solução"
    text: "[descrever como o programa funciona]"
```

#### 5. REFINAR
O usuário preenche/ajusta. Claude sugere melhorias de copy seguindo as regras de UX Copy (ver seção abaixo). Iterar até o usuário aprovar.

#### 6. APLICAR
- Gravar o YAML em `src/content/slides/`
- Se o layout é variação nova, criar o componente .astro
- Registrar no `src/pages/index.astro`

#### 7. POSICIONAR
Perguntar: "Onde esse slide entra na ordem?"
- Mostrar a sequência atual de slides
- O usuário indica posição (ex: "depois do s03")
- Ajustar a ordem dos imports/referências em `index.astro`
- **NÃO renumerar** arquivos existentes — o novo slide recebe o próximo número disponível

---

## M4 — Handoff com `new-slide`

Quando a skill `new-slide` é invocada:

1. `new-slide` identifica o tema/nome do slide
2. No step de escolha de layout, `new-slide` **delega para `slide-manager` M2/M3**:
   - Mostrar layouts relevantes com mini-previews
   - Usuário escolhe
   - Retornar ao fluxo de criação
3. `slide-manager` completa o fluxo de criação (CAMPOS → REFINAR → APLICAR → POSICIONAR)

O `new-slide` continua sendo o ponto de entrada rápido. O `slide-manager` assume quando há decisão visual ou refinamento de conteúdo.

---

## M5 — Nova apresentação

Zera o conteúdo e constrói uma apresentação nova usando a stack existente como base. A stack (layouts, componentes, estilos, config Astro, pipeline de deploy) permanece intacta — apenas o conteúdo dos slides é substituído.

### Fluxo

```
ARQUIVAR → LIMPAR → BRIEFING → ESTRUTURAR → CRIAR EM LOTE → REVISAR → FINALIZAR
```

#### 1. ARQUIVAR
Antes de excluir qualquer coisa, mover todos os YAMLs atuais para uma pasta de backup:
```
src/content/slides/_archive/[YYYY-MM-DD]/
  ├── s01-capa.yaml
  ├── s02-contexto.yaml
  └── ...
```
Também salvar uma cópia do `index.astro` atual nessa pasta como `index.astro.bak`.

Mostrar ao usuário:
```
📦 Arquivando apresentação atual em _archive/2026-03-22/
   7 slides salvos. Você pode recuperá-los manualmente se precisar.
   Prosseguir com a limpeza? (s/n)
```

#### 2. LIMPAR
- Deletar todos os YAMLs de `src/content/slides/` (exceto a pasta `_archive/`)
- Limpar as referências de slides em `index.astro` (manter a estrutura do arquivo, remover apenas imports e uso dos slides)
- Resultado: projeto funcional com zero slides

#### 3. BRIEFING
Coletar informações sobre a nova apresentação:

```
Nova apresentação — Briefing:
  1. Qual o tema/objetivo? (ex: "apresentar o ecossistema GEA para secretários")
  2. Quem é a audiência principal? (P1 gestor / P2 técnico / P3 comunicação / misto)
  3. Quantos slides aproximadamente? (sugestão: 5–9 para manter foco)
  4. Tem conteúdo pronto ou vamos construir do zero?
```

#### 4. ESTRUTURAR
Com base no briefing, propor a **narrativa** da apresentação — a sequência de slides como arco de storytelling:

```
Proposta de estrutura (7 slides):
  s01 — Capa (SlideHero)
       "Primeiro impacto. Identidade institucional + título forte."
  s02 — Contexto (SlideContext)
       "Por quê? Problemas que motivam a apresentação."
  s03 — Visão geral (SlideOverviewGrid)
       "O quê? Portfólio completo de produtos/entregas."
  s04 — Detalhe A (SlideProductDetail)
       "Mergulho no produto principal."
  s05 — Detalhe B (SlideProductDetail)
       "Segundo produto em destaque."
  s06 — Resultados (SlideProductDetail variação detail-metrics)
       "Impacto concreto. Números."
  s07 — Encerramento + CTA (SlideClosing variação closing-cta)
       "Próximos passos. Como agir."

Essa estrutura funciona? Quer ajustar antes de começarmos a criar os slides?
```

O usuário pode pedir ajustes à estrutura (trocar ordem, adicionar/remover slides, mudar layouts). Iterar até aprovação.

#### 5. CRIAR EM LOTE
Para cada slide da estrutura aprovada, executar o fluxo M3 (criação guiada) de forma sequencial mas otimizada:
- Gerar todos os YAMLs com placeholders inteligentes de uma vez
- Mostrar resumo consolidado ao invés de perguntar slide por slide
- O usuário pode aprovar em bloco e refinar individualmente depois

Se o usuário já tem conteúdo pronto (textos, dados), incorporar diretamente nos YAMLs.

#### 6. REVISAR
Após todos os slides criados, apresentar resumo final:
```
✅ Nova apresentação criada — "Ecossistema GEA para Secretários"
   7 slides | Audiência: P1 (gestores)

   s01 — Capa ✅
   s02 — Contexto estratégico ✅
   s03 — Visão geral dos produtos ✅
   s04 — SIPP (detalhe) ✅
   s05 — Delphos (detalhe) ✅
   s06 — Resultados e impacto ✅
   s07 — Encerramento e próximos passos ✅

   Checklist de UX Copy:
   ✅ Badges padronizados
   ✅ Labels de content blocks consistentes
   ✅ Tom acessível para gestores
   ⚠️ s05 — "processamento de dados" pode ser jargão técnico para P1

   Quer revisar algum slide específico? Ou rodar `npm run dev` e ver no navegador?
```

#### 7. FINALIZAR
Confirmar que `index.astro` está com todos os slides referenciados na ordem correta. Projeto pronto pra preview.

### Regras do M5

- **Nunca** excluir layouts, componentes, estilos ou config. Apenas conteúdo.
- **Sempre** arquivar antes de limpar. Sem exceção.
- A numeração recomeça do s01 (é um conteúdo novo, não há conflito com arquivos anteriores que foram arquivados).
- Aplicar todas as regras de UX Copy durante a geração.
- Se o usuário pedir "nova apresentação" mas já tiver slides, confirmar que quer substituir (pode ser que ele queira apenas um novo slide, não um reset).

---

## Regras de UX Copy (ref. US-13)

Ao gerar ou editar conteúdo textual dos slides, SEMPRE seguir:

### Terminologia obrigatória

| Contexto | ✅ Usar | ❌ Não usar |
|---|---|---|
| Status ativo | "Em operação" | "MVP", "Rodando", "Live", "Em produção" |
| Status dev | "Em desenvolvimento" | "Em construção", "Beta", "WIP", "Em progresso" |
| Labels de bloco | "O que é", "Desafio", "Solução", "Status atual" | Variações livres, termos criativos |
| Ecossistema | "ecossistema GEA", "produtos digitais" | "sistemas", "ferramentas", "softwares" |
| Organização | "GEA/SEPOG", "Gerência de Estratégia e Agilidade" | Siglas sem expansão na primeira menção |

### Tom e linguagem

- Escrever para P1 (gestor) como audiência padrão — sempre acessível
- Se houver termo técnico necessário, incluir tradução entre parênteses na primeira ocorrência
- Frases curtas. Parágrafos de no máximo 3 linhas em content blocks.
- Voz ativa. Sujeito claro.
- Evitar: "robusto", "sinergia", "paradigma", "holístico", "alavancagem"

### Validação automática

Quando editar ou criar conteúdo, verificar:
- [ ] Todos os content blocks usam labels padronizados?
- [ ] Badges usam apenas "Em operação" ou "Em desenvolvimento"?
- [ ] Nenhum jargão técnico sem tradução?
- [ ] Tom consistente entre slides?

Se algum item falhar, alertar o usuário com sugestão de correção.

---

## Referência rápida de componentes disponíveis

Para uso nos layouts e variações:

| Componente | Props principais | Uso |
|---|---|---|
| `Badge` | `variant` (active/wip), `label` | Status de produto |
| `Chip` | `label`, `icon` | Tags de categoria/tecnologia |
| `ContentBlock` | `label`, `text` | Blocos de conteúdo com borda brand |
| `KpiCard` | `value`, `label`, `trend` | Métricas numéricas |
| `MockupFrame` | `src`, `alt` | Frame de screenshot/mockup |
| `PillarCard` | `title`, `description`, `icon` | Pilares estratégicos |
| `ProductCard` | `name`, `description`, `status`, `badge` | Card de produto no grid |
| `SlideNav` | (automático) | Dots de navegação lateral |

---

## Exemplos de interação

### Exemplo M1 — Edição simples
```
Usuário: "muda o título do slide do Delphos pra só 'Delphos'"
Claude:
  [lê s05-delphos.yaml]
  📄 s05 — Delphos (SlideProductDetail)
     title: "Delphos — Hub de Processamento e Integração de Dados" → "Delphos"
  ✅ Edição simples — aplicado.
```

### Exemplo M1 — Edição estrutural
```
Usuário: "adiciona um bloco 'Impacto' no slide do SIPP com métricas"
Claude:
  [lê s04-sipp.yaml]
  📄 s04 — SIPP (SlideProductDetail)
  Plano:
    • ADICIONAR content_block: { label: "Impacto", text: "[métricas de impacto]" }
    • Posição: após "Solução" (último bloco)
  ⚠️ Edição estrutural (novo campo). Confirma?
```

### Exemplo M2 — Explorar layouts
```
Usuário: "me mostra como ficaria um slide de produto sem mockup"
Claude:
  [identifica: variação detail-full]
  Wireframe: [ASCII]
  Mini-preview: [HTML com blocos coloridos]
  "Essa variação usa 2 colunas de content blocks em vez de mockup.
   Funciona pra ti? Quer ajustar algo?"
```

### Exemplo M3 via M4 — new-slide delega
```
Usuário invoca: /new-slide capacitação-digital
new-slide:
  → Tema identificado: capacitação digital
  → Delegando escolha de layout para slide-manager...
slide-manager (M2):
  → "Pra um slide sobre capacitação, esses layouts fazem sentido:"
  → [mini-previews de SlideProductDetail, SlideContext, variação detail-metrics]
  → Usuário escolhe detail-metrics
slide-manager (M3):
  → Gera YAML skeleton
  → Refina com usuário
  → Aplica e posiciona
```

### Exemplo M1 — Exclusão
```
Usuário: "exclui o slide do Watchtower"
Claude:
  [identifica: s06-watchtower.yaml]
  [verifica dependências: apenas index.astro]
  🗑️ Excluir slide s06 — Watchtower (SlideProductDetail)
     Conteúdo que será perdido:
       • Título: "Watchtower"
       • Status: Em desenvolvimento
       • Blocos: O que é | Desafio | Solução
       • Mockup: watchtower-painel.png
     Arquivos afetados:
       • REMOVER: src/content/slides/s06-watchtower.yaml
       • EDITAR: src/pages/index.astro (remover referência)
     ⚠️ Essa ação não pode ser desfeita pela skill. Confirma?
Usuário: "confirma"
Claude:
  ✅ Slide s06-watchtower removido.
     ⚠️ Assets potencialmente órfãos: watchtower-painel.png
```

### Exemplo M5 — Nova apresentação
```
Usuário: "quero fazer uma apresentação nova, foco em resultados do primeiro semestre"
Claude:
  📦 Arquivando apresentação atual em _archive/2026-03-22/
     7 slides salvos.
     Prosseguir com a limpeza? (s/n)
Usuário: "s"
Claude:
  ✅ Slides limpos. Stack intacta.
  Nova apresentação — Briefing:
    1. Tema: Resultados do 1º semestre ✓
    2. Audiência principal?
    3. Quantos slides?
    4. Tem conteúdo pronto?
Usuário: "pra secretários, uns 6 slides, tenho os números"
Claude:
  Proposta de estrutura (6 slides):
    s01 — Capa (SlideHero)
    s02 — Contexto do semestre (SlideContext)
    s03 — Destaques (SlideOverviewGrid variação grid-featured)
    s04 — SIPP em números (SlideProductDetail variação detail-metrics)
    s05 — Delphos em números (SlideProductDetail variação detail-metrics)
    s06 — Próximos passos (SlideClosing variação closing-next-steps)
  Funciona? Quer ajustar?
```
