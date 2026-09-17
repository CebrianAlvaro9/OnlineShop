# OnlineShop UI Renovation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing React/Vite shop into a polished, responsive “midnight editorial commerce” experience while preserving the existing product API, filters, pagination, theme state, and cart behavior.

**Architecture:** Keep the current component and context boundaries. Add a token-based visual layer in `src/index.css`, then give the app shell, catalog controls, product cards, pagination, theme switcher, and cart modal semantic class contracts so styling is centralized and consistent. Small JSX changes will expose product metadata and accessible controls without changing the data flow.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS 3, React Router, `react-lazy-load-image-component`, Node test runner.

## Global Constraints

- Work directly on `main`; do not create a branch.
- Do not create a commit; all changes remain visible and uncommitted for review.
- Do not add new runtime dependencies.
- Preserve DummyJSON product fetching, category/name/price filters, pagination, theme persistence, and local cart actions.
- Keep the UI usable at approximately 375px, 768px, and 1440px widths.
- Preserve light and dark themes with keyboard-visible focus states.

## File Map

- Modify `src/index.css`: design tokens, global surfaces, responsive layout utilities, card/control states, reduced-motion rules.
- Modify `src/App.tsx`: storefront shell, brand header, cart count, and page-level background structure.
- Modify `src/Pages/HomePage.tsx`: editorial hero, catalog toolbar, and result summary structure.
- Modify `src/componets/home/ProductList.tsx`: loading/empty/result states and catalog grid contract.
- Modify `src/componets/home/ProductItem.tsx`: product card hierarchy, metadata, discount/rating, and accessible add action.
- Modify `src/componets/home/filters/ByCategory.tsx`, `ByName.tsx`, `ByMinPrice.tsx`: labeled controls and shared filter styling.
- Modify `src/componets/home/pagination/Pagination.tsx`, `PaginationNitems.tsx`, `PaginationNpage.tsx`: consistent pagination controls and labels.
- Modify `src/componets/darkmode/ThemeSwitcher.tsx`: semantic button and accessible theme affordance.
- Modify `src/componets/cart/Cart.tsx`, `Modal.tsx`, `CartItem.tsx`, `cart.css`: cart trigger, drawer-like dialog, quantity controls, and empty state.
- Create `tests/ui-contracts.test.mjs`: source-level regression checks for the visual contracts and preserved commerce behavior.

### Task 1: Establish visual regression contracts

**Files:**
- Create: `tests/ui-contracts.test.mjs`

- [ ] **Step 1: Write failing contract tests**

Assert that the source exposes the storefront shell, hero, catalog grid, product metadata, labeled filters, accessible cart dialog, and responsive/reduced-motion tokens. Also assert that the original commerce paths remain present: DummyJSON fetch, filter fields, pagination provider, cart provider, and theme storage.

- [ ] **Step 2: Run the tests and confirm they fail**

Run `node --test tests/ui-contracts.test.mjs`.
Expected: FAIL because the new semantic class and accessibility contracts do not exist yet.

### Task 2: Build the visual foundation and storefront shell

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.tsx`
- Modify: `src/Pages/HomePage.tsx`

- [ ] **Step 1: Add design tokens and shared primitives**

Define light/dark CSS variables for ink, paper, lavender, electric blue, muted surfaces, borders, shadows, radii, and focus rings. Add `.store-shell`, `.store-header`, `.brand-mark`, `.hero-panel`, `.catalog-toolbar`, `.filter-label`, and responsive/reduced-motion rules.

- [ ] **Step 2: Add the editorial shell**

Wrap the app in the new shell, preserve `ThemeSwitcher`, `Cart`, `FiltersProvider`, and `Outlet`, and expose the catalog hero with a short value proposition, live product count area, and scroll target.

- [ ] **Step 3: Run contract tests**

Run `node --test tests/ui-contracts.test.mjs`.
Expected: foundation and shell assertions pass; remaining product/cart assertions may still fail.

### Task 3: Upgrade catalog controls and product cards

**Files:**
- Modify: `src/Pages/HomePage.tsx`
- Modify: `src/componets/home/ProductList.tsx`
- Modify: `src/componets/home/ProductItem.tsx`
- Modify: `src/componets/home/filters/ByCategory.tsx`
- Modify: `src/componets/home/filters/ByName.tsx`
- Modify: `src/componets/home/filters/ByMinPrice.tsx`

- [ ] **Step 1: Expose accessible filter labels and summary text**

Give each input/select a visible or screen-reader label, use consistent field wrappers, and keep existing `setFilters` payloads unchanged.

- [ ] **Step 2: Implement the product card hierarchy**

Keep `LazyLoadImageComponent` and `AddCartButton`, but add category, brand, rating, stock/discount presentation, truncated description, and semantic card classes. The add/remove action remains connected to the current cart context.

- [ ] **Step 3: Add loading, empty, and result count states**

Render a small skeleton grid while the API is loading, an intentional empty state when filters match nothing, and the existing paginated list when products are available.

- [ ] **Step 4: Run contract tests and build**

Run `node --test tests/ui-contracts.test.mjs` and `npm run build`.
Expected: tests pass and Vite emits a production bundle.

### Task 4: Refine pagination, theme, and cart interaction

**Files:**
- Modify: `src/componets/home/pagination/Pagination.tsx`
- Modify: `src/componets/home/pagination/PaginationNitems.tsx`
- Modify: `src/componets/home/pagination/PaginationNpage.tsx`
- Modify: `src/componets/darkmode/ThemeSwitcher.tsx`
- Modify: `src/componets/cart/Cart.tsx`
- Modify: `src/componets/cart/Modal.tsx`
- Modify: `src/componets/cart/CartItem.tsx`
- Modify: `src/componets/cart/cart.css`

- [ ] **Step 1: Make pagination and theme controls keyboard-friendly**

Use real buttons/labels where possible, keep page selection logic intact, and add `aria-current`, disabled states, and focus styling.

- [ ] **Step 2: Make the cart trigger informative**

Compute the item count from the current cart and expose it in the trigger with an accessible label while preserving the existing modal toggle.

- [ ] **Step 3: Restyle the cart as a responsive dialog drawer**

Keep all reducer callbacks unchanged, add dialog semantics, close affordances, quantity controls, subtotal hierarchy, and the existing clear/checkout actions. Add Escape handling only if it does not alter the current cart state.

- [ ] **Step 4: Run the complete regression suite**

Run `node --test tests/ui-contracts.test.mjs`, `npm run lint`, and `npm run build`.
Expected: all tests pass, lint exits cleanly, and the production bundle builds.

### Task 5: Preview and responsive verification

**Files:**
- No additional source files; verify the modified UI in the local Vite preview.

- [ ] **Step 1: Start the development preview**

Run `npm run dev -- --host 127.0.0.1` from the repository root and open `http://127.0.0.1:5173/OnlineShop`.

- [ ] **Step 2: Verify the main interactions visually**

Check product loading, filters, pagination, add/remove cart, cart quantity controls, clear cart, light/dark theme, keyboard focus, and no horizontal overflow.

- [ ] **Step 3: Verify target viewports and reduced motion**

Inspect approximately 375px, 768px, and 1440px widths and confirm the reduced-motion media query removes large transitions.

- [ ] **Step 4: Run final repository checks**

Run `git diff --check`, `git status --short`, and confirm the branch is `main` with no new commit.
