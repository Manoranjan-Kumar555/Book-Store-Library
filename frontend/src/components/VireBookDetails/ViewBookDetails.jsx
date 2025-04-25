import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import GolbalLoader from "../GlobalLoader/GolbalLoader"; // Check the spelling; should be 'GlobalLoader' if it's a typo
import axios from "axios";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaCartArrowDown, FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  // console.log("Log in",isLoggedIn, "role", role)

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900">
        <GolbalLoader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-white p-8 bg-zinc-900 h-screen flex items-center justify-center">
        <p>Book not found.</p>
      </div>
    );
  }

  // add the Favourite book

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookId: id,
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-book-to-favourite",
        {},
        { headers }
      );
      // setData(response.data.data);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTOCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      // setData(response.data.data);
      console.log("Add to cart", response.data);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBook = () => {};

  const handleDeleteBook = () => {};

  return (
    <div className=" px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row ">
      <div className="   text-white md:h-[88vh] md:w-3/6 w-[100%]  flex  gap-5 ">
        <div className="flex lg:flex-row flex-col justify-around gap-10 bg-zinc-800 px-4 py-12 rounded f">
          <div className="">
            <img
              src={data.url}
              alt="Book"
              className="md:h-[70vh] bg-amber-50"
            />
          </div>
          {isLoggedIn && role === "user" && (
            <div className="flex flex-row md:flex-col items-center justify-between lg:justify-start gap-5">
              <button
                className="flex justify-center items-center gap-3 rounded lg:rounded-full text-3xl p-2 mt-0 lg:mt-4 text-red-500 bg-amber-50 cursor-pointer"
                onClick={handleFavourite}
              >
                <FaHeart />
                <span className="lg:hidden block text-xl text-black">
                  {" "}
                  Add to Favourite
                </span>
              </button>
              <button
                className="flex justify-center items-center gap-3 rounded lg:rounded-full text-3xl p-2 mt-0 lg:mt-4 text-blue-500 bg-amber-50 cursor-pointer"
                onClick={handleAddTOCart}
              >
                <FaCartArrowDown />
                <span className="lg:hidden block text-xl text-black">
                  Add to Cart
                </span>
              </button>
            </div>
          )}

          {isLoggedIn && role === "admin" && (
            <div className="flex flex-row md:flex-col items-center justify-between lg:justify-start gap-5">
              <button
                className="flex justify-center items-center gap-3 rounded lg:rounded-full text-3xl p-2 mt-0 lg:mt-4 text-blue-500 bg-amber-50"
                onClick={handleEditBook}
              >
                <FaEdit />
                <span className="lg:hidden block text-xl text-blue-500">
                  {" "}
                  Edit Book
                </span>
              </button>
              <button
                className="flex justify-center items-center gap-3 rounded lg:rounded-full text-3xl p-2 mt-0 lg:mt-4 text-red-500 bg-amber-50"
                onClick={handleDeleteBook}
              >
                <MdOutlineDeleteOutline />
                <span className="lg:hidden block text-xl text-red-500">
                  Delete Book
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 md:w-3/6 text-white overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
        <p className="mb-2">
          <strong>Author:</strong> {data.author}
        </p>
        <p className="mb-4">
          <strong>Description:</strong> {data.description}
        </p>
        <p className="mb-2">
          <strong>Language:</strong> {data.language}
        </p>
        <p className="mb-2">
          <strong>Price: ₹</strong> {data.price} /-
        </p>
        {/* Add more metadata or actions if needed */}
      </div>
    </div>
  );
};

export default ViewBookDetails;
