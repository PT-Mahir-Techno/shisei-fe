import React from 'react'
import { Label } from './label'
import { Input } from './input'

type InputProps = {
  className?: string
  type?: string
  [key: string]: any
  name?: string
  label ?: string
  placeholder?: string
}
const CustomInput = ({...props}: InputProps) => {
  const {name, label, placeholder, key, className, type} = props
  return (
    <div key={key} className="grid w-full items-center gap-1.5 mb-5">
      <Label htmlFor={name} className="mb-1 text-gray-600">{label}</Label>
      <Input type={type} id={name} placeholder={placeholder} />
    </div>
  )
}

export default CustomInput