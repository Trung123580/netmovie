"use client"
import Banner from "@/layout/Banner"
import { Swiper, SwiperSlide, Autoplay } from "@/utils/moduleSwiper"
import { useEffect, useCallback, useMemo, useRef, useState } from "react"
import { getAllHomeCategory, getBanner } from "@/service"
import { RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import Loading from "./Loading"
import { storeState } from "@/store/storeApi"
import { useApp } from "@/context/ContextProvider"
import TitlePath from "./TitlePath"
import CardProduct from "./CardProduct"
import Button from "./Button"
import { MdNavigateNext } from "react-icons/md"
import useResize from "./hook/useResize"
const HomeApp = () => {
  const dispatch = useDispatch()
  const { data }: storeState = useSelector((state: RootState) => state.storeApp)
  const {device} = useResize()
  const categoryRenderHome = [
    {
      name: "Hành động",
      ref: useRef(null),
      path: "hanh-dong",
    },
    {
      name: "Anime",
      ref: useRef(null),
      path: "hoat-hinh",
    },
    {
      name: "Kinh dị",
      ref: useRef(null),
      path: "kinh-di",
    },
    {
      name: "Viễn tưởng",
      ref: useRef(null),
      path: "vien-tuong",
    },
  ]
  const {
    currentUser,
    handle: { onToggleMovie },
  }: AuthContextType = useApp()

  const handleNext = useCallback(
    (index: number) => {
      const findSwiper: any = categoryRenderHome.find((_item, indexRef) => indexRef === index)
      if (findSwiper?.ref.current) {
        const swiper = findSwiper.ref.current.swiper
        swiper.slidePrev()
      }
    },
    [categoryRenderHome]
  )
  const handlePrev = useCallback(
    (index: number) => {
      const findSwiper: any = categoryRenderHome.find((_item, indexRef) => indexRef === index)
      if (findSwiper?.ref.current) {
        const swiper = findSwiper.ref.current.swiper
        swiper.slideNext()
      }
    },
    [categoryRenderHome]
  )

  useEffect(() => {
    dispatch(getBanner(1) as any)
    dispatch(getAllHomeCategory() as any)
  }, [])
  useEffect(() => {
    if (data?.category.length) {
      if (window) window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [data?.category])

  if (!data) return <Loading />
  return (
    <>
      <Banner data={data?.banner?.items ?? []} />
      <div className='bg-overlay'>
        <div className='container'>
          {data?.category.map((key: string, index: number) => {
            const { ref, name, path }: any = categoryRenderHome.find((_item, indexRef) => indexRef === index)
            return (
              <div key={index}>
                <TitlePath title={name} onClickNext={() => handleNext(index)} onClickPrev={() => handlePrev(index)} />
                <Swiper
                  ref={ref}
                  autoplay={{
                    delay: index === 0 ? 5000 : index === 1 ? 8000 : 13000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  breakpoints={{
                    200: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    360: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    480: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    600: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    728: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    984: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1248: {
                      slidesPerView: 4,
                    },
                  }}
                  spaceBetween={20}
                  loop={true}
                  keyboard={true}
                  rewind={true}
                  noSwiping={true}
                  slidesPerView={4}
                  modules={[Autoplay]}>
                  {data?.category[index]?.items.map((movie: any) => (
                    <SwiperSlide key={movie._id}>
                      <CardProduct data={movie} device={device} onToggleMovie={() => onToggleMovie(movie)} findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item._id === movie._id)} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className='mt-7 flex-center'>
                  <Button
                    className='border rounded-md border-primary py-2 px-5 flex items-center flex-row-reverse font-semibold hover:bg-primary duration-300 hover:text-black'
                    href={`/the-loai/${path}`}
                    content={`Xem Tất Cả`}
                    icon={<MdNavigateNext className='h-5 w-6' />}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HomeApp
