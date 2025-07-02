'use client'

import React, { useContext, useEffect, useState } from 'react'
import PackageCard from './_parts/package-card'
import { Button } from '@/components/ui/button'
import { RiClapperboardFill, RiClipboardFill, RiErrorWarningFill, RiLockUnlockFill, RiVerifiedBadgeFill } from 'react-icons/ri'
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
import { baseUrl, PaymentMethos } from '@/lib/variable'
import { Input } from '@/components/ui/input'
import api from '@/lib/api'



const BookingPackagePage = () => {

  const {authState} = useContext(AuthContex)
  const {loading, packages, package:singlePackage , getPackage, getSinglePackage, procesedPackage} = usePackagePage()
  const [selectedPackage, setSelectedPackage] = React.useState<any>(null)
  const [showModalTransaction, setShowModalTransaction] = React.useState(false)
  const [showModalUnAuthenticated, setShowModalUnAuthenticated] = React.useState(false)
  const [selectedPayment, setSelectedPayment] = React.useState<any>(null)
  const [coupons, setCoupons] = React.useState<any>([])
  const [discountCode, setDiscountCode] = React.useState<any>(null)
  const [discountRes, setDiscountRes] = React.useState<any>(null)

  const [emails, setEmails] = useState(["", "", ""]);
  const [validStatus, setValidStatus] = useState<(null | "valid" | "invalid" | "loading")[]>([null, null, null]);

  const router = useRouter()

  useEffect(() => {
    getPackage("/package")
    handleGetCoupons()
  }, [])


  const handleChange = async (i: number, value: string) => {
    // update email
    setEmails((prev) => {
      const copy = [...prev];
      copy[i] = value;
      return copy;
    });

    // jika email tidak valid format, langsung tandai invalid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      updateStatus(i, "invalid");
      return;
    }

    // tandai loading
    updateStatus(i, "loading");

    try {
      const res:any = await api.get(`${baseUrl}/check-user/${value}`);
      console.log(res?.status)
      updateStatus(i, res?.status == 'success' ? "valid" : "invalid");
    } catch {
      updateStatus(i, "invalid");
    }
  };

  const updateStatus = (i: number, status: "valid" | "invalid" | "loading" | null) => {
    setValidStatus((prev) => {
      const copy = [...prev];
      copy[i] = status;
      return copy;
    });
  };

  const handleSelect = (data: any) => {
    setSelectedPackage(data)
    setDiscountRes(null)
  }

  const handleGetCoupons = async () => {
    try {
      const res = await api.get(`${baseUrl}/coupon`)
      setCoupons(res.data)
    } catch (error:any) {
      toast.error(error.data.message)
    }
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

      // check valid email
      if (selectedPackage?.is_shared == 1) {
        const hasInvalid = emails.some((email, i) =>
          email.trim() !== "" && validStatus[i] !== "valid"
        );
        if (hasInvalid) {
          toast.error("Ada email tidak valid");
          return;
        }
      }
      

      if (selectedPackage !== null && selectedPayment !== null) {
        const payload: any = {
          payment_method : selectedPayment,

        }
        if (discountCode && discountRes?.status == 'success') {
          payload.coupon_code = discountCode?.data?.code
        }
        const res = await procesedPackage(`/payment/${selectedPackage.id}`, payload)

        // redirect to res.url 
        console.log(res)
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

  const checkDiscount = async (package_id:any, code:any) => {
    try {
      const payload = {
        membership_id : package_id,
        code : code
      }
      const res = await api.post(`${baseUrl}/coupon`, payload)
      setDiscountRes(res)
    } catch (error:any) {
      setDiscountRes(error?.data)
    }
  }

  const renderInput = (i: number, placeholder: string) => (
    <div className="mb-1">
      <Input
        className="h-8 text-sm py-2 rounded-sm mb-2"
        type="email"
        placeholder={placeholder}
        value={emails[i]}
        onChange={(e) => handleChange(i, e.target.value)}
      />
      {validStatus[i] === "loading" && <p className="text-xs text-gray-500">Checking...</p>}
      {validStatus[i] === "valid" && <p className="text-xs text-green-500">Email valid</p>}
      {validStatus[i] === "invalid" && <p className="text-xs text-red-500">Email tidak valid</p>}
    </div>
  );

  return (
    <>
      <div className='container pt-20 pb-10 mt-20 flex flex-col lg:flex-row gap-7'>

        <div className='w-12/12 lg:w-9/12'>
          <div className='py-4'>
            <div className='font-noto_serif mb-4'>Available promo and coupon</div>
            <div className='w-full overflow-x-auto overflow-y-hidden flex gap-4'>
              
              {
                coupons && coupons.length > 0
                ? (
                  coupons.map((item: any, index: number) => (
                    <div key={index} className='relative bg-primary rounded-lg px-4 py-3 h-[85px] min-w-[220px] flex flex-col gap-1 justify-center cursor-pointer'>
                        <div className='bg-white dark:bg-gray-900 w-[20px] h-[20px] rounded-full absolute top-[-10px] left-[20px]'></div>
                        <div className='bg-white dark:bg-gray-900 w-[20px] h-[20px] rounded-full absolute bottom-[-10px] left-[20px]'></div>
                        <div className='flex justify-between items-center'>
                          <div className='text-white font-bold'>{item.code}</div>
                          {/* <RiClipboardFill className='text-white' /> */}
                        </div>
                        <div className='text-white flex justify-between'>
                            {
                              item?.type_discount == 'percent' ?
                              <p>{item?.discount}% off</p>
                              :
                              <p>{numberToIdr(item?.discount)}</p>
                            }
                            <div className='text-xs cursor-pointer hover:text-gray-400'><i>Details</i></div>
                        </div>
                    </div>
                  ))
                ) : <div></div>
              }
            </div>
          </div>
          
          <div className='p-5 border border-gray-200 rounded-lg'>
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
                      {
                        discountRes && discountRes?.status == 'success'
                        ? <span>
                            <span>{numberToIdr(discountRes?.data?.price_after_discount)}</span>
                            <s className='text-xs ml-2 text-red-600'>{numberToIdr(selectedPackage?.price)}</s>
                          </span>
                        : <span>{numberToIdr(selectedPackage?.price)}</span>
                      }
                      {/* <span>{numberToIdr(selectedPackage?.price)}</span> */}
                    </div>
                  </div>
              }
              
              {
                selectedPackage &&
                <div className='mb-4'>
                  <div className=' flex items-center'>
                    <Input onChange={(e) => setDiscountCode(e.target.value)} className='rouded-e-none' type="text" placeholder="Promo Code" />
                    <Button onClick={() => checkDiscount(selectedPackage?.id, discountCode)} className='rounded-s-none'>Apply</Button>
                  </div>
                  {/* {JSON.stringify(discountRes)} */}
                  {
                    discountRes && (
                      discountRes?.status == 'success' ?
                        <div className='pt-2 text-green-500'>
                          Yay, your discount <b>{discountRes?.data?.discount_type	== 'percent' ? discountRes?.data?.discount + '%' : numberToIdr(discountRes?.data?.discount)}</b> has been applied successfully
                        </div>
                      : <div>
                          <div className='pt-2 text-red-400 text-sm'><b><i>{discountRes?.message}</i></b></div>
                        </div>
                    )
                  }
                </div>
              }

              {selectedPackage && selectedPackage?.is_shared == 1 && (
                <div className="mb-4">
                  <div className="text-sm mb-2">
                    {selectedPackage?.shared_type} shared, Fill the email to share the credits
                  </div>
                  <div className="flex flex-col gap-1">
                    {renderInput(0, "Email 1")}
                    {selectedPackage?.shared_type === "family" && (
                      <div>
                        {renderInput(1, "Email 2")}
                        {renderInput(2, "Email 3")}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
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
                  disabled={selectedPackage === null }  
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