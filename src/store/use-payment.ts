import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { PaymentType } from "@/types/payment-type";
import { create } from "zustand";

type PaymentStoreType = {
  payment: any
  payments: PaymentType[]
  paymentAttributes: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  paymentUrl: string
  getAllPayment: (url: string) => void
  getSinglePayment: (url: string) => void
  createPayment: (data: any) => void
  deletePayment: (url: string) => void
  getAllPaymentNoPaginate: (url: string) => void
}

const initState = {
  payment : {},
  payments: [],
  paymentAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  paymentUrl: ''
}


export const usePayment = create<PaymentStoreType>((set, get) => ({
  ...initState, 
  getAllPayment: async (url: string) => {
    try {
      set({loading: true, paymentUrl: url})
      const res = await api.get(url)
      set({payments: res.data.data, loading: false, success: true, paymentAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllPaymentNoPaginate: async (url: string) => {
    try {
      set({loading: true, paymentUrl: url})
      const res = await api.get(url)
      set({payments: res.data, loading: false, success: true, paymentAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSinglePayment: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({payment: res.data, loading: false, success: true })
    } catch (error) {
      set({ error: true, loading: false, success: false })
    }
  },
  createPayment:async (data: any) : Promise<any> => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}/admin/Payment`, data)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (err:any) {
      set({error: true, loading: false, success: false, errorData: err})
      return Promise.reject(err)
    }
  },
  deletePayment: async (url: string) => {
    return new Promise (async (resolve, reject) => {
      await api.delete(url).then(() => {
        set({loading: false, success: true })
        resolve()
      } ).catch((err) => {
        set({error: true, loading: false, success: false })
        reject(err)
      } )
    })
  }
}))