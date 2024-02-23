import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { selectCategory } from '../../redux/slices/category/categorySlice';
import { useNavigate } from 'react-router-dom';

function Product() {
  const { list, selectedCategory } = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const handleCategoryChange = (event) => {
    dispatch(selectCategory(event.target.value));
  };

  let navigate = useNavigate()
  const showDashoard = () =>{
      navigate("/");
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center' , marginTop:'100px'}}>
    <FormControl fullWidth>
      <InputLabel id="category-label">Select Category</InputLabel>
      <Select
        labelId="category-label"
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {list.map((category, index) => (
          <MenuItem key={index} value={category}>{category}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <Button variant="success" onClick={showDashoard}>
          Dashboard
        </Button>
    </div>
  );
}

export default Product;
