import React from 'react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import axios from 'axios';

const ProductList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [productData, setProductData] = useState([])

  const fetchProducts = async () => {
    const response = await axios.get('http://192.168.1.8:3003/api/getproduct');
    const filteredData = response.data.filter(item => 
      item.categoryID.isCatActive && item.subCategoryID.isSubCatActive
    );
    setProductData(filteredData);
    console.log(filteredData)
  };

  useEffect(() => {
    fetchProducts();
  },[])
  // console.log(productData)

  return (

    <div style={{ display: 'flex', flexWrap: 'wrap', marginInline: '17px' }}>
      {productData.map(item => (
        <Card key={item.id} style={{ width: 300, margin: 10, backgroundColor: colors.blueAccent[900] }} >
          <CardMedia
            component="img"
            height="200"
            image={item.productImageURL}
            alt={item.productTitle}
          />
          <CardContent>
            <Typography variant="h6" component="div" >
              {item.productTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {item.categoryID && item.categoryID.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sub-Category: {item.subCategoryID && item.subCategoryID.subcategory}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ₹{(item.productPrice * 70).toFixed(2)}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Rating: {item.rating.rate} ({item.rating.count} reviews)
            </Typography> */}
            <Typography variant="body2" color="text.secondary">
              Description: {item.productDes.slice(0, 114)}...
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ProductList
