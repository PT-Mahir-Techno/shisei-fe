import React from 'react'
import Image from "next/image";
import { RiFacebookBoxFill, RiInstagramFill, RiLinkedinBoxFill } from 'react-icons/ri';
import Link from 'next/link';
import NavbarFrontPage from '@/components/partials/navbar-front-page';
import FooterFrontPage from '@/components/partials/footer-front-page';


const HomeLayout = ({children, withBg=false}: {children: React.ReactNode, withBg: boolean}) => {
  return (
    <>
      {/* navbar */}
      <NavbarFrontPage withBg={withBg}/>
      {/* end navbar */}

      {children}

      {/* footer */}
      <FooterFrontPage/>
      {/* end footer */}
    </>
  )
}

export default HomeLayout