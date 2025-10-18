import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          'http://localhost:5000/api/auth/logout',
          {},
          { withCredentials: true }
        );
        navigate('/auth/login');
      } catch (err) {
        console.error('Logout error:', err);
      }
    };

    logout();
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
