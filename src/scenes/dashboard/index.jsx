import React from 'react'
import Header from '../../components/Header'
import { Box } from '@mui/material'
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, setCategory, addCategory } from '../../redux/slices/category/categorySlice'



const Dashboard = () => {
  const { open, category, list } = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(setOpen(true));
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const handleAddCategory = () => {
    dispatch(addCategory());
  };

  const handleChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  return (
    <>
      <Box m='20px'>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}></Box>
        <Header title='Dashboard' subtitle="Welcome to the Dasboard" />


        <Button variant="success" onClick={handleClickOpen}>
          Add Category
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Add Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="category"
              label="category"
              type="text"
              fullWidth
              variant="standard"
              value={category}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleAddCategory}>ADD</Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {list.map((cat, index) => (
              <TableRow key={index}>
                <TableCell>{cat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </>
  )
}

export default Dashboard
