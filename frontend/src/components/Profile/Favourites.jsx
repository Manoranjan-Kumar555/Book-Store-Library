import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "./../BookCard/BookCard";

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
          <div className="flex justify-center items-center w-full h-[calc(100vh-110px)] bg-zinc-500 rounded">
            <h1 className="text-center font-bold lg:text-2xl  animate-bounce rounded bg-blue-500 px-8  py-4 font-bold text-white hover:bg-blue-1000">No Favourite Books</h1>
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
