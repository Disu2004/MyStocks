import React, { useEffect, useState } from 'react';
import './CSS/Home.css';

const Home = () => {
  const symbols = ['AAPL', 'MSFT'];
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("accessToken");

  // ✅ Fetch user ID once and store it
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch("https://backend-jdr1.onrender.com/getuser", {
          method: "GET",
          headers: {
            "Authorization": token,
          },
        });

        const data = await res.json();
        console.log("Fetched user:", data);
        if (data.user?.id) setUserId(data.user.id);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // ✅ Fetch stock prices
  useEffect(() => {
    const fetchPrices = async () => {
      const temp = {};
      for (const symbol of symbols) {
        try {
          const res = await fetch(`https://backend-jdr1.onrender.com/api/stock/${symbol}`);
          const priceData = await res.json();
          temp[symbol] = priceData.price ?? 'N/A';
        } catch (err) {
          console.error(`Error fetching ${symbol}:`, err);
          temp[symbol] = 'Error';
        }
      }
      setPrices(temp);
    };

    fetchPrices();
  }, []);

  // ✅ Buy stock
  const handleBuy = async (symbol) => {
    if (!userId) {
      alert("User ID not found. Please log in.");
      return;
    }

    const price = prices[symbol];
    const input = prompt(`Enter quantity for ${symbol}:`);
    const quantity = parseInt(input);

    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const stockData = {
      symbol,
      price: Number(price),
      quantity,
    };

    console.log("Buying stock:", stockData);

    try {
      const res = await fetch(`https://backend-jdr1.onrender.com/buy/stock/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(stockData)
      });

      const data = await res.json();
      alert(data.message || "Stock purchase completed");
    } catch (err) {
      console.error("Error during stock purchase:", err);
      alert("Failed to buy stock.");
    }
  };

  return (
    <div className="home-container">
      <h2>Live Stock Prices</h2>
      {loading ? (
        <p>Loading stock data...</p>
      ) : (
        <div className="stock-grid">
          {symbols.map(symbol => (
            <div key={symbol} className="stock-card">
              <div className="stock-symbol">{symbol}</div>
              <div className="stock-price">₹ {prices[symbol]}</div>
              <button
                style={{ backgroundColor: "green", color: "white" }}
                onClick={() => handleBuy(symbol)}
              >
                Buy This Stock
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
