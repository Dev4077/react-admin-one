import axios from 'axios';

export const fetchCategoryData = async () => {
  try {
    const response = await axios.get('http://192.168.1.12:3003/api/getcategory');
    return response.data;
  } catch (error) {
    console.error('Error fetching category data:', error);
    return [];
  }
};

export const fetchSubCategoryData = async () => {
  try {
    const response = await axios.get('http://192.168.1.12:3003/api/getsubcategory');
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategory data:', error);
    return [];
  }
};
