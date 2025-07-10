'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { baseUrl } from '@/lib/variable'
import { useLocation } from '@/store/use-location'
import { scheduleFormScheme } from '@/types/schedule-type'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'   
import Editor from 'react-simple-wysiwyg';
import { z } from 'zod'
import { useStaff } from '@/store/use-staff'
import { useSchedule } from '@/store/use-schedule'
import LoadingIcons from 'react-loading-icons'
import { useSheet } from '@/store/use-sheet'
import toast from 'react-hot-toast'
import LoadingState from '@/components/ui/loading-state'
import { AuthContex } from '@/providers/auth-provider'
import { usePackageCategory } from '@/store/use-package-category'
import Link from 'next/link'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useRouter, useSearchParams } from 'next/navigation'
import DateSelector from '../_parts/list-date'

const CreateSchedulePage = () => {
    const {authState} = useContext(AuthContex)
    const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState
    
    const {locations, getAllLocationNoPaginate} = useLocation()
    const {packageCategorys, getAllPackageCategoryNoPaginate} = usePackageCategory()
    const {staffs, getAllStaffNoPaginate} = useStaff()
    const {createSchedule, loading, getScheduleConverted, getSingleSchedule, updateSchedule} = useSchedule()
    const [data, setData] = useState( new Date() )
    const [isClient, setIsClient] = useState(false)
    const {modelId} = useSheet()

    const [selectedDates, setSelectedDates] = useState<any>()
    const [selectedMonth, setSelectedMonth] = useState<any>(new Date().getMonth())
    const [selectedYear, setSelectedYear] = useState<any>(new Date().getFullYear())
    const monthsIndex = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const router           = useRouter() 
    const param            = useSearchParams()
    const dateString       = param.get('date')

    // useEffect(() => {
    //     if (!isClient) return

    //     if (dateString) {
    //         const parsedDate = new Date(dateString)
    //         if (!isNaN(parsedDate.getTime())) {
    //             setData(parsedDate)
    //         }
    //     }
    // }, [isClient])

    useEffect(() => {
        setIsClient(true)
    }, [])


    useEffect(() => {
        if (prefix){
            init()
        }
    }, [prefix])

    useEffect(() => {
        if(modelId) {
        fetcSingleSchedule()
        }
    }, [modelId])


    const init = async () => {
        if (prefix){
            await getAllLocationNoPaginate(`${baseUrl}${prefix}/location?type=nopaginate`)
            await getAllStaffNoPaginate(`${baseUrl}${prefix}/staff?type=nopaginate`)
            await getAllPackageCategoryNoPaginate(`${baseUrl}${prefix}/category?type=nopaginate`)
        }
    }

    const fetcSingleSchedule = async () => {
        try {
        const res = await getSingleSchedule(`${baseUrl}${prefix}/schedule/${modelId}`)
        
        if (res){
            const dateSplited = res.date.split('-')
            const date = `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`
        
            form.reset({
            location_id: res?.location?.id ,
            staff_id: res.staff.id,
            date: new Date(date),
            max_order: res.max_order,
            ...res
            })
        }
        } catch (error:any) {
        console.log(error)
        toast.error(error.data.message)
        }
    }

    const form = useForm<z.infer<typeof scheduleFormScheme>>({
        resolver: zodResolver(scheduleFormScheme),
        defaultValues: {
        name: '',
        // date: data ?? '',
        time: '',
        duration: '',
        location_id: '',
        description: '',
        staff_id: '',
        max_order: '',
        color: '',
        category_id: '',
        credit: 1
        }
    })

    const handleSumit = async (data: z.infer<typeof scheduleFormScheme>) => {

        // console.log(selectedDates)
        // return
        
        try {
        const formData = new FormData()

        if (selectedDates <= 0){
            toast.error('Please select at least one date')
            return
        }

        const dates = [];

        for (let i = 0; i < selectedDates.length; i++) {
        const date = new Date(selectedDates[i].id);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // bulan 2 digit
        const day = String(date.getDate()).padStart(2, '0');        // tanggal 2 digit

        const formattedDate = `${year}-${month}-${day}`;
        dates.push(formattedDate);
        }


        formData.append('bulk_type', "date")
        formData.append("bulk_date", JSON.stringify(dates))
        formData.append('name', data.name)
        formData.append('time', data.time)
        formData.append('duration', data.duration)
        formData.append('location_id', data.location_id)
        formData.append('description', data.description)
        formData.append('staff_id', data.staff_id)
        formData.append('max_order', data.max_order.toString())
        formData.append('color', data.color)
        formData.append('category_id', data.category_id)
        formData.append('credit', data.credit.toString())  
        
        // console.log(formData)
        // return

        if (data.photo[0]){
            formData.append('image', data.photo[0])
        }

        if (modelId) {
            await updateSchedule(prefix, modelId, formData)
        }else{
            await createSchedule(prefix, formData)
        }

        let scheduleUrl = role == 'admin'
        ? `${baseUrl}${prefix}/schedule?type=nopaginate&month=${new Date().getMonth() + 1}`
        : `${baseUrl}${prefix}/my-schedule?type=nopaginate&month=${new Date().getMonth() + 1}`

        await getScheduleConverted(scheduleUrl)
        form.reset()
        
        router.push('/back-office/calendar/schedule')

        toast.success('Schedule created')
        } catch (error:any) {
        toast.error(error.message)
        }
    }

    if (!isClient) return null 

    return (
        <div>
            <div className='mb-3 flex items-center justify-between'>
                <div className='font-noto_serif font-bold text-xl text-gray-800 dark:text-white'>
                    Create Schedule
                </div>
                <div>
                    <Link href={'/back-office/calendar/schedule'}>
                    <Button className='bg-primary text-white'> <RiArrowGoBackFill className='mr-2'/> Back</Button>
                    </Link>
                </div>
            </div>

            <div className='bg-background p-4 rounded-lg'>
            {
                loading ? <div className='h-full'><LoadingState isTransparent={true} isFixed={false} /></div>
                : <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSumit)} >

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem className='w-full mb-4'>
                            <Label>Name</Label>
                            <FormControl>
                            <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                        <FormField
                            control={form.control}
                            name="max_order"
                            render={({ field }) => (
                            <FormItem className='w-full mb-4'>
                                <Label>Customer Quota</Label>
                                <FormControl>
                                <Input type='number' placeholder="Quota" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="photo"
                            render={({ field }) => (
                            <FormItem className='w-full mb-4'>
                                <Label>Photo</Label>
                                <FormControl>
                                <Input accept='image/*' {...form.register('photo')} type='file' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="category_id"
                            render={({ field }) => (
                            <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                                <FormItem>
                                <Label htmlFor="valid_days">Category</Label>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                        <SelectValue placeholder="--select one --" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {
                                        packageCategorys?.map((ctg: any) => (
                                        <SelectItem key={ctg.id} value={ctg.id}>{ctg.name}</SelectItem>
                                        ))
                                    }
                                    </SelectContent>
                                </Select>
                                </FormItem>
                            </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="credit"
                            render={({ field }) => (
                            <FormItem className='w-full mb-4'>
                                <Label>Credit</Label>
                                <FormControl>
                                <Input type='number' placeholder="Credit" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem className='w-full mb-4'>
                            <Label>Time</Label>
                            <FormControl>
                                <input  className="w-full py-2 border border-primary/70 outline-none px-3 rounded-lg" type='time' {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem className='w-full mb-4'>
                            <Label>Duration (in minutes)</Label>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <FormField
                        control={form.control}
                        name="staff_id"
                        render={({ field }) => (
                            <div className="grid w-full items-center gap-1.5 mb-4">
                            <FormItem>
                                <Label htmlFor="valid_days">Staff/ Instructor</Label>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="--select one --" />
                                    </SelectTrigger>
                                    </FormControl>
                                <SelectContent>
                                    {
                                    staffs?.map((location: any) => (
                                        <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                                    ))
                                    }
                                </SelectContent>
                                </Select>
                            </FormItem>
                            </div>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="location_id"
                        render={({ field }) => (
                            <div className="grid w-full items-center gap-1.5 mb-4">
                            <FormItem>
                                <Label htmlFor="valid_days">Location</Label>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="--select one --" />
                                    </SelectTrigger>
                                    </FormControl>
                                <SelectContent>
                                    <SelectItem value="all">all location</SelectItem>
                                    {
                                    locations?.map((location: any) => (
                                        <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                                    ))
                                    }
                                </SelectContent>
                                </Select>
                            </FormItem>
                            </div>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem className='w-full mb-4'>
                            <Label>Pick a Color</Label>
                            <FormControl>
                                <Input placeholder="Name" {...form.register("color")} type='color' />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className='w-full mb-4 rounded'>
                            <Label className='mb-2'>Description</Label>
                            <FormControl>
                                <Editor containerProps={{ className: "w-full h-60 border rounded-b-lg bg-clip-border" }} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                        

                        {/* bulk schedule */}
                        <div className='mb-4'>

                            <div className='mb-4 text-sm'>
                                Select month and year to select schedule (default current month and year) !
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <Select onValueChange={(value) => setSelectedMonth(value)} value={selectedMonth}>
                                        <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="--select Month --" />
                                        </SelectTrigger>
                                        </FormControl>
                                    <SelectContent>
                                        {
                                            monthsIndex.map((month, index) => (
                                                <SelectItem value={index.toString()} key={index}>{month}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Select onValueChange={(value) => setSelectedYear(value)} value={selectedYear}>
                                        <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="--select Yeaar --" />
                                        </SelectTrigger>
                                        </FormControl>
                                    <SelectContent>

                                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 0 + i).map((y) => (
                                                <SelectItem value={y.toString()} key={y}>{y}</SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                            <div className='h-auto'>
                                <DateSelector selected={data} onSelectChange={setSelectedDates} monthIndex={selectedMonth} year={selectedYear} />
                            </div>

                        </div>
                        {/* end bulk schedule */}
                    
                        <div className='flex justify-end'>
                        {/* <Button type='button' variant={"outline"} size={"lg"} className="mx-2" onClick={close}>Cancel</Button> */}
                        <Button className="" size={"lg"}
                            disabled={loading}
                        >
                            {
                            loading &&
                            <LoadingIcons.Oval strokeWidth={5} className="w-4 h-4 mr-2" color='white' />
                            }
                            Save
                        </Button>
                        </div>
                    </form>
                    
                </Form>
            }
            </div>
        </div>
    )
}

export default CreateSchedulePage