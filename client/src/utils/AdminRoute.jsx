import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = (localStorage.getItem("jwtAdmin") || "").trim();

  if (token === "") {
    return <Navigate to="/error" />;
  }
  return children;
};

export default AdminRoute;
