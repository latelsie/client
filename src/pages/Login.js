import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

       
        if (username === 'admin' && password === 'admin') {
            const userData = { username, role: 'admin' };
            onLogin(userData);
            toast.success('Login successful! Welcome Admin.');
            navigate('/admin'); 
        } else if (username === 'cashier' && password === 'cashier') {
            const userData = { username, role: 'cashier' };
            onLogin(userData);
            toast.success('Login successful! Welcome Cashier.');
            navigate('/'); 
        } else {
            toast.error('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <center><h2>Login Page</h2></center>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
