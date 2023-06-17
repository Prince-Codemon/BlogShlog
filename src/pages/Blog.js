import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RHelmet from "../components/Helmet";
import BlogSkelton from "../components/BlogSkelton";
import { useGetBlogQuery } from "../store/services/blogService";
import formatDate from "../utils/date";
import Editor from "../components/Editor";
import { WhatsappShareButton, WhatsappIcon, 
  LinkedinIcon, LinkedinShareButton,
   TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, FacebookIcon, FacebookShareButton } from "react-share";

const Blog = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const navigate = useNavigate()
  const { data, isFetching, error } = useGetBlogQuery(id);
  const { title, content, image, createdAt, creator, desc } = data?.blog || {};
  if(error){
    navigate("/404");
  }
  
  return (
    <section className="text-gray-600 body-font">
      {title && (
        <RHelmet
          title={title}
          content={desc}
          image={image}
          creator={creator?.username}
        />
      )}
      {isFetching ? (
        <BlogSkelton />
      ) : (
        <div className="container mx-auto bg-white flex flex-col px-5 py-20 justify-center items-center">
          <img
            className="lg:w-2/3 md:w-10/12 w-full aspect-video mb-10 object-cover object-center rounded"
            alt={title}
            src={image}
            loading="lazy"
          />
          <div className="w-full md:w-2/3 flex flex-col mb-16 blog ">
            <div className="w-full flex justify-between items-center">
              {creator && (
                <Link to={`/user/${creator?._id}`}>
                  <img
                    className="w-10 h-10 rounded-sm shadow-md"
                    src={creator?.profile}
                    alt={creator?.username}
                  />

                  <h2 className="text-sm text-indigo-500 tracking-widest font-medium title-font mb-1 capitalize">
                    {creator?.username}
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
