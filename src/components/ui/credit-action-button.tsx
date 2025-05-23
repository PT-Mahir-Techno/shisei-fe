'use client'

import React, { useContext } from 'react'
import { MoreHorizontal} from "lucide-react"
import { RiBox2Fill, RiClipboardFill, RiLeafFill, RiPlaneFill, RiSendPlaneFill } from "react-icons/ri"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useModal } from '@/store/use-modal'
import { useSheet } from '@/store/use-sheet'
import { AuthContex } from '@/providers/auth-provider'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import toast from 'react-hot-toast'
import { CheckAvaibilityAction } from '@/lib/utils'

const CreditActionButton = ({row, actionFor}:any) => {
  
    const {setIsOpen, setModalId, setModalReminder} = useModal()
    const {setIsOpen:detailOpen, setModelId} = useSheet()

    const {authState} = useContext(AuthContex)
    const {_prefix:prefix, _permision:permision, _avaibility:role} = authState

    const handleDetail = (id:string) => {
      detailOpen(true)
      setModelId(id)
    }

    const handleStatus = (id:string) => {
      setIsOpen(true)
      setModalId(id)
    }

    const SendReminder = async (data:any) => {
      // try {
      //   const payload = {
      //     user_id: data
      //   }
      //   await api.post(`${baseUrl}${prefix}/history-membership/send-reminder`, payload)
      //   toast.success("Reminder has been sent")
      // } catch (error:any) {
      //   toast.error(error.data.message)
      // } 

      setModalId(data)
      setModalReminder(true)
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
          CheckAvaibilityAction(permision, 'reminder', actionFor, role) && prefix &&
          <DropdownMenuItem onClick={() => SendReminder(row.original.user_id)} className="cursor-pointer">
            <RiSendPlaneFill size={16} className="mr-2 text-primary" />
            Send Message Package
          </DropdownMenuItem>
        }

        {/* {
          CheckAvaibilityAction(permision, 'view', actionFor, role) && prefix &&
          <DropdownMenuItem onClick={() => handleDetail(row.original.id)}  className="cursor-pointer">
            <RiBox2Fill size={16} className="mr-2 text-red-500" />
            Detail Trx 
          </DropdownMenuItem>
        } */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CreditActionButton