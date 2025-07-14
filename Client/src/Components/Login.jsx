import React from 'react'
import './CSS/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                if (data.message === "Login Success" && data.id) {
                    navigate(`/home/${data.id}`);
                }
            })
            .catch((err) => console.log(err))
    }
    return (
        <div>
            <form method='GET'>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login
