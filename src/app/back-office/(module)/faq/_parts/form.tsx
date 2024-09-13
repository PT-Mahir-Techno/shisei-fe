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
import toast from 'react-hot-toast'
import { useFaq } from '@/store/use-faq'

export const formSchema = z.object({
  question: z.string().min(5, {message: "Minimum 5 character"}).max(999999999999, {message: "Maximum 100 characters"}),
  answer: z.string().min(5, {message: "Minimum 5 character"}).max(999999999999, {message: "Maximum 100 characters"}),
})

type LocationFormProps = {
}

const LocationForm = () => {

  const { setIsOpen } = useSheet()
  const { loading, getAllFaq, createFaq, faqUrl } : any = useFaq()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      answer: '',
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createFaq(data)
      await getAllFaq(faqUrl)
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
              name="question"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name" className="mb-1 text-gray-600">Question</Label>
                  <FormControl>
                    <Input {...field} placeholder="question" />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mb-5">
          <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name" className="mb-1 text-gray-600">Answer</Label>
                  <FormControl>
                    <Input {...field} placeholder="answer" />
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