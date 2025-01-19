import HttpProxy from '../common/http-common';

const TrackService = {
  GetAllTrack: async () => {
    try {
      const response = await HttpProxy.get('Track/getAllTrack');
      return response.data;  
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy thông tin bài hát:', error);
      throw error; // Ném lỗi để có thể xử lý bên ngoài
    }
  },
  GetFavoriteTrack: async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const response = await HttpProxy.get(`Track/Favorite?userId=${userInfo.userId}`);
      return response.data;  
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy thông tin bài hát:', error);
      throw error; 
    }
  }
  
};

export default TrackService;
