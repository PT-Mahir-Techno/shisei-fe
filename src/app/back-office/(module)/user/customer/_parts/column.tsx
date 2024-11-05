"use client"
 
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import ActionButton from "@/components/ui/action-button"
import { handleStringToDate } from "@/lib/utils"
import { AdminType } from "@/types/admin-type"
import Image from "next/image"
import { RiCloseCircleFill, RiVerifiedBadgeFill } from "react-icons/ri"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 
export const columns: ColumnDef<AdminType>[] = [
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
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => <div className="lowercase">
      {/* {
        row.getValue("photo") 
        ? <Image alt="photo" src={row.getValue("photo")} width={60} height={60} className="rounded-full object-cover object-center"/>
      } */}
      <Image alt="photo" src={row.original.photo_url ?? "/img/img_placeholder.png"} width={60} height={60} className="rounded-full h-14 w-14 object-cover object-center"/>
    </div>,
  },
  {
    accessorKey: "name",
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
        className="flex items-center cursor-pointer"
          // variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "otp",
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
      if (row.getValue("otp")){
        return <div className="text-green-600 flex items-center gap-2"> <RiVerifiedBadgeFill/> verified</div>
      }else{
        return <div className="text-red-600 flex items-center gap-2"><RiCloseCircleFill/> unverified</div>
      }
    }
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
        <ActionButton model={row.original} isCanVerify={true} actionFor="user" />
      )
    },
  },
]