import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.scss"
import GlobalsLayout from "@/components/GlobalsLayout"
import ProviderRedux from "@/components/ProviderRedux"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "react-toastify/dist/ReactToastify.css"
import ContextProvider from "@/context/ContextProvider"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ProviderRedux>
          <ContextProvider>
            <GlobalsLayout>{children}</GlobalsLayout>
          </ContextProvider>
        </ProviderRedux>
      </body>
    </html>
  )
}
