import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:3000/shop/order/create",
      orderData
    );

    console.log(response.data);
    
    return response.data;
  }
);
export const confirmOrder = createAsyncThunk(
  "/order/confirmOrder",
  async ({orderId,userId}) => {
    const response = await axios.put(
      `http://localhost:3000/shop/order/confirm/${orderId}/${userId}`);

    console.log(response.data);
    
    return response.data;
  }
);



const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId; 
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
      })


    }})


export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
