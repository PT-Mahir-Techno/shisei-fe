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
import { usePeriod } from '@/store/use-validity-period'
import PeriodForm from './_part/form'
import CustomModal from '@/components/ui/custoom-dialog'
import LoadingIcons from 'react-loading-icons'
import toast from 'react-hot-toast'

const PeriodPage = () => {
  const title = "Validity Period"
  const { isOpen, setIsOpen } = useSheet()
  const { periods, loading, getAllPeriod, periodAttributes, deletePeriod, periodUrl, success, errorData } : any = usePeriod()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()

  React.useEffect(() => {
    getAllPeriod(`${baseUrl}/admin/duration`)
  }, [])

  const handleDelete = async () => {
    await deletePeriod(`${baseUrl}/admin/duration/${modalId}`)
    await getAllPeriod(periodUrl)
    
    if (!success){
      toast.error(errorData.message)
    }else{
      toast.success('Location deleted successfully')
    }
    
    setIsOpenModal(false)
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
          <p className="text-gray-500 dark:text-gray-100 text-sm">List of all {title}</p>
        </div>
        <div>
          <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add {title}</Button>
        </div>
      </div>
      
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={periods} 
          loading={loading} 
          dataPage={periodAttributes.to}
          dataTotal={periodAttributes.total}
          totalPages={periodAttributes.last_page}
          links= {periodAttributes.links}
          nextPage={getAllPeriod}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title="Add Validity Period" close={() => setIsOpen(false)}>
        <PeriodForm />
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

export default PeriodPage