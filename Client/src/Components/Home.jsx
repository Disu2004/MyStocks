import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import {jwtDecode} from 'jwt-decode';
import './CSS/Home.css';
import { useNavigate, useParams } from 'react-router';

const Home = () => {
  const navigate = useNavigate()
  // const { id } = useParams();
  const symbols = ['AAPL', 'MSFT'];
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const user = jwtDecode(token)
  const id = user.id;
  useEffect(() => {
    if (!token || token==null) {
      navigate('/');
      return;
    } 
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

    fetch(`https://backend-jdr1.onrender.com/buy/stock/${id}`, {
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

      {/* Converted Homepage Sections */}
      <section className="hero fade-in">
        <div className="hero-content">
          <h1>Trade Smarter, Not Harder</h1>
          <p>Experience the future of stock trading with real-time data, advanced analytics, and seamless execution.</p>
          <div className="hero-buttons">
            <a href="#" className="btn btn-primary btn-large">Start Trading</a>
            <a href="#" className="btn btn-secondary btn-large">Learn More</a>
          </div>
        </div>
      </section>


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
                <button onClick={() => handleBuy(symbol)}>
                  Buy This Stock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="market-overview">
        <div className="container">
          <h2 className="section-title">Market Overview</h2>
          <div className="market-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stat-title">S&amp;P 500</div>
              <div className="stat-value positive">4,567.89</div>
              <div className="stat-change positive">
                <i className="fas fa-arrow-up"></i> +23.45 (0.52%)
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-industry"></i>
              </div>
              <div className="stat-title">NASDAQ</div>
              <div className="stat-value positive">14,234.56</div>
              <div className="stat-change positive">
                <i className="fas fa-arrow-up"></i> +89.12 (0.63%)
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-building"></i>
              </div>
              <div className="stat-title">DOW JONES</div>
              <div className="stat-value negative">34,567.89</div>
              <div className="stat-change negative">
                <i className="fas fa-arrow-down"></i> -45.67 (0.13%)
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-title">VIX</div>
              <div className="stat-value">18.45</div>
              <div className="stat-change positive">
                <i className="fas fa-arrow-up"></i> +0.23 (1.26%)
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="top-stocks">
        <div className="container">
          <h2 className="section-title">Top Performers</h2>
          <div className="stocks-grid">

            <div className="stock-card">
              <div className="stock-header">
                <div>
                  <div className="stock-symbol">AAPL</div>
                  <div className="stock-name">Apple Inc.</div>
                </div>
                <div className="stock-price positive">$175.43</div>
              </div>
              <div className="stock-change positive">
                <i className="fas fa-arrow-up"></i> +2.14 (1.23%)
              </div>
            </div>

            <div className="stock-card">
              <div className="stock-header">
                <div>
                  <div className="stock-symbol">TSLA</div>
                  <div className="stock-name">Tesla Inc.</div>
                </div>
                <div className="stock-price positive">$248.52</div>
              </div>
              <div className="stock-change positive">
                <i className="fas fa-arrow-up"></i> +5.18 (2.13%)
              </div>
            </div>

            <div className="stock-card">
              <div className="stock-header">
                <div>
                  <div className="stock-symbol">GOOGL</div>
                  <div className="stock-name">Alphabet Inc.</div>
                </div>
                <div className="stock-price positive">$2,789.65</div>
              </div>
              <div className="stock-change positive">
                <i className="fas fa-arrow-up"></i> +22.34 (0.81%)
              </div>
            </div>

            <div className="stock-card">
              <div className="stock-header">
                <div>
                  <div className="stock-symbol">MSFT</div>
                  <div className="stock-name">Microsoft Corp.</div>
                </div>
                <div className="stock-price negative">$334.89</div>
              </div>
              <div className="stock-change negative">
                <i className="fas fa-arrow-down"></i> -1.02 (0.30%)
              </div>
            </div>

            <div className="stock-card">
              <div className="stock-header">
                <div>
                  <div className="stock-symbol">AMZN</div>
                  <div className="stock-name">Amazon.com Inc.</div>
                </div>
                <div className="stock-price positive">$3,234.78</div>
              </div>
              <div className="stock-change positive">
                <i className="fas fa-arrow-up"></i> +16.23 (0.50%)
              </div>
            </div>

            <div className="stock-card">
              <div className="stock-header">
                <div>
                  <div className="stock-symbol">NVDA</div>
                  <div className="stock-name">NVIDIA Corp.</div>
                </div>
                <div className="stock-price positive">$456.78</div>
              </div>
              <div className="stock-change positive">
                <i className="fas fa-arrow-up"></i> +8.92 (1.99%)
              </div>
            </div>

          </div>
        </div>
      </section>


      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose MyStocks?</h2>
          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="feature-title">Real-Time Trading</h3>
              <p className="feature-description">
                Execute trades instantly with real-time market data and lightning-fast order processing.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="feature-title">Secure &amp; Reliable</h3>
              <p className="feature-description">
                Your investments are protected with bank-level security and 24/7 monitoring.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3 className="feature-title">Advanced Analytics</h3>
              <p className="feature-description">
                Make informed decisions with comprehensive market analysis and trading tools.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3 className="feature-title">Mobile Trading</h3>
              <p className="feature-description">
                Trade on the go with our responsive mobile platform available 24/7.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3 className="feature-title">Educational Resources</h3>
              <p className="feature-description">
                Learn from experts with our comprehensive trading guides and market insights.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">
                Get help whenever you need it with our dedicated customer support team.
              </p>
            </div>

          </div>
        </div>
      </section>


      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Trading</h3>
            <ul>
              <li><a href="#">Stocks</a></li>
              <li><a href="#">Options</a></li>
              <li><a href="#">ETFs</a></li>
              <li><a href="#">Futures</a></li>
            </ul>
          </div>
          {/* Add more footer sections... */}
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 MyStocks. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
