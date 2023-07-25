import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import babyFace from "../images/ICON_08.png";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/buttons/Button";
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
      <div className="flex gap-2 md:gap-4">
        {isLoggedIn && (
          <Link className="" to="/profile">
            <User />
          </Link>
        )}
        {isLoggedIn ? (
          <Button onClick={handleLogout} text="Logout" />
        ) : (
          <Button onClick={handleLogin} text="Login" />
        )}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img className=" cursor-pointer " src={menu} alt="menuBtn" />
          <nav
            className={`relative text-center ${
              isNavbarVisible ? "" : "hidden"
            }`}
          >
            <ul
              className={`absolute  top-full  -right-2 mt-2 py-4 px-4 md:px-10 bg-rose-50 opacity-70 rounded-b-lg shadow-lg `}
            >
              <li>
                <Link
                  to="/products"
                  className="block px-4 py-2 text-[#472f4e] hover:text-[#a56a94]"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/carts"
                  className="block px-4 py-2 text-[#472f4e] hover:text-[#a56a94]"
                >
                  Carts
                </Link>
              </li>
              {isAdmin && userRole === "admin" && (
                <li className="flex justify-center">
                  <Link
                    to="/products/new"
                    className="block px-4 py-2 text-[#472f4e] hover:text-[#a56a94]"
                  >
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
