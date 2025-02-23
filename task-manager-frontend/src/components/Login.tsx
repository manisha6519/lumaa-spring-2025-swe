import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';  

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  

  const handleLogin = async () => {
    try {
      const { data } = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', data.token);
      navigate('/tasks');  
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
