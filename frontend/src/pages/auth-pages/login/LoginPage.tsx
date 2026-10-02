import AppLogo from "@/assets/app-logo.svg";
import AppLogoDark from "@/assets/app-logo-dark.svg";
import LoginBg from "@/assets/logo-bg.png";
import { useTheme } from "@/hooks/use-theme";

import LoginForm from "./LoginForm";

export default function LoginPage() {
  const { theme } = useTheme();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-md">
              <img src={theme === "dark" ? AppLogoDark : AppLogo} alt="" />
            </div>
            <p className="text-2xl tracking-tighter font-medium">Broker Board</p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src={LoginBg}
          alt="Image"
          className="absolute inset-0 rounded-3xl h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
