'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const LoginPage = () => {

  const router = useRouter()
  const handleSubmit = () => {
    router.push('/otp-verification')
  }

  return (
    <div className="p-8 bg-background rounded-md">

        <div className="flex flex-col items-center gap-4 mb-8">
          <Link href={"/"}>
            <Image src="/be-secondary-logo.png" alt="logo" width={160} height={0} className="mb-4"/>
          </Link>
          <p className="text-gray-400">
            Please enter your email and password.
          </p>
        </div>

        <div className="grid w-full items-center gap-1.5 mb-5">
          <Label htmlFor="email" className="mb-1 text-gray-600">Email</Label>
          <Input type="email" id="email" placeholder="Enter your email or username" />
        </div>
        <div className="grid w-full items-center gap-1.5 mb-5">
          <Label htmlFor="email" className="mb-1 text-gray-600">Passsword</Label>
          <Input type="email" id="email" placeholder="******" />
        </div>
        <div className="items-top flex space-x-2 mb-6">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember Me
            </label>
          </div>
        </div>
        <div>
          <Button onClick={handleSubmit} className="w-full" size={"lg"}>Sign In</Button>
        </div>

        <div className="mt-24 text-center text-gray-600">
          <p>Don't have an account ? <Link className="font-bold text-primary" href="/signup">Sign Up</Link></p>
        </div>

    </div>
  )
}

export default LoginPage