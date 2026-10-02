import { type Table } from "@tanstack/react-table";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { TableCell, TableFooter, TableRow } from "@/components/ui/table";

import { Button } from "../ui/button";

interface DataTableFooterProps<TData> {
  table: Table<TData>;
}
const DataTableFooter = <TData,>({ table }: DataTableFooterProps<TData>) => {
  return (
    <>
      <TableFooter className="w-full">
        <TableRow>
          <TableCell colSpan={table.getAllLeafColumns().length}>
            <div className="flex items-center gap-2 py-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ArrowLeft />
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
                <ArrowRight />
              </Button>

              <div className="text-muted-foreground text-sm">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="text-muted-foreground ml-auto text-sm">
                Total rows: {table.getFilteredRowModel().rows.length}
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </>
  );
};

export default DataTableFooter;
