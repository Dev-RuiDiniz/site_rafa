# RAIZ Interiors Site

Site institucional da RAIZ Interiors com área pública e painel administrativo.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS + Framer Motion
- Prisma + PostgreSQL
- NextAuth (autenticação do painel)

## Setup local

1. Instale dependências:

```bash
pnpm install
```

2. Crie o arquivo de ambiente:

```bash
cp .env.example .env.local
```

3. Preencha as variáveis mínimas:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
APIFY_API_TOKEN="..." # necessário para sincronização automática do Instagram
```

4. Execute em desenvolvimento:

```bash
pnpm dev
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm typecheck
pnpm lint
```

## Endpoints relevantes

- `GET /api/instagram/posts`
  - Retorna posts ativos do Instagram.
  - Faz auto-sync com o banco em janela de intervalo (quando `APIFY_API_TOKEN` está configurado).
- `POST /api/instagram/sync`
  - Força sincronização imediata do Instagram via Apify.

## Atualizações (06/03/2026)

- About / Instagram:
  - Carrossel passou a usar refresh periódico no front e endpoint sem cache.
  - Sincronização automática no backend para manter publicações atualizadas.
- Admin / Services:
  - Corrigido 404 ao editar (links ajustados para rotas existentes em `/admin/pages/services`).
- Admin / Projects:
  - Lista do painel atualizada para refletir os projetos exibidos no site.
  - Corrigidos links de edição para rota existente (`/admin/pages/projects`).

## Documentação adicional

- `docs/checklist-sanity.md`
- `docs/setup-staging.md`
- `docs/sprint-01-fundacao-producao.md`
- `docs/sprint-emergencial-admin-editor.md`
- `docs/sprint-emergencial-ajustes-visuais-src.md`
- `docs/sprint-hotfix-instagram-admin-2026-03-06.md`
