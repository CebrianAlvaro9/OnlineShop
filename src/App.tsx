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
          <header className="pb-4 flex flex-row  items-center justify-center gap-2 md:gap-12 content-center">
            {/* <h1 className="text-4xl font-bold dark:text-slate-50 ">
              Nova Store
            </h1> */}

            <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
              Nov
              <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
                Market
              </span>
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
