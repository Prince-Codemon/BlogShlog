import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../utils/date";
import views from "../utils/views";
const Blog = ({ blog }) => {
  const { category, createdAt, title, desc, views:blogView, _id, image } = blog;
  return (
    <Link to={`/blog/${_id}`} className="p-4 md:w-1/3 flex-grow">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={image}
          alt="blog"
          loading="lazy"
        />
        <div className="p-6 flex flex-col justify-between">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {category}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3 capitalize">
            {title}
          </h1>
          <p className="leading-relaxed mb-3 text-xs md:text-sm ">{desc.slice(0, 100)+"..."}</p>
          <div className="flex items-center flex-wrap mt-auto">
            <Link
              to={`/blog/${_id}`}
              className=" bg-indigo-600 text-white rounded-sm px-4 py-1 hover:bg-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 mb-2"
            >
              Read More
            </Link>
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
             {views(blogView)}
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
              {formatDate(createdAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
