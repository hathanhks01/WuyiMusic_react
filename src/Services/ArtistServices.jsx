import http from '../common/http-common';

const ArtistServices = {
  GetAllArtist: async () => {
    try {
      const response = await http.get('/Artist'); // Thêm await
      return response.data;
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy thông tin nghệ sĩ:', error);
      throw error; 
    }
  },

  GetArtistByUserId: async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user.userId;  
      console.log("User ID:", userId);  // In ra userId để debug
      try {
        const response = await http.get(`/Artist/user/${userId}`);
        return response.data;
      } catch (error) {
        console.error('Có lỗi khi lấy dữ liệu nghệ sĩ:', error);
        throw error;
      }
    } else {
      console.log('User information not found');
      return null;
    }
  }
};

export default ArtistServices;
