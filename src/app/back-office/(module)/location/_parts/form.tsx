import React from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import LoadingIcons from "react-loading-icons"
import { Button } from '@/components/ui/button'
import { useSheet } from '@/store/use-sheet'
import { useLocation } from '@/store/use-location'
import toast from 'react-hot-toast'

export const formSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
})

type LocationFormProps = {
}

const LocationForm = () => {

  const { setIsOpen } = useSheet()
  const { loading, getAllLocation, createLoation, locationUrl } : any = useLocation()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createLoation(data)
      await getAllLocation(locationUrl)
      toast.success("Location created")
      form.reset()
    } catch (error:any) {
      toast.error(error)
    }
    setIsOpen(false)
  }


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} >
        <div className="grid w-full items-center gap-1.5 mb-5">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name" className="mb-1 text-gray-600">Location Name</Label>
                  <FormControl>
                    <Input {...field} placeholder="location name" />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
          />
        </div>
        <Button className="w-full" size={"lg"}>
          {
            loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
          }
          Save
        </Button>
        </form>
      </Form>
    </div>
  )
}

export default LocationForm