import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, IconButton, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, DialogActions, Button, TextField, Typography, MenuItem, Select, useTheme, Box } from '@mui/material';
import { Switch } from '@mui/material';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { fetch_CatData, fetch_SubCatData, handle_DeleteCat, handle_DeleteSubCat, handle_UpdateSubCat, handle_UpdateCat, handle_CategorySubmit, handle_subCategorySubmit, handle_SubSwitchChange, handle_SwitchChange } from "../../service/apiFun";

const CategoryList = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [subcategoryData, setSubCategoryData] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSubDelete, setOpenSubDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openSubEdit, setOpenSubEdit] = useState(false);
    const [openSubBox, setOpenSubBox] = useState(false);
    const [openCatBox, setOpenCatBox] = useState(false);
    const [selectedCatId, setSelectedCatId] = useState(null);
    const [selectedSubCatId, setSelectedSubCatId] = useState(null);
    const [editedCat, setEditedCat] = useState(null);
    const [editedSubCat, setEditedSubCat] = useState(null);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        fetch_CatData(setCategoryData);
        fetch_SubCatData(setSubCategoryData);
    }, []);

    //button for add cat and sub-cat

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleCategorySubmit = async (values, { resetForm }) => {
        handle_CategorySubmit(values, resetForm, fetch_CatData);
    };

    const handlesubCategorySubmit = async (values, { resetForm }) => {
        handle_subCategorySubmit(values, resetForm, fetch_SubCatData);
    };

    const handleOpenSub = () => {
        setOpenSubBox(true);
    };
    const handleOpenCat = () => {
        setOpenCatBox(true);
    };
    const handleCloseSub = () => {
        setOpenSubBox(false);
    };
    const handleCloseCat = () => {
        setOpenCatBox(false);
    };

    const handleDeleteCat = async (id) => {
        handle_DeleteCat(id, setCategoryData, setOpenDelete)
    };

    const handleCatDeleteIconClick = (id) => {
        setSelectedCatId(id);
        setOpenDelete(true);
    };
    const handleSubCatDeleteIconClick = (id) => {
        setSelectedSubCatId(id);
        setOpenSubDelete(true);
    };

    const handleCatEditIconClick = (category) => {
        setEditedCat(category);
        setOpenEdit(true);
    };
    const handleSubCatEditIconClick = (category) => {
        setEditedSubCat(category);
        setOpenSubEdit(true);
    };

    const handleCloseDialog = () => {
        setOpenDelete(false);
        setOpenSubDelete(false);
        setOpenEdit(false);
        setOpenSubBox(false);
        setOpenCatBox(false);
        setOpenSubEdit(false);
        setSelectedCatId(null);
        setEditedCat(null);
        setSelectedSubCatId(null);
        setEditedSubCat(null);
    };
    const handleUpdateCat = async () => {
        handle_UpdateCat(editedCat, setCategoryData, setOpenEdit, categoryData);
    };
    const handleUpdateSubCat = async () => {
        handle_UpdateSubCat(editedSubCat, setSubCategoryData, setOpenSubEdit, subcategoryData);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCat(prevState => ({
            ...prevState,
            [name]: value
        }));
        setEditedSubCat(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDeleteSubCat = async (id) => {
        handle_DeleteSubCat(id, setSubCategoryData, setOpenSubDelete);
    };

    const handleSwitchChange = async (id, newValue) => {
        handle_SwitchChange(id, newValue, setCategoryData);
    };

    const handleSubSwitchChange = async (id, newSubValue) => {
        handle_SubSwitchChange(id, newSubValue, setSelectedSubCategory);
    };

    const handleSubCategoryClick = (id) => {

        const selectedCategory = id;
        const filteredSubCat = subcategoryData.filter(subCategory => subCategory.perentCategory._id === selectedCategory);
        setSelectedSubCategory(filteredSubCat);
        fetch_SubCatData();
        // console.log(selectedSubCategory);
    };

    const columnsCat = [
        { field: '_id', headerName: 'ID', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1 },
        {
            field: 'isCatActive',
            headerName: 'Active',
            flex: 1,
            renderCell: (params) => {
                const handleChange = (event) => {
                    handleSwitchChange(params.row._id, event.target.checked);
                };
                return (

                    <Switch
                        checked={params.value}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="primary"
                        style={{ color: params.value ? colors.greenAccent[300] : colors.grey[300] }}
                    />
                );
            }
        },
        {
            field: 'subCategoryButton',
            headerName: 'Sub-category',
            flex: 1,
            renderCell: (params) => {
                // console.log(params)
                return (
                    <button style={{ color: colors.grey[900], background: colors.greenAccent[400], borderRadius: "4px", padding: "7px" }} onClick={() => handleSubCategoryClick(params.row._id)}>View Sub-category</button>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => handleCatDeleteIconClick(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCatEditIconClick(params.row)}>
                        <ModeEditIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    const columnsSubCat = [
        { field: '_id', headerName: 'ID', Header },
        { field: 'subcategory', headerName: 'Sub-category', flex: 1 },
        {
            field: 'isSubCatActive',
            headerName: 'Active',
            flex: 1,
            renderCell: (params) => {
                const handleSubChange = (event) => {
                    handleSubSwitchChange(params.row._id, event.target.checked);
                    console.log(selectedSubCategory)


                };
                return (
                    <Switch
                        checked={params.value}
                        onChange={handleSubChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="primary"
                        style={{ color: params.value ? colors.greenAccent[300] : colors.grey[300] }}
                    />
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => handleSubCatDeleteIconClick(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleSubCatEditIconClick(params.row)}>
                        <ModeEditIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    const getRowId = (row) => row._id;

    return (
        <>

            <Dialog open={openCatBox} onClose={handleCloseDialog}>
                <DialogTitle>ADD Category</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValuesCat}
                        validationSchema={catSchema}
                        onSubmit={handleCategorySubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Category"
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!errors.category && touched.category}
                                        helperText={touched.category && errors.category}
                                    />
                                </Box>
                                <DialogActions>
                                    <Button onClick={handleCloseCat} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" variant="contained" onClick={handleCloseCat}>
                                        Create New Category
                                    </Button>
                                </DialogActions>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
            {/* for add sub category  */}

            <Dialog open={openSubBox} onClose={handleCloseDialog}>
                <DialogTitle>ADD Sub-Category</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValuesSubCat}
                        validationSchema={subcatSchema}
                        onSubmit={handlesubCategorySubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box>
                                    <FormControl fullWidth>
                                        <InputLabel id="Category">Select Category</InputLabel>
                                        <Select
                                            labelId="Category"
                                            id="perentCategory"
                                            value={values.perentCategory}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="perentCategory"
                                            error={!!errors.perentCategory && touched.perentCategory}
                                        >
                                            {categoryData.map((category) => (
                                                <MenuItem key={category._id} value={category._id}>
                                                    {category.category}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box mt={2}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Sub-Category"
                                        name="subcategory"
                                        value={values.subcategory}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!errors.subcategory && touched.subcategory}
                                        helperText={touched.subcategory && errors.subcategory}
                                    />
                                </Box>
                                <DialogActions>
                                    <Button onClick={handleCloseSub} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" variant="contained" onClick={handleCloseSub}>
                                        Create New Sub-Category
                                    </Button>
                                </DialogActions>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>

            <Box m="20px"> <ToastContainer />
                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                    <Header title="Category" subtitle="Managing the Category" />
                    <div>
                        <Button onClick={handleOpenCat} style={{ color: colors.grey[900], background: colors.greenAccent[400], borderRadius: "4px", padding: "7px" }}>
                            Add Categoory
                        </Button> <Button onClick={handleOpenSub} style={{ color: colors.grey[900], background: colors.greenAccent[400], borderRadius: "4px", padding: "7px" }}>
                            Add Sub-Category
                        </Button></div>
                </Box>
                <Box height='40vh' sx={{
                    "& .MuiDataGrid-root": {
                        border: 'none'
                    },
                    "& .MuiDataGrid-cell": {
                        border: 'none'
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300]
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none'
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700]
                    }
                }}>
                    <DataGrid
                        rows={categoryData}
                        getRowId={getRowId}
                        columns={columnsCat}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        autoHeight
                    />
                    <Dialog open={openDelete} onClose={handleCloseDialog}>
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1">Are you sure you want to delete this category?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button onClick={() => handleDeleteCat(selectedCatId)} color="error">Delete</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={openEdit} onClose={handleCloseDialog}>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                label="Category"
                                name="category"
                                fullWidth
                                value={editedCat?.category}
                                onChange={handleInputChange}

                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button onClick={handleUpdateCat} color="primary">Update</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                {(selectedSubCategory &&
                    <Box mt={2} className="sub-category-table">
                        <Box m='40px 0 0 0' height='40vh' sx={{
                            "& .MuiDataGrid-root": {
                                border: 'none'
                            },
                            "& .MuiDataGrid-cell": {
                                border: 'none'
                            },
                            "& .name-column--cell": {
                                color: colors.greenAccent[300]
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: colors.blueAccent[700],
                                borderBottom: 'none'
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: colors.primary[400]
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: 'none',
                                backgroundColor: colors.blueAccent[700]
                            }
                        }}>
                            <Header title="Sub-Category" subtitle="Managing the Sub-Category" />
                            <div style={{ height: 270, width: '100%' }}>
                                <DataGrid
                                    rows={selectedSubCategory}
                                    getRowId={getRowId}
                                    columns={columnsSubCat}
                                    pageSize={3}
                                    rowsPerPageOptions={[3, 6, 20]}
                                    autoHeight
                                />
                                <Dialog open={openSubDelete} onClose={handleCloseDialog}>
                                    <DialogTitle>Delete Sub-Category</DialogTitle>
                                    <DialogContent>
                                        <Typography variant="body1">Are you sure you want to delete this sub-category?</Typography>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog}>Cancel</Button>
                                        <Button onClick={() => handleDeleteSubCat(selectedSubCatId)} color="error">Delete</Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog open={openSubEdit} onClose={handleCloseDialog}>
                                    <DialogTitle>Edit Sub-Category</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            margin="dense"
                                            label="Sub-Category"
                                            name="subcategory"
                                            fullWidth
                                            value={editedSubCat?.subcategory}
                                            onChange={handleInputChange}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog}>Cancel</Button>
                                        <Button onClick={handleUpdateSubCat} color="primary">Update</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default CategoryList;

const initialValuesCat = {
    category: "",
    isCatActive: true,
    flag: true

};

const initialValuesSubCat = {
    perentCategory: "",
    subcategory: "",
    isSubCatActive: true,
    flag: true

};

const subcatSchema = yup.object().shape({
    perentCategory: yup.string().required("required"),
    subcategory: yup.string().required("required"),
    flag: yup.boolean().required("required"),
});

const catSchema = yup.object().shape({
    category: yup.string().required("required"),
    flag: yup.boolean().required("required"),
});