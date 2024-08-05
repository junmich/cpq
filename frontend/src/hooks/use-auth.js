// src/hooks/useAuth.js
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token'); 
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
};

export default useAuth;