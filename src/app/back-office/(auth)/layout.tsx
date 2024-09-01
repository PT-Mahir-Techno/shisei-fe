import React from 'react'

const AuthBoLayout = ({children}: {children : React.ReactNode}) => {
  return (
    <>
      <div className='w-full h-screen flex'>
        <div className='flex-1 h-screen bg-primary hidden md:flex items-center justify-center shadow-md'>
          <div>
            <h1 className='font-noto_serif font-bold text-3xl text-white '>Welcom Back 👋</h1>
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