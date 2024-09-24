"use client"
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react"
import { useApp } from "@/context/ContextProvider"
import DetailsBanner from "@/layout/DetailsBanner"
import { usePathname, useSearchParams } from "next/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
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
import {v4 as uuid} from 'uuid'
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
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(false)
  const [defaultDuration, setDefaultDuration] = useState(0)
  const [episodesList, setEpisodesList] = useState<any>([])
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
  const searchPractice: string = searchParams.get("tap") as string
  const searchServerName: number = Number(searchParams.get("server"))
  const {
    isLoading,
    data: { detail, relate },
  }: storeState = useSelector((state: RootState) => state.storeApp)
  const { isPlay } = useSelector((state: RootState) => state.storeAction)
  const dispatch = useDispatch()
  const { device } = useResize()
  const defaultPosterVideo = useMemo(() => {
    if (!detail) return ""
    return detail.movie.poster_url
  }, [detail])
  
  const getSVNumber = (serverName : string) => {
    const match = serverName.match(/SV\s?#(\d+)/); // Lấy số từ "SV #1", "SV #2", ...
    return match ? parseInt(match[1], 10) : Infinity; // Nếu không tìm thấy, trả về Infinity (để xếp cuối)
  };
  console.log(detail)
  console.log(searchServerName)
  console.log(searchPractice);
  console.log(episodesList)
  // useEffect(() =>{
  //   if (!episodesList.length) return 
  //   if (searchServerName && searchPractice){
  //     const findServer = episodesList.find(({server_name}: ServerData) =>  server_name === searchServerName)
  //     // const episode = findServer.episodes.find(({slug}: itemServerData) => slug === String(searchPractice)) 
  //     // console.log(findServer, episode);
  //     console.log(findServer);
  //   }
  // },[episodesList, searchServerName, searchPractice])

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
    let time: NodeJS.Timeout
    if (detail) {
      setIsLoadingVideo(false)
      if (detail.episodes.length === 0) {
        time = setTimeout(() => {
          router.back()
        }, 5000)
        return
      }
      const convertSort = [...detail.episodes].sort((a:any, b:any) => {
        const svNumberA = getSVNumber(a.server_name);
        const svNumberB = getSVNumber(b.server_name);
        return svNumberA - svNumberB;
      })
      if (searchServerName && searchPractice){
        const findServer = convertSort[searchServerName - 1].server_data.filter((item:any) => item.name !== 'undefined')
        const episode = findServer.find(({slug}: itemServerData) => slug === String(searchPractice)) 
        // check tim duoc tap ko
        if (!episode) router.back();
        const checkLink = convertLinkPlayer({ link: episode.link_embed })
        if (checkLink.type === "video") {
          setDataVideo({ linkPlay: checkLink.linkPlay, type: "video" })
        } else {
          setDataVideo({ linkPlay: checkLink.linkPlay, type: "iframe" })
        }
        document.getElementById('wrapperVideo')?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
      } else {
        const defaultLink = (convertSort[0]?.server_data.filter((item:any) => item.name !== 'undefined')[0].link_embed as string) ?? ""
        const checkLink = convertLinkPlayer({ link: defaultLink })
        if (checkLink.type === "video") {
          setDataVideo({ linkPlay: checkLink.linkPlay, type: "video" })
        } else {
          setDataVideo({ linkPlay: checkLink.linkPlay, type: "iframe" })
        }
      }
      setEpisodesList(convertSort)
      dispatch(getMoviesRelate({ country: detail.movie.country[0].slug, status: detail.movie.status }) as any)
    }
    return () => time && clearTimeout(time)
  }, [detail,searchServerName, searchPractice])
  console.log(relate)
  const handleChangeEpisode = (indexServer: number, episode:string) =>{
    router.push(pathName + '?' + `server=${indexServer}` + '&' + `tap=${episode}`)
  }
  const handleNext = useCallback(() => {
    if (refSwiper.current) refSwiper.current?.swiper.slidePrev()
  }, [refSwiper.current])

  const handlePrev = useCallback(() => {
    if (refSwiper?.current) refSwiper.current?.swiper.slideNext()
  }, [refSwiper.current])

  const handleTogglePlayVideo = () => dispatch(togglePlayVideo(!isPlay))
  const handleToggleMiniMap = () => setStateScreenMode((prev) => ({ ...prev, isMiniPlayer: !prev.isMiniPlayer }))
  const durationCurrent = formatDuration(Number(Math.floor(refPlayer.current?.getDuration())) - Number(currentSeconds))
  const durationVideo = durationCurrent === '0:00' ? formatDuration(defaultDuration) : durationCurrent 
  const optionVideoControls = {
    isPlay: isPlay,
    volume: volume,
    currentSeconds: currentSeconds,
    secondsLoaded: percentSecondsLoaded || 0,
    maxDuration: refPlayer.current?.getDuration(),
    slots: formatDuration(currentSeconds),
    changeCurrentTime: durationVideo,
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
  if (isLoading){
    return (
      <div className='min-h-screen'>
        <Loading />
      </div>
    )
  }
  if (!detail && !relate?.items?.length)
    return (
      <div className='min-h-screen'>
        <Loading />
      </div>
    )
  if (!detail.episodes.length)
    return (
      <div className='bg-overlay md:py-14 min-h-screen'>
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
      <ReactPlayer url={linkPlay} className="hidden" onDuration={(e) => setDefaultDuration(Math.floor(e))}/>
      <DetailsBanner data={detail?.movie} popup={popup} onShowPopup={onShowPopup} />
      {/* <video src={linkPlay} id='audio' className='hidden' autoPlay={false} controls={false}></video> */}
      {/* popup={popup} findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === dataDetailMovie.id)} onToggleMovie={() => onToggleMovie(dataDetailMovie)} */}
      <div className='bg-overlay md:py-14'>
        <div className={`${isTheaterMode ? "" : "container"}`}>
          {episodesList.map(({server_data, server_name} : ServerData, index: number) => {
            return (
              <div key={server_name}>
                <h3 className={`text-base font-bold ${isTheaterMode ? "container" : ""}`}>{server_name}</h3>
                <Swiper
                  className="cursor-pointer wrapper-episodes my-4"
                  breakpoints={{}}
                  spaceBetween={20}
                  loop={true}
                  keyboard={true}
                  rewind={true}
                  noSwiping={true}
                  slidesPerView={"auto"}
                  modules={[]}>
                  {server_data?.map(({name, slug}) => {
                  const convertEpisodes = name.startsWith('0') ? name.substring(1, name.length) : name
                  if (name === 'undefined') return <React.Fragment key={uuid()}></React.Fragment>
                  return (
                      <SwiperSlide key={uuid()}>
                        <Button onClick={()=> handleChangeEpisode(index + 1, slug)} className="border inline-block w-full h-full border-primary rounded-md py-1" key={uuid()} content={convertEpisodes}/> 
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
            </div>
            )
          })}
          {/* https://vip.opstream17.com/share/6f2688a5fce7d48c8d19762b88c32c3b  => nhung iframe*/}
          {/* https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20240915/x5xmTacI/index.m3u8 cat chuoi lay link  https://s4.phim1280.tv/20240915/x5xmTacI/index.m3u8*/}
          {/* src="https://embed1.streamc.xyz/embed.php?hash=e468c46004c5947e5d95389ead25846d" link anime bi loi */}
          <div className={`${isTheaterMode ? "px-5" : "max-w-5xl"} mx-auto mt-16 overflow-hidden`} ref={refMovie} id='wrapperVideo'>
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
                onLoadedData={() => console.log('end')}
                onLoadStart={() => console.log('start')}
              />
            ) : (
              <section className='relative' onClick={handleTogglePlayVideo} >
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
            disableOnInteraction: false,
            pauseOnMouseEnter:true
          }}
          modules={[Autoplay]}>
          {relate?.items.map((movie: any) => (
            <SwiperSlide key={movie?._id}>
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
