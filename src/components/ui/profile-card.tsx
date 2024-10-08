import React from 'react'

const ProfileCard = () => {
  return (
    <>
      <div className='max-w-[360px] min-h-[470px] relative rounded-md group'>
        <img src="/img/person-1.png" alt="" className='w-full h-full rounded-md object-cover' />
        <div className='absolute bottom-0 left-0 right-0 top-0 p-6 rounded-lg bg-gradient-to-t from-primary to-transparent opacity-0 group-hover:opacity-80 transition-all duration-200 flex flex-col items-center justify-end'>
          <div className='text-white'>
            <p className='text-lg font-noto_serif font-bold'>Shinichi Fukawa</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileCard