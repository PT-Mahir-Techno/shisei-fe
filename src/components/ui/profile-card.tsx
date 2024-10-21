import React from 'react'

const ProfileCard = ({data, loading}:any) => {
  return (
    <>
      <div className='max-w-[360px] min-h-[460px] relative rounded-md group'>
        <img src={data?.photo_url ?? '/img/img_placeholder.png'} alt="" className='w-full h-full rounded-md object-cover' />
        <div className='absolute bottom-0 left-0 right-0 top-0 p-6 rounded-lg bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-90 transition-all duration-200 flex flex-col justify-end'>
          <div className='text-white'>
            <p className='text-lg font-bold'>{data.name}</p>
            <p className='text-sm line-clamp-[8]'>{data?.about ?? '-'}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileCard