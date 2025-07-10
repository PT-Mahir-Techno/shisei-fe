'use client'

import { Button } from '@/components/ui/button'
import CustomSheets from '@/components/ui/custom-sheets'
import React, { useContext, useState } from 'react'
import { useSheet } from '@/store/use-sheet'
import { useModal } from '@/store/use-modal'
import { baseUrl } from '@/lib/variable'
import { usePackage } from '@/store/use-package'
import { CUstomDataTable } from '@/components/ui/custom-data-table'
import { columns } from './_part/column'
import LoadingIcons from 'react-loading-icons'
import CustomModal from '@/components/ui/custoom-dialog'
import toast from 'react-hot-toast'
import { AuthContex } from '@/providers/auth-provider'
import api from '@/lib/api'
import PackageForm from './_part/form'


const PackagePage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const title = "Shared Credit"
  const { isOpen, setIsOpen } = useSheet()
  const { packages, loading, getAllPackage, packageAttributes, deletePackage, packageUrl, success, errorData } : any = usePackage()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId , isGenerate, setIsGenerate} = useModal()

  React.useEffect(() => {
    getAllPackage(`${baseUrl}${prefix}/payment/shared`)
  }, [prefix])

  const handleDelete = async () => {
    await deletePackage(`${baseUrl}${prefix}/payment/shared/${modalId}`)
    await getAllPackage(packageUrl)

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
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
          <p className="text-gray-500 dark:text-gray-100 text-sm">List {title}</p>
        </div>
      </div>
      
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={packages} 
          loading={loading} 
          dataPage={packageAttributes.to}
          dataTotal={packageAttributes.total}
          totalPages={packageAttributes.last_page}
          links= {packageAttributes.links}
          nextPage={getAllPackage}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title="Add Package" close={() => setIsOpen(false)}>
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