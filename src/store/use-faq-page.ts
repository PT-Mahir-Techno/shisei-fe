import api from '@/lib/api';
import { baseUrl } from '@/lib/variable';
import {create } from 'zustand';

interface FaqPageState {
  loading: boolean;
  success: boolean;
  error: boolean;
  faqs: any;
  getFaqs: () => Promise<void>;
}

const initState = {
  loading: false,
  success: false,
  error: false,
  faqs: [],
}

export const useFaqPage = create<FaqPageState>((set) => ({
  ...initState,
  getFaqs: async () => {
    set({ loading: true})
    try {
      const res =await api.get(`${baseUrl}/faq`)
      set({ faqs: res.data, loading: false, success: true})
      return Promise.resolve()
    } catch (error:any) {
      set({ loading: false, error: true})
      return Promise.reject(error)
    }
  }
}))