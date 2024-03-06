import axios from 'axios';
import { toast } from 'react-toastify'
const apiUrl = "http://192.168.1.8:3003/api"

export const fetch_Products = async (setProductData) => {
  try {
    const response = await axios.get(`${apiUrl}/getproduct`);
    const filteredData = response.data.filter(
      (item) => item.categoryID.isCatActive && item.subCategoryID.isSubCatActive
    );
    setProductData(filteredData);
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

export const fetch_CatData = async (setCategoryData) => {
  try {
    const response = await axios.get(`${apiUrl}/getcategory`);
    // console.log(response.data)
    const filteredData = response.data.filter(item => item.flag === true);
    const formattedData = filteredData.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    //   console.log(formattedData)
    setCategoryData(formattedData);
  } catch (error) {
    console.error('Error fetching category data:', error);
  }
};

export const fetch_SubCatData = async (setSubCategoryData) => {
  try {
    const response = await axios.get(`${apiUrl}/getsubcategory`);
    const filteredData = response.data.filter(item => item.flag === true);
    const formattedData = filteredData.map((subcat, index) => ({
      ...subcat,
      id: index + 1,
    }));
    setSubCategoryData(formattedData);
  } catch (error) {
    console.error('Error fetching category data:', error);
  }
};

export const fetchData = async (setUserData) => {
  try {
    const response = await axios.get(`${apiUrl}/userDetails`);
    const filteredData = response.data.filter(item => item.flag === true);
    const formattedData = filteredData.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setUserData(formattedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const handle_FormSubmit = async (values, resetForm) => {
  try {
    const response = await axios.post(`${apiUrl}/userRegistration`, values);
    resetForm();
    
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export const handle_Delete = async (userId, setUserData) => {
  try {
    await axios.delete(`${apiUrl}/userDetails/${userId}`, { flag: false });
    setUserData(prevUserData => prevUserData.filter(user => user._id !== userId));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const handle_UpdateUser = async (editedUser, setUserData) => {
  try {
    await axios.put(`${apiUrl}/userDetails/${editedUser._id}`, editedUser);
    setUserData(prevUserData => prevUserData.map(user => (user._id === editedUser._id ? editedUser : user)));
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const handle_DeleteCat = async (id, setCategoryData, setOpenDelete) => {
  try {
    await axios.delete(`${apiUrl}/categorydelete/${id}`, { flag: false });
    setCategoryData(prevCategoryData => prevCategoryData.filter(category => category._id !== id));
    setOpenDelete(false);
    toast.success("Category Deleted");
  } catch (error) {
    console.error('Error deleting category:', error);
    toast.error("Error");
  }
};

export const handle_DeleteSubCat = async (id, setSubCategoryData, setOpenSubDelete) => {
  try {
    await axios.delete(`${apiUrl}/subcategorydelete/${id}`, { flag: false });
    setSubCategoryData(prevSubCategoryData => prevSubCategoryData.filter(subcategory => subcategory._id !== id));
    setOpenSubDelete(false);
    toast.success("Sub-Category Deleted");
  } catch (error) {
    console.error('Error deleting sub-category:', error);
    toast.error("Error");
  }
};

export const handle_UpdateCat = async (editedCat, setCategoryData, setOpenEdit, categoryData) => {
  try {
    await axios.put(`${apiUrl}/categoryedit/${editedCat._id}`, editedCat);
    setCategoryData(prevCategoryData => prevCategoryData.map(category => (category._id === editedCat._id ? editedCat : category)));
    setOpenEdit(false);
    toast.success("Category Updated");
  } catch (error) {
    console.error('Error updating category:', error);
    toast.error("Error");
  }
};

export const handle_UpdateSubCat = async (editedSubCat, setSubCategoryData, setOpenSubEdit, subcategoryData) => {
  try {
    await axios.put(`${apiUrl}/subcategoryedit/${editedSubCat._id}`, editedSubCat);
    setSubCategoryData(prevSubCategoryData => prevSubCategoryData.map(subcategory => (subcategory._id === editedSubCat._id ? editedSubCat : subcategory)));
    setOpenSubEdit(false);
    toast.success("Sub-Category Updated");
  } catch (error) {
    console.error('Error updating sub-category:', error);
    toast.error("Error");
  }
};

export const handle_CategorySubmit = async (values, resetForm, fetchCatData) => {
  try {
    const response = await axios.post(`${apiUrl}/addcategory`, values);
    if (response.data.status) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    resetForm();
    fetchCatData();
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("An error occurred while submitting the form");
  }
};

export const handle_subCategorySubmit = async (values, resetForm, fetchSubCatData) => {
  try {
    const response = await axios.post(`${apiUrl}/addsubcategory`, values);
    if (response.data.status) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    resetForm();
    fetchSubCatData();
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("An error occurred while submitting the form");
  }
};

export const handle_SwitchChange = async (id, newValue, setCategoryData) => {
  try {
    await axios.post(`${apiUrl}/activecategory/${id}`, {
      isCatActive: newValue
    });

    setCategoryData(prevData => {
      return prevData.map(category => {
        if (category._id === id) {
          return { ...category, isCatActive: newValue };
        } else {
          return category;
        }
      });
    });

  } catch (error) {
    console.error('Error updating category data:', error);
  }
};

export const handle_SubSwitchChange = async (id, newSubValue, setSelectedSubCategory) => {
  try {
    await axios.post(`${apiUrl}/activesubcategory/${id}`, {
      isSubCatActive: newSubValue,
    });

    setSelectedSubCategory(prevData => {
      return prevData.map(subcategory => {
        if (subcategory._id === id) {
          return { ...subcategory, isSubCatActive: newSubValue };
        } else {
          return subcategory;
        }
      });
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
  }
};

export const handle_ProductSubmit = async (values, fetchProducts) => {
  try {
    const response = await axios.post(
      `${apiUrl}/addproduct`,
      values
    );
    if (response.data.status) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    fetchProducts();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};