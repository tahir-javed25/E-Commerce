import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Auth-Slice/authSlice.js";
import adminProductSlice from "./Admin/productSlice.js";
import shoppingproductSlice from "./Shop/Shop-product-slice.js";
import shoppingCartSlice from "./Shop/Cart-Slice.js";
import shopAddressSlice from "./Shop/Address-Slice.js";
import shoppingOrderSlice from "./Shop/Order-Slice.js";

const store = configureStore({
    reducer: {
        auth : authReducer,

        adminProducts : adminProductSlice,
        
        shoppingProducts : shoppingproductSlice,
        shoppingCart : shoppingCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shoppingOrderSlice,
    },
})

export default store;

