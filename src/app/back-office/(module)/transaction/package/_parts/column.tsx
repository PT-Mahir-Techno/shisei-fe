"use client"
 
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { handleStringToDate, numberToIdr } from "@/lib/utils"
import { ArrowUpDown, MoreHorizontal} from "lucide-react"
import ActionButton from "@/components/ui/action-button"
import { FaqType } from "@/types/faq-type"
import { RiBox2Fill, RiCalendarCheckFill, RiClipboardFill, RiEdit2Fill, RiLeafFill, RiVerifiedBadgeFill } from "react-icons/ri"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { PaymentType } from "@/types/payment-type"
import Image from "next/image"
import { useModal } from "@/store/use-modal"
import { useSheet } from "@/store/use-sheet"
import ReportActionButton from "@/components/ui/report-action-button"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 
export const columns: ColumnDef<PaymentType>[] = [
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
    accessorFn: (row) => row.user.name,
    header: 'Customer',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div>
            <Image
              src={row.original.user.photo_url ?? "/img/img_placeholder.png"}
              alt={row.original.user.name}
              width={50}
              height={50}
              className="rounded-full w-14 h-14"
            />
          </div>
          <div>
            <p className="text-gray-600 font-bold">{row.original.user.name}</p>
            <p className="text-gray-500">{row.original.user.email}</p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "trx",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trx Id
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("trx")}</div>,
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment Method
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("payment_method")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="font-semibold">{numberToIdr(row.getValue("price"))}</div>,
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
      if (row.getValue("status") === "berhasil") {
        return <div className="text-green-600 flex items-center gap-1"><RiVerifiedBadgeFill size={18} /> PAID</div>
      } else {
        return <div className="text-red-600 flex items-center gap-1"><RiVerifiedBadgeFill size={18} /> UN PAID</div>
      }
    },
  },
  {
    accessorKey: "created_at",
    header: "Paid at",
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
        <ReportActionButton row={row} actionFor="transactionpackage"/>  
      )
    },
  },
]