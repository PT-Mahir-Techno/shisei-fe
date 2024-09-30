'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSheet } from "@/store/use-sheet"
import { MoreHorizontal } from "lucide-react"
import { RiCalendar2Fill, RiCalendarCheckFill, RiClipboardFill, RiDeleteBin5Fill, RiEdit2Fill, RiEye2Fill, RiEyeFill } from "react-icons/ri"
import { useModal } from "@/store/use-modal"
import Link from "next/link"

function ActionButton({model, isDay, isEdit=true, originalLink='', editLink=''} : any) {
  const { setIsOpen, setModelId, setMode } = useSheet()
  const { setIsOpen: setIsOpenModal, setModalId, setIsOpenDay } = useModal()

  const handleClickDelete = (id:string) => {
    setIsOpenModal(true)
    setModalId(id)
  }

  const handleSetDay = (id:string) => {
    setIsOpenDay(true)
    setModalId(id)
  }

  const handleSheetEdit = (id:string) => {
    setIsOpen(true)
    setModelId(id)
    setMode('edit')
  }

  return (
    <>
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
            onClick={() => navigator.clipboard.writeText(JSON.stringify(model))}
            className="cursor-pointer"
          >
            <RiClipboardFill size={16} className="mr-2 text-green-500" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {
            isDay && (
              <DropdownMenuItem onClick={() => handleSetDay(model.id)} className="cursor-pointer">
                <RiCalendarCheckFill size={16} className="mr-2 text-purple-600" />
                Avaibility
              </DropdownMenuItem>
            )
          }
          {
            isEdit &&
            <DropdownMenuItem onClick={() => handleSheetEdit(model.id)}  className="cursor-pointer">
              <RiEdit2Fill size={16} className="mr-2 text-primary" />
              Edit
            </DropdownMenuItem>
          }
          {
            editLink &&
            <Link href={editLink}>
              <DropdownMenuItem  className="cursor-pointer">
                <RiEdit2Fill size={16} className="mr-2 text-primary" />
                Edit
              </DropdownMenuItem>
            </Link>
          }
          {
            originalLink && (
              <Link href={originalLink}>
                <DropdownMenuItem className="cursor-pointer">
                  <RiEyeFill size={16} className="mr-2 text-blue-500" />
                  Detail
                </DropdownMenuItem>
              </Link>
            )
          }
          <DropdownMenuItem onClick={() => handleClickDelete(model.id)} className="cursor-pointer">
            <RiDeleteBin5Fill size={16} className="mr-2 text-destructive" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </>
  )
}

export default ActionButton