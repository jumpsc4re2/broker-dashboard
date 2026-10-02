import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type RevenueProps = {
  description: string;
  revenue: string;
  percentage: string;
  growth: string;
  isWin: boolean;
  last?: boolean;
  className?: string;
};

const Revenue = ({ description, revenue, percentage, growth, isWin }: RevenueProps) => {
  const badgeStyle = isWin
    ? "bg-green-100 text-green-900 border-green-100"
    : "bg-red-100 text-red-900 border-red-100";
  return (
    <div className="border transition-all rounded-xl p-3">
      <div className="flex flex-col gap-3 ">
        <p className="opacity-60 text-xl">{description}</p>
        <div className="flex flex-row items-center gap-2">
          <p className="text-2xl xl:text-4xl tracking-tight">{revenue}</p>
          <Badge variant="outline" className={badgeStyle}>
            {percentage}% {isWin ? <ArrowUpRight /> : <ArrowDownRight />}
          </Badge>
        </div>
        <p className="opacity-60 text-xl">
          {isWin ? "+" : "-"}${growth} {isWin ? "Revenue" : "Loss"}
        </p>
      </div>
    </div>
  );
};
export default Revenue;
