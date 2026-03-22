---
name: deploy-check
description: Roda build do Astro localmente e reporta erros antes de push para main
disable-model-invocation: true
---

Execute `npm run build` na raiz do projeto.
Reporte claramente qualquer erro de build.
Se o build passar sem erros, confirme que está pronto para push e sugira o comando: `git push origin main`.
