import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, MenuItem, Select, useTheme, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { tokens } from "../../theme";

const UserRegistrationComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/userDetails');
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
  
    fetchData();
  }, []);
  

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3003/api/userDetails/${userId}`, { flag: false });
      setUserData(userData.filter(user => user._id !== userId));
      setOpenDelete(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:3003/api/userDetails/${editedUser._id}`, editedUser);
      setUserData(userData.map(user => (user._id === editedUser._id ? editedUser : user)));
      setOpenEdit(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
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
    <Box margin={4}>
    <Box m='40px 0 0 0' height='75vh' sx={{
      "& .MuiDataGrid-root": {
          border: 'none'
      },
      "& .MuiDataGrid-cell": {
          border: 'none'
      },
      "& .name-column--cell":{
          color: colors.greenAccent[300]
      },
      "& .MuiDataGrid-columnHeaders":{
          backgroundColor: colors.blueAccent[700],
          borderBottom: 'none'
      },
      "& .MuiDataGrid-virtualScroller":{
          backgroundColor: colors.primary[400]
      },
      "& .MuiDataGrid-footerContainer":{
          borderTop: 'none',
          backgroundColor: colors.blueAccent[700]
      }
    }}>

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
  );
};

export default UserRegistrationComponent;
