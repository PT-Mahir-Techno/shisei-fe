'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '../mode-toggle'
import { RiArchiveFill, RiCloseLargeFill, RiHome2Line, RiHome5Fill, RiMenuFill, RiMicOffFill, RiMicrosoftFill, RiSmartphoneFill, RiTicketFill } from 'react-icons/ri'
import { usePathname } from 'next/navigation'

const bgPaths: any[] = [
  '/booking',
];

const NavbarFrontPage = ({withBg = false}:{withBg: boolean}) => {

  const [isHidden, setIsHidden] = useState(false)
  const pathName = usePathname()

  const [scrollPosition, setScrollPosition] = useState(0);

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
              <Link href={"/login"} className='rounded-full text-sm bg-background text-foreground px-3 py-2'>login / Sign Up</Link>
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
        <div id='mobile-nav' className={`lg:hidden md:hidden bg-gray-900 z-10 transition-all duration-200 box-content overflow-hidden ${isHidden ? 'translate-x-0 translate-y-0 p-2 w-full h-screen' : '-translate-x-[100%] w-0 h-0'}`}>
          <ul className='p-4 flex flex-col items-end gap-10 mt-4 text-white font-noto_serif'>
            <li>
              <Link onClick={hiddenMenu} href="/" className='flex gap- items-center'>
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
      </nav>
  )
}

export default NavbarFrontPage