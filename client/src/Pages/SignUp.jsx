import React from 'react'

export default function SignUp() {
  return (
    <div className='flex flex-col md:flex-row items-center max-w-6xl mx-auto p-6 md:p-10'>
       <img src="src/assets/SignUp.jpg" alt="Real Estate" className='rounded-lg shadow-lg w-full md:w-1/2 h-72 md:h-80 mb-6 md:mb-0 md:mr-6 object-cover' />
       <div className='w-full md:w-1/2 p-4 md:p-10 text-left'>
      <h1 className='text-3xl text-left font-bold mb-4 max-md:text-xl'>Create An Account</h1>
      <form action="">
        <input type="text" placeholder='Username' className='border border-red-800 rounded-md p-2 w-full mb-4' />
        <input type="email" placeholder='Email' className='border border-red-800 rounded-md p-2 w-full mb-4' />
        <input type="password" placeholder='Password' className='border border-red-800  rounded-md p-2 w-full mb-4' />
        <button type="submit" className='bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase'>
          Sign Up
        </button>
      </form>
      <div className='mt-3'>
        <p>Have an account?
           <a href="/sign-in" className='text-red-800 hover:underline'> Login</a></p>
      </div>
      </div>
    </div>
  )
}
