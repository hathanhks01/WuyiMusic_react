import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef(new Audio());

  // Thêm useEffect để xử lý audio events
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextTrack();
    };

    // Thêm event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    // Set volume ban đầu
    audio.volume = volume / 100;

    return () => {
      // Cleanup event listeners
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const loadTrack = (track) => {
    audioRef.current.src = track.filePath;
    audioRef.current.load();
    setCurrentTime(0); // Reset currentTime khi load bài mới
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
    if (tracks.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    loadTrack(tracks[nextIndex]);
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    }
  };

  const previousTrack = () => {
    if (tracks.length === 0) return;
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIndex);
    loadTrack(tracks[prevIndex]);
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
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
        setCurrentTrackIndex(trackIndex);
        audioRef.current.src = track.filePath; // Sử dụng filePath để phát nhạc
        audioRef.current.load();
        audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch((error) => {
                console.error("Error playing track:", error);
            });
    }
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
      playTrack
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