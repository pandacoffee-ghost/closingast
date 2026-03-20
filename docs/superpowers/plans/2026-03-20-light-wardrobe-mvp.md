# Light Wardrobe MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first private wardrobe web app that supports image-first item browsing, manual item entry, lightweight Taobao/JD link import, and simple duplicate hints.

**Architecture:** Create a single Next.js App Router application with Supabase Auth, Postgres, and Storage. Keep the MVP narrow: image-first wardrobe browsing, compact metadata, resilient import flows that always degrade to manual entry, and server-side duplicate hinting via simple rules instead of heavy ML.

**Tech Stack:** Next.js, TypeScript, React, Tailwind CSS, Supabase Auth, Supabase Postgres, Supabase Storage, Vitest, Testing Library, Playwright, Zod

---

## Planned File Structure

### App shell and routes

- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/wardrobe/page.tsx`
- Create: `app/items/new/page.tsx`
- Create: `app/items/[id]/page.tsx`
- Create: `app/discover/page.tsx`
- Create: `app/settings/page.tsx`
- Create: `app/auth/login/page.tsx`

### Shared UI

- Create: `components/navigation/bottom-nav.tsx`
- Create: `components/wardrobe/item-card.tsx`
- Create: `components/wardrobe/item-grid.tsx`
- Create: `components/wardrobe/filter-bar.tsx`
- Create: `components/items/item-form.tsx`
- Create: `components/items/image-picker.tsx`
- Create: `components/items/link-import-panel.tsx`
- Create: `components/items/duplicate-hints.tsx`
- Create: `components/discover/discover-section.tsx`

### Domain and services

- Create: `lib/env.ts`
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/items/schema.ts`
- Create: `lib/items/types.ts`
- Create: `lib/items/queries.ts`
- Create: `lib/items/mutations.ts`
- Create: `lib/items/duplicate-hints.ts`
- Create: `lib/imports/link-parser.ts`
- Create: `lib/imports/platform-detector.ts`

### API routes and server actions

- Create: `app/api/import/route.ts`
- Create: `app/api/items/route.ts`
- Create: `app/api/items/[id]/route.ts`

### Database and fixtures

- Create: `supabase/migrations/20260320_initial_schema.sql`
- Create: `supabase/seed.sql`

### Tests

- Create: `tests/unit/lib/items/schema.test.ts`
- Create: `tests/unit/lib/imports/platform-detector.test.ts`
- Create: `tests/unit/lib/items/duplicate-hints.test.ts`
- Create: `tests/integration/app/api/import/route.test.ts`
- Create: `tests/integration/app/api/items/route.test.ts`
- Create: `tests/e2e/wardrobe.spec.ts`

### Docs and setup

- Create: `README.md`
- Create: `.env.example`
- Create: `.gitignore`

## Task 1: Bootstrap the application skeleton

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `README.md`
- Create: `.gitignore`

- [ ] **Step 1: Write the failing smoke test**

```ts
import { describe, expect, it } from "vitest";

describe("app bootstrap", () => {
  it("loads the root route module", async () => {
    const page = await import("@/app/page");
    expect(page).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/unit/app/bootstrap.test.ts`
Expected: FAIL because project files do not exist yet

- [ ] **Step 3: Scaffold the minimal Next.js app**

Create:
- App Router shell
- Tailwind setup
- Root page that redirects to `/wardrobe`
- README with local setup notes

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/unit/app/bootstrap.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: bootstrap wardrobe app"
```

## Task 2: Define the core wardrobe domain model

**Files:**
- Create: `lib/items/schema.ts`
- Create: `lib/items/types.ts`
- Create: `tests/unit/lib/items/schema.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
it("parses a valid wardrobe item payload", () => {
  expect(() => itemInputSchema.parse({
    title: "米白针织开衫",
    category: "top",
    season: ["spring", "autumn"],
    color: "cream",
    styleTags: ["commute"],
  })).not.toThrow();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/unit/lib/items/schema.test.ts`
Expected: FAIL because schema is missing

- [ ] **Step 3: Write minimal implementation**

Add:
- Zod schema for item input and item record
- Shared TypeScript types
- Narrow enums for category, season, status, source platform

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/unit/lib/items/schema.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/items tests/unit/lib/items
git commit -m "feat: add wardrobe item schema"
```

## Task 3: Create the initial database schema

**Files:**
- Create: `supabase/migrations/20260320_initial_schema.sql`
- Create: `supabase/seed.sql`
- Modify: `.env.example`

- [ ] **Step 1: Write the failing test**

```sql
-- Validate that the migration creates:
-- users profile table
-- items table
-- item_images table
-- duplicate_hints table
```

- [ ] **Step 2: Run schema verification and observe failure**

Run: `supabase db reset`
Expected: FAIL because migration files are missing

- [ ] **Step 3: Write minimal implementation**

Create tables for:
- `profiles`
- `items`
- `item_images`
- `duplicate_hints`

Add:
- foreign keys
- created/updated timestamps
- indexes for `user_id`, `category`, `color`, `season`

- [ ] **Step 4: Run schema verification**

Run: `supabase db reset`
Expected: PASS and seeded sample items available

- [ ] **Step 5: Commit**

```bash
git add supabase .env.example
git commit -m "feat: add initial database schema"
```

## Task 4: Wire Supabase environment and auth shell

**Files:**
- Create: `lib/env.ts`
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `app/auth/login/page.tsx`
- Create: `tests/integration/app/auth/login-page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("renders the login page with mobile-first copy", async () => {
  render(await LoginPage());
  expect(screen.getByText("登录你的衣橱")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/app/auth/login-page.test.tsx`
Expected: FAIL because auth shell is missing

- [ ] **Step 3: Write minimal implementation**

Add:
- environment parsing
- server/client Supabase factories
- a lightweight login page using OTP or magic link

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/integration/app/auth/login-page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/auth lib/env.ts lib/supabase tests/integration/app/auth
git commit -m "feat: add supabase auth shell"
```

## Task 5: Build the wardrobe list page

**Files:**
- Create: `components/navigation/bottom-nav.tsx`
- Create: `components/wardrobe/item-card.tsx`
- Create: `components/wardrobe/item-grid.tsx`
- Create: `components/wardrobe/filter-bar.tsx`
- Create: `app/wardrobe/page.tsx`
- Create: `tests/integration/app/wardrobe-page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("renders wardrobe items as image-first cards", async () => {
  render(await WardrobePage());
  expect(screen.getByText("衣橱")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/app/wardrobe-page.test.tsx`
Expected: FAIL because wardrobe page is missing

- [ ] **Step 3: Write minimal implementation**

Add:
- bottom navigation
- sticky search and filter bar
- two-column item grid
- item card component exposing image, category, color

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/integration/app/wardrobe-page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/wardrobe components/navigation components/wardrobe tests/integration/app/wardrobe-page.test.tsx
git commit -m "feat: add wardrobe gallery page"
```

## Task 6: Implement manual item creation

**Files:**
- Create: `components/items/image-picker.tsx`
- Create: `components/items/item-form.tsx`
- Create: `app/items/new/page.tsx`
- Create: `app/api/items/route.ts`
- Create: `lib/items/mutations.ts`
- Create: `tests/integration/app/api/items/route.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
it("creates an item from a valid manual payload", async () => {
  const response = await POST(buildRequest({
    title: "白色衬衫",
    category: "top",
    color: "white",
  }));
  expect(response.status).toBe(201);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/app/api/items/route.test.ts`
Expected: FAIL because item creation route is missing

- [ ] **Step 3: Write minimal implementation**

Add:
- new item page
- image picker shell
- form submission handler
- item insert mutation
- validation error handling

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/integration/app/api/items/route.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/items app/api/items components/items lib/items/mutations.ts tests/integration/app/api/items/route.test.ts
git commit -m "feat: add manual wardrobe item creation"
```

## Task 7: Add platform link import with safe fallback

**Files:**
- Create: `lib/imports/platform-detector.ts`
- Create: `lib/imports/link-parser.ts`
- Create: `components/items/link-import-panel.tsx`
- Create: `app/api/import/route.ts`
- Create: `tests/unit/lib/imports/platform-detector.test.ts`
- Create: `tests/integration/app/api/import/route.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
it("detects taobao and jd urls", () => {
  expect(detectPlatform("https://item.taobao.com/item.htm?id=1")).toBe("taobao");
  expect(detectPlatform("https://item.jd.com/1.html")).toBe("jd");
});
```

```ts
it("returns manual fallback metadata when parsing fails", async () => {
  const result = await parseProductLink("https://example.com/broken");
  expect(result.mode).toBe("manual");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest tests/unit/lib/imports/platform-detector.test.ts tests/integration/app/api/import/route.test.ts`
Expected: FAIL because import utilities are missing

- [ ] **Step 3: Write minimal implementation**

Add:
- URL platform detection
- parser result contract with `success` and `manual` modes
- import route that never hard-fails on unsupported pages
- UI panel for pasting a link and applying parsed fields

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest tests/unit/lib/imports/platform-detector.test.ts tests/integration/app/api/import/route.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/imports app/api/import components/items/link-import-panel.tsx tests/unit/lib/imports tests/integration/app/api/import
git commit -m "feat: add lightweight link import"
```

## Task 8: Implement duplicate hinting

**Files:**
- Create: `lib/items/duplicate-hints.ts`
- Create: `components/items/duplicate-hints.tsx`
- Modify: `app/items/new/page.tsx`
- Modify: `app/items/[id]/page.tsx`
- Create: `tests/unit/lib/items/duplicate-hints.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
it("scores similar items higher when category and color match", () => {
  const hints = rankDuplicateHints(candidate, existingItems);
  expect(hints[0].score).toBeGreaterThan(hints[1].score);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/unit/lib/items/duplicate-hints.test.ts`
Expected: FAIL because duplicate hinting logic is missing

- [ ] **Step 3: Write minimal implementation**

Add:
- score rules for category, color, keyword overlap
- top-N duplicate hints
- display component for creation and detail flows

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/unit/lib/items/duplicate-hints.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/items/duplicate-hints.ts components/items/duplicate-hints.tsx app/items/new/page.tsx app/items/[id]/page.tsx tests/unit/lib/items/duplicate-hints.test.ts
git commit -m "feat: add duplicate item hints"
```

## Task 9: Build the item detail and discover flows

**Files:**
- Create: `app/items/[id]/page.tsx`
- Create: `app/discover/page.tsx`
- Create: `components/discover/discover-section.tsx`
- Create: `lib/items/queries.ts`
- Create: `tests/integration/app/item-detail-page.test.tsx`
- Create: `tests/integration/app/discover-page.test.tsx`

- [ ] **Step 1: Write the failing tests**

```tsx
it("shows item details with source metadata", async () => {
  render(await ItemDetailPage({ params: { id: "1" } }));
  expect(screen.getByText("来源")).toBeInTheDocument();
});
```

```tsx
it("renders discover collections for recent and possible duplicates", async () => {
  render(await DiscoverPage());
  expect(screen.getByText("可能重复")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest tests/integration/app/item-detail-page.test.tsx tests/integration/app/discover-page.test.tsx`
Expected: FAIL because detail and discover pages are missing

- [ ] **Step 3: Write minimal implementation**

Add:
- item detail route
- discover page sections
- query helpers for recent items and duplicate candidates

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest tests/integration/app/item-detail-page.test.tsx tests/integration/app/discover-page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/items/[id] app/discover components/discover lib/items/queries.ts tests/integration/app/item-detail-page.test.tsx tests/integration/app/discover-page.test.tsx
git commit -m "feat: add item detail and discover flows"
```

## Task 10: Add end-to-end verification and polish

**Files:**
- Create: `tests/e2e/wardrobe.spec.ts`
- Modify: `README.md`
- Modify: `package.json`

- [ ] **Step 1: Write the failing end-to-end test**

```ts
test("user can add an item and see it in the wardrobe", async ({ page }) => {
  await page.goto("/items/new");
  await page.getByLabel("标题").fill("黑色风衣");
  await page.getByRole("button", { name: "保存" }).click();
  await expect(page.getByText("黑色风衣")).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm playwright test tests/e2e/wardrobe.spec.ts`
Expected: FAIL until the full flow is wired

- [ ] **Step 3: Write minimal implementation and polish**

Add:
- stable labels and test ids where needed
- loading and empty states
- final README setup and deployment notes

- [ ] **Step 4: Run full verification**

Run: `pnpm vitest`
Expected: PASS

Run: `pnpm playwright test`
Expected: PASS

Run: `pnpm lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/e2e README.md package.json
git commit -m "test: add end-to-end verification and polish"
```

## Notes for Execution

- Keep the MVP image-first. Do not add analytics dashboards or heavy inventory fields unless the spec changes.
- Treat link import as best-effort parsing. The product must remain usable when import fails.
- Keep duplicate hints advisory only. Never block save operations.
- Prefer server-side data access for authenticated item reads and writes.
- Use seed data early so UI work does not block on import and auth completion.
