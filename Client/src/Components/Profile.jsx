import React, { useEffect, useState } from 'react';
import './CSS/Profile.css';
import NavBar from './NavBar';
import Footer from './Footer';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetch("https://backend-jdr1.onrender.com/getuser", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAddBalance = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch("https://backend-jdr1.onrender.com/addbalance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ amount: parseFloat(amount) }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      fetchProfile(); // refresh balance
      setAmount('');
    } else {
      alert(data.message || "Failed to add balance");
    }
  };

  if (loading) return <div className="profile-container">Loading...</div>;
  if (!user) return <div className="profile-container">User not found.</div>;

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <h2>User Profile</h2>
        <div className="profile-card">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Balance:</strong> ₹{user.balance?.toFixed(2)}</p>

          <div className="add-balance">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
            <button onClick={handleAddBalance}>Add Balance</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
