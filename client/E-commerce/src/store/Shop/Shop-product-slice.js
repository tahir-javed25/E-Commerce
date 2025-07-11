import ProductList from "@/Pages/Shopping-view/ProductList";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    productsList: [],
    productDetails: null
}

export  const getAllFilteredProduct= createAsyncThunk(
    "/products/get",
   async ({ filterParams, sortParams })=>{

    const query = new URLSearchParams({
        ...filterParams,
        sort: sortParams,
      });
        const response = await axios.get(`http://localhost:3000/shop/products/get?${query}`);

            return response.data    
    }

)

export const getProductDetails = createAsyncThunk(
    "/products/getDetails",
   async (productId)=>{
        const response = await axios.get(`http://localhost:3000/shop/products/get/${productId}`);

            return response.data    
    }

)

const ShoppingProductSlice = createSlice({
    name : "shoppingProducts",
    initialState,
    reducers:{},
    extraReducers:(builder)  =>{
        builder.addCase(getAllFilteredProduct.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllFilteredProduct.fulfilled, (state,action)=>{
            // console.log(action.payload)
            state.isLoading = false;
            state.productsList = action?.payload?.data
            // state.product = action?.payload?.
        })
        .addCase(getAllFilteredProduct.rejected, (state,action)=>{
            state.isLoading = false;
            state.productsList= [];
        })
        .addCase(getProductDetails.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getProductDetails.fulfilled, (state,action)=>{
            // console.log(action.payload)
            state.isLoading = false;
            state.productDetails = action?.payload?.data
            // state.product = action?.payload?.
        })
        .addCase(getProductDetails.rejected, (state,action)=>{
            state.isLoading = false;
            state.productDetails= null;
        })

    }
})

export default  ShoppingProductSlice.reducer