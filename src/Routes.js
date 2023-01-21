import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const User = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  return token ? children : <Navigate to={"/auth/login"} />;
};

export const Creator = ({ children }) => {
  const { token, type } = useSelector((state) => state.user);
  return token && type !== "user" ? children : <Navigate to={"/user/profile"} />;
};

export const NotLogin = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  return !token ? children : <Navigate to="/user/profile" />;
};
