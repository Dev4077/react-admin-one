import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    open: false,
    category: '',
    list: [],
  },
  reducers: {
    setOpen(state, action) {
      state.open = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    addCategory(state) {
      if (state.category.trim() !== '') {
        state.list.push(state.category);
        state.category = '';
        state.open = false;
      }
    },
    selectCategory(state, action) { 
        state.selectedCategory = action.payload;
      },
  },
});

export const { setOpen, setCategory, addCategory, selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
