import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/userSlice";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
const Navbar = () => {
  const { token, type } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="text-gray-600 body-font bg-gray-900  transition-all ease-in-out ">
      <div className="container mx-auto flex flex-wrap p-5  md:flex-row items-center justify-between ">
        <Link
          to={"/"}
          className="flex title-font font-medium items-center text-white "
        >
          <span className="ml-3 text-xl">BlogShlog</span>
        </Link>
        <nav className="md:ml-auto md:flex text-gray-500 mr-2 w-10/12 hidden flex-wrap  items-center text-base justify-center md:justify-end">
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
        <button
          onClick={toggleOpen}
          className="inline-flex md:hidden text-white bg-indigo-500 border-0 p-2 md:py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
        >
          {isOpen ? <MdClose /> : <FiMenu />}
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden w-full md:flex-grow md:items-center md:w-auto  `}
        >
          <nav
            className="md:ml-auto text-gray-500 md:mr-auto mt-2  text-sm flex  flex-col  items-end
           justify-between md:justify-end gap-1"
          >
            <NavLink
              className=" hover:text-indigo-500 font-medium "
              to={"/"}
              onClick={() => {
                toggleOpen();
              }}
            >
              Home
            </NavLink>

            {token && type === "creator" && (
              <NavLink
                onClick={() => {
                  toggleOpen();
                }}
                className=" hover:text-indigo-500 font-medium "
                to={"/creator/dashboard"}
              >
                Dashboard
              </NavLink>
            )}
            {token && (
              <NavLink
                onClick={() => {
                  toggleOpen();
                }}
                className=" hover:text-indigo-500 font-medium "
                to={"/user/profile"}
              >
                Profile
              </NavLink>
            )}
            {token ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  toggleOpen();
                }}
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Logout
              </button>
            ) : (
              <Link
                onClick={() => {
                  toggleOpen();
                }}
                to={"/auth/login"}
                className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
