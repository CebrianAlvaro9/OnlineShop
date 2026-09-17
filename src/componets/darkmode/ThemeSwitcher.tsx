import { useEffect, useState } from "react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(window.sessionStorage.getItem("darkMode") as string) || false
  );

  const toggleDarkMode = (nextDarkMode: boolean) => {
    setDarkMode(nextDarkMode);
    window.sessionStorage.setItem("darkMode", JSON.stringify(nextDarkMode));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <button
      type="button"
      aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
      title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
      className="theme-toggle"
      onClick={() => toggleDarkMode(!darkMode)}
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
