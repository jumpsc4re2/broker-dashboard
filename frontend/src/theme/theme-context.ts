import { createContext } from "react";

import type { ColorTheme } from "@/config/color-themes.config";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderState = {
  // dark/light
  theme: Theme;
  setTheme: (theme: Theme) => void;
  // color theme
  colorTheme: ColorTheme;
  setColorTheme: (id: string) => void;
};

export const ThemeProviderContext = createContext<ThemeProviderState | null>(null);
