import axios from "axios";

export const fetchCatData = async () => {
    try {
      const response = await axios.get('http://192.168.1.12:3003/api/getcategory');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }