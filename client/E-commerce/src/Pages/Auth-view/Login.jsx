import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CommonForm from '../../components/common/form'
import { loginFormControl, } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '@/store/Auth-Slice/authSlice'
import { toast } from '@/hooks/use-toast'
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    email:'',
    password:'',
  }
  const [formData , setFormData] = useState(initialState);
  const {isAuth, user, isLoading} = useSelector((state)=>state.auth);

  useEffect(() => {
  if (isAuth) {
    navigate("/shop/home");
  }
}, [isAuth]);



  const onSubmit =(event)=>{
    event.preventDefault();

    dispatch(loginUser(formData)).then((data)=>{
      // console.log("Login Response:", data);
      if(data?.payload?.success){
        console.log("Going to /shop/home");
        toast({
           title:data?.payload?.message,
        })
      }else{
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        })
      }
    })


  }
  return (
     <div className="mx-auto w-full max-w-md space-y-6 border-2">
      <div className="text-center bg-blur ">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
      </div>
      <CommonForm
        formControldata={loginFormControl}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className='text-center' >
        <p className="mt-2">
          Don't have any account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/signup"
          >
            Sign up
          </Link></p>
      </div>

    </div>
  )
}

export default Login
