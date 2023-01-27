import React from "react";
import { Helmet } from "react-helmet";
import LOGO from '../logo.png'
const RHelmet = ({ title, content }) => {
  return (
    <Helmet>
      <link rel="icon" href={LOGO} />
      <title>{title}</title>
      {content && <meta name="description" content={content} />}
    </Helmet>
  );
};

export default RHelmet;
