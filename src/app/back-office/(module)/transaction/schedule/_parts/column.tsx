"use client"
 
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown} from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import ReportActionButton from "@/components/ui/report-action-button"
import PackageActionButton from "@/components/ui/package-action-button"
 
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
    accessorKey: "package_name",
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
    cell: ({ row }) => <div className="lowercase font-semibold max-w-xs">{row.getValue('package_name')}</div>,
  },
  {
    accessorKey: "package_date",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase font-semibold max-w-xs">{row.getValue('package_date')}</div>,
  },
  {
    accessorKey: "staff",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Staff
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase font-semibold max-w-xs">{row.getValue('staff')}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase font-semibold max-w-xs">{row.getValue('location')}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => {
      if (row.getValue("status") === "booked") {
        return <div className="text-green-600 flex items-center gap-1"><RiVerifiedBadgeFill size={18} /> Booked</div>
      } else {
        return <div className="text-red-600 flex items-center gap-1"><RiVerifiedBadgeFill size={18} /> Cancel</div>
      }
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <PackageActionButton row={row} />  
      )
    },
  },
]