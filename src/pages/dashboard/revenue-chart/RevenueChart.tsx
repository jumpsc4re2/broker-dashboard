import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", tradingVolume: 222, netDeposits: 150 },
  { date: "2024-04-02", tradingVolume: 97, netDeposits: 180 },
  { date: "2024-04-03", tradingVolume: 167, netDeposits: 120 },
  { date: "2024-04-04", tradingVolume: 242, netDeposits: 260 },
  { date: "2024-04-05", tradingVolume: 373, netDeposits: 290 },
  { date: "2024-04-06", tradingVolume: 301, netDeposits: 340 },
  { date: "2024-04-07", tradingVolume: 245, netDeposits: 180 },
  { date: "2024-04-08", tradingVolume: 409, netDeposits: 320 },
  { date: "2024-04-09", tradingVolume: 59, netDeposits: 110 },
  { date: "2024-04-10", tradingVolume: 261, netDeposits: 190 },
  { date: "2024-04-11", tradingVolume: 327, netDeposits: 350 },
  { date: "2024-04-12", tradingVolume: 292, netDeposits: 210 },
  { date: "2024-04-13", tradingVolume: 342, netDeposits: 380 },
  { date: "2024-04-14", tradingVolume: 137, netDeposits: 220 },
  { date: "2024-04-15", tradingVolume: 120, netDeposits: 170 },
  { date: "2024-04-16", tradingVolume: 138, netDeposits: 190 },
  { date: "2024-04-17", tradingVolume: 446, netDeposits: 360 },
  { date: "2024-04-18", tradingVolume: 364, netDeposits: 410 },
  { date: "2024-04-19", tradingVolume: 243, netDeposits: 180 },
  { date: "2024-04-20", tradingVolume: 89, netDeposits: 150 },
  { date: "2024-04-21", tradingVolume: 137, netDeposits: 200 },
  { date: "2024-04-22", tradingVolume: 224, netDeposits: 170 },
  { date: "2024-04-23", tradingVolume: 138, netDeposits: 230 },
  { date: "2024-04-24", tradingVolume: 387, netDeposits: 290 },
  { date: "2024-04-25", tradingVolume: 215, netDeposits: 250 },
  { date: "2024-04-26", tradingVolume: 75, netDeposits: 130 },
  { date: "2024-04-27", tradingVolume: 383, netDeposits: 420 },
  { date: "2024-04-28", tradingVolume: 122, netDeposits: 180 },
  { date: "2024-04-29", tradingVolume: 315, netDeposits: 240 },
  { date: "2024-04-30", tradingVolume: 454, netDeposits: 380 },
  { date: "2024-05-01", tradingVolume: 165, netDeposits: 220 },
  { date: "2024-05-02", tradingVolume: 293, netDeposits: 310 },
  { date: "2024-05-03", tradingVolume: 247, netDeposits: 190 },
  { date: "2024-05-04", tradingVolume: 385, netDeposits: 420 },
  { date: "2024-05-05", tradingVolume: 481, netDeposits: 390 },
  { date: "2024-05-06", tradingVolume: 498, netDeposits: 520 },
  { date: "2024-05-07", tradingVolume: 388, netDeposits: 300 },
  { date: "2024-05-08", tradingVolume: 149, netDeposits: 210 },
  { date: "2024-05-09", tradingVolume: 227, netDeposits: 180 },
  { date: "2024-05-10", tradingVolume: 293, netDeposits: 330 },
  { date: "2024-05-11", tradingVolume: 335, netDeposits: 270 },
  { date: "2024-05-12", tradingVolume: 197, netDeposits: 240 },
  { date: "2024-05-13", tradingVolume: 197, netDeposits: 160 },
  { date: "2024-05-14", tradingVolume: 448, netDeposits: 490 },
  { date: "2024-05-15", tradingVolume: 473, netDeposits: 380 },
  { date: "2024-05-16", tradingVolume: 338, netDeposits: 400 },
  { date: "2024-05-17", tradingVolume: 499, netDeposits: 420 },
  { date: "2024-05-18", tradingVolume: 315, netDeposits: 350 },
  { date: "2024-05-19", tradingVolume: 235, netDeposits: 180 },
  { date: "2024-05-20", tradingVolume: 177, netDeposits: 230 },
  { date: "2024-05-21", tradingVolume: 82, netDeposits: 140 },
  { date: "2024-05-22", tradingVolume: 81, netDeposits: 120 },
  { date: "2024-05-23", tradingVolume: 252, netDeposits: 290 },
  { date: "2024-05-24", tradingVolume: 294, netDeposits: 220 },
  { date: "2024-05-25", tradingVolume: 201, netDeposits: 250 },
  { date: "2024-05-26", tradingVolume: 213, netDeposits: 170 },
  { date: "2024-05-27", tradingVolume: 420, netDeposits: 460 },
  { date: "2024-05-28", tradingVolume: 233, netDeposits: 190 },
  { date: "2024-05-29", tradingVolume: 78, netDeposits: 130 },
  { date: "2024-05-30", tradingVolume: 340, netDeposits: 280 },
  { date: "2024-05-31", tradingVolume: 178, netDeposits: 230 },
  { date: "2024-06-01", tradingVolume: 178, netDeposits: 200 },
  { date: "2024-06-02", tradingVolume: 470, netDeposits: 410 },
  { date: "2024-06-03", tradingVolume: 103, netDeposits: 160 },
  { date: "2024-06-04", tradingVolume: 439, netDeposits: 380 },
  { date: "2024-06-05", tradingVolume: 88, netDeposits: 140 },
  { date: "2024-06-06", tradingVolume: 294, netDeposits: 250 },
  { date: "2024-06-07", tradingVolume: 323, netDeposits: 370 },
  { date: "2024-06-08", tradingVolume: 385, netDeposits: 320 },
  { date: "2024-06-09", tradingVolume: 438, netDeposits: 480 },
  { date: "2024-06-10", tradingVolume: 155, netDeposits: 200 },
  { date: "2024-06-11", tradingVolume: 92, netDeposits: 150 },
  { date: "2024-06-12", tradingVolume: 492, netDeposits: 420 },
  { date: "2024-06-13", tradingVolume: 81, netDeposits: 130 },
  { date: "2024-06-14", tradingVolume: 426, netDeposits: 380 },
  { date: "2024-06-15", tradingVolume: 307, netDeposits: 350 },
  { date: "2024-06-16", tradingVolume: 371, netDeposits: 310 },
  { date: "2024-06-17", tradingVolume: 475, netDeposits: 520 },
  { date: "2024-06-18", tradingVolume: 107, netDeposits: 170 },
  { date: "2024-06-19", tradingVolume: 341, netDeposits: 290 },
  { date: "2024-06-20", tradingVolume: 408, netDeposits: 450 },
  { date: "2024-06-21", tradingVolume: 169, netDeposits: 210 },
  { date: "2024-06-22", tradingVolume: 317, netDeposits: 270 },
  { date: "2024-06-23", tradingVolume: 480, netDeposits: 530 },
  { date: "2024-06-24", tradingVolume: 132, netDeposits: 180 },
  { date: "2024-06-25", tradingVolume: 141, netDeposits: 190 },
  { date: "2024-06-26", tradingVolume: 434, netDeposits: 380 },
  { date: "2024-06-27", tradingVolume: 448, netDeposits: 490 },
  { date: "2024-06-28", tradingVolume: 149, netDeposits: 200 },
  { date: "2024-06-29", tradingVolume: 103, netDeposits: 160 },
  { date: "2024-06-30", tradingVolume: 446, netDeposits: 400 },
];

const chartConfig = {
  tradingVolume: {
    label: "Trading Volume",
    color: "var(--chart-1)",
  },
  netDeposits: {
    label: "Net Deposits",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function RevenueChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="mt-5">
      <Card className="pt-0">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>Main dashboard</CardTitle>
            <CardDescription>
              Showing trading volume and net deposits for the last 3 months
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-2 pt-4">
          <ChartContainer config={chartConfig} className="aspect-auto h-62.5 w-full">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillTradingVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-tradingVolume)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-tradingVolume)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillNetDeposits" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-netDeposits)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-netDeposits)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="netDeposits"
                type="natural"
                fill="url(#fillNetDeposits)"
                stroke="var(--color-netDeposits)"
                stackId="a"
              />
              <Area
                dataKey="tradingVolume"
                type="natural"
                fill="url(#fillTradingVolume)"
                stroke="var(--color-tradingVolume)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
