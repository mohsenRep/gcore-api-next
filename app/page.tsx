"use client";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFetchApiData from "@/lib/api/getAccountOveral";

import TableServers from "./components/tableServers";
export default function Home() {
  const apiKeys = JSON.parse(localStorage.getItem("apiKeys") || "[]" || "");
  if (!apiKeys) {
    return <div>there in no api keys. add apikeys</div>;
  }
  const { data, isLoading, error } = useFetchApiData(apiKeys);
  if (isLoading) {
    return <div>...loading</div>;
  }
  if (error) {
    return <div>...loading</div>;
  }
  const initialValue = 0;
  const totalUsage = data
    ?.map((data) => +data.data3[0].threshold.current_value.toFixed(2))
    .reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      initialValue
    );
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log("totalUsage: " + totalUsage?.toFixed(2));
  return (
    <main className="flex flex-1 flex-col  gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2  md:gap-8 xl:grid-cols-4">
        <Card className="xl:col-start-2" x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Used Bandwidth
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalUsage?.toFixed(2)} GB
            </div>
            <p className="text-xs text-muted-foreground">
              {monthNames[new Date().getMonth()]} month
            </p>
          </CardContent>
        </Card>
        <Card className="xl:col-start-3" x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gcore Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.length}</div>
          </CardContent>
        </Card>
        
      </div>
      <TableServers />
    </main>
  );
}
