import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  useDeleteBlogMutation,
  useGetUserBlogsQuery,
} from "../store/services/blogService";
import Spinner from "../components/Spinner";
import formatDate from "../utils/date";
import views from "../utils/views";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user)
  const { data, isFetching } = useGetUserBlogsQuery(user);
  const [blogs, setBlogs] = useState([]);
  const sortBlogs = (e) => {
    const value = e.target.value;
    if (value === "viewed") {
      const sorted = [...blogs].sort((a, b) => b.views - a.views);
      setBlogs(sorted);
    }
    if (value === "latest") {
      const sorted = [...blogs].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBlogs(sorted);
    }
    if (value === "lastupdated") {
      const sorted = [...blogs].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setBlogs(sorted);
    }
  };
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
  const [deleteB, result] = useDeleteBlogMutation();
  const { data: deleteData, error } = result;
  const deleteBlog = (id) => {
    deleteB(id);
  };
  useEffect(() => {
    if (deleteData) {
      toast.success("Blog deleted successfully");
    }
    if (error) {
      toast.error(error.data.msg);
    }
  }, [deleteData, error, navigate]);

  useEffect(() => {
    if (data) {
      setBlogs(data?.blogs);
    }
  }, [data]);
  

  return (
    <>
      <div className="relative overflow-x-auto shadow-md  bg-gray-800 ">
        <div className="flex items-start md:items-center justify-between py-4 bg-white dark:bg-gray-800 p-2 flex-col md:flex-row ">
          <div className="flex justify-between items-center w-full md:w-2/6 ">
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Dashboard
            </h1>
            <Link
              to="/creator/createblog"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 gap-2 
                    "
            >
              <BsBookmarks /> Create Blog
            </Link>
          </div>
          {data?.blogs?.length > 1 && (
            <div className="relative ml-4 w-3/4 flex items-center justify-center ">
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
                <option value="viewed">Most Viewed</option>
                <option value="lastupdated">Recently Updated</option>
              </select>
            </div>
          )}

          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by title"
              onChange={searchFilter}
            />
          </div>
        </div>
        {isFetching ? (
          <div className="text-center text-2xl text-gray-700 dark:text-gray-200">
            {" "}
            <Spinner />{" "}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-2xl text-gray-700 dark:text-gray-200">
            No Blogs Found
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Views
                </th>
                <th scope="col" className="px-6 py-3">
                  Created at
                </th>
                <th scope="col" className="px-6 py-3">
                  Updated at
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs?.map((blog, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`${process.env.REACT_APP_SERVER_HOST}/uploads/${blog.image}`}
                      alt={blog.category}
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold capitalize">
                        {blog.title.slice(0, 12)}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{blog.category}</td>
                  <td className="px-6 py-4">{views(blog.views)}</td>
                  <td className="px-6 py-4">{formatDate(blog.createdAt)}</td>
                  <td className="px-6 py-4">{formatDate(blog.updatedAt)}</td>

                  <td className="px-6 py-4 w-fit max-w-[170px]">
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/creator/editblog/${blog._id}`}
                        data-modal-target="editUserModal"
                        data-modal-show="editUserModal"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 md:px-5 md:py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 gap-2
                    "
                      >
                        <BiEditAlt /> Edit
                      </Link>

                      <Link
                        to={`/blog/${blog._id}`}
                        data-modal-target="editUserModal"
                        data-modal-show="editUserModal"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1 md:px-5 md:py-2.5  text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 gap-2
                    "
                      >
                        <AiOutlineEye /> View
                      </Link>

                      <DeleteModal id={blog._id} deleteBlog={deleteBlog} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Dashboard;
