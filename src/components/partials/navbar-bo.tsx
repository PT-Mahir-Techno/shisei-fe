'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { DropdownMenu, DropdownMenuCheckboxItemProps, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { RiArrowDropDownLine, RiFullscreenFill } from 'react-icons/ri'

type Checked = DropdownMenuCheckboxItemProps["checked"]

const NavbarBo = () => {

  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  return (
    <nav className='w-full min-h-[80px] bg-background shadow flex items-center px-8 justify-between'>
      <div className='w-1/4'>
      </div>
      <div className='flex items-center gap-4'>
        <RiFullscreenFill className='text-gray-900 group-hover:text-primary transition-all duration-200 cursor-pointer' size={24}/>  
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
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
              disabled
            >
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default NavbarBo