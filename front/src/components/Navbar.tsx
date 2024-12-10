// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const Navbar: React.FC = () => {
  return (
    <nav className="navbar-custom d-flex align-items-center">
      <Link to="/" className="navbar-brand">Home</Link>
      <div className="ml-auto">
        <Link to="/mentor/dashboard">Mentor Dashboard</Link>
        <Link to="/student/dashboard">Student Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
