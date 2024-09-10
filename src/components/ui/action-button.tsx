'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSheet } from "@/store/use-sheet"
import { MoreHorizontal } from "lucide-react"
import { RiClipboardFill, RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri"
import { useModal } from "@/store/use-modal"

function ActionButton({model} : any) {
  const { setIsOpen } = useSheet()
  const { setIsOpen: setIsOpenModal, setModalId } = useModal()

  const handleClickDelete = (id:string) => {
    setIsOpenModal(true)
    setModalId(id)
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
          <DropdownMenuItem onClick={() => setIsOpen(true)}  className="cursor-pointer">
            <RiEdit2Fill size={16} className="mr-2 text-primary" />
            Edit Data
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClickDelete(model.id)} className="cursor-pointer">
            <RiDeleteBin5Fill size={16} className="mr-2 text-destructive" />
            Delete Data
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </>
  )
}

export default ActionButton