import React from 'react'

const AuthBoLayout = ({children}: {children : React.ReactNode}) => {
  return (
    <>
      <div className='w-full h-screen flex'>
        <div className='flex-1 h-screen bg-primary hidden md:flex items-center justify-center shadow-md'>
          <div className='bg-white/20 p-10  rounded-2xl'>
            <h1 className='font-noto_serif font-bold text-3xl text-white '>Hi Welcom Back 👋</h1>
            <p className='max-w-md text-white py-6'>“If you listen to your fears, you will die never knowing what a great person you might have been.”</p>
          </div>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          {children}
        </div>
      </div>
    </>
  )
}

export default AuthBoLayout