import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'light-theme',
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const themeReducer = themeSlice.actions;
export default themeSlice.reducer;
