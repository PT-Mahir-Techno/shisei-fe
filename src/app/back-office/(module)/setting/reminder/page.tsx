"use client"

import { useContext, useEffect } from "react"
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
import { AuthContex } from "@/providers/auth-provider"
import { CheckAvaibilityAction } from "@/lib/utils"
import { useReminder } from "@/store/use-reminder"
import ReminderForm from "./_parts/form"


const ReminderMessagePage = () => {
  
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const { isOpen, setIsOpen } = useSheet()
  const { reminders, loading, getAllReminder, reminderAttributes, deleteReminder, reminderUrl } : any = useReminder()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()
  

  useEffect(() => {
    if (prefix){
      getAllReminder(`${baseUrl}${prefix}/reminder-class`)
    }
  }, [prefix])

  const handleDelete = async () => {
    await deleteReminder(`${baseUrl}${prefix}/reminder-class/${modalId}`)
    await getAllReminder(reminderUrl)
    toast.success('Reminder deleted successfully')
    setIsOpenModal(false)
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">Reminder Notification</h2>
          <p className="text-gray-500 text-sm">List Reminder Notification</p>
        </div>
        {
          CheckAvaibilityAction(permision,'create','remindermessage', role) && prefix &&
          <div>
            <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add Reminder</Button>
          </div>
        }
      </div>
      
      {/* <RoomTable /> */}
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={reminders} 
          loading={loading} 
          dataPage={reminderAttributes.to}
          dataTotal={reminderAttributes.total}
          totalPages={reminderAttributes.last_page}
          links= {reminderAttributes.links}
          nextPage={getAllReminder}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title="Add Reminder" close={() => setIsOpen(false)}>
        <ReminderForm/>
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

export default ReminderMessagePage
