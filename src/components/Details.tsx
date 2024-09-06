"use client"
import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { useApp } from "@/context/ContextProvider"
import DetailsBanner from "@/layout/DetailsBanner"
import { usePathname, useSearchParams } from "next/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { v4 as uuid } from "uuid"
import { Autoplay } from "@/utils/moduleSwiper"
import ReactPlayer from "react-player"
import Button from "@/components/Button"
import Loading from "@/components/Loading"
import { popup, typeToast } from "@/utils/constants"
import TitlePath from "@/components/TitlePath"
import { checkVulgarWord, convertJson } from "@/utils/helpers"
import { useRouter } from "next/navigation"
import CardProduct from "@/components/CardProduct"
import { useDispatch, useSelector } from "react-redux"
import { getDetailMovie, getMoviesRelate } from "@/service"
import { RootState } from "@/store/store"
import { storeState } from "@/store/storeApi"
import useResize from "./hook/useResize"
enum numberPage {
  zero,
  one,
  two,
  three,
  four,
}
const date = new Date()
const Details = ({ slug }: { slug: string }) => {
  const router = useRouter()
  // const [dataDetailMovie, setDataDetailMovie] = useState<any>(null)
  const [dataRelated, setDataRelated] = useState<any>([])
  // const [dataMovie, setDataMovie] = useState<any>([])
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(false)
  const [linkPlay, setLinkPlay] = useState<string>("")
  const refMovie = useRef<any>(null)
  const refSwiper = useRef<any>(null)
  //   // comment
  //   const [comments, setComments] = useState<any>(() =>
  //     dataComment.length
  //       ? dataComment.map((it) => ({
  //           ...it,
  //           usersLike: convertJson(String(it.usersLike).replace(/'/g, '"')),
  //           repComments: it?.repComments.length
  //             ? it.repComments.map((item: itemComment) => {
  //                 return {
  //                   ...item,
  //                   usersLike: convertJson(String(item.usersLike).replace(/'/g, '"')),
  //                 }
  //               })
  //             : [],
  //         }))
  //       : []
  //   )
  //   const [idShowPopupComment, setIdShowPopupComment] = useState(0)
  //   const [idEditComment, setIdEditComment] = useState(0)
  //   // hidden comment
  //   const [listHiddenComment, setListHiddenComment] = useState<number[]>([])
  //   const [replyIdComment, setReplyIdComment] = useState(0)
  //   const [isPending, startPending] = useTransition()
  //   //replayComment
  //   const [idShowPopupReplyComment, setIdShowPopupReplyComment] = useState(0)
  //   const [idEditReplyComment, setIdEditReplyComment] = useState(0)
  //   const [listHiddenReplyComment, setListHiddenReplyComment] = useState<number[]>([])
  //   // sort
  //   const [typeSortComment, setTypeSortComment] = useState("newest")
  // const {
  //   user,
  //   isAuthenticated,
  //   currentUser,
  //   handle: { onLoading, onShowPopup, onShowToast, onToggleMovie, onAddHistory },
  // }: any = useApp()
  const {
    handle: { onShowPopup },
  }: AuthContextType = useApp()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const searchPractice: number | null = Number(searchParams.get("tap") ?? numberPage.one)
  const {
    data: { detail, relate },
  }: storeState = useSelector((state: RootState) => state.storeApp)
  const dispatch = useDispatch()
  const { device } = useResize()
  console.log(detail)
  console.log(linkPlay)

  useEffect(() => {
    dispatch(getDetailMovie({ slug }) as any)
    // ;(async () => {
    //   onLoading(true)
    //     updateViews({ slug }) // update
    //     const [response, dataCategory, dataRegions, countViews] = await Promise.all([getDetailsMovie(slug), getCategoryAndRegions("data-the-loai"), getCategoryAndRegions("data-quoc-gia"), getViews({ slug })])
    //     if (!response.data?.length) return
    //     const detailValue = response.data[numberPage.zero]
    //     setDataDetailMovie({
    //       ...detailValue,
    //       slugMovies: dataCategory.filter((item: any) => detailValue.category_ids.split(",").some((it: string) => Number(it) === Number(item.id))),
    //       slugRegions: dataRegions.filter((item: any) => detailValue.region_ids.split(",").some((it: string) => Number(it) === Number(item.id))),
    //       fillEpisodes: detailValue?.episode_current === "Full" ? 1 : detailValue.status === "completed" || detailValue.status === "ongoing" ? detailValue?.episode_total.split(" ")[0] : String(detailValue?.episode_current).split(" ")[1],
    //       totalViews: countViews?.views ?? 0,
    //     })
    //   onLoading(false)
    // })()
  }, [slug])
  useEffect(() => {
    if (detail) {
      setIsLoadingVideo(false)
      setLinkPlay(detail.episodes[0].server_data[0].link_embed)
      dispatch(getMoviesRelate({ country: detail.movie.country[0]?.slug, status: detail.movie.status }) as any)
    }
  }, [detail])
  console.log(relate)

  // call episodes
  // phim le type single
  // phim tap series
  // console.log(dataDetailMovie)
  // useEffect(() => {
  //   if (dataDetailMovie && currentUser) onAddHistory(dataDetailMovie, currentUser)
  // }, [dataDetailMovie, currentUser, slug])
  // const isCheckPackage = currentUser?.historyPay.length
  //   useEffect(() => {
  //     if (!dataDetailMovie) return
  //     (async () => {
  //       const checkMovie = dataDetailMovie.type === "single"
  //       setIsLoadingVideo(true)
  //       if (!isCheckPackage && searchPractice > 2) {
  //         router.back()
  //         return
  //       }
  //     //   const resMovie = await getEpisodesMovie(slug, checkMovie ? "full" : searchPractice)
  //     //   setDataMovie(resMovie.data)
  //       setIsLoadingVideo(false)
  //       if (Number(searchPractice) !== 1 && !!refMovie.current) {
  //         refMovie.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  //       } else {
  //         window.scrollTo({ top: 0, behavior: "smooth" })
  //       }
  //     })()
  //   }, [dataDetailMovie, searchPractice, refMovie.current, isCheckPackage])
  //   useEffect(() => {
  //     if (!dataDetailMovie) return
  //     const MAX_ITEM = 24
  //     const dataCategory = dataDetailMovie.slugMovies(async () => {
  //       const maxCount = Math.round(MAX_ITEM / dataCategory.length)
  //       const dataResultRelated = await dataCategory.reduce(async (accPromise: any, item: any) => {
  //         const relatedMovies = await getRelatedMovies(item.cate_slug, maxCount)
  //         const acc = await accPromise // acc la 1 promise cần await chuyển đổi promise thành dữ liệu js
  //         return [...acc, ...relatedMovies]
  //       }, Promise.resolve([]))
  //       const filterMovieId = Array.from(new Set(dataResultRelated.map((movie: any) => movie.id))) // set lọc ra các id trùng nhau lấy 1 => 1 [] chỉ lưu các id
  //       const filterMovie = filterMovieId.map((movieId) => dataResultRelated.find((movie: any) => movie.id === movieId))
  //       // random movie
  //       setDataRelated(
  //         filterMovie.sort(function () {
  //           return 0.5 - Math.random()
  //         })
  //       )
  //     })()
  //   }, [dataDetailMovie, slug])

  // const fillEpisodes = Array(Number(dataDetailMovie?.fillEpisodes ?? 1)).fill(0)
  //swiper
  const handleNext = useCallback(() => {
    if (refSwiper.current) refSwiper.current?.swiper.slidePrev()
  }, [refSwiper.current])

  const handlePrev = useCallback(() => {
    if (refSwiper?.current) refSwiper.current?.swiper.slideNext()
  }, [refSwiper.current])

  // sort
  //   useEffect(() => {
  //     if (typeSortComment === "newest") {
  //       setComments(
  //         [...comments].sort((a, b) => {
  //           if (a.date > b.date) return 1
  //           if (a.date < b.date) return -1
  //           return 0
  //         })
  //       )
  //       return
  //     }
  //     if (typeSortComment === "oldest") {
  //       setComments(
  //         [...comments].sort((a, b) => {
  //           if (a.date > b.date) return -1
  //           if (a.date < b.date) return 1
  //           return 0
  //         })
  //       )
  //       return
  //     }
  //     if (typeSortComment === "featured") {
  //       setComments(
  //         [...comments].sort((a, b) => {
  //           if (a.likes > b.likes) return -1
  //           if (a.likes < b.likes) return 1
  //           return 0
  //         })
  //       )
  //       return
  //     }
  //   }, [typeSortComment])
  // const disableEpisode = (index: number) => {
  //   const checkMovie = dataDetailMovie.type === "single"
  //   if (isCheckPackage) {
  //     return true
  //   }
  //   if (checkMovie) {
  //     return true
  //   }
  //   if (!checkMovie) {
  //     return index > 1 ? false : true
  //   }
  // }

  const handleMouseEnter = () => {
    if (refSwiper.current && refSwiper.current.swiper) {
      refSwiper.current.swiper.autoplay.stop()
    }
  }

  const handleMouseLeave = () => {
    if (refSwiper.current && refSwiper.current.swiper) {
      refSwiper.current.swiper.autoplay.start()
    }
  }

  if (!detail) return <></>
  return (
    <>
      <DetailsBanner data={detail?.movie} popup={popup} onShowPopup={onShowPopup} />
      {/* popup={popup} findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === dataDetailMovie.id)} onToggleMovie={() => onToggleMovie(dataDetailMovie)} */}
      <div className='bg-overlay py-14'>
        <div className='container'>
          <h3 className='text-base font-bold mb-4'>Vietsub #1</h3>
          <div className={`grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-12 text-center gap-2`}>
            {/* {fillEpisodes.map((_it: any, index: number, arr: any) => {
              // const callDisableEpisode = !disableEpisode(index)
              return (
                <Button
                  key={uuid()}
                  onClick={() => {
                    // if (callDisableEpisode) {
                    //   onShowToast("vui lòng mua gói để xem tập tiếp theo", typeToast.error)
                    //   onShowPopup(popup.packages)
                    //   return
                    // }
                    setIsLoadingVideo(true)
                    router.push(`${pathName}?tap=${index + numberPage.one}`)
                  }}
                  content={arr.length === 1 ? "Full" : index + 1}
                  // className={`${Number(searchPractice) === index + 1 ? "!bg-primary text-black" : ""} bg-white/5 rounded hover:bg-primary ${callDisableEpisode ? "hover:bg-white/5 hover:text-white lock" : ""}  duration-200 py-1 hover:text-black`}
                />
              )
            })} */}
          </div>
          <div className='max-w-5xl mx-auto mt-16' ref={refMovie}>
            {isLoadingVideo ? (
              <div className='animate-pulse bg-white/5  w-full aspect-video overflow-hidden bg-stone-900 rounded-md relative'>
                <Loading hFull={true} />
              </div>
            ) : (
              <></>
              // <video controls={true} autoPlay={true} className='w-full bg-white/5 aspect-video overflow-hidden bg-stone-900 rounded-md' src={linkPlay}></video>
              // <iframe
              //   allowFullScreen
              //   referrerPolicy='no-referrer'
              //   scrolling='no'
              //   className='w-full bg-white/5 aspect-video overflow-hidden bg-stone-900 rounded-md'
              //   src={linkPlay ?? ""}
              //   frameBorder='0'
              //   allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
              // <ReactPlayer url={linkPlay} playing={true} className='w-full bg-white/5 aspect-video overflow-hidden bg-stone-900 rounded-md' />
            )}
          </div>
        </div>
      </div>
      <div className='container'>{/* <Comments {...optionComment} /> */}</div>
      <div className='container'>
        <TitlePath title='Phim Liên Quan' onClickNext={() => handleNext()} onClickPrev={() => handlePrev()} />
        <Swiper
          ref={refSwiper}
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
          autoplay={{
            delay: 5000,
          }}
          modules={[Autoplay]}>
          {dataRelated.map((movie: any) => (
            <SwiperSlide key={movie?.movie_id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <CardProduct
                device={device}
                data={movie}
                // onToggleMovie={() => onToggleMovie(movie)}
                //  findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === movie.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default Details
