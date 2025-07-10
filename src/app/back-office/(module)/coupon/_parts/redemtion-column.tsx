"use client"
 
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, Divide, MoreHorizontal } from "lucide-react"
import { useSheet } from "@/store/use-sheet"
import { ColumnDef } from "@tanstack/react-table"
import ActionButton from "@/components/ui/action-button"
import { handleStringToDate, numberToIdr } from "@/lib/utils"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 
export const redemtionColumn: ColumnDef<any>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "discount",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Discount
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => {
      if (row.original.type_discount == "percent"){
        return (
          <div className="text-gray-600">{row.getValue("discount")} %</div>
        )
      }
      return (
        <div className="text-gray-600">{numberToIdr(row.getValue("discount"))}</div>
      )
    },
  },
  {
    accessorKey: "type_discount",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Discount Type
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-gray-600">{row.getValue("type_discount")}</div>
      )
    },
  },
  {
    accessorKey: "kuota",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Coupon
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-gray-600">{row.getValue("kuota")}</div>
      )
    },
  },
  {
    accessorKey: "total_used",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Used
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-gray-600">{row.getValue("total_used")}</div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <ActionButton model={row.original} isEdit={false} editLink={`${'/back-office/coupon/create/'}${row.original.id}`}  actionFor="coupon"/>  
      )
    },
  },
]