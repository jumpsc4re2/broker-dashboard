import { Outlet } from "react-router-dom";

import { ThemeProvider } from "@/theme/theme-provider";

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
}
