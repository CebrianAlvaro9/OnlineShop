import { Outlet } from "react-router-dom";
import { ThemeSwitcher } from "./componets/darkmode/ThemeSwitcher";
import { FiltersProvider } from "./context/filters";
import { Cart } from "./componets/cart/Cart";
import { CartProvider } from "./context/cart";

function App() {
  return (
    <CartProvider>
      <div className="store-shell">
        <header className="store-header" aria-label="Store navigation">
          <a className="brand-link" href="/OnlineShop">
            <span className="brand-mark" aria-hidden="true">
              n/
            </span>
            <span className="brand-copy">
              <strong>Nov Market</strong>
              <span>Everyday, curated</span>
            </span>
          </a>

          <div className="store-header__meta">
            <span className="store-header__note">Curated goods for modern living</span>
            <ThemeSwitcher />
            <Cart />
          </div>
        </header>

        <main className="store-main">
          <FiltersProvider>
            <Outlet />
          </FiltersProvider>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
