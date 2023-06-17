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
        <ul className="flex flex-wrap items-center mb-6 text-sm  sm:mb-0 text-gray-400">
          <li>
            <Link to={"/"} className="mr-4 hover:underline md:mr-6 ">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/user/profile"} className="mr-4 hover:underline md:mr-6">
              Profile
            </Link>
          </li>
          <li>
            <Link to={"/faq"} className="mr-4 hover:underline md:mr-6">
              FAQ
            </Link>
          </li>
          <li>
            <a
              className="mr-4 hover:underline md:mr-6"
              href="https://www.princecodemon.live"
              target={"_blank"}
              rel="noreferrer"
            >
              Founder
            </a>
          </li>
          <li>
            <a
              className="mr-4 hover:underline md:mr-6"
              href="https://github.com/Prince-Codemon"
              target={"_blank"}
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
      <span className="block text-sm  sm:text-center text-gray-400">
        © 2023{" "}
        <Link to={"/"} className="hover:underline">
          BlogShlog
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
