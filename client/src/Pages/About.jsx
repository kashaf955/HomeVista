import React from "react";
import heroImg from "../assets/Home.png";
import aboutImg from "../assets/Signin.jpg";

export default function About() {
  return (
    <div>
      <div
        className="relative w-full min-h-[50vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 w-full max-w-[1300px] mx-auto p-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            About <span className="text-red-500">HomeVista</span>
          </h1>
          <p className="text-gray-200 mt-4 max-w-xl">
            Helping you find the place that feels like home.
          </p>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto p-3 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-semibold text-red-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              HomeVista makes buying and renting simple. Browse listings,
              compare options, and connect with landlords and sellers in one
              place. Whether you are searching for your next home or listing a
              property, we are here to make the process clear and easy.
            </p>
          </div>
          <div className="flex-1 w-full">
            <img
              src={aboutImg}
              alt="HomeVista mission"
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md shadow-red-800/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
