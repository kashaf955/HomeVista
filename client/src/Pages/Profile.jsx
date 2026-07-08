import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-6'>Profile</h1>
      <form action="" className='flex flex-col gap-3'>
        <img src= {currentUser.avatar} alt="Profile" srcset="" className='h-20 w-20 rounded-full object-cover cursor-pointer self-center mt-2' />
         <input type="text" placeholder='Username' className='border border-red-800 rounded-md p-2 w-full mb-4' id='username' />
        <input type="email" placeholder='Email' className='border border-red-800 rounded-md p-2 w-full mb-4' id='email'  />
        <input type="password" placeholder='Password' className='border border-red-800  rounded-md p-2 w-full mb-4' id='password' />
        <button type="submit" className='bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase w-full'>
          Update
        </button>
      </form>
      <div className='mt-4 flex justify-between'>
        <span className='text-shadow-black font-extrabold cursor-pointer'>
          Delete Account
        </span>
         <span className='text-shadow-black font-extrabold cursor-pointer'>
          Sign Out
        </span>
      </div>
    </div>
  )
}
