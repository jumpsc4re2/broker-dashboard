import { TrendingUp } from "lucide-react";
import { useId } from "react";
import { CartesianGrid, Dot, Line, LineChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with dots and colors";
const chartData = [
  { period: "Jan", amount: 275000, fill: "var(--chart-1)" },
  { period: "Feb", amount: 320000, fill: "var(--chart-2)" },
  { period: "Mar", amount: 287000, fill: "var(--chart-4)" },
  { period: "Apr", amount: 260000, fill: "var(--chart-3)" },
  { period: "May", amount: 340000, fill: "var(--chart-2)" },
  { period: "Jun", amount: 390000, fill: "var(--chart-1)" },
];
// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--chart-2)",
  },
  jan: {
    label: "January",
    color: "var(--chart-1)",
  },
  feb: {
    label: "February",
    color: "var(--chart-2)",
  },
  mar: {
    label: "March",
    color: "var(--chart-3)",
  },
  apr: {
    label: "April",
    color: "var(--chart-4)",
  },
  may: {
    label: "May",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function NetDepositChart() {
  const id = useId();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly net deposits performance</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent indicator="line" nameKey="amount" hideLabel />
              }
            />
            <Line
              dataKey="amount"
              type="natural"
              stroke="var(--color-amount)"
              strokeWidth={2}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={`dot-${id}-${props.cx}-${props.cy}`}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={payload.fill}
                    stroke={payload.fill}
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total amounts for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
