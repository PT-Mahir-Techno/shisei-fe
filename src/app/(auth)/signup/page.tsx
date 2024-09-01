import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CustomInput from "@/components/ui/custom-input"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"

const SignUpPage = () => {
  return (
    <div className="p-8 bg-background rounded-md">

        <div className="mb-8">
          <h2 className="font-noto_serif font-bold text-2xl text-gray-600">Create Account.</h2>
        </div>

        <CustomInput label="Name" placeholder="Enter your Name" />
        
        <CustomInput label="Email address" placeholder="Enter your email" type="email"/>

        <CustomInput label="Phone number" placeholder="Enter your phone number" />

        <CustomInput label="Password" placeholder="******" type="password" />
        
        <CustomInput label="Confirm Password" placeholder="******" type="password"/>

        <div>
          <Link href={"/verify"}>
            <Button className="w-full" size={"lg"}>Sign Up</Button>
          </Link>
        </div>

        <div className="mt-24 text-center text-gray-600">
          <p>Already have an account? <Link className="font-bold text-primary" href="/login">Sign In</Link></p>
        </div>

    </div>
  )
}

export default SignUpPage