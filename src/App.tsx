import { Outlet } from "react-router-dom";
import { ThemeSwitcher } from "./componets/darkmode/ThemeSwitcher";
import { FiltersProvider } from "./context/filters";
import { Cart } from "./componets/cart/Cart";
import { CartProvider } from "./context/cart";

function App() {
  return (
    <>
      <CartProvider>
        <div className="p-5">
          <header className="pb-4 flex flex-row items-center justify-center gap-12 content-center">
            <h1 className="text-4xl font-bold dark:text-slate-50 ">
              Online Shop
            </h1>
            <div>
              <ThemeSwitcher />
            </div>
            <div>
              <Cart />
            </div>
          </header>
          <FiltersProvider>
            <Outlet />
          </FiltersProvider>
        </div>
      </CartProvider>
    </>
  );
}

export default App;
