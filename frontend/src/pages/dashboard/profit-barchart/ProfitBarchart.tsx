import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartData = [
  { date: "2024-04-01", system: 22200, company: 15000 },
  { date: "2024-04-02", system: 9700, company: 18000 },
  { date: "2024-04-03", system: 16700, company: 12000 },
  { date: "2024-04-04", system: 24200, company: 26000 },
  { date: "2024-04-05", system: 37300, company: 29000 },
  { date: "2024-04-06", system: 30100, company: 34000 },
  { date: "2024-04-07", system: 24500, company: 18000 },
  { date: "2024-04-08", system: 40900, company: 32000 },
  { date: "2024-04-09", system: 5900, company: 11000 },
  { date: "2024-04-10", system: 26100, company: 19000 },
  { date: "2024-04-11", system: 32700, company: 35000 },
  { date: "2024-04-12", system: 29200, company: 21000 },
  { date: "2024-04-13", system: 34200, company: 38000 },
  { date: "2024-04-14", system: 13700, company: 22000 },
  { date: "2024-04-15", system: 12000, company: 17000 },
  { date: "2024-04-16", system: 13800, company: 19000 },
  { date: "2024-04-17", system: 44600, company: 36000 },
  { date: "2024-04-18", system: 36400, company: 41000 },
  { date: "2024-04-19", system: 24300, company: 18000 },
  { date: "2024-04-20", system: 8900, company: 15000 },
  { date: "2024-04-21", system: 13700, company: 20000 },
  { date: "2024-04-22", system: 22400, company: 17000 },
  { date: "2024-04-23", system: 13800, company: 23000 },
  { date: "2024-04-24", system: 38700, company: 29000 },
  { date: "2024-04-25", system: 21500, company: 25000 },
  { date: "2024-04-26", system: 7500, company: 13000 },
  { date: "2024-04-27", system: 38300, company: 42000 },
  { date: "2024-04-28", system: 12200, company: 18000 },
  { date: "2024-04-29", system: 31500, company: 24000 },
  { date: "2024-04-30", system: 45400, company: 38000 },
  { date: "2024-05-01", system: 16500, company: 22000 },
  { date: "2024-05-02", system: 29300, company: 31000 },
  { date: "2024-05-03", system: 24700, company: 19000 },
  { date: "2024-05-04", system: 38500, company: 42000 },
  { date: "2024-05-05", system: 48100, company: 39000 },
  { date: "2024-05-06", system: 49800, company: 52000 },
  { date: "2024-05-07", system: 38800, company: 30000 },
  { date: "2024-05-08", system: 14900, company: 21000 },
  { date: "2024-05-09", system: 22700, company: 18000 },
  { date: "2024-05-10", system: 29300, company: 33000 },
  { date: "2024-05-11", system: 33500, company: 27000 },
  { date: "2024-05-12", system: 19700, company: 24000 },
  { date: "2024-05-13", system: 19700, company: 16000 },
  { date: "2024-05-14", system: 44800, company: 49000 },
  { date: "2024-05-15", system: 47300, company: 38000 },
  { date: "2024-05-16", system: 33800, company: 40000 },
  { date: "2024-05-17", system: 49900, company: 42000 },
  { date: "2024-05-18", system: 31500, company: 35000 },
  { date: "2024-05-19", system: 23500, company: 18000 },
  { date: "2024-05-20", system: 17700, company: 23000 },
  { date: "2024-05-21", system: 8200, company: 14000 },
  { date: "2024-05-22", system: 8100, company: 12000 },
  { date: "2024-05-23", system: 25200, company: 29000 },
  { date: "2024-05-24", system: 29400, company: 22000 },
  { date: "2024-05-25", system: 20100, company: 25000 },
  { date: "2024-05-26", system: 21300, company: 17000 },
  { date: "2024-05-27", system: 42000, company: 46000 },
  { date: "2024-05-28", system: 23300, company: 19000 },
  { date: "2024-05-29", system: 7800, company: 13000 },
  { date: "2024-05-30", system: 34000, company: 28000 },
  { date: "2024-05-31", system: 17800, company: 23000 },
  { date: "2024-06-01", system: 17800, company: 20000 },
  { date: "2024-06-02", system: 47000, company: 41000 },
  { date: "2024-06-03", system: 10300, company: 16000 },
  { date: "2024-06-04", system: 43900, company: 38000 },
  { date: "2024-06-05", system: 8800, company: 14000 },
  { date: "2024-06-06", system: 29400, company: 25000 },
  { date: "2024-06-07", system: 32300, company: 37000 },
  { date: "2024-06-08", system: 38500, company: 32000 },
  { date: "2024-06-09", system: 43800, company: 48000 },
  { date: "2024-06-10", system: 15500, company: 20000 },
  { date: "2024-06-11", system: 9200, company: 15000 },
  { date: "2024-06-12", system: 49200, company: 42000 },
  { date: "2024-06-13", system: 8100, company: 13000 },
  { date: "2024-06-14", system: 42600, company: 38000 },
  { date: "2024-06-15", system: 30700, company: 35000 },
  { date: "2024-06-16", system: 37100, company: 31000 },
  { date: "2024-06-17", system: 47500, company: 52000 },
  { date: "2024-06-18", system: 10700, company: 17000 },
  { date: "2024-06-19", system: 34100, company: 29000 },
  { date: "2024-06-20", system: 40800, company: 45000 },
  { date: "2024-06-21", system: 16900, company: 21000 },
  { date: "2024-06-22", system: 31700, company: 27000 },
  { date: "2024-06-23", system: 48000, company: 53000 },
  { date: "2024-06-24", system: 13200, company: 18000 },
  { date: "2024-06-25", system: 14100, company: 19000 },
  { date: "2024-06-26", system: 43400, company: 38000 },
  { date: "2024-06-27", system: 44800, company: 49000 },
  { date: "2024-06-28", system: 14900, company: 20000 },
  { date: "2024-06-29", system: 10300, company: 16000 },
  { date: "2024-06-30", system: 44600, company: 40000 },
];

const chartConfig = {
  views: {
    label: "Profit",
  },
  system: {
    label: "System",
    color: "var(--chart-2)",
  },
  company: {
    label: "Company",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ProfitBarchart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("system");

  const total = React.useMemo(
    () => ({
      system: chartData.reduce((acc, curr) => acc + curr.system, 0),
      company: chartData.reduce((acc, curr) => acc + curr.company, 0),
    }),
    []
  );

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Total Company Profit</CardTitle>
          <CardDescription>Showing total profit for the last 3 months</CardDescription>
        </div>
        <div className="flex">
          {["system", "company"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-62.5 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
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
              content={
                <ChartTooltipContent
                  className="w-37.5"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
