import React, { useState, useEffect } from "react";
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, useTheme } from "@mui/material";
import { Switch } from '@mui/material';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryList = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [subcategoryData, setSubCategoryData] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const fetchCatData = async () => {
        try {
            const response = await axios.get('http://192.168.1.8:3003/api/getcategory');
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

    const fetchSubCatData = async () => {
        try {
            const response = await axios.get('http://192.168.1.8:3003/api/getsubcategory');
            const filteredData = response.data.filter(item => item.flag === true);
            const formattedData = filteredData.map((subcat, index) => ({
              ...subcat,
              id: index + 1, 
            }));  
            //   console.log(formattedData)
            setSubCategoryData(formattedData);
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };

    useEffect(() => {
        fetchCatData();
        fetchSubCatData();
    }, []);

    const handleDeleteCategory = async (id) => {
        try {
            const response = await axios.delete(`http://192.168.1.8:3003/api/categorydelete/${id}`);
            fetchCatData();
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Error deleting category');
        }
    };

    const handleDeleteSubCategory = async (id) => {
        try {
            const response = await axios.delete(`http://192.168.1.8:3003/api/subcategorydelete/${id}`);
            setSubCategoryData(); 
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error deleting subcategory:', error);
            toast.error('Error deleting subcategory');
        }
    };
 
    const handleSwitchChange = async (id, newValue) => {
        try {
            await axios.post(`http://192.168.1.8:3003/api/activecategory/${id}`, {
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

    const handleSubSwitchChange = async (id, newSubValue) => {
        try {
            
            await axios.post(`http://192.168.1.8:3003/api/activesubcategory/${id}`, {
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
   
    const handleSubCategoryClick = (id) => {
        
        const selectedCategory = id;
        const filteredSubCat = subcategoryData.filter(subCategory => subCategory.perentCategory._id === selectedCategory);
        setSelectedSubCategory(filteredSubCat);
        fetchSubCatData();
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
            field: 'deleteCatButton',
            headerName: 'Delete',
            flex: 1,
            renderCell: (params) => {
                return (
                    <button  onClick={() => handleDeleteCategory(params.row._id)}>Delete</button>
                );
            }
        },
    ];

    const columnsSubCat = [
        { field: '_id', headerName: 'ID', flex: 1 },
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
            field: 'deleteSubCatButton',
            headerName: 'Delete',
            flex: 1,
            renderCell: (params) => {
                return (
                    <button onClick={() => handleDeleteSubCategory(params.row._id)}>Delete</button>
                );
            }
        },
    ];

    const getRowId = (row) => row._id;

    return (
        <>
            <Box m="20px">
                <Header title="Category" subtitle="Managing the Category and Sub-Category" />
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
                    <DataGrid
                        rows={categoryData}
                        getRowId={getRowId}
                        columns={columnsCat}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                    />
                </Box>
                {( selectedSubCategory &&
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
                                />
                            </div>
                        </Box>
                    </Box>
               )}
            </Box>
        </>
    );
};

export default CategoryList;
