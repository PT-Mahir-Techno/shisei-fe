'use client'

import React, { useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import Link from 'next/link';
import { useHome } from '@/store/use-home';
import { useRouter } from 'next/navigation';

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

const BookSection = () => {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [selected, setSelected] = React.useState("")

  const {loadingLoation, locations, getLocations } = useHome()
  const router = useRouter()


  useEffect(() => {
    getLocations()
  }, [])


  const handleBook = () => {
    if (date && selected){
      const month   = date.getMonth() + 1
      const year    = date.getFullYear()
      const day     = date.getDate()
      const newDate = `year=${year}&month=${month}&date=${day}`
      router.push(`/booking?${newDate}&location=${selected}`)
    }
  }

  return (
    <>
      <section className="container relative z-10 -mt-[70px]">
        <div className="w-full  px-[40px] py-[40px]  bg-background rounded-md shadow-md flex flex-col justify-center dark:bg-gray-800">
          <div className={"font-noto_serif text-3xl text-gray-600 font-bold mb-4 dark:text-slate-300"}>
            Booking.
          </div>
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-8 ">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal py-4",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? locations.find((item:any) => item.name === value)?.name
                    : "Select Location..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-80 p-0">
                <Command>
                  <CommandInput placeholder="Search location..." />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((item:any) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={(currentValue) => {
                            setSelected(item.id)
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === item.name ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            <div onClick={handleBook} className='w-full bg-primary px-4 py-[8px]  rounded-md text-center text-white cursor-pointer'>Book Now</div>
            {/* <Button>Book Now</Button> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default BookSection