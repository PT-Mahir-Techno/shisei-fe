"use client"
 
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import ActionButton from "@/components/ui/action-button"
import { handleStringToDate, numberToIdr } from "@/lib/utils"
import { AdminType } from "@/types/admin-type"
import Image from "next/image"
import { RiVerifiedBadgeFill } from "react-icons/ri"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 
export const columns: ColumnDef<any>[] = [
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
          Trx Code
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("trx")}</div>,
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
          Price
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="font-bold text-foreground/70">{numberToIdr(row.getValue("price"))}</div>,
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
    accessorKey: "shared_type",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shared Type
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("shared_type")}</div>,
  },
  {
    accessorKey: "member_count",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joined Member
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("member_count")} participants</div>,
  },
  
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <ActionButton model={row.original} actionFor="shared_credit" isEdit={false} isDelete={false} showLink={`${'/back-office/booking/shared-credit/detail/'}${row.original.id}`}/>
      )
    },
  },
]