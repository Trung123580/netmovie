"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { auth, db, googleProvider, twitterProvider } from '@/fireBase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, collection, getDocs, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import Cookies from 'universal-cookie';
import { toast } from "react-toastify"
const ContextApp = createContext({} as AuthContextType)
const expirationDate = new Date();
const cookies = new Cookies();
enum StringEnum {
  success = "success",
  error = "error",
}
const ContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const keyUserCookies: any = process.env.NEXT_PUBLIC_KEY_COOKIES;
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [user, setUser] = useState<any>(() => cookies.get(keyUserCookies) ?? null);
  const [showPopup, setShowPopup] = useState<popupType>({
    popup: "",
    isShow: false,
    srcTrailer: "",
    infoPay: null,
    dataPopupYesNo: null,
  })
  const userCollection = collection(db, 'users');
  const handleLoginGG = async () => {
    try {
      const responseUser = await signInWithPopup(auth, googleProvider);
      if (!responseUser) return;
      const currentMonth = expirationDate.getMonth();
      expirationDate.setMonth(currentMonth + 1);
      if (expirationDate.getMonth() === currentMonth) {
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      }
      cookies.set(keyUserCookies, responseUser.user, { expires: expirationDate });
      setUser(responseUser.user);
      // handleShowPopup();
      // => add các trường để lưu thông tin theo user
      const data = await getDocs(userCollection);
      const userData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      const isUser = userData.some((user) => user.id === auth.currentUser?.uid);
      if (!isUser) {
        await setDoc(doc(db, 'users', auth.currentUser?.uid as string), {
          userName: auth.currentUser?.displayName as string,
          email: auth.currentUser?.email as string,
          avatar: auth.currentUser?.photoURL as string,
          loveMovie: [], // theo doi movie
          // historyMovie: [], // lịch sử xem phim
          // historyPay: [], // lịch sử thanh toán
        });
      }
    } catch (error) {
      console.error('Error getting redirect result: ', error);
    }
  };
  const handleAppSignOut = async () => {
    if (!user) return;
    cookies.remove(keyUserCookies);
    setUser(null);
    setCurrentUser(null);
    await signOut(auth);
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        if (!!user) {
          if (user?.uid) {
            const docRef = doc(db, 'users', user?.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setCurrentUser(data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
    // eslint-disable-next-line
    //  appCallBack,
  }, [user]);
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
        isAuthenticated: !!user,
        user: user,
        currentUser: currentUser,
        handle: {
          onLoginGG: handleLoginGG,
          onAppSignOut: handleAppSignOut,
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
