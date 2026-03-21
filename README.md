# closingast

Lightweight private wardrobe MVP for mobile-first browsing, manual item entry, lightweight Taobao/JD link import, and duplicate-purchase hints.

## Docs

- Spec: `docs/superpowers/specs/2026-03-20-light-wardrobe-design.md`
- Plan: `docs/superpowers/plans/2026-03-20-light-wardrobe-mvp.md`

## Current Scope

- Mobile-first wardrobe gallery
- Manual item creation
- Lightweight link import entry and API fallback
- Duplicate hint scoring
- Item detail page
- Discover page
- Supabase local schema and seed data

## Stack

- Next.js App Router
- TypeScript
- Vitest + Testing Library
- Playwright
- Supabase CLI / local stack

## Local Setup

Install dependencies:

```bash
npm install
```

Start local Supabase:

```bash
supabase start
```

Reset the local database with migrations and seed data:

```bash
supabase db reset
```

Create `.env.local` with your local Supabase values. The project expects:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-key>
SUPABASE_SERVICE_ROLE_KEY=<secret-key>
```

You can get the values from:

```bash
supabase status
```

## Run the App

```bash
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open:

- App: `http://127.0.0.1:3000`
- Supabase Studio: `http://127.0.0.1:54323`

## Verification

Run unit and integration tests:

```bash
npm test
```

Run the Playwright flow locally:

```bash
npm run test:e2e -- tests/e2e/wardrobe.spec.ts
```

Note: Playwright requires a local server process that can bind a port. In restricted sandboxes this may fail even when the project is otherwise healthy.

## Current Implementation Notes

- `lib/items/queries.ts` and `lib/items/mutations.ts` prefer real Supabase access when env vars are present.
- Without env vars, the app falls back to sample data so pages and tests still render.
- The server-side data access currently uses the local secret key for development scaffolding. This should be tightened when full auth flows are finalized.
- Link import currently detects platform and safely falls back to manual mode. It does not yet parse full product metadata from live marketplace pages.

## Useful Commands

```bash
npm test
npm run dev -- --hostname 127.0.0.1 --port 3000
npm run test:e2e -- tests/e2e/wardrobe.spec.ts
supabase start
supabase db reset
supabase status
```
