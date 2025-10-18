import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoutes = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = loading, true/false = result

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/checkAuth', {
          withCredentials: true,
        });
        setIsAuth(res.data.authenticated);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <div>Loading...</div>; // Still checking
  if (!isAuth) return <Navigate to="/auth/login" replace />; // Not authenticated

  return children; 
};

export default ProtectedRoutes;
