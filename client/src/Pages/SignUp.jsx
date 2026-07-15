import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import React from 'react'
import OAuth from '../components/OAuth.jsx';
import signupImg from '../assets/SignUp.jpg';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
    console.log(data);
  };


  return (
    <div className='flex flex-col md:flex-row items-center max-w-6xl mx-auto p-6 md:p-10'>
       <img src={signupImg} alt="Real Estate" className='rounded-lg shadow-lg w-full md:w-1/2 h-72 md:h-80 mb-6 md:mb-0 md:mr-6 object-cover' />
       <div className='w-full md:w-1/2 p-4 md:p-10 text-left'>
      <h1 className='text-3xl text-left font-bold mb-4 max-md:text-xl'>Create An Account</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' className='border border-red-800 rounded-md p-2 w-full mb-4' id='username' onChange={handleChange} />
        <input type="email" placeholder='Email' className='border border-red-800 rounded-md p-2 w-full mb-4' id='email' onChange ={handleChange} />
        <input type="password" placeholder='Password' className='border border-red-800  rounded-md p-2 w-full mb-4' id='password' onChange={handleChange}/>
        <button disabled={loading} type="submit" className='bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase w-full'>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
          <OAuth />
      </form>
      <div className='mt-3'>
        <p>Have an account?
           <a href="/sign-in" className='text-red-800 hover:underline'> Login</a></p>
      </div>
      {error && <p className='text-red-800 mt-4'>{error}</p>}
      </div>
    </div>
  )
}
