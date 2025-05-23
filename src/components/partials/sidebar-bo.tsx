'use client'

import { AuthContex } from '@/providers/auth-provider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { menus } from '@/lib/variable'
import { RiArrowDownSLine, RiArrowRightSLine, RiCircleFill } from 'react-icons/ri'
import { CheckAvaibility, CheckAvaibilityGroup } from '@/lib/utils'

const SidebarBo = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role }   = authState

  console.log('sidebar role', role)
  console.log('sidebar', permision)
  
  const pathName = usePathname()
  const [isOpenSub, setIsOpenSub] = React.useState(false)
  const [activeMenu, setActiveMenu] = React.useState('')
  const [minimize, setMinimize] = React.useState(true)
  const [isClient, setIsClient] = useState(false);

  const handleMinimize = () => {
    setMinimize(!minimize)
    setIsOpenSub(false)
    setActiveMenu('')
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className='z-50'>
      <aside className={`${ minimize ? 'w-[80px]' : 'w-[260px]' } h-screen bg-background shadow transition-all duration-200`}>
        <div className='mb-8 relative'>
          <div className={`${ minimize ? 'w-[80px]' : 'w-[260px]' } p-4`}>
            {
              !minimize
              ? 
                <Link href={"/"}>
                  <Image src="/be-secondary-logo.png" alt="img" className='mt-3' width={160} height={0} />
                </Link>
              : <Link href={"/"}><Image src="/logo-mark.png" alt="img" className='w-full h-auto mt-3' width={120} height={0} /></Link>
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
          {
            menus.map((menu:any, index:any) => {
              if (!menu.children){
                if (CheckAvaibility(permision, menu.name, role)){
                  return (
                    <li key={index} className='mb-3 relative group'>
                      <Link href={menu?.path} 
                        onClick={() => setMinimize(false)} 
                        className={` ${minimize && 'justify-center'} ${pathName.startsWith(menu?.path)  && 'bg-secondary/50' } item-menu transition-o group`}
                      >
                        {
                          React.createElement(
                            menu?.icon, { 
                              className: `${pathName.startsWith(menu?.path)  && 'text-primary' } icon-menu transition-o` ,
                              size: 23
                            }
                          )
                        }
                        <span className={`text-menu text-[15px] ${ minimize && 'text-menu-hidden' }`}>{menu?.title}</span> 
                      </Link>
                      <div className={` ${!minimize && 'hidden'} menu-label transition-o`}>
                        {menu?.title}
                      </div>
                    </li>
                  )
                }
              }else {
                if (CheckAvaibilityGroup(permision, menu?.group, role)){
                  return (
                    <li key={index} className='relative group'>
                      <div onClick={() => {
                        setIsOpenSub(!isOpenSub)
                        setActiveMenu(menu?.name)
                        setMinimize(false)
                      }} 
                      className={`
                        ${minimize && 'justify-center'}
                        ${isOpenSub && activeMenu === menu?.name && 'bg-secondary/40' }
                        item-menu-multi group
                      `}>
  
                        <div className='flex gap-4 items-center'>
                          {
                            React.createElement(
                              menu?.icon, { 
                                className: `${isOpenSub && activeMenu === menu?.name && 'text-primary' } icon-menu transition-o` ,
                                size: 23
                              }
                            )
                          }
                          <span className={`text-menu text-menu text-[15px] ${ minimize && 'text-menu-hidden' }`}>{menu?.title}</span>
                        </div>
  
                        <RiArrowDownSLine className={`item-menu-multi-arrow transition-o ${(isOpenSub && activeMenu === menu?.name) && 'rotate-180'} ${minimize &&  'hidden'}`} size={16}/>
                      </div>
                      <div className={` ${!minimize && 'hidden'} menu-label transition-o`}>
                        {menu?.title}
                      </div>
  
                      <ul 
                        className={`item-menu-multi-child-wrapper transition-o ${
                            ( isOpenSub == !minimize && activeMenu == menu?.name ) 
                            ? 'max-h-[300px] mb-3' 
                            : 'max-h-0 invisible '
                          }`
                        }
                        style={ { transitionDelay: isOpenSub ? '0.1s' : '0s' } }
                      >
                        {
                          menu?.children?.map((menu:any, index:any) => {
                            if (CheckAvaibility(permision, menu.name, role)){
                              return (
                                <Link href={menu?.path} key={index}>
                                  <li className='item-menu-multi-sub'> <RiCircleFill className='text-primary' size={8}/> {menu?.title}</li>
                                </Link>
                              )
                            }
                          })
                        }
                      </ul>
  
                    </li>
                  )
                }
              }
            })
          }

        </ul>

      </aside>
    </div>
  )
}

export default SidebarBo