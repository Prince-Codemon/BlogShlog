import React from "react";
import { Helmet } from "react-helmet";
import LOGO from "../logo.png";
const RHelmet = ({ title, content, image, creator }) => {
  return (
    <Helmet>
      <link rel="icon" href={LOGO} />
      <title>{title}</title>
      {content && <meta name="description" content={content} />}
      {image && <meta property="og:image" content={image} />}
      {creator && <meta property="og:creator" content={creator} />}
      {creator && <meta name="author" content={creator} />}
      <meta charset="UTF-8"/>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* <meta http-equiv="X-UA-Compatible" content="ie=edge" /> */}
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={content} />
      <meta property="og:site_name" content="BlogShlog" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:article:author" content={creator} />
      <meta property="og:article:section" content="Blog" />
      <meta property="og:article:tag" content="Blog" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@blogshlog" />
      <meta name="twitter:creator" content="@blogshlog" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={content} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={creator} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={content} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={process.env.REACT_APP_BASE_URL} />
      <meta property="og:site_name" content="BlogShlog" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:article:author" content={creator} />
      <meta property="og:article:section" content="Blog" />
      <meta property="og:article:tag" content="Blog" />
    </Helmet>
  );
};

export default RHelmet;
