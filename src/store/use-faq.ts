import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { FaqType } from "@/types/faq-type";
import { create } from "zustand";

type FaqStoreType = {
  faq: any
  faqs: FaqType[]
  faqAttributes: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  faqUrl: string
  getAllFaq: (url: string) => void
  getSingleFaq: (url: string) => Promise<void>
  createFaq: (data: any) => Promise<void>
  deleteFaq: (url: string) => void
  getAllFaqNoPaginate: (url: string) => void
  updateFaq: (url: string, data: any) => Promise<void>
}

const initState = {
  faq : {},
  faqs: [],
  faqAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  faqUrl: ''
}


export const useFaq = create<FaqStoreType>((set, get) => ({
  ...initState, 
  getAllFaq: async (url: string) => {
    try {
      set({loading: true, faqUrl: url})
      const res = await api.get(url)
      set({faqs: res.data.data, loading: false, success: true, faqAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllFaqNoPaginate: async (url: string) => {
    try {
      set({loading: true, faqUrl: url})
      const res = await api.get(url)
      set({faqs: res.data, loading: false, success: true, faqAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleFaq: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({faq: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createFaq:async (data: any) : Promise<any> => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}/admin/faq`, data)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (err:any) {
      set({error: true, loading: false, success: false, errorData: err})
      return Promise.reject(err)
    }
  },
  deleteFaq: async (url: string) => {
    return new Promise (async (resolve, reject) => {
      await api.delete(url).then(() => {
        set({loading: false, success: true })
        resolve()
      } ).catch((err) => {
        set({error: true, loading: false, success: false })
        reject(err)
      } )
    })
  },
  updateFaq: async (url: string, data: any) => {
    try {
      set({loading: true })
      await api.put(url, data)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  }
}))