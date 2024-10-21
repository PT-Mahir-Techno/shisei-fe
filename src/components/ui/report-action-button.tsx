'use client'

import React, { useContext } from 'react'
import { RiBox2Fill, RiClipboardFill, RiLeafFill } from "react-icons/ri"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useModal } from '@/store/use-modal'
import { useSheet } from '@/store/use-sheet'
import { MoreHorizontal } from 'lucide-react'
import { AuthContex } from '@/providers/auth-provider'
import { CheckAvaibilityAction } from '@/lib/utils'

const ReportActionButton = ({row, actionFor}:any) => {
    const {authState} = useContext(AuthContex)
    const {_prefix:prefix, _permision:permision, _avaibility:role} = authState

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
          onClick={() => navigator.clipboard.writeText(row.original.trx)}
          className="cursor-pointer"
        >
          <RiClipboardFill size={16} className="mr-2 text-green-500" /> Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        
        {
          CheckAvaibilityAction(permision, 'status', actionFor, role) && prefix &&
          <DropdownMenuItem onClick={() => handleStatus(row.original.id)} className="cursor-pointer">
            <RiLeafFill size={16} className="mr-2 text-primary" />
            Update Status
          </DropdownMenuItem>
        }

        {
          CheckAvaibilityAction(permision, 'detail', actionFor, role) && prefix &&
          <DropdownMenuItem onClick={() => handleDetail(row.original.id)}  className="cursor-pointer">
            <RiBox2Fill size={16} className="mr-2 text-red-500" />
            Detail Trx 
          </DropdownMenuItem>
        }

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ReportActionButton