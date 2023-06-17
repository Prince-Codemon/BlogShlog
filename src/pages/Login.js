import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { useLoginMutation } from "../store/services/userService";
import { toast } from "react-toastify";
import Spinner from '../components/Spinner'
import { loginUser } from "../store/slice/userSlice";
import { useDispatch } from "react-redux";
import RHelmet from "../components/Helmet";
const Login = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, result] = useLoginMutation();
  const { data, error, isLoading } = result;
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login({
        email: values.email,
        password: values.password,
      });
    },
    validationSchema: loginSchema,
  });
 
  useEffect(() => {
    if (data) {
      toast.success("Login Successful");
      navigate("/user/profile");
      localStorage.setItem("bloginuser", JSON.stringify(data.token));
      dispatch(loginUser(data))
    }
    if (error?.data) {
       toast.error(error.data.msg);
    }
  }, [data, error, navigate, dispatch]);


  return (
    <section className="text-gray-600 body-font ">
      <RHelmet title="Login" />
      <div className="container px-3 md:px-5 mx-auto flex items-center justify-center bg-white py-20">
        <form
          onSubmit={handleSubmit}
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg px-3 py-4 md:p-8 flex flex-col  w-full mt-10 md:mt-0 "
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Login
          </h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="john@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            { touched.email &&  errors.email   ? (
              <div className="text-red-500 text-xs italic">{errors.email}</div>
            ) : null}
          </div>
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
              placeholder="********"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="on"
              
            />
            {touched.password &&  errors.password  ? (
              <div className="text-red-500 text-xs italic">
                {errors.password}
              </div>
            ) : null}
          </div>
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            type="submit"
          >
            {
              isLoading ? ( <Spinner/>) : "Login"
            }
          </button>
          <div className="flex justify-between">
            <Link to={"/auth/register"} className="text-xs text-gray-500 mt-3 hover">
              Don't have an account?
            </Link>
            <Link to={"/auth/forgotpassword"} className="text-xs text-gray-500 mt-3">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
