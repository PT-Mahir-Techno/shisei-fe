'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'
import { RiArchiveFill, RiCloseLargeFill, RiHome2Line, RiHome5Fill, RiMenuFill, RiMicOffFill, RiMicrosoftFill, RiSmartphoneFill, RiTicketFill } from 'react-icons/ri'
// import { useRouter } from 'next/router'

const NavbarFrontPage = ({withBg = false}:{withBg: boolean}) => {

  const [isHidden, setIsHidden] = useState(false)
  // const router = useRouter()

  // useEffect(() => {
  //   setIsHidden(false)
  // }, [router])

  return (
    <nav className={`fixed top-0 w-full bg-slate-800/20  z-30 bg-cover ${!isHidden && 'backdrop-blur'}`}
      style={withBg ? {backgroundImage: 'url("/img/navbar-bg-1.png")'} : {}}
    >
        <div className="container w-full py-[20px] flex justify-between items-center">
          <div>
            <Image src="/be-main-logo.png" alt="logo" width={160} height={0}/>
          </div>

          <div className={`hidden md:flex text-white font-noto_serif`}>
            <ul className={`flex`}>
              <li className="px-3 py-2 text-slate-200 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200">
                <Link href="/">Home</Link>
              </li>
              <li className="px-3 py-2 text-slate-200 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200">
                <Link href="/booking">Booking</Link>
              </li>
              <li className="px-3 py-2 text-slate-200 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200">
                <Link href="/about">About Us</Link>
              </li>
              <li className="px-3 py-2 text-slate-200 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200">
                <Link href="/philosophy">Philosophy</Link>
              </li>
              <li className="px-3 py-2 text-slate-200 mx-2 rounded-md cursor-pointer hover:bg-background hover:text-foreground transition-all duration-200">
                <Link href="/contact">Contact</Link>
              </li>
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
              <Link href="/" className='flex gap- items-center'>
                Home
                <RiHome5Fill className='text-xl'/>
              </Link>
            </li>
            <li>
              <Link href="/booking" className='flex gap-2 items-center'>
                Booking
                <RiTicketFill className='text-xl'/>
              </Link>
            </li>
            <li>
              <Link href="/about" className='flex gap-2 items-center'>
                About Us
                <RiArchiveFill className='text-xl'/>
              </Link>
            </li>
            <li>
              <Link href="/philosophy" className='flex gap-2 items-center'>
                Philosophy
                <RiMicrosoftFill className='text-xl'/>
              </Link>
            </li>
            <li>
              <Link href="/contact" className='flex gap-2 items-center'>
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