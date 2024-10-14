// import BoxBG from "@/components/BoxBG"
// import BoxSolid from "@/components/BoxSolid"
import Button from "@/components/Button"
import Image from "next/image"
import { FaHeart, MdTimelapse } from "@/utils/icons"
import Link from "next/link"
const CardProduct = ({ data, onToggleMovie, findIsLoveMovie, device }: { device: string; data: any; onToggleMovie?: funcProps; findIsLoveMovie?: boolean }) => {
  if (device === "mb") {
    return (
      <Link href={`/details/${data.slug}`} className='group'>
        <div className='rounded-lg overflow-hidden relative'>
          <img loading='lazy' width={1000} height={1000} className='h-full w-full object-cover aspect-[2/3]' src={data?.thumb_url} alt='' />
          {/* <div className='bg-primary font-semibold rounded absolute top-2.5 left-2.5 text-xs text-black px-2.5 py-0.5'>{data?.episode_current}</div> */}
          {findIsLoveMovie && (
            <div className='absolute top-2.5 right-2.5'>
              <FaHeart className='text-red' size={30} />
            </div>
          )}
          {/* <div className='absolute z-10 bg-blur w-full h-full top-0 left-0 aspect-[2/3] flex-center flex-col gap-2  opacity-0 group-hover:opacity-100 duration-300'>
            <Button
              content={findIsLoveMovie ? "Bỏ Thích" : "Yêu Thích"}
              onClick={onToggleMovie}
              className={`-translate-y-3 group-hover:translate-y-0 duration-300 ${findIsLoveMovie ? "text-white bg-red" : " bg-primary text-black"} py-2.5 px-6 rounded-full text-sm  font-semibold leading-none w-36`}
            />
            <Button
              content='Chi Tiết'
              href={`/details/${data.slug}`}
              className='translate-y-3 text-center group-hover:-translate-y-0 hover:bg-primary hover:text-black hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-sm text-black font-semibold leading-none border-2 border-primary text-white w-36'
            />
          </div> */}
        </div>
        <div>
          <div className='flex items-center my-4 gap-x-1.5'>
            <h3 className='flex-1 line-clamp-1 text-lg font-semibold '>{data?.name}</h3>
            <div className='-tracking-tighter flex items-center text-xs gap-x-1'>
              <MdTimelapse className='text-lg text-primary' />
              <span className='text-sm text-primary'>{data?.year}</span>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex gap-x-1 flex-1'>
              {/* <BoxSolid value={data?.quality} className='!text-primary border-white font-semibold ' />
            <BoxBG value={data?.lang} className='md:!line-clamp-1 font-semibold !hidden ' /> */}
              <h4 className='text-sm text-primary font-bold tracking-wide line-clamp-1'>{data?.origin_name}</h4>
            </div>
          </div>
        </div>
      </Link>
    )
  }
  if (device === "pc") {
    return (
      <div className='group'>
        <div className='rounded-lg overflow-hidden relative'>
          <img loading='lazy' width={1000} height={1000} className='h-full w-full object-cover aspect-[2/3]' src={data?.thumb_url} alt='' />
          {/* <div className='bg-primary font-semibold rounded absolute top-2.5 left-2.5 text-xs text-black px-2.5 py-0.5'>{data?.episode_current}</div> */}
          {findIsLoveMovie && (
            <div className='absolute top-2.5 right-2.5'>
              <FaHeart className='text-red' size={30} />
            </div>
          )}
          <div className='absolute z-10 bg-blur w-full h-full top-0 left-0 aspect-[2/3] flex-center flex-col gap-2  opacity-0 group-hover:opacity-100 duration-300'>
            <Button
              content={findIsLoveMovie ? "Bỏ Thích" : "Yêu Thích"}
              onClick={onToggleMovie}
              className={`-translate-y-3 group-hover:translate-y-0 duration-300 ${findIsLoveMovie ? "text-white bg-red" : " bg-primary text-black"} py-2.5 px-6 rounded-full text-sm  font-semibold leading-none w-36`}
            />
            <Button
              content='Chi Tiết'
              href={`/details/${data.slug}`}
              className='translate-y-3 text-center group-hover:-translate-y-0 hover:bg-primary hover:text-black hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-sm text-black font-semibold leading-none border-2 border-primary text-white w-36'
            />
          </div>
        </div>
        <div>
          <div className='flex items-center my-4 gap-x-1.5'>
            <h3 className='flex-1 line-clamp-1 text-lg font-semibold '>{data?.name}</h3>
            <div className='-tracking-tighter flex items-center text-xs gap-x-1'>
              <MdTimelapse className='text-lg text-primary' />
              <span className='text-sm text-primary'>{data?.year}</span>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex gap-x-1 flex-1'>
              {/* <BoxSolid value={data?.quality} className='!text-primary border-white font-semibold ' />
            <BoxBG value={data?.lang} className='md:!line-clamp-1 font-semibold !hidden ' /> */}
              <h4 className='text-sm text-primary font-bold tracking-wide line-clamp-1'>{data?.origin_name}</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <></>
}
export default CardProduct
