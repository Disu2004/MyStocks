import React, { useEffect, useState } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';

const MyStocks = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true); // set whethere it is still loading or not
  const [authChecked, setAuthChecked] = useState(false);
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUserId = async () => {
      if (!token) {
        navigate('/');
        return;
      }

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
        console.error("Failed to fetch user:", err);
        navigate('/');
      } finally {
        setAuthChecked(true); // Done checking auth
      }
    };

    fetchUserId();
  }, [token, navigate]);

  useEffect(() => {
    if (!userId) return;

    const fetchStocks = async () => {
      try {
        const res = await fetch(`https://backend-jdr1.onrender.com/mystocks/${userId}`, {
          headers: { Authorization: token }
        });
        const data = await res.json();
        setStocks(data || []);
      } catch (err) {
        console.error("Failed to fetch stocks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [userId, token]);

  const handleSell = async (stockName, availableQty) => {
    const input = window.prompt(`You own ${availableQty} shares of ${stockName}. How many would you like to sell?`);
    const quantityToSell = parseInt(input);

    if (isNaN(quantityToSell) || quantityToSell <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (quantityToSell > availableQty) {
      alert(`You can't sell more than you own (${availableQty}).`);
      return;
    }

    try {
      const res = await fetch(`https://backend-jdr1.onrender.com/delete/${stockName}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ quantity: quantityToSell })
      });

      const data = await res.json();
      alert(data.message);

      setStocks((prev) =>
        prev
          .map((s) => {
            if (s.name === stockName) {
              const remaining = s.quantity - quantityToSell;
              return remaining > 0 ? { ...s, quantity: remaining } : null;
            }
            return s;
          })
          .filter(Boolean)
      );
    } catch (err) {
      console.error("Failed to sell stock:", err);
    }
  };

  // Show full-screen loader until auth check finishes
  if (!authChecked) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Purchased Stocks
        </Typography>

        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : stocks.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No stocks found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {stocks.map((stock, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {stock.name}
                  </Typography>
                  <Typography>Price: ₹{stock.price}</Typography>
                  <Typography>Quantity: {stock.quantity}</Typography>
                  <Typography>Total: ₹{(stock.price * stock.quantity).toFixed(2)}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleSell(stock.name, stock.quantity)}
                  >
                    Sell This Stock
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default MyStocks;
