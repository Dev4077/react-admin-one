import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, addCategory } from '../../redux/slices/category/categorySlice'



const Dashboard = () => {
  const { open, list } = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('')

  const handleClickOpen = () => {
    dispatch(setOpen(true));
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const handleAddCategory = () => {
    dispatch(addCategory(category));
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
   
    </>
  )
}

export default Dashboard
