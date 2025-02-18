import http from "../common/http-common";

const AdvertisementService = {

  addAdvertisement: async (advertisementData) => {
    try {
      const response = await http.post('Advertisement', advertisementData);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Lỗi không xác định";             
    }         
  },

  getAllAdvertisements: async () => {
    try {
      const response = await http.get('Advertisement'); 
      return response.data;
    } catch (error) {
      throw error.response?.data || "Lỗi không xác định";
    }
  },

  updateAdvertisement: async (id, advertisementData) => {
    try {
      const response = await http.put(`Advertisement/${id}`, advertisementData);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Lỗi không xác định";
    }
  },

  deleteAdvertisement: async (id) => {
    try {
      await http.delete(`Advertisement/${id}`);
    } catch (error) {
      throw error.response?.data || "Lỗi không xác định";
    }
  },
};

export default AdvertisementService;