import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../app/feature/authSlice';

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user data is available in session storage (set by backend)
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      dispatch(setCredentials({ 
        user, 
        token: sessionStorage.getItem('token') || '' 
      }));
      
      // Navigate based on user role
      const role = user.role.toLowerCase();
      navigate(`/${role}-dashboard`);
      
      // Clean up session storage
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    } else {
      // If no user data, redirect to login
      navigate('/sign-in');
    }
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing Google authentication...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;