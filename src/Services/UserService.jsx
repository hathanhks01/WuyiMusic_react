import http from "../common/http-common"; 

const UserService = { 
  getAllUsers: async () => {
    try {
      const response = await http.get('User'); // Gọi API để lấy danh sách User
      return response.data;
    } catch (error) {
      throw error.response?.data || "Lỗi không xác định";
    }
  },
};

export default UserService;