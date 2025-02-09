'use client'

import { CheckAvaibility } from '@/lib/utils'
import { AuthContex } from '@/providers/auth-provider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import { RiAccountPinBoxFill, RiArrowDownSLine, RiArrowRightSLine, RiCalendar2Fill, RiCalendarScheduleFill, RiCircleFill, RiDashboardFill, RiFileList2Fill, RiHotelFill, RiImage2Fill, RiPriceTagFill, RiQuestionnaireFill, RiSettings3Fill, RiShoppingBagFill, RiSquareFill, RiUser3Fill, RiUserFill } from 'react-icons/ri'

const menus = [
]

const SidebarBo = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role }   = authState

  // console.log('sidebar role', role)
  // console.log('sidebar', permision)
  
  const pathName = usePathname()
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
                <Link href={"/"}>
                  <Image src="/be-secondary-logo.png" alt="img" className='mt-3' width={120} height={80} />
                </Link>
              : <Link href={"/"}><Image src="/logo-mark.png" alt="img" className='w-full h-auto mt-3' width={0} height={0} /></Link>
            }
          </div>
          <div onClick={() => handleMinimize()} className='h-8 w-8 bg-secondary rounded-full absolute -right-5 top-8 flex items-center justify-center cursor-pointer hover:bg-primary group transition-all duration-200'>
            <div>
              {/* create elemen riArrw */}
              <RiArrowRightSLine className={`text-xl text-primary group-hover:text-secondary transition-all duration-200 ${ !minimize && 'rotate-180' }`} />
            </div>
          </div>
        </div>

        <ul className='p-4'>

          <li className='mb-3 relative group'>
            <Link href="/back-office/dashboard" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} ${pathName.startsWith('/back-office/dashboard')  && 'bg-secondary/40' } w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
              <RiDashboardFill className={`${pathName.startsWith('/back-office/dashboard')  && 'text-primary' } text-gray-700 group-hover:text-primary transition-all duration-200`} size={26}/>
              <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Dashboard</span> 
            </Link>
            <div className={` ${!minimize && 'hidden'} absolute -right-28  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
              Dashboard
            </div>
          </li>
          
          {/* {
            CheckAvaibility(permision, 'location', role) &&
          } */}
          <li className='mb-3 relative group'>
            <Link href="/back-office/location" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} ${pathName.startsWith('/back-office/location')  && 'bg-secondary/40' } w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                {/* <RiHotelFill className={`${pathName.startsWith('/back-office/location')  && 'text-primary' } text-gray-700 group-hover:text-primary transition-all duration-200`} size={26}/> */}
                {React.createElement(RiHotelFill,{
                  className: `${pathName.startsWith('/back-office/location')  && 'text-primary' } text-gray-700 group-hover:text-primary transition-all duration-200`,
                  size: 26
                })}
                <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Location</span> 
            </Link>
            <div className={` ${!minimize && 'hidden'} absolute -right-20  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
              Location
            </div>
          </li>

          {/* <li className='mb-3 relative group'>
            <Link href="/back-office/schedule" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                <RiCalendarScheduleFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Schedule</span> 
            </Link>
            <div className={` ${!minimize && 'hidden'} absolute -right-28  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
              Schedule
            </div>
          </li> */}
          

          <li className='relative group'>
            <div onClick={() => {
              setIsOpenSub(!isOpenSub)
              setActiveMenu('schedule')
              setMinimize(false)
            }} 
            className={`
              ${minimize && 'justify-center'}
              ${isOpenSub && activeMenu === 'schedule' && 'bg-secondary/40'}
              w-full p-2 hover:bg-secondary/40 flex gap-2 items-center rounded-sm group
            `}>
              <RiCalendar2Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={30}/>
              <span className={`whitespace-pre text-gray-950 duration-500 w-full ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Schedule</span>
              <RiArrowDownSLine className={`text-gray-700 group-hover:text-primary transition-all duration-200 ${(isOpenSub && activeMenu === 'schedule') && 'rotate-180'} ${minimize &&  'hidden'}`} size={20}/>
            </div>
            <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
              Schedule
            </div>

            <ul 
              className={`transition-all duration-300 overflow-hidden bg-secondary/20 rounded-sm mt-2 text-sm ${
                ( isOpenSub == !minimize && activeMenu == "schedule" ) ? 'max-h-[300px] mb-3' : 'max-h-0 invisible '
              }`}
              style={ { transitionDelay: isOpenSub ? '0.1s' : '0s' } }
            >
              <Link href={"/back-office/calendar/schedule"}>
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/>Class</li>
              </Link>
              <Link href={"/back-office/calendar/note"}>
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/>User Notes</li>
              </Link>
            </ul>

          </li>
          
          {/* {
            (CheckAvaibility(permision, 'package', role) || CheckAvaibility(permision, 'validityperiod', role)) && 
          } */}

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
              {/* {
                  CheckAvaibility(permision, 'package', role) &&
              } */}
                <Link href={"/back-office/booking/package"}>
                  <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/>Package</li>
                </Link>
              {/* {
                CheckAvaibility(permision, 'validityperiod', role) &&
                
              } */}
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
              <Link href={"/back-office/transaction/package"}>
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/>Package</li>
              </Link>
              <Link href={"/back-office/transaction/schedule"}>
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/>Schedule</li>
              </Link>
              <Link href={"/back-office/transaction/credit"}>
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/>Credit</li>
              </Link>
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
              <span className={`whitespace-pre text-gray-950 duration-500 w-full ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Account</span>
              <RiArrowDownSLine className={`text-gray-700 group-hover:text-primary transition-all duration-200 ${(isOpenSub && activeMenu === 'user') && 'rotate-180'} ${minimize &&  'hidden'}`} size={20}/>
            </div>
            <div className={` ${!minimize && 'hidden'} absolute -right-20  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
            Account
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
              <Link href={'/back-office/setting/schedule'}>
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/> Schedule</li>
              </Link>
              <Link href={'/back-office/setting/contact'}>
                <li className='py-2 px-4 cursor-pointer flex gap-2 items-center'> <RiCircleFill className='text-primary' size={8}/> Contact</li>
              </Link>
            </ul>

          </li>
        </ul>

        <div className={` ${minimize && 'hidden'} px-6 mb-3 text-sm text-gray-700 dark:bg-gray-200`}>
          <p>- &nbsp; Other menu</p>
        </div>

        <ul className='px-4'>
          
          {/* {
            CheckAvaibility(permision, 'studio', role) &&
          } */}
          <li className='mb-3 relative group'>
            <Link href="/back-office/studio" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                <RiSquareFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={24}/>
                <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Studio</span> 
            </Link>
            <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
              Studio
            </div>
          </li>

          {/* {
            CheckAvaibility(permision, 'galery', role) &&
          } */}
          <li className='mb-3 relative group'>
            <Link href="/back-office/galery" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                <RiImage2Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={24}/>
                <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>Galery</span> 
            </Link>
            <div className={` ${!minimize && 'hidden'} absolute -right-24  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
              Galery
            </div>
          </li>

          {/* {
            CheckAvaibility(permision, 'faq', role) &&
          } */}
          <li className='mb-3 relative group'>
            <Link href="/back-office/faq" onClick={() => setMinimize(false)} className={` ${minimize && 'justify-center'} w-full p-2 flex gap-2 items-center rounded-sm hover:bg-secondary/40 transition-all duration-200 group`}>
                <RiQuestionnaireFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={24}/>
                <span className={`whitespace-pre text-gray-950 duration-500 ${ minimize && ' hidden opacity-0 translate-x-28 overflow-hidden' }`}>faq</span> 
            </Link>
            <div className={` ${!minimize && 'hidden'} absolute -right-20  top-1 bg-background p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm text-primary`}>
              faq
            </div>
          </li>

          {/* {
            CheckAvaibility(permision, 'profile', role) &&
          } */}
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