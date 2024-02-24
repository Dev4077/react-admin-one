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

    addCategory(state, action) {
      const categoryToAdd = action.payload;
      if (categoryToAdd.trim() !== '') {
        return {
          ...state,
          list: [...state.list, categoryToAdd],
          category: '',
          open: false
        };
      }
      return state;
    },
    selectCategory(state, action) { 
        state.selectedCategory = action.payload;
      },
  },
});

export const { setOpen, addCategory, selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
