import React, { useEffect } from 'react';
import { replace, useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://backend-jdr1.onrender.com/logout', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        localStorage.removeItem("accessToken"); // clear token if stored
        navigate('/',{replace:true});
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;