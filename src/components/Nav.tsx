"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { IoIosSearch, IoMenu, LuUserSquare } from "@/utils/icons"
import Image from "next/image"
import Button from "@/components/Button"
import { filterNameMovie } from "@/utils/helpers"
import { v4 as uuid } from "uuid"
import React from "react"
const Nav = ({
  onToggleNavbar,
  isShowNavBar,
  // user,
  // isAuthenticated,
  onToggleOpenMenuCategory,
  openMenuCategory,
  convertHeader,
  isMobile,
}: // onShowPopup,
navTypes) => {
  const pathName = usePathname()
  // const router = useRouter();
  return (
    <nav className='flex items-center justify-center gap-x-2 '>
      <ul className={`${isShowNavBar ? "block" : "hidden"} z-50  lg:flex lg:gap-6 fixed lg:static text-black bg-overlay lg:bg-transparent top-0 h-full w-80 right-0 lg:w-auto`}>
        {convertHeader.map(({ path, name, id, category, Icon }: any, index: number) => (
          <li key={id} className='group md:py-0 md:px-0 border-b-2 font-medium relative border-b-black lg:border-b-transparent text-white md:text-black cursor-default hover:bg-black lg:hover:bg-transparent '>
            <Button
              onClick={() => {
                if (category.length && isShowNavBar) {
                  onToggleOpenMenuCategory(path)
                  return
                }
                if (isMobile && isShowNavBar) {
                  onToggleNavbar()
                }
              }}
              className={`${isShowNavBar && "text-start flex items-center gap-x-2 "} first-letter:uppercase font-semibold uppercase px-4 text-base text-white lg:px-0 w-full inline-block py-3 hover:text-primary lg:hover:bg-transparent transition ${
                pathName === path ? "!text-primary lg:text-primary lg:bg-transparent" : ""
              }`}
              content={name}
              // href={category.length && isShowNavBar ? '' : path}
              icon={isShowNavBar ? <Icon fontSize={23} className='text-primary' /> : ""}
            />
            {!!category.length && (
              <ul
                className={`${isShowNavBar && `!static !grid-cols-2 !w-full ${openMenuCategory === path ? "!grid" : "!hidden"}`} ${path === "/loai-phim" ? "!grid-cols-2 !-left-[90%]" : ""} ${path === "/top-phim" ? "!py-0" : ""} min-h-[450px] h-[450px] overflow-auto ${
                  index === 0 ? "!h-auto !min-h-min" : ""
                } group-hover:grid grid dropdown-menu absolute duration-300 !px-4 grid-cols-2 top-full -left-[180%] z-50 text-sm text-white bg-blur`}>
                {category.map((item: any, index: number) => (
                  <li
                    key={item.id}
                    className={`cursor-pointer capitalize relative group/item w-full ${path === "/top-phim" ? "py-2" : ""}`}
                    onClick={() => {
                      if (isShowNavBar) onToggleNavbar()
                    }}>
                    <Link className={`hover:text-primary  w-full inline-block duration-300 text-base`} prefetch={true} href={path + "/" + item.path}>
                      {/* 
                      === '/loai-phim'
                          ? `/loai-phim/${
                              index <= 1 ? `/type/${item.type}` : index >= 2 && index <= 4 ? `/language/${item.type}` : `/status/${item.type}`
                            }`
                          : path === '/the-loai'
                          ? `/the-loai/${item.cate_slug}`
                          : path === '/top-phim' && index === 0
                          ? '/top-phim/top-phim'
                          : path === '/top-phim'
                          ? `#`
                          : `/quoc-gia/${item.slug}`
                      */}
                      {item.name || filterNameMovie(item.type)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {isShowNavBar && <div className='fixed w-full z-20 h-full bg-blur left-0 calc-width lg:hidden top-0' onClick={onToggleNavbar}></div>}
      {/* <div className='text-black md:ms-8 md:mr-0 cursor-pointer hover:opacity-90 flex' onClick={onShowPopup}>
        <abbr title='Tìm kiếm'>
          <IoIosSearch className='w-[34px] h-[30px] text-primary' />
        </abbr>
      </div> */}
      {/* {isAuthenticated ? (
        <Link href={'/thong-tin'} className='text-black cursor-pointer hover:opacity-90 flex '>
          <abbr title={`${isAuthenticated ? 'thông tin tài khoản' : 'Đăng nhập'}`}>
            <Image src={user?.photoURL} width={23} height={23} className='rounded min-w-[23px]' alt='user' />
          </abbr>
        </Link>
      ) : (
        // form show login
        <Link href={'/thong-tin'} className='text-black cursor-pointer hover:opacity-90 flex '>
          <abbr title={`${isAuthenticated ? 'thông tin tài khoản' : 'Đăng nhập'}`}>
            <LuUserSquare className='w-[32px] h-[28px]  text-primary' />
          </abbr>
        </Link>
      )} */}
      <Link href='/yeu-thich' className='cursor-pointer'>
        <abbr title='Yêu thích'>
          <svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' className='iconify iconify--mdi text-white hover:text-primary transition' width='30' height='30' viewBox='0 0 24 24'>
            <path fill='currentColor' d='M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m7 14l.72-.66C15.3 14 17 12.46 17 10.57c0-1.54-1.21-2.75-2.75-2.75c-.87 0-1.7.41-2.25 1.05a3 3 0 0 0-2.25-1.05C8.21 7.82 7 9.03 7 10.57c0 1.89 1.7 3.43 4.28 5.77z'></path>
          </svg>
        </abbr>
      </Link>
      <div className='lg:hidden text-white max-w-min'>
        <div className='cursor-pointer hover:opacity-90 duration-300' onClick={onToggleNavbar}>
          <abbr title='Menu'>
            <IoMenu size={34} className='min-w-min text-primary' />
          </abbr>
        </div>
      </div>
    </nav>
  )
}

export default Nav
