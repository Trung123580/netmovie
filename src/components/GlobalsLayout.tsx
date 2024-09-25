"use client"
import Loading from "@/components/Loading"
import Footer from "@/layout/Footer"
import Header from "@/layout/Header"
import { RootState } from "@/store/store"
// import Loading from '@/components/Loading';
import { useApp } from "@/context/ContextProvider"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { FaGooglePlusSquare, IoClose, IoIosSearch, IoMicOutline, MdOutlineRecordVoiceOver } from "@/utils/icons"
import { FacebookShareButton, TwitterShareButton, XIcon, FacebookIcon, TelegramShareButton, TelegramIcon } from "react-share"
import { ToastContainer } from "react-toastify"
import Button from "@/components/Button"
import { popup, typeToast } from "@/utils/constants"
import Image from "next/image"
// import { extractNumber, formatCurrency } from '@/utils/helpers';
import { useRouter } from "next/navigation"
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

const GlobalsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter()
  const {
    states: { showPopup },
    handle: { onShowPopup, onShowToast, onLoginGG },
  }: AuthContextType = useApp()
  // const { onLoginGG, onLoginTW, onShowToast, onPayMoMo, onShowPopup, onRemovePackage } = handle;
  const [hydrated, setHydrated] = useState(false)
  const { isLoading }: { isLoading: boolean } = useSelector((state: RootState) => state.storeApp)
  const [valueVoice, setValueVoice] = useState("")
  const [isActiveVoice, setIsActiveVoice] = useState(false)
  const recognitionRef = useRef<any>(null)
  const inputSearchRef = useRef<HTMLInputElement>(null)
  const handleOnRecord = (type?: boolean) => {
    if (type && recognitionRef.current) {
      recognitionRef.current.onresult = null
      recognitionRef.current.onend = null
      recognitionRef.current.onerror = null
      recognitionRef.current.stop()
      recognitionRef.current = null
      setIsActiveVoice(false)
      setValueVoice("")
      return
      // clear voice
    }
    // voice search
    const SpeechRecordCognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecordCognition()
    recognitionRef.current.lang = "vi"
    if (type && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsActiveVoice(false)
      setValueVoice("")
      return
    }
    recognitionRef.current.onresult = async (event: any) => {
      const value = event.results[0][0].transcript
      setValueVoice(value)
      if (value) {
        onShowPopup()
        router.push(`/search-result?query=${value}`)
      }
      recognitionRef.current?.stop()
    }
    recognitionRef.current.onstart = () => setIsActiveVoice(true)
    recognitionRef.current.onend = () => setIsActiveVoice(false)
    recognitionRef.current.start()
  }
  const handleUrlShare = () => {
    if (typeof window !== "undefined") {
      return window.location.href
    } else {
      return ""
    }
  }
  const url = handleUrlShare()
  useEffect(() => {
    setHydrated(true)
  }, [])
  useEffect(() => {
    if (showPopup.isShow) {
      document.body.classList.add("overflow-y-hidden")
    } else {
      if (document.body.classList.contains("overflow-y-hidden")) document.body.classList.remove("overflow-y-hidden")
    }
  }, [showPopup.isShow])
  useEffect(() => {
    if (valueVoice && inputSearchRef.current) {
      inputSearchRef.current.value = valueVoice
    }
  }, [valueVoice, inputSearchRef])
  const handleSearchForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const value = formData.get("search")
    if (String(value).length < 3 && String(value).length > 0) {
      inputSearchRef.current?.focus()
      onShowToast("Vui lòng nhập 3 ký tự trở lên", typeToast.error)
      return
    }
    if (String(value).length >= 3) {
      setValueVoice("")
      onShowPopup()
      router.push(`/search-result?query=${value || valueVoice}`)
    } else {
      inputSearchRef.current?.focus()
      onShowToast("chưa nhập từ khóa search", typeToast.error)
    }
  }
  if (!hydrated && isLoading) {
    return <Loading />
  }
  return (
    <main>
      <Header />
      {children}
      <Footer />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        // icon={<LuHeartCrack className='text-primary' />}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      {showPopup.isShow && (
        <div className='bg-black/70 fixed top-0 left-0 w-full h-screen z-50 p-4'>
          <div className='flex justify-end cursor-pointer'>
            <Button icon={<IoClose fontSize={35} />} onClick={() => onShowPopup()} />
          </div>
          <div className='relative flex-center h-full' onClick={() => onShowPopup()}>
            {showPopup.popup === popup.sharePopup && (
              <div className='bg-[#18181b] rounded-lg p-6 w-[90vw] max-w-max min-w-[40vw]' onClick={(e) => e.stopPropagation()}>
                <h3 className='text-center text-2xl font-bold sm:text-3xl'>Chia sẻ</h3>
                <div className='flex gap-x-4 py-4'>
                  <FacebookShareButton url={url}>
                    <FacebookIcon size={50} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={url}>
                    <XIcon size={50} round={true} />
                  </TwitterShareButton>
                  <TelegramShareButton url={url}>
                    <TelegramIcon size={50} round={true} />
                  </TelegramShareButton>
                </div>
                <div className='bg-black p-4 rounded-lg border border-white/20 flex items-center gap-1 w-full justify-between gap-x-4'>
                  <h3 className='line-clamp-1'>{url}</h3>
                  <Button
                    onClick={() => {
                      onShowToast("đã copy vào clipBoard", typeToast.success)
                      navigator.clipboard.writeText(window.location.href)
                    }}
                    content='Sao chép'
                    className='rounded-full min-w-max px-2.5 py-1.5 text-black text-sm font-bold flex items-center gap-1.5 bg-primary hover:opacity-80 duration-300'
                  />
                </div>
              </div>
            )}
            {showPopup.popup === popup.trailerPopup && (
              <div className='w-full max-w-[85vw] md:max-w-[60vw]'>
                <iframe
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  className='w-full bg-white/5 aspect-video overflow-hidden bg-stone-900 rounded-md '
                  src={`https://www.youtube.com/embed/${showPopup.srcTrailer}?autoplay=1`}
                  loading='lazy'
                  allowFullScreen={true}
                />
              </div>
            )}
            {showPopup.popup === popup.search && (
              <div className='flex-center h-full relative' onClick={(e) => e.stopPropagation()}>
                <div className={`-z-10 absolute w-full h-full scale-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12`}>
                  <Image src='/images/logo.jpg' className='w-full h-full object-contain  opacity-50' height={1000} width={1000} alt='logo' />
                </div>
                <div className='relative bg-[#18181b] rounded-lg py-5 px-4 w-full md:w-[90vw] md:max-w-max min-w-[60vw]'>
                  <form method='GET' onSubmit={handleSearchForm} className='flex items-center border-b border-primary'>
                    <div className='w-full flex-1'>
                      <input ref={inputSearchRef} type='text' name='search' className='w-full outline-none p-1 bg-transparent placeholder:text-primary ' placeholder='Tìm Phim,...' autoComplete='off' autoFocus />
                    </div>
                    {isActiveVoice ? (
                      <MdOutlineRecordVoiceOver size={25} className={`text-primary cursor-pointer ${isActiveVoice ? "animate-pulse" : ""}`} onClick={() => handleOnRecord(true)} />
                    ) : (
                      <IoMicOutline size={25} className={`text-primary cursor-pointer`} onClick={() => handleOnRecord(false)} />
                    )}
                    <button type='submit'>
                      <IoIosSearch size={25} className='text-primary' />
                    </button>
                  </form>
                </div>
              </div>
            )}
            {showPopup.popup === popup.logins && (
              <div className='flex-center h-full relative'>
                <div className={`-z-10 absolute w-full h-full scale-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12`}>
                  <Image src='/images/logo.jpg' className='w-full h-full object-contain  opacity-50' height={1000} width={1000} alt='logo' />
                </div>
                <div className='relative bg-[#18181b] rounded-lg py-10 px-4 w-[90vw] max-w-max min-w-[35vw]'>
                  <div className='mb-4 flex justify-center'>
                    <Image src='/images/logo.jpg' className='w-40  md:w-52 h-full object-contain aspect-[208/41]' height={1000} width={1000} alt='logo' />
                  </div>
                  <div className='mt-5'>
                    <div className='w-full flex flex-col justify-center gap-3 *:capitalize'>
                      <Button
                        content={"Đăng nhập google"}
                        onClick={onLoginGG}
                        icon={<FaGooglePlusSquare size={25} className='text-primary' />}
                        className='flex gap-x-2 items-center justify-center translate-y-3 text-nowrap w-full text-center group-hover:-translate-y-0 hover:bg-red hover:text-white hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-lg  text-black font-semibold leading-none border-2 border-primary text-white '
                      />
                      {/* <Button
                      icon={<FaSquareXTwitter size={25} className='text-primary' />}
                      content={'Đăng nhập Twitter'}
                      onClick={onLoginTW}
                      className='flex gap-x-2 items-center justify-center translate-y-3 w-full text-center group-hover:-translate-y-0 hover:bg-red hover:text-white hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-lg  text-black font-semibold leading-none border-2 border-primary text-white '
                    /> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
export default GlobalsLayout
