import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSheet } from '@/store/use-sheet'
import { usePeriod } from '@/store/use-validity-period'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(5, {message: "Minimum 5 characters"}).max(100, {message: "Maximum 100 characters"}),
  duration: z.number().min(1, {message: "minimum 1"}).max(1000, {message: "maximum 1000"}),
})

function PeriodForm() {

  const { setIsOpen } = useSheet()
  const { loading, getAllPeriod, createPeriod, periodUrl, error, errorData, success } : any = usePeriod()

  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      duration: 0
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createPeriod(data)
      await getAllPeriod(periodUrl)

      if (!success) {
        toast.error(errorData.message)
      }else{
        toast.success("Period created")
      }
      form.reset()
    } catch (error:any) {
      toast.error(error)
    }
    setIsOpen(false)
  }

  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="name">Name</Label>
                    <FormControl>
                      <Input type="text" id="name" placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                </div>
              )}
            />
            
            <FormField
              control={form.control}
              name='duration'
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="duration">Duration (Days)</Label>
                    <FormControl>
                      <Input type="number" id="duration" placeholder="Duration" {...form.register('duration', {valueAsNumber: true})} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                </div>
              )}
            />

            <div>
              <Button className="w-full" size={"lg"}>
                {
                  loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                }
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default PeriodForm