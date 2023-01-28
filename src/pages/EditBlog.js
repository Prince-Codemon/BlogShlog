import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import { blogSchema } from "../schemas";
import {
  useUpdateBlogMutation,
  useGetBlogQuery,
  useGetCategoriesQuery,
} from "../store/services/blogService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import RHelmet from "../components/Helmet";
import Editor from "../components/Editor";

const EditBlog = () => {
  const { id } = useParams();
  const { data: categories } = useGetCategoriesQuery();
  const { data } = useGetBlogQuery(id);
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [preImg, setPreImg] = useState("");
  const [image, setImage] = useState("");
  const [update, result] = useUpdateBlogMutation();
  const { isLoading } = result;

  const updateBlog = async () => {
    const formData = new FormData();
    image && formData.append("image", image);
    formData.append("title", values.title);
    formData.append("desc", values.desc);
    formData.append("category", values.category);
    formData.append("content", content);
    formData.append("id", id);
    update(formData);
  };
  const { values, touched, handleBlur, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues: {
        title: "",
        desc: "",
        category: "",
      },
      validationSchema: blogSchema,
      onSubmit: (values) => {
        updateBlog();
      },
    });

  useEffect(() => {
    setContent(data?.blog?.content);
    setPreImg(
      data?.blog?.image 
    );
    if (
      data?.blog?.title &&
      !values.title &&
      !values.desc &&
      !values.category
    ) {
      values.title = data?.blog?.title;
      values.desc = data?.blog?.desc;
      values.category = data?.blog?.category;
    }
  }, [data?.blog, values]);

  useEffect(() => {
    const fileReader = async () => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        setPreImg(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    };

    image && fileReader();
  }, [image]);

  useEffect(() => {
    if (result.data) {
      toast.success("Blog updated successfully");
      navigate("/creator/dashboard");
    }
    if (result.error) {
      toast.error("Something went wrong");
      toast.error(result.error);
    }
  }, [result, navigate]);

  return (
    <section className="flex flex-col md:flex-row  items-start justify-start py-10 md:px-20 px-2">
      <RHelmet title="Edit Blog" />
      {data?.blog ? (
        <>
          <div className="flex md:w-1/2 w-full  flex-col items-start justify-start my-5 ">
            <h1 className="text-base bg-indigo-500 p-2 rounded text-white text-center mb-2">
              Write Content
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start justify-center w-full"
            >
              <div className="relative mb-4 ">
                <label
                  htmlFor="photo"
                  className="leading-7 text-sm text-gray-600"
                >
                  Change photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  className="w-full border border-gray-300   text-sm outline-none leading-8 transition-colors duration-200 ease-in-out placeholder-gray-400 text-gray-400 "
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </div>
              <div className="relative mb-4 md:md:w-3/4 w-full ">
                <label
                  htmlFor="title"
                  className="leading-7 text-sm text-gray-600"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out capitalize"
                  placeholder="My Blog Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-xs">{errors.title}</p>
                )}
              </div>
              <div className="relative mb-4 md:w-3/4 w-full">
                <label
                  htmlFor="desc"
                  className="leading-7 text-sm text-gray-600"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  id="desc"
                  name="desc"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none capitalize"
                  placeholder="Meta Description"
                  value={values.desc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.desc && touched.desc && (
                  <p className="text-red-500 text-xs">{errors.desc}</p>
                )}
              </div>
              <div className="relative mb-4 md:w-3/4 w-full">
                <label
                  htmlFor="category"
                  className="leading-7 text-sm text-gray-600"
                >
                  Category
                </label>
                <select
                  type="text"
                  id="category"
                  name="category"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Select Category"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories?.categories?.map((category) => (
                    <option key={category._id} value={category.category}>
                      {category.category}
                    </option>
                  ))}
                </select>
                {errors.category && touched.category && (
                  <p className="text-red-500 text-xs">{errors.category}</p>
                )}
              </div>
              <div className="relative mb-4 md:w-3/4 w-full">
                <label
                  htmlFor="content"
                  className="leading-7 text-sm text-gray-600"
                >
                  Content
                </label>

                <Editor content={content} setContent={setContent} readOnly={false}  />
                {errors.content && touched.content && (
                  <p className="text-red-500 text-xs">{errors.content}</p>
                )}
              </div>
              <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Update"}
              </button>
            </form>
          </div>
          <div className="flex md:w-1/2 w-full flex-col items-start justify-start">
            <h2 className="text-base bg-indigo-500 p-2 rounded text-white text-center">
              Preview
            </h2>
            <div className="container mx-auto flex flex-col px-5 py-20 justify-center items-center">
              <img
                className="lg:w-2/3 md:w-10/12 w-full aspect-video  mb-10 object-cover object-center rounded"
                alt="hero"
                src={preImg ? preImg : "https://dummyimage.com/720x600"}
              />
              <div className="w-full md:w-2/3 flex flex-col mb-16 blog">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 capitalize">
                  {values.title}
                </h1>

                <Editor content={content} readOnly={true} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default EditBlog;
