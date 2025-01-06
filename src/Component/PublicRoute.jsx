import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
    const user=localStorage.getItem('user:detail');

  return user ? <Navigate to="/" /> : children;
};

export default PublicRoute;
