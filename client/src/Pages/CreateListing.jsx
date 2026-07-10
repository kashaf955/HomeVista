import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Create a listing</h1>
      <form action="" className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1 mr-6">
           <input
            type="text"
            placeholder="Name"
            className="border rounded-md p-2 w-full mb-4 hover:border-red-800"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border rounded-md p-2 w-full mb-4 hover:border-red-800"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border rounded-md p-2 w-full mb-4 hover:border-red-800"
            id="adress"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id='sale' className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id='rent' className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id='parking' className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id='furnished' className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id='offer' className="w-5" />
              <span>Offer</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-wrap gap-6">
            <div className=" flex gap-4 items-center mb-2">
              <input type= "number" id="bedrooms" min='1' max='10' required className="p-2 border border-red-800" />
              <p>No. of Beds</p>
            </div>
            <div className=" flex gap-4 items-center mb-2">
              <input type= "number" id="bathrooms" min='1' max='10' required className="p-2 border border-red-800" />
              <p>No. of Baths</p>
            </div>
            <div className=" flex gap-4 items-center mb-2">
              <input type= "number" id="regularprice" min='1' max='10' required className="p-2 border border-red-800" />
              <div className="flex flex-col items-center">
              <p>Regular Price</p>
              <span className="text-xs">($/month)</span>
            </div>
            </div>
            <div className=" flex gap-4 items-center mb-2">
              <input type= "number" id="discountedprice" min='1' max='10' required className="p-2 border border-red-800" />
              <div className="flex flex-col items-center">
              <p>Discounted Price</p>
              <span className="text-xs">($/month)</span>
            </div>
            </div>
          </div>
          <p className="font-semibold mt-3">Images:
            <span className="font-normal text-red-800">The First Image Will Be Cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input className= 'p-3' type="file" id="images" accept="images/*" multiple/>
            <button type="submit" className='bg-black text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase items-center w-full'>
            Upload
          </button>
          </div>
          <button type="submit" className='bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase mt-3'>
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
