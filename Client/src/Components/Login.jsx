import React, { useState } from 'react';
import './CSS/Form.css';
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const API_URL = import.meta.env.VITE_API_URL;

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                if (data.message === "Login Success" && data.id && data.accessToken) {
                    localStorage.setItem("accessToken", data.accessToken);
                    navigate('/home');
                }
            })
            .catch((err) => console.log("Login error:", err));
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>

            <div className="register-prompt">
                <p style={{color:"black"}}>
                    Don't have an account?{' '}
                    <span className="register-link" onClick={() => navigate('/register')}>
                        Register here
                    </span>
                </p>
            </div>

        </div>
    );
};

export default Login;
