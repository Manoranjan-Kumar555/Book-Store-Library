import React, { useState } from "react";
import hero_images from "../../assets/images/hero-images.png"
import { Link } from "react-router-dom";
import GolbalLoader from "../GlobalLoader/GolbalLoader";

const Hero = () => {
  const [isLoader, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <div className="h-[100vh] flex flex-col md:flex-row lg:flex-row justify-center items-center">
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-3xl lg:text-6xl font-semibold text-yellow-300 text-center lg:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
          ipsam?
        </h1>
        <p className="mt-4 text-l text-zinc-300 lg:text-left text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
          accusamus id sunt. Harum, rem officiis.
        </p>
        <div className="mt-8 mb-8">
          <Link to="/all-books" className="text-yellow-100 text-l lg:text-2xl font-semibold border border-yellow-100 px-5 py-2 hover:bg-zinc-500 rounded-full cursor-pointer text-center">
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/7 h-auto lg:h-[100%] flex items-center justify-center">
        {isLoader && (
          <GolbalLoader />
        )}
        <img onLoad={handleImageLoad} src={hero_images} alt="hero-images" />
      </div>
    </div>
  );
};

export default Hero;
