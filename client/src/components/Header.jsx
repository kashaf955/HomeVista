import React from 'react';
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Header() {
  const {currentUser} = useSelector((state)=>state.user);
  
  return (
    <header className="bg-gray-100 shadow-md-red-950">
        <div className="flex justify-between gap-4 items-center max-w-6xl mx-auto p-3">
      <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap">
        <span className="text-red-800">Home</span>
        <span className="text-gray-800">Vista</span>
      </h1>
       <form className='bg-gray-200 p-2 rounded-md border border-red-800 flex items-center gap-2'>
        <input type="text" placeholder="Search..." className="bg-transparent border-none focus:outline-none text-red-800 w-24 sm:w-48"/>
        <FaSearch className='text-red-800' />
      </form>
      <ul className="flex flex-wrap items-center gap-10">
        <Link to="/" className="text-black-600 hidden sm:inline hover:text-red-800">Home</Link>
        <Link to="/about" className="text-black-600 hidden sm:inline hover:text-red-800">About</Link>
        <Link to="/profile" className="text-black-600 hidden sm:inline hover:text-red-800">
          {currentUser ? (
            <img src={currentUser.avatar} alt="profile" className='h-12 rounded-full' />
          ) : (
            "Sign In"
          )}
        </Link>
      </ul>
    </div>
    </header>
  )
}
