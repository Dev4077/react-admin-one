import { configureStore } from '@reduxjs/toolkit'
import tabSlice from '../slices/tab/tabSlice'
import categorySlice from '../slices/category/categorySlice'



export const store = configureStore({
  reducer: {
    tab: tabSlice,
    categories: categorySlice,
    
  },
})