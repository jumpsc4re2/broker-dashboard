import type React from "react";

import { cn } from "@/lib/utils";

type FlexProps = {
  className?: string;
  children: React.ReactNode;
};
const Flex = ({ className, children }: FlexProps) => {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>{children}</div>
  );
};

export default Flex;
