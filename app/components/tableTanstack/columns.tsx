"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";


export type GcoreAccounts = {
  id: string;
  cdnStatus: string;
  usedBandwidth: number;
  reminderBandwidth: number;
};

export const columns: ColumnDef<GcoreAccounts>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      const formatted = id.substring(0, id.indexOf("@"));

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "cdnStatus",
    header: "CDN Status",
  },
  {
    accessorKey: "usedBandwidth",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Used Bandwidth
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const usedBandwidth: string = row.getValue("usedBandwidth");
        const formatted = usedBandwidth +' GB'
  
        return <div>{formatted}</div>;
      },
  },
  {
    accessorKey: "reminderBandwidth",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Reminder Bandwidth
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const reminderBandwidth: string = row.getValue("reminderBandwidth");
        const formatted = reminderBandwidth +' GB'
  
        return <div>{formatted}</div>;
      },
  },
];
