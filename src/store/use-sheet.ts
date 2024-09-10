import { create } from 'zustand'


type SheetState = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}


export const useSheet = create<SheetState>((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => {
    set({isOpen: value})
  },
}))
 