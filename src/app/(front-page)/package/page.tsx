'use client'

import React, { useContext, useEffect } from 'react'
import PackageCard from './_parts/package-card'
import { Button } from '@/components/ui/button'
import { RiErrorWarningFill, RiLockUnlockFill, RiVerifiedBadgeFill } from 'react-icons/ri'
import CustomModal from '@/components/ui/custoom-dialog'
import Link from 'next/link'
import { usePackagePage } from '@/store/use-package-page'
import { Skeleton } from '@/components/ui/skeleton'
import { numberToIdr } from '@/lib/utils'
import { AuthContex } from '@/providers/auth-provider'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { PaymentMethos } from '@/lib/variable'



const BookingPackagePage = () => {

  const {authState} = useContext(AuthContex)
  const {loading, packages, package:singlePackage , getPackage, getSinglePackage, procesedPackage} = usePackagePage()
  const [selectedPackage, setSelectedPackage] = React.useState<any>(null)
  const [showModalTransaction, setShowModalTransaction] = React.useState(false)
  const [showModalUnAuthenticated, setShowModalUnAuthenticated] = React.useState(false)
  const [selectedPayment, setSelectedPayment] = React.useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    getPackage("/package")
  }, [])

  const handleSelect = (data: any) => {
    setSelectedPackage(data)
  }

  const handleTransaction = () => {
    if (!authState._is_auth && !authState._auth && !authState._avaibility) {
      setShowModalUnAuthenticated(true)
    }else{
      setShowModalTransaction(true)
    }
  }

  const procesedTransaction = async () => {
    try {
      if (selectedPackage !== null && selectedPayment !== null) {
        const payload = {
          payment_method : selectedPayment,
        }
        const res = await procesedPackage(`/payment/${selectedPackage.id}`, payload)

        // redirect to res.url 
        // console.log(res)
        window.location.href = res?.url
        
      }else{
        toast.error('Please select payment method or package')
      }
      setSelectedPayment(null)
      setSelectedPackage(null)
      setShowModalTransaction(false)
      // router.push('/bill/success')
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  return (
    <>
      <div className='container pt-20 pb-10 mt-20 flex flex-col lg:flex-row gap-7'>
        <div className='p-5 border border-gray-200 rounded-lg w-12/12 lg:w-9/12'>
          <div className='mb-3 pb-3 border-b border-gray-200'>
            <h2 className='font-noto_serif font-bold text-2xl text-gray-700 dark:text-gray-100'>Choose Your Packages</h2>
          </div>
          <p className='text-gray-600 mb-8 dark:text-gray-200'>With our class packages, you have the freedom to purchase as many or as few sessions as you need and use them at your convenience. Please note that class packs come with an expiration date, so be sure to make the most of them! </p>

          {
            loading
            ? (
              <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3'>
                {
                  Array(6).fill(0).map((_, index) => (
                    <div key={index}>
                      <Skeleton className="w-1/2 h-5 mb-2" />
                      <Skeleton className="w-1/4 h-3 mb-2" />
                      <Skeleton className="w-full h-4 mb-2" />
                      <Skeleton className="w-full h-4 mb-2" />
                      <Skeleton className="w-full h-4 mb-2" />
                      <Skeleton className="w-full h-4 mb-2" />
                      <Skeleton className="w-full h-8 mb-2" />
                    </div>
                  ))
                }
              </div>
            )
            : <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3'>
                {
                  packages?.map((item: any, index) => (
                    <PackageCard select={() => handleSelect(item)} selected={selectedPackage != null && selectedPackage?.id === item.id} key={index} data={item} hiddenSelect={false} />
                  ))
                }
              </div>
          }

        </div>
        <div className='w-12/12 lg:w-4/12 '>
            <div className='p-5 border border-gray-200 rounded-lg sticky top-32 transition-all duration-300'>
              {
                selectedPackage === null
                ? <div className='font-semibold text-red-400 pb-4 mb-6 border-dashed border-b-2 border-primary/40'>
                    No packages selected, please select a package
                  </div>
                : <div className='pb-4 mb-6 border-dashed border-b-2 border-primary/40'>
                    <h2 className='font-noto_serif font-bold text-lg text-gray-700 mb-2'>{selectedPackage?.name}</h2>
                    <div className='flex justify-between items-center font-noto_serif font-bold text-xl text-gray-700'>
                      <span>Total :</span>
                      <span>{numberToIdr(selectedPackage?.price)}</span>
                    </div>
                  </div>
              }
              
              
              <div className='pb-4 mb-5 border-b-2 border-gray-200'>
                <h2 className='font-noto_serif font-bold text-gray-700 dark:text-gray-200'>Payment Method</h2>
              </div>

              <div className='flex gap-2 items-center mb-4'>
                <Image alt='visa' src="/img/bank/visa.png" width={40} height={0} />
                <Image alt='mastercard' src="/img/bank/MASTERCARD.png" width={40} height={0} />
                <Image alt='atm-bersama' src="/img/bank/atm_bersama.png" width={40} height={0} />
              </div>

              <div className='mb-6'>
                <Select onValueChange={(val) => setSelectedPayment(val)} value={selectedPayment}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      PaymentMethos.map((item:any, index:any) => (
                        <SelectItem key={index} value={item.name}>
                          <div className='flex items-center gap-4'>
                            <Image alt={item.icon} src={item.icon} width={30} height={0} />
                            <p>{item.title}</p>
                          </div>
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>

              <p className='mb-3 text-gray-600 dark:text-gray-200 text-sm flex gap-1'> 
                <RiErrorWarningFill size={26} className='text-primary'/> Click the button to continue and proceed to the payment.
              </p>
              <div>
                <Button onClick={() => handleTransaction()} size={"lg"} className='w-full'
                  disabled={selectedPackage === null}  
                >
                  Pay Now
                </Button>
              </div>
            </div>
        </div>
      </div>

      {/* <CustomModal open={showModalTransaction} onOpenChange={() => setShowModalTransaction(false)}>
          <div className='flex flex-col items-center'>
            <RiVerifiedBadgeFill size={60} className='text-primary mb-1'/>
            <p className='text-2xl text-primary mb-2'>Thank You</p>
            <h2 className='font-noto_serif font-bold text-xl'>Your reservation is finished.</h2>
            <p className='text-gray-700 mb-5'>Thank you for choosing our service</p>
            <Link href='/booking/1' className='bg-primary hover:bg-primary/50 rounded-lg py-3 px-4 text-white transition-all duration-300' >Continue With The Booking</Link>
          </div>
      </CustomModal> */}
      <CustomModal open={showModalTransaction} onOpenChange={() => setShowModalTransaction(false)}>
          <div className='flex flex-col items-center'>
            <RiVerifiedBadgeFill size={60} className='text-primary mb-1'/>
            <p className='text-2xl text-primary mb-2'>Hi There</p>
            <h2 className='font-noto_serif font-bold text-xl mb-2'>Please check again.</h2>
            <p className='text-gray-700 mb-5 text-center'> If you are sure of your choice, <br/> please continue this transaction. </p>
            <Button onClick={() => procesedTransaction()} disabled={loading}>
              {
                loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
              }
              Continue to payment
            </Button>
          </div>
      </CustomModal>

      <CustomModal open={showModalUnAuthenticated} onOpenChange={() => setShowModalUnAuthenticated(false)}>
          <div className='flex flex-col items-center'>
            <RiLockUnlockFill size={60} className='text-primary mb-1'/>
            <p className='text-2xl text-primary mb-2'>Hi There.</p>
            <h2 className='font-noto_serif font-bold text-xl'>Need login to your account.</h2>
            <p className='text-gray-700 mb-5 text-center'>before continue your transaction <br/> please login or register </p>
            <div className='flex justify-center items-center gap-4 mt-4'>
              <Link href={"/signup"}>
                <Button variant={"outline"}>Register</Button>
              </Link>
              <Link href={"/login"}>
                <Button>Login</Button>
              </Link>
            </div>
          </div>
      </CustomModal>
    </>
  )
}

export default BookingPackagePage