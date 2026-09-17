import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import test from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const read = (file) => {
  const path = resolve(root, file)
  return existsSync(path) ? readFileSync(path, "utf8") : ""
}

test("the store exposes an editorial shell and responsive visual language", () => {
  const app = read("src/App.tsx")
  const home = read("src/Pages/HomePage.tsx")
  const styles = read("src/index.css")

  assert.match(app, /store-shell/)
  assert.match(app, /store-header/)
  assert.match(home, /hero-panel/)
  assert.match(home, /catalog-toolbar/)
  assert.match(styles, /--color-lavender:/)
  assert.match(styles, /@media \(max-width: 640px\)/)
  assert.match(styles, /prefers-reduced-motion/)
})

test("the cart overlay reserves the full viewport for its vertical drawer", () => {
  const modal = read("src/componets/cart/Modal.tsx")
  const styles = read("src/index.css")

  assert.match(modal, /aria-modal="true"/)
  assert.match(modal, /createPortal\(/)
  assert.match(modal, /document\.body/)
  assert.match(styles, /\.cart-overlay[\s\S]*align-items: stretch/)
  assert.match(styles, /\.cart-overlay[\s\S]*min-height: 100dvh/)
  assert.match(styles, /\.cart-drawer[\s\S]*min-height: 100dvh/)
})

test("catalog cards expose the product hierarchy and accessible filters", () => {
  const product = read("src/componets/home/ProductItem.tsx")
  const list = read("src/componets/home/ProductList.tsx")
  const filters = [
    read("src/componets/home/filters/ByCategory.tsx"),
    read("src/componets/home/filters/ByName.tsx"),
    read("src/componets/home/filters/ByMinPrice.tsx"),
  ].join("\n")

  assert.match(product, /product-card/)
  assert.match(product, /discountPercentage/)
  assert.match(product, /rating/)
  assert.match(product, /availabilityStatus/)
  assert.match(list, /product-grid/)
  assert.match(list, /Loading/)
  assert.match(filters, /htmlFor=/)
  assert.match(filters, /filter-field/)
})

test("theme, pagination, and cart controls retain their commerce paths", () => {
  const theme = read("src/componets/darkmode/ThemeSwitcher.tsx")
  const cart = read("src/componets/cart/Cart.tsx")
  const modal = read("src/componets/cart/Modal.tsx")
  const pagination = read("src/componets/home/pagination/PaginationNpage.tsx")
  const app = read("src/App.tsx")

  assert.match(theme, /aria-label/)
  assert.match(theme, /sessionStorage/)
  assert.match(cart, /cart\.reduce/)
  assert.match(cart, /cart-trigger/)
  assert.match(modal, /role="dialog"/)
  assert.match(modal, /aria-modal="true"/)
  assert.match(pagination, /aria-current/)
  assert.match(app, /CartProvider/)
  assert.match(app, /FiltersProvider/)
})

test("the existing data and interaction sources remain connected", () => {
  const fetchHook = read("src/hooks/useFetchApi.ts")
  const filtersHook = read("src/hooks/useFilters.ts")
  const productList = read("src/componets/home/ProductList.tsx")
  const cart = read("src/context/cart.tsx")

  assert.match(fetchHook, /dummyjson\.com\/products\?limit=200/)
  assert.match(filtersHook, /filters\.category/)
  assert.match(filtersHook, /filters\.price/)
  assert.match(filtersHook, /filters\.name/)
  assert.match(productList, /PaginationProvider|Pagination/)
  assert.match(cart, /addToCart/)
  assert.match(cart, /removeFromCart/)
})
