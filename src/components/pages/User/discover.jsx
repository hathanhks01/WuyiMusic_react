import React, { useEffect, useState } from 'react';
import TrackService from '../../../Services/TrackService';
import Banner from '../../Layouts/Banner'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { useMusic } from '../PlayerMusicControl/MusicContext';

const Discover = () => {
    const [ListSong, SetListSong] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentTrack, playTrack, isPlaying, playPause, setTracks } = useMusic();
    const fetchTrack = async () => {
        try {
            setIsLoading(true);
            const response = await TrackService.GetAllTrack();
            console.log('Dữ liệu bài hát:', response.$values);
            const tracks = response.$values || [];
            SetListSong(tracks);
            setTracks(tracks); // Cập nhật tracks trong MusicContext
        } catch (error) {
            console.error('Lỗi khi tải bài hát:', error);
            setError('Không thể tải danh sách bài hát');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTrack();
    }, []);

    return (
        <div className="min-h-screen mt-6 bg-[#111727]">    
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-semibold">Gợi ý cho bạn</span>
                    <a className="text-white/80 hover:text-white" href="/#">TẤT CẢ {'>'}</a>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl text-white">Đang tải...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {ListSong.map((track) => (
                            <div
                                key={track.trackId}
                                className="flex items-center p-4 rounded-xl shadow-md bg-[#1a1f32] space-x-4"
                            >
                                <div className="w-16 h-16 object-cover">
                                    <img
                                        src={track.trackImage}
                                        alt={track.trackName || 'Track Image'}
                                        className="w-full h-full rounded-md"
                                    />
                                </div>
                                <div className="flex-1 text-white">
                                    <span className="block text-sm font-semibold">
                                        {track.title}
                                    </span>
                                </div>
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
                                    className="text-3xl text-white/80 hover:text-white transition-transform"
                                >
                                    {currentTrack?.trackId === track.trackId && isPlaying ? (
                                        <PauseCircleOutlined />
                                    ) : (
                                        <PlayCircleOutlined />
                                    )}
                                </button>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discover;
