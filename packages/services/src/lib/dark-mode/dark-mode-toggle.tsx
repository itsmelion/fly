"use client";
import { type Themes } from "./dark-mode-script";

export function DarkModeToggle() {
  function setTheme(theme: Themes = "system") {
    if (typeof window === "undefined") return;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }

  function toggleTheme() {
    if (typeof window === "undefined") return;
    const isSystem = document.documentElement.dataset.theme === "system";

    if (isSystem) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      return;
    }

    const isDark = document.documentElement.dataset.theme === "dark";
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button onClick={toggleTheme}>
      Toggle theme
    </button>
  );
}
