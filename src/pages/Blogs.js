import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import BlogSkelton from "../components/BlogSkelton";
import RHelmet from "../components/Helmet";
import { useGetBlogsQuery } from "../store/services/blogService";
const Blogs = () => {
  const { data, isLoading } = useGetBlogsQuery();
  const [blogs, setBlogs] = useState([]);
  const sortBlogs = (e) => {
    const value = e.target.value;
    if (value === "popular") {
      const sorted = [...blogs].sort((a, b) => b.views - a.views);
      setBlogs(sorted);
    }
    if (value === "latest") {
      const sorted = [...blogs].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBlogs(sorted);
    }
    if (value === "trending") {
      const sorted = [...blogs].sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt) && b.views - a.views
      );
      setBlogs(sorted);
    }
  };
  useEffect(() => {
    if (data?.blogs) {
      setBlogs(data.blogs);
    }
  }, [data]);
  const searchFilter = (e) => {
    const value = e.target.value;
    if (value) {
      const filtered = data?.blogs.filter((blog) =>
        blog.title.toLowerCase().includes(value.toLowerCase())
      );
      setBlogs(filtered);
    } else {
      setBlogs(data?.blogs);
    }
  };

  return (
    <>
    <RHelmet title={
      "BlogShlog : Blogging Website"
    }
    content={
      "BlogShlog is a blogging website where you can read blogs and write blogs. You can also share your blogs with your friends and family."
    }
    />
    
      <section className="text-gray-600 body-font bg-white">
        <div className="container px-5 py-24 pt-10 mx-auto">
          <div className="flex items-start md:items-center gap-2 md:gap-0 justify-between py-4 bg-gray-900 p-2  flex-col md:flex-row">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm  border  rounded-lg w-full md:w-80  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by title"
                onChange={searchFilter}
              />
            </div>

            <div className="relative ml-4 w-3/4 flex items-center justify-start md:justify-end ">
              <label
                htmlFor="category"
                className="leading-7 text-sm text-gray-300 mr-2 text-left font-bold"
              >
                Sort By
              </label>
              <select
                type="text"
                id="category"
                name="category"
                className=" bg-gray-700  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={sortBlogs}
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap -m-4 pt-2 items-stretch ">
            {isLoading
              ? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <BlogSkelton key={i} />)
              : blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
            {data?.blogs && !blogs.length && (
              <h1 className="text-2xl w-full pt-10 text-center text-gray-400">
                No Blogs Found
              </h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
