import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider, useDispatch, useSelector } from "react-redux"
// import store from "./store/store.js"
import CheckAuth from "./components/common/check-auth.jsx"

import AuthLayout from "./Pages/Auth-view/AuthLayout.jsx"
import Login from "./Pages/Auth-view/Login.jsx"
import Signup from "./Pages/Auth-view/Signup.jsx"
import AppLayout from "./Pages/Shopping-view/AppLayout.jsx"
import ProductList from "./Pages/Shopping-view/ProductList.jsx"
import Home from "./Pages/Shopping-view/Home.jsx"

import AdminLayout from "./Pages/Admin-view/AdminLayout.jsx"
import Dashboard from "./Pages/Admin-view/Dashboard.jsx"
import Orders from "./Pages/Admin-view/Orders.jsx"
import CheckOut from "./Pages/Shopping-view/CheckOut.jsx"
import Account from "./Pages/Shopping-view/Account.jsx"
import NotFound from "./Pages/NotFound.jsx"
import UnAuthPage from "./Pages/UnAuthPage.jsx"
import { Toaster } from "./components/ui/toaster.jsx"
import { useEffect } from "react"
import { checkAuth } from "./store/Auth-Slice/authSlice.js"
import Products from "./Pages/Admin-view/Products.jsx"
function App() {
  const {isAuth, user, isLoading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  // const user = {
  //   userName: "Tahir Javed",
  //   role:"admin",
  // };
  // const isAuth= true;

  // const isLoading =false;

  useEffect(() => {
    // First load from localStorage if available
    const storedAuth = localStorage.getItem('authState');
    if (storedAuth) {
      dispatch({ type: 'auth/rehydrate', payload: JSON.parse(storedAuth) });
    }
    
    // Then verify with server
    dispatch(checkAuth());
  }, [dispatch]);
  // console.log(user,isLoading,isAuth);
  

  const Router = createBrowserRouter([

    {path:"/auth", element: <CheckAuth isAuth= {isAuth} user={user} isLoading={isLoading} ><AuthLayout/></CheckAuth>  ,      
    //isAuth is the first parameter, user is second and then <AuthLayout/> is the children
      children:[{path:"login", element:<Login/>}, {path:"signup", element: <Signup/>},]},

    {path:"/admin", element: <CheckAuth isAuth= {isAuth} user={user} isLoading={isLoading} ><AdminLayout/></CheckAuth>  , 
      children:[{path:"dashboard", element:<Dashboard/>}, {path:"orders", element:<Orders/>}, {path:"products", element:<Products/>} ]},

    {path:"/shop", element:  <CheckAuth  isAuth= {isAuth} user={user} isLoading={isLoading} ><AppLayout/> </CheckAuth> ,
      children:[{path:"home", element:<Home/>},
        {path:"listing", element:<ProductList/>},
        {path:"checkout",element:<CheckOut/>}, 
        {path:"account", element:<Account/>}]},

      {path:"*", element: <NotFound/> },  

      {path:"/unauth-page", element:<UnAuthPage/>}

])

  return(
    <>
    <RouterProvider router={Router}/>
    <Toaster/>
    </>
  )

 
}

export default App
