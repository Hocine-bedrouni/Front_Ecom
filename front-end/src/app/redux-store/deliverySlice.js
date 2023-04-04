import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryMode: null,
};

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
      setDeliveryMode: (state, action) => {
          state.deliveryMode = action.payload
      }
  },
});

export const { setDeliveryMode } = deliverySlice.actions;

export default deliverySlice.reducer;