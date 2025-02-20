import http from "../common/http-common";

const LyricsService = {
  addLyrics: async (lyricsData) => {
    try {
      const response = await http.post("Lyrics", lyricsData);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Lỗi không xác định";
    }
  },

  getAllLyrics: async () => {
    try {
      const response = await http.get("Lyrics");
      return response.data;
    } catch (error) {
      throw error.response?.data || "Lỗi không xác định";
    }
  },

  updateLyrics: async (id, lyricsData) => {
    try {
      const response = await http.put(`Lyrics/${id}`, lyricsData);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Lỗi không xác định";
    }
  },

  deleteLyrics: async (id) => {
    try {
      await http.delete(`Lyrics/${id}`);
    } catch (error) {
      throw error.response?.data || "Lỗi không xác định";
    }
  },

  getAllTrack: async () => {
    try {
      const response = await http.get("Track/getAllTrack");
      return response.data;
    } catch (error) {
      throw error.response?.data || "Lỗi không xác định";
    }
  },
};

export default LyricsService;
