import React, { useState } from 'react';
import { HeartOutlined, HeartFilled, PlayCircleOutlined, PauseCircleOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { useMusic } from '../pages/PlayerMusicControl/MusicContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeOff, faVolumeHigh, faMusic, faList } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
  const { currentTrack, tracks, isPlaying, playPause } = useMusic();
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại
  const duration = 180; // Độ dài bài hát (thay thế bằng giá trị thực tế)
  const [volume, setVolume] = useState(0); // Giá trị âm lượng mặc định

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    console.log('Volume:', event.target.value);
  };
  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleSeek = (newTime) => {
    setCurrentTime(newTime); // Cập nhật thời gian hiện tại
    console.log('Seek to:', newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className='w-full h-24 bg-gray-800 text-white text-center fixed bottom-0'>
      <div className="flex w-full h-full">
        <div className="flex-1 flex items-center justify-start"> {/* Phần 1 */}
          <div className="w-12 h-12 m-4 overflow-hidden flex items-center">
            <img src="src/assets/image/miaomiao.jpg" alt="" className='w-full h-full object-cover' />
          </div>
          <div className="flex flex-col"> {/* Use flex column for stacking text */}
            <span>{tracks[currentTrack]}</span>
            <span className='text-xs text-white/80'>Sơn Tùng MTP</span>
          </div>
          <div>
            <button
              onClick={handleLikeToggle}
              className={`p-4 rounded ${isLiked ? 'text-red-500' : 'text-white'}`} // Change color based on state
              title={isLiked ? 'Xóa khỏi thư viện' : 'Thêm vào thư viện'} // Tooltip text
            >
              {isLiked ? <HeartFilled /> : <HeartOutlined />} {/* Change icon based on state */}
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center"> {/* Phần 2: Thanh chạy thời gian */}
          <div className='w-full'>
            <div className="flex justify-center items-center space-x-4">
              <button className="text-2xl p-2 text-white/50 hover:text-white hover:scale-105 transition-transform ">
                <StepBackwardOutlined />
              </button>
              <button onClick={playPause} className="text-3xl p-3 hover:scale-105 transition-transform ">
                {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
              </button>
              <button className="text-2xl p-2  text-white/50 hover:text-white  hover:scale-105 transition-transform rounded">
                <StepForwardOutlined />
              </button>
            </div>
            <div className="flex items-center w-full px-2"> {/* Sử dụng Flexbox cho 3 thành phần ngang hàng */}
              <span className='p-1'>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100}
                onChange={(event) => handleSeek((event.target.value / 100) * duration)}
                style={{
                  width: '100%',
                  height: '0.25rem',
                  background: `linear-gradient(to right, white 0%, white ${(currentTime / duration) * 100}%, gray ${(currentTime / duration) * 100}%, gray 100%)`,
                  appearance: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                }}
              />
              <span className='p-1'>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end pr-7 space-x-4"> {/* Phần 3 */}

          <div className="flex items-center ">
            <span className="text-xs mr-2 p-4"><FontAwesomeIcon icon={volume == 0 ? faVolumeOff : faVolumeHigh} /></span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                width: '150px',
                appearance: 'none',
                background: `linear-gradient(to right, white ${volume}%, #ccc ${volume}%)`,
                height: '0.25rem',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            />
            {/* <span className="text-xs ml-2 pl-6">{volume}%</span> */}
          </div>
          <button className='border-l border-l-white/50 pl-2 text-white/50 hover:text-white '>
            <FontAwesomeIcon icon={faMusic} />
          </button>
          <button className='  text-white/50 hover:text-white'>
            <FontAwesomeIcon icon={faList} />
          </button>
          <div>
            <audio src=''></audio>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
