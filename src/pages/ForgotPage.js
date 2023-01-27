import React, { useEffect } from "react";
import { useFormik } from "formik";
import {  useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../store/services/userService";

import jwtDecode from "jwt-decode";
import { forgotSchema } from "../schemas";
import Spinner from "../components/Spinner";
import RHelmet from "../components/Helmet";
const ForgortPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    toast.error("Link Expired");
    navigate("/auth/login");
  }
  const [resetPassword, result] = useResetPasswordMutation();
  const { data, error, isLoading } = result;




  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        cpassword: "",
      },
      validationSchema: forgotSchema,
      onSubmit: (values) => {
        resetPassword({ password:values.password, id: decoded.id});
      },
    });
    useEffect(() => {
    if (data) {
      toast.success(data?.msg);
      navigate("/auth/login");
    }
    if (error) {
      toast.error(error.data.msg);
    }
  }, [data, error, navigate]);

  
  
  return (
    <section className="text-gray-600 body-font">
      <RHelmet title="Reset Password" />
      <div className="container px-3 md:px-5  mx-auto flex items-center justify-center my-20">
        <form
          onSubmit={handleSubmit}
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg px-3 py-4 md:p-8 flex flex-col  w-full mt-10 md:mt-0 "
        >
          {" "}
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
              placeholder="***********"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password ? (
              <div className="text-red-500 italic text-xs">
                {errors.password}
              </div>
            ) : null}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
              placeholder="***********"
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.cpassword && errors.cpassword ? (
              <div className="text-red-500 italic text-xs">
                {errors.cpassword}
              </div>
            ) : null}
          </div>
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            type="submit"
          >
           {
              isLoading ? <Spinner/> : "Reset Password"
           }
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgortPage;
