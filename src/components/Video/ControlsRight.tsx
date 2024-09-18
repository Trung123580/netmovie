import { memo } from "react"
// import Tippy from '@tippyjs/react';
import { v4 as uuid } from "uuid"
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import CropFreeRoundedIcon from '@mui/icons-material/CropFreeRounded';
// import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import { IoRepeatOutline, LuRectangleHorizontal, AiOutlineFullscreen, AiOutlineFullscreenExit } from "@/utils/icons"
// import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
const ControlsRight = (props: any) => {
  const { themeApp, isAutoPlay, isOpenQuality, isOpenSetting, quality, onChangeAutoPlay, onOpenQuality, onChangeQuality, onChangeTheaterMode, onChangeFullScreen, menuQuality } = props
  // const menuQuality = ['720p', '480p', '360p'];
  return (
    <div className='flex items-center justify-center gap-x-2' onClick={(e) => e.stopPropagation()}>
      {/* <Tippy content={<span className='tippy-title'>Lặp lại</span>} followCursor='horizontal' placement='top' arrow={true} duration={300}> */}
      {/* <div className={"icon"} onClick={() => onChangeAutoPlay()}>
        <IoRepeatOutline size={30} style={{ color: themeApp && !isAutoPlay && themeApp?.primaryColor }} />
      </div> */}
      {/* </Tippy> */}
      {/* <Tippy content={<span className='tippy-title'>Cài đặt</span>} followCursor='horizontal' placement='top' arrow={true} duration={300}> */}
      {/* </Tippy> */}
      {/* <div
        // className={('current-quality', {
        //   open: isOpenSetting && !isOpenQuality,
        // })}
        onClick={(e) => {
          onOpenQuality(false, true)
        }}>
        <div>Chất lượng</div>
        <div>
          Auto {quality}
          <ArrowForwardIosRoundedIcon sx={{ fontSize: '1.7rem !important' }} />
        </div>
      </div> */}
      {/* <Tippy content={<span className='tippy-title'>Chế đọ rạp chiếu</span>} followCursor='horizontal' placement='top' arrow={true} duration={300}> */}
      <div className={"icon"} onClick={onChangeTheaterMode}>
        <LuRectangleHorizontal size={30} />
      </div>
      {/* </Tippy> */}
      {/* <Tippy content={<span className='tippy-title'>Toàn màn hình</span>} followCursor='horizontal' placement='top' arrow={true} duration={300}> */}
      <div className={"icon"} onClick={onChangeFullScreen}>
        {document.fullscreenElement == null ? <AiOutlineFullscreen size={30} /> : <AiOutlineFullscreenExit size={30} />}
      </div>
      {/* </Tippy> */}
    </div>
  )
}

export default memo(ControlsRight)
