'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { RiCameraFill, RiPencilFill, RiUser3Fill } from 'react-icons/ri'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custoom-dialog'
import ProfileSetting from './_part/profile-setting'
import PasswordSetting from './_part/password-setting'
import ProfileAdminSetting from './_part/profile-admin'
import LoadingState from '@/components/ui/loading-state'
import { useProfile } from '@/store/use-profile'
import { useActivity } from '@/store/use-activity'
import { formatedDate } from '@/lib/utils'
import toast from 'react-hot-toast'
import { AuthContex } from '@/providers/auth-provider'

const ProfilePage = () => {
  const { authState } = useContext(AuthContex)
  const { _avaibility: avaibility, _prefix: prefix } = authState

  const [mounted, setMounted] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const [currentTab, setCurrentTab] = useState<'profile-setting' | 'password-setting'>('profile-setting')
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: user, role, getPorfile, updateProfile, loading: loadingProfile } = useProfile()
  const { getActivities } = useActivity()

  useEffect(() => {
    setMounted(true)
    // getActivities('/dashboard/activity') // optional
  }, [])

  const handleUpdateImage = async () => {
    try {
      const file = inputRef.current?.files?.[0]
      if (!file) return

      const payload = new FormData()
      payload.append('photo', file)
      Object.entries(user).forEach(([key, value]) => {
        if (value) payload.append(key, value as string)
      })

      await updateProfile(`${prefix}/profile/update-profile`, payload)
      await getPorfile(avaibility === 'admin' ? '/admin/profile' : '/staff/profile')
      toast.success('Update successfully')
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Failed to update image')
    }
  }

  if (!mounted) return null

  const renderHeader = () => (
    <section className='flex justify-between items-center pb-3 mb-6'>
      <div className='flex gap-2 items-center'>
        <RiUser3Fill className='text-primary' size={26} />
        <h2 className='font-noto_serif font-bold text-xl text-gray-800'>My Profile</h2>
      </div>
      <Button onClick={() => setIsShowModal(true)}>
        <RiPencilFill className='mr-2' /> Edit Profile
      </Button>
    </section>
  )

  const renderSidebar = () => (
    <div className='max-w-[300px]'>
      <div className='bg-background p-5 rounded-lg mb-7'>
        <Image
          src={user?.photo_url || '/img/img_placeholder.png'}
          alt='profile photo'
          width={300}
          height={0}
          className='w-full rounded-md object-cover mb-2'
        />
        <h2 className='font-noto_serif font-bold text-xl text-center'>{user?.name}</h2>
        <p className='mb-2 text-gray-400 text-sm text-center'>{role ?? '-'}</p>
        {user?.created_at && (
          <p className='text-primary text-sm text-center'>
            Joined since {formatedDate(user.created_at)}
          </p>
        )}
      </div>
    </div>
  )

  const renderTable = () => (
    <div className='flex-1 max-w-full p-5 bg-background rounded-lg'>
      <div className='font-noto_serif font-bold text-xl pb-2 mb-2 border-b border-gray-200'>Account Information</div>
      <table className='w-full table-auto'>
        <tbody>
          <tr>
            <td className='py-1.5 font-semibold text-gray-500'>Name</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{user?.name ?? '-'}</td>
          </tr>
          {avaibility !== 'admin' && (
            <tr>
              <td className='py-1.5 font-semibold text-gray-500'>Phone</td>
              <td className='py-1.5'>:</td>
              <td className='py-1.5'>{user?.phone ?? '-'}</td>
            </tr>
          )}
          <tr>
            <td className='py-1.5 font-semibold text-gray-600'>Email</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{user?.email ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1.5 font-semibold text-gray-600'>Role</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{avaibility}</td>
          </tr>
          {avaibility !== 'admin' && (
            <>
              <tr>
                <td className='py-1.5 font-semibold text-gray-600'>Address</td>
                <td className='py-1.5'>:</td>
                <td className='py-1.5'>{user?.alamat !== 'null' ? user?.alamat : '-'}</td>
              </tr>
              <tr>
                <td className='py-1.5 font-semibold text-gray-600'>About</td>
                <td className='py-1.5'>:</td>
                <td className='py-1.5'>{user?.about !== 'null' ? user?.about : '-'}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  )

  const renderModal = () => (
    <CustomModal
      open={isShowModal}
      onOpenChange={() => setIsShowModal(false)}
      title='Edit Profile'
      size='max-w-[650px] rounded-lg'
    >
      <div className='flex gap-7 mt-4'>
        {/* Sidebar */}
        <div className='pb-5'>
          <div
            className='relative group w-[200px] h-[200px] bg-cover bg-center bg-no-repeat rounded-md'
            style={{ backgroundImage: `url(${user?.photo_url || '/img/img_placeholder.png'})` }}
          >
            <div
              onClick={() => inputRef.current?.click()}
              className='absolute inset-0 bg-gray-800/50 flex justify-center items-center flex-col opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md cursor-pointer'
            >
              <RiCameraFill className='text-white mb-1' size={28} />
              <p className='text-white text-xs'>Change Photo Profile</p>
              {loadingProfile && <LoadingState isFixed={false} />}
            </div>
            <input
              ref={inputRef}
              type='file'
              className='hidden'
              accept='image/*'
              onChange={handleUpdateImage}
            />
          </div>

          <div className='mt-7'>
            <h2 className='font-noto_serif font-semibold text-xl mb-3'>Setting</h2>
            {['profile-setting', 'password-setting'].map((tab) => (
              <div
                key={tab}
                onClick={() => setCurrentTab(tab as any)}
                className={`${
                  currentTab === tab ? 'bg-accent' : 'border border-gray-200'
                } px-4 py-3 rounded-md text-sm font-semibold cursor-pointer mb-3`}
              >
                {tab === 'profile-setting' ? 'Profile Setting' : 'Password Setting'}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 pl-6 border-l border-gray-200'>
          {currentTab === 'profile-setting' ? (
            avaibility === 'admin' ? (
              <ProfileAdminSetting close={() => setIsShowModal(false)} />
            ) : (
              <ProfileSetting close={() => setIsShowModal(false)} />
            )
          ) : (
            <PasswordSetting close={() => setIsShowModal(false)} />
          )}
        </div>
      </div>
    </CustomModal>
  )

  return (
    <>
      {renderHeader()}
      <section className='flex flex-col lg:flex-row gap-8'>
        {renderSidebar()}
        {renderTable()}
      </section>
      {renderModal()}
    </>
  )
}

export default ProfilePage
