import React, { useState, useEffect } from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, MenuItem, Select, useTheme, Box, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchData, handle_UpdateUser, handle_Delete, handle_FormSubmit } from '../../service/apiFun';

const UserRegistrationComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [userData, setUserData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      fetchData(setUserData);
    }, 17); 
  };

  useEffect(() => {
    fetchData(setUserData);
  }, []);

  const handleFormSubmit = async (values, { resetForm }) => {
    handle_FormSubmit(values, resetForm);
    
  };

  const handleDelete = async (userId) => {
    handle_Delete(userId, setUserData);

  };

  const handleUpdateUser = async () => {
    handle_UpdateUser(editedUser, setUserData);
    
  };

  const handleDeleteIconClick = (userId) => {
    setSelectedUserId(userId);
    setOpenDelete(true);
  };

  const handleEditIconClick = (user) => {
    setEditedUser(user);
    setOpenEdit(true);
  };

  const handleCloseDialog = () => {
    setOpenDelete(false);
    setOpenEdit(false);
    setSelectedUserId(null);
    setEditedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'contact', headerName: 'Contact', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'address1', headerName: 'Address Line 1', flex: 1 },
    { field: 'address2', headerName: 'Address Line 2', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleDeleteIconClick(params.row._id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleEditIconClick(params.row)}>
            <ModeEditIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <Dialog open={open} onClose={handleClose}>

        <DialogContent>

          <Header title="CREATE USER" subtitle="Create a New User Profile" />

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
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
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={!!touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Contact Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contact}
                    name="contact"
                    error={!!touched.contact && !!errors.contact}
                    helperText={touched.contact && errors.contact}
                    sx={{ gridColumn: "span 4" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address 1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address1}
                    name="address1"
                    error={!!touched.address1 && !!errors.address1}
                    helperText={touched.address1 && errors.address1}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address 2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address2}
                    name="address2"
                    error={!!touched.address2 && !!errors.address2}
                    helperText={touched.address2 && errors.address2}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="Role">Role</InputLabel>
                    <Select
                      placeholder="Role"
                      variant="filled"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="role"
                      label="Role"
                      error={!!touched.role && !!errors.role}
                      helperText={touched.role && errors.role}
                      sx={{ gridColumn: "span 4" }}
                    >
                      <MenuItem value="Staff">Staff</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="User">User</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained" onClick={handleClose}>
                    Create New User
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Box margin={4}>
        <Box m='40px 0 0 0' height='75vh' sx={{
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
          <Box display={"flex"} justifyContent={"space-between"}>
            <Header title="USER" subtitle=" User Profile" />
            <div>
              <Button onClick={handleClickOpen} style={{ color: colors.grey[900], background: colors.greenAccent[400], borderRadius: "4px", padding: "7px" }} >
                Add User
              </Button>
            </div>
          </Box>
          <DataGrid
            rows={userData}
            columns={columns}
            pageSize={10}
            autoHeight
          />
          <Dialog open={openDelete} onClose={handleCloseDialog}>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
              <Typography variant="body1">Are you sure you want to delete this user?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={() => handleDelete(selectedUserId)} color="error">Delete</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openEdit} onClose={handleCloseDialog}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="First Name"
                name="firstName"
                fullWidth
                value={editedUser?.firstName}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                label="Last Name"
                name="lastName"
                fullWidth
                value={editedUser?.lastName}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                label="Email"
                name="email"
                fullWidth
                value={editedUser?.email}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                label="Contact"
                name="contact"
                fullWidth
                value={editedUser?.contact}
                onChange={handleInputChange}
              />
              <Select
                margin='dense'
                name="role"
                label="Role"
                fullWidth
                value={editedUser?.role}
                onChange={handleInputChange}
              >
                <MenuItem value="Staff">Staff</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
              <TextField
                margin="dense"
                label="Address Line 1"
                name="address1"
                fullWidth
                value={editedUser?.address1}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                label="Address Line 2"
                name="address2"
                fullWidth
                value={editedUser?.address2}
                onChange={handleInputChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleUpdateUser} color="primary">Update</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  role: yup.string().required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  role: "",
  address1: "",
  address2: "",
  flag: true,
};

export default UserRegistrationComponent;
