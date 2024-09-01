"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { RiAddCircleFill } from "react-icons/ri"
import CustomSheets from "@/components/ui/custom-sheets"
import InstructorForm from "./_parts/form"

const InstructorPage = () => {
  const [isOpenSheet, setIsOpenSheet] = React.useState(false)
  const title = "Instructor"

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">{title}</h2>
          <p className="text-gray-500 text-sm">List {title}</p>
        </div>
        <div>
          <Button onClick={() => setIsOpenSheet(true)}> <RiAddCircleFill className="mr-2"/> Add {title}</Button>
        </div>
      </div>
      
      {/* <RoomTable /> */}
        
      <CustomSheets isOpen={isOpenSheet} title={`Add ${title}`} close={() => setIsOpenSheet(false)}>
        <InstructorForm action={() => setIsOpenSheet(false)} />
      </CustomSheets>
    </>
  )
}

export default InstructorPage
