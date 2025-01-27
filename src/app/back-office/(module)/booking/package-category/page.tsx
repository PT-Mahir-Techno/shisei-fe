'use client'

import { Button } from '@/components/ui/button'
import CustomSheets from '@/components/ui/custom-sheets'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'
import React, { useContext, useEffect } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import { useLocation } from '@/store/use-location'
import { useSheet } from '@/store/use-sheet'
import { useModal } from '@/store/use-modal'
import { baseUrl } from '@/lib/variable'
import { CUstomDataTable } from '@/components/ui/custom-data-table'
import { columns } from './_part/column'
import PackageForm from './_part/form'
import LoadingIcons from 'react-loading-icons'
import CustomModal from '@/components/ui/custoom-dialog'
import toast from 'react-hot-toast'
import { AuthContex } from '@/providers/auth-provider'
import { CheckAvaibilityAction } from '@/lib/utils'
import { usePackageCategory } from '@/store/use-package-category'

const PackagePage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const title = "Package"
  const { isOpen, setIsOpen } = useSheet()
  const { packageCategorys, loading, getAllPackageCategory, packageCategoryAttributes, deletePackageCategory, packageCategoryUrl, success, errorData } : any = usePackageCategory()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()

  React.useEffect(() => {
    getAllPackageCategory(`${baseUrl}${prefix}/category`)
  }, [authState])

  const handleDelete = async () => {
    await deletePackageCategory(`${baseUrl}${prefix}/category/${modalId}`)
    await getAllPackageCategory(packageCategoryUrl)

    if (!success){
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
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100">Package Category</h2>
          <p className="text-gray-500 dark:text-gray-100 text-sm">List Package Category</p>
        </div>
        {
          CheckAvaibilityAction(permision, 'create', 'package', role) && prefix &&
          <div>
            <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add Package Category</Button>
          </div>
        }
      </div>
      
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={packageCategorys} 
          loading={loading} 
          dataPage={packageCategoryAttributes.to}
          dataTotal={packageCategoryAttributes.total}
          totalPages={packageCategoryAttributes.last_page}
          links= {packageCategoryAttributes.links}
          nextPage={getAllPackageCategory}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title="Add Room" close={() => setIsOpen(false)}>
        <PackageForm/>
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

export default PackagePage