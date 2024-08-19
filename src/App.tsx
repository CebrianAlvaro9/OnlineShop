import { Outlet } from "react-router-dom";
import { ThemeSwitcher } from "./componets/darkmode/ThemeSwitcher";

function App() {
  return (
    <>
      <header className="p-5 flex flex-row items-center justify-center gap-12">
        <h1 className="text-4xl font-bold dark:text-slate-50 ">Online Shop</h1>
        <div>
          <ThemeSwitcher />
        </div>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
