import React from 'react'
import NavbarFrontPage from '@/components/partials/navbar-front-page';
import FooterFrontPage from '@/components/partials/footer-front-page';
import MainLayout from '../main-layout';
import { RiWhatsappFill } from 'react-icons/ri';
import Link from 'next/link';

const HomeLayout = ({children, withBg=false}: {children: React.ReactNode, withBg: boolean}) => {
  return (
    <div className='page-animation'>
      {/* navbar */}
      <NavbarFrontPage withBg={withBg}/>
      {/* end navbar */}

      <MainLayout >
        {children}
      </MainLayout>
      

      {/* whatsapp button */}
      <Link
        href="https://wa.me/62895399999999"
        target="_blank"
        className="fixed bottom-5 right-5 z-50 group flex items-center space-x-2"
      >
        <div className="relative">
          <RiWhatsappFill className="w-12 h-12 bg-green-600 hover:bg-green-700 transition-all duration-200 rounded-full p-2.5 text-white" />
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 bg-green-600 text-white px-3 py-1 rounded-md whitespace-nowrap text-sm shadow-lg">
            Hubungi Kami Via Whatsapp
          </div>
        </div>
      </Link>
      {/* end whatsapp button */}

      {/* footer */}
      <FooterFrontPage/>
      {/* end footer */}
    </div>
  )
}

export default HomeLayout