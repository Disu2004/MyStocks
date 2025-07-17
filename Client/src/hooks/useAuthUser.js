import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const useAuthUser = () => {
  const [userId, setUserId] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate('/');
      return;
    }

    const fetchUserId = async () => {
      try {
        const res = await fetch("https://backend-jdr1.onrender.com/getuser", {
          headers: { Authorization: token }
        });

        const data = await res.json();

        if (data?.user?.id) {
          setUserId(data.user.id);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error("User fetch error:", err);
        navigate('/');
      } finally {
        setAuthChecked(true);
      }
    };

    fetchUserId();
  }, [navigate]);

  return { userId, authChecked };
};

export default useAuthUser;
