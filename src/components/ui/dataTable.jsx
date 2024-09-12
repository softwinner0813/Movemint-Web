"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function DataTable({
  columns,
  data,
  tableClasses,
  headerClasses,
  bodyClasses,
  headerRowClasses,
  theadClasses,
  rowClasses,
  cellClasses,
  rowClickHandler,
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-auto rounded-md">
      <Table className={`${tableClasses}`}>
        <TableHeader className={cn("whitespace-nowrap", headerClasses ?? "")}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className={cn("border-none", headerRowClasses ?? "")}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className={cn(theadClasses)}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className={cn(bodyClasses)}>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  rowClasses,
                  // row.original.hasBid
                  //   ? "outline outline-2 shadow-md shadow-primary -outline-offset-2 outline-primary"
                  //   : ""
                )}
                onClick={() => (rowClickHandler ? rowClickHandler(row) : {})}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn("whitespace-nowrap", cellClasses)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className={cn(rowClasses)}>
              <TableCell
                colSpan={columns.length}
                className={cn("h-24 text-center", cellClasses)}
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
