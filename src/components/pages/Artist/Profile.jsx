import React, { useEffect } from 'react'
import ArtistServices from '../../../Services/ArtistServices';
const Profile = () => {
    const [artistData, setArtistData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchArtist = async () => {
        try {
         
          const response = ArtistServices.GetArtistByUserId();
          console.log("dữ liệu nghệ sĩ là : " +response.data) 
          setArtistData(response.data); // Cập nhật dữ liệu vào state
        } catch (err) {
          setError("Có lỗi xảy ra khi lấy dữ liệu nghệ sĩ");
          console.error("Error fetching artist data:", err);
        }
      };
  
      fetchArtist(); // Gọi hàm fetchArtist khi component mount
  
    }, []); 
  return (
    <div>
        
    </div>
  )
}

export default Profile