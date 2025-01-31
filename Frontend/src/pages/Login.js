import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        alert("Login failed. No token received.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <div className="user-frame">
    <form onSubmit={handleLogin}>
      <br></br><br></br>
      <h1>Inicio de sesion</h1>
      <br></br> <br></br>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <br></br><br></br>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <br></br><br></br>
      <button type="submit">Login</button>
      <br></br><br></br>
    </form>
    </div>
  );
}

export default Login;

