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
 
export const columns: ColumnDef<any>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coupon Name
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
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
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coupon Type
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-gray-600">{row.getValue("type")}</div>
      )
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      return (
        <div className="text-gray-600">{handleStringToDate(row.getValue("start_date"))}</div>
      )
    },
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      return (
        <div className="text-gray-600">{handleStringToDate(row.getValue("end_date"))}</div>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      return (
        <div className="text-gray-600">{handleStringToDate(row.getValue("created_at"))}</div>
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