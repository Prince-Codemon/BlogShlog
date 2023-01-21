import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../schemas";
import { useRegisterMutation } from "../store/services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
const Register = () => {
  const navigate = useNavigate();
  const [register, result] = useRegisterMutation();
  const { data, error, isLoading } = result;
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmpassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: (values) => {
        register({
          email: values.email,
          password: values.password,
        });
      },
    });
  useEffect(() => {
    if (data) {
      toast.success("Registration Successful");
      navigate("/auth/login");
    }
    if (error?.data) {
      toast.error(error.data.msg);
    }
  }, [data, error, navigate]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-3 md:px-5 mx-auto flex items-center justify-center my-20">
        <form
          onSubmit={handleSubmit}
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg px-3 py-4 md:p-8 flex flex-col  w-full mt-10 md:mt-0 "
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Register
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
              placeholder="john@example"
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
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
              required
              placeholder="********"
              value={values.password}
              onChange={handleChange}
              autoComplete="on"
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <div className="text-red-500 text-xs italic">
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
              name="confirmpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="********"
              value={values.confirmpassword}
              onChange={handleChange}
              autoComplete="on"
              onBlur={handleBlur}
            />
            {errors.confirmpassword && touched.confirmpassword ? (
              <div className="text-red-500 text-xs italic">
                {errors.confirmpassword}
              </div>
            ) : null}
          </div>
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            type="submit"
          >
            {isLoading ? <Spinner /> : "Register"}
          </button>
          <div className="flex justify-center">
            <Link
              to={"/auth/login"}
              className="text-xs text-gray-500 mt-3 hover"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
