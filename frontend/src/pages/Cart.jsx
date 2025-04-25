import React, { useEffect, useState } from "react";
import GolbalLoader from "./../components/GlobalLoader/GolbalLoader";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const [Cart, setCart] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch the cart data when the component mounts
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/get-cart-book",
          { headers }
        );
        setCart(res.data.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetch();
  }, []); // Only run on component mount

  // Handle deleting a book from the cart
  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:1000/api/v1/remove-book-to-cart/${id}`,
        { headers }
      );
      setCart(Cart.filter((item) => item._id !== id)); // Remove the item from the local state
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // If cart is loading, show loader
  if (!Cart) {
    return <GolbalLoader />;
  }

  // If cart is empty, show "No Cart" message
  if (Cart.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <h1>No Favourite Books in Cart</h1>
        <img src="path/to/your/empty-cart-image.jpg" alt="No Cart" />
      </div>
    );
  }

  // If cart is not empty, show cart items
  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      <h1 className="text-5xl font-black text-zinc-500 mb-8">Your Cart</h1>
      <div className="overflow-y-auto h-[calc(92vh-110px)] px-1">
        {Cart.map((item, i) => (
          <div
            className="w-full my-4 rounded flex flex-col md:flex-row p-5 bg-zinc-800 justify-around items-center"
            key={i}
          >
            <div>
              <img
                src={item.url}
                alt={item.title}
                className={
                  item.title === "PHP Programming"
                    ? "h-[10vh] md:h-[5vh]"
                    : "h-[20vh] md:h-[10vh]"
                }
              />
            </div>

            <div className="w-full md:w-auto">
              <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                {item.title}
              </h1>
              <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                {item.description
                  ? item.description.slice(0, 100)
                  : "Description not available"}
                ...
              </p>
              <p className="text-normal text-zinc-300 mt-2 hidden lg:hidden md:block">
                {item.description
                  ? item.description.slice(0, 65)
                  : "Description not available"}
                ...
              </p>
              <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                {item.description
                  ? item.description.slice(0, 100)
                  : "Description not available"}
                ...
              </p>
            </div>
            <div className="flex mt-4 w-full md:w-auto items-center justify-center">
              <h2 className="text-zinc-100 text-3xl font-semibold flex">
                Price: ₹ {item.price}
              </h2>
              <button
                className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12 cursor-pointer"
                onClick={() => deleteItem(item._id)} // Call deleteItem on click
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
