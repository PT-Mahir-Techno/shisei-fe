'use client'

import React from 'react'
import { motion} from "framer-motion";
import { usePathname } from 'next/navigation';

const MainLayout = ({children}: {children: React.ReactNode}) => {
  const location = usePathname();
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>
    </>
  )
}

export default MainLayout