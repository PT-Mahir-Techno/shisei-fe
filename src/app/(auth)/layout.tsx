import Image from "next/image"

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <div className="h-screen bg-cover flex "
        style={{backgroundImage: 'url("/hero-bg.png")'}}
      >
        <div className="container flex justify-center md:justify-between items-center md:gap-12">
          <div className="hidden md:block">
            <Image src="/be-main-logo.png" alt="logo" width={250} height={0} className="mb-4"/>
            <h2 className="font-noto_serif font-bold text-6xl text-white leading-normal">
              Welcome in <br /> Be-Style® 
            </h2>
            <p className="text-slate-200 mt-7 leading-normal">
              The best place for therapy that helps you discover <br /> a better version of yourself.
            </p>
          </div>
          <div className="w-[450px]">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default layout