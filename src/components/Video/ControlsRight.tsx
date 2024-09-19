"use client"
import { memo } from "react"
import Tooltip from "@mui/material/Tooltip"
import { LuRectangleHorizontal, AiOutlineFullscreen, AiOutlineFullscreenExit } from "@/utils/icons"
import Button from "../Button"
import { IconButton } from "@mui/material"
const ControlsRight = (props: any) => {
  const { onToggleMiniMap, onChangeTheaterMode, onChangeFullScreen } = props
  return (
    <div className='flex items-center justify-center gap-x-0' onClick={(e) => e.stopPropagation()}>
      <Tooltip title={<h3 className='text-primary text-xs md:text-sm'>Chế độ thu nhỏ</h3>} placement='top'>
        <IconButton>
          <Button
            onClick={onToggleMiniMap}
            icon={
              <svg height='100%' version='1.1' viewBox='0 0 36 36' width='40'>
                <use className='ytp-svg-shadow'></use>
                <path
                  d='M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 Z'
                  fill='#fff'
                  id='ytp-id-20'></path>
              </svg>
            }
            className='hover:text-primary duration-300 text-white'
          />
        </IconButton>
      </Tooltip>
      <Tooltip title={<h3 className='text-primary text-xs md:text-sm'>Chế độ rạp chiếu</h3>} placement='top'>
        <IconButton>
          <Button onClick={onChangeTheaterMode} icon={<LuRectangleHorizontal size={30} />} className='hover:text-primary duration-300 text-white' />
        </IconButton>
      </Tooltip>
      <Tooltip title={<h3 className='text-primary text-xs md:text-sm'>Toàn màn hình</h3>} placement='top'>
        <IconButton>
          <Button onClick={onChangeFullScreen} icon={document.fullscreenElement == null ? <AiOutlineFullscreen size={30} /> : <AiOutlineFullscreenExit size={30} />} className='hover:text-primary duration-300 text-white' />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default memo(ControlsRight)
