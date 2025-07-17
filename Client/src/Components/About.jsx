import React from 'react';
import './CSS/About.css';
import NavBar from './NavBar';

const About = () => {
    return (
        <>
            <NavBar />
            <section className="about-page">
                <div className="about-container">
                    <h2 className="about-title">About MyStocks</h2>
                    <p className="about-intro">
                        MyStocks is a modern and powerful stock trading platform that enables users to monitor markets,
                        track performance, and make informed investment decisions in real-time.
                    </p>

                    <div className="about-grid">
                        <div className="about-card">
                            <h3>🚀 Mission</h3>
                            <p>
                                To empower individuals by providing access to secure, fast, and reliable trading tools while delivering market transparency and insights.
                            </p>
                        </div>
                        <div className="about-card">
                            <h3>🔍 Vision</h3>
                            <p>
                                To become the most trusted digital stock trading platform, offering cutting-edge analytics and personalized experiences for every investor.
                            </p>
                        </div>
                        <div className="about-card">
                            <h3>💡 Why Choose Us?</h3>
                            <ul>
                                <li>Real-time stock data & alerts</li>
                                <li>Advanced analytical tools</li>
                                <li>Bank-level security</li>
                                <li>Dedicated 24/7 support</li>
                                <li>Educational resources for every investor level</li>
                            </ul>
                        </div>
                    </div>

                    {/* Made by credits */}
                    <div className="about-credits">
                        <h4>Made By:</h4>
                        <ul>
                            <li>Dishant</li>
                            <li>Dhruvi</li>
                            <li>Janinam</li>
                            <li>Nisarga</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
