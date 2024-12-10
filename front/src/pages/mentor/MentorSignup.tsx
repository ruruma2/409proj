// src/pages/mentor/MentorSignup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupMentor } from '../../api/authApi';
import '../../App.css'; // Ensure consistent styling

const MentorSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New state variable
  const [areaOfInterest, setAreaOfInterest] = useState(''); // New state variable
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signupMentor(email, password, name, areaOfInterest); // Pass new fields
      navigate('/mentor/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center dark-blue-background"
      style={{ height: '100vh' }}
    >
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Mentor Signup</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSignup}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input 
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>

          {/* Username Field */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
              required 
            />
          </div>

          {/* Area of Interest Field */}
          <div className="mb-3">
            <label className="form-label">Area of Interest</label>
            <input 
              type="text"
              className="form-control"
              placeholder="Enter your area of interest"
              value={areaOfInterest}
              onChange={e => setAreaOfInterest(e.target.value)}
              required 
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mt-3">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default MentorSignup;
