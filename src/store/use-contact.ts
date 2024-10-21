import api from "@/lib/api";
import { transformEevent } from "@/lib/utils";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type ContactStoreType = {
  success: boolean
  error: boolean
  loading: boolean
  settingContact: any
  setSettigContact: (url:string, data:object) => Promise<void>
  getSettingContact: (url:string) => Promise<any>
}

const initState = {
  loading: false,
  success: false,
  error  : false,
  settingContact: {}
}


export const useContact = create<ContactStoreType>((set, get) => ({
  ...initState, 

 
  setSettigContact: async (url:string, data:object) => {
    try {
      set({loading: true })
      await api.put(`${baseUrl}${url}/contact`, data)
      set({loading: false, success: true})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  getSettingContact: async (url:string) => {
    try {
      set({loading: true })
      const res = await api.get(`${baseUrl}${url}/contact`)
      set({settingContact: res.data, loading: false, success: true })
      return Promise.resolve(res)
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  }
}))