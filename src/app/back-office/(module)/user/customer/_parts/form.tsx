import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const CustomerForm = ({action}:{action: () => void}) => {

  const handleSubmit = () => {
    action()
  }

  return (
    <>
      <div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" placeholder="Name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="name">Email</Label>
          <Input type="text" id="name" placeholder="Name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="name">Phone Number</Label>
          <Input type="text" id="name" placeholder="Name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="name">Photo</Label>
          <Input id="picture" type="file" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="name">Password</Label>
          <Input type="text" id="name" placeholder="Name" />
        </div>
        <div>
          <Button onClick={handleSubmit} className="w-full" size={"lg"}>Save</Button>
        </div>
      </div>
    </>
  )
}

export default CustomerForm