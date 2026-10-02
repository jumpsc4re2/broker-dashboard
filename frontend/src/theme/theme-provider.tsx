import { useEffect, useState } from "react";

import { colorThemes, DEFAULT_COLOR_THEME_ID } from "@/config/color-themes.config";

import { type Theme, ThemeProviderContext } from "./theme-context";

const COLOR_THEME_KEY = "vite-color-theme";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const [colorThemeId, setColorThemeId] = useState<string>(
    () => localStorage.getItem(COLOR_THEME_KEY) || DEFAULT_COLOR_THEME_ID
  );

  const colorTheme = colorThemes.find((t) => t.id === colorThemeId) ?? colorThemes[0];
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    const appliedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    root.classList.add(appliedTheme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    const vars = isDark ? colorTheme.cssVars.dark : colorTheme.cssVars.light;

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [colorThemeId, colorTheme, theme]);

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme: (t) => {
          localStorage.setItem(storageKey, t);
          setTheme(t);
        },
        colorTheme,
        setColorTheme: (id) => {
          localStorage.setItem(COLOR_THEME_KEY, id);
          setColorThemeId(id);
        },
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}
