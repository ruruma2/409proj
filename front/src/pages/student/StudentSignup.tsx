// src/pages/student/StudentSignup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupStudent } from '../../api/authApi';
import '../../App.css';

const StudentSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New state variable
  const [year, setYear] = useState('Freshman'); // Default value
  const [major, setMajor] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signupStudent(email, password, year, major, name); // Pass username
      navigate('/student/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center dark-blue-background"
      style={{ height: '100vh' }}
    >
      <div className="card p-3 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Student Signup</h2>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Name Field */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Year Field */}
          <div className="mb-3">
            <label className="form-label">Year</label>
            <select
              className="form-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>

          {/* Major Field */}
          <div className="mb-3">
            <label className="form-label">Major</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100 mt-4">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
