import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  DeleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser, loading , error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!file) return;

    const storage = getStorage(app);
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, avatar: downloadURL }));
        });
      },
    );
  }, [file]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

      navigate("/profile");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () =>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(DeleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(DeleteUserFailure(error.message));
    }
  }

  const handleSignOut = async() => {

    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false){
        dispatch(signOutUserFailure(data.message))
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }

  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current?.click()}
          alt="Profile"
          srcSet=""
          className="h-20 w-20 rounded-full object-cover cursor-pointer self-center mt-2"
        />
        <p className="flex text-center">
          {fileUploadError ? (
            <span className="text-red-800 text-center mx-auto">
              Error Uploading Image
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-black text-center mx-auto">
              Uploading {filePerc}%
            </span>
          ) : filePerc === 100 ? (
            <span className="text-green-600 text-center mx-auto">
              Image Uploaded Successfully
            </span>
          ) : (
            ""
          )}
        </p>
        {/* <button type='button' onClick={() => fileRef.current?.click()} className='bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase w-1/2 mx-auto m-4'>Add Image</button> */}
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="border border-red-800 rounded-md p-2 w-full mb-4"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-red-800 rounded-md p-2 w-full mb-4"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-red-800  rounded-md p-2 w-full mb-4"
          id="password"
          onChange={handleChange}
        />
        <button disabled ={loading}
          type="submit"
          className="bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase w-full"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="mt-4 flex justify-between">
        <span onClick= {handleDeleteUser} className="text-shadow-black font-extrabold cursor-pointer">
          Delete Account
        </span>
        <span onClick = {handleSignOut}className="text-shadow-black font-extrabold cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-600 mt-2">{error ? error : ''}</p>
      <p className="text-green-600 mt-2">{updateSuccess ? 'User is Updated Successfully' : ''}</p>

    </div>
  );
}
