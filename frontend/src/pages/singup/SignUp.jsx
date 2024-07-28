import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [user, setUser] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user.userName || user.userName.length < 4 || user.userName.length > 15){
      toast.error("Username must be at least 4 characters long and less than 15 characters");
      return;
    }
    if(!user.email || !user.password){
      toast.error("All fields are required");
      return;
    }
    if(user.password !== user.confirmPassword){
      toast.error("Password does not match");
      return;
    }
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const data = await res.json();
      
      if(data.success === true){
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className='h-screen flex flex-col gap-2 justify-center items-center mx-auto w-[85%] md:w-[25%]'>
          <h1 className=' font-bold text-3xl mb-5'>Sign Up</h1>
          <div className='flex flex-col gap-3 rounded-md w-full'>
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='userName' type="email" placeholder='Enter Username' />
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='fullName' type="email" placeholder='Enter Full Name' />
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='email' type="email" placeholder='Enter Email' />
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='password' type="password" placeholder='Enter Password' />
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='confirmPassword' type="password" placeholder='Confirm Password' />
            <div>
              <button onClick={handleSubmit} className='p-2 rounded-md bg-gray-700 text-white w-full hover:opacity-85 disabled:opacity-50'>Sign Up</button>
              <Link to="/signin">Already have an account?</Link>
            </div>
          </div>
    </div>
  )
}

export default SignUp