"use client"
import { createContext, useContext, useState } from "react"
import { toast } from "react-toastify"
const ContextApp = createContext({} as AuthContextType)
enum StringEnum {
  success = "success",
  error = "error",
}
const ContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [showPopup, setShowPopup] = useState<popupType>({
    popup: "",
    isShow: false,
    srcTrailer: "",
    infoPay: null,
    dataPopupYesNo: null,
  })
  const handleShowPopup = (popup?: string, srcTrailer?: string, infoPay?: any, dataPopupYesNo?: any) =>
    setShowPopup({
      popup: popup as string,
      isShow: !showPopup.isShow,
      dataPopupYesNo: dataPopupYesNo ?? null,
      infoPay: infoPay ?? null,
      srcTrailer: srcTrailer ? srcTrailer : "",
    })
  const handleShowToast = (message: string, type: string) => {
    if (type === StringEnum.success) {
      toast.success(message)
    }
    if (type === StringEnum.error) {
      toast.error(message)
    }
  }
  return (
    <ContextApp.Provider
      value={{
        states: {
          showPopup,
        },
        handle: {
          onShowPopup: handleShowPopup,
          onShowToast: handleShowToast,
        },
      }}>
      {children}
    </ContextApp.Provider>
  )
}

export default ContextProvider
export const useApp = () => useContext(ContextApp)
