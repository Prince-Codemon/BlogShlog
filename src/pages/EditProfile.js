import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../store/services/userService";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import RHelmet from "../components/Helmet";
import ProfileSkelton from "../components/ProfileSkelton";
const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({});
  const [profile, setProfile] = useState();
  const [preImg, setPreImg] = useState("");
  const {data} = useGetUserQuery(user);
  const [update, updateResult] = useUpdateUserMutation();
  const { error, isSuccess, isLoading } = updateResult;
  const navigate = useNavigate()
  const fileReader = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreImg(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setUserInfo(data?.user);
    setPreImg(
      data?.user?.profile
    );
  }, [data?.user]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!userInfo.username  || !userInfo.bio || !userInfo.type){
      return toast.error('Please fill all the fields')
    }
    if(userInfo.username.length < 4){
      return toast.error('Username should be atleast 4 characters long')
    }
    if(userInfo.bio.length < 10){
      return toast.error('Bio should be atleast 10 characters long')
    }
    if(userInfo.bio.length > 100){
      return toast.error('Bio should be less than 100 characters long')
    }
    const formData = new FormData();
    profile ? formData.append("profile", profile) : formData.append("profile", "");
    formData.append("username", JSON.stringify(userInfo.username));
    formData.append("email", JSON.stringify(userInfo.email));
    formData.append("bio", JSON.stringify(userInfo.bio));
    formData.append("type", JSON.stringify(userInfo.type));
    update(formData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.msg)
    }
    if (isSuccess) {
      toast.success("Profile Updated Successfully")
      navigate('/user/profile')
    }

  }, [error, isSuccess, navigate]);


  
  

  return (
    <div className="flex flex-col items-center justify-center  py-10 gap-9 px-4 md:px-14 text-center">
      <RHelmet title="Edit Profile" />
      <div className="w-full max-w-sm bg-white border border-gray-600 rounded-lg shadow-md ">
        {userInfo ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center pb-10 mt-10"
          >
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg bg-gray-300"
              src={preImg}
              alt={userInfo.username}
              loading="lazy"
            />
            <div className="relative mb-4 ">
              <label
                htmlFor="profile"
                className="leading-7 text-sm text-gray-900 text-left cursor-pointer"
              >
                Edit Profile Picture
              </label>
              <input
                type="file"
                id="profile"
                name="profile"
                className="w-full border border-gray-500  hidden  text-sm outline-none leading-8 transition-colors duration-200 ease-in-out placeholder-gray-400 text-gray-400 "
                onChange={(e) => {
                  setProfile(e.target.files[0]);
                  fileReader(e.target.files[0]);
                }}
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div className="relative mb-4 w-3/4">
              <label
                htmlFor="username"
                className="leading-7 text-sm text-gray-900 text-left"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full bg-white rounded border border-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out capitalize"
                placeholder="Username"
                required
                value={userInfo.username}
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4 w-3/4">
              <label
                htmlFor="bio"
                className="leading-7 text-sm text-gray-900 text-left"
              >
                Bio
              </label>
              <textarea
                type="text"
                id="bio"
                name="bio"
                className="w-full bg-white rounded border border-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out "
                placeholder="Bio"
                required
                value={userInfo.bio}
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4 w-3/4">
              <label
                htmlFor="accountType"
                className="leading-7 text-sm text-gray-900 text-left"
              >
                Account Type
              </label>
              <select
                type="text"
                id="type"
                name="type"
                className="w-full bg-white rounded border border-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
                value={userInfo.type}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="creator">Creator</option>
              </select>
            </div>

            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800"
              >
                {
                  isLoading ? <Spinner /> : 'Update'
                }
              </button>
            </div>
          </form>
        ) : (
          <ProfileSkelton/>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
