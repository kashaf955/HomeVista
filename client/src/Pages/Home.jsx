import React, { useEffect, useState } from "react";
import heroImg from "../assets/Home.png";
import { Link } from "react-router-dom";
import Listingitem from "../components/Listingitem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(Array.isArray(data) ? data : []);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(Array.isArray(data) ? data : []);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      <div
        className="relative w-full min-h-[80vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 w-full max-w-[1300px] mx-auto p-3">
          <h1 className="text-5xl font-bold text-left text-white">
            Find your next <span className="text-red-800">Perfect</span>{" "}
            <span className="text-white">
              <br />
              Place
            </span>{" "}
            with ease
          </h1>
          <p className="text-left text-gray-200 mt-4 max-w-xl">
            Its a big world out there, lets help you find the perfect place to
            call home
          </p>
          <Link to={"/search"} className="inline-block mt-4">
            <button className="bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase">
              Let's Start..
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto p-3 flex flex-col my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="my-10">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-red-800">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-black-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="my-10">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-red-800">
                Recent Places for Rent
              </h2>
              <Link
                className="text-sm text-black-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="my-10">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-red-800">
                Recent Places for Sale
              </h2>
              <Link
                className="text-sm text-black-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
