"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { RiAddCircleFill } from "react-icons/ri"
import CustomSheets from "@/components/ui/custom-sheets"
import CustomerForm from "./_parts/form"
import { useSheet } from "@/store/use-sheet"
import { useCustomer } from "@/store/use-customer"
import { useModal } from "@/store/use-modal"
import { baseUrl } from "@/lib/variable"
import { CUstomDataTable } from "@/components/ui/custom-data-table"
import { columns } from "./_parts/column"
import CustomModal from "@/components/ui/custoom-dialog"
import LoadingIcons from "react-loading-icons"
import toast from "react-hot-toast"
import { AuthContex } from "@/providers/auth-provider"

const NoteUserPage = () => {
  const {authState} = React.useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const title = "User Note"
  const { isOpen, setIsOpen } = useSheet()
  const { customers, loading, getAllCustomer, customerAttributes, deleteCustomer, customerUrl, error, errorData } : any = useCustomer()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()

  React.useEffect(() => {
    if (prefix){
      getAllCustomer(`${baseUrl}${prefix}/user`)
    }
  }, [prefix])

  const handleDelete = async () => {
    await deleteCustomer(`${baseUrl}${prefix}/user/${modalId}`)
    await getAllCustomer(customerUrl)

    if (error){
      toast.error(errorData.message)
    }else{
      toast.success('Customer deleted successfully')
    }

    setIsOpenModal(false)
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">{title}</h2>
          <p className="text-gray-500 text-sm">List {title}</p>
        </div>
      </div>
      
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={customers} 
          loading={loading} 
          dataPage={customerAttributes.to}
          dataTotal={customerAttributes.total}
          totalPages={customerAttributes.last_page}
          links= {customerAttributes.links}
          nextPage={getAllCustomer}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title={`Add ${title}`} close={() => setIsOpen(false)}>
        <CustomerForm action={() => setIsOpen(false)} />
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

export default NoteUserPage
