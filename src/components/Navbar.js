import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux'
import { logout } from "../store/slice/userSlice";

const Navbar = () => {
  const { token, type } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  
  return (
    <header className="text-gray-600 body-font bg-gray-800  ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center md:justify-between justify-center">
        <Link
          to={"/"}
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">BlogShlog</span>
        </Link>
        <nav className="md:ml-auto text-gray-500 md:mr-auto w-10/12 flex flex-wrap  items-center text-base justify-center md:justify-end">
          <NavLink className="mr-5 hover:text-indigo-500 font-medium " to={"/"}>
            Home
          </NavLink>

          {token && type === "creator" && (
            <NavLink
              className="mr-5 hover:text-indigo-500 font-medium "
              to={"/creator/dashboard"}
            >
              Dashboard
            </NavLink>
          )}
          {token && (
            <NavLink
              className="mr-5 hover:text-indigo-500 font-medium "
              to={"/user/profile"}
            >
              Profile
            </NavLink>
          )}
          {token ? (
            <button
              onClick={() => dispatch(logout())}
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/auth/login"}
              className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
