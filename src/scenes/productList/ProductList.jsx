import React from 'react'
import  axios  from 'axios'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { tokens } from "../../theme";

  const ProductList = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    
      const [myData, setMyData] = useState([]);
      useEffect(() =>{
        try {
          axios.get("https://fakestoreapi.com/products")
          .then((res)=> {
            setMyData(res.data);
            console.log(res.data); 
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },[]);
    
  return (
    <>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginInline:'17px' }}>
      {myData.map(item => (
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
              Price: ${item.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rating: {item.rating.rate} ({item.rating.count} reviews)
            </Typography>
            <Typography variant="body2" color="text.secondary">
             Description: {item.description.slice(0, 74)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
      
    </>
  )
}

export default ProductList
