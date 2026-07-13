import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from "react";

export default function CreateListing() {
  const {currentUser} = useSelector(state => state.user)
  const [files, setFiles] = useState([]);
  const params = useParams();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularprice: 50,
    discountedprice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...data,
        imageUrls: data.imageUrls || data.imageURLs || [],
      }));
    };

    fetchListing();
  }, [params.listingId]);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrls: prevFormData.imageUrls.concat(urls),
          }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image Upload Failed (2 mb max per Image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("you can only Upload 6 images per listing");
      setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state.changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    if(e.target.id === 'sale' || e.target.id === 'rent'){
      setFormData(
        {
          ...formData,
          type: e.target.id
        }
      )
    }
    if(e.target.id === 'parking' || e.target.id === 'furnished' ||  e.target.id === 'offer'){
      setFormData(
        {
          ...formData,
          [e.target.id]: e.target.checked
        }
      )
    }
     if(e.target.type === 'number' || e.target.type === 'text' ||  e.target.type === 'textarea'){
      setFormData(
        {
          ...formData,
          [e.target.id]: e.target.value
        }
      )
    }
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      if(formData.imageUrls.length < 1) {
        setError("You Must Upload at least one Image");
        return;
      }
      if(+formData.regularprice < +formData.discountedprice) {
        setError('Discount Price Should Be Less than Regular Price');
        return;
      }
      setLoading(true);
      setError(false);
      const listingData = {
        ...formData,
        regularprice: Number(formData.regularprice),
        discountprice: Number(formData.discountedprice),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        furnished: Boolean(formData.furnished),
        parking: Boolean(formData.parking),
        offer: Boolean(formData.offer),
        imageURLs: formData.imageUrls,
        userRef: currentUser?._id,
      };

      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });
      const data = await res.json();
      setLoading(false);
      if(data.success === false){
        setError(data.message);
        return;
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Updating listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1 mr-6">
          <input
            type="text"
            placeholder="Name"
            className="border rounded-md p-2 w-full mb-4 hover:border-red-800"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border rounded-md p-2 w-full mb-4 hover:border-red-800"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border rounded-md p-2 w-full mb-4 hover:border-red-800"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input 
              type="checkbox" 
              id="sale" 
              className="w-5"
              onChange={handleChange}
              checked={formData.type === 'sale'} />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input 
              type="checkbox" 
              id="rent" 
              className="w-5"
              onChange={handleChange}
              checked={formData.type === 'rent'} />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input 
              type="checkbox" 
              id="parking" 
              className="w-5"
              onChange={handleChange}
              checked={formData.parking}
               />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input 
              type="checkbox" 
              id="furnished" 
              className="w-5"
              onChange={handleChange}
              checked={formData.furnished} />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input 
              type="checkbox" 
              id="offer" 
              className="w-5"
              onChange={handleChange}
              checked={formData.offer} />
              <span>Offer</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-wrap gap-6">
            <div className=" flex gap-4 items-center mb-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-red-800 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>No. of Beds</p>
            </div>
            <div className=" flex gap-4 items-center mb-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-red-800 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>No. of Baths</p>
            </div>
            <div className=" flex gap-4 items-center mb-2">
              <input
                type="number"
                id="regularprice"
                min="50"
                max="1000000"
                required
                className="p-2 border border-red-800 rounded-lg"
                onChange={handleChange}
                value={formData.regularprice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            {formData.offer && (
                <div className=" flex gap-4 items-center mb-2">
              <input
                type="number"
                id="discountedprice"
                min="0"
                max="1000000"
                required
                className="p-2 border border-red-800 rounded-lg"
                onChange={handleChange}
                value={formData.discountedprice}
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            )};
          </div>
          <p className="font-semibold mt-3">
            Images:
            <span className="font-normal text-black">
              The First Image Will Be Cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-black rounded-lg mt-3"
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase items-center"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-800 mt-3 test-sm">
            {imageUploadError && imageUploadError}
          </p>
          {(formData.imageUrls || []).length > 0 &&
            (formData.imageUrls || []).map((url, index) => (
              <div className="flex justify-between p-3 border rounded-lg m-3 items-center" key={url}>
                <img
                  src={url}
                  alt="Listing Image"
                  className="w-20 h-20 object-contain rounded-lg mt-3"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-800 rounded-lg uppercase hover:opacity-70"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            type="submit"
            className="bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase mt-3"
          >
            {loading ? 'Updatting...' : 'Update Listing'}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
