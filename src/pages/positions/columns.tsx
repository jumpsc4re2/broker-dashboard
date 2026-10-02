import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { DataTableColumnHeader } from "@/components/data-table/DataTableColHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Position = {
  id: number;
  accountId: number;
  symbol: string;
  type: string;
  openPrice: number;
  stopLoss: number;
  takeProfit: number;
  volume: number;
  createdAt: string;
  currentPrice?: number;
  pnl?: number;
};

export const columns: ColumnDef<Position>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: "accountId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Account ID" />,
  },
  {
    accessorKey: "openPrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Open Price" />,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("openPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return formatted;
    },
  },
  {
    accessorKey: "symbol",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Symbol" />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const positionType = row.getValue("type");
      return (
        <>
          <Badge
            className={
              positionType === "buy"
                ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
            }
          >
            {row.getValue("type")}
          </Badge>
        </>
      );
    },
  },
  {
    accessorKey: "stopLoss",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stop Loss" />,
  },
  {
    accessorKey: "takeProfit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Take Profit" />,
  },
  {
    accessorKey: "volume",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Volume" />,
  },
  {
    accessorKey: "currentPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Current Price" />
    ),
  },
  {
    accessorKey: "pnl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profit & Loss" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const position = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(position.id.toString());
                toast.success("ID Copied Successfully!");
              }}
            >
              Copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
