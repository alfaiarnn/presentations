# S02 — Visão Geral dos Produtos

## Metadados
- **Seção:** 2 de 7
- **Tipo de slide:** Grid de cards / Overview
- **Layout Figma de referência:** Slide com 4 colunas

---

## Conteúdo

### Título da seção
`Visão Geral dos Produtos`

### Cards (4 produtos)

#### Card 1 — SIPP
- **Nome:** SIPP
- **Nome completo:** Sistema Integrado de Políticas Públicas
- **Descrição:** Integra políticas públicas e dados atualizados entre secretarias e os eixos estratégicos do PDES
- **Status:** ✅ Em operação (testes internos DGEPP)
- **Visual:** ícone de rede/conexão
- **Estado do card:** Ativo — sem loading

#### Card 2 — Watchtower
- **Nome:** Watchtower
- **Nome completo:** SIPP Watchtower
- **Descrição:** Monitoramento em tempo real e alertas automáticos para a equipe técnica do SIPP
- **Status:** ✅ Em operação
- **Visual:** ícone de torre/radar
- **Estado do card:** Ativo — sem loading

#### Card 3 — Delphos
- **Nome:** Delphos
- **Nome completo:** Hub de Dados da GEA
- **Descrição:** Centraliza dados socioeconômicos do estado — IBGE, DATASUS, IPEA
- **Status:** 🔄 Em construção
- **Visual:** ícone de banco de dados
- **Estado do card:** Loading animado — badge "Em desenvolvimento"

#### Card 4 — Novo Portal
- **Nome:** Novo Portal
- **Nome completo:** Portal do Observatório de Dados
- **Descrição:** Vitrine de dados abertos do Estado de Rondônia — acessível, mobile-first, tempo real
- **Status:** 🔄 Em construção
- **Visual:** ícone de globo/portal
- **Estado do card:** Loading animado — badge "Em desenvolvimento"

---

## Notas de design
- Grid 4 colunas desktop / 2 colunas tablet / 1 coluna mobile
- Cards 1 e 2: estilo normal, borda brand-200, sombra shadow-card
- Cards 3 e 4: overlay sutil com animação de skeleton pulse (gray-100) + badge warning
- Badge "Em desenvolvimento": warning-bg (#FFF8E1), warning-text (#F57F17), borda warning-border
- Animação de loading: barra de progresso indeterminada na base do card (brand-500, CSS animation)
- Altura uniforme entre os 4 cards
