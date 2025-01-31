import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <h1>Administrador de tareas</h1>
      <nav>
        <Link to="/">Login</Link> | <Link to="/register">Registro</Link> | <Link to="/dashboard">Panel de control</Link>
      </nav>
    </header>
  );
}

export default Navbar;
