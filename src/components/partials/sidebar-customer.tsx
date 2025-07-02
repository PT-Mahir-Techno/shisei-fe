'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { RiArrowDownSLine, RiArrowRightSLine, RiBox1Fill, RiCalendarScheduleFill, RiCircleFill, RiCloseLargeFill, RiCoupon2Fill, RiDashboardFill, RiHome2Fill, RiHome3Fill, RiHotelFill, RiMenuFill, RiMoneyCnyBoxFill, RiPriceTagFill, RiSettings3Fill, RiShareFill, RiShoppingBagFill, RiShoppingBasket2Fill, RiStackFill, RiTicket2Fill, RiUserFill } from 'react-icons/ri'

const SidebarCustomer = ({is_corporate}:any) => {

  const [isOpenSub, setIsOpenSub] = React.useState(false)
  const [activeMenu, setActiveMenu] = React.useState('')
  const [minimize, setMinimize] = React.useState(true)

  return (
    <>
      <div className='hidden lg:block md:block z-50'>
        <aside className={`${ minimize ? 'w-[80px]' : 'w-[260px]' } h-screen bg-background shadow transition-all duration-200`}>
          <div className='mb-8 relative'>
            <div className={`${ minimize ? 'w-[80px]' : 'w-[260px]' } p-4`}>
              {
                !minimize
                ? 
                // <div className='bg-primary rounded-sm p-4 box-border '>
                //     {/* <img src="/be-main-logo.png" alt="img" className='w-full h-auto' /> */}
                // </div>
                  <Link href={"/"}>
                    <img src="/be-secondary-logo.png" alt="img" className='max-h-[60px] mt-3' />
                  </Link>
                : <Link href={"/"}><img src="/logo-mark.png" alt="img" className='w-full h-auto mt-3' /></Link>
              }
            </div>
            <div onClick={() => setMinimize(!minimize)} className='h-8 w-8 bg-secondary rounded-full absolute -right-5 top-8 flex items-center justify-center cursor-pointer hover:bg-primary group transition-all duration-200'>
              <div>
                <RiArrowRightSLine className={`text-xl text-primary group-hover:text-secondary transition-all duration-200 ${ !minimize && 'rotate-180' }`} />
              </div>
            </div>
          </div>

          <ul className='p-4'>

            <li className='mb-3 relative group'>
              <Link href="/" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                <RiHome3Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Home</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-28  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Home
              </div>
            </li>

            <li className='mb-3 relative group'>
              <Link href="/customer/dashboard" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                <RiDashboardFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Dashboard</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-28  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Dashboard
              </div>
            </li>


            <li className='mb-3 relative group'>
              <Link href="/customer/schedule" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiCalendarScheduleFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Schedule</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-28  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Schedule
              </div>
            </li>

            <li className='mb-3 relative group'>
              <Link href="/customer/package" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiStackFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Package</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Package
              </div>
            </li>

            <li className='mb-3 relative group'>
              <Link href="/customer/shared-credit" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiShareFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Shared Credit</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Shared Credit
              </div>
            </li>

            <li className='mb-3 relative group'>
              <Link href="/customer/coupon" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiCoupon2Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Coupon</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Coupon
              </div>
            </li>

            {
              is_corporate &&
              <li className='mb-3 relative group'>
                <Link href="/customer/corporate" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                    <RiBox1Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                    <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Corporate</span> 
                </Link>
                <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                  Corporate
                </div>
              </li>
            }

            <li className='mb-3 relative group'>
              <Link href="/customer/transaction" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiShoppingBasket2Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Transaction</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Transaction
              </div>
            </li>

            <li className='mb-3 relative group'>
              <Link href="/customer/my-profile" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiUserFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>My Profile</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-28  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                My Profile
              </div>
            </li>

            
          </ul>
        </aside>
      </div>
    </>
  )
}

export default SidebarCustomer