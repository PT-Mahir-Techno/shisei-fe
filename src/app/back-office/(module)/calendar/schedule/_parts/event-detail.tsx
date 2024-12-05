'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CustomModal from '@/components/ui/custoom-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/api';
import { CheckAvaibilityAction, handleStringToDate, transformToSelect } from '@/lib/utils';
import { baseUrl } from '@/lib/variable';
import { AuthContex } from '@/providers/auth-provider';
import { useCustomer } from '@/store/use-customer';
import { useSchedule } from '@/store/use-schedule'
import { useSheet } from '@/store/use-sheet';
import { set } from 'date-fns';
import { LucideUserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { RiAccountCircleFill, RiDeleteBin2Fill, RiEditBoxFill, RiMapPin2Line, RiMapPinFill, RiStickyNoteFill, RiUser3Line, RiUserAddFill, RiUserAddLine } from 'react-icons/ri';
import LoadingIcons from 'react-loading-icons';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const EventDetail = ({id, close}: {id:String|undefined, close: () => void}) => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const {loading, schedule, getSingleSchedule} = useSchedule()
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const {deleteSchedule, loading:loadingSchedule, getScheduleConverted} = useSchedule()
  const {setIsOpen, setModelId} = useSheet()
  const [isShowCustomerModal, setIsShowCustomerModal] = React.useState(false)
  const {customers, getAllCustomerNoPaginate} = useCustomer()
  const [loadingPackage, setLoadingPackage]   = useState<any>(false)
  const [userPackage, setUserPackage]         = useState<any>(null)
  const [selectedUserPackage, setSelectedUserPackage] = useState<any>('')
  const [packageOwned, setPackageOwned] = useState<any>([])
  const [user, setUser] = useState('')
  const [selectedUserPackageIndex, setSelectedUserPackageIndex] = useState(null)

  React.useEffect(() => {
    if (id) {
      getSingleSchedule(`${baseUrl}${prefix}/schedule/${id}`)
      getAllCustomerNoPaginate(`${baseUrl}${prefix}/user?type=nopaginate`)
    }
  }, [id])

  const handleDelete = async () => {
    try {
      let scheduleUrl = role == 'admin'
      ? `${baseUrl}${prefix}/schedule`
      : `${baseUrl}${prefix}/my-schedule`

      await deleteSchedule(`${baseUrl}${prefix}/schedule/${id}`)
      await getScheduleConverted(scheduleUrl)
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

  // check if date is yhan or less from now
  const isLessThanNow = (date:string) => {
    const now = new Date()
    const eventDate = new Date(date)
    //  if than return upcoming and less than return completed
    if (eventDate > now){
      return 'upcoming'
    }else{
      return 'completed'
    }
  }

  const addCustomerToSchedule = async () => {
    try {
      const url = `${baseUrl}${prefix}/schedule-set-user/${user}`
      const checkmembershipurl = `${baseUrl}${prefix}/schedule-category-check`
      const resmem:any = await api.post(checkmembershipurl, {
        'schedule_id': id,
        'payment_id': selectedUserPackage.payment_id
      })

      if (!resmem.check){
        throw new Error('This package not elegible for this class');
      }
      
      const res = await api.post(url, {
        'schedule_id': id,
        'payment_id' : selectedUserPackage.payment_id
      })

      getSingleSchedule(`${baseUrl}${prefix}/schedule/${id}`)
      toast.success('Success add user to this class')
    } catch (error:any) {
      toast.error(error?.data?.message ?? error.message)
    }
    setUserPackage([])
    setIsShowCustomerModal(false)
  }

  const getUserPackage = async (idUser:any) => {
    try {
      setLoadingPackage(true)
      const res = await api.get(`${baseUrl}${prefix}/user-get-package/${idUser}?type=nopaginate`)
      setUserPackage(res.data) 
      setLoadingPackage(false)
    } catch (error) {
      setUserPackage([])
      setLoadingPackage(false)
    }
  }

  const handleSelectPackage =  (param:any, index:any) => {
    setPackageOwned(param)
    setSelectedUserPackage(index)
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
        {/* <div className='col-span-6 md:col-span-4'> */}
        <div className='col-span-12 md:col-span-12'>
          <div className='py-3 flex items-center gap-4'>
            <Image src={schedule.image_url} alt={schedule.name} width={100} height={0} className='rounded-lg'/>
            <div>
              {
                isLessThanNow(schedule.date) == 'upcoming'
                ? <Badge className='bg-amber-400'>upcoming</Badge>
                : <Badge className='bg-gray-500'>completed</Badge>
              }
              <div className='text-gray-700 text-lg font-semibold'>{schedule.name}</div>
              <p className='text-gray-500 text-sm'>
              {handleStringToDate(schedule.date)} • {schedule.time} ({schedule.duration} mins) 
              </p>
            </div>
          </div>
          <div className='mt-3 flex items-center gap-4'>
            <RiMapPin2Line className='text-gray-600 text-2xl'/>
            <p className='text-gray-700 text-md'>{schedule.location != undefined &&  schedule.location.name}</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className='border-none'>
              <AccordionTrigger>
                <div className='flex items-center gap-4'>
                  <RiUser3Line className='text-gray-600 text-2xl'/>
                  <div className='flex flex-col items-start'>
                    <p className='text-gray-700 text-sm'>{schedule.customer != undefined && schedule.customer.length} /{schedule.max_order} Customer</p>
                    <p className='text-gray-400 text-xs'>{schedule.customer != undefined && schedule.customer.length} waitlist, 0 canceled</p>
                  </div>
                </div>
              </AccordionTrigger>
                <AccordionContent>
                  {
                    schedule.customer != undefined &&
                    schedule.customer.length > 0 &&
                    schedule.customer.map((customer:any, index:any) => (
                      <Link key={index} href={`/back-office/user/customer/${customer.id}`}>
                        <div className='mt-2 flex items-center gap-2 px-9'>
                          <div
                            style={{
                              backgroundImage: `url(${customer.photo_url ?? ''})`,
                            }}
                            className='w-[25px] h-[25px] rounded-full bg-cover bg-center'
                          >
                          </div>
                          <div className='text-gray-700 text-md'>{customer.name}</div>
                        </div>
                      </Link>
                    ))
                  }
                </AccordionContent>
            </AccordionItem>
          </Accordion>

          {
            schedule.staff != undefined &&
            <div className='mt-2 flex items-center gap-4'>
              <div
                style={{
                  backgroundImage: `url(${schedule.staff.photo_url})`,
                }}
                className='w-[40px] h-[40px] rounded-full bg-cover bg-center'
              >
              </div>
              <div className='text-gray-700 text-md'>{schedule.staff != undefined && schedule.staff.name}</div>
            </div>
          }
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className='border-none'>
              <AccordionTrigger>Describtion</AccordionTrigger>
              <AccordionContent>
                <div dangerouslySetInnerHTML={{ __html: schedule.description }}></div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className='flex justify-end gap-4'>
        {
          CheckAvaibilityAction(permision, 'edit', 'schedule', role) && prefix &&
          <Button onClick={() => handleEditSheet()} size={"sm"} className='w-full' variant={'outline'}>
            <RiEditBoxFill className='text-lg mr-3'/>
            Edit Data
          </Button>
        }
        {/* {
          CheckAvaibilityAction(permision, 'view', 'notes', role) && prefix &&
          <Link href={`/back-office/calendar/schedule/note/${id}`}>
            <Button size={"sm"} className='w-full' variant={'secondary'}>
              <RiStickyNoteFill className='text-lg mr-3'/>
              Add Note
            </Button>
          </Link>
        } */}
        <Button onClick={() => setIsShowCustomerModal(true)} size={"sm"}  className='w-full bg-green-500 text-white hover:bg-green-400'>
          <RiUserAddFill className='text-lg mr-3'/>
          Add Customer
        </Button>
        {
          CheckAvaibilityAction(permision, 'delete', 'schedule', role) && prefix &&
          <Button onClick={() => setShowDeleteModal(true)} size={"sm"}  className='w-full bg-destructive text-white hover:bg-destructive'>
            <RiDeleteBin2Fill className='text-lg mr-3'/>
            Delete class
          </Button>
        }
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
      
      <CustomModal open={isShowCustomerModal} title={`Add Customers`} onOpenChange={() => setIsShowCustomerModal(false)}>
        <Select
          onChange={(newValue, actionMeta) => {
            setUser(newValue?.value)
            getUserPackage(newValue?.value)
          }}
          options={transformToSelect(customers)}
          // isMulti
          name='customer'
        />

        <div className='flex flex-col gap-2'>
          {
            userPackage != null ?
            (
              userPackage.length > 0 ?
              userPackage.map((item:any, index:any) => (
                <div onClick={() => {
                  setSelectedUserPackageIndex(index) 
                  setSelectedUserPackage(item)
                }} key={index} className={`bg-primary/10 px-4 py-1 rounded-lg cursor-pointer ${selectedUserPackageIndex == index ? 'border border-primary' : ''}`}>
                  <p className='text-sm font-semibold text-gray-600'>{item?.package_name}</p>
                  <p className='text-xs'>remain {item?.credit_left} credit, expired on {item?.expired}</p>
                </div>
              ))
              : <div className='text-sm text-red-500'>User Does't have package <Link href={'/back-office/booking/package/create-order'}><b className='text-gray-700'><i>Buy package now</i></b></Link> </div>
            ) : ''
          }
        </div>

        <div>
          <Button onClick={() => addCustomerToSchedule()} disabled={loadingSchedule || packageOwned == null}>
            <RiUserAddLine className='text-lg mr-3'/>
            Add Customer to this class
          </Button>
        </div>
      </CustomModal>
    </>
  )
}

export default EventDetail