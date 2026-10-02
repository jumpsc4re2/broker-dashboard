import { useContext } from "react";

import { ThemeProviderContext } from "../theme/theme-context";

export const useTheme = () => {
  const ctx = useContext(ThemeProviderContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};
