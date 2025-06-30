'use client'

import { Button } from "@/components/ui/button"
import { useSheet } from "@/store/use-sheet"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RiCalendarCheckFill, RiDeleteBin5Fill, RiEdit2Fill, RiEyeFill, RiLink, RiUserAddFill, RiVerifiedBadgeFill } from "react-icons/ri"
import { useModal } from "@/store/use-modal"
import Link from "next/link"
import api from "@/lib/api"
import { useContext } from "react"
import { AuthContex } from "@/providers/auth-provider"
import { baseUrl } from "@/lib/variable"
import toast from "react-hot-toast"
import { useCustomer } from "@/store/use-customer"
import { CheckAvaibilityAction } from "@/lib/utils"

function ActionButton({model, isDay, isEdit=true, originalLink='', editLink='', isCanVerify=false, isDelete=true, actionFor=null, isGenerate=false} : any) {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role} = authState

  const { setIsOpen, setModelId, setMode } = useSheet()
  const { setIsOpen: setIsOpenModal, setModalId, setIsOpenDay, setIsGenerate } = useModal()
  const { getAllCustomer } = useCustomer()

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

  const handleGenerateLink = (id:string) => {
    setIsGenerate(true)
    setModalId(id)
  }

  const handleVerify = async (id:string) => {
    try {
      await api.put(`${baseUrl}${prefix}/user/verify/${id}`)
      getAllCustomer(`${baseUrl}${prefix}/user`)
      toast.success("User has been verified")
    } catch (error:any) {
      toast.error(error.data.message)
    }
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
          {/* <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(JSON.stringify(model))}
            className="cursor-pointer"
          >
            <RiClipboardFill size={16} className="mr-2 text-green-500" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator /> */}
          {
            CheckAvaibilityAction(permision, 'verify', actionFor, role) && prefix &&
            <div>
              {
                isCanVerify &&
                <DropdownMenuItem onClick={() => handleVerify(model.id)} className="cursor-pointer">
                  <RiVerifiedBadgeFill size={16} className="mr-2 text-purple-600" />
                  Verify
                </DropdownMenuItem>
              }
            </div>
          }

          {
            CheckAvaibilityAction(permision, 'available', actionFor, role) && prefix &&
            <div>
              {
                isDay && (
                  <DropdownMenuItem onClick={() => handleSetDay(model.id)} className="cursor-pointer">
                    <RiCalendarCheckFill size={16} className="mr-2 text-purple-600" />
                    Avaibility
                  </DropdownMenuItem>
                )
              }
            </div>
          }

          {
            prefix && actionFor == 'corporate' &&
            <Link href={`/back-office/corporate/add-member/${model.id}`}>
              <DropdownMenuItem  className="cursor-pointer">
                <RiUserAddFill size={16} className="mr-2 text-primary" />
                Add Member
              </DropdownMenuItem>
            </Link>
          }
            
            {
              CheckAvaibilityAction(permision, 'edit', actionFor, role) && prefix &&
              <div>
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
              </div>
            }

            {
              CheckAvaibilityAction(permision, 'view', actionFor, role) && prefix &&
              <div>
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
              </div>
            }

            {
              CheckAvaibilityAction(permision, 'delete', actionFor, role) && prefix &&
              <div>
                {
                  isDelete && 
                  <DropdownMenuItem onClick={() => handleClickDelete(model.id)} className="cursor-pointer">
                    <RiDeleteBin5Fill size={16} className="mr-2 text-destructive" />
                    Delete
                  </DropdownMenuItem>
                }
              </div>
            }



            {
              isGenerate && 
              <DropdownMenuItem onClick={() => handleGenerateLink(model.id)} className="cursor-pointer">
                <RiLink size={16} className="mr-2 text-primary" />
                Private Order
              </DropdownMenuItem>
            }

        </DropdownMenuContent>
      </DropdownMenu>
      
    </>
  )
}

export default ActionButton