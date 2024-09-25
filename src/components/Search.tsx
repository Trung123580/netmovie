"use client"
import { useCallback, useEffect } from "react"
import CardProduct from "@/components/CardProduct"
import TitlePath from "@/components/TitlePath"
import { storeState } from "@/store/storeApi"
import { RootState } from "@/store/store"
import { Pagination } from "@/utils/moduleMaterial"
import { useApp } from "@/context/ContextProvider"
import { PaginationItem } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Button from "@/components/Button"
import { useDispatch, useSelector } from "react-redux"
import { getSearchMovies } from "@/service"
import useResize from "./hook/useResize"
import Loading from "./Loading"
enum numberPage {
  zero,
  one,
  two,
  three,
  four,
}
const Search = ({ query, page }: { query: string; page: number }) => {
  const searchParams = useSearchParams()
  const { device } = useResize()
  const router = useRouter()
  const pathName = usePathname()
  // const searchPage: number | null = Number(searchParams.get('page') ?? numberPage.one);
  console.log(query)
  const {
    currentUser,
    handle: { onToggleMovie },
  }: any = useApp()
  // const handleScrollToTop = () => {
  //   window.scrollTo({ top: numberPage.one, behavior: 'smooth' });
  // };
  const {
    isLoading,
    data: { search },
  }: storeState = useSelector((state: RootState) => state.storeApp)
  const { items, pagination } = search
  const { totalPages, currentPage, totalItems, totalItemsPerPage } = pagination
  const dispatch = useDispatch()
  console.log(pagination, items)
  console.log(search)

  useEffect(() => {
    ;(async () => {
      dispatch(getSearchMovies({ keyWord: query, page: page }) as any)
    })()
  }, [query, page])
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(pathName + "?" + createQueryString("page", String(value)))
    // dispatch(setIsLoading(true))
  }
  if (isLoading) {
    return <Loading />
  }
  if (!items.length) {
    return (
      <div className='container '>
        <div className='h-[70vh] flex items-center justify-center flex-col'>
          <h1 className='text-base md:text-2xl font-semibold text-primary capitalize'>( không tìm thấy phim / chưa cập nhập )</h1>
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
      <TitlePath title={`Kết quả tìm kiếm ${query}`} noSlide={true} onClickNext={() => null} onClickPrev={() => null} />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-x-5 gap-x-[15px] gap-y-6 md:gap-y-10'>
        {items.map((movie: any) => (
          <CardProduct device={device} data={movie} key={movie.id} onToggleMovie={() => onToggleMovie(movie)} findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item._id === movie._id)} />
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

export default Search
