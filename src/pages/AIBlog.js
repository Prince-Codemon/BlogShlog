import React, { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import BlogSkelton from "../components/BlogSkelton";
import Editor from "../components/Editor";
import {
  useAiBlogMutation,
  useCreateBlogMutation,
  useGetCategoriesQuery,
} from "../store/services/blogService";
import { blogSchema } from "../schemas";
import { useFormik } from "formik";
import RHelmet from "../components/Helmet";
import { HiRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Spinner from "../components/Spinner";

const AIBlog = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [preImg, setPreImg] = useState("");
  const [image, setImage] = useState("");
  const [create, result] = useCreateBlogMutation();
  const { data, error, isLoading: loading } = result;
  const { data: categories } = useGetCategoriesQuery();
  const [getBlog, { data: blog, error: blogerr, isLoading }] =
    useAiBlogMutation();

  const createBlog = async () => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("desc", values.desc);
    formData.append("category", values.category);
    formData.append("content", content);
    formData.append("image", image);
    create(formData);
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
        if (!content) {
          return toast.info("Content is Required");
        }

        createBlog();
      },
    });

  

  //     toast.error(
  //       "Please enter a title or heading to generate content for your blog"
  //     );
  //     return;
  //   }
  //   if (title.length < 10) {
  //     toast.error(
  //       "Please enter a title or heading with more than 10 characters to generate content for your blog"
  //     );
  //     return;
  //   }
  //   try {
  //     setBlogContent(null);
  //     values.title = "";
  //     values.desc = "";
  //     values.category = "";
  //     const response = await openai.createCompletion({
  //       model: "text-davinci-002",
  //       prompt: `${title}, with title, metadesc max 200 char, content in object json format and content should be in html format with some styling like bold, italic and content should be complete and without spacing proper json format not in array `,
  //       temperature: 0,
  //       max_tokens: 1000,
  //     });
  //     if (!isJson(response.data.choices[0].text)) {
  //       toast.error("Something went wrong please try again");
  //       return;
  //     }
  //     setBlogContent(response.data.choices[0].text);
  //     generateImage(
  //       response.data.choices[0].text.split('","')[0].split('":"')[1]
  //     );
  //   } catch (err) {
  //       toast.error("Something went wrong please try again");
  //   } finally {
  //   }
  // };
  const generateContent = async () => {
    if (title === "") {
      toast.error(
        "Please enter a title or heading to generate content for your blog"
      );
      return;
    }
    if (title.length < 10) {
      toast.error(
        "Please enter a title or heading with more than 10 characters to generate content for your blog"
      );
      return;
    }
    try {
      values.title = "";
      values.desc = "";
      values.category = "";
      getBlog({ title });
    } catch (err) {
      toast.error("Something went wrong please try again");
    } finally {
    }
  };

  async function generateImage(imgTitle) {
    try {
      const image = await fetch(
        `https://source.unsplash.com/1600x900/?${imgTitle}`
        
      );
      const blob = await image.blob();
      const file = new File([blob], `${imgTitle}.jpg`, { type: blob.type });

      setPreImg(URL.createObjectURL(file));
      setImage(file);

      // image using ai
      // const image = await openai.createImage({
      //   prompt:  imgTitle ,
      //   n: 1,
      //   size: "512x512",
      // });
      // console.log(image.data.data[0].url)
      // setPreImg(image.data.url)
      // setImage(image.data.url)
    } catch (error) {
      toast.error("Something went wrong");
      return;
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      toast.success("Blog Created Successfully");
      navigate("/creator/dashboard");
      setContent("");
      setTitle("");
      setPreImg("");
      setImage("");
    }
    if (error) {
      toast.error("Something went wrong");
    }
  }, [data, error, navigate]);

  useEffect(() => {
    try {
      if (blog?.blog && !values.title && !values.desc && !values.category) {
        const data = blog.blog;
        values.title = data.title;
        values.desc = data.metadesc;
        setContent(data.content);
        generateImage(values.title);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [blog?.blog, values]);

  useEffect(() => {
    if(blogerr?.status === 429){
      toast.error(blogerr.data.msg)
      return
    }
    if (blogerr) {
      toast.error('Please Wait or Retry');
      return
    }
  }, [blogerr]);

  return (
    <section className="flex flex-col items-center justify-center py-10 md:px-2 px-0 md:min-h-screen min-h-[70vh]">
      <RHelmet title="Generate Blog Using AI" />
      <>
        <h1 className="text-5xl text-gray-900 font-extrabold font-mono text-center mb-2">
          Generate Blog Using AI
        </h1>
        <div className="flex flex-col items-center justify-center w-full mb-3">
          <input
            type="text"
            required
            placeholder="Enter a title or heading"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-full md:w-1/2 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-base px-4 py-2 mb-4"
          />
          <p className="text-gray-500 text-sm mb-4">
            <b>Example:</b> Write a blog on Global Warming
          </p>
          <p className="text-gray-500 text-sm mb-4">
            <b>Note:</b> Max request per day is 10
          </p>
          <button
            onClick={generateContent}
            className="text-base bg-indigo-500 px-4 py-2 rounded text-white text-center mb-2"
            disabled={isLoading}
          >
            {isLoading ? "Generating Content..." : "Generate Content"}
          </button>
        </div>
      </>
      {isLoading && <BlogSkelton />}
      { !isLoading && blog?.blog &&
        (<div
          div
          className=" 
            flex md:flex-row flex-col items-center justify-center w-full  mt-5 px-4
            "
        >
          <div className="flex md:w-1/2 w-full  flex-col items-start justify-start  ">
            <h1 className="text-base bg-indigo-500 p-2 rounded text-white text-center mb-10">
              Write Content
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start justify-center w-full"
            >
              <div className="relative mb-4 md:md:w-3/4 w-full ">
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
                  required={!preImg}
                  className="w-full border border-gray-300   text-sm outline-none leading-8 transition-colors duration-200 ease-in-out placeholder-gray-400 text-gray-400 "
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreImg(URL.createObjectURL(e.target.files[0]));
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
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none"
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
              <div className="relative mb-4 md:md:w-3/4 w-full ">
                <label
                  htmlFor="content"
                  className="leading-7 text-sm text-gray-600"
                >
                  Content
                </label>
                <Editor
                  content={content}
                  setContent={setContent}
                  readOnly={false}
                />
                {errors.content && touched.content && (
                  <p className="text-red-500 text-xs">{errors.content}</p>
                )}
              </div>
              <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                disabled={loading}
              >
                {loading ? <Spinner /> : "Submit"}
              </button>
            </form>
          </div>
          <div className="flex md:w-1/2 w-full items-start justify-start flex-col ">
            <h1 className="text-base bg-indigo-500 p-2 rounded text-white text-center ">
              Preview
            </h1>
            <div className="container mx-auto flex flex-col px-5 pb-20 pt-10 justify-center items-center relative">
              {preImg ? (
                <img
                  className="lg:w-2/3 md:w-10/12 w-full aspect-video  mb-10 object-cover object-center rounded"
                  alt="hero"
                  src={preImg}
                />
              ) : (
                <Skeleton
                  width={280}
                  height={200}
                  className="lg:w-2/3 md:w-10/12 w-full aspect-video  mb-10 object-cover object-center rounded"
                />
              )}

              <button
                className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg absolute
                md:top-0 md:right-10 top-0 right-0 z-10"
                onClick={() => {
                  setPreImg(null);
                  setImage(null);
                  generateImage(values.title);
                }}
              >
                <HiRefresh />
              </button>
              <div className="w-full md:w-2/3 flex flex-col mb-16 blog ">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  {values.title ? values.title : "Blog Title"}
                </h1>
                {content ? (
                  <Editor content={content} readOnly={true} />
                ) : (
                  <p className="leading-relaxed mb-8"> Blog Content</p>
                )}
              </div>
            </div>
          </div>
        </div>)
      }
    </section>
  );
};

export default AIBlog;
