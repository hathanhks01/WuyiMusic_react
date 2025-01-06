import React, { useEffect, useState } from 'react';
import Banner from '../../Layouts/Banner';
import TrackService from '../../../Services/TrackService';

const Discover = () => {
    const [ListSong, SetListSong] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTrack = async () => {
        try {
            setIsLoading(true);
            const response = await TrackService.GetAllTrack();
            SetListSong(response.$values || []);
        } catch (error) {
            console.error('Error fetching tracks:', error);
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
                    <a className="text-white/80 hover:text-white" href="">TẤT CẢ {'>'}</a>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl text-white">Đang tải...</div>
                    </div>
                ) : (
                    <div className="relative overflow-hidden">
                        {/* Cuộn ngang với clone */}
                        <div
                            className="flex animate-marquee gap-6"
                            style={{ animationDuration: `${ListSong.length * 2}s` }}
                        >
                            {ListSong.concat(ListSong).map((track, index) => (
                                <div
                                    key={index}
                                    className="w-[180px] rounded-xl shadow-md bg-[#1a1f32] flex-shrink-0"
                                >
                                    <div className="relative">
                                        <img
                                            src={track.trackImage || "/api/placeholder/180/150"}
                                            alt={track.title}
                                            className="w-full h-[150px] object-cover"
                                        />
                                    </div>
                                    <div className="p-3 space-y-1">
                                        <h3 className="font-bold text-center text-white truncate">
                                            {track.title}
                                        </h3>
                                        {track.artist && (
                                            <p className="text-sm text-gray-400 text-center truncate">
                                                {track.artist}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discover;
