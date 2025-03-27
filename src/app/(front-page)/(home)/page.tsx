import { Button } from "@/components/ui/button";
import Image from "next/image";
import BookSection from "./_parts/book_section";
import "../../styles/animations.css";
import GalerySection from "./_parts/galery_section";


export default function Home() {

  // const al = "trus"
  // console.log(al<boolean>);

  return (
    <div className="page-animation">
      {/* hero */}
      
      <section
        className="h-[550px] md:h-[700px] bg-cover bg-center bg-no-repeat pt-[160px] md:pt-[200px]"
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      >
        <div className="container">
          <h1 className="text-4xl md:text-7xl lg:text-7xl text-white leading-normal font-bold font-noto_serif">
          Enhance Your <br /> Posture, Elevate <br /> Your Life
          </h1>
          <p className="text-slate-100 mt-7 leading-normal">
            The best place for posture improvement that helps <br /> you discover a better version of yourself
          </p>
        </div>
      </section>
      {/* end hero */}


      {/* book */}
      <BookSection/>
      {/* end book */}

      {/* about */}
      <section>
        <div className="container flex flex-wrap gap-20  py-[100px]">
          <div className="w-[500px] bg-primary p-[40px] rounded-md ">
            <Image src="/be-main-logo.png" alt="logo" width={300} height={0}/>
          </div>
          <div className="w-[600px]">
            <div className="text-primary mb-2">About Us</div>
            <div className={"font-noto_serif mb-2 text-2xl font-bold"}>
              <span className="text-gray-600 dark:text-slate-300">Welcome to</span>  <span className="text-primary">Be-Style</span> 
            </div>
            <div className="text-sm text-gray-500 mb-4 dark:text-slate-200">
              At Be-Style Studio, we believe that good posture is the foundation of a healthier, more confident life. Originating from Japan, our unique Shisei Method focuses on instant posture improvement without pain, medication, or invasive procedures.
              Our expert trainers are dedicated to helping you achieve a naturally aligned body, reducing discomfort, and enhancing overall well-being. Whether you struggle with back pain, poor posture, or mobility issues, Be-Style provides personalized solutions tailored to your needs.
              Join us and experience posture transformation like never before—feel lighter, move better, and live healthier
            </div>
            <div>
              <Button>Read More</Button>
            </div>
          </div>
        </div>
      </section>
      {/* end about */}

      {/* why us */}
      <section
        className="bg-cover bg-center bg-no-repeat w-full"
        style={{ backgroundImage: 'url("/img/section-bg.png")' }}
      >
        <div className="container py-16">
          <div className={"font-noto_serif text-slate-200 mb-4"}>
            <div className="mb-2 text-xl">Why Us ?</div>
            <div className="mb-4 text-2xl font-bold">Why Choose  Be-Style®?</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            
            <div className="w-full h-[150px] bg-gray-900/50 rounded-md shadow-md flex items-center gap-4 p-6">
              <div className="min-w-[37px] self-start mt-4">
                <Image src="/img/badge.png" alt="logo" width={37} height={0}/>
              </div>
              <div>
                <div className="text-lg font-bold mb-2 text-slate-100">Flexible Packages</div>
                <div className="text-sm leading-normal text-slate-300">
                  Choose a plan that fits your lifestyle, goals, and budget.
                </div>
              </div>
            </div>

            <div className="w-full h-[150px] bg-gray-900/50 rounded-md shadow-md flex items-center gap-4 p-6">
              <div className="min-w-[37px] self-start mt-4">
                <Image src="/img/badge.png" alt="logo" width={37} height={0}/>
              </div>
              <div>
                <div className="text-lg font-bold mb-2 text-slate-100">Professional Therapists</div>
                <div className="text-sm leading-normal text-slate-300">
                  Every session is tailored to your body’s needs for optimal results.
                </div>
              </div>
            </div>
  
            <div className="w-full h-[320px] bg-gray-900/50 rounded-md shadow-md md:row-span-2 bg-cover"
              style={{ backgroundImage: 'url("/img/why-img.png")' }}
            ></div>

            <div className="w-full h-[150px] bg-gray-900/50 rounded-md shadow-md flex items-center gap-4 p-6">
              <div className="min-w-[37px] self-start mt-4">
                <Image src="/img/badge.png" alt="logo" width={37} height={0}/>
              </div>
              <div>
                <div className="text-lg font-bold mb-2 text-slate-100">Personalized Service</div>
                <div className="text-sm leading-normal text-slate-300">
                  Our certified experts guide you through effective posture improvement techniques.
                </div>
              </div>
            </div>

            <div className="w-full h-[150px] bg-gray-900/50 rounded-md shadow-md flex items-center gap-4 p-6">
              <div className="min-w-[37px] self-start mt-4">
                <Image src="/img/badge.png" alt="logo" width={37} height={0}/>
              </div>
              <div>
                <div className="text-lg font-bold mb-2 text-slate-100">Easy Booking</div>
                <div className="text-sm leading-normal text-slate-300">
                    Experience noticeable changes without discomfort, using our proven Shisei Method from Japan.
                </div>
              </div>
            </div>
            
            {/* <div className="w-full h-[150px] bg-background rounded-md shadow-md"></div> */}
          </div>
        </div>
      </section>
      {/* end why us */}

      {/* be concept */}
      <section>
        <div className="container pt-24 mb-[120px]">
          <div className={"font-noto_serif text-3xl font-semibold text-center mb-16"}>
            <span className="text-primary">Be-Style®</span><span>Concept.</span>
          </div>

          <div className="flex flex-wrap md:flex-nowrap justify-between gap-12 ">
            <div className="w-full flex flex-col justify-center flex-wrap">
              <div className={"font-noto_serif mb-8 text-2xl md:text-3xl font-bold text-gray-600 dark:text-slate-200 lg:pr-24"}>
                Do you have issues like these?
              </div>
              <div className="text-sm text-slate-500 leading-relaxed dark:text-slate-300 text-justify lg:pr-24">
                Rest your overused muscles and activate the underused ones. By combining relaxation and targeted movement, you can achieve a balanced body and make lasting changes without strain—this is the core concept of Be-Style.
                Would you like to discover the power of self-conditioning to address discomfort or pain at its root, so you can naturally restore balance to your body?
              </div>
            </div>

            {/* <div className="w-full h-[300px] bg-contain bg-center bg-no-repeat" style={{ backgroundImage: 'url("/img/img_issue.png")' }}>
            </div> */}
            <div className="w-full">
              <Image src="/img/img_issue.png" alt="logo" width={600} height={400}/>
            </div>
          </div>

        </div>
        <div className="container pb-24">
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-8">
            {/* <div className="w-full h-[300px] bg-cover bg-center bg-no-repeat rounded-lg shadow-md" style={{ backgroundImage: 'url("/img/why-img.png")' }}>
            </div> */}
            <div className="w-full">
              <Image src="/img/img_program.png" alt="logo" width={540} height={400}/>
            </div>
            <div className="w-full flex flex-col justify-center">
              <div className={"font-noto_serif mb-6 text-2xl md:text-3xl font-bold text-gray-600 line-clamp-4 dark:text-slate-200"}>
                Smart Training: Where Technology Meets Wellness
              </div>
              <div className="text-sm text-justify text-slate-500 leading-relaxed dark:text-slate-300">
                At Be-Style, we customize private sessions by integrating various techniques tailored to each client’s unique needs.
                We also incorporate cutting-edge training methods, such as the Power Plate, which enhances muscle activation efficiently in a short time, and the Pilates Reformer, which helps strengthen and realign the body from the inside out with minimal strain
              </div>
            </div>
          </div>
        </div>

        <GalerySection />

      </section>
      {/* end be concept */}


      <section style={{ backgroundImage: 'url("/img/section-bg.png")' }} className="bg-cover bg-center bg-no-repeat">
        <div className="container text-center py-16">
          <div className={"font-noto_serif text-2xl md:text-3xl font-semibold mb-8 text-background leading-snug dark:text-slate-200"}>
          Don’t wait any longer to become the best version of <br /> yourself. Begin your path to health and happiness <br /> with our professional support.
          </div>
          <div>
            <Button variant={"secondary"}>Book Your Session Now</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
