import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  showPremiumButton: false,
}
const expensesSlice = createSlice({
  name: 'expenses',
  initialState: initialState,
  reducers: {
    addExpense: (state, action) => {
      const newExpense = action.payload;
      state.expenses.push(newExpense);
       const totalAmount = state.expenses.reduce((sum, expense) => sum + expense.money, 0);
      state.showPremiumButton = totalAmount > 10000;
    },
    deleteExpense: (state, action) => {
      const expenseId = action.payload;
      state.expenses = state.expenses.filter((expense) => expense.id !== expenseId);
       const totalAmount = state.expenses.reduce((sum, expense) => sum + expense.money, 0);
      state.showPremiumButton = totalAmount > 10000;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const expenseAction = expensesSlice.actions;
export default expensesSlice.reducer;
