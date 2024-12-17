'use client'

import { ModeToggle } from '@/components/mode-toggle'
import {  DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import React, { useContext } from 'react'
import { RiArrowDropDownLine, RiCloseLargeFill, RiDashboardFill, RiFullscreenExitLine, RiFullscreenFill, RiHome2Fill, RiHome3Fill, RiHome4Fill, RiLogoutBoxRFill, RiMenuFill, RiUser3Fill } from 'react-icons/ri'
import CustomModal from '../ui/custoom-dialog'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useProfile } from '@/store/use-profile'
import Cookies from 'js-cookie'
import { AuthContex } from '@/providers/auth-provider'
import LoadingIcons from 'react-loading-icons'
import { Icon } from 'lucide-react'
import Link from 'next/link'

const NavbarBo = () => {

  const {data, role} : any = useProfile()

  const [isOpen, setIsOpen] = React.useState(false)
  const [isFUllScreen, setIsFullScreen] = React.useState(false)
  const { logout, loading } = useAuth()
  const router = useRouter()
  const {authState, setAuthState} = useContext(AuthContex)
  const [isHidden, setIsHidden] = React.useState(false)


  const handleLogout = async () => {
    try {
      const logoutUrl = authState._avaibility === 'customer' ? '/logout' : '/admin/logout'
      const redirectUrl = authState._avaibility === 'customer' ? '/login' : '/back-office/login'
      await logout(logoutUrl)
      setAuthState({
        _auth: '',
        _is_auth: '',
        _avaibility: '',
        _permision: {}
      })
      router.push(redirectUrl)
    } catch (error) {
      const redirectUrl = authState._avaibility === 'customer' ? '/login' : '/back-office/login'
      
      setAuthState({
        _auth: '',
        _is_auth: '',
        _avaibility: '',
        _permision: {}
      })

      Cookies.remove('_auth')
      Cookies.remove('_is_auth')
      Cookies.remove('_avaibility')

      router.push(redirectUrl)
    }
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

  const handleClickDashboard = () => {
    const redirectUrl = authState._avaibility === 'customer' ? '/customer/dashboard' : '/back-office/dashboard'
    router.push(redirectUrl)
  }
  
  const handleCLickProfile = () => {
    const redirectUrl = authState._avaibility === 'customer' ? '/customer/my-profile' : '/back-office/profile'
    router.push(redirectUrl)
  }

  return (
    <div className='fixed right-0 top-0 left-0 w-full'>
      <nav className='w-full min-h-[80px] bg-background shadow flex items-center px-8 justify-between'>
        <div className='lg:hidden md:hidden'>
          {
            isHidden
            ? <RiCloseLargeFill onClick={() => setIsHidden(false)} className='text-3xl text-gray-900 cursor-pointer lg:hidden md:hidden' />
            : <RiMenuFill onClick={() => setIsHidden(true)} className='text-3xl text-gray-900 cursor-pointer lg:hidden md:hidden' />
          }
        </div>
        {/* <Link href={"/"} className={`hidden md:flex`}>
          <Button variant={'secondary'}> 
            <RiHome4Fill size={18} className='mr-3'/>
            Back To Home
          </Button>
        </Link> */}
        <div className='w-1/4'>
        </div>
        <div className='flex items-center gap-4'>
          <div className='hidden md:flex items-center gap-4'>
            {
              !isFUllScreen
              ? <RiFullscreenExitLine onClick={HandleFullScreen} className='text-gray-900 group-hover:text-primary transition-all duration-200 cursor-pointer' size={24}/>
              : <RiFullscreenFill onClick={HandleFullScreen} className='text-gray-900 group-hover:text-primary transition-all duration-200 cursor-pointer' size={24}/>
            }
          <ModeToggle />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex gap-3 items-center cursor-pointer border border-gray-300 p-1 box-border rounded-full'>
                <div className='w-8 h-8 rounded-full bg-cover bg-center'
                style={{ backgroundImage: `url(${data?.photo_url ?? '/img/avatar.png'})` }}>
                </div>
                <div className='hidden md:flex flex-col justify-start '>
                  <h2 className='text-gray-800 text-sm dark:text-slate-100 overflow-clip'>{data?.name}</h2>
                  <p className='text-primary text-xs'>
                    {
                      role ? role : '-'
                    }
                  </p>
                </div>
                <div className='hidden md:block'>
                  <RiArrowDropDownLine className='text-gray-700 group-hover:text-primary transition-all duration-200' size={26}/>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-4 px-2">
              <DropdownMenuItem>
                <div className='flex items-center gap-2 cursor-pointer'
                  onClick={() => handleClickDashboard()}
                >
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
              <Button onClick={handleLogout} disabled={loading}>
                {
                  loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                }
                Logout
              </Button>
            </div>
          </div>
      </CustomModal>

      <div id='mobile-nav' className={`lg:hidden md:hidden bg-background z-10 transition-all duration-200 box-content overflow-hidden ${isHidden ? 'translate-x-0 translate-y-0 p-2 w-full h-screen' : '-translate-x-[100%] w-0 h-0'}`}>
        <ul className='p-4 px-8 flex flex-col items-end gap-10 mt-4 text-foreground font-noto_serif'>
          {/* <li>
            <Link onClick={hiddenMenu} href="/" className='flex gap-2 items-center'>
              Home
              <RiHome5Fill className='text-xl'/>
            </Link>
          </li> */}
        </ul>
      </div>

    </div>
  )
}

export default NavbarBo