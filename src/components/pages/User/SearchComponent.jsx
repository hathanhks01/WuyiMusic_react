import React from 'react';
import { useLocation } from 'react-router-dom';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { useMusic } from '../../pages/PlayerMusicControl/MusicContext';

const SearchComponent = () => {
    const location = useLocation();
    const searchResults = location.state?.searchResults || { tracks: [], artists: [], albums: [] };
    const { currentTrack, playTrack, isPlaying, playPause } = useMusic();

    const renderTopResultAndTracks = () => {
        if (!searchResults.tracks.length) return null;
        const topTrack = searchResults.tracks[0];

        return (
            <div className="mb-8">
                {/* Dòng tiêu đề chung */}
                <div className="grid grid-cols-3 gap-6 items-start mb-3">
                    <h2 className="text-2xl font-bold text-white">Kết quả hàng đầu</h2>
                    <div className="col-span-2 flex justify-start">
                        <h2 className="text-2xl font-bold text-white">Bài Hát</h2>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 items-start">
                    {/* Kết quả hàng đầu */}
                    <div className="col-span-1 bg-[#1a1f32] p-4 rounded-xl flex items-center space-x-4 hover:bg-[#252b44] transition-colors min-h-full">
                        <img
                            src={topTrack.trackImage}
                            alt={topTrack.title}
                            className="w-24 h-24 rounded-md object-cover"
                            onContextMenu={(e) => e.preventDefault()}
                            draggable="false"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white text-xl font-bold truncate">{topTrack.title}</h3>
                            <p className="text-white/60">Bài hát - {topTrack.artist}</p>
                        </div>
                        <button
                            onClick={() => {
                                if (currentTrack?.trackId === topTrack.trackId && isPlaying) {
                                    playPause();
                                } else {
                                    playTrack(topTrack);
                                }
                            }}
                            className="text-4xl text-white/80 hover:text-white"
                        >
                            {currentTrack?.trackId === topTrack.trackId && isPlaying ? (
                                <PauseCircleOutlined />
                            ) : (
                                <PlayCircleOutlined />
                            )}
                        </button>
                    </div>

                    {/* Danh sách bài hát */}
                    <div className="col-span-2">
                        <div className="space-y-4">
                            {searchResults.tracks.slice(1).map((track, index) => (
                                <div key={`track-${track.trackId || index}`}
                                    className="flex items-center justify-between p-4 rounded-xl bg-[#1a1f32] hover:bg-[#252b44] transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={track.trackImage}
                                            alt={track.title}
                                            className="w-12 h-12 rounded-md object-cover"
                                            onContextMenu={(e) => e.preventDefault()}
                                            draggable="false"
                                        />
                                        <h3 className="text-white font-medium truncate">{track.title}</h3>
                                    </div>
                                    <span className="text-white/60">{track.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };



    const renderArtistSection = () => {
        if (!searchResults.artists.length) return null;

        return (
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Nghệ Sĩ</h2>
                <div className="flex gap-8 overflow-x-auto pb-6">
                    {searchResults.artists.map((artist, index) => (
                        <div
                            key={`artist-${artist.artistId || index}`}
                            className="flex flex-col items-center min-w-[160px] hover:opacity-80 transition-opacity"
                        >
                            <img
                                src={artist.artistImage}
                                alt={artist.name}
                                className="w-40 h-40 rounded-full object-cover"
                                onContextMenu={(e) => e.preventDefault()}
                                draggable="false"
                            />
                            <span className="text-white mt-3 font-medium text-center">{artist.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderAlbumSection = () => {
        if (!searchResults.albums || searchResults.albums.length === 0) return null; oi

        return (
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Album</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {searchResults.albums.map((album, index) => (
                        <div key={`album-${album.albumId || index}`} className="flex flex-col items-center hover:opacity-80 transition-opacity">
                            <img
                                src={album.albumImage}
                                alt={album.title}
                                className="w-40 h-40 rounded-md object-cover"
                                onContextMenu={(e) => e.preventDefault()}
                                draggable="false"
                            />
                            <span className="text-white mt-3 font-medium text-center">{album.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen mt-6 mb-16">
            <div className="container mx-auto px-4">
                {renderTopResultAndTracks()}
                {renderArtistSection()}
                {renderAlbumSection()}
            </div>
        </div>
    );
};

export default SearchComponent;
