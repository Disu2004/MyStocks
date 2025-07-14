import React, { useEffect, useState } from 'react';
import './CSS/Profile.css';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams(); // Get the :id from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/userprofile/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        setLoading(false);
      });
  }, [id]);

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
