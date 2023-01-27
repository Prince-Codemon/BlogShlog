import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blog from "../components/Blog";
import { useGetUserQuery } from "../store/services/userService";
import ProfileSkelton from '../components/ProfileSkelton'
import { useGetUserBlogsQuery } from "../store/services/blogService";
import RHelmet from "../components/Helmet";
const UserProfile = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const { data } = useGetUserQuery(id);
  const { data: userBlogs } = useGetUserBlogsQuery(id);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    if (userBlogs?.blogs) {
      setBlogs(userBlogs.blogs);
    }
  }, [userBlogs]);

  return (
    <div className="flex flex-col items-center justify-center  py-10 gap-9 px-4 md:px-14 text-center">
      <RHelmet title={data?.user?.username} />
      <div className="w-full max-w-sm bg-white border border-gray-600 rounded-lg shadow-md ">
        {data?.user ? (
          <div className="flex flex-col items-center pb-10 mt-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg bg-gray-300"
              src={
                data?.user?.profile.startsWith("http")
                  ? data?.user?.profile
                  : `${process.env.REACT_APP_SERVER_HOST}/uploads/${data?.user?.profile}`
              }
              alt={data?.user?.username}
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
            <a
              href={`mailto:${data?.user?.email}`}
              className="text-sm text-indigo-500  font-bold"
            >
              {data?.user?.email}
            </a>
          </div>
        ) : (
          <ProfileSkelton/>
        )}
      </div>
      {blogs.length > 0 && (
        <div className="w-full  bg-white border   ">
          <h2 className="font-bold text-xl mt-2 text-gray-700">
            My Latest Blogs
          </h2>
          <div className="flex flex-wrap  items-stretch pb-10 mt-10">
            {blogs?.map((blog, i) => (
              <Blog blog={blog} key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
