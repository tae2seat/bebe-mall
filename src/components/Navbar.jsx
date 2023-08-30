import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import babyFace from "../images/ICON_08.png";
import { useDispatch, useSelector } from "react-redux";
import Button from "./buttons/Button.jsx";
import User from "./User";
import { authApi } from "../axios";
import { logout } from "../redux/slices/authSlice";
import menu from "../images/menu.png";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, userRole } = useSelector((state) => state.auth);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const timeOutRef = useRef();

  const handleMouseEnter = () => {
    clearTimeout(timeOutRef.current);
    setNavbarVisible(true);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      setNavbarVisible(false);
    }, 300);
  };

  const handleLogout = async (e) => {
    try {
      const response = await authApi.post("/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      dispatch(logout());
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (e) => {
    navigate("/login");
  };

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-[#472f4e] gap-2">
        <img
          src={babyFace}
          alt="로고"
          className="hidden md:block items-center w-8 h-8"
        />
        <h1 className="hidden md:block">Bebe</h1>
        <span>Mall</span>
      </Link>
      <div className="relative flex items-center gap-2 md:gap-4">
        {isLoggedIn && (
          <Link to="/profile">
            <User />
          </Link>
        )}
        {isLoggedIn ? (
          <Button onClick={handleLogout} text="Logout" />
        ) : (
          <Button onClick={handleLogin} text="Login" />
        )}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img
            src={menu}
            alt="menuBtn"
            className="w-12 h-12 cursor-pointer p-2 "
          />
          <nav
            className={`absolute top-14 -right-2 text-center ${
              isNavbarVisible ? "" : "hidden"
            }`}
          >
            <ul
              className={`flex flex-col gap-4 w-40 p-4 bg-rose-50 opacity-70 rounded-b-lg shadow-lg text-[#472f4e] hover:text-[#a56a94] `}
            >
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/carts">Carts</Link>
              </li>
              {isAdmin && userRole === "admin" && (
                <li className="flex justify-center">
                  <Link to="/products/new">
                    <BsFillPencilFill />
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
