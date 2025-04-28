"use client";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import ChartUsage from "./chartUsage";
import useFetchApiData from "@/lib/api/getAccountOveral";
import { GcoreAccounts, columns } from "./tableTanstack/columns";
import { DataTable } from "./tableTanstack/data-table";

const TOTAL_BANDWIDTH_GB = 1000; // Fixed total bandwidth in GB

const TableServers = () => {
  const apiKeys = JSON.parse(localStorage.getItem("apiKeys") || "[]");
  const { data, isLoading, error } = useFetchApiData(apiKeys);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data);
  const gcoreDataTable: GcoreAccounts[] =
    data?.map((account) => {
      const cdnSubscription = account.data3[0]?.threshold;
      const currentValue = parseFloat(cdnSubscription?.current_value || "0");
      const remainder = parseFloat(cdnSubscription?.remainder || "0");

      const usedBandwidthGB = currentValue;
      const reminderBandwidthGB = remainder;

      return {
        id: account.data.id.toString(),
        email: account.data.email,
        serverIp:account.originGroupData.sources[0].source,
        cdnStatus: account.data.serviceStatuses.CDN?.status || "N/A",
        usedBandwidthGB,
        reminderBandwidthGB,
        totalBandwidth: TOTAL_BANDWIDTH_GB, // Convert to TB for display
        usagePercentage: parseFloat(cdnSubscription?.consumption),
        cname: account.cdnDetailsData?.results[0].cname, // Already in percentage
      };
    }) || [];

  return (
    <div className="grid gap-4 md:gap-8 xl:grid-cols-2">
      <DataTable columns={columns} data={gcoreDataTable} />
      <ChartUsage data={gcoreDataTable} />
    </div>
  );
};

export default TableServers;
