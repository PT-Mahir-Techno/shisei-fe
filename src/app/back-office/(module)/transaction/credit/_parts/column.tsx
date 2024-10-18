"use client"
 
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown} from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import ReportActionButton from "@/components/ui/report-action-button"
import PackageActionButton from "@/components/ui/package-action-button"
import { formatDate2, formatedDate } from "@/lib/utils"
import CreditActionButton from "@/components/ui/credit-action-button"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 
export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => (
      <div>
        <div className="lowercase font-semibold">{row.original.user}</div>
        <div className="lowercase text-sm">{row.original.user_email}</div>
        <div className="lowercase text-sm">{row.original.user_phone}</div>
      </div>
    ),
  },
  {
    accessorKey: "membership_name",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Package
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase font-semibold max-w-xs">{row.getValue('membership_name')}</div>,
  },
  {
    accessorKey: "membership_duration",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duration
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase font-semibold max-w-xs">{row.getValue('membership_duration')} days</div>,
  },
  {
    accessorKey: "date_buying",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Buy At
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase font-semibold max-w-xs">{formatDate2(row.getValue('date_buying'))}</div>,
  },
  {
    accessorKey: "date_expired",

    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expired At
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase font-semibold max-w-xs">{formatDate2(row.getValue('date_expired'))}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <CreditActionButton row={row} />  
      )
    },
  }
]