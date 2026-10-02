import lightLogo from "@/assets/app-logo.svg";
import darkLogo from "@/assets/app-logo-dark.svg";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/use-theme";

const AppSidebarHeader = () => {
  const { state } = useSidebar();
  const { theme } = useTheme();
  return (
    <SidebarHeader className="flex flex-row items-center">
      <img src={theme === "dark" ? darkLogo : lightLogo} alt="Logo" className="w-9" />
      <SidebarMenu>
        <SidebarMenuItem>
          {state !== "collapsed" && (
            <p className="font-thin text-lg tracking-tighter text-start">Broker Board</p>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
export default AppSidebarHeader;
