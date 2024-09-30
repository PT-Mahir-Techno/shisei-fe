import api from "@/lib/api";
import { transformEevent } from "@/lib/utils";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type ContactStoreType = {
  success: boolean
  error: boolean
  loading: boolean
  settingContact: any
  setSettigContact: (data:object) => Promise<void>
  getSettingContact: () => Promise<any>
}

const initState = {
  loading: false,
  success: false,
  error  : false,
  settingContact: {}
}


export const useContact = create<ContactStoreType>((set, get) => ({
  ...initState, 

 
  setSettigContact: async (data:object) => {
    try {
      set({loading: true })
      await api.put(`${baseUrl}/admin/contact`, data)
      set({loading: false, success: true})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  getSettingContact: async () => {
    try {
      set({loading: true })
      const res = await api.get(`${baseUrl}/admin/contact`)
      set({settingContact: res.data, loading: false, success: true })
      return Promise.resolve(res)
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  }
}))