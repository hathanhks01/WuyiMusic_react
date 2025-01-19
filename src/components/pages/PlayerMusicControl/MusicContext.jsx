import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Thêm state mới cho queue và history
  const [queue, setQueue] = useState([]);
  const [playHistory, setPlayHistory] = useState([]);
  const [isQueueVisible, setIsQueueVisible] = useState(false);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      // Cập nhật history khi bài hát kết thúc
      const currentTrack = getCurrentTrack();
      if (currentTrack) {
        addToHistory(currentTrack);
      }
      nextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    audio.volume = volume / 100;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const loadTrack = (track) => {
    audioRef.current.src = track.filePath;
    audioRef.current.load();
    setCurrentTime(0);
  };

  // Thêm functions mới cho queue management
  const addToQueue = (track) => {
    setQueue(prevQueue => [...prevQueue, track]);
  };

  const removeFromQueue = (trackId) => {
    setQueue(prevQueue => prevQueue.filter(track => track.trackId !== trackId));
  };

  const clearQueue = () => {
    setQueue([]);
  };

  const addToHistory = (track) => {
    setPlayHistory((prevHistory) => {
      // Loại bỏ bài hát khỏi danh sách nếu đã tồn tại
      const filteredHistory = prevHistory.filter(
        (historyTrack) => historyTrack.trackId !== track.trackId
      );
      // Thêm bài hát lên đầu danh sách
      const newHistory = [track, ...filteredHistory];
      // Giữ lại tối đa 20 bài gần nhất
      return newHistory.slice(0, 20);
    });
  };

  const playTrackFromQueue = (trackId) => {
    const trackIndex = queue.findIndex(track => track.trackId === trackId);
    if (trackIndex !== -1) {
      const track = queue[trackIndex];
      // Xóa các bài hát trước bài được chọn khỏi queue
      setQueue(prevQueue => prevQueue.slice(trackIndex + 1));
      playTrack(track);
    }
  };

  const playPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (queue.length > 0) {
        // Play the next track in the queue
        const nextTrack = queue[0];
        setQueue(prevQueue => prevQueue.slice(1)); // Remove the played track from the queue
        playTrack(nextTrack);
    } else if (tracks.length > 0) {
        // If the queue is empty, play the next track in the playlist
        const nextIndex = (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(nextIndex);
        loadTrack(tracks[nextIndex]);
        if (isPlaying) {
            audioRef.current.play().catch(console.error);
        }
    }
};


  const previousTrack = () => {
    if (playHistory.length > 0) {
      // Lấy bài hát gần nhất từ lịch sử
      const previousTrack = playHistory[0];
      setPlayHistory(prevHistory => prevHistory.slice(1));
      // Thêm bài hát hiện tại vào đầu queue
      const currentTrack = getCurrentTrack();
      if (currentTrack) {
        setQueue(prevQueue => [currentTrack, ...prevQueue]);
      }
      playTrack(previousTrack);
    } else if (tracks.length > 0) {
      const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
      setCurrentTrackIndex(prevIndex);
      loadTrack(tracks[prevIndex]);
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const setVolumeLevel = (level) => {
    setVolume(level);
    audioRef.current.volume = level / 100;
  };

  const getCurrentTrack = () => tracks[currentTrackIndex];

  const playTrack = (track) => {
    const trackIndex = tracks.findIndex((t) => t.trackId === track.trackId);
  if (trackIndex !== -1) {
    // Thêm bài hát hiện tại vào lịch sử trước khi phát bài mới
    const currentTrack = getCurrentTrack();
    if (currentTrack && currentTrack.trackId !== track.trackId) {
      addToHistory(currentTrack);
    }
    setQueue(prevQueue => prevQueue.filter(t => t.trackId !== track.trackId));
    // Cập nhật trạng thái phát bài hát mới
    setCurrentTrackIndex(trackIndex);
    audioRef.current.src = track.filePath;
    audioRef.current.load();
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        console.error("Error playing track:", error);
      });
  }
  };

  const toggleQueueVisibility = () => {
    setIsQueueVisible(!isQueueVisible);
  };

  return (
    <MusicContext.Provider value={{
      tracks,
      setTracks,
      currentTrack: getCurrentTrack(),
      isPlaying,
      volume,
      currentTime,
      duration,
      playPause,
      nextTrack,
      previousTrack,
      seekTo,
      setVolumeLevel,
      playTrack,
      // Thêm các giá trị mới
      queue,
      playHistory,
      addToQueue,
      removeFromQueue,
      clearQueue,
      playTrackFromQueue,
      isQueueVisible,
      toggleQueueVisibility
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic phải được sử dụng trong MusicProvider');
  }
  return context;
};

export default MusicContext;