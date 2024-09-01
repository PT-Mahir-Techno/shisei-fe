import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type CustomModalProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  describtion?: string
  close?: () => void
  children?: React.ReactNode
  size ?: string
}
const CustomModal = ({ open, onOpenChange, title, describtion, close, children, size="" }: CustomModalProps = {}) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${size} rounded-lg`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {
            describtion &&
            <DialogDescription>
              {describtion}
            </DialogDescription>
          }
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal
