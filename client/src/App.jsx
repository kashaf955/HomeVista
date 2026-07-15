import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import CreateListing from "./Pages/CreateListing.jsx";
import UpdateListing from "./Pages/UpdateListing.jsx";
import Listing from "./Pages/Listing.jsx";
import Search from "./Pages/Search.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/listing/:listingId" element={<Listing />} />
            <Route element={<PrivateRouter />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route
                path="/update-listing/:listingId"
                element={<UpdateListing />}
              />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
