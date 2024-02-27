import React from 'react'
import { useEffect } from 'react'
import { Card, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slices/api/apiSlice';

  const ProductList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.data);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchProducts());
      }
    }, [status, dispatch]);
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }

    
  
  return (
    <>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginInline:'17px' }}>
      {products.map(item => (
        <Card key={item.id} style={{ width: 300, margin: 10 , backgroundColor: colors.blueAccent[900]}} >
          <CardMedia
            component="img"
            height="200"
            image={item.image}
            alt={item.title}
          />
          <CardContent>
            <Typography variant="h6" component="div" >
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {item.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ₹{(item.price * 70).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rating: {item.rating.rate} ({item.rating.count} reviews)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: {item.description.slice(0, 114)}...
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
      
    </>
  )
}

export default ProductList
