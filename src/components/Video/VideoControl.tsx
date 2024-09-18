// import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
// import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import Slider from "@mui/material/Slider"
import { LuVolume2, LuVolumeX, LuVolume1, IoPlay, IoPause } from "../../utils/icons"
import classNames from "classnames/bind"
import ControlsRight from "./ControlsRight"
import Button from "../Button"
const VideoControl = (props: any) => {
  const {
    isPlay,
    currentSeconds,
    maxDuration,
    onChangeCommitted,
    onChange,
    slots,
    onTogglePlayVideo,
    secondsLoaded,
    volume,
    onChangeVolume,
    themeApp,
    theme,
    changeCurrentTime,
    setChangeVolume,
    onNextVideo,
    onPrevVideo,
    //onChangeAutoPlay, => dùng ở controlsRight
    //isOpenQuality, => dùng ở controlsRight
    //isOpenSetting, => dùng ở controlsRight
    //onOpenQuality, => dùng ở controlsRight
    //isAutoPlay, => dùng ở controlsRight
    //quality, => dùng ở controlsRight
  } = props
  return (
    <div
      // className={cx('video-progress', {
      //   paused: !isPlay,
      // })}
      className='absolute bottom-0 w-full h-16 px-1'
      onClick={(e) => e.stopPropagation()}>
      <div>
        <Slider
          // className={cx('progress-bar')}
          aria-label='time-indicator'
          size='small'
          value={currentSeconds}
          min={0}
          step={0.01}
          max={maxDuration}
          onChange={onChange}
          onChangeCommitted={onChangeCommitted}
          slots={{
            valueLabel: slots,
          }}
          sx={{
            // color: '#fff',
            color: "rgb(228, 216, 4)",
            height: 4,
            "&:hover": {
              height: 5.5,
            },
            "& .MuiSlider-thumb": {
              width: 10,
              height: 10,
              display: "none",
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&::before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 4px rgb(0 0 0 / 16%)`,
              },
              "&.Mui-active": {
                width: 10,
                height: 10,
                display: "block",
              },
            },
            "& .MuiSlider-rail": {
              // opacity: 0.28,
              opacity: 1,
              background: "#626262",
              borderRadius: 0,
              "&::after": {
                content: '""',
                top: 0,
                left: 0,
                background: "rgb(184, 184, 184)",
                width: `${30}%`, //secondsLoaded // thoi gian load dx video
                height: "100%",
                position: "absolute",
                zIndex: "-1", // Để đặt lớp ::after phía dưới slider
              },
            },
          }}
        />
      </div>
      <div className='flex absolute bottom-0 w-full h-[calc(100%_-_16px)] justify-between px-3' onClick={(e) => e.stopPropagation()}>
        <div className='flex items-center justify-center group'>
          {/* <span onClick={onPrevVideo}><SkipPreviousRoundedIcon /></span> */}
          <Button
            // className={cx('icon', {
            //   sizeLg: true,
            // })}
            icon={isPlay ? <IoPause size={25} /> : <IoPlay size={25} />}
            onClick={onTogglePlayVideo}
          />
          {/* <span onClick={onNextVideo}><SkipNextRoundedIcon /></span> */}
          <div
            // className={cx('icon', {
            // volume: true,
            // })}</div>
            className='cursor-pointer ml-[5px] p-[5px] relative z-10'>
            {volume >= 60 ? (
              <LuVolume2 size={20} onClick={() => setChangeVolume(0)} />
            ) : volume > 0 && volume < 60 ? (
              <LuVolume1 size={20} onClick={() => setChangeVolume(0)} />
            ) : volume === 0 ? (
              <LuVolumeX size={20} onClick={() => setChangeVolume(100)} />
            ) : null}
            <div className='rotate-[-89.5deg] absolute bottom-[55px] -right-[47px] opacity-0 group-hover:opacity-100 duration-200 '>
              <Slider
                // className={cx('slider-volume')}
                aria-label='Volume'
                value={volume}
                onChange={onChangeVolume}
                min={0}
                step={0.01}
                max={100}
                slots={{
                  valueLabel: slots,
                }}
                sx={{
                  mx: "10px",
                  height: 5,
                  width: 100,
                  color: "rgb(228, 216, 4)",
                  "&:hover": {
                    height: 4,
                  },
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,
                    "&::before": {
                      boxShadow: "0 2px 8px 0 rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: `0px 0px 0px 4px ${theme?.palette.mode === "dark" ? "rgb(255 255 255 / 16%)" : "rgb(0 0 0 / 16%)"}`,
                    },
                  },
                  "& .MuiSlider-rail": {
                    background: "#626262",
                  },
                }}
              />
            </div>
          </div>
          <div className='flex gap-x-1'>
            <span>{slots || "00:00"}</span>
            <span>|</span>
            <span>{changeCurrentTime || "00:00"}</span>
          </div>
        </div>
        <ControlsRight {...props} />
      </div>
    </div>
  )
}

export default VideoControl
