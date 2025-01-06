import HttpProxy from '../common/http-common';

const TrackService = {
  GetAllTrack: async () => {
    try {
      const response = await HttpProxy.get('Track/getAllTrack');
      return response.data;  // Trả về dữ liệu từ server
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy thông tin bài hát:', error);
      throw error; // Ném lỗi để có thể xử lý bên ngoài
    }
  }
};

export default TrackService;
