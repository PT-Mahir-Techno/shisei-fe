import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import {create} from 'zustand'

type DashboardCustomerType = {
  packages: any
  notification: any
  schedule: any
  log: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  getDashboard: () => Promise<void>
}

const initState = {
  packages: [],
  notification: [],
  schedule: [],
  log: [],
  loading: false,
  success: false,
  error: false,
  errorData: null
}


export const useDashboardCustomer = create<DashboardCustomerType>((set, get) => ({
  ...initState,  getDashboard: async () => {
    try {
      set({loading: true })
      const res = await api.get(`${baseUrl}/dashboard`)
      console.log('packageeeeee', res.data.package)
      console.log('notificationnnnn', res.data.notification)
      console.log('scheduleeeee', res.data.schedule)
      await set({packages: res.data.package, notification: res.data.notification, schedule: res.data.schedule, log: res.data.log, loading: false, success: true, error: false})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false, errorData: error})
      return Promise.reject(error)
    }
  }
}))