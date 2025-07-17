import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import useAuthUser from '../hooks/useAuthUser'; // adjust the path as needed
import NavBar from './NavBar';

const UserHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const { userId, authChecked } = useAuthUser();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!authChecked || !userId) return;
    console.log(userId)
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/history/${userId}`, {
          headers: { Authorization: token }
        });
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId, authChecked, token]);

  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Transaction History
        </Typography>

        {loading ? (
          <Grid container justifyContent="center" mt={5}>
            <CircularProgress />
          </Grid>
        ) : history.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No transaction history found.
          </Typography>
        ) : (
          history.map((entry, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }} elevation={3}>
              <Typography variant="h6" color={entry.action === 'buy' ? 'green' : 'red'}>
                {entry.action.toUpperCase()} - {entry.symbol}
              </Typography>
              <Typography>Quantity: {entry.quantity}</Typography>
              <Typography>Price per Share: ₹{entry.price}</Typography>
              <Typography>Total: ₹{entry.total}</Typography>
              {entry.action === 'sell' && (
                <Typography>Profit: ₹{entry.profit?.toFixed(2) || 0}</Typography>
              )}
              <Typography variant="caption">
                Time: {new Date(entry.timestamp).toLocaleString()}
              </Typography>
            </Paper>
          ))
        )}
      </Container>
    </>
  );
};

export default UserHistory;
