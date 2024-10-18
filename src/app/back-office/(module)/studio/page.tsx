'use client'

import { Button } from '@/components/ui/button'
import CustomSheets from '@/components/ui/custom-sheets'
import { useSheet } from '@/store/use-sheet'
import React, { useEffect } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import StudioForm from './_parts/form'
import CustomModal from '@/components/ui/custoom-dialog'
import { useStudio } from '@/store/use-studio'
import { baseUrl } from '@/lib/variable'
import { CUstomDataTable } from '@/components/ui/custom-data-table'
import { columns } from './_parts/column'
import LoadingIcons from 'react-loading-icons'
import { useModal } from '@/store/use-modal'
import toast from 'react-hot-toast'
import { AuthContex } from '@/providers/auth-provider'

const title = "Studio"
function StudioPage() {
  const {authState} = React.useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const {isOpen, setIsOpen} = useSheet()
  const {loading, studios, studioUrl, studioAttributes, getAllStudio, deleteStudio} = useStudio()
  const {isOpen:isOpenModal, setIsOpen:setIsOpenModal, modalId} = useModal()

  useEffect(() => {
    initState()
  }
  , [])

  const initState = async () => {
    await getAllStudio(`${baseUrl}${prefix}/studio`)
  }

  const handleDelete = async () => {
    try {
      await deleteStudio(`${baseUrl}${prefix}/studio/${modalId}`)
      await initState()
      toast.success("Success delete studio")
    } catch (error) {
      toast.error("Failed delete studio")
    }
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

      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={studios} 
          loading={loading} 
          dataPage={studioAttributes.to}
          dataTotal={studioAttributes.total}
          totalPages={studioAttributes.last_page}
          links= {studioAttributes.links}
          nextPage={getAllStudio}
        />
      </div>

      <CustomModal open={isOpen} title={`Add ${title}`} onOpenChange={() => setIsOpen(false)}
        size='md:max-w-5xl'  
      >
        <StudioForm close={() => setIsOpen(false)} />
      </CustomModal>

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

export default StudioPage