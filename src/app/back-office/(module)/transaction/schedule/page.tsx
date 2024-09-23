"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RiAddCircleFill } from "react-icons/ri"
import CustomSheets from "@/components/ui/custom-sheets"
import {columns} from './_parts/column'
import { CUstomDataTable } from "@/components/ui/custom-data-table"
import { useSheet } from "@/store/use-sheet"
import { baseUrl } from "@/lib/variable"
import CustomModal from "@/components/ui/custoom-dialog"
import { useModal } from "@/store/use-modal"
import LoadingIcons from "react-loading-icons"
import toast from "react-hot-toast"
import { useSchedule } from "@/store/use-schedule"


const ScheduleTransactionpage = () => {

  const { isOpen, setIsOpen } = useSheet()
  const { schedules, scheduleAttributes, loading, scheduleUrl, getAllSchedule } : any = useSchedule()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()

  useEffect(() => {
    getAllSchedule(`${baseUrl}/admin/calendar`)
  }, [])

  const handleDelete = async () => {
    // await deleteLocation(`${baseUrl}/admin/schedule/${modalId}`)
    // await getAllLocation(scheduleUrl)
    toast.success('Location deleted successfully')
    setIsOpenModal(false)
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">Schedule Transaction</h2>
          <p className="text-gray-500 text-sm">List Schedule transaction</p>
        </div>
      </div>
      
      {/* <RoomTable /> */}
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={schedules} 
          loading={loading} 
          dataPage={scheduleAttributes.to}
          dataTotal={scheduleAttributes.total}
          totalPages={scheduleAttributes.last_page}
          links= {scheduleAttributes.links}
          nextPage={getAllSchedule}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title="Add Location" close={() => setIsOpen(false)}>
        <div></div>
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

export default ScheduleTransactionpage
