import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const UserRegistrationComponent = () => {
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
        setUserData(filteredData);
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

  return (
    <Grid container spacing={3}>
      {userData.map(user => (
        <Grid item key={user._id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {user.firstName}
              </Typography>
              <Typography variant="h5" component="h2">
                {user.lastName}
              </Typography>
              <Typography color="textSecondary">
                {user.email}
              </Typography>
              <Typography color="textSecondary">
                {user.contact} 
              </Typography>
              <Typography color="textSecondary">
                {user.address1}, {user.address2}
              </Typography>
            </CardContent>
            <IconButton onClick={() => handleDeleteIconClick(user._id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleEditIconClick(user)}>
              <ModeEditIcon />
            </IconButton>
          </Card>
        </Grid>
      ))}
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
    </Grid>
  );
};

export default UserRegistrationComponent;
