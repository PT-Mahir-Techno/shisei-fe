"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RiAddCircleFill } from "react-icons/ri"
import CustomSheets from "@/components/ui/custom-sheets"
import { Label } from "@/components/ui/label"
import RoomTable from "./_parts/room_table"


const RoomPage = () => {
  const [isOpenSheet, setIsOpenSheet] = React.useState(false)

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">Room</h2>
          <p className="text-gray-500 text-sm">List Room</p>
        </div>
        <div>
          <Button onClick={() => setIsOpenSheet(true)}> <RiAddCircleFill className="mr-2"/> Add Room</Button>
        </div>
      </div>
      
      <RoomTable />
        
      <CustomSheets isOpen={isOpenSheet} title="Add Room" close={() => setIsOpenSheet(false)}>
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="Name" />
          </div>
          <div>
            <Button onClick={() => setIsOpenSheet(false)} className="w-full" size={"lg"}>Save</Button>
          </div>
        </div>
      </CustomSheets>
    </>
  )
}

export default RoomPage
