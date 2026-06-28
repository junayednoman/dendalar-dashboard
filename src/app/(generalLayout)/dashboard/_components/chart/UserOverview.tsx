"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { userTypeOptions, yearOptions } from "@/data/global.data";
import { AFilterSelect } from "@/components/form/AFilterSelect";

const chartData = [
  { month: "5", value: 10 },
  { month: "10", value: 20 },
  { month: "15", value: 35 },
  { month: "20", value: 45 },
  { month: "25", value: 40 },
  { month: "30", value: 60 },
];

const chartConfig = {
  value: {
    label: "Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function UserOverview() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());

  const [userType, setUserType] = useState<string>("all");

  const minValue = Math.min(...chartData.map((item) => item.value));
  const maxValue = Math.max(...chartData.map((item) => item.value));
  const yAxisDomain = [Math.floor(maxValue), Math.floor(minValue)];
  console.log("year", year);

  return (
    <div className="bg-card rounded-xl p-6 px-8 mt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">
          User Overview
        </h1>
        <div className="flex items-center gap-4">
          <AFilterSelect
            onChange={setUserType}
            placeholder={"user type"}
            value={userType}
            options={userTypeOptions}
            className="!w-[110px]"
          />
          <AFilterSelect
            onChange={setYear}
            placeholder={currentYear.toString()}
            value={year}
            options={yearOptions}
            className="!w-[90px]"
          />
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-[320px] w-full mt-12">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            domain={yAxisDomain}
            stroke="#636566"
            tickLine={false}
            axisLine={false}
            tickMargin={20}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value) => (
                  <div className="flex items-center justify-between w-full">
                    <p className="text-muted-foreground font-medium">Users: </p>
                    <p>${value}</p>
                  </div>
                )}
              />
            }
          />
          <defs>
            <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-value)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-value)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="value"
            type="monotone"
            fill="url(#fillUsers)"
            fillOpacity={0.6}
            stroke="var(--color-value)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
