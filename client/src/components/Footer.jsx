import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-red-800/20 mt-auto">
      <div className="max-w-[1300px] mx-auto px-3 py-3 text-center text-sm text-red-800">
        © {new Date().getFullYear()} HomeVista. All rights reserved.
      </div>
    </footer>
  );
}
