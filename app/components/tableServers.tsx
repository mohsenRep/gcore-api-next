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
interface GcoreData {
  id: string;
  cdnStatus: string;
  usedBandwidth: number;
  reminderBandwidth: number;
}
const TableServers = () => {
  const apiKeys = JSON.parse(localStorage.getItem("apiKeys") || "[]" || "");

  const { data, isLoading, error } = useFetchApiData(apiKeys);
  if (isLoading) {
    return <div>...loading</div>;
  }
  if (error) {
    return <div>...loading</div>;
  }
  const gcoreData: GcoreData = {
    id: "",
    cdnStatus: "",
    usedBandwidth: 0,
    reminderBandwidth: 0,
  };
  const gcoreDataTable: GcoreAccounts[] = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      gcoreData.id = data[i].data.email;
      gcoreData.cdnStatus = data[i].data.serviceStatuses.CDN.status;
      gcoreData.usedBandwidth =
        +data[i].data3[0].threshold.current_value.toFixed(2);
      gcoreData.reminderBandwidth =
        +data[i].data3[0].threshold.remainder.toFixed(2);
      gcoreDataTable.push({ ...gcoreData });
    }
  }

  return (
    <div className="grid gap-4 md:gap-8 xl:grid-cols-2  ">
      <DataTable columns={columns} data={gcoreDataTable} />

      <ChartUsage />
    </div>
  );
};

export default TableServers;
