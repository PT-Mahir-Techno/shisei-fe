'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'

const NavbarFrontPage = ({withBg = false}:{withBg: boolean}) => {
  return (
    <nav className="fixed top-0 w-full bg-slate-800/20 backdrop-blur z-30 bg-cover"
      style={withBg ? {backgroundImage: 'url("/img/navbar-bg-1.png")'} : {}}
    >
        <div className="container w-full py-[20px] flex justify-between items-center">
          <div>
            <Image src="/be-main-logo.png" alt="logo" width={160} height={0}/>
          </div>

          <div className="hidden lg:flex md:flex text-white font-noto_serif">
            <ul className="flex">
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
        </div>
      </nav>
  )
}

export default NavbarFrontPage