import React, { useEffect  } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotMutation } from "../store/services/userService";
import Spinner from '../components/Spinner'
const ForgotPassword = () => {
  const [forgotPassword, result] = useForgotMutation();
  
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      forgotPassword({email:values.email});
    },
  })
  
  const { data, error, isLoading } = result;
  useEffect(() => {
    if (data) {
      toast.success(data?.msg);
    }
    if (error) {
      toast.error(error.data.msg);
    }
  }, [data, error]);



  return (
    <section className="text-gray-600 body-font">
      
        <div className="container px-3 md:px-5  mx-auto flex items-center justify-center my-20">
          <form
            onSubmit={handleSubmit}
            className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg px-3 py-4 md:p-8 flex flex-col  w-full mt-10 md:mt-0 "
          >
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Enter your registered email address
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
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
              {touched.email && errors.email ? (
                <div className="text-red-500 italic text-xs">
                  {errors.email}
                </div>
              ) : null}
            </div>

            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit"
            >
             {
                isLoading ? <Spinner/> : "Send"
             }
            </button>
            <div className="flex justify-center">
              <Link
                to={"/auth/login"}
                className="text-xs text-gray-500 mt-3 hover"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
    
    </section>
  );
};

export default ForgotPassword;
