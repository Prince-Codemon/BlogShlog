import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RHelmet from "../components/Helmet";
import BlogSkelton from "../components/BlogSkelton";
import { useGetBlogQuery } from "../store/services/blogService";
import { useGetUserFunctionMutation } from "../store/services/userService";
import formatDate from "../utils/date";
import Editor from "../components/Editor";
import { WhatsappShareButton, WhatsappIcon, 
  LinkedinIcon, LinkedinShareButton,
   TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, FacebookIcon, FacebookShareButton } from "react-share";

const Blog = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const { data, isFetching } = useGetBlogQuery(id);
  const { title, content, image, createdAt, creator, desc } = data?.blog || {};
  const [getUser, result] = useGetUserFunctionMutation();
  const { data: userData } = result;

  useEffect(() => {
    if (creator) {
      getUser(creator);
    }
  }, [data?.blog, creator, getUser]);

  return (
    <section className="text-gray-600 body-font">
      {title && (
        <RHelmet
          title={title}
          content={desc}
          image={image}
          creator={userData?.user?.username}
        />
      )}
      {isFetching ? (
        <BlogSkelton />
      ) : (
        <div className="container mx-auto flex flex-col px-5 py-20 justify-center items-center">
          <img
            className="lg:w-2/3 md:w-10/12 w-full aspect-video mb-10 object-cover object-center rounded"
            alt={title}
            src={image}
            loading="lazy"
          />
          <div className="w-full md:w-2/3 flex flex-col mb-16 blog ">
            <div className="w-full flex justify-between items-center">
              {userData?.user && (
                <Link to={`/user/${creator}`}>
                  <img
                    className="w-10 h-10 rounded-sm shadow-md"
                    src={userData?.user?.profile}
                    alt={userData?.user?.username}
                  />

                  <h2 className="text-sm text-indigo-500 tracking-widest font-medium title-font mb-1 capitalize">
                    {userData?.user?.username}
                  </h2>
                </Link>
              )}
              <h1 className="text-sm text-indigo-500 tracking-widest font-medium title-font mb-1">
                {formatDate(createdAt)}
              </h1>
            </div>
            <div className="w-full flex justify-between items-center my-2">
              <div className="flex items-center">
                <WhatsappShareButton
                  url={`${process.env.REACT_APP_BASE_URL}/blog/${id}`}
                  title={title}
                  separator=" "
                >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <TwitterShareButton
                  url={`${process.env.REACT_APP_BASE_URL}/blog/${id}`}
                  title={title}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <FacebookShareButton
                  url={`${process.env.REACT_APP_BASE_URL}/blog/${id}`}
                  title={title}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <LinkedinShareButton
                  url={`${process.env.REACT_APP_BASE_URL}/blog/${id}`}
                  title={title}
                 
                >
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
                <TelegramShareButton
                  url={`${process.env.REACT_APP_BASE_URL}/blog/${id}`}
                  title={title}
                >
                  <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
                
                {/* <EmailShareButton
                  url={`${process.env.REACT_APP_BASE_URL}/blog/${id}`}
                  title={title}
                >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton> */}

              </div>
            </div>

            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 capitalize">
              {title}
            </h1>

            <Editor content={content} readOnly={true} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
