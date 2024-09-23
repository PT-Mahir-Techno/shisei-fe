import { create } from 'zustand'


type SheetState = {
  isOpen: boolean
  mode: string
  modelId: string
  setIsOpen: (value: boolean) => void
  setMode: (value: string) => void
  setModelId: (value: string) => void
}


export const useSheet = create<SheetState>((set) => ({
  isOpen: false,
  mode: '',
  modelId: '',
  setIsOpen: (value: boolean) => {
    if (value === false){
      set({mode: '', modelId: ''})
    }
    set({isOpen: value})
  },
  setMode: (value: string) => {
    set({mode: value})
  },
  setModelId: (value: string) => {
    set({modelId: value })
  }
}))
 