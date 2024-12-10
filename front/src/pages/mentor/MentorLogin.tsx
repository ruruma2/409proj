// src/pages/mentor/MentorLogin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginMentor } from '../../api/authApi'; // Updated import based on directory structure
import '../../App.css';

const MentorLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMentor(email, password);
      navigate('/mentor/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center dark-blue-background" style={{ height: '100vh' }}>
      <div className="card p-4 card-custom shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Mentor Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
        </form>
      </div>
    </div>
  );
};

export default MentorLogin;
