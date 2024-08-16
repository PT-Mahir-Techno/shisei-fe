import React from 'react'
import HomeLayout from '../layout'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      {children}
    </>
    // <HomeLayout withBg={true}>
    // </HomeLayout>
  )
}

export default layout