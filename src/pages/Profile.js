import React from "react";
import { Link } from "react-router-dom";
import Blog from "../components/Blog";
import { useSelector } from "react-redux";
import {  useGetUserQuery } from "../store/services/userService";
import { useGetUserBlogsQuery } from "../store/services/blogService";
import RHelmet from "../components/Helmet";
import ProfileSkelton from "../components/ProfileSkelton";

const Profile = () => {
  const {token, type, user } = useSelector(state=>state.user)
  const {data} = useGetUserQuery(user)
  const {data:blogs} = useGetUserBlogsQuery(user)
  return (
    <div className="flex flex-col items-center justify-center  py-10 gap-9 px-4 md:px-14 text-center">
      <RHelmet title="Profile" />
      <div className="w-full md:max-w-sm bg-white border border-gray-600 rounded-lg shadow-md ">
      {
        data?.user ? (  
        <div className="flex flex-col items-center pb-10 mt-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg bg-gray-300"
            src={data?.user?.profile}
            alt={data?.user?.username}
            loading="lazy"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 capitalize">
            {data?.user?.username}
          </h5>
          <span className="text-sm text-gray-500 mx-4">
            {data?.user?.bio}
          </span>
          <span className="text-sm text-indigo-500  font-bold capitalize">
            {data?.user?.type}
          </span>

          <div className="flex mt-4 space-x-3 md:mt-6">
            <Link
              to="/user/editprofile"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Edit Profile
            </Link>
          </div>
        </div>
        ) : <ProfileSkelton/>
      }
      </div>
      {token && type === "creator"  && blogs?.blogs?.length > 0 && (
        <div className="w-full  bg-white border   ">
          <h2 className="font-bold text-xl mt-2 text-gray-700">
            My Latest Blogs
          </h2>
          <div className="flex flex-wrap  pb-10 mt-10 items-stretch">
            {blogs?.blogs?.map((blog, i) => (
              <Blog blog={blog} key={i} />
            ))}
          </div>
        </div>
      )  }
    </div>
  );
};

export default Profile;
