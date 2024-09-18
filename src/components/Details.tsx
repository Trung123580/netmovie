"use client"
import { ReactNode, useCallback, useEffect, useRef, useState, useTransition } from "react"
import { useApp } from "@/context/ContextProvider"
import DetailsBanner from "@/layout/DetailsBanner"
import { usePathname, useSearchParams } from "next/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { v4 as uuid } from "uuid"
import { Autoplay } from "@/utils/moduleSwiper"
import ReactPlayer from "react-player"
import Button from "@/components/Button"
import { FaCirclePlay, FaCirclePause } from "../utils/icons"
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
  const [unmounted, setUnmounted] = useState<boolean>(false)
  const [currentSeconds, setCurrentSeconds] = useState<number>(0)
  const [volume, setVolume] = useState(100)
  const { linkPlay, type } = dataVideo
  const refMovie = useRef<any>(null)
  const refPlayer = useRef<any>(null)
  const refSwiper = useRef<any>(null)
  const hideMouseRef = useRef<any>(null);
  const [statePlayVideo, setStatePlayVideo] = useState({
    isPlay: false,
    isShowIcon: false,
    defaultIsPlay: false,
    isMouse: true,
    isLoadingVideo: false,
    quality: localStorage.getItem('quality') || '720p', // tao localStorage
    isOpenQuality: false,
    isOpenSetting: false,
    percentSecondsLoaded: 0,
    isOpenDrawer: false,
  });
  const {isMouse} = statePlayVideo
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
  console.log(detail)
  console.log(linkPlay)

  useEffect(() => {
    dispatch(getDetailMovie({ slug }) as any)
    return () => dispatch(clearDataCategory(null) as any)
  }, [slug])
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
  useEffect(() => {
    let time: any
    if (isPlay) {
      time = setTimeout(() => {
        setUnmounted(true)
      }, 1000)
    } else {
      setUnmounted(false)
    }
    return () => time && clearTimeout(time)
  }, [isPlay])
  const optionVideoControls = {
    isPlay: isPlay,
    // isAutoPlay: isAutoPlay,
    // secondsLoaded: percentSecondsLoaded || 0,
    currentSeconds: currentSeconds,
    volume: volume,
    // themeApp: themeApp,
    // theme: theme,
    // menuQuality: () => {
    //   if (dataVideo?.streaming?.mp4) {
    //     const menu = Object.keys(dataVideo.streaming.mp4);
    //     if (menu.length === 4) {
    //       menu.pop();
    //       return menu;
    //     }
    //     return menu;
    //   }
    //   return [];
    // },
    // quality: quality,
    // isOpenQuality: isOpenQuality,
    // isOpenSetting: isOpenSetting,
    maxDuration: refPlayer.current?.getDuration(),
    slots: formatDuration(currentSeconds),
    // changeCurrentTime: formatDuration(Number(Math.floor(videoRef.current?.getDuration())) - Number(currentSeconds)),
    // onOpenQuality: (openSetting, openQuality, hiddenQuality) => {
    //   if (openSetting) setStatePlayVideo((prev) => ({ ...prev, isOpenSetting: !prev.isOpenSetting, isOpenQuality: false }));
    //   if (openQuality) setStatePlayVideo((prev) => ({ ...prev, isOpenQuality: !prev.isOpenQuality }));
    //   if (hiddenQuality) setStatePlayVideo((prev) => ({ ...prev, isOpenQuality: false, isOpenSetting: true }));
    // },
    // onChangeCommitted: (_, value) => videoRef.current.seekTo(value),
    onTogglePlayVideo: handleTogglePlayVideo,
    // onChange: (_, value) => setCurrentSeconds(value),
    onChangeVolume: (_e: any, value: number) => setVolume(value),
    setChangeVolume: (number: number) => setVolume(number),
    // onChangeAutoPlay: () => setIsAutoplay(!isAutoPlay),
    // onChangeQuality: handleChangeQuality,
    // // screen
    // onChangeTheaterMode: async () => {
    //   setStateScreenMode((prev) => ({ ...prev, isTheaterMode: !prev.isTheaterMode }));
    //   if (document.fullscreenElement !== null) await document.exitFullscreen();
    // },
    onChangeFullScreen: async () => {
      if (!refPlayer.current) return;
      if (document.fullscreenElement === null) {
        await hideMouseRef.current?.requestFullscreen();
        // if (isLoadingVideo) setStatePlayVideo((prev) => ({ ...prev, isOpenSetting: false, isOpenQuality: false }));
      } else {
        await document.exitFullscreen();
      }
    },
    // // next
    // onNextVideo: handleNextVideo,
    // onPrevVideo: handlePrevVideo,
  }
    console.log('play', !isPlay , hideMouseRef.current);
  // console.log(isMouse);
  useEffect(() =>{
    let time:any;
    if (isPlay) {
      time = setTimeout(() =>{
        if (isMouse) setStatePlayVideo((prev) => ({ ...prev, isMouse: false }));
      }, 2500)
    } else {
      if (!isMouse) setStatePlayVideo((prev) => ({ ...prev, isMouse: true }));
    }
    return () => time && clearTimeout(time)
  }, [isPlay])
  console.log(isMouse);
  
  // useEffect(() =>{
  //   let mouseRef = hideMouseRef.current;
  //   // ${isMouse ? 'cursor-default' : 'cursor-none'}
  //   const handleMouseMove = () => {
  //     setStatePlayVideo((prev) => ({ ...prev, isMouse: false }));
  //     console.log(isMouse && isPlay && mouseRef);
      
  //   };
    
  //   if (isMouse && isPlay && mouseRef) {
  //     // alert()
  //     mouseRef.addEventListener('mousemove', handleMouseMove);
  //   }
  // }, [isPlay, isMouse, hideMouseRef])
    useEffect(() => {
    let mouseRef = hideMouseRef.current;
    let time: any
    const handleMouseMove = () => {
      if (!statePlayVideo.isMouse) setStatePlayVideo((prev) => ({ ...prev, isMouse: true }));
        mouseRef.style.cursor = 'default';
        time= setTimeout(() => {
          mouseRef.style.cursor = 'none';
          if (statePlayVideo.isMouse) setStatePlayVideo((prev) => ({ ...prev, isMouse: false }));
        }, 2500);
    };
    if (mouseRef) mouseRef.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (mouseRef) mouseRef.removeEventListener('mousemove', handleMouseMove);
      time && clearTimeout(time)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ hideMouseRef, isPlay]);
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
          {/* https://vip.opstream17.com/share/6f2688a5fce7d48c8d19762b88c32c3b  => nhung iframe*/}
          {/* https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20240915/x5xmTacI/index.m3u8 cat chuoi lay link  https://s4.phim1280.tv/20240915/x5xmTacI/index.m3u8*/}
          {/* src="https://embed1.streamc.xyz/embed.php?hash=e468c46004c5947e5d95389ead25846d" link anime bi loi */}
          <div className='max-w-5xl mx-auto mt-16' ref={refMovie}>
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
              <section className={`relative group transition-all ${isMouse ? 'cursor-default' : 'cursor-none'}`} onClick={handleTogglePlayVideo} ref={hideMouseRef}>
                <ReactPlayer
                  onProgress={(e) => {
                    setCurrentSeconds(Math.floor(e.playedSeconds))
                  }}
                  ref={refPlayer}
                  controls={false}
                  url={linkPlay}
                  playing={isPlay}
                  width={"100%"}
                  height={"100%"}
                  className='w-full bg-white/5 overflow-hidden bg-stone-900 rounded-md aspect-video'
                />
                {!unmounted && (
                  <>
                    {isPlay ? (
                      <Button icon={<FaCirclePause size={50} />} className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
                    ) : (
                      <Button icon={<FaCirclePlay size={50} />} className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
                    )}
                  </>
                )}
                {/* opacity-0 group-hover:opacity-100 duration-200 */}
                <div className='relative opacity-0 group-hover:opacity-100 duration-200'>
                  <VideoControl {...optionVideoControls} />
                </div>
              </section>
            )}
            {/* 
               <VideoPlayer
                ref={videoRef}
                onPlay={() => setStatePlayVideo((prev) => ({ ...prev, isShowIcon: false, defaultIsPlay: true }))}
                onPause={() => setStatePlayVideo((prev) => ({ ...prev, isShowIcon: true }))}
                onProgress={(e) => {
                  setCurrentSeconds(Math.floor(e.playedSeconds));
                }}
                onStart={() => onAddHistoryMv(dataVideo)}
                onBuffer={() => setStatePlayVideo((prev) => ({ ...prev, isLoadingVideo: true }))}
                onBufferEnd={() => setStatePlayVideo((prev) => ({ ...prev, isLoadingVideo: false }))}
                sourceVideo={sourceVideo}
                isPlay={isPlay}
                volume={volume / 100}
                pip={isMiniPlayer}
                light={!defaultIsPlay ? dataVideo?.thumbnailM : null}
                onEnded={handleEndedVideo}
                onEnablePIP={() => {
                  setStateScreenMode((prev) => ({ ...prev, isMiniPlayer: true }));
                  setStatePlayVideo((prev) => ({ ...prev, isPlay: true }));
                }}
                onDisablePIP={() => {
                  setStateScreenMode((prev) => ({ ...prev, isMiniPlayer: false }));
                  setStatePlayVideo((prev) => ({ ...prev, isPlay: false }));
                }}
              /> */}
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
