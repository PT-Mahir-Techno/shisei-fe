'use client';

import { Button } from '@/components/ui/button';
import CustomModal from '@/components/ui/custoom-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { baseUrl } from '@/lib/variable';
import { useSchedule } from '@/store/use-schedule'
import { useSheet } from '@/store/use-sheet';
import { set } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';
import { RiDeleteBin2Fill, RiEditBoxFill, RiStickyNoteFill } from 'react-icons/ri';
import LoadingIcons from 'react-loading-icons';

const EventDetail = ({id, close}: {id:String|undefined, close: () => void}) => {

  const {loading, schedule, getSingleSchedule} = useSchedule()
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const {deleteSchedule, loading:loadingSchedule, getScheduleConverted} = useSchedule()
  const {setIsOpen, setModelId} = useSheet()

  React.useEffect(() => {
    if (id) {
      getSingleSchedule(`${baseUrl}/admin/schedule/${id}`)
    }
  }, [id])

  const handleDelete = async () => {
    try {
      await deleteSchedule(`${baseUrl}/admin/schedule/${id}`)
      await getScheduleConverted(`${baseUrl}/admin/schedule`)
      await setShowDeleteModal(false)
      await close()
      toast.success('Event deleted successfully')
    } catch (error:any) {
      setShowDeleteModal(false)
      toast.error(error.message)
    }
  }

  const handleEditSheet = () => {
    close()
    setIsOpen(true)
    if (id){
      setModelId(id.toString())
    }
  }

  return loading 
  ? 
    <div className='flex flex-col gap-2'>
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />

    </div>

  : (
    <>
      <div className='grid grid-cols-1 md:grid-cols-6 gap-8 pt-4'>
        <div className='col-span-6 md:col-span-4'>
          <table className='w-full text-sm'>
            <tbody>
              <tr className='p-3'>
                <td className='text-gray-500 w-[30%] text-md py-[5px] font-semibold'>Schedule Name </td>
                <td className='w-[7%]'>:</td>
                <td className='text-gray-700 text-md'>{schedule.name}</td>
              </tr>
              <tr className='p-3'>
                <td className='text-gray-500 w-[30%] text-md py-[5px] font-semibold'>Customer Quota </td>
                <td className='w-[7%]'>:</td>
                <td className='text-gray-700 text-md'>{schedule.max_order} Customer</td>
              </tr>
              <tr className='p-3'>
                <td className='text-gray-500 w-[30%] text-md py-[5px] font-semibold'>Date </td>
                <td className='w-[7%]'>:</td>
                <td className='text-gray-700 text-md'>{schedule.date}</td>
              </tr>
              <tr className='p-3'>
                <td className='text-gray-500 w-[30%] text-md py-[5px] font-semibold'>Time </td>
                <td className='w-[7%]'>:</td>
                <td className='text-gray-700 text-md'>{schedule.time}</td>
              </tr>
              <tr className='p-3'>
                <td className='text-gray-500 w-[30%] text-md py-[5px] font-semibold'>Duration </td>
                <td className='w-[7%]'>:</td>
                <td className='text-gray-700 text-md'>{schedule.duration} Minute</td>
              </tr>
              <tr className='p-3'>
                <td className='text-gray-500 w-[30%] text-md py-[5px] font-semibold'>Location </td>
                <td className='w-[7%]'>:</td>
                <td className='text-gray-700 text-md'>{schedule.location != undefined &&  schedule.location.name}</td>
              </tr>
              <tr className='p-3'>
                <td className='text-gray-500 w-[30%] text-md py-[5px] font-semibold'>Staff/Instructor </td>
                <td className='w-[7%]'>:</td>
                <td className='text-gray-700 text-md'>{schedule.staff != undefined && schedule.staff.name}</td>
              </tr>
              <tr className='p-3'>
                <td className='text-gray-500 w-[30%] text-md py-[5px] font-semibold'>Description </td>
                <td className='w-[7%]'>:</td>
                <td className='text-gray-700 text-md'  dangerouslySetInnerHTML={{ __html: schedule.description }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col-span-6 md:col-span-2'>
          <Image src={schedule.image_url} alt={schedule.name} width={300} height={0} className='rounded-lg'/>

          <div className='flex flex-col gap-4 mt-4'>
            <Button onClick={() => handleEditSheet()} size={"sm"} className='w-full' variant={'outline'}>
              <RiEditBoxFill className='text-lg mr-3'/>
              Edit Data
            </Button>
            <Link href={`/back-office/calendar/schedule/note/${id}`}>
              <Button size={"sm"} className='w-full' variant={'secondary'}>
                <RiStickyNoteFill className='text-lg mr-3'/>
                Add Note
              </Button>
            </Link>
            <Button onClick={() => setShowDeleteModal(true)} size={"sm"}  className='w-full bg-destructive text-white hover:bg-destructive'>
              <RiDeleteBin2Fill className='text-lg mr-3'/>
              Delete Event
            </Button>
          </div>
        </div>
      </div>
      <div className='flex justify-end mt-4'>
        <Button onClick={close}>
          Close
        </Button>
      </div>

      <CustomModal
        open={showDeleteModal} 
        onOpenChange={() => !loadingSchedule && setShowDeleteModal(false)} 
        title='Delete Data'
      >
          <div>
            <p className='text-gray-700 my-6 text-center'>
              Are you sure you want to delete this data?
              <br />
              <b>This action cannot be undone</b>
            </p>
            <div className='flex justify-end gap-4'>
              <Button onClick={() => setShowDeleteModal(false)} variant={"outline"}>Cancel</Button>
              <Button onClick={() => handleDelete()}
                disabled={loadingSchedule}
              >
                {loadingSchedule &&
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

export default EventDetail