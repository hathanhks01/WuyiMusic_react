import http from "../common/http-common"; // Import http từ http-common
const ArtistService = {
     createArtist: async (artistData) => {
          try {
               const response = await http.post('Artist', artistData);
               return response.data;
          } catch (error) {
               throw error.response?.data || "Lỗi không xác định";             
          }         
     },
     
     updateArtist: async (id, artistData) => {
          try {
              const response = await http.put(`Artist/${id}`, artistData);
              return response.data;
          } catch (error) {
               throw error.response?.data || "Lỗi không xác định";             
          }     
     },

     getArtistById: async (id) => {
          try {
               const response = await http.get(`Artist/${id}`);
               return response.data;
          } catch (error) {
               throw error.response?.data || "Lỗi không xác định";
          }
     },

     getAllArtist: async () => {
          try {
               const response = await http.get('Artist'); // Gọi API để lấy danh sách
               return response.data;
          } catch (error) {
               throw error.response?.data || "Lỗi không xác định";
          }
     },
};

export default ArtistService;