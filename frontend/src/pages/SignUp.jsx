import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    address: ""
  })
  const naviage = useNavigate()

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }


  const submit = async () => {
    try {
      if (values.userName === "" || values.email === "" || values.password === "" || values.address === "") {
        alert("All Fields are Required...")
      } else {
        console.log("Value :-", values);
        const response = await axios.post("http://localhost:1000/api/v1/sign-up", values);
        console.log("Resonse Sing up", response);
        console.log("Resonse Sing up", response.data.message);
        naviage("/login");
        // Reset the form
        setValues({
          userName: "",
          email: "",
          password: "",
          address: ""
        });
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div>
      <div className="h-auto bg-zinc-900 px-5 py-8 flex items-center justify-center">
        <div className="bg-zinc-800 rounded-lg m-5 px-8 py-10 w-full md:w-3/6 lg:w-2/6">
          <p className="text-zinc-200 text-xl">Sign Up</p>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              User Name
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-nonr"
              placeholder="Enter Username"
              name="userName"
              required
              value={values.userName}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Email
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-nonr"
              placeholder="Enter Email"
              name="email"
              required
              value={values.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-nonr"
              placeholder="Password"
              name="password"
              required
              value={values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="text-zinc-400">
              Address
            </label>
            <textarea

              class="
            p-2
            w-full
             mt-2 bg-zinc-900 text-zinc-100
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            "
              rows="5"
              placeholder="Enter Address"
              name="address"
              required
              value={values.address}
              onChange={change}
            ></textarea>

          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 cursor-pointer"
              onClick={submit}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-4">
            <p className="text-white text-center">
              <strong>Or</strong>
            </p>
          </div>
          <div className="text-zinc-100 text-center mt-4">
            <p>
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="text-blue-500 hover:underline font-semibold"
              >
                <u>Login</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
