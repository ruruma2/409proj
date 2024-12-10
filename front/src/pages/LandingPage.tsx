// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Adjust the path based on your setup

const LandingPage: React.FC = () => {
  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center dark-blue-background"
      style={{ height: '100vh' }}
    >
      <h1 className="mb-4">Research Matching Platform</h1>
      <p className="text-center mb-4" style={{ maxWidth: '500px' }}>
        Connect mentors and students for impactful research opportunities.
        Discover projects, apply to research positions, and collaborate to create positive social outcomes.
      </p>
      <div className="d-flex gap-3">
        <div className="card p-4 card-custom" style={{ width: '18rem' }}>
          <h3 className="mb-3">Mentors</h3>
          <p>Find the best student talent for your research projects.</p>
          <div className="d-flex justify-content-between mt-3">
            <Link to="/mentor/login" className="btn btn-primary btn-sm">Login</Link>
            <Link to="/mentor/signup" className="btn btn-outline-primary btn-sm">Signup</Link>
          </div>
        </div>
        <div className="card p-4 card-custom" style={{ width: '18rem' }}>
          <h3 className="mb-3">Students</h3>
          <p>Explore unique research opportunities and gain valuable experience.</p>
          <div className="d-flex justify-content-between mt-3">
            <Link to="/student/login" className="btn btn-success btn-sm">Login</Link>
            <Link to="/student/signup" className="btn btn-outline-success btn-sm">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
