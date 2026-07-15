import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import "swiper/css/bundle";
import { AiFillEnvironment } from "react-icons/ai";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";
import Contact from "../components/Contact";


export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [contact, setContact] = useState(false);
  const {currentUser} = useSelector((state) => state.user)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const images = Array.isArray(listing?.imageURLs)
    ? listing.imageURLs
    : Array.isArray(listing?.imageUrls)
    ? listing.imageUrls
    : [];

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something Went Wrong</p>
      )}
      {listing && !loading && !error && (
        <>
          {images.length > 0 ? (
            <Swiper navigation>
              {images.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-118"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center my-7 text-xl">No images available.</p>
          )}
          <div className="w-[80%] mx-auto">
            <h1 className="mt-5 mb-5 text-2xl font-semibold">
              {listing.name} - ${listing.regularprice}
              {listing.type === "rent" ? "/month" : ""}
            </h1>
            <div className="flex items-center mb-4">
              <AiFillEnvironment className="mr-2 size-5 text-green-600" />
              <p>{listing.address}</p>
            </div>
            <div className="flex gap-4 flex-wrap my-4">
              <p className="bg-red-800 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-black w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularprice - +listing.discountprice} discount
                </p>
              )}
            </div>
            <p className="text-justify">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className=" flex flex-wrap gap-4 sm:gap-6 mt-4 mb-4 items-center">
              <li className="flex items-center gap-1 whitespace-nowrap text-red-800 font-semibold">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
               <li className="flex items-center gap-1 whitespace-nowrap text-red-800 font-semibold">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
               <li className="flex items-center gap-1 whitespace-nowrap text-red-800 font-semibold">
                <FaParking className="text-lg" />
                {listing.parking
                  ? 'Parking'
                  : 'No Parking'}
              </li>
               <li className="flex items-center gap-1 whitespace-nowrap text-red-800 font-semibold">
                <FaChair className="text-lg" />
                {listing.furnished
                  ? 'furnished'
                  : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact &&(
                <button onClick={() =>setContact(true)} className="bg-black text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase w-full">Contact Landlord</button>
            ) }
            {contact && <Contact listing={listing}/> }
            
          </div>
         
        </>
      )}
    </main>
  );
}
