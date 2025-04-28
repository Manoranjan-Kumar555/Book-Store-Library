import React, { useEffect, useState } from "react";
import GolbalLoader from "./../components/GlobalLoader/GolbalLoader";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import empty_Cart_img from "../assets/images/empty-cart.png";
import { useNavigate } from 'react-router-dom';

import { useDispatch } from "react-redux"; // Assuming you have this action
import { cartActions } from "../../store/cartSlice";

const Cart = () => {
  const [Cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  // const cart = useSelector((state) => state.cart); // get Cart items

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

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      const totalPrice = Cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(totalPrice);
    } else {
      setTotal(0);
    }
  }, [Cart]);

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
      <div className="h-screen flex items-center justify-center flex-col bg-zinc-600">
        <h1 className="text-white font-bold ">No Favourite Books in Cart...</h1>
        <img className="w-[10%]" src={empty_Cart_img} alt="No Cart" />
      </div>
    );
  }

  
  const PlaceOrderFun = async () => {
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
  
      // ✅ Clear the cart
      dispatch(cartActions.clearCart());
  
      Navigate("/profile/orderHistory");
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data?.message || error.message
      );
    }
  };

  // If cart is not empty, show cart items
  return (
    <div className="bg-zinc-900 px-4 md:px-12 h-screen py-8">
      {!Cart ? (
        <div className="w-full h-full flex items-center justify-center">
          <GolbalLoader />
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-black text-zinc-500 mb-8">Your Cart</h1>
          <div className="overflow-y-auto h-[calc(92vh-110px)] px-1">
            {Cart.length > 0 ? (
              Cart.map((item, i) => (
                <div
                  key={i}
                  className="w-full my-4 rounded flex flex-col md:flex-row p-5 bg-zinc-800 justify-around items-center"
                >
                  <div>
                    <img
                      src={item.url}
                      alt={item.title}
                      className={`${
                        item.title === "PHP Programming"
                          ? "h-[10vh] md:h-[5vh]"
                          : "h-[20vh] md:h-[10vh]"
                      }`}
                    />
                  </div>
  
                  <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-6">
                    <h1 className="text-2xl text-zinc-100 font-semibold">
                      {item.title}
                    </h1>
  
                    <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                      {item.description
                        ? item.description.slice(0, 100)
                        : "Description not available"}
                      ...
                    </p>
  
                    <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
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
  
                  <div className="flex flex-col items-center justify-center mt-4 md:mt-0 md:ml-6">
                    <h2 className="text-zinc-100 text-2xl font-semibold">
                      Price: ₹{item.price}
                    </h2>
                    <button
                      className="bg-red-100 text-red-700 border border-red-700 rounded p-2 mt-4 cursor-pointer"
                      onClick={() => deleteItem(item._id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-zinc-400 mt-12 text-2xl">
                Your cart is empty.
              </div>
            )}
  
            {/* Total Amount Section */}
            {Cart.length > 0 && (
              <div className="mt-8 flex justify-end">
                <div className="p-6 bg-zinc-800 rounded shadow-lg w-full md:w-1/3">
                  <h1 className="text-3xl text-zinc-200 font-semibold mb-4">
                    Total Amount
                  </h1>
                  <div className="flex items-center justify-between text-xl text-zinc-200 mb-4">
                    <h1>{Cart.length} Books</h1>
                    <h2>Total: ₹{total}</h2>
                  </div>
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-200"
                    onClick={PlaceOrderFun}
                  >
                    Place Your Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
  
};

export default Cart;
