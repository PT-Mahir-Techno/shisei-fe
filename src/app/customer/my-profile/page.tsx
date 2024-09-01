'use client'

import React from 'react'
import Image from 'next/image'
import { RiCameraFill, RiPencilFill, RiUser3Fill } from 'react-icons/ri'
import ActivityCard from './_part/activity-card'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custoom-dialog'
import ProfileSetting from './_part/profile-setting'
import PasswordSetting from './_part/password-setting'

const MyProfileCustomerPage = () => {

  const [isShowModal, setIsShowModal] = React.useState(false)
  const [currentTab, setCurrentTab]   = React.useState<string>('profile-setting')

  const inputRef = React.useRef<HTMLInputElement>(null)

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
            <Image src="/img/profile.png" alt="logo" width={300} height={0} className='w-full rounded-md object-cover mb-2'/>
            <h2 className='font-noto_serif font-bold text-xl text-gray-800 text-center'>John Doe</h2>
            <p className='mb-2 text-gray-400 text-sm text-center'>Customer</p>
            <p className='text-primary text-sm text-center'>Joined since 10 Aug 2024</p>
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
                  <td className='py-1.5 font-semibold'>John Doe</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Date of birth</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>10 Aug 2024</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Gender</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>Male</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Country</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>Indonesia</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Address</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>Jl. Jend. Sudirman</td>
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
                  <td className='py-1.5 font-semibold'>8K5kS@example.com</td>
                </tr>
                <tr>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>Phone Number</td>
                  <td className='py-1.5 text-gray-500 dark:text-gray-200'>:</td>
                  <td className='py-1.5 font-semibold'>+62 812 3456 7890</td>
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

        <div className='flex-1 max-w-full p-5 bg-background rounded-lg'>
          <div className='font-noto_serif font-bold text-xl text-gray-800 dark:text-gray-200 pb-2 mb-2 border-b border-gray-200'>
            Activity Log
          </div>
          
          {
            Array.from({ length: 4 }).map((_, index) => <ActivityCard key={index}/>)
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
            <div className='relative group'>
              <Image src="/img/profile.png" alt="logo" width={300} height={0} className='w-full rounded-md object-cover mb-2'/>
              <div onClick={() => inputRef.current?.click()} className='absolute bottom-0 right-0 top-0 left-0 bg-gray-800/50 overflow-hidden flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md cursor-pointer'>
                <RiCameraFill className='text-white mb-1' size={28}/>
                <p className='text-white text-xs'>Change Photo Profile</p>
              </div>
              <input type='file' className='hidden' ref={inputRef} accept='image/*' />
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