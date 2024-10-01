'use client'

import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import Image from 'next/image'
import React, { useEffect } from 'react'

const GalerySection = () => {
  const [loading, setLoading] = React.useState(false)
  const [images, setImages] = React.useState<{ image_url: string }[]>([])

  useEffect(() => {
    init()
  },[])
  const init = async () => {
    setLoading(true)
    try {
      const res = await api.get(`${baseUrl}/gallery`)
      setImages(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  return (
    <div className="container mb-[120px]">
      <div className={"font-noto_serif text-3xl font-semibold text-center mb-16"}>
        <span className="text-primary">Be-Style®</span><span>Galerry.</span>
      </div>
        {
          loading
          ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {
                Array(8).fill(0).map((_, index) => (
                  <Skeleton key={index} className="w-[300px] h-[300px]"/>
                ))
              }
            </div>
          )
          : (
            <div className="grid grid-cols-2 md:grid-cols-4  gap-4">
              {
                images.map((image, index) => (
                  <Image key={index} src={image?.image_url} alt="logo" width={300} height={300}/>
                ))
              }
              {/* <Image src="/img/why-img.png" alt="logo" width={400} height={400}/> */}
            </div>
          )
        }
    </div>
  )
}

export default GalerySection