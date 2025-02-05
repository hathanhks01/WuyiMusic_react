import React, { useEffect, useState } from 'react';
import ArtistServices from '../../../Services/ArtistServices';

const Profile = () => {
  const [artistData, setArtistData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await ArtistServices.GetArtistByUserId(); // Thêm await
        console.log("Dữ liệu nghệ sĩ là:", response); // Log ra dữ liệu API
        setArtistData(response); // Cập nhật dữ liệu vào state
      } catch (err) {
        setError("Có lỗi xảy ra khi lấy dữ liệu nghệ sĩ");
        console.error("Error fetching artist data:", err);
      }
    };

    fetchArtist(); // Gọi hàm fetchArtist khi component mount

  }, []);

  return (
    <div className='bg-gray-700 w-screen'>
      
      <div className='h-40 w-40'>
        <img src={artistData?.artistImage || ''} alt="Artist" />
      </div>
      <div className='h-[80vh]'>

      </div>
    </div>
  );
};

export default Profile;
