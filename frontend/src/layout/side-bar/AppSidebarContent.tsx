import {
  Activity,
  Bitcoin,
  ChartCandlestick,
  ChevronDown,
  CircleUserRound,
  DollarSign,
  HandCoins,
  LayoutDashboard,
  MessageSquareMore,
  Settings,
  ShieldUser,
  UserRoundPen,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const AppSidebarContent = () => {
  const location = useLocation();
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: CircleUserRound,
    },
    {
      title: "Positions",
      url: "/positions",
      icon: Bitcoin,
    },
    {
      title: "Trades",
      url: "/trades",
      icon: ChartCandlestick,
    },
    {
      title: "Symbols",
      url: "/symbols",
      icon: HandCoins,
    },
    {
      title: "Currencies",
      url: "/currencies",
      icon: DollarSign,
    },
    {
      title: "Moderators",
      url: "/moderators",
      icon: ShieldUser,
    },
    {
      title: "Activity",
      url: "/activity",
      icon: Activity,
    },
  ];
  const supportItems = [
    {
      title: "Profile",
      url: "/profile",
      icon: UserRoundPen,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageSquareMore,
    },
  ];
  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`${location.pathname === item.url && "bg-sidebar-accent"}`}
                    asChild
                  >
                    <NavLink to={item.url}>
                      <item.icon
                        className={cn(location.pathname === item.url && "text-primary")}
                      />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator className="my-2" />

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger defaultChecked>
                Help
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {supportItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className={`${
                          location.pathname === item.url && "bg-sidebar-accent"
                        }`}
                        asChild
                      >
                        <NavLink to={item.url}>
                          <item.icon
                            className={
                              location.pathname === item.url ? "text-primary" : "black"
                            }
                          />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </>
  );
};

export default AppSidebarContent;
