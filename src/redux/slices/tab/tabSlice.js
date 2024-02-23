import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeComponent: 'Dashboard',
}



export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveComponent(state, action) {
        state.activeComponent = action.payload;
      },
  },
})


export const { setActiveComponent} = tabSlice.actions

export default tabSlice.reducer