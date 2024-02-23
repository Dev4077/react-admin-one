import { configureStore } from '@reduxjs/toolkit'
import tabSlice from '../slices/tab/tabSlice'

export const store = configureStore({
  reducer: {
    tab: tabSlice,
  },
})