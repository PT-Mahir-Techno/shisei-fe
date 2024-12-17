import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { array } from "zod"

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

// format 24-09-2024 to sunday 12 Jan 2024
export const formatDate2 = (date: string) => {
  if (date){
    const [day, month, year] = date.split("-")
    return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }
}

// pluck id
export const pluckId = (array: any[]) => {
  return array.map(item => item.id)
}

// PermitionParse
export const PermisionParser = (value:Array<any> ):object => {

  const data:any = {}
  value.forEach((item: any, index:any) => {
    const dataindex:string   = item.permission.name.split(" ").length <= 2 ? item.permission.name.split(" ")[1] as string : item.permission.name.split(" ")[2] as string 
    if (dataindex){
      const strIndex:string = StripDetector(dataindex) as string
      if (!data[strIndex]){
        // data[strIndex] = [item.permission.name.split(" ")[0]]
        data[strIndex] = [item.permission.name.split(" ").length <= 2 ? item.permission.name.split(" ")[0]  : item.permission.name.split(" ")[1]]
      }else{
        data[strIndex].push(item.permission.name.split(" ").length <= 2 ? item.permission.name.split(" ")[0]  : item.permission.name.split(" ")[1])
      }
    }
  })
  return data;
}

export const StripDetector = (param: string) => {
  const data = param.split("");

  if (data.includes("-")){
    const res = param.split("-")[0] + param.split("-")[1]
    return res
  }else{
    return param
  }
}

export const CheckAvaibility = (permision:any, menu:string, role:string) => {
  let excludeStaff = ['profile', 'dashboard']

  if (role == 'admin' || excludeStaff.includes(menu) || permision[menu]) {
    return true
  } else {
    return false
  }
}

export const CheckAvaibilityGroup = (permision:any, group:[], role:string) => {
  if (role == 'admin') {
    return true
  } else {
    let res:any = []
    group.map((item:any, index:any) => {
      if (permision[item]){
        res.push(true)
      }
    })
    if (res.includes(true)){
      return true
    }else{
      return false
    }
  }
}

export const CheckAvaibilityAction = (permision:any, action:string, menu:string, role:string) => {
  if (role == 'admin') {
    return true
  } else {
    if (permision[menu] && permision[menu].includes(action)){
      return true
    }else{
      return false
    }
  }
}

export const GroupPermission = (permision:any) => {
  let data:any = {}

  permision.map((item:any, index:any) => {
    let indesString:string = item.modul.split(" ").length > 1 ? item.modul.split(" ")[0]+item.modul.split(" ")[1] as string : item.modul as string
    if (!data[indesString]){
      data[indesString] = [item]
    }else{
      data[indesString].push(item)
    }
  })

  delete data.socialmedia
  delete data.suggestion

  return Object.entries(data);
}

export const PluckValue = (array:any[], key:string) => {
  return array.map(item => item[key])
}

export const transformToSelect = (array:any[]) => {
  return array.map(item => ({value: item.id, label: item.name}))
}


export const transformToSelect2 = (array:any[]) => {
  return array.map(item => ({value: item.id, label: item.template}))
}