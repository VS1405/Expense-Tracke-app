import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    bearerToken: '',
    userId: '',
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.bearerToken = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.bearerToken = '';
      state.userId = '';
    },
  },
});

export const loginAction = authSlice.actions;
export default authSlice.reducer;
