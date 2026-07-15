import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(null);
  const onChange = (e) =>{
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div>
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span span className="font-semibold">
              {listing.name.toLowerCase()}
            </span>
          </p>
          <textarea name="message" id="message" rows='2' value={message} onChange={onChange} placeholder="Enter Your Message Here!" className="w-full border p-3 rounded-lg mt-3 mb-3"></textarea>
            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-600 uppercase w-full">
            Send Message</Link>
        </div>
      )}
    </>
  );
}
