"use client"
import { useEffect, useState } from "react"
import CardProduct from "@/components/CardProduct"
import TitlePath from "@/components/TitlePath"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Pagination } from "@/utils/moduleMaterial"
import { category } from "@/utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { setIsLoading } from "@/store/storeApi"
import { RootState } from "@/store/store"
import { storeState } from "@/store/storeApi"
import Loading from "@/components/Loading"
import useResize from "./hook/useResize"
import { useApp } from "@/context/ContextProvider"
import { PaginationItem } from "@mui/material"
import Button from "./Button"
enum numberPage {
  zero,
  one,
  two,
  three,
  four,
}
function Category({ slug, dataDefault, page}: { page: number; slug: string; dataDefault: any }) {
  const { isLoading }: storeState = useSelector((state: RootState) => state.storeApp)
  const [dataNewMovie, setDataNewMovie] = useState<any>([])
  const [totalPages, setTotalPages] = useState<number>(numberPage.one)
  // const [year, setYear] = useState(() => {
  //   if (yearDate) {
  //     return Number(yearDate)
  //   } else {
  //     return 0
  //   }
  // })
  console.log(dataDefault)
  
  const {
    currentUser,
    handle: { onToggleMovie },
  }: AuthContextType = useApp()
  const { device } = useResize()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const searchPage: number | null = Number(searchParams.get("page") ?? numberPage.one)
  const categoryName = slug === "hoat-hinh" ? "Anime" : category.find((item: any) => item.path === slug)?.name
  const handleScrollToTop = () => {
    window.scrollTo({ top: numberPage.one, behavior: "smooth" })
  }
  useEffect(() => {
    if (!dataDefault) return
    ( () => {
      dispatch(setIsLoading(false))
      setDataNewMovie(dataDefault?.items)
      setTotalPages(Number(dataDefault?.params?.pagination.totalPages))
      handleScrollToTop()
    })()
  }, [searchPage, slug, dataDefault?.items?.length, page])
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // if (year) {
    //   router.push(`${pathName}?page=${value}&year=${year}`)
    //   dispatch(setIsLoading(true))
    //   return
    // }
    router.push(`${pathName}?page=${value}`)
    dispatch(setIsLoading(true))
  }
  // const handleChangeYear = (event: { target: { value: number } }) => {
  //   if (event.target.value == 0) {
  //     router.push(`${pathName}`)
  //     dispatch(setIsLoading(true))
  //     return
  //   }
  //   setYear(event.target.value)
  //   router.push(`${pathName}?year=${event.target.value}`)
  //   dispatch(setIsLoading(true))
  // }
  useEffect(() => {
    if (dataDefault?.items) {
      setDataNewMovie(dataDefault?.items)
      dispatch(setIsLoading(false))
      setTotalPages(Number(dataDefault?.params?.pagination.totalPages))
      handleScrollToTop()
    }
  }, [dataDefault?.params?.pagination?.totalItems])
  if (isLoading) {
    return <Loading />
  }
  if (!dataNewMovie?.length) {
    return (
      <div className='container '>
        <div className='h-[70vh] flex items-center justify-center flex-col'>
          <h1 className='text-base md:text-2xl font-semibold text-primary capitalize'>( Hiện tại chưa có phim nào cho thể loại này / chưa cập nhập )</h1>
          <Button
            className='translate-y-3 text-center group-hover:-translate-y-0 hover:bg-primary hover:text-black hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-sm text-black font-semibold leading-none border-2 border-primary text-white w-36'
            content={"Quay lại"}
            onClick={() => router.back()}
          />
        </div>
      </div>
      )
  }
  return (
    <div className='container'>
      <TitlePath title={categoryName ?? ""} noSlide={true} onClickNext={() => null} onClickPrev={() => null} />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-x-5 gap-x-[15px] gap-y-6 md:gap-y-10'>
        {dataNewMovie.map((movie: any) => (
          <CardProduct key={movie._id} data={movie} device={device} onToggleMovie={() => onToggleMovie(movie)} findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item._id === movie._id)} />
        ))}
      </div>
      <div className='my-10 flex justify-end'>
        <Pagination
          renderItem={(item) => {
            return <PaginationItem className='!text-lg !text-white' {...item} />
          }}
          count={totalPages}
          page={Number(page)}
          onChange={handleChange}
          shape='rounded'
          color='primary'
          variant='outlined'
          className='wrapper_Pagination'
        />
      </div>
    </div>
  )
}

export default Category
