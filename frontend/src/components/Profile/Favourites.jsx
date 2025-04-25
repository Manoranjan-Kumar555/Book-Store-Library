import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "./../BookCard/BookCard";
import empty_Fav_img from "../../assets/images/empty_Fav.png";

const Favourites = () => {
  const [favouritBook, setFavouritBook] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-book",
          { headers }
        );
        console.log("Favourite books:", response.data.data);
        setFavouritBook(response.data.data);
      } catch (error) {
        alert(
          "Error fetching favourite books:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetch();
  }, []); // Empty dependency array to run once when component mounts

  // Function to handle removing the book from favourites
  const handleRemoveBook = (bookId) => {
    setFavouritBook((prevBooks) =>
      prevBooks.filter((book) => book._id !== bookId)
    );
  };

  return (
    <>
      <h1 className="font-bold lg:text-3xl mb-2 bg-zinc-800 text-white p-2 rounded">
        Favourite Books
      </h1>
      <div className="overflow-y-auto h-[calc(100vh-110px)] px-1">
        {favouritBook.length === 0 ? (
          <div className="flex justify-center items-center w-full h-[calc(100vh-110px)] bg-zinc-800 rounded">
            <h1 className="text-center font-bold lg:text-2xl  animate-bounce rounded  px-10  py-4 font-bold text-white ">
              <div className="flex flex-col justify-center items-center h-[calc(20vh-110px)]">
                <div className="text-center text-xl font-semibold">
                  No Favourite Books
                </div>
                <div>
                  <img
                    className="w-[30%] max-w-full mx-auto mt-0"
                    src={empty_Fav_img}
                    alt="No Favourite Books"
                  />
                </div>
              </div>
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {favouritBook.map((item, i) => (
              <BookCard
                key={i}
                book={item}
                favourite={true}
                onRemove={handleRemoveBook} // Pass the remove function to BookCard
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favourites;
