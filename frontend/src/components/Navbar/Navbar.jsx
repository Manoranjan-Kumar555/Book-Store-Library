import React, { useState } from "react";
import bookLogo from "../../assets/images/book-logo.png";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [MobileNav, setMobileNav] = useState("hidden");

  const links = [
    { title: "Home", link: "/" },
    { title: "About-us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
    { title: "Carts", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("Is Logged In :- ", isLoggedIn);

  // Show limited links if not logged in
  const visibleLinks = isLoggedIn ? links : links.slice(0, 3);

  const toggleMobileNav = () =>
    setMobileNav((prev) => (prev === "hidden" ? "block" : "hidden"));

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-900 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img className="w-10 lg:w-20" src={bookLogo} alt="Book Logo" />
          <h1 className="lg:text-2xl text-l font-semibold">Book Heavens</h1>
        </Link>

        <div className="nav-links-bookheaven block md:flex gap-4 items-center">
          <div className="hidden md:flex gap-4">
            {visibleLinks.map((item, i) => (
              <div className="flex items-center justify-center">
                {
                  item.title === "Profile" ? (
                    <Link to={item.link}
                      className="px-4 py-1 border-blue-400 border rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 cursor-pointer">
                      {item.title}
                    </Link>
                  ) : (
                    <Link
                      to={item.link}
                      className="hover:text-blue-500 transition-all duration-300 cursor-pointer"
                      key={i}
                    >
                      {item.title}
                    </Link>
                  )
                }

              </div>
            ))}
          </div>

          {!isLoggedIn && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/LogIn"
                className="px-4 py-1 border-blue-400 border rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 cursor-pointer"
              >
                Log In
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 cursor-pointer"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={toggleMobileNav}
            className="text-white text-2xl hover:text-zinc-400 md:hidden"
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {visibleLinks.map((item, i) => (
          <Link
            to={item.link}
            className="text-white text-2xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300 cursor-pointer"
            key={i}
            onClick={toggleMobileNav}
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to="/LogIn"
              onClick={toggleMobileNav}
              className="px-8 mb-8 text-1xl font-semibold py-2 border-blue-400 border rounded hover:bg-white text-white hover:text-zinc-800 transition-all duration-300 cursor-pointer"
            >
              Log In
            </Link>
            <Link
              to="/SignUp"
              onClick={toggleMobileNav}
              className="px-8 mb-8 text-1xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 cursor-pointer"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
