import React from "react";
// The import below should be updated to match your Router component
import Routes from "./App";
import DynamicSitemap from "react-dynamic-sitemap";

export default function Sitemap(props) {
  return <DynamicSitemap routes={Routes} prettify={true} {...props} />;
}
