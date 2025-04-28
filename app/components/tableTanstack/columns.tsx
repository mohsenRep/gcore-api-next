"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GcoreAccounts {
  id: string;
  email: string;
  cdnStatus: string;
  usedBandwidthGB: number;
  reminderBandwidthGB: number;
  totalBandwidth: number;
  usagePercentage: number;
  cname: string;
}

export const columns: ColumnDef<GcoreAccounts>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "cname",
    header: "CDN Name",
    cell: ({ row }) => {
      const status = row.getValue("cname");
      return <div className="font-medium text-green-500">{String(status)}</div>;
    },
  },
  {
    accessorKey: "cdnStatus",
    header: "CDN Status",
    cell: ({ row }) => {
      const status = row.getValue("cdnStatus");
      return (
        <div
          className={`font-medium ${
            status === "active" ? "text-green-500" : "text-red-500"
          }`}
        >
          {String(status)}
        </div>
      );
    },
  },
  {
    accessorKey: "serverIp",
    header: "Server Ip",
    cell: ({ row }) => {
      const status = row.getValue("serverIp");
      return <div className="font-medium text-green-500">{String(status).split(":")[0]}</div>;
    },
  },
  {
    accessorKey: "usedBandwidthGB",
    header: "Used (GB)",
    cell: ({ row }) => {
      const value = row.getValue("usedBandwidthGB");
      return `${value} GB`;
    },
  },

  {
    accessorKey: "usagePercentage",
    header: "Usage %",
    cell: ({ row }) => {
      const percentage = row.getValue("usagePercentage");
      return (
        <>
          <div className="font-medium mb-1">{String(percentage)}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </>
      );
    },
  },
];
