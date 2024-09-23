'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { RiCameraFill, RiHistoryFill, RiPencilFill, RiUser3Fill } from 'react-icons/ri'
import ActivityCard from './_part/activity-card'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custoom-dialog'
import ProfileSetting from './_part/profile-setting'
import PasswordSetting from './_part/password-setting'
import { useProfile } from '@/store/use-profile'
import { formatedDate } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useActivity } from '@/store/use-activity'
import LoadingState from '@/components/ui/loading-state'
import { Skeleton } from '@/components/ui/skeleton'

const MyProfileCustomerPage = () => {

  const [isShowModal, setIsShowModal] = React.useState(false)
  const [currentTab, setCurrentTab]   = React.useState<string>('profile-setting')
  const {data:user, role, getPorfile, updateProfile, loading:loadingProfile} = useProfile()
  const { activities, getActivities, loading:loadingActivities } = useActivity()

  const inputRef = React.useRef<HTMLInputElement>(null)


  const initState = async () =>{
    await getActivities('/dashboard/activity')
  }

  useEffect(() => {
    initState()
  }, [])

  const handleUpdateImage = async () => {
    try {
      const payload = new FormData()
      const file = inputRef.current?.files?.[0]
      if (file){
        payload.append('photo', file)
      }
      Object.keys(user).map((key) => {
        payload.append(key, user[key])
      })
      
      await updateProfile('/dashboard/profile/update-profile', payload)
      await getPorfile('/dashboard/profile')

      toast.success('Update successfully')
    } catch (error:any) {
        toast.error(error.data.message)
    }
  }

  // const handleSelectImage = () => {
  //   inputRef.current?.click()
  // }

  return (
    <>
      <section className='flex justify-between items-center pb-3 mb-6'>
        <div className='flex gap-2 items-center'>
          <RiUser3Fill className='text-primary' size={26} />
          <h2 className='font-noto_serif font-bold text-xl text-gray-800'>My Profile</h2>
        </div>
        <Button onClick={() => setIsShowModal(true)}> <RiPencilFill className='mr-2'/> Edit Profile</Button>
      </section>

      <section className='flex gap-8 flex-col lg:flex-row'>
        <div className='max-w-[300px]'>
          <div className='bg-background p-5 rounded-lg mb-7'>
            <Image src={user?.photo_url ? user.photo_url : '/img/img_placeholder.png'} alt="logo" width={300} height={0} className='w-full rounded-md object-cover mb-2'/>
            <h2 className='font-noto_serif font-bold text-xl text-gray-800 text-center'>{user?.name}</h2>
            <p className='mb-2 text-gray-400 text-sm text-center'>{role ?? '-'}</p>
            <p className='text-primary text-sm text-center'>Joined since {formatedDate(user?.created_at)}</p>
          </div>
          <div className='bg-background p-5 rounded-lg'>
            <h2 className='font-noto_serif font-bold text-xl text-gray-800 mb-5'>My Booking</h2>
            <div className='pb-2 mb-5 border-b border-gray-200'>
              <p className='text-primary'>Active Package</p>
              <p className='text-gray-800 dark:text-gray-200 font-semibold'>4 Session Package</p>
            </div>
            <div className='pb-2 mb-5 border-b border-gray-200'>
              <p className='text-primary'>My Schedule</p>
              <p className='text-gray-800 dark:text-gray-200 font-semibold'>
                Private Reformer Class B - 08 August 2024, 8:15 AM, 50 mins
              </p>
            </div>
          </div>
        </div>

        <div className='flex-1 max-w-full p-5 bg-background rounded-lg'>
          <div className='font-noto_serif font-bold text-xl text-gray-800 dark:text-gray-200 pb-2 mb-2 border-b border-gray-200'>
            Personal Information
          </div>
          <div className='mb-16'>
            <table className='w-full table-auto'>
              <tbody>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Name</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>{user?.name ?? '-'}</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Date of birth</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>{user?.birth ?? '-' }</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Gender</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>{user?.gender ?? '-'}</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Country</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>{user?.country ?? '-'}</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Address</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>{user?.address ?? '-'}</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Status</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>Customer</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='font-noto_serif font-bold text-xl text-gray-800 dark:text-gray-200 pb-2 mb-2 border-b border-gray-200'>
            Account Information
          </div>
          <p className='mb-4 text-gray-600 dark:text-gray-300'>Communications and transactions history will be sent to this email address</p>
          <div className='mb-16'>
            <table className='w-full table-auto'>
              <tbody>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Email Address</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>{user?.email ?? '-'}</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Phone Number</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>{user?.phone ?? '-'}</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Password</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>********</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='relative flex-1 max-w-full p-5 bg-background rounded-lg'>
          <div className='pb-2 mb-4 border-b border-gray-200 flex justify-between items-center'>
            <p className='font-noto_serif font-bold text-xl text-gray-800 dark:text-gray-200'>Activity Log</p>
            <div className='flex gap-2 items-center'>
              <RiHistoryFill/>
              <p className='text-gray-600 text-sm'> latest activities</p>
            </div>
          </div>
          
          {
            loadingActivities 
            ? (
              <div className='flex flex-col gap-3'>
                {
                  Array(10).fill(0).map((_, index) => (
                    <div key={index}>
                      <Skeleton key={index} className="w-[200px] h-4 mb-2" />
                      <Skeleton key={index} className="w-full h-12" />
                    </div>
                  ))
                }
              </div>
            )
            :(
              <div>
                {
                  activities.map((activity, index) => (
                    <ActivityCard key={index} data={activity} />
                  ))
                }
              </div>
            )
          }

        </div>

      </section>

      <CustomModal 
        open={isShowModal} 
        onOpenChange={() => setIsShowModal(false)} 
        title="Edit Profile"
        size='max-w-[430px] md:max-w-[600px] lg:max-w-[650px] rounded-lg'
      >
        <div className='flex gap-7 mt-4'>
          
          <div className='pb-5'>
            <div className='relative group rounded-md  w-[200px] h-[200px] bg-cover bg-center bg-no-repeat'
              style={{backgroundImage: `url(${user?.photo_url ?? '/img/img_placeholder.png'})`}}
            >
              <div onClick={() => inputRef.current?.click()} className='absolute bottom-0 right-0 top-0 left-0 bg-gray-800/50 overflow-hidden flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md cursor-pointer'>
                <RiCameraFill className='text-white mb-1' size={28}/>
                <p className='text-white text-xs'>Change Photo Profile</p>
                {
                  loadingProfile &&
                  <LoadingState isFixed={false} />
                }
              </div>
              <input onChange={() => handleUpdateImage()} type='file' className='hidden' ref={inputRef} accept='image/*' />
            </div>

            <div className='mt-7'>
              <h2 className='font-noto_serif font-semibold text-xl text-gray-800 mb-3'>Setting</h2>
              <div 
                onClick={() => setCurrentTab('profile-setting')} 
                className={`${currentTab == 'profile-setting' ? 'bg-accent' : ' border border-gray-200'} px-4 py-3 rounded-md text-gray-800 font-semibold text-sm cursor-pointer mb-3`}>
                Profile Setting
              </div>
              <div 
                onClick={() => setCurrentTab('password-setting')} 
                className={`${currentTab == 'password-setting' ? 'bg-accent' : ' border border-gray-200'} px-4 py-3 rounded-md text-gray-800 font-semibold text-sm cursor-pointer mb-3`}>
                Password Setting
              </div>
            </div>
          </div>
          <div className='flex-1 pl-6 border-l border-gray-200'>
              {
                currentTab === 'profile-setting' &&
                <ProfileSetting close={() => setIsShowModal(false)}/>
              }
              {
                currentTab === 'password-setting' &&
                <PasswordSetting close={() => setIsShowModal(false)}/>
              }
          </div>
        </div>
      </CustomModal>
    </>
  )
}

export default MyProfileCustomerPage