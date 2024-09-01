import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


type Props ={
  children: React.ReactNode
  title: string,
  isOpen: boolean,
  close: () => void
}

const CustomSheets = ({isOpen, title, children, close}: Props) => {
  return (
    <>
      <Sheet open={isOpen} onOpenChange={close}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="mb-10">{title}</SheetTitle>
            {/* <SheetDescription>
            </SheetDescription> */}
            {children}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default CustomSheets