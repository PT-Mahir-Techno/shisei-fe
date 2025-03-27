'use client'

import { useContactPage } from '@/store/use-contact-page'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { RiFacebookBoxFill, RiInstagramFill, RiLinkedinBoxFill } from 'react-icons/ri'

const FooterFrontPage = () => {

  const {contact, getContacts, loading} = useContactPage()

  useEffect(() => {
    init()
  },[])

  const init = async () => {
    await getContacts()
  }

  return (
    <>
      <footer className="bg-primary py-16">
          <div className="container flex justify-between gap-4 flex-wrap">
            <div className="">
              <div className="mb-6">
                <Image src="/be-main-logo.png" alt="logo" width={200} height={100}/>
              </div>
              <div className="text-sm max-w-[300px] text-slate-200 leading-6">
              The ultimate studio for posture improvement and body realignment, helping you achieve optimal physical well-being with an instant and pain-free approach.
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
                  <a href={contact.facebook_url}>
                    <li className="mb-2 text-sm text-gray-200 font-semibold flex items-center"> 
                      <RiFacebookBoxFill className="mr-1 text-3xl" />  Facebook
                    </li>
                  </a>
                  <a href={contact.instagram_url}>
                    <li className="mb-2 text-sm text-gray-200 font-semibold flex items-center"> 
                      <RiInstagramFill className="mr-1 text-3xl" />  Instagram
                    </li>
                  </a>
                  <a href={contact.linkedin_url}>
                    <li className="mb-2 text-sm text-gray-200 font-semibold flex items-center"> 
                      <RiLinkedinBoxFill className="mr-1 text-3xl" />  Linkedin
                    </li>
                  </a>
                </ul>
              </div>
            </div>

            <div className="max-w-[305px]">
              <div className={"font-noto_serif mb-4 text-lg text-slate-200 font-bold"}>Contact Us</div>
              <div>
                <ul>
                  <li className="mb-2 text-sm text-gray-200">Email : {contact?.email}</li>
                  <li className="mb-2 text-sm text-gray-200">Telepon : {contact?.phone}</li>
                  <li className="mb-2 text-sm text-gray-200">Alamat : {contact?.address}</li>
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