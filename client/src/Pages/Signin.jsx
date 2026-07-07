import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js'
import React from 'react'
import OAuth from '../components/OAuth.jsx';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false){
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
    console.log(data);
  };


  return (
    
    <div className='flex items-center justify-center min-h-screen p-6 md:p-10 bg-image bg-cover bg-center' style={{ backgroundImage: "url('src/assets/Signin.jpg')" }}>
      <div className='w-full max-w-md p-6 md:p-10 bg-white/90 rounded-xl shadow-lg'>
        <h1 className='text-3xl text-center font-bold mb-4 max-md:text-xl'>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='Email' className='border border-red-800 rounded-md p-2 w-full mb-4' id='email' onChange ={handleChange} />
          <input type="password" placeholder='Password' className='border border-red-800  rounded-md p-2 w-full mb-4' id='password' onChange={handleChange}/>
          <button disabled={loading} type="submit" className='bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase items-center w-full'>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <OAuth />
        </form>
        <div className='mt-3 text-center'>
          <p>Do not have an account?
             <a href="/sign-up" className='text-red-800 hover:underline'> Sign Up</a></p>
        </div>
        {error && <p className='text-red-800 mt-4'>{error}</p>}
      </div>
    </div>
  )
}
