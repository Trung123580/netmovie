"use client"
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react"
import { useApp } from "@/context/ContextProvider"
import DetailsBanner from "@/layout/DetailsBanner"
import { usePathname, useSearchParams } from "next/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { v4 as uuid } from "uuid"
import { Autoplay } from "@/utils/moduleSwiper"
import ReactPlayer from "react-player"
import Button from "@/components/Button"
import { FaCirclePlay, FaCirclePause, AiOutlineLoading3Quarters } from "../utils/icons"
import Loading from "@/components/Loading"
import { popup, typeToast } from "@/utils/constants"
import TitlePath from "@/components/TitlePath"
import { checkVulgarWord, convertJson, convertLinkPlayer, formatDuration } from "@/utils/helpers"
import { useRouter } from "next/navigation"
import CardProduct from "@/components/CardProduct"
import { useDispatch, useSelector } from "react-redux"
import { getDetailMovie, getMoviesRelate } from "@/service"
import { RootState } from "@/store/store"
import { clearDataCategory, storeState } from "@/store/storeApi"
import useResize from "./hook/useResize"
import VideoControl from "./Video/VideoControl"
import { togglePlayVideo } from "@/store/storeAction"
import Image from "next/image"
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
  const [dataRelated, setDataRelated] = useState<any>([])
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(false)
  const [dataVideo, setDataVideo] = useState<dataVideo>({
    linkPlay: "",
    type: "",
  })
  const [currentSeconds, setCurrentSeconds] = useState<number>(0)
  const [volume, setVolume] = useState(100)
  const { linkPlay, type } = dataVideo
  const refMovie = useRef<any>(null)
  const refPlayer = useRef<any>(null)
  const refSwiper = useRef<any>(null)
  const refTimeOut = useRef<NodeJS.Timeout | null>(null)
  const [statePlayVideo, setStatePlayVideo] = useState({
    // isPlay: false,
    // isShowIcon: false,
    defaultIsPlay: true,
    // isMouse: true,
    isLoadingVideo: false,
    // quality: localStorage.getItem("quality") || "720p", // tao localStorage
    // isOpenQuality: false,
    // isOpenSetting: false,
    percentSecondsLoaded: 0,
    // isOpenDrawer: false,
  })
  const [stateScreenMode, setStateScreenMode] = useState({
    isTheaterMode: false,
    isMiniPlayer: false,
  })
  const { percentSecondsLoaded, defaultIsPlay } = statePlayVideo
  const { isMiniPlayer, isTheaterMode } = stateScreenMode
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
  const { isPlay } = useSelector((state: RootState) => state.storeAction)
  const dispatch = useDispatch()
  const { device } = useResize()
  const defaultPosterVideo = useMemo(() => {
    if (!detail) return ""
    return detail.movie.poster_url
  }, [detail])
  console.log(detail)
  console.log(linkPlay)
  console.log(defaultPosterVideo)

  useEffect(() => {
    dispatch(getDetailMovie({ slug }) as any)
    return () => dispatch(clearDataCategory(null) as any)
  }, [slug])
  useEffect(() => {
    if (refPlayer.current) {
      const seconds = refPlayer.current.getSecondsLoaded()
      const duration = refPlayer.current.getDuration()
      const ratio = Math.min(Math.floor((seconds / duration) * 100), 100)
      setStatePlayVideo((prev) => ({ ...prev, percentSecondsLoaded: ratio }))
    }
  }, [refPlayer, currentSeconds])
  useEffect(() => {
    let time: any
    if (detail) {
      setIsLoadingVideo(false)
      if (detail.episodes.length === 0) {
        time = setTimeout(() => {
          router.back()
        }, 5000)
        return
      }
      const defaultLink = (detail.episodes[0]?.server_data[0].link_embed as string) ?? ""
      const checkLink = convertLinkPlayer({ link: defaultLink })
      if (checkLink.type === "video") {
        setDataVideo({ linkPlay: checkLink.linkPlay, type: "video" })
      } else {
        setDataVideo({ linkPlay: checkLink.linkPlay, type: "iframe" })
      }
      dispatch(getMoviesRelate({ country: detail.movie.country[0]?.slug, status: detail.movie.status }) as any)
    }
    return () => time && clearTimeout(time)
  }, [detail])
  console.log(relate)
  const handleNext = useCallback(() => {
    if (refSwiper.current) refSwiper.current?.swiper.slidePrev()
  }, [refSwiper.current])

  const handlePrev = useCallback(() => {
    if (refSwiper?.current) refSwiper.current?.swiper.slideNext()
  }, [refSwiper.current])

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
  const handleTogglePlayVideo = () => dispatch(togglePlayVideo(!isPlay))
  const handleToggleMiniMap = () => setStateScreenMode((prev) => ({ ...prev, isMiniPlayer: !prev.isMiniPlayer }))
  // const handleGetDuration = (e:) =>
  useEffect(() => {
    let video: any
    if (linkPlay) {
      video = document.createElement("video") as HTMLVideoElement
      video.src = linkPlay
      video.addEventListener("loadeddata", (e: any) => {
        console.log(e)
      })
    }
  }, [linkPlay])
  const optionVideoControls = {
    isPlay: isPlay,
    volume: volume,
    currentSeconds: currentSeconds,
    secondsLoaded: percentSecondsLoaded || 0,
    maxDuration: refPlayer.current?.getDuration(),
    slots: formatDuration(currentSeconds),
    changeCurrentTime: formatDuration(Number(Math.floor(refPlayer.current?.getDuration())) - Number(currentSeconds)),
    onChangeCommitted: (_: any, value: any) => refPlayer.current.seekTo(value),
    onTogglePlayVideo: handleTogglePlayVideo,
    onChange: (_: any, value: number) => setCurrentSeconds(Math.floor(value)),
    onChangeVolume: (_e: any, value: number) => setVolume(value),
    setChangeVolume: (number: number) => setVolume(number),
    onChangeTheaterMode: async () => {
      setStateScreenMode((prev) => ({ ...prev, isTheaterMode: !prev.isTheaterMode }))
      if (document.fullscreenElement !== null) await document.exitFullscreen()
      // scroll center
      refTimeOut.current = setTimeout(() => {
        refMovie.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
      }, 100)
    },
    onToggleMiniMap: handleToggleMiniMap,
    onChangeFullScreen: async () => {
      if (!refPlayer.current) return
      if (document.fullscreenElement === null) {
        const wrapperVideo = document.querySelector("#wrapperVideo")
        if (wrapperVideo) await wrapperVideo.requestFullscreen()
      } else {
        await document.exitFullscreen()
        // scroll center
        refTimeOut.current = setTimeout(() => {
          refMovie.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
        }, 100)
      }
    },
  }
  useEffect(() => {
    const wrapperVideo = document.querySelector("#wrapperVideo")
    const wrapperControl = document.querySelector("#wrapperControl")
    const btnPlay = document.querySelector("#btnPlay")
    if (!isPlay) {
      wrapperVideo?.classList.remove("cursor-none")
      wrapperControl?.classList.remove("hidden")
      btnPlay?.classList.remove("hidden")
    }
    // default anh khi chua play video
    if (isPlay && defaultIsPlay) setStatePlayVideo((prev) => ({ ...prev, defaultIsPlay: false }))
    // handle hide mouse
    const handleHideController = () => {
      if (refTimeOut.current) clearTimeout(refTimeOut.current)
      wrapperVideo?.classList.remove("cursor-none")
      wrapperControl?.classList.remove("hidden")
      refTimeOut.current = setTimeout(() => {
        wrapperVideo?.classList.add("cursor-none")
        wrapperControl?.classList.add("hidden")
        btnPlay?.classList.add("hidden")
      }, 2500)
    }
    if (wrapperVideo && wrapperControl) {
      wrapperVideo.addEventListener("mousemove", handleHideController)
    }
    return () => {
      if (wrapperVideo) wrapperVideo.removeEventListener("mousemove", handleHideController)
    }
  }, [isPlay])
  if (!detail)
    return (
      <div className='min-h-screen'>
        <Loading />
      </div>
    )
  if (!detail.episodes.length)
    return (
      <div className='bg-overlay py-14 min-h-screen'>
        <div className='container'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='h-[200px] border px-7 py-4 rounded-md border-primary'>
              <h1 className='text-xl md:text-3xl text-white mt-5'>Không tìm thấy tập phim nào phù hợp</h1>
              <div className='flex items-center justify-center mt-5'>
                <Button content={"Back"} className='border px-7 py-2 rounded-md border-primary' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  return (
    <>
      <DetailsBanner data={detail?.movie} popup={popup} onShowPopup={onShowPopup} />
      {/* popup={popup} findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === dataDetailMovie.id)} onToggleMovie={() => onToggleMovie(dataDetailMovie)} */}
      <div className='bg-overlay py-14'>
        <div className={`${isTheaterMode ? "" : "container"}`}>
          {/* isTheaterMode */}
          <h3 className={`text-base font-bold mb-4 ${isTheaterMode ? "container" : ""}`}>Vietsub #1</h3>
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
          {/* https://vip.opstream17.com/share/6f2688a5fce7d48c8d19762b88c32c3b  => nhung iframe*/}
          {/* https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20240915/x5xmTacI/index.m3u8 cat chuoi lay link  https://s4.phim1280.tv/20240915/x5xmTacI/index.m3u8*/}
          {/* src="https://embed1.streamc.xyz/embed.php?hash=e468c46004c5947e5d95389ead25846d" link anime bi loi */}
          {/* isTheaterMode */}
          <div className={`${isTheaterMode ? "px-5" : "max-w-5xl"} mx-auto mt-16 overflow-hidden`} ref={refMovie}>
            {isLoadingVideo ? (
              <div className='animate-pulse bg-white/5  w-full aspect-video overflow-hidden bg-stone-900 rounded-md relative'>
                <Loading hFull={true} />
              </div>
            ) : type === "iframe" ? (
              <iframe
                allowFullScreen
                referrerPolicy='no-referrer'
                scrolling='no'
                className='w-full bg-white/5 aspect-video overflow-hidden bg-stone-900 rounded-md'
                src={linkPlay ?? ""}
                frameBorder='0'
                allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              />
            ) : (
              <section className='relative' onClick={handleTogglePlayVideo} id='wrapperVideo'>
                <ReactPlayer
                  ref={refPlayer}
                  controls={false}
                  pip={isMiniPlayer}
                  url={linkPlay}
                  volume={volume / 100}
                  playing={isPlay}
                  light={defaultIsPlay ? <Image alt='' className='rounded-md object-contain' layout='fill' src={defaultPosterVideo} /> : ""}
                  width={"100%"}
                  height={"100%"}
                  className=' bg-white/5 overflow-hidden bg-stone-900 rounded-md aspect-video'
                  onProgress={(e) => setCurrentSeconds(Math.floor(e.playedSeconds))}
                  onBuffer={() => setStatePlayVideo((prev) => ({ ...prev, isLoadingVideo: true }))}
                  onBufferEnd={() => setStatePlayVideo((prev) => ({ ...prev, isLoadingVideo: false }))}
                  onEnablePIP={() => {
                    setStateScreenMode((prev) => ({ ...prev, isMiniPlayer: true }))
                    setStatePlayVideo((prev) => ({ ...prev, isPlay: true }))
                  }}
                  onDisablePIP={() => {
                    setStateScreenMode((prev) => ({ ...prev, isMiniPlayer: false }))
                    setStatePlayVideo((prev) => ({ ...prev, isPlay: false }))
                  }}
                />
                {isLoadingVideo && (
                  <span className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
                    <AiOutlineLoading3Quarters className='animate-spin' size={35} />
                  </span>
                )}
                <div id='btnPlay'>
                  {isPlay ? (
                    <Button icon={<FaCirclePause size={50} />} className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
                  ) : (
                    <Button icon={<FaCirclePlay size={50} />} className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${defaultIsPlay && "text-black"}`} />
                  )}
                </div>
                {/* opacity-0 group-hover:opacity-100 duration-200 */}
                <div className='relative' id='wrapperControl'>
                  <VideoControl {...optionVideoControls} />
                </div>
              </section>
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
            <SwiperSlide key={movie?.movie_id}>
              {/* // onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} */}
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
