import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Allbooks from "./pages/Allbooks";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/VireBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "../store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";

import UserSetting from "./components/Profile/UserSetting";

function App() {

  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [])



  return (
    <>
      <div>
        {/* <Router> */}
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/all-books" element={<Allbooks />} />
          <Route exact path="/logIn" element={<Login />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/about-us" element={<About />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/profile" element={<Profile />} >
            <Route index element={<Favourites />} />
            <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
            <Route path="/profile/setting" element={<UserSetting />} />
          </Route>
          <Route path="view-book-details/:id" element={<ViewBookDetails />} />
        </Routes>
        <Footer />
        {/* </Router> */}
      </div>
    </>
  );
}

export default App;
