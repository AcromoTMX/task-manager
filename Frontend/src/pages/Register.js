import React, { useState } from 'react';
import api from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { name, email, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert("Registrado exitosamente, ya puede iniciar sesion.");
        navigate('/login');
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering.");
    }
  };

  return (
    <div className="user-frame">
    <form onSubmit={handleRegister}>
      <br></br> <br></br>
      <h1>Registrar usuario</h1>
      <br></br> <br></br>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <br></br> <br></br>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <br></br> <br></br>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <br></br> <br></br>
      <button type="submit">Register</button>
      <br></br> <br></br>
    </form>
    </div>
  );
}

export default Register;
