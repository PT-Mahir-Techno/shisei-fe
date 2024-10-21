'use client'

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '../mode-toggle'
import { RiArchiveFill, RiArrowDropDownLine, RiBox1Fill, RiCloseLargeFill, RiDashboardFill, RiHome2Line, RiHome5Fill, RiLogoutBoxRFill, RiMenuFill, RiMicOffFill, RiMicrosoftFill, RiPriceTag2Fill, RiSmartphoneFill, RiTicketFill, RiUser3Fill } from 'react-icons/ri'
import { usePathname, useRouter } from 'next/navigation'
import { useProfile } from '@/store/use-profile'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useModal } from '@/store/use-modal'
import CustomModal from '../ui/custoom-dialog'
import { Button } from '../ui/button'
import { useAuth } from '@/hooks/use-auth'
import LoadingIcons from 'react-loading-icons'
import Cookies from 'js-cookie'
import { AuthContex } from '@/providers/auth-provider'


const bgPaths: any[] = [
  '/booking',
  '/package',
];

const NavbarFrontPage = ({withBg = false}:{withBg: boolean}) => {

  const [isHidden, setIsHidden] = useState(false)
  const pathName = usePathname()
  const {data, setData} = useProfile()
  const { logout, loading } = useAuth()
  const router = useRouter()
  const {authState, setAuthState} = useContext(AuthContex)

  const [scrollPosition, setScrollPosition] = useState(0);
  const {isOpen, setIsOpen} = useModal()

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]); 


  const hiddenMenu = () => {
    setIsHidden(!isHidden)
  }

  const handleLogout = async () => {
    let logoutUrl:string = ''

    if (authState._avaibility === 'customer') {
      logoutUrl = '/logout'
    } else if (authState._avaibility === 'admin') {
      logoutUrl = '/admin/logout'
    } else {
      logoutUrl = '/staff/logout'
    }

    await logout(logoutUrl)
    await setData()

    setAuthState({
      _auth: '',
      _is_auth: '',
      _avaibility: ''
    })

    setIsOpen(false)
    router.push('/')
  }

  const handleClickDashboard = () => {
    const redirectUrl = authState._avaibility === 'customer' ? '/customer/dashboard' : '/back-office/dashboard'
    router.push(redirectUrl)
  }

  const handleCLickProfile = () => {
    const redirectUrl = authState._avaibility === 'customer' ? '/customer/my-profile' : '/back-office/profile'
    router.push(redirectUrl)
  }

  return (
    <nav className={` ${scrollPosition > 300 ? 'bg-gray-800/85' : 'bg-slate-800/0'} ${!isHidden && 'backdrop-blur'}  fixed top-0 w-full  z-30 bg-cover bg-center transition-all duration-300`}
      style={
        pathName.startsWith(bgPaths.find((path: any) => path === `/${pathName.split("/")[1]}`)) 
        ? {backgroundImage: 'url("/img/navbar-bg-1.png")'} 
        : {}
      }
      >
        <div className="container w-full py-[20px] flex justify-between items-center">
          <div>
            <Link href={"/"}>
              <Image src="/be-main-logo.png" alt="logo" width={160} height={0}/>
            </Link>
            {/* {pathName.split("/")[1]} */}
          </div>

          <div className={`hidden md:flex text-white font-noto_serif`}>
            <ul className={`flex`}>
              <Link href="/">
                <li className={`${pathName === "/" ? "bg-background text-foreground" : "text-slate-200"} px-3 py-2 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200`}>
                    Home
                </li>
              </Link>
              <Link href="/booking">
                <li className={`${pathName.startsWith("/booking") ? "bg-background text-foreground" : "text-slate-200"} px-3 py-2 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200`}>
                  Booking
                </li>
              </Link>
              <Link href="/package">
                <li className={`${pathName.startsWith("/package") ? "bg-background text-foreground" : "text-slate-200"} px-3 py-2 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200`}>
                  package
                </li>
              </Link>
              <Link href="/studio">
                <li className={`${pathName.startsWith("/studio") ? "bg-background text-foreground" : "text-slate-200"} px-3 py-2 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200`}>
                    Our Studios
                </li>
              </Link>
              <Link href="/about">
                <li className={`${pathName.startsWith("/about") ? "bg-background text-foreground" : "text-slate-200"} px-3 py-2 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200`}>
                    About Us
                </li>
              </Link>
              <Link href="/philosophy">
                <li className={`${pathName.startsWith("/philosophy") ? "bg-background text-foreground" : "text-slate-200"} px-3 py-2 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200`}>
                Philosophy
                </li>
              </Link>
              <Link href="/contact">
                <li className={`${pathName.startsWith("/contact") ? "bg-background text-foreground" : "text-slate-200"} px-3 py-2 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200`}>
                    Contact
                </li>
              </Link>
            </ul>
          </div>
          
          <div className="hidden lg:flex md:flex">
            <div className="flex gap-2 items-center">
              <ModeToggle/>
              {
                data ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className='flex gap-3 items-center bg-white cursor-pointer border border-gray-300 p-1 box-border rounded-full'>
                        <div
                          className='w-8 h-8 rounded-full bg-cover bg-center'
                          style={{ backgroundImage: `url(${data?.photo_url ?? '/img/avatar.png'})` }}
                        >
                          {/* <img src="/img/avatar.png" alt="" className='w-8 h-8 rounded-full' /> */}
                        </div>
                        <div className='hidden lg:flex flex-col justify-start '>
                          <h2 className='text-gray-800 text-sm dark:text-slate-100 Customtruncate'>{data?.name.substring(0, 6) + '..'}</h2>
                          <p className='text-primary text-xs'>{ authState?._avaibility }</p>
                        </div>
                        <div className='hidden lg:block'>
                          <RiArrowDropDownLine className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="py-4 px-2">
                      <DropdownMenuItem>
                        <div onClick={() => handleClickDashboard()} className='flex items-center gap-2 cursor-pointer'>
                          <RiDashboardFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={20}/>
                          Dashboard
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <div onClick={() => handleCLickProfile()} className='flex items-center gap-2 cursor-pointer'>
                          <RiUser3Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={20}/>
                          Profile
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setIsOpen(true)}>
                        <div className='flex items-center gap-2 cursor-pointer'>
                          <RiLogoutBoxRFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={20}/>
                          Log Out
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) :(
                  <Link href={"/login"} className='rounded-full text-sm bg-background text-foreground px-3 py-2'>login / Sign Up</Link>
                )
              }
            </div>
          </div>
          <div className='lg:hidden md:hidden'>
            {
              isHidden
              ? <RiCloseLargeFill onClick={() => setIsHidden(false)} className='text-3xl text-white cursor-pointer lg:hidden md:hidden' />
              :<RiMenuFill onClick={() => setIsHidden(true)} className='text-3xl text-white cursor-pointer lg:hidden md:hidden' />
            }
          </div>
        </div>

        {/* mobile nav */}
        <div id='mobile-nav' className={`lg:hidden md:hidden bg-background z-10 transition-all duration-200 box-content overflow-hidden ${isHidden ? 'translate-x-0 translate-y-0 p-2 w-full h-screen' : '-translate-x-[100%] w-0 h-0'}`}>
          <ul className='p-4 px-8 flex flex-col items-end gap-10 mt-4 text-foreground font-noto_serif'>
          <li>
              <div>
                <div className="flex gap-2 items-center">
                  <ModeToggle/>
                  {
                    data ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className='flex gap-3 items-center bg-white cursor-pointer border border-gray-300 p-1 box-border rounded-full'>
                            <div
                              className='w-8 h-8 rounded-full bg-cover bg-center'
                              style={{ backgroundImage: `url(${data?.photo_url ?? '/img/avatar.png'})` }}
                            >
                              {/* <img src="/img/avatar.png" alt="" className='w-8 h-8 rounded-full' /> */}
                            </div>
                            <div className='flex flex-col justify-start '>
                              <h2 className='text-gray-800 text-sm dark:text-slate-100 Customtruncate'>{data?.name.substring(0, 6) + '..'}</h2>
                              <p className='text-primary text-xs'>{ authState?._avaibility }</p>
                            </div>
                            <div className='block'>
                              <RiArrowDropDownLine className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                            </div>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="py-4 px-2">
                          <DropdownMenuItem>
                            <div onClick={() => handleClickDashboard()} className='flex items-center gap-2 cursor-pointer'>
                              <RiDashboardFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={20}/>
                              Dashboard
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <div onClick={() => handleCLickProfile()} className='flex items-center gap-2 cursor-pointer'>
                              <RiUser3Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={20}/>
                              Profile
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setIsOpen(true)}>
                            <div className='flex items-center gap-2 cursor-pointer'>
                              <RiLogoutBoxRFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={20}/>
                              Log Out
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) :(
                      <Link href={"/login"} className='rounded-full text-sm bg-background text-foreground px-3 py-2'>login / Sign Up</Link>
                    )
                  }
                </div>
              </div>
            </li>
            <li>
              <Link onClick={hiddenMenu} href="/" className='flex gap-2 items-center'>
                Home
                <RiHome5Fill className='text-xl'/>
              </Link>
            </li>
            <li>
              <Link onClick={hiddenMenu} href="/booking" className='flex gap-2 items-center'>
                Booking
                <RiTicketFill className='text-xl'/>
              </Link>
            </li>
            <li>
              <Link onClick={hiddenMenu} href="/package" className='flex gap-2 items-center'>
                Package
                <RiPriceTag2Fill className='text-xl'/>
              </Link>
            </li>
            <li>
              <Link onClick={hiddenMenu} href="/studio" className='flex gap-2 items-center'>
                Our Studios
                <RiBox1Fill className='text-xl'/>
              </Link>
            </li>
            <li>
              <Link onClick={hiddenMenu} href="/about" className='flex gap-2 items-center'>
                About Us
                <RiArchiveFill className='text-xl'/>
              </Link>
            </li>
            <li>
              <Link onClick={hiddenMenu} href="/philosophy" className='flex gap-2 items-center'>
                Philosophy
                <RiMicrosoftFill className='text-xl'/>
              </Link>
            </li>
            <li>
              <Link onClick={hiddenMenu} href="/contact" className='flex gap-2 items-center'>
                Contact
                <RiSmartphoneFill className='text-xl'/>
              </Link>
            </li>
          </ul>
        </div>
        {/* end  mobile nav */}

        <CustomModal 
          open={isOpen} 
          onOpenChange={() => setIsOpen(false)} 
          title='Log Out'
        >
            <div>
              <p className='text-gray-700 my-6 text-center'>are you sure you want to end this session ?</p>
              <div className='flex justify-end gap-4'>
                <Button onClick={() => setIsOpen(false)} variant={"outline"}>Cancel</Button>
                <Button onClick={() => handleLogout()} disabled={loading}>
                  {
                  loading &&
                    <LoadingIcons.Oval stroke='#fff' strokeWidth={5} className="w-4 h-4 mr-3" />
                  }
                  logout
                </Button>
              </div>
            </div>
        </CustomModal>
      </nav>
  )
}

export default NavbarFrontPage