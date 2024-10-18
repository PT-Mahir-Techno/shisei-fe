'use client'

import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custoom-dialog'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { RiAddBoxFill, RiArrowLeftLine, RiCellphoneFill, RiDeleteBin2Fill, RiEditBoxFill, RiMailCheckFill, RiMap2Fill, RiMapPin2Fill, RiMapPinTimeFill, RiPencilFill, RiSmartphoneFill } from 'react-icons/ri'
import ScheduleStudioForm from '../_parts/schedule-form'
import ContactStudioForm from '../_parts/contact-form'
import FacilityStudioFOrm from '../_parts/facility-form'
import CustomSheets from '@/components/ui/custom-sheets'
import GaleryStudioForm from '../_parts/galery-form'
import { useParams } from 'next/navigation'
import { useStudio } from '@/store/use-studio'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { fail } from 'assert'
import { useModal } from '@/store/use-modal'
import LoadingIcons from 'react-loading-icons'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'

const title = "Detail Studio"

const RenderIcon = (data:any) => {
  if (data.data == "AC"){
    return (
        <Image src='/img/ic_ac.png' width={40} height={40} alt='photo' className='rounded-md'/>
      )
  } 
  if (data.data == ""){
    return (
        <Image src='/img/ic_ac.png' width={40} height={40} alt='photo' className='rounded-md'/>
      )
  } 
}

const StudioDetailPage = () => {
  const {authState} = React.useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false)
  const [isFacilityModalOpen, setIsFacilityModalOpen] = React.useState(false)
  const [isGaleryModalOpen, setIsGaleryModalOpen] = React.useState(false)
  const [studio, setStudio] = React.useState<any>({})
  const {loading, getSingleStudio, contact, openingHours, facilities, galeries} = useStudio()
  const [facilityDeleteLoading, setFacilityDeleteLoading] = React.useState(false)
  const [facilityId, setFacilityId] = React.useState<any>(null)

  const {id} = useParams()

  useEffect(() => {
    initState()
  }, [])
  
  const initState = async () => {
   const res = await getSingleStudio(`${prefix}/studio/${id}`)
    setStudio(res)
  }

  const handleDeleteFacility = async (vacilityId:any) => {
    setFacilityDeleteLoading(true)
    try {
      setFacilityId(vacilityId)
      await api.delete(`${prefix}/studio/${id}/facility/${vacilityId}`)
      await initState()
      toast.success("Success delete facility")
      setFacilityDeleteLoading(false)
    } catch (error) {
      setFacilityId(null)
      setFacilityDeleteLoading(false)
      toast.error("Failed delete facility")
    }
  }
  

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-500 text-sm">Data {title} </p>
        </div>
        <div>
          <Link href={"/back-office/studio"}>
            <Button ><RiArrowLeftLine className="mr-2"/>Back</Button>
          </Link>
        </div>
      </div>

      <div className='w-full px-6 py-4 rounded-lg my-8 grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='bg-background p-4 rounded-md'>
          <div className='mb-3 text-gray-600 font-semibold'>
            Studio Info
          </div>
          <div
            className='w-full h-60 bg-background rounded-md flex items-center justify-center'
            style={{ backgroundImage: `url(${studio.photo_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
          </div>
          <div>
            <h2 className='font-semibold text-gray-600 my-4 text-lg'>{studio.name}</h2>
            <h3 className='text-gray-600 font-semibold mb-4'>{studio.title}</h3>
            <p className='text-gray-600 text-sm mb-4'>{studio.subtitle}</p>
            
            <h3 className='text-gray-600 mb-4 flex '> <RiMapPin2Fill className='mr-2 mt-1'/>{studio?.address}</h3>
            <div className='max-w-md overflow-hidden'>
              <a href="" className='text-primary flex'> <RiMap2Fill className='mr-2 mt-1'/> {studio?.maps}</a>
            </div>
          </div>
        </div>
        <div className='bg-background p-4 rounded-md'>
          <div className='mb-6 text-gray-600 font-semibold flex justify-between items-center'>
            Schedule
            <Button onClick={() => setIsScheduleModalOpen(true)} size={"sm"} variant={"ghost"} className='text-primary'><RiPencilFill className='mr-2'/> Edit</Button>
          </div>
          {
            openingHours == null
            ? <p className='text-gray-600 text-center font-semibold mb-8'>No schedule yet</p>
            : <div className='mb-12'>
                {
                  
                  Object.entries(openingHours).map((item, index) => {
                    if (item[0] != 'id' && item[0] != 'studio_id' && item[0] != 'created_at' && item[0] != 'updated_at'){
                      return (
                        <div key={index} className='flex justify-between items-center mb-3'>
                          <span className='flex items-center gap-3 text-gray-600'>
                            {/* <RiMapPinTimeFill/> */}
                            <p className='font-semibold text-gray-500'>{item[0]}</p>
                          </span>
                          <p className='text-gray-600'>{ item[1] as string }</p>
                        </div>
                      )
                    }
                  })
                }
              </div>
          }

          <div className='mb-6 text-gray-600 font-semibold flex justify-between items-center'>
            <p>Contact</p>
            <Button onClick={() => setIsContactModalOpen(true)} size={"sm"} variant={"ghost"} className='text-primary'><RiPencilFill className='mr-2'/> Edit</Button>
          </div>

          {
            contact == null
            ? <p className='text-gray-600 text-center font-semibold mb-8'>No Contact yet</p>
            : <div>
                <div className='flex justify-between items-center mb-3'>
                  <span className='flex items-center gap-3 text-gray-600'>
                    <RiMailCheckFill/>
                    <p className='font-semibold text-gray-500'>Email</p>
                  </span>
                  <p className='text-gray-600'>{contact?.email}</p>
                </div>
                <div className='flex justify-between items-center mb-3'>
                  <span className='flex items-center gap-3 text-gray-600'>
                    <RiSmartphoneFill/>
                    <p className='font-semibold text-gray-500'>Phone</p>
                  </span>
                  <p className='text-gray-600'>{contact?.phone}</p>
                </div>
                <div className='flex justify-between items-center mb-3'>
                  <span className='flex items-center gap-3 text-gray-600'>
                    <RiCellphoneFill/>
                    <p className='font-semibold text-gray-500'>Fax</p>
                  </span>
                  <p className='text-gray-600'>{contact?.fax}</p>
                </div>
              </div>
          }
          
        </div>
        <div className='bg-background p-4 rounded-md'>
          <div className='mb-6 text-gray-600 font-semibold flex justify-between items-center'>
            Facilities
            <Button onClick={() => setIsFacilityModalOpen(true)} size={"sm"} variant={"ghost"} className='text-primary'><RiAddBoxFill className='mr-2'/> Add</Button>
          </div>
          <div>
          {
              facilities == null
              ? <p className='text-gray-600 text-center font-semibold mb-8'>No gallery yet</p>
              : (
                <div>
                  {
                    facilities.map((item: any, i: number) => (
                      <div className='flex justify-between mb-4' key={i}>
                        <div className='flex gap-2 items-center'>
                          <RenderIcon data={item}/>
                          <p className='text-gray-600'>{item?.facility}</p>
                        </div>
                        {
                          facilityDeleteLoading && facilityId == item?.id
                          ? <p className='text-red-600'>Loading...</p>
                          :  <span onClick={() => handleDeleteFacility(item?.id)} className='flex items-center gap-1 cursor-pointer'>
                              <RiDeleteBin2Fill className='text-red-500'/>
                              <p className='text-red-500 text-sm'>Delete</p>
                            </span>
                        }
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
        <div className='bg-background p-4 rounded-md'>
          <div className='mb-6 text-gray-600 font-semibold flex justify-between items-center'>
            Gallery
            <Button onClick={() => setIsGaleryModalOpen(true)} size={"sm"} variant={"ghost"} className='text-primary'><RiAddBoxFill className='mr-2'/> Add</Button>
          </div>
          <div>
            {
              galeries == null
              ? <p className='text-gray-600 text-center font-semibold mb-8'>No gallery yet</p>
              : (
                <div>
                  {
                    galeries.map((item: any, i: number) => (
                      <div className='flex justify-between mb-4' key={i}>
                        <div className='flex gap-2 items-center'>
                          <Image src={`${item?.photo_url}`} width={80} height={80} alt='photo' className='rounded-md'/>
                        </div>
                        <span className='flex items-center gap-1 cursor-pointer'>
                          <RiDeleteBin2Fill className='text-red-500'/>
                          <p className='text-red-500 text-sm'>Delete</p>
                        </span>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>

      <CustomModal open={isScheduleModalOpen} onOpenChange={() => setIsScheduleModalOpen(false)} title='Set schedule'>
        <ScheduleStudioForm data={studio} id={id} close={() => setIsScheduleModalOpen(false)}/>
      </CustomModal>

      <CustomModal open={isContactModalOpen} onOpenChange={() => setIsContactModalOpen(false)} title='Set contact'>
          <ContactStudioForm close={() => setIsContactModalOpen(false)} data={studio} id={id} />
      </CustomModal>

      <CustomModal open={isFacilityModalOpen} onOpenChange={() => setIsFacilityModalOpen(false)} title='Set facility'>
        <FacilityStudioFOrm close={() => setIsFacilityModalOpen(false)} id={id}/>
      </CustomModal>
      
      <CustomModal open={isGaleryModalOpen} onOpenChange={() => setIsGaleryModalOpen(false)} title='Set galery'>
          <GaleryStudioForm close={() => setIsGaleryModalOpen(false)} id={id}/>
      </CustomModal>

      {/* <CustomModal open={isGaleryModalOpen} onOpenChange={() => setIsGaleryModalOpen(false)} title='Set galery'>
      </CustomModal> */}

    </>
  )
}

export default StudioDetailPage