'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { GroupPermission } from "@/lib/utils"
import { baseUrl } from "@/lib/variable"
import { AuthContex } from "@/providers/auth-provider"
import { usePermision } from "@/store/use-permision"
import { useRole } from "@/store/use-role"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { RiArrowLeftSLine } from "react-icons/ri"
import LoadingIcons from "react-loading-icons"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(5, {message: "Minimum 5 characters"}).max(100, {message: "Maximum 100 characters"}),
  permission_id: z.array(z.string()).refine((value) => value.length > 0, {message: "at least one permission is required"}),
})
const CreateRolePage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState
  const title = "Role"

  const {permisions, getAllPermisionNoPaginate, loading:loadingPermission} = usePermision()
  const { createRole, getAllRole, loading, getSingleRole, updateRole} = useRole()
  const router = useRouter()
  const {id} = useParams()

  useEffect(() => {
    if (prefix){
      getAllPermisionNoPaginate(`${baseUrl}${prefix}/role-permission?type=nopaginate`)
    }
  }, [prefix])

  useEffect(() => {
    if(prefix || id){
      findRole()
    }
  }, [prefix, id])

  const findRole = async () => {
    const res = await getSingleRole(`${baseUrl}${prefix}/role/${id}`)
    form.reset({
      name: res.role.name,
      permission_id: res.permissions.map((permission:any) => permission.id)
    })
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      permission_id: []
    }
  })

  const handleSUbmit = async (data: z.infer<typeof formSchema>) => {
    try {
      
      if (id){
        await updateRole(`${prefix}/role/${id}`, data)
      }else{
        await createRole(prefix, data)
      }

      await getAllRole(`${baseUrl}${prefix}/role`)
      form.reset()

      router.push('/back-office/setting/role')

      if (id){
        toast.success('Role updated successfully')
      } else{
        toast.success('Role created successfully')
      }
    } catch (error:any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
          <p className="text-gray-500 dark:text-gray-100 text-sm">Create {title}</p>
        </div>
        <div>
          <Link href={"/back-office/setting/role"}>
            <Button> <RiArrowLeftSLine   className="mr-2"/> Back {title}</Button>
          </Link>
        </div>
      </div>
      
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSUbmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="max-w-md">
                    <Label htmlFor="name">Name</Label>
                    <FormControl>
                      <Input type="text" id="name" placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">
                Permission
              </div>
              {
                loadingPermission 
                ?(
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  )
                :<div className="w-full bg-background px-6 py-4 rounded-lg grid grid-cols-6 gap-4">

                {
                    GroupPermission(permisions)?.map((permisionData: any, index: any) => (
                      <div key={index}>
                        <div className='text-gray-600 font-semibold mb-4'>{permisionData[0]}</div>
                        {
                          permisionData[1]?.map((item: any, indexData:any) => (
                            <div key={indexData} className="mb-4">
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="permission_id"
                                render={({ field }) => (
                                  <FormItem key={item.id}>
                                    <div className="flex items-center space-x-2">
                                      <FormControl>
                                        <Checkbox  checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, item.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                )
                                          }}
                                      />
                                      </FormControl>
                                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {item.name} 
                                      </FormLabel>
                                    </div>
                                    <FormMessage className="text-red-500" />
                                  </FormItem>
                                )}
                              />
                            </div>
                          ))
                        }
                      </div>
                    ))
                  }

                  {/* {
                    permisions.map((item: any) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="permission_id"
                        render={({ field }) => (
                          <FormItem key={item.id}>
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                  }}
                              />
                              </FormControl>
                              <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {item.name} 
                              </FormLabel>
                            </div>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    ))
                  } */}
                </div>
              }

              <div className="flex justify-end mt-8">
                <Button size={"lg"}>
                  {
                    loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                  }
                  Save
                </Button>
              </div>
            </form>
        </Form>
      </div>
        
      {/* <CustomSheets isOpen={isOpen} title="Add Validity Period" close={() => setIsOpen(false)}>
        <PeriodForm />
      </CustomSheets>

      <CustomModal
        open={isOpenModal} 
        onOpenChange={() => setIsOpenModal(false)} 
        title='Delete Data'
      >
          <div>
            <p className='text-gray-700 my-6 text-center'>
              Are you sure you want to delete this data?
              <br />
              <b>This action cannot be undone</b>
            </p>
            <div className='flex justify-end gap-4'>
              <Button onClick={() => setIsOpenModal(false)} variant={"outline"}>Cancel</Button>
              <Button onClick={() => handleDelete()}
                disabled={loading}
              >
                {loading &&
                  <LoadingIcons.Oval stroke='#fff' strokeWidth={5} className="w-4 h-4 mr-3" />
                }
                delete
              </Button>
            </div>
          </div>
      </CustomModal> */}
    </>
  )
}

export default CreateRolePage