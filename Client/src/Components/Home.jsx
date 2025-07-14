import React, { useEffect, useState } from 'react';
import './CSS/Home.css';
import { useParams } from 'react-router';

const Home = () => {
    const { id } = useParams();
    const symbols = [
        'AAPL', 'MSFT'
    ];

    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            const temp = {};
            for (const symbol of symbols) {
                try {
                    const res = await fetch(`http://localhost:8000/api/stock/${symbol}`);
                    const priceData = await res.json(); // <-- this is an object
                    temp[symbol] = priceData.price ?? 'N/A'; // <-- fix here
                } catch (err) {
                    console.error(`Error fetching ${symbol}:`, err);
                    temp[symbol] = 'Error';
                }
            }
            setPrices(temp);
            setLoading(false);
        };

        fetchPrices();
    }, []);

    const handleBuy = (symbol) => {
        const price = prices[symbol];
        const input = prompt(`Enter quantity for ${symbol}:`);
        const quantity = parseInt(input);

        if (isNaN(quantity) || quantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        const stockData = {
            name: symbol,
            price: Number(price),
            quantity: quantity
        };

        console.log("Buying stock:", stockData);
        fetch(`http://localhost:8000/buy/stock/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                symbol,
                price: Number(price),
                quantity
            })
        })
            .then((res) => res.json())
            .then((data) => alert(data.message))
            .catch((err) => console.log(err))
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
