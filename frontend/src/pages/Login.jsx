import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {authActions} from "../../store/auth";
import {useDispatch} from "react-redux";


const Login = () => {


  const [values, setValues] = useState({
    userName: "",
    password: "",
  })
  const naviage = useNavigate();
  const dispatch = useDispatch()

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }


  const submit = async () => {
    try {
      if (values.userName === "" || values.password === "") {
        alert("All Fields are Required...")
      } else {
        console.log("Value :-", values);
        const response = await axios.post("http://localhost:1000/api/v1/sign-in", values);
        console.log("Resonse sign-in", response.data);

        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role));
        naviage("/profile")

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        alert(response.data.message);
        // naviage("/login");
        // Reset the form
        setValues({
          userName: "",
          password: "",
        });
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }


  return (
    <div>
      <div className=" bg-zinc-900 px-5 py-8 flex items-center justify-center h-[100vh]">
        <div className="bg-zinc-800 rounded-lg m-5 px-8 py-15 w-[100%]  md:w-3/6 lg:w-2/6">
          <p className="text-zinc-200 text-xl">Sign Up</p>
          {/* // User Name */}
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
          {/* // Password */}
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
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 cursor-pointer"
              onClick={submit}
            >
              Log in
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
                to="/signUp"
                className="text-blue-500 hover:underline font-semibold"
              >
                <u>SignUp</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
