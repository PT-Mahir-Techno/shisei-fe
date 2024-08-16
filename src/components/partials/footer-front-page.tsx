import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RiFacebookBoxFill, RiInstagramFill, RiLinkedinBoxFill } from 'react-icons/ri'

const FooterFrontPage = () => {
  return (
    <>
      <footer className="bg-primary py-16">
          <div className="container flex justify-between gap-4 flex-wrap">
            <div className="">
              <div className="mb-6">
                <Image src="/be-main-logo.png" alt="logo" width={200} height={100}/>
              </div>
              <div className="text-sm max-w-[276px] text-slate-200 leading-6">
                The best platform to find therapy services that help you achieve mental and physical well-being.
              </div>
            </div>

            <div className="min-w-[200px]">
              <div className={"font-noto_serif mb-4 text-lg text-slate-200 font-bold"}>Navigation</div>
              <div>
                <ul>
                  <li className="mb-2 text-sm text-gray-300"><Link href="/">Home</Link></li>
                  <li className="mb-2 text-sm text-gray-300"><Link href="/booking">Booking</Link></li>
                  <li className="mb-2 text-sm text-gray-300"><Link href="/about">About Us</Link></li>
                  <li className="mb-2 text-sm text-gray-300"><Link href="/philosophy">Philosophy</Link></li>
                  <li className="mb-2 text-sm text-gray-300"><Link href="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>

            <div className="min-w-[200px]">
              <div className={"font-noto_serif mb-4 text-lg text-slate-200 font-bold"}>Social Media</div>
              <div>
                <ul>
                  <li className="mb-2 text-sm text-gray-200 font-semibold flex items-center"> 
                    <RiFacebookBoxFill className="mr-1 text-3xl" />  Facebook
                  </li>
                  <li className="mb-2 text-sm text-gray-200 font-semibold flex items-center"> 
                    <RiInstagramFill className="mr-1 text-3xl" />  Instagram
                  </li>
                  <li className="mb-2 text-sm text-gray-200 font-semibold flex items-center"> 
                    <RiLinkedinBoxFill className="mr-1 text-3xl" />  Linkedin
                  </li>
                </ul>
              </div>
            </div>

            <div className="max-w-[305px]">
              <div className={"font-noto_serif mb-4 text-lg text-slate-200 font-bold"}>Contact Us</div>
              <div>
                <ul>
                  <li className="mb-2 text-sm text-gray-200">Email : support@therapyweb.com</li>
                  <li className="mb-2 text-sm text-gray-200">Telepon : (021) 123-4567</li>
                  <li className="mb-2 text-sm text-gray-200">Alamat : Jl. Raya Krapyak, RT.05, Karanganyar Ds, sambirejo, Wedomartani, Kec. Ngemplak, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55584</li>
                </ul>
              </div>
            </div>
          </div>
      </footer>

      <section>
        <div className="container p-[18px] text-sm text-center text-gray-700 dark:text-slate-300">
          Copyright © 2024 Be - Style®, All rights reserved.
        </div>
      </section>
    </>
  )
}

export default FooterFrontPage