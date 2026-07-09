import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError ] = useState(false);
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    if (!file) return

    const storage = getStorage(app)
    const fileName = `${Date.now()}-${file.name}`
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, avatar: downloadURL }))
        })
      }
    )
  }, [file])

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-6'>Profile</h1>
      <form action='' className='flex flex-col gap-3'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
        <img src={formData.avatar || currentUser.avatar} onClick={() => fileRef.current?.click()} alt='Profile' srcSet='' className='h-20 w-20 rounded-full object-cover cursor-pointer self-center mt-2' />
        <p className='flex text-center'>
          {fileUploadError ? (
            <span className='text-red-800 text-center mx-auto'>Error Uploading Image</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-black text-center mx-auto'>Uploading {filePerc}%</span>
          ) : filePerc === 100 ? (
            <span className='text-green-600 text-center mx-auto'>Image Uploaded Successfully</span>
          ) : (
            ''
          )}
        </p>
        {/* <button type='button' onClick={() => fileRef.current?.click()} className='bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase w-1/2 mx-auto m-4'>Add Image</button> */}
         <input type='text' placeholder='Username' className='border border-red-800 rounded-md p-2 w-full mb-4' id='username' />
        <input type='email' placeholder='Email' className='border border-red-800 rounded-md p-2 w-full mb-4' id='email'  />
        <input type='password' placeholder='Password' className='border border-red-800  rounded-md p-2 w-full mb-4' id='password' />
        <button type='submit' className='bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase w-full'>
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
