import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const loadInitialState = () => {
  const storedAuth = localStorage.getItem('authState');
  return storedAuth ? JSON.parse(storedAuth) : {
    isAuth: false,
    isLoading: false,
    user: null
  };
};

const initialState = loadInitialState();

export const signupUser = createAsyncThunk( "/auth/singup",
    async (formData)=>{
        const response = await axios.post("http://localhost:3000/auth/signup", 
            formData, 
            {withCredentials: true}
        )
        return response.data
    }
)
export const loginUser = createAsyncThunk( "/auth/login",
    async (formData)=>{
        const response = await axios.post("http://localhost:3000/auth/login", 
            formData, 
            {withCredentials: true}
        )
        // console.log("Login Response in Thunk:", response.data);
        
        return response.data;
    }
)
export const logoutUser = createAsyncThunk( "/auth/logout",
    async ()=>{
        const response = await axios.post("http://localhost:3000/auth/logout", 
            {},  {withCredentials: true}
        )
        return response.data;
    }
)
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  try {
    const response = await axios.get("http://localhost:3000/auth/check-auth", {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
    return response.data;
  } catch (error) {
    // Don't throw error - maintain current state if check fails
    return { success: false, user: null };
  }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser : (state, action)=>{}
    },
    extraReducers:(builder)=>{
        builder
        .addCase(signupUser.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(signupUser.fulfilled, (state)=>{
            state.isLoading= false;
            state.user = null
            state.isAuth = false
        })
        .addCase(signupUser.rejected, (state)=>{
            state.isLoading= false;
            state.user = null;
            state.isAuth = false;
        })
        .addCase(loginUser.pending, (state)=>{
            state.isLoading= true;
           
        })
        .addCase(loginUser.fulfilled, (state,action)=>{
            // console.log( "Action.payLoad's data is", action.payload.user);
            // console.log( "Action.payLoad's Success", action.payload.success);
            
            state.isLoading= false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuth = action.payload.success;
             localStorage.setItem('authState', JSON.stringify(state));
        })
        .addCase(loginUser.rejected, (state)=>{
            state.isLoading= false;
            state.user = null;
            state.isAuth = false;
        })
        .addCase(checkAuth.pending, (state,action)=>{
            state.isLoading = true;
        } )
        .addCase (checkAuth.fulfilled, (state,action)=>{
            // console.log("CheckAuth data is", action.payload.user);
            
             state.isLoading= false;
             state.user = action.payload.success ? action.payload.user : null;
             state.isAuth = action.payload.success;
        })
        .addCase(checkAuth.rejected, (state, action)=>{
             state.isLoading= false;
            state.user = null;
            state.isAuth = false;
        })
        .addCase(logoutUser.fulfilled,(state,action)=>{
            state.user= null
            state.isAuth = false;
            localStorage.removeItem('authState');
        })
        .addCase('auth/rehydrate', (state, action) => {
         return { ...state, ...action.payload };
        })

        }

    

})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;