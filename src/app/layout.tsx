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
  metadataBase: new URL("https://netmovie-irac.vercel.app"),
  title: "Net Movie",
  description:
    "Net Movie - Website xem phim online miễn phí với hàng ngàn bộ phim HD, Full HD chất lượng cao. Cập nhật phim mới liên tục, đa dạng thể loại từ hành động, lãng mạn, kinh dị đến khoa học viễn tưởng. Xem phim mọi lúc, mọi nơi trên điện thoại, máy tính bảng và PC, không quảng cáo làm phiền.",
  icons: {
    icon: ["/favicon/favicon.ico?v=4"],
    apple: ["/favicon/apple-touch-icon.png?v=4"],
    shortcut: ["/favicon/apple-touch-icon.png"],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Acme",
    description: "Acme is a...",
    images: "images/logo.jpg",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
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
