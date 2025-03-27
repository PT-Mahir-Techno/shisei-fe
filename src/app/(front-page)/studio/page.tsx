'use client'

import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import React, { useEffect } from 'react'
import StudioCard from './_parts/studio_card'
import { Skeleton } from '@/components/ui/skeleton'

const StudioPage = () => {

  const [loading, setLoading] = React.useState(false)
  const [studios, setStudios] = React.useState<any[]>([])

  useEffect(() => {
    init()
  },[])

  const init = async () => {
    setLoading(true)
    try {
      const res = await api.get(`${baseUrl}/studios`)
      setStudios(res.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <>
      <section className='pt-40 py-12 bg-cover bg-no-repeat bg-center'
        style={{ backgroundImage: 'url("/img/navbar-bg-2.png")' }}
      >
        <div className="container">
          <h2 className='font-noto_serif font-bold text-4xl text-center text-slate-100'>Our Studios</h2>
        </div>
      </section>

      <section className='my-32'>
        <div className='container'>
          {
            loading ? (
              <div className='flex flex-col gap-4'>
                {
                  Array.from({length: 3}).map((_, index) => (
                    <div className='flex gap-2' key={index}>
                      <Skeleton className='w-1/4 h-44' />
                      <div className='w-full flex flex-col gap-4'>
                        <Skeleton className='w-full h-4' />
                        <Skeleton className='w-full h-4' />
                        <Skeleton className='w-full h-20' />
                        <Skeleton className='w-1/4 h-4' />
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className='flex flex-col gap-6'>
                {
                  studios.map((studio, index) => (
                    <StudioCard key={index} data={studio} />
                  ))
                }
              </div>
            )
          }
        </div>
      </section>
    </>
  )
}

export default StudioPage