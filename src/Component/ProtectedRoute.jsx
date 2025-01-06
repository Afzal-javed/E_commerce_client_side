import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user:detail');
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
