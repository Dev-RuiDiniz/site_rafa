# Sprint 0 - Auditoria e Restauracao de Historico

Data: 2026-03-04  
Repositorio auditado: `site_rafa`  
Branch: `main`

## 1) Objetivo

Auditar o estado atual do repositorio, restaurar commits perdidos apos reset forcado e preparar o repositorio com documentacao base da Sprint 0.

## 2) Resumo Executivo

- Foi identificado reset forcado em `origin/main` no dia **2026-03-04 10:25:36 -0300**, movendo a branch para `5c57f78` (`Initial commit`).
- O historico anterior (108 commits) estava recuperavel via reflog local em `fd339b9`.
- A branch local `main` foi restaurada para `fd339b9`.
- Foi detectado um repositorio Git aninhado em `malleti-shr/` (nao rastreado pelo repo raiz), com alteracoes locais.
- Foi criado este documento e adicionada regra no `.gitignore` para evitar commit acidental do repositorio aninhado.

## 3) Evidencias Coletadas

### 3.1 Reset forcado da remota

- Reflog remoto local: `refs/remotes/origin/main@{2026-03-04 10:25:36 -0300}: fetch --all --prune: forced-update`
- Ponta anterior conhecida: `fd339b9`
- Ponta apos reset: `5c57f78` (`Initial commit`)

### 3.2 Historico restaurado

- Commit atual local restaurado: `fd339b9`
- Quantidade de commits na branch restaurada: `108`
- Commit raiz da historia: `68b3c77` (`Initial commit from Create Next App`)

### 3.3 Qualidade de historico (mensagens de commit)

- Alta incidencia de mensagens genericas:
  - `a`: 27 ocorrencias
  - `at`: 18 ocorrencias
- Risco: rastreabilidade baixa para manutencao e auditoria futura.

### 3.4 Estrutura e riscos encontrados

- Repositorio Git aninhado detectado: `malleti-shr/.git`
- Remote do repo aninhado: `https://github.com/WBianchi/malletishr.git`
- Risco: commit acidental como submodulo/gitlink ou inclusao indevida de artefatos.
- Mitigacao aplicada: inclusao de `/malleti-shr/` no `.gitignore` do repo raiz.

### 3.5 Ativos grandes versionados no Git

Exemplos encontrados no historico restaurado:

- `public/Vídeo Home.mp4` - 58,841,661 bytes (~56.12 MB)
- `public/images/site/total_body_1400.jpg` - 11,152,044 bytes
- `public/images/site/Total-Body-362.jpg` - 11,138,347 bytes

Risco: crescimento acelerado do repositorio e custo operacional em clone/fetch.

### 3.6 Validacao tecnica

- Comando executado: `pnpm lint`
- Resultado: falha por dependencias ausentes (`node_modules` nao instalado no repo raiz no momento da auditoria).

## 4) Acoes Executadas Nesta Sprint 0

1. Criado branch de seguranca: `backup/pre-restore-20260304` apontando para `5c57f78`.
2. Restaurado o ponteiro da `main` local para `fd339b9`.
3. Criada pasta `docs/` na raiz com este documento `docs/sprint-0.md`.
4. Atualizado `.gitignore` com a regra `/malleti-shr/`.

## 5) Pendencias Recomendadas para Sprint 1

1. Definir politica de historico (`protected branch`, bloqueio de force push em `main`).
2. Padronizar mensagens de commit (Conventional Commits).
3. Avaliar migracao de binarios grandes para storage externo (ou Git LFS).
4. Rodar pipeline de validacao apos instalar dependencias (`pnpm install`, `pnpm lint`, build).

