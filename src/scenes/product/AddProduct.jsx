import { useState, useEffect } from "react";
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl  } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
// import { fetchProducts } from '../../redux/slices/api/apiSlice';
// import { fetchCatData } from "../../service/getapi";

const ProductAdd = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [subcategoryData, setSubCategoryData] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const fetchCatData = async () => {
    try {
      const response = await axios.get('http://192.168.1.12:3003/api/getcategory');
      setCategoryData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const fetchSubCatData = async () => {
    try {
      const response = await axios.get('http://192.168.1.12:3003/api/getsubcategory');
      setSubCategoryData(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCatData();
    fetchSubCatData();
  }, [])


  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleCategorySubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("http://192.168.1.12:3003/api/addcategory", values);
      resetForm();
      fetchCatData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handlesubCategorySubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("http://192.168.1.12:3003/api/addsubcategory", values);
      resetForm();
      fetchSubCatData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    // console.log(selectedCategory)
    let filteredSubCat = subcategoryData.filter(subCategory => subCategory.perentCategory._id === selectedCategory);
    // console.log(filteredSubCategories)
    setFilteredSubCategories(filteredSubCat);
  };

  const handleProductSubmit = async (values) => {
    try {
      const response = await axios.post("http://192.168.1.12:3003/api/addproduct", values);
    
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div style={{ display: "grid" }}>
        <Box m="20px">
          <Header title="ADD Category" subtitle="Create a New Category" />
          <Formik
            onSubmit={handleCategorySubmit}
            initialValues={initialValuesCat}
            validationSchema={catSchema}
          >
            {({
              values,
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                    error={!!errors.category}
                    // helperText={errors.category}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="start" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Create New Category
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>

        <Box m="20px">
          <Header title="ADD Sub-Category" subtitle="Create a New Sub-Category" />

          <Formik
            onSubmit={handlesubCategorySubmit}
            initialValues={initialValuesSubCat}
            validationSchema={subcatSchema}
          >
            {({
              values,
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="Role">Select Category</InputLabel>
                    <Select
                      placeholder="Category"
                      variant="filled"
                      value={values.perentCategory}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="perentCategory"
                      label="Category"
                      error={!!errors.perentCategory}
                      helperText={errors.perentCategory}
                      sx={{ gridColumn: "span 4" }}
                    >
                      {categoryData.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Sub-Category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.subcategory}
                    name="subcategory"
                    error={!!errors.subcategory}
                    // helperText={ errors.subcategory}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>

                <Box display="flex" justifyContent="start" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Create New Sub-Category
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Box m="20px">
          <Header title="Add Product" subtitle="Add a New Product" />

          <Formik
            onSubmit={handleProductSubmit}
            initialValues={initialValuesProduct}
            validationSchema={productSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="Category">Select Category</InputLabel>
                    <Select
                      placeholder="Category"
                      variant="filled"
                      value={values.categoryID}
                      onChange={(event) => {
                        handleChange(event);
                        handleCategoryChange(event);
                      }}
                      onBlur={handleBlur}
                      name="categoryID"
                      label="Category"
                      error={!!errors.categoryID}
                      helperText={errors.categoryID}
                      sx={{ gridColumn: "span 4" }}
                    >
                      {categoryData.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="Role">Select Sub-Category</InputLabel>
                    <Select
                      placeholder="Sub-Category"
                      variant="filled"
                      value={values.subCategoryID}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="subCategoryID"
                      label="Sub-Category"
                      error={!!errors.subCategoryID}
                      helperText={errors.subCategoryID}
                      sx={{ gridColumn: "span 2" }}

                    >
                      {filteredSubCategories.map((subCategory) => (
                        <MenuItem key={subCategory._id} value={subCategory._id}>
                          {subCategory.subcategory}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Product Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productTitle}
                    name="productTitle"
                    error={!!errors.productTitle}
                    helperText={errors.productTitle}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Product Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productPrice}
                    name="productPrice"
                    error={!!errors.productPrice}
                    helperText={errors.productPrice}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Product Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productDes}
                    name="productDes"
                    error={!!errors.productDes}
                    helperText={errors.productDes}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="url"
                    label="Product Image URL"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productImageURL}
                    name="productImageURL"
                    error={!!errors.productImageURL}
                    helperText={errors.productImageURL}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="start" mt="20px">
                  <Button type="submit" color="secondary" variant="contained" >
                    Add Product
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </div>
    </>
  )
}

const initialValuesCat = {
  category: "",
};
const initialValuesSubCat = {
  perentCategory: "",
  subcategory: "",
};
const initialValuesProduct = {
  productTitle: "",
  productDes: "",
  productPrice: "",
  categoryID: "",
  subCategoryID: "",
  productImageURL: "",
};

const catSchema = yup.object().shape({
  category: yup.string().required("required"),
});
const subcatSchema = yup.object().shape({
  perentCategory: yup.string().required("required"),
  subcategory: yup.string().required("required"),
});
const productSchema = yup.object().shape({
  productTitle: yup.string().required("required"),
  productDes: yup.string().required("required"),
  productPrice: yup
    .number()
    .required("required"),
    categoryID: yup.string().required("required"),
    subCategoryID: yup.string().required("required"),
  productImageURL: yup.string().required("required"),
});

export default ProductAdd