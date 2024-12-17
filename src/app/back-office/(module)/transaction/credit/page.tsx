"use client"

import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {columns} from './_parts/column'
import { CUstomDataTable } from "@/components/ui/custom-data-table"
import { baseUrl } from "@/lib/variable"
import { useModal } from "@/store/use-modal"
import LoadingIcons from "react-loading-icons"
import toast from "react-hot-toast"
import api from "@/lib/api"
import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn, transformToSelect, transformToSelect2 } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { format, set } from "date-fns"
import { usePackageHistory } from "@/store/use-history-package"
import { AuthContex } from "@/providers/auth-provider"
import CustomModal from "@/components/ui/custoom-dialog"
import Select from 'react-select';



const CreditTransactionpage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const { packageHistorys, packageHistoryAttributes, loading, packageHistoryUrl, getAllPackageHistory } : any = usePackageHistory()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId, isModalReminder, setModalReminder, setModalId } = useModal()
  const [date, setDate] = useState<DateRange | undefined>()
  const [selectedMessage, setSelectedMessage] = useState<any>('')
  const [messages, setMessages] = useState<any>([])
  const [isLoadingMessage, setIsLoadingMessage] = useState(false)

  useEffect(() => {
    if (prefix){
      init()
    }
  }, [prefix])
  
  const init = async() => {
    await getAllPackageHistory(`${baseUrl}${prefix}/history-membership`)
    await handleGetTemplateMessage()
  }

  useEffect(() => {
    if (date?.from != undefined && date?.to != undefined) {
      getAllPackageHistory(`${baseUrl}${prefix}/history-membership?start_date=${format(date.from, 'yyyy-MM-dd')}&end_date=${format(date.to, 'yyyy-MM-dd')}`)
     }
 }, [date])

  const handleDelete = async () => {
    toast.success('Location deleted successfully')
    setIsOpenModal(false)
  }

  const handleUpdateTrx  = async() => {
    try {
      await api.put(`${baseUrl}${prefix}/calendar/cancel-booking/${modalId}`)
      await getAllPackageHistory(packageHistoryUrl)
      toast.success('Transaction Updated')
      setIsOpenModal(false)
      toast.success('Transaction Updated')
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  const handleGetTemplateMessage = async () => {
    try {
      const res = await api.get(`${baseUrl}${prefix}/template-active?type=nopaginate`) 
      setMessages(res?.data)
    } catch (error) {
    }
  }


  const handleSendMessage = async () => {
    if (!selectedMessage) {
      toast.error('Please select message')
      return
    }
    setIsLoadingMessage(true)
    try {
      const payload = {
        user_id: modalId,
        template_id: selectedMessage?.value
      }
      await api.post(`${baseUrl}${prefix}/history-membership/send-reminder`, payload)
      setModalReminder(false)
      setSelectedMessage('')
      setModalId('')
      toast.success("Reminder has been sent")
      setIsLoadingMessage(false)
    } catch (error:any) {
      setIsLoadingMessage(false)
      toast.error(error.data.message)
    } 
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">Credit Transaction</h2>
          <p className="text-gray-500 text-sm">List Credit transaction</p>
        </div>
      </div>
      
      {/* <RoomTable /> */}
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={packageHistorys} 
          loading={loading} 
          dataPage={packageHistoryAttributes.to}
          dataTotal={packageHistoryAttributes.total}
          totalPages={packageHistoryAttributes.last_page}
          links= {packageHistoryAttributes.links}
          nextPage={getAllPackageHistory}
        >
          <div className="flex justify-end gap-2 mb-6">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Button onClick={() => init()} variant={"outline"}>Reset Filter</Button>
            </div>
          </div>
        </CUstomDataTable>
      </div>

      <CustomModal
        open={isModalReminder} 
        onOpenChange={() => {
          setModalReminder(false)
          setSelectedMessage('')
          setModalId('')
        }} 
        title='Send Message Package'
      >
          <div>
            <div className='flex gap-3 items-center mb-4'>
              <div className='w-full'>
                <Select
                  onChange={(newValue, actionMeta) => setSelectedMessage(newValue)}
                  options={transformToSelect2(messages)}
                  name='message'
                  isMulti={false}
                />
              </div>
            </div>
            <div className='flex justify-end gap-4'>
              <Button onClick={() => {
                setModalReminder(false)
                setSelectedMessage('')
                setModalId('')
              }} variant={"outline"}>Cancel</Button>
              <Button onClick={() => handleSendMessage()}
                disabled={loading}
              >
                {isLoadingMessage &&
                  <LoadingIcons.Oval stroke='#fff' strokeWidth={5} className="w-4 h-4 mr-3" />
                }
                Send Message
              </Button>
            </div>
          </div>
      </CustomModal>
    </>
  )
}

export default CreditTransactionpage
