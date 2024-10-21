import api from '@/lib/api';
import { PluckValue } from '@/lib/utils';
import { baseUrl } from '@/lib/variable';
import { SchedulePageType } from '@/types/schedule-type';
import {create } from 'zustand';

type FilterFormatParam = {
  filterBy: string;
  data: string;
}

interface SchedulePageState {
  loading: boolean;
  success: boolean;
  error: boolean;
  selectedDate: Date;
  schedules: SchedulePageType[];
  schedule: any;
  listStaff:any,
  listTime:any,
  listDuration:any,
  originalValue:any,
  setSelectedDate: (date: Date) => void;
  getSchedules: (url:string) => Promise<void>;
  getSingleSchedule: (url: string) => Promise<void>;
  fileterSchedule: (data:[FilterFormatParam]) => void;
  resetFilter: () => void;
}

const initState = {
  loading: false,
  success: false,
  error: false,
  selectedDate: new Date(),
  schedules: [],
  schedule: {},
  listStaff: [],
  listTime: [],
  listDuration: [],
  originalValue: [],
  setSelectedDate: (date: Date) => {},
  getSchedules: async (url:string) => {}
}

export const useSchedulePage = create<SchedulePageState>((set, get) => ({
  ...initState,
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
  getSchedules: async (url:string) => {
    set({ loading: true})
    try {
      const res =await api.get(`${baseUrl}${url}`)

      const pluckedStaff = PluckValue(res.data, 'staff')
      const pluckedTime = PluckValue(res.data, 'time')
      const pluckedDuration = PluckValue(res.data, 'duration')

      set({ schedules: res.data, originalValue: res.data, loading: false, success: true, listStaff: pluckedStaff, listTime: pluckedTime, listDuration: pluckedDuration})
      return Promise.resolve()
    } catch (error:any) {
      set({ loading: false, error: true})
      return Promise.reject(error)
    }
  },
  getSingleSchedule: async (url: string) => {
    set({ loading: true})
    try {
      const res =await api.get(`${baseUrl}${url}`)
      set({ schedule: res.data })
      set({ loading: false, success: true})
      return Promise.resolve()
    } catch (error:any) {
      set({ loading: false, error: true})
      return Promise.reject(error)
    }
  },
  fileterSchedule: (data:[FilterFormatParam]) => {
    //  filter schedules by data
    const schedules = Object.assign([], get().originalValue)
    // const schedules = Object.assign([], get().originalValue)
    const res:any = []

    data.map((item:any, index:any) => {
      schedules.map((schedule:any, index:any) => {
        if (schedule[item.filterBy] == item.data){
          res.push(schedule)
        }
      })
    })

    set({ schedules: res })
  },
  resetFilter: () => {
    set({ schedules: get().originalValue })
  }
}))