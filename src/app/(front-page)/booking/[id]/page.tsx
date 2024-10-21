'use client'

import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custoom-dialog'
import Link from 'next/link'
import React, { use, useContext, useEffect } from 'react'
import { RiCalendar2Fill, RiCalendarScheduleLine, RiMapPin2Fill, RiMapPin2Line, RiQuestionFill, RiRefundLine, RiTimeFill, RiUser3Fill, RiVerifiedBadgeFill } from 'react-icons/ri'

import "../../../styles/animations.css";
import { AuthContex } from '@/providers/auth-provider'
import { useSchedulePage } from '@/store/use-schedule-page'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { baseUrl } from '@/lib/variable'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import ActivePackageCard from './_parts/active_package'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { date } from 'zod'
import LoadingIcons from 'react-loading-icons'
import { useProfile } from '@/store/use-profile'
import { useMediaQuery } from 'react-responsive'
const DetailBookingPage = () => {
  
  const {authState} = useContext(AuthContex)
  const {loading, getSingleSchedule, schedule } = useSchedulePage()
  const {data:user} = useProfile()
  const [showCancelModal, setShowCancelModal] = React.useState<boolean>(false)
  const [packages, setPackages] = React.useState<any>([])
  const [packageSelected, setPackageSelected] = React.useState<any>(null)
  const [isModalSuccess, setIsModalSuccess] = React.useState(false)
  const [loadingBooking, setLoadingBooking] = React.useState(false)
  const [isBooked, setIsBooked] = React.useState(false)

  const param = useParams()
  const router = useRouter()
  const {id} = param

  const isMobile = useMediaQuery({
    query: '(max-width: 900px)'
  })

  useEffect(() => {
    getSingleSchedule(`/schedule/${id}`)
    if (authState._auth && authState._is_auth && authState._avaibility) {
      initState()
    }
  }, [param])

  const initState = async () => {
    try {
      const res = await api.get(`${baseUrl}/dashboard/package`)
      // if (schedule.calendar){
      //   schedule.calendar.map((item:any, key:any) => {
      //     if (item.user_id == user.id){
      //       setIsBooked(true)
      //     }
      //   })
      // }

      setPackages(res.data)
    } catch (error:any) {
    }
  }

  const handlePackageSelect = (data:any) =>  {
    const find = packages.find((item:any) => item.membership_id === data)
    setPackageSelected(find)
  }
  
  const handleBookingSchedule =  async () =>{
    setLoadingBooking(true)
    try {
      const payload = {
        payment_id: packageSelected.payment_id,
        package_id: id,
      }
      const header = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      };
      const res = await api.post(`${baseUrl}/dashboard/set-schedule`, payload, header)
      setLoadingBooking(false)
      if (res){
        setIsModalSuccess(true)
      }
    } catch (error:any) {
      setLoadingBooking(false)
      toast.error(error.data.message)
    }
  }

  const handleBuyPackage = () => {
    router.push('/package')
  }

  return (
    <div className='page-animation'>
      <div className='container pt-20 pb-10 mt-20'>
        <div className={"font-noto_serif text-3xl font-bold text-gray-700 dark:text-slate-300"}>Booking.</div>
      </div>
      <div className='container flex flex-wrap gap-4 mb-16'>
        
        <div className='flex-1 border border-slate-200 dark:border-slate-700 rounded-lg p-5'>
          <div>
            <img src={schedule?.image_url ?? '/img/img_placeholder.png'} alt="logo" className='w-full max-h-[477px] object-cover rounded-lg'/>
          </div>
          
          {
            loading 
            ? 
            (
              <Skeleton className="w-full h-10 mt-4 mb-8" />
            )
            : (
              <div>
                <h2 className='font-noto_serif font-bold text-2xl text-gray-600 mt-4 mb-8 dark:text-slate-300'>{schedule?.name}</h2>
              </div>
            )
          }
          {/* <p className='text-sm text-primary mb-4'>2 classes remaining</p> */}
          

          {/* {
            authState._is_auth && authState._auth && authState._avaibility && packages.length <= 0 
            && (
              <div className='text-sm text-destructive mb-12'>You do not have an eligible package, Buy a package to continue booking.</div>
            )
          } */}
        
          {
            authState._is_auth && authState._auth && authState._avaibility && packages.length > 0 ?
            ( 
              <div>
                {
                  packageSelected ? (
                    <ActivePackageCard data={packageSelected} />
                  ) : null
                }
              </div>
            )
            : null
          }
          
          <h2 className='font-bold text-xl text-gray-600 dark:text-slate-300 border-b border-slate-300 pb-4 mb-4'>Description</h2>
          {
            loading 
            ? 
            (
              <div className='flex flex-col gap-4'>
                {
                  Array(10).fill(0).map((_, index) => (
                    <Skeleton key={index} className="w-full h-6 " />
                  ))
                }
              </div>
            )
            : (
              <div>
                <p className='text-md text-gray-700 dark:text-slate-300 leading-relaxed' dangerouslySetInnerHTML={{ __html: schedule?.description }}>
                </p>
              </div>
            )
          }
        </div>
        
        {/* side */}
        <div className='w-full h-auto md:w-2/6'>

          <div className='border border-slate-200 dark:border-slate-600 rounded-lg p-5 mb-5'>
            <div className='font-noto_serif font-bold text-gray-700 text-2xl border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              Your Schedule
            </div>

            {
              loading
              ? <div className='flex flex-col gap-4'>
                {
                  Array(10).fill(0).map((_, index) => (
                    <div key={index}>
                      <Skeleton className="w-1/4 h-4 mb-4" />
                      <Skeleton className="w-full h-10 " />
                    </div>
                  ))
                }
              </div>
              : (
                <div>
                  <div className='font-noto_serif font-bold text-gray-700 text-xl border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
                    {schedule?.name}
                  </div>
                  
                  <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
                    <div className='flex items-center gap-2 mb-1'>
                      <RiCalendar2Fill className='text-primary text-xl'/>
                      <span className='text-lg'>Date</span>
                    </div>
                    <div className='text-xl font-bold'>
                      {schedule?.date}
                    </div>
                  </div>

                  <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
                    <div className='flex items-center gap-2 mb-1'>
                      <RiTimeFill className='text-primary text-xl'/>
                      <span className='text-lg'>Time and duration</span>
                    </div>
                    <div className='text-xl font-bold'>
                      {schedule?.time}, {schedule?.duration} mins
                    </div>
                  </div>

                  <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
                    <div className='flex items-center gap-2 mb-1'>
                      <RiUser3Fill className='text-primary text-xl'/>
                      <span className='text-lg'>Instructor</span>
                    </div>
                    <div className='text-xl font-bold'>
                      {schedule?.staff?.name}
                    </div>
                  </div>

                  <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
                    <div className='flex items-center gap-2 mb-1'>
                      <RiMapPin2Fill className='text-primary text-xl'/>
                      <span className='text-lg'>Location</span>
                    </div>
                    <div className='text-xl font-bold'>
                      {schedule.location?.name}
                    </div>
                  </div>

                </div>
              )
            }


          </div>
          <div className='relative'>
            <div className={`${isMobile ? 'fixed top-[70%] left-[8%] right-[8%] bg-white p-8 rounded-t-xl drop-shadow-[0_0px_22px_rgba(0,0,0,0.50)] z-20' : ''}`}>

              <p className='text-primary mb-6'>Cancel before one day prior</p>
              {
                authState._is_auth && authState._auth && authState._avaibility && packages.length > 0
                ? (
                  <div>
                    {
                      isBooked ?
                      (
                        <Button className='w-full mb-3' size={"lg"}>BOOKED</Button>
                      ):(
                        <div>
                          <div className='mb-3'>
                            <div className='text-gray-600 mb-2 text-sm font-semibold'>Select package</div>
                              <Select onValueChange={(e) => handlePackageSelect(e)}>
                                  <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Package" />
                                </SelectTrigger>
                                <SelectContent>
                                  {packages.map((item:any, index:number) => (
                                    <SelectItem key={index} value={item.membership_id}>{item.name} | {item.credit_left} credit left </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          </div>

                          <Button onClick={() => handleBookingSchedule()} disabled={packageSelected == null || loadingBooking} className='w-full mb-4' size={"lg"} >
                            {
                              loadingBooking && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                            }
                            Book Now
                          </Button>
                        </div>
                      )
                    }
                    <p className='text-center text-primary'>Check-in 3 hours before class begins</p>
                  </div>
                )
                : null
              }

              

              {
                packages.length === 0
                ? (
                  <div className='mb-2'>
                    <Button onClick={() => handleBuyPackage()} className='w-full mb-3' size={"lg"}>BUY PACKAGE</Button>
                  </div>
                ): null
              }

            </div>
          </div>

        </div>
        {/* end side */}
      </div>

      <CustomModal open={showCancelModal} onOpenChange={() => setShowCancelModal(false)}>
        <div className='flex flex-col items-center'>
          <RiQuestionFill className='text-primary mb-3' size={50}/>
          <h1 className='font-noto_serif font-bold text-2xl mb-3'>Cancel Booking</h1>
          <p className='text-sm text-gray-500 mb-5'>Are you sure you want to cancel this booking?</p>
          <div className='flex gap-3'>
            <Button onClick={() => setShowCancelModal(false)} variant={"outline"} className='w-full' size={"lg"}>Back</Button>
            <Button className='w-full' size={"lg"}>yes Cancel</Button>
          </div>
        </div>
      </CustomModal>

      <CustomModal open={isModalSuccess} onOpenChange={() => setIsModalSuccess(false)}>
          <div className='flex flex-col items-center'>
            <RiVerifiedBadgeFill size={60} className='text-primary mb-1'/>
            <p className='text-2xl text-primary mb-2'>Thank You</p>
            <h2 className='font-noto_serif font-bold text-xl'>Your reservation is finished.</h2>
            <p className='text-gray-700 mb-5'>Thank you for choosing our service</p>
            <Link href='/customer/dashboard' className='bg-primary hover:bg-primary/50 rounded-lg py-3 px-4 text-white transition-all duration-300' >Continue to dashboard</Link>
          </div>
      </CustomModal>
    </div>
  )
}

export default DetailBookingPage