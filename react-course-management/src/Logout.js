
import React, { useEffect } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom'; 

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await auth.signOut();
        console.log("Logged out successfully");
  
        navigate('/');
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
