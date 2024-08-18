"use client";
import { QueryCache } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { promises } from "dns";
import useFetchApiData from "@/lib/api/getAccountOveral";

const chartConfig = {
  bandwidthUsage: {
    label: "BandwidthUsage",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

const ChartUsage = () => {
  const apiKeys = JSON.parse(localStorage.getItem("apiKeys") || "[]" || "");
  const { data, isLoading, error } = useFetchApiData(apiKeys);
  if (isLoading) {
    return <div>...loading</div>;
  }
  if (error) {
    return <div>...loading</div>;
  }
  if (data) {
    const dataBar = {
      name: "",
      bandwidthUsage: 0,
    };
    const chartData: any = [];

    for (let i = 0; i < data.length; i++) {
      dataBar.name = data[i].data.email;
      dataBar.bandwidthUsage =
        +data[i].data3[0].threshold.current_value.toFixed(2);
      chartData.push({ ...dataBar });
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Custom Label</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
              <XAxis
                dataKey="bandwidthUsage"
                domain={["dataMin", "dataMax + 100"]}
                type="number"
                hide
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="bandwidthUsage"
                layout="vertical"
                fill="var(--color-bandwidthUsage)"
                radius={4}
              >
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                <LabelList
                  dataKey="bandwidthUsage"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        
      </Card>
    );
  }
};
export default ChartUsage;
