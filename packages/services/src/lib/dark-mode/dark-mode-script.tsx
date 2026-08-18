export type Themes = "dark" | "light" | "system" | "halloween";
export const themes: Themes[] = ["dark", "light", "system", "halloween"];

export const darkModeInit = `
  (() => {
    const themes = ["dark", "light", "system", "halloween"];
    const stored = localStorage.getItem("theme");

    const theme =
      themes.includes(stored)
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  })();
`;
