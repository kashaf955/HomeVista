import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';

export default function OAuth() {

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);


            const result = await signInWithPopup(auth, provider);
            console.log(result);
            
        } catch (error) {
            console.error('Could not signin with Google', error);
        }
    };

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 uppercase items-center w-full mt-4'>
      Continue with Google
    </button>
  )
}
