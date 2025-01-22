import React, { useEffect, useState } from 'react';
import TrackService from '../../../Services/TrackService';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { useMusic } from '../PlayerMusicControl/MusicContext';

const LikedList = ({ userId }) => {
  const [likedTracks, setLikedTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentTrack, playTrack, isPlaying, playPause } = useMusic();
  
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);

  useEffect(() => {
    const fetchLikedTracks = async () => {
      try {
        const response = await TrackService.GetFavoriteTrack(userId);
        console.log("Dữ liệu trả về từ API:", response);

        if (response && Array.isArray(response.$values)) {
          setLikedTracks(response.$values);
        } else {
          throw new Error('Dữ liệu không hợp lệ');
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setLikedTracks([]); // Set list to empty for 404
        } else {
          setError(err); // Handle other errors
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLikedTracks();
  }, [userId]);

  const formatDuration = (duration) => {
    const parts = duration.split(':');
    if (parts.length >= 3) {
      return `${parts[1]}:${parts[2].slice(0, 2)}`; // Return minutes and seconds
    }
    return duration; // Return original value if not parseable
  };

  const [hoveredTrackId, setHoveredTrackId] = useState(null);

  const handleTrackDoubleClick = (track) => {
    console.log('Đang phát bài hát:', track);
    if (currentTrack?.trackId === track.trackId && isPlaying) {
      playPause(); // Pause if currently playing
    } else {
      if (!track.filePath) {
        console.error('Bài hát không có filePath:', track);
        return;
      }
      playTrack(track); // Play the track
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Có lỗi xảy ra: {error.message}</div>;
  if (likedTracks.length === 0) return null;

  return (
    <div className='p-2'>
      <h2>Bài hát đã thích</h2>
      <div className="flex flex-col space-y-4">
        {likedTracks.map((track) => (
          <div
            key={track.trackId}
            className="relative flex items-center bg-[#1a1f32] p-4 rounded-xl cursor-pointer"
            onMouseEnter={() => setHoveredTrackId(track.trackId)}
            onMouseLeave={() => setHoveredTrackId(null)}
            onDoubleClick={() => handleTrackDoubleClick(track)} // Double-click handler
          >
            <div className="relative">
              <img src={track.trackImage} alt={track.title} className="w-16 h-16 rounded-md" />
              {hoveredTrackId === track.trackId && (
                <button
                  onClick={() => {
                    console.log('Đang phát bài hát:', track);
                    if (currentTrack?.trackId === track.trackId && isPlaying) {
                      playPause(); // Dừng bài hát nếu đang phát
                    } else {
                      if (!track.filePath) {
                        console.error('Bài hát không có filePath:', track);
                        return;
                      }
                      playTrack(track); // Phát bài hát
                    }
                  }}
                  className="absolute inset-0 flex items-center justify-center text-3xl text-white/80 hover:text-white transition-transform"
                >
                  {currentTrack?.trackId === track.trackId && isPlaying ? (
                    <PauseCircleOutlined />
                  ) : (
                    <PlayCircleOutlined />
                  )}
                </button>
              )}
            </div>
            <div className="flex-1 text-white ml-4">
              <span className="block text-sm font-semibold">{track.title || 'Không có tên'}</span>
              <span className="block text-sm">{track.artist || 'Không có nghệ sĩ'}</span>
            </div>
            <span className="text-white ml-4">{formatDuration(track.duration)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedList;
