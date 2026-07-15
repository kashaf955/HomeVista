import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function Listingitem({ listing }) {
  const image =
    listing.imageURLs?.[0] || listing.imageUrls?.[0] || "";

  return (
    <div className="bg-white shadow-md shadow-red-800/40 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-red-800/50 transition-shadow duration-300 w-full sm:w-[300px]">
      <Link to={`/listing/${listing._id}`}>
        <img src={image} alt={listing.name || "listing"}  className="w-full h-[200px] object-cover hover:scale-105 transition-scale duration-300" />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-black truncate">{listing.name}</p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-red-800" />
            <span className="text-gray-600 text-sm truncate">{listing.address}</span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{listing.description}</p>
          <p className="text-red-800 font-semibold mt-2">
            $
            {listing.offer
              ? (+listing.discountprice).toLocaleString("en-US")
              : (+listing.regularprice).toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
            {listing.offer && (
              <span className="text-gray-500 line-through ml-2 text-sm font-normal">
                ${( +listing.regularprice).toLocaleString("en-US")}
              </span>
            )}
          </p>
          <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 font-bold text-xs">
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
              </div>
              <div className="flex items-center gap-1 font-bold text-xs">
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
              </div>
              </div>
        </div>
      </Link>
    </div>
  );
}
