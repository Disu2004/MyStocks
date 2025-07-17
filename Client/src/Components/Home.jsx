import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { jwtDecode } from 'jwt-decode';
import './CSS/Home.css';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();
  const symbols = ['AAPL', 'MSFT', 'TSLA', 'GOOGL', 'AMZN', 'NVDA'];
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    AOS.init({ duration: 1500, once: false });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate('/');
      return;
    }

    try {
      const user = jwtDecode(token);
      setUserId(user.id);
    } catch (error) {
      console.error("Invalid token:", error);
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    const fetchPrices = async () => {
      const temp = {};
      for (const symbol of symbols) {
        try {
          const res = await fetch(`${API_URL}/api/stock/${symbol}`);
          const priceData = await res.json();
          temp[symbol] = priceData.price ?? 'N/A';
        } catch (err) {
          console.error(`Error fetching ${symbol}:`, err);
          temp[symbol] = 'Error';
        }
      }
      setPrices(temp);
      setLoading(false);
    };

    fetchPrices();
  }, [userId]);

  const handleBuy = (symbol) => {
    const price = prices[symbol];
    const input = prompt(`Enter quantity for ${symbol}:`);
    const quantity = parseInt(input);

    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    fetch(`${API_URL}/buy/stock/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol, price: Number(price), quantity })
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <section className="hero fade-in" data-aos="fade-up">
        <div className="hero-content">
          <h1>Trade Smarter, Not Harder</h1>
          <p>Experience the future of stock trading with real-time data, advanced analytics, and seamless execution.</p>
          <div className="hero-buttons">
            <a href="/stocks" className="btn btn-primary btn-large">Start Trading</a>
            <a href="/about" className="btn btn-secondary btn-large">Learn More</a>
          </div>
        </div>
      </section>

      {/* Live Stock Prices */}
      <div className="home-container" data-aos="fade-up">
        <h2>Live Stock Prices</h2>
        {loading ? (
          <p>Loading stock data...</p>
        ) : (
          <div className="stock-grid">
            {symbols.map((symbol, i) => (
              <div key={symbol} className="stock-card" data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="stock-symbol">{symbol}</div>
                <div className="stock-price">₹ {prices[symbol]}</div>
                <button onClick={() => handleBuy(symbol)}>Buy This Stock</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Market Overview */}
      <section className="market-overview" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">Market Overview</h2>
          <div className="market-stats">
            {[
              { title: "S&P 500", value: "4,567.89", change: "+23.45 (0.52%)", positive: true },
              { title: "NASDAQ", value: "14,234.56", change: "+89.12 (0.63%)", positive: true },
              { title: "DOW JONES", value: "34,567.89", change: "-45.67 (0.13%)", positive: false },
              { title: "VIX", value: "18.45", change: "+0.23 (1.26%)", positive: true }
            ].map((item, i) => (
              <div key={i} className="stat-card" data-aos="flip-left" data-aos-delay={i * 100}>
                <div className="stat-icon"><i className={`fas ${item.positive ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i></div>
                <div className="stat-title">{item.title}</div>
                <div className={`stat-value ${item.positive ? 'positive' : 'negative'}`}>{item.value}</div>
                <div className={`stat-change ${item.positive ? 'positive' : 'negative'}`}>
                  <i className={`fas ${item.positive ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i> {item.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="top-stocks" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">Top Performers</h2>
          <div className="stocks-grid">
            {[
              { symbol: 'AAPL', name: 'Apple Inc.', price: '$175.43', change: '+2.14 (1.23%)', positive: true },
              { symbol: 'TSLA', name: 'Tesla Inc.', price: '$248.52', change: '+5.18 (2.13%)', positive: true },
              { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$2,789.65', change: '+22.34 (0.81%)', positive: true },
              { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$334.89', change: '-1.02 (0.30%)', positive: false },
              { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '$3,234.78', change: '+16.23 (0.50%)', positive: true },
              { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$456.78', change: '+8.92 (1.99%)', positive: true },
            ].map((stock, i) => (
              <div key={i} className="stock-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="stock-header">
                  <div>
                    <div className="stock-symbol">{stock.symbol}</div>
                    <div className="stock-name">{stock.name}</div>
                  </div>
                  <div className={`stock-price ${stock.positive ? 'positive' : 'negative'}`}>{stock.price}</div>
                </div>
                <div className={`stock-change ${stock.positive ? 'positive' : 'negative'}`}>
                  <i className={`fas ${stock.positive ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i> {stock.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">Why Choose MyStocks?</h2>
          <div className="features-grid">
            {[
              { icon: 'fa-bolt', title: 'Real-Time Trading', desc: 'Execute trades instantly with real-time market data and lightning-fast order processing.' },
              { icon: 'fa-shield-alt', title: 'Secure & Reliable', desc: 'Your investments are protected with bank-level security and 24/7 monitoring.' },
              { icon: 'fa-chart-bar', title: 'Advanced Analytics', desc: 'Make informed decisions with comprehensive market analysis and trading tools.' },
              { icon: 'fa-mobile-alt', title: 'Mobile Trading', desc: 'Trade on the go with our responsive mobile platform available 24/7.' },
              { icon: 'fa-graduation-cap', title: 'Educational Resources', desc: 'Learn from experts with our comprehensive trading guides and market insights.' },
              { icon: 'fa-headset', title: '24/7 Support', desc: 'Get help whenever you need it with our dedicated customer support team.' },
            ].map((feature, i) => (
              <div key={i} className="feature-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="feature-icon"><i className={`fas ${feature.icon}`}></i></div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Home;
