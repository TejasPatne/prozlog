import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
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
    if(!user.email || !user.password){
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await fetch("/api/v1/auth/login", {
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
          <h1 className=' font-bold text-3xl mb-5'>Sign In</h1>
          <div className='flex flex-col gap-3 rounded-md w-full'>
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='email' type="email" placeholder='Enter Email' />
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='password' type="password" placeholder='Enter Password' />
            <div>
              <button onClick={handleSubmit} className='p-2 rounded-md bg-gray-700 text-white w-full hover:opacity-85 disabled:opacity-50'>Sign In</button>
              <Link to="/signup">Don&rsquo;t have an account?</Link>
            </div>
          </div>
    </div>
  )
}

export default SignIn