import { Outlet } from "react-router";

import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/theme/theme-provider";

import Header from "./header/Header";
import AppSidebar from "./side-bar/AppSidebar";

export default function AppLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div className="min-w-0 flex-1">
          <Header />
          <Separator />
          <main className="min-w-0 p-6">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
