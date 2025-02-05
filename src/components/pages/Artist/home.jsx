import React, { useEffect, useState } from 'react';
import ArtistServices from '../../../Services/ArtistServices';
import './Home.css';

const Home = () => {
    const [artistData, setArtistData] = useState(null);
    const [error, setError] = useState(null);
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [typingText, setTypingText] = useState('');

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await ArtistServices.GetArtistByUserId();
                console.log("Dữ liệu nghệ sĩ là:", response);
                setArtistData(response);
                // Start typing effect once artist data is fetched
                startTypingEffect(response.name);
            } catch (err) {
                setError("Có lỗi xảy ra khi lấy dữ liệu nghệ sĩ");
                console.error("Error fetching artist data:", err);
            }
        };

        fetchArtist();
    }, []);

    const startTypingEffect = (name) => {
        const fullText = `For artist ${name}`; // Full text to type
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                setTypingText(fullText.slice(0, index + 1)); // Type one character at a time
                index++;
            } else {
                clearInterval(interval);
                setIsTypingComplete(true); // Mark typing as complete
            }
        }, 100); // Adjust typing speed here
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='h-screen w-screen mt-16 bg-slate-900 flex flex-col items-center'>           
    
            {/* Layout with greeting on left and image on right */}
            <div className='flex items-center mt-12 space-x-12'>
                {/* Artist greeting */}
                <div className='text-center mr-8'>
                    <h2 className='text-yellow-300 text-2xl'>
                        WuyiMusic xin chào
                    </h2>
                    <h1 className='text-white text-3xl flex items-center'>
                        {typingText}
                        <span className="cursor"></span> {/* Cursor element */}
                    </h1>
                </div>
    
                {/* Artist image */}
                {artistData && (
                    <div className='h-80 w-80 rounded-full overflow-hidden border-2 border-yellow-400 shadow-custom animate-flyin'>
                        <img
                            src={artistData?.artistImage || ''}
                            alt="Artist"
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
    
    
};

export default Home;
