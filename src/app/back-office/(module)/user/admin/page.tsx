"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { RiAddCircleFill } from "react-icons/ri"
import CustomSheets from "@/components/ui/custom-sheets"
import AdminForm from "./_parts/form"
import { CUstomDataTable } from "@/components/ui/custom-data-table"
import { columns } from "./_parts/column"
import { useSheet } from "@/store/use-sheet"
import { useAdmin } from "@/store/use-admin"
import { baseUrl } from "@/lib/variable"
import toast from "react-hot-toast"
import { useModal } from "@/store/use-modal"
import LoadingIcons from "react-loading-icons"
import CustomModal from "@/components/ui/custoom-dialog"
import { AuthContex } from "@/providers/auth-provider"

const AdminPage = () => {
  const {authState} = React.useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const title = "Admin " 
  const { isOpen, setIsOpen } = useSheet()
  const { admins, loading, getAllAdmin, adminAttributes, deleteAdmin, adminUrl } : any = useAdmin()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()

  React.useEffect(() => {
    getAllAdmin(`${baseUrl}${prefix}/admin`)
  }, [prefix])

  const handleDelete = async () => {
    await deleteAdmin(`${baseUrl}${prefix}/admin/${modalId}`)
    await getAllAdmin(adminUrl)
    toast.success('Admin deleted successfully')
    setIsOpenModal(false)
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">{title}</h2>
          <p className="text-gray-500 text-sm">List {title}</p>
        </div>
        <div>
          <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add {title}</Button>
        </div>
      </div>
      
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={admins} 
          loading={loading} 
          dataPage={adminAttributes.to}
          dataTotal={adminAttributes.total}
          totalPages={adminAttributes.last_page}
          links= {adminAttributes.links}
          nextPage={getAllAdmin}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title={`Add ${title}`} close={() => setIsOpen(false)}>
        <AdminForm action={() => setIsOpen(false)} />
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

export default AdminPage
