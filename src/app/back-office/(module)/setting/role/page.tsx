'use client'

import { Button } from '@/components/ui/button'
import CustomSheets from '@/components/ui/custom-sheets'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'
import React, { useEffect } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import { useLocation } from '@/store/use-location'
import { useSheet } from '@/store/use-sheet'
import { useModal } from '@/store/use-modal'
import { baseUrl } from '@/lib/variable'
import { CUstomDataTable } from '@/components/ui/custom-data-table'
import { columns } from './_part/column'
import CustomModal from '@/components/ui/custoom-dialog'
import LoadingIcons from 'react-loading-icons'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRole } from '@/store/use-role'

const RolePage = () => {
  const title = "Role"
  const { isOpen, setIsOpen } = useSheet()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()
  const { roles, getAllRole, deleteRole, loading, roleUrl, roleAttributes } = useRole()

  React.useEffect(() => {
    getAllRole(`${baseUrl}/admin/role`)
  }, [])

  const handleDelete = async () => {
    try {
      await deleteRole(`${baseUrl}/admin/role/${modalId}`)
      await getAllRole(roleUrl)
      toast.success('Data has been deleted')
      setIsOpenModal(false)
    } catch (error) {
      toast.error('Failed to delete data')
      setIsOpenModal(false)
    }
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
          <p className="text-gray-500 dark:text-gray-100 text-sm">List of all {title}</p>
        </div>
        <div>
          <Link href={"/back-office/setting/role/create"}>
            <Button > <RiAddCircleFill className="mr-2"/> Add {title}</Button>
          </Link>
        </div>
      </div>
      
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={roles} 
          loading={loading} 
          dataPage={roleAttributes.to}
          dataTotal={roleAttributes.total}
          totalPages={roleAttributes.last_page}
          links= {roleAttributes.links}
          nextPage={getAllRole}
        />
      </div>
        
      {/* <CustomSheets isOpen={isOpen} title="Add Validity Period" close={() => setIsOpen(false)}>
        <PeriodForm />
      </CustomSheets> */}

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

export default RolePage