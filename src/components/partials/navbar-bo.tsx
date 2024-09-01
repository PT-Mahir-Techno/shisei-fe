'use client'

import { ModeToggle } from '@/components/mode-toggle'
import {  DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { RiArrowDropDownLine, RiDashboardFill, RiFullscreenExitLine, RiFullscreenFill, RiLogoutBoxRFill, RiUser3Fill } from 'react-icons/ri'
import CustomModal from '../ui/custoom-dialog'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const NavbarBo = () => {

  const [isOpen, setIsOpen] = React.useState(false)
  const [isFUllScreen, setIsFullScreen] = React.useState(false)
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  const HandleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(true)
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(false)
    }
  }

  return (
    <>
      <nav className='w-full min-h-[80px] bg-background shadow flex items-center px-8 justify-between'>
        <div className='w-1/4'>
        </div>
        <div className='flex items-center gap-4'>

          {
            !isFUllScreen
            ? <RiFullscreenExitLine onClick={HandleFullScreen} className='text-gray-900 group-hover:text-primary transition-all duration-200 cursor-pointer' size={24}/>
            : <RiFullscreenFill onClick={HandleFullScreen} className='text-gray-900 group-hover:text-primary transition-all duration-200 cursor-pointer' size={24}/>
          }
          
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex gap-3 items-center cursor-pointer border border-gray-300 p-1 box-border rounded-full'>
                <div>
                  <img src="/img/avatar.png" alt="" className='w-8 h-8 rounded-full' />
                </div>
                <div className='hidden md:flex flex-col justify-start '>
                  <h2 className='text-gray-800 text-sm dark:text-slate-100 overflow-clip'>John Doe</h2>
                  <p className='text-primary text-xs'>Customer</p>
                </div>
                <div className='hidden md:block'>
                  <RiArrowDropDownLine className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-4 px-2">
              <DropdownMenuItem>
                <div className='flex items-center gap-2'>
                  <RiDashboardFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={20}/>
                  Dashboard
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className='flex items-center gap-2'>
                  <RiUser3Fill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={20}/>
                  Profile
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <div className='flex items-center gap-2'>
                  <RiLogoutBoxRFill className='text-gray-700 group-hover:text-primary transition-all duration-200' size={20}/>
                  Log Out
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <CustomModal 
        open={isOpen} 
        onOpenChange={() => setIsOpen(false)} 
        title='Log Out'
      >
          <div>
            <p className='text-gray-700 my-6 text-center'>are you sure you want to end this session ?</p>
            <div className='flex justify-end gap-4'>
              <Button onClick={() => setIsOpen(false)} variant={"outline"}>Cancel</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
      </CustomModal>
    </>
  )
}

export default NavbarBo