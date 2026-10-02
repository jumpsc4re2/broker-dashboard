import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";

import AppLayout from "./layout/AppLayout.tsx";
import AuthLayout from "./layout/AuthLayout.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import AccountProfile from "./pages/accounts/account-profile/AccountProfile.tsx";
import AccountsPage from "./pages/accounts/Accounts.tsx";
import ActivityPage from "./pages/activity/ActivityPage.tsx";
import LoginPage from "./pages/auth-pages/login/LoginPage.tsx";
import ChatPage from "./pages/chat/Chat.tsx";
import CurrenciesPage from "./pages/currencies/CurrenciesPage.tsx";
import DashboardPage from "./pages/dashboard/Dashboard.tsx";
import ModeratorsPage from "./pages/moderators/ModeratorsPage.tsx";
import NotFoundPage from "./pages/not-found/NotFound.tsx";
import PositionsPage from "./pages/positions/PositionsPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import SettingsPage from "./pages/settings/SettingsPage.tsx";
import SymbolsPage from "./pages/symbols/SymbolsPage.tsx";
import TradesPage from "./pages/trades/TradesPage.tsx";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "accounts", element: <AccountsPage /> },
          { path: "positions", element: <PositionsPage /> },
          { path: "trades", element: <TradesPage /> },
          { path: "activity", element: <ActivityPage /> },
          { path: "symbols", element: <SymbolsPage /> },
          { path: "currencies", element: <CurrenciesPage /> },
          { path: "moderators", element: <ModeratorsPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "accounts/:id", element: <AccountProfile /> },
          { path: "chat", element: <ChatPage /> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [{ path: "login", element: <LoginPage /> }],
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </StrictMode>
);
