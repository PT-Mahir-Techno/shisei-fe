"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { RiAddCircleFill } from "react-icons/ri"
import CustomSheets from "@/components/ui/custom-sheets"
import StaffForm from "./_parts/form"
import { CUstomDataTable } from "@/components/ui/custom-data-table"
import { columns } from "./_parts/column"
import { useSheet } from "@/store/use-sheet"
import { baseUrl } from "@/lib/variable"
import toast from "react-hot-toast"
import { useModal } from "@/store/use-modal"
import LoadingIcons from "react-loading-icons"
import CustomModal from "@/components/ui/custoom-dialog"
import { useStaff } from "@/store/use-staff"
import AvaibilityDay from "./_parts/avaibility-day"
import { AuthContex } from "@/providers/auth-provider"
import { CheckAvaibilityAction } from "@/lib/utils"

const InstructorPage = () => {
  const {authState} = React.useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role} = authState

  const title = "Staff " 
  const { isOpen, setIsOpen } = useSheet()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId, isOpenDay, setIsOpenDay } = useModal()
  const { staffs, loading, getAllStaff, staffAttributes, deleteStaff, staffUrl } : any = useStaff()

  React.useEffect(() => {
    init()
  }, [prefix])

  const init = async () => {
    if (prefix){
      await getAllStaff(`${baseUrl}${prefix}/staff`)
    }
  }

  const handleDelete = async () => {
    await deleteStaff(`${baseUrl}${prefix}/staff/${modalId}`)
    await getAllStaff(staffUrl)
    toast.success('Staff deleted successfully')
    setIsOpenModal(false)
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">{title}</h2>
          <p className="text-gray-500 text-sm">List {title}</p>
        </div>
        {
          CheckAvaibilityAction(permision, 'create', 'staff', role) && prefix &&
          <div>
            <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add {title}</Button>
          </div>
        }
      </div>
      
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={staffs} 
          loading={loading} 
          dataPage={staffAttributes.to}
          dataTotal={staffAttributes.total}
          totalPages={staffAttributes.last_page}
          links= {staffAttributes.links}
          nextPage={getAllStaff}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title={`Add ${title}`} close={() => setIsOpen(false)}>
        <StaffForm action={() => setIsOpen(false)} />
      </CustomSheets>

      <CustomModal
        open={isOpenModal} 
        onOpenChange={() => setIsOpenModal(false)} 
        title='Delete Data'
      >
          <div aria-describedby="content">
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

      <CustomModal
        open={isOpenDay} 
        onOpenChange={() => setIsOpenDay(false)} 
        title='Set or update avaibility day'
      >
        <AvaibilityDay modelId={modalId} close={() => setIsOpenDay(false)} />
      </CustomModal>
    </>
  )
}

export default InstructorPage
