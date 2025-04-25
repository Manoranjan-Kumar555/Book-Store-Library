import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book, favourite, onRemove }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookId: book._id,
  };

  const handleRemoveFromFavourite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );
      console.log("Removed book:", response.data.title);
      alert(`Removed "${response.data.title}" from favourites: ${response.data.message}`);

      // Call the onRemove function passed from parent to update state
      onRemove(book._id); // Pass the book ID to remove it from the parent state
    } catch (error) {
      alert(
        `Error removing favourite book: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-zinc-200 rounded p-2">
        <Link to={`/view-book-details/${book._id}`} className="w-full">
          <div className="bg-[#4f4c4a] rounded p-2 flex flex-col transform transition duration-300 hover:scale-106 shadow-lg h-full gap-3">
            <div className="bg-zinc-900 rounded flex items-center justify-center shadow-lg">
              <img src={book.url} alt="" className="h-[25vh]" />
            </div>
            <div className="text-center mt-1 text-xl font-semibold text-white">
              <h2>{book.title}</h2>
            </div>
            <div className="font-semibold text-xl text-amber-300">
              <p>{book.language}</p>
            </div>
            <div>
              <p className="text-start text-amber-50 font-bold m-2">Price ₹ {book.price}</p>
            </div>
          </div>
        </Link>

        {favourite && (
          <button
            className="bg-red-500 rounded border border-amber-300 text-white-500 mt-3 text-sm px-4 py-2 font-bold transform transition duration-300 hover:scale-105 shadow-amber-800"
            onClick={handleRemoveFromFavourite}
          >
            Remove From Favourite
          </button>
        )}
      </div>
    </>
  );
};

export default BookCard;
