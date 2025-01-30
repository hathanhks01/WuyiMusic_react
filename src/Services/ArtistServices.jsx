import React from 'react'
import http from '../common/http-common';
const ArtistServices  = {
  GetAllArtist: async()=>{
        try{
          const reponse=http.get('/api/Artist')
          return reponse.data;
        }catch(error){
            console.error('Có lỗi xảy ra khi lấy thông tin nghệ sĩ:', error);
            throw error; 
        }
  },
  GetArtistByUserId: async(id) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user.userId;  
      console.log(userId);  // In ra userId
      const response = await http.get(`/api/Artist/User/${userId}`);
      return reponse.data;
    } else {
      console.log('User information not found');
    }
  }
  
}

export default ArtistServices