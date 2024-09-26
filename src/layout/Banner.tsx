"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "@/utils/moduleSwiper"
import Image from "next/image"
import Link from "next/link"
import { FaPlay, MdDateRange } from "@/utils/icons"
import { v4 as uuid } from "uuid"
// import BoxBG from "@/components/BoxBG"
// import BoxSolid from "@/components/BoxSolid"
// import { typeStatus } from "@/utils/constants"
import { Suspense, useEffect, useState } from "react"
import Loading from "@/components/Loading"
const Banner = ({ data, device }: { data: any; device: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [convertData, setConvertDta] = useState<any>([])
  useEffect(() => {
    ;(async () => {
      const dataConvert = await Promise.all(
        data.map((item: any) => {
          return new Promise((resolve) => {
            const image = document.createElement("img")
            image.src = item?.poster_url
            image.onload = (e) => {
              const width = (e.target as HTMLImageElement)?.width
              resolve({ ...item, isShow: width < 700 ? true : false })
            }
          })
        })
      )
      setConvertDta(dataConvert)
    })()
  }, [data])
  console.log(device)

  return (
    <Suspense fallback={<Loading></Loading>}>
      <div className='relative lg:top-0 w-full banner md:min-h-screen' id='banner'>
        <Swiper
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className='h-full'
          loop={true}
          keyboard={true}
          rewind={true}
          navigation={true}
          noSwiping={true}
          slidesPerView={1}
          modules={[Navigation, Autoplay]}>
          {convertData.map((movie: any) => {
            console.log(movie.isShow)
            console.log(device)

            return (
              <SwiperSlide key={uuid()}>
                <div className='relative'>
                  {!isLoading ? (
                    <Image
                      src={"/images/logo.jpg"}
                      onLoad={() => {
                        if (!isLoading) setIsLoading(true)
                      }}
                      className='w-full h-full object-contain md:h-[70vh] lg:h-screen'
                      alt=''
                      priority
                      width={1000}
                      height={1000}
                      sizes='100vw'
                    />
                  ) : movie.isShow && device === "pc" ? (
                    <Image src={"/images/logo.jpg"} className='w-full object-contain h-[45vh] md:h-[70vh] lg:h-screen rotate-45' alt='' priority width={1000} height={1000} sizes='100vw' />
                  ) : (
                    <Image src={movie?.poster_url} className={`w-full object-cover h-[45vh] md:h-[70vh] lg:h-screen`} alt='' priority width={1000} height={1000} sizes='100vw' />
                  )}
                  <div className='h-full w-full absolute top-0 left-0 bg-black/35'></div>
                  <div className='absolute position-center !top-[80%] !left-[54%]  sm:!left-[52%] md:!left-[54%] md:position-center z-30 w-full flex container  sm:!top-[80%] md:!top-[70%] h-[350px] lg:h-[480px] '>
                    <div className='flex-1 h-max z-20'>
                      <div className='text-white '>
                        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold font-VarelaRound text-primary md:mb-4 mb-2 md:w-3/4 text-wrap line-clamp-1 md:line-clamp-2 lg:line-clamp-none '>{movie.name}</h2>
                        <h4 className='text-lg sm:text-xl font-bold tracking-wide line-clamp-1'>{movie?.origin_name}</h4>
                      </div>
                      {movie?.casts && (
                        <div className='line-clamp-1 text-base md:text-lg'>
                          {movie?.casts?.split(",").map((item: string, _index: number, arr: string[]) => (
                            <span key={item}>{item === arr[arr.length - 1] ? item : `${item},`}</span>
                          ))}
                        </div>
                      )}
                      <div className='my-3 md:mt-5 md:mb-5 flex flex-wrap gap-x-3 gap-y-2 md:text-md font-medium *:flex-basis *:flex *:flex-center *:gap-x-1 '>
                        <div className='!gap-x-3 *:flex *:items-center *:gap-x-1'>
                          <div className='-tracking-tighter'>
                            <MdDateRange size={25} className='text-primary' />
                            <span className='text-nowrap'>{movie?.year ?? 0}</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/details/${movie.slug}`}
                        className='uppercase text-xs md:text-base gap-x-2 font-bold py-2 px-4 md:py-2 md:px-6 rounded-full border-2 border-primary duration-300 flex flex-center w-max hover:text-black hover:bg-primary'>
                        <FaPlay /> xem ngay
                      </Link>
                    </div>
                    <div className='z-20 w-32 h-full right-[5%] sm:relative md:-top-14 border-8 xl:-top-24 rounded-lg md:w-60 lg:w-72 xl:w-80 xl:h-[31rem] lg:h-[27rem] border-primary hidden md:block'>
                      <Image src={movie?.thumb_url} width={1000} height={1000} priority className='w-full h-full object-cover !aspect-[420/350]' alt='' />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </Suspense>
  )
}
export default Banner
