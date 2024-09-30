'use client'

import React from 'react'
import { MoreHorizontal} from "lucide-react"
import { RiBox2Fill, RiClipboardFill, RiLeafFill } from "react-icons/ri"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useModal } from '@/store/use-modal'
import { useSheet } from '@/store/use-sheet'

const PackageActionButton = ({row}:any) => {
    const {setIsOpen, setModalId} = useModal()
    const {setIsOpen:detailOpen, setModelId} = useSheet()

    const handleDetail = (id:string) => {
      detailOpen(true)
      setModelId(id)
    }

    const handleStatus = (id:string) => {
      setIsOpen(true)
      setModalId(id)
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(JSON.stringify(row))}
          className="cursor-pointer"
        >
          <RiClipboardFill size={16} className="mr-2 text-green-500" /> Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleStatus(row.original.id)} className="cursor-pointer">
          <RiLeafFill size={16} className="mr-2 text-primary" />
          Cancel Booking
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PackageActionButton