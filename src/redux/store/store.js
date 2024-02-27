import { configureStore } from '@reduxjs/toolkit'
import tabSlice from '../slices/tab/tabSlice'
import categorySlice from '../slices/category/categorySlice'
import apiSlice from '../slices/api/apiSlice'


export const store = configureStore({
  reducer: {
    tab: tabSlice,
    categories: categorySlice,
    products: apiSlice,
  },
})