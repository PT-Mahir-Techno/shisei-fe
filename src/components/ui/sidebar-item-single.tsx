// import { Link } from "lucide-react"
// import React from "react"
// import { RiDashboardFill } from "react-icons/ri"

// const sideMenuItemSingle = () => {
//   return (
//     <>
//       <Link href="/back-office">
//         <div className='w-full p-2 bg-secondary flex gap-2 items-center rounded-sm'>
//           {/* {
//            React.createElement(RiDashboardFill) 
//           } */}

//             <RiDashboardFill className='text-2xl text-primary'/> <span className='text-gray-800'>Dashboard</span> 
//         {/* <span className='text-gray-800'>Dashboard</span> */}
//         </div>
//       </Link>
//     </>
//   )
// }

// export default sideMenuItemSingle


import Link from 'next/link'
import React from 'react'
import { RiDashboardFill } from 'react-icons/ri'

const MenuSIngle = () => {
  return (
    <div>
      <Link href="/back-office">
         <div className='w-full p-2 bg-secondary flex gap-2 items-center rounded-sm'>
           {
            React.createElement(RiDashboardFill, { className: 'text-2xl text-primary' }) 
           }

             {/* <RiDashboardFill className='text-2xl text-primary'/> <span className='text-gray-800'>Dashboard</span>  */}
         <span className='text-gray-800'>Dashboard</span>
         </div>
      </Link>
    </div>
  )
}

export default MenuSIngle