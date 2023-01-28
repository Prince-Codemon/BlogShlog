import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-4   shadow md:px-6 md:py-8 bg-gray-900">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center mb-4 sm:mb-0">
  
          <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
           BlogShlog
          </span>
        </Link>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <Link to={'/'} className="mr-4 hover:underline md:mr-6 ">
              Home
            </Link>
          </li>
          <li>
            <Link to={'/user/profile'} className="mr-4 hover:underline md:mr-6">
              Profile
            </Link>
          </li>
          
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
        <Link to={'/'} className="hover:underline">
         BlogShlog
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
