'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { RiArrowDropDownLine, RiHourglassFill, RiStackFill } from 'react-icons/ri'
import ActivePackageCard from './_parts/active-package'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import ExpiredPackageCard from './_parts/expired_package'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import toast from 'react-hot-toast'

type Checked = DropdownMenuCheckboxItemProps["checked"]

const LoadingSkeleton = () => (
  <div className='flex flex-col gap-4'>
    <Skeleton className="w-1/2 h-6" />
    <Skeleton className="w-full h-8" />
    <Skeleton className="w-full h-8" />
  </div>
)

const PackageCustomerPage = () => {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [activePackages, setActivePackages] = React.useState([])
  const [expiredPackages, setExpiredPackages] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    initState()
  }, [])

  const initState = async () => {
    setLoading(true)
    try {
      const activePackage = await api.get(`${baseUrl}/dashboard/package`)
      const expiredPackage = await api.get(`${baseUrl}/dashboard/package?expired=true`)
      setActivePackages(activePackage.data)
      setExpiredPackages(expiredPackage.data)
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast.error(error.data.message)
    }
  } 

  return (
    <>
      <section className='bg-background p-5 rounded-lg mb-8'>
        <div className='flex justify-between items-center pb-3 border-b border-gray-200 mb-5'>
          <div className='flex gap-2 items-center'>
            <RiStackFill className='text-primary' size={26} />
            <h2 className='font-noto_serif font-bold text-xl text-gray-800'>Your Packages</h2>
          </div>
        </div>

        {
         loading ? <LoadingSkeleton /> : (
          activePackages.length > 0 ? (
            <div>
              {
                activePackages.map((item:any, index:number) => (
                  <ActivePackageCard key={index} data={item} />
                ))
              }
            </div>
          ): (
            <div className='flex flex-col gap-4 text-center'>
              <p className='text-gray-400'>No active package</p>
            </div>
          )
         )
        }

      </section>

      <section className='bg-background p-5 rounded-lg mb-8'>
        <div className='flex justify-between items-center pb-3 border-b border-gray-200 mb-5'>
          <div className='flex gap-2 items-center'>
            <RiHourglassFill className='text-primary' size={26} />
            <h2 className='font-noto_serif font-bold text-xl text-gray-800'>Expired Packages</h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link">Sort By <RiArrowDropDownLine size={26}/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Latest
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                Olders
              </DropdownMenuCheckboxItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {
          loading ? <LoadingSkeleton /> : (
            <div>
              {
                expiredPackages.length > 0 ? (
                  <div>
                    {
                      expiredPackages.map((item:any, index:number) => (
                        <ExpiredPackageCard key={index} data={item} />
                      ))
                    }
                  </div>
                ): (
                  <div className='flex flex-col gap-4 text-center'>
                    <p className='text-gray-400'>No expired package</p>
                  </div>
                )
              }
            </div>
          )
        }

        <div className='flex justify-between items-end'>
        {/* <Pagination className='flex justify-start mt-6'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}

          {/* <div className='w-56'>
            <p className='text-foreground text-sm'>Showing 1 to 4 of 16 data</p>
          </div> */}
        </div>

      </section>
    </>
  )
}

export default PackageCustomerPage