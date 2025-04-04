import { create } from 'zustand'

type ModalState = {
  isOpen: boolean,
  isOpenDay: boolean,
  isGenerate: boolean
  modalId: any,
  isModalReminder: boolean
  setIsOpen: (value: boolean) => void
  setModalId: (value: string) => void
  setIsOpenDay: (value: boolean) => void
  resetModal: () => void
  setIsGenerate: (value: boolean) => void
  setModalReminder: (value: boolean) => void
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  isOpenDay: false,
  modalId: null,
  isGenerate: false,
  isModalReminder: false,
  resetModal: () => set({isOpen: false, modalId: null}),
  setIsGenerate: (value: boolean) => set({isGenerate: value}),
  setIsOpen: (value: boolean) => set({isOpen: value}),
  setModalId: (value: string) => set({modalId: value}),
  setIsOpenDay: (value: boolean) => set({isOpenDay: value}),
  setModalReminder: (value: boolean) => set({isModalReminder: value})
}))