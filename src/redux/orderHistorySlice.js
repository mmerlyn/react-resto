import { createSlice } from '@reduxjs/toolkit';

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      const order = {
        id: Date.now(),
        items: action.payload.items,
        total: action.payload.total,
        date: new Date().toISOString(),
      };
      state.orders.unshift(order);
    },
    clearOrderHistory: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrderHistory } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
