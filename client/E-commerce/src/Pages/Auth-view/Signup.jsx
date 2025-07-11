import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CommonForm from '../../components/common/form'
import { registerFormControl } from '@/config'
import { useDispatch } from 'react-redux'
import { signupUser } from '@/store/Auth-Slice/authSlice'

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    userName: '',
    email:'',
    password:'',
  }
  const [formData , setFormData] = useState(initialState);


  const onSubmit =async(event)=>{
     event.preventDefault();

    dispatch(signupUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast({
          title:data?.payload?.message,
        })
        navigate("/auth/login");
      }else{
        toast({
           title: data?.payload?.message,
          variant: "destructive",
        })
      }
   })


   
  }
  return (
     <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
      </div>
      <CommonForm
        formControldata={registerFormControl}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className='text-center' >
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link></p>
      </div>

    </div>
  )
}

export default Signup
