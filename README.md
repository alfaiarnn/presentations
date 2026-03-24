# SEPOG: Produtos Estratégicos — Apresentação Institucional

[![Deploy to GitHub Pages](https://github.com/alfaiarnn/caso-clinico-dra-gabrielle/actions/workflows/deploy.yml/badge.svg)](https://alfaiarnn.github.io/presentations/)

Landing page performática e interativa para apresentação dos produtos estratégicos da **SEPOG/DGEPP/GEA** (Governo de Rondônia). Desenvolvida para ser apresentada em auditórios, com foco em legibilidade, animações fluidas baseadas em scroll e design institucional moderno.

🚀 **Acesse a apresentação:** [https://alfaiarnn.github.io/presentations/](https://alfaiarnn.github.io/presentations/)

---

## 🛠️ Stack Tecnológica

- **Astro 4.16+**: Framework principal para geração de site estático (SSG), permitindo componentes isolados e carregamento otimizado.
- **GSAP 3.12+ (ScrollTrigger)**: Engine de animações responsável pelos efeitos de entrada, parallax e transições baseadas no scroll do usuário.
- **Vanilla CSS**: Sistema de design puro utilizando *Custom Properties* para tokens de cores, tipografia e espaçamento.
- **Zod**: Validação rigorosa do conteúdo dos slides via Astro Content Collections.

## 📁 Estrutura do Projeto

```text
## 📁 Estrutura do Projeto

```text
├── docs/                   # Documentação do projeto
│   ├── design-system/      # Guia de estilos e tokens visuais
│   ├── slides/             # Planejamento individual de cada slide
│   └── legacy/             # Arquivos da versão estática original
├── src/
│   ├── components/         # Componentes UI (Cards, Badges, Nav)
│   ├── content/
│   │   └── slides/         # Arquivos YAML com o conteúdo real
│   ├── layouts/            # Templates estruturais de cada tipo de slide
│   ├── scripts/            # Lógica de animações (GSAP)
│   └── styles/             # CSS Global e Design System
└── astro.config.mjs        # Configurações do Astro e Base Path
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v20 ou superior)
- npm

### Instalação

```bash
npm install
```

### Desenvolvimento

Inicie o servidor local com hot-reload:

```bash
npm run dev
```

Acesse em `http://localhost:4321/presentations/`

### Build para Produção

Gera os arquivos estáticos na pasta `dist/`:

```bash
npm run build
```

---

## 🎨 Design System

A apresentação segue uma identidade visual que equilibra a sobriedade institucional com a modernidade de produtos digitais:

- **Tipografia:** DM Sans para legibilidade e JetBrains Mono para elementos de dados.
- **Cores:** Paleta baseada no verde institucional (Brand-500: #4CAF4F) com variações de profundidade para temas claros e escuros.
- **UX:** Otimizada para projeção em auditórios, com textos amplos e alto contraste.

---

## 📖 Documentação Adicional


Para detalhes técnicos sobre convenções de código e fluxo de trabalho, consulte o arquivo [CLAUDE.md](./CLAUDE.md).

---
**SEPOG — DGEPP/GEA**  
*Governo do Estado de Rondônia*
