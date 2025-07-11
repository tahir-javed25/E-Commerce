import ProductList from "@/Pages/Shopping-view/ProductList";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    productsList: []
}
export  const addNewProduct = createAsyncThunk(
    "/products/add",
   async (formData)=>{
        const response = await axios.post("http://localhost:3000/admin/products/add",formData,
            {withCredentials:true});

            return response.data    
    }

)
export  const editProduct = createAsyncThunk(
    "/products/edit",
   async ({id,formData})=>{
        const response = await axios.put(`http://localhost:3000/admin/products/edit/${id}`,formData,
            {withCredentials:true});

            return response.data    
    }

)
export  const fetchAllProduct = createAsyncThunk(
    "/products/get",
   async ()=>{
        const response = await axios.get("http://localhost:3000/admin/products/get");

            return response.data    
    }

)
export  const deleteProduct = createAsyncThunk(
    "/products/delete",
   async (id)=>{
        const response = await axios.delete(`http://localhost:3000/admin/products/delete/${id}`,
            {withCredentials:true});

            return response.data    
    }

)


const AdminProductSlice = createSlice({
    name : "adminProducts",
    initialState,
    reducers:{},
    extraReducers:(builder)  =>{
        builder.addCase(fetchAllProduct.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchAllProduct.fulfilled, (state,action)=>{
            // console.log(action.payload)
            state.isLoading = false;
            state.productsList = action?.payload?.data
            // state.product = action?.payload?.
        })
        .addCase(fetchAllProduct.rejected, (state,action)=>{
            state.isLoading = false;
            state.productsList= [];
        })

    }
})

export default  AdminProductSlice.reducer