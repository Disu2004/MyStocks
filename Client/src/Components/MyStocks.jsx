import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CSS/Home.css'; // optional styling

const MyStocks = () => {
  const { id } = useParams();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://backend-jdr1.onrender.com/mystocks/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setStocks(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleSell = (AAPL) =>{
      fetch(`http://localhost:8000/delete/${AAPL}/${id}` ,{
        method : 'DELETE'
      })
      .then((res)=>res.json())
      .then((data)=>alert(data.message))
  }

  return (
    <div className="stock-container">
      <h2>My Purchased Stocks</h2>
      {loading ? (
        <p>Loading stocks...</p>
      ) : stocks.length === 0 ? (
        <p>No stocks found.</p>
      ) : (
        <div className="stock-grid">
          {stocks.map((stock, index) => (
            <div className="stock-card" key={index}>
              <h3>{stock.name}</h3>
              <p>Price: ₹{stock.price}</p>
              <p>Quantity: {stock.quantity}</p>
              <p>Total: ₹{(stock.price * stock.quantity).toFixed(2)}</p>
              <button onClick={handleSell}>Sell This Stock</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStocks;
