"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LoadingIcons from "react-loading-icons"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination"
import { boolean } from "zod"
import { useLocation } from "@/store/use-location"
import { Children } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  onSearch?: (value: string) => void
  dataPage?: any
  dataTotal?: any
  totalPages?: any
  links?: Array<any>
  nextPage: (url:string) => void
  previousPage?: () => void
  children?: React.ReactNode
}

export function CUstomDataTable<TData, TValue>({
  columns,
  data,
  loading,
  onSearch,
  dataPage,
  dataTotal,
  totalPages = 1,
  nextPage,
  previousPage,
  links = [],
  children
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  })
  
  return (
    <>
      <div className="py-4">
        {children}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {
                    loading
                      ? (
                        <div className="flex items-center justify-center py-4">
                          <LoadingIcons.Oval stroke='#4086A7' strokeWidth={5} />
                        </div>
                      )
                      : "No results."
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          { dataPage } of { dataTotal } total row(s) shown.
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Pagination>
            <PaginationContent>
              {
                links?.map((link, index) => {
                  if (index === 0) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationPrevious onClick={() => link.url && nextPage(link.url)} />
                      </PaginationItem>
                    )
                  }

                   if (index !== 0 && index !== links.length - 1) {
                     return (
                         <PaginationItem key={index}>
                           <PaginationLink onClick={() => nextPage(link.url)} isActive={link.active} href="#">{link.label}</PaginationLink>
                         </PaginationItem>
                     )
                   }

                  if (index === links.length - 1) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationNext onClick={() => link.url && nextPage(link.url)} />
                      </PaginationItem>
                    )
                  }
                })
              }
            </PaginationContent>
          </Pagination>
          {/* <Button
            variant="outline"
            size="sm"
            onClick={previousPage}
            disabled={totalPages <= 1 }
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={totalPages <= 1 }
          >
            Next
          </Button> */}
        </div>
      </div>
    </>
  )
}
