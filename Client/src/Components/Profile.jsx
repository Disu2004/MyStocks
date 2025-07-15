import React, { useEffect, useState } from 'react';
import './CSS/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setLoading(false);
          return;
        }
        console.log(token)

        const res = await fetch("https://backend-jdr1.onrender.com/getuser", {
          method: "GET",
          headers: {
            "Authorization": token,
          },
        });

        const data = await res.json();
        console.log(data)
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="profile-container">Loading...</div>;

  if (!user || user.message === "User not found") {
    return <div className="profile-container">User not found.</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Balance:</strong> ₹{user.balance?.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Profile;
