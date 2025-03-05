import React from 'react';  // ✅ Add this line
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PrivateRoutes() {
  const { auth } = useAuth();
  console.log({ auth });

  if (auth === undefined) return <p>Loading...</p>;

  return auth ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default PrivateRoutes;
