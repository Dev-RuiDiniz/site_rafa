# Sprint 1 - Reorganizacao, Correcao e Execucao dos 2 Sites

Data: 2026-03-04  
Repositorio: `site_rafa`  
Branch: `main`

## 1) Objetivo

Encerrar os dois servidores locais, reorganizar o repositorio para separar os dois sites em pastas nomeadas na raiz, corrigir erros de execucao em ambos e subir novamente em portas separadas.

## 2) Organizacao aplicada na raiz

Estrutura principal criada:

- `apps/site-rafa`
- `apps/site-malleti`
- `docs`
- `archive` (isolamento de estruturas antigas e artefatos de execucao)

Movimentos executados:

- Site que estava na raiz foi movido para `apps/site-rafa`.
- Site que estava em `malleti-shr/` foi movido para `apps/site-malleti`.
- Estruturas legadas e duplicadas foram isoladas em `archive/` para limpeza operacional.

## 3) Correcoes tecnicas aplicadas

### 3.1 Dependencias e runtime

Em ambos os sites:

- Adicionada dependencia `critters` para resolver erro em runtime:
  - `Cannot find module 'critters'`
- Executado `prisma generate` para garantir Prisma Client valido.

### 3.2 Padronizacao de execucao

- `apps/site-rafa/package.json`: nome ajustado para `site-rafa`.
- `apps/site-malleti/package.json`: nome ajustado para `site-malleti`.
- `apps/site-malleti/package.json`: script `dev` ajustado para porta `3004`.

### 3.3 Higiene de repositorio

- `.gitignore` da raiz atualizado para nova estrutura:
  - ignora `apps/*/node_modules`
  - ignora `apps/*/.next`
  - ignora `archive/`
  - ignora `.run-logs/`

## 4) Validacao de execucao local

Execucao validada apos correcoes:

- `http://localhost:3003` -> HTTP `200` (`site-rafa`)
- `http://localhost:3004` -> HTTP `200` (`site-malleti`)

Observacoes registradas em log (nao bloqueantes para subir):

- aviso de deprecacao de `middleware` no Next.js 16
- aviso de `baseline-browser-mapping` desatualizado
- aviso de `images.quality` diferente do valor configurado

## 5) Resultado da Sprint 1

- Dois sites separados e nomeados na raiz.
- Dois sites corrigidos para iniciar localmente.
- Dois sites respondendo com sucesso em portas separadas.
- Base preparada para proxima etapa de padronizacao de scripts e pipeline CI.

