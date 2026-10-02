import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { DataTableColumnHeader } from "@/components/data-table/DataTableColHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Trade = {
  id: number;
  symbol: number;
  trade: "buy" | "sell";
  accountId: number;
  openPrice: number;
  swap: number;
  profit: number;
  stopLoss: number;
  takeProfit: number;
};

export const columns: ColumnDef<Trade>[] = [
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
    accessorKey: "openPrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Open Price" />,
    cell: ({ row }) => {
      const openPrice = parseFloat(row.getValue("openPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(openPrice);

      return formatted;
    },
  },

  {
    accessorKey: "symbol",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Symbol ID" />,
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
    accessorKey: "swap",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Swap" />,
  },
  {
    accessorKey: "profit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Profit" />,
    cell: ({ row }) => {
      const profit = parseFloat(row.getValue("profit"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(profit);

      return formatted;
    },
  },
  {
    accessorKey: "accountId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Account ID" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const trade = row.original;
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
                navigator.clipboard.writeText(trade.id.toString());
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
