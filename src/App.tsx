import { Outlet } from "react-router-dom";
import { ThemeSwitcher } from "./componets/darkmode/ThemeSwitcher";
import { FiltersProvider } from "./context/filters";

function App() {
  return (
    <>
      <div className="p-5">
        <header className="pb-4 flex flex-row items-center justify-center gap-12">
          <h1 className="text-4xl font-bold dark:text-slate-50 ">
            Online Shop
          </h1>
          <div>
            <ThemeSwitcher />
          </div>
        </header>
        <FiltersProvider>
          <Outlet />
        </FiltersProvider>
      </div>
    </>
  );
}

export default App;
