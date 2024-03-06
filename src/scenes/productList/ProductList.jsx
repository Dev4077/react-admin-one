import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  useTheme,
  Box,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast, ToastContainer } from "react-toastify";
import {
  fetch_Products,
  fetch_CatData,
  fetch_SubCatData,
  handle_ProductSubmit,
} from "../../service/apiFun";

const ProductList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [productData, setProductData] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [subcategoryData, setSubCategoryData] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const fetchProducts = async () => {
    fetch_Products(setProductData);
  };

  const fetchCatData = async () => {
    fetch_CatData(setCategoryData);
  };

  const fetchSubCatData = async () => {
    fetch_SubCatData(setSubCategoryData);
  };

  const handleProductSubmit = async (values) => {
    handle_ProductSubmit(values, fetchProducts);
  };

  useEffect(() => {
    fetchProducts();
    fetchCatData();
    fetchSubCatData();
  }, []);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    let filteredSubCat = subcategoryData.filter(
      (subCategory) => subCategory.perentCategory._id === selectedCategory
    );
    setFilteredSubCategories(filteredSubCat);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "productTitle", headerName: "Title", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "subcategory", headerName: "Sub-Category", flex: 1 },
    {
      field: "productPrice",
      headerName: "Price",
      width: 120,
      valueFormatter: ({ value }) => `₹${(value * 70).toFixed(2)}`,
    },
    { field: "productDes", headerName: "Description", flex: 2 },
  ];

  const rows = productData.map((item) => ({
    id: item._id,
    productTitle: item.productTitle,
    category: item.categoryID && item.categoryID.category,
    subcategory: item.subCategoryID && item.subCategoryID.subcategory,
    productPrice: item.productPrice,
    productDes: item.productDes.slice(0, 114) + "...",
  }));

  return (
    <>
      <ToastContainer />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Box m="20px">
            <Header title="Add Product" subtitle="Add a New Product" />
            <Formik
              onSubmit={handleProductSubmit}
              initialValues={initialValuesProduct}
              validationSchema={productSchema}
            >
              {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
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
                    <FormControl fullWidth>
                      <InputLabel id="Category">Category</InputLabel>
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
                      <InputLabel id="Role">Sub-Category</InputLabel>
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
                          <MenuItem
                            key={subCategory && subCategory._id}
                            value={subCategory && subCategory._id}
                          >
                            {subCategory.subcategory}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                  <Box margin={"10px"}>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        onClick={handleClose}
                      >
                        Add Product
                      </Button>
                    </DialogActions>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </DialogContent>
      </Dialog>
      <Box m="20px">
        <Box display={"flex"} justifyContent={"space-between"}>
          <Header title="Products" subtitle="Product List" />
          <div>
            <Button
              onClick={handleClickOpen}
              style={{
                color: colors.grey[900],
                background: colors.greenAccent[400],
                borderRadius: "4px",
                padding: "7px",
              }}
            >
              Add Products
            </Button>
          </div>
        </Box>
        <Box
          height="40vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              border: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
          />
        </Box>
      </Box>
    </>
  );
};

const initialValuesProduct = {
  productTitle: "",
  productDes: "",
  productPrice: "",
  categoryID: "",
  subCategoryID: "",
  productImageURL: "",
  flag: true,
};

const productSchema = yup.object().shape({
  productTitle: yup.string().required("required"),
  productDes: yup.string().required("required"),
  productPrice: yup.number().required("required"),
  categoryID: yup.string().required("required"),
  subCategoryID: yup.string().required("required"),
  productImageURL: yup.string().required("required"),
  flag: yup.boolean().required("required"),
});

export default ProductList;
