'use client'

import Link from 'next/link'
import React from 'react'
import { RiAccountPinBoxFill, RiArrowDownSLine, RiArrowRightSLine, RiCalendarScheduleFill, RiCircleFill, RiDashboardFill, RiFileList2Fill, RiHotelFill, RiImage2Fill, RiPriceTagFill, RiQuestionnaireFill, RiSettings3Fill, RiShoppingBagFill, RiSquareFill, RiUser3Fill, RiUserFill } from 'react-icons/ri'

const SidebarBo = () => {

  const [isOpenSub, setIsOpenSub] = React.useState(false)
  const [activeMenu, setActiveMenu] = React.useState('')
  const [minimize, setMinimize] = React.useState(true)

  const handleMinimize = () => {
    setMinimize(!minimize)
    setIsOpenSub(false)
    setActiveMenu('')
  }

  return (
    <>
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
            <div onClick={() => handleMinimize()} className='h-8 w-8 bg-secondary rounded-full absolute -right-5 top-8 flex items-center justify-center cursor-pointer hover:bg-primary group transition-all duration-200'>
              <div>
                <RiArrowRightSLine className={`text-xl text-primary group-hover:text-secondary transition-all duration-200 ${ !minimize && 'rotate-180' }`} />
              </div>
            </div>
          </div>

          <ul className='p-4'>

            <li className='mb-3 relative group'>
              <Link href="/back-office/dashboard" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                <RiDashboardFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Dashboard</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-28  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Dashboard
              </div>
            </li>

            <li className='mb-3 relative group'>
              <Link href="/back-office/location" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiHotelFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Location</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-20  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Location
              </div>
            </li>

            <li className='mb-3 relative group'>
              <Link href="/back-office/schedule" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiCalendarScheduleFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Schedule</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-28  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Schedule
              </div>
            </li>

            <li className='relative group'>
              <div onClick={() => {
                setIsOpenSub(!isOpenSub)
                setActiveMenu('package')
                setMinimize(false)
              }} 
              className={`
                ${minimize && 'justify-center'}
                ${isOpenSub && activeMenu === 'package' && 'bg-secondary/40'}
                w-full p-2 hover:bg-secondary/40 flex gap-2 items-center rounded-sm group
              `}>
                <RiFileList2Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={30}/>
                <span className={`whitespace-pre text-gray-950 duration-500 w-full ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Booking</span>
                <RiArrowDownSLine className={`text-gray-700 group-hover:text-primary transition-all duration-200 ${(isOpenSub && activeMenu === 'package') && 'rotate-180'} ${minimize &&  'hidden'}`} size={20}/>
              </div>
              <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Booking
              </div>

              <ul 
                className={`transition-all duration-300 overflow-hidden bg-secondary/20 rounded-sm mt-2 text-sm ${
                  ( isOpenSub == !minimize && activeMenu == "package" ) ? 'max-h-[300px] mb-3' : 'max-h-0 invisible '
                }`}
                style={ { transitionDelay: isOpenSub ? '0.1s' : '0s' } }
              >
                <Link href={"/back-office/booking/package"}>
                  <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/>Package</li>
                </Link>
                <Link href={"/back-office/booking/validity-period"}>
                  <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/>Validity Period</li>
                </Link>
              </ul>

            </li>


            <li className='relative group'>
              <div onClick={() => {
                setIsOpenSub(!isOpenSub)
                setActiveMenu('transaction')
                setMinimize(false)
              }} 
              className={`
                ${minimize && 'justify-center'}
                ${isOpenSub && activeMenu === 'transaction' && 'bg-secondary/40'}
                w-full p-2 hover:bg-secondary/40 flex gap-2 items-center rounded-sm group
              `}>
                <RiShoppingBagFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={30}/>
                <span className={`whitespace-pre text-gray-950 duration-500 w-full ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Transaction</span>
                <RiArrowDownSLine className={`text-gray-700 group-hover:text-primary transition-all duration-200 ${(isOpenSub && activeMenu === 'transaction') && 'rotate-180'} ${minimize &&  'hidden'}`} size={20}/>
              </div>
              <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Transaction
              </div>

              <ul 
                className={`transition-all duration-300 overflow-hidden bg-secondary/20 rounded-sm mt-2 text-sm ${
                  ( isOpenSub == !minimize && activeMenu == "transaction" ) ? 'max-h-[300px] mb-3' : 'max-h-0 invisible '
                }`}
                style={ { transitionDelay: isOpenSub ? '0.1s' : '0s' } }
              >
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/>Package</li>
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/>Credit</li>
              </ul>

            </li>

            <li className='relative group'>
              <div onClick={() => {
                setIsOpenSub(!isOpenSub)
                setMinimize(false)
                setActiveMenu('user')
              }} 
              className={`
                ${minimize && 'justify-center'}
                ${isOpenSub && activeMenu === 'user' && 'bg-secondary/40'}
                w-full p-2 hover:bg-secondary/40 flex gap-2 items-center rounded-sm group
              `}>
                <RiAccountPinBoxFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={30}/>
                <span className={`whitespace-pre text-gray-950 duration-500 w-full ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>User</span>
                <RiArrowDownSLine className={`text-gray-700 group-hover:text-primary transition-all duration-200 ${(isOpenSub && activeMenu === 'user') && 'rotate-180'} ${minimize &&  'hidden'}`} size={20}/>
              </div>
              <div className={` ${!minimize && 'hidden'} absolute -right-20  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                User
              </div>

              <ul 
                className={`transition-all duration-300 overflow-hidden bg-secondary/20 rounded-sm mt-2 text-sm ${
                  (isOpenSub === !minimize && activeMenu === 'user') ? 'max-h-[300px] mb-3' : 'max-h-0 invisible '
                }`}
                style={ { transitionDelay: isOpenSub ? '0.1s' : '0s' } }
              >
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/> <Link href={'/back-office/user/admin'}>admin</Link> </li>
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/> <Link href={'/back-office/user/instructor'}>staff</Link> </li>
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/> <Link href={'/back-office/user/customer'}>customer</Link> </li>
              </ul>

            </li>

            <li className='relative group'>
              <div onClick={() => {
                setIsOpenSub(!isOpenSub)
                setActiveMenu('setting')
                setMinimize(false)
              }} 
              className={`
                ${minimize && 'justify-center'}
                ${isOpenSub && activeMenu === 'setting' && 'bg-secondary/40'}
                w-full p-2 hover:bg-secondary/40 flex gap-2 items-center rounded-sm group
              `}>
                <RiSettings3Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={30}/>
                <span className={`whitespace-pre text-gray-950 duration-500 w-full ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Setting</span>
                <RiArrowDownSLine className={`text-gray-700 group-hover:text-primary transition-all duration-200 ${(isOpenSub && activeMenu === 'setting') && 'rotate-180'} ${minimize &&  'hidden'}`} size={20}/>
              </div>
              <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Setting
              </div>

              <ul 
                className={`transition-all duration-300 overflow-hidden bg-secondary/20 rounded-sm mt-2 text-sm ${
                  ( isOpenSub == !minimize && activeMenu == "setting" ) ? 'max-h-[300px] mb-3' : 'max-h-0 invisible '
                }`}
                style={ { transitionDelay: isOpenSub ? '0.1s' : '0s' } }
              >
                <Link href={'/back-office/setting/role'}>
                  <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/> role</li>
                </Link>
                <Link href={'/back-office/setting/permision'}>
                  <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/> permision</li>
                </Link>
              </ul>

            </li>
          </ul>

          <div className={` ${minimize && 'hidden'} px-6 mb-3 text-sm text-gray-700 dark:bg-gray-200`}>
            <p>- &nbsp; Other menu</p>
          </div>

          <ul className='px-4'>

            <li className='mb-3 relative group'>
              <Link href="/back-office/studio" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiSquareFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={24}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Studio</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Studio
              </div>
            </li>

            <li className='mb-3 relative group'>
              <Link href="/back-office/galery" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiImage2Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={24}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Galery</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Galery
              </div>
            </li>

            <li className='mb-3 relative group'>
              <Link href="/back-office/faq" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiQuestionnaireFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={24}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>faq</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-20  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                faq
              </div>
            </li>

            <li className='mb-3 relative group'>
              <Link href="/back-office/profile" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                  <RiUser3Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={24}/>
                  <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Profile</span> 
              </Link>
              <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
                Profile
              </div>
            </li>

          </ul>

        </aside>
    </>
  )
}

export default SidebarBo