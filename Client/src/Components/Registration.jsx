import React, { useState } from 'react'
import './CSS/Form.css'
import { useNavigate } from 'react-router';
const Registration = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState();
    const handleRegister = (e) => {
        e.preventDefault();
        fetch('https://backend-jdr1.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password,
                balance
            })
        })
            .then(res => res.json()) // Convert response to JSON
            .then(data => {
                alert(data.message);
                if(data.staus == true){
                    navigate(`/`)
                }
                
            })
            .catch((err) => console.log(err))
            
    }
    return (
        <div>
            <form method='POST'>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="balance">Balance:</label>
                    <input type="text" id="balance" name="balance" required value={balance} onChange={(e) => setBalance(e.target.value)} />
                </div>
                <button type="submit" onClick={handleRegister}>Register</button>
            </form>
        </div>
    )
}

export default Registration
