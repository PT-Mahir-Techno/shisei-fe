'use client'

import { Button } from '@/components/ui/button'
import CustomSheets from '@/components/ui/custom-sheets'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import PackageTable from './_parts/package-table'

const PackagePage = () => {
  const [isOpenSheet, setIsOpenSheet] = React.useState(false)

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100">Package</h2>
          <p className="text-gray-500 dark:text-gray-100 text-sm">List Package</p>
        </div>
        <div>
          <Button onClick={() => setIsOpenSheet(true)}> <RiAddCircleFill className="mr-2"/> Add Package</Button>
        </div>
      </div>
      
      <PackageTable />
        
      <CustomSheets isOpen={isOpenSheet} title="Add Room" close={() => setIsOpenSheet(false)}>
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="Name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="price">Price</Label>
            <Input type="number" id="price" placeholder="1500.000.000" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="valid_days">Valid Days</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--select one --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">1 week</SelectItem>
                <SelectItem value="dark">1 month</SelectItem>
                <SelectItem value="system">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="credit">Credit</Label>
            <Input type="number" id="credit" placeholder="1" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="location">Location</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--select one --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">all location</SelectItem>
                <SelectItem value="dark">jakarta</SelectItem>
                <SelectItem value="system">bandung</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button onClick={() => setIsOpenSheet(false)} className="w-full" size={"lg"}>Save</Button>
          </div>
        </div>
      </CustomSheets>
    </>
  )
}

export default PackagePage