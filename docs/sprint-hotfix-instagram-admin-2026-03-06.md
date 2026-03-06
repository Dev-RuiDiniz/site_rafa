# Hotfix - Instagram + Admin (06/03/2026)

## Contexto

Foram tratados três problemas reportados em produção:

1. Carrossel do Instagram no About não atualizava automaticamente.
2. No painel, em Services, o botão "Editar" levava para 404.
3. No painel, Projects mostrava poucos itens em comparação com o site.

## Correções aplicadas

### 1) Instagram automático no About

- Criado utilitário de sincronização centralizado:
  - `src/lib/instagram-sync.ts`
- `GET /api/instagram/posts` agora:
  - força resposta dinâmica (`force-dynamic`);
  - faz tentativa de auto-sync em janela de 1h;
  - mantém fallback para lista vazia em cenário sem banco/tabela.
- `POST /api/instagram/sync` passou a reutilizar o mesmo utilitário.
- Frontend do carrossel (`src/components/sections/instagram-feed.tsx`) atualizado para:
  - `fetch` com `cache: "no-store"`;
  - refresh periódico a cada 5 minutos.

### 2) 404 no Editar de Services

- Ajustados links do admin para rota existente:
  - de `/admin/services/:id` para `/admin/pages/services`.
- Botão principal da página também ajustado para evitar rota inexistente.

Arquivo:
- `src/app/admin/services/page.tsx`

### 3) Divergência de Projects entre painel e site

- Lista do admin atualizada com os projetos exibidos no site.
- Ajustados links de edição para rota existente:
  - de `/admin/projects/:id` para `/admin/pages/projects`.

Arquivo:
- `src/app/admin/projects/page.tsx`

## Validação executada

- `pnpm typecheck` -> OK
- `pnpm lint` -> OK (apenas warnings legados já existentes)
- `pnpm eslint` nos arquivos alterados -> OK

## Observações operacionais

- Para sincronização automática do Instagram funcionar:
  - `APIFY_API_TOKEN` precisa estar configurado no ambiente.
- Sem token, a API continua respondendo e o carrossel usa fallback visual local.
