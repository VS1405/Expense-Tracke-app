import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer  from './expensesSlice';
import themReducer from './themeSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    theme: themReducer
  },
});

export default store;
