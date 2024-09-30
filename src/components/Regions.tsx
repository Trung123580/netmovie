"use client"
import { useEffect, useState } from "react"
import CardProduct from "@/components/CardProduct"
import TitlePath from "@/components/TitlePath"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Pagination } from "@/utils/moduleMaterial"
import { country } from "@/utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { setIsLoading } from "@/store/storeApi"
import { RootState } from "@/store/store"
import Loading from "@/components/Loading"
import useResize from "./hook/useResize"
import { useApp } from "@/context/ContextProvider"
import { PaginationItem } from "@mui/material"
enum numberPage {
  zero,
  one,
  two,
  three,
  four,
}
function Regions({ slug, dataDefault, page, yearDate }: { yearDate: string; page: number; slug: string; dataDefault: any }) {
  const { isLoading }: { isLoading: boolean | unknown } = useSelector((state: RootState) => state.storeApp)
  const [dataNewMovie, setDataNewMovie] = useState<any>([])
  const [totalPages, setTotalPages] = useState<number>(numberPage.one)
  const [year, setYear] = useState(() => {
    if (yearDate) {
      return Number(yearDate)
    } else {
      return 0
    }
  })
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
  const categoryName = country.find((item: any) => item.path === slug)?.name
  const handleScrollToTop = () => {
    window.scrollTo({ top: numberPage.one, behavior: "smooth" })
  }
  useEffect(() => {
    if (!dataDefault) return
      ; (async () => {
        dispatch(setIsLoading(false))
        setDataNewMovie(dataDefault?.items)
        setTotalPages(Number(dataDefault?.pagination.totalPages))
        handleScrollToTop()
      })()
  }, [searchPage, slug, dataDefault?.items.length, page])
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (year) {
      router.push(`${pathName}?page=${value}&year=${year}`)
      dispatch(setIsLoading(true))
      return
    }
    router.push(`${pathName}?page=${value}`)
    dispatch(setIsLoading(true))
  }
  const handleChangeYear = (event: { target: { value: number } }) => {
    if (event.target.value == 0) {
      router.push(`${pathName}`)
      dispatch(setIsLoading(true))
      return
    }
    setYear(event.target.value)
    router.push(`${pathName}?year=${event.target.value}`)
    dispatch(setIsLoading(true))
  }
  useEffect(() => {
    if (dataDefault?.items) {
      setDataNewMovie(dataDefault?.items)
      dispatch(setIsLoading(false))
      setTotalPages(Number(dataDefault?.pagination.totalPages))
      handleScrollToTop()
    }
  }, [dataDefault?.pagination?.totalItems])
  if (isLoading) {
    return <Loading />
  }
  if (!dataNewMovie.length) return null
  return (
    <div className='container'>
      <TitlePath year={year} sort={true} onChange={handleChangeYear} title={categoryName ?? ""} noSlide={true} onClickNext={() => null} onClickPrev={() => null} />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-x-5 gap-x-[15px] gap-y-6 md:gap-y-10'>
        {dataNewMovie.map((movie: any) => (
          <CardProduct
            key={movie._id}
            data={movie}
            device={device}
            onToggleMovie={() => onToggleMovie(movie)}
            findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item._id === movie._id)}
          />
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

export default Regions
