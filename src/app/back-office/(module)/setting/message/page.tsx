"use client"

import { useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RiAddCircleFill } from "react-icons/ri"
import CustomSheets from "@/components/ui/custom-sheets"
import {columns} from './_parts/column'
import { CUstomDataTable } from "@/components/ui/custom-data-table"
import { useSheet } from "@/store/use-sheet"
import { baseUrl } from "@/lib/variable"
import TemplateForm from "./_parts/form"
import CustomModal from "@/components/ui/custoom-dialog"
import { useModal } from "@/store/use-modal"
import LoadingIcons from "react-loading-icons"
import toast from "react-hot-toast"
import { AuthContex } from "@/providers/auth-provider"
import { CheckAvaibilityAction } from "@/lib/utils"
import { useTemplate } from "@/store/use-template"


const TemplateMessagePage = () => {
  
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const { isOpen, setIsOpen } = useSheet()
  const { templates, loading, getAllTemplate, templateAttributes, deleteTemplate, templateUrl } : any = useTemplate()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()
  

  useEffect(() => {
    if (prefix){
      getAllTemplate(`${baseUrl}${prefix}/template`)
    }
  }, [prefix])

  const handleDelete = async () => {
    await deleteTemplate(`${baseUrl}${prefix}/template/${modalId}`)
    await getAllTemplate(templateUrl)
    toast.success('Template deleted successfully')
    setIsOpenModal(false)
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">Template Message</h2>
          <p className="text-gray-500 text-sm">List Template Message</p>
        </div>
        {
          CheckAvaibilityAction(permision,'create','templatemessage', role) && prefix &&
          <div>
            <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add Template</Button>
          </div>
        }
      </div>
      
      {/* <RoomTable /> */}
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={templates} 
          loading={loading} 
          dataPage={templateAttributes.to}
          dataTotal={templateAttributes.total}
          totalPages={templateAttributes.last_page}
          links= {templateAttributes.links}
          nextPage={getAllTemplate}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title="Add Template" close={() => setIsOpen(false)}>
        <TemplateForm/>
      </CustomSheets>

      <CustomModal
        open={isOpenModal} 
        onOpenChange={() => setIsOpenModal(false)} 
        title='Delete Data'
      >
          <div>
            <p className='text-gray-700 my-6 text-center'>
              Are you sure you want to delete this data?
              <br />
              <b>This action cannot be undone</b>
            </p>
            <div className='flex justify-end gap-4'>
              <Button onClick={() => setIsOpenModal(false)} variant={"outline"}>Cancel</Button>
              <Button onClick={() => handleDelete()}
                disabled={loading}
              >
                {loading &&
                  <LoadingIcons.Oval stroke='#fff' strokeWidth={5} className="w-4 h-4 mr-3" />
                }
                delete
              </Button>
            </div>
          </div>
      </CustomModal>
    </>
  )
}

export default TemplateMessagePage
