"use client"

import { useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RiAddCircleFill } from "react-icons/ri"
import CustomSheets from "@/components/ui/custom-sheets"
import {columns} from './_parts/column'
import { CUstomDataTable } from "@/components/ui/custom-data-table"
import { useSheet } from "@/store/use-sheet"
import { baseUrl } from "@/lib/variable"
import LocationForm from "./_parts/form"
import CustomModal from "@/components/ui/custoom-dialog"
import { useModal } from "@/store/use-modal"
import LoadingIcons from "react-loading-icons"
import toast from "react-hot-toast"
import { useFaq } from "@/store/use-faq"
import { AuthContex } from "@/providers/auth-provider"

const title = 'Faq'

const FaqPage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const { isOpen, setIsOpen } = useSheet()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()
  const { faqs, getAllFaq, faqAttributes, loading, deleteFaq, faqUrl } =useFaq()
  useEffect(() => {
    getAllFaq(`${baseUrl}${prefix}/faq`)
  }, [prefix])

  const handleDelete = async () => {
    await deleteFaq(`${baseUrl}${prefix}/faq/${modalId}`)
    await getAllFaq(faqUrl)
    toast.success('Location deleted successfully')
    setIsOpenModal(false)
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-500 text-sm">List of all {title} </p>
        </div>
        <div>
          <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add {title}</Button>
        </div>
      </div>
      
      {/* <RoomTable /> */}
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={faqs} 
          loading={loading} 
          dataPage={faqAttributes.to}
          dataTotal={faqAttributes.total}
          totalPages={faqAttributes.last_page}
          links= {faqAttributes.links}
          nextPage={getAllFaq}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title={`Add ${title}`} close={() => setIsOpen(false)}>
        <LocationForm/>
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

export default FaqPage
