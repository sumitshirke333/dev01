import { createSlice } from '@reduxjs/toolkit';
import { generateOrderId } from '../../utils/helpers';

const initialState = {
  currentOrder: null, // { orderId, items, total, shippingDetails }
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const { items, total, shippingDetails } = action.payload;
      state.currentOrder = {
        orderId: generateOrderId(),
        items,
        total,
        shippingDetails,
        orderDate: new Date().toISOString(),
      };
    },
    clearOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { placeOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;