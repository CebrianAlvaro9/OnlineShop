import { useEffect, useState } from "react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
export const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <span
      onClick={() => setDarkMode(!darkMode)}
      className="w-9 h-9
              flex items-center justify-center
              rounded-lg bg-default-100  hover:bg-neutral-100  dark:hover:bg-neutral-700 cursor-pointer "
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </span>
  );
};
