import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatedDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

// handle date from string
export function handleStringToDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    
    timeZone: "Asia/Jakarta",
      // 24 jam format
    hour12: false, 
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })
}

export const numberToIdr = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price)
}


export const transformEevent = (event: any) => {
  
  return {
    id: event.id,
    title: `${event.name} | ${event.name}`,
    start: `${event.date}T${event.time}`,
    end: `${event.date}T${addMinuteDuration(event.time, event.duration)}`,
    color: `${event.color}`,
  }

}

const addMinuteDuration = (time:string, duration:string) => {
  const timeSplit = time.split(":")
  const durationMinutes = <number><unknown>duration

  const durationhour = Math.floor(durationMinutes / 60)
  const durationminute = durationMinutes % 60

  const hour = parseInt(timeSplit[0]) + durationhour
  const minute = parseInt(timeSplit[1]) + durationminute

  return `${hour}:${minute}`
}

// return unique value from array of object defined by key param
export const uniqueValue = (array: any[], key: string) => {
  // without set 
  const unique = array.map(item => item[key])
  return unique.filter((value, index, self) => self.indexOf(value) === index)
}

// create function to encrypt or decrypt string with sha 246 with key
export const encryptDecrypt = (input: string, mode: string) => {
}

