import React from 'react'
import NavbarFrontPage from '@/components/partials/navbar-front-page';
import FooterFrontPage from '@/components/partials/footer-front-page';
import MainLayout from '../main-layout';

const HomeLayout = ({children, withBg=false}: {children: React.ReactNode, withBg: boolean}) => {
  return (
    <div className='page-animation'>
      {/* navbar */}
      <NavbarFrontPage withBg={withBg}/>
      {/* end navbar */}

      <MainLayout >
        {children}
      </MainLayout>

      {/* footer */}
      <FooterFrontPage/>
      {/* end footer */}
    </div>
  )
}

export default HomeLayout