import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

import MentorLogin from './pages/mentor/MentorLogin';
import MentorSignup from './pages/mentor/MentorSignup';
import MentorDashboard from './pages/mentor/MentorDashboard';

import StudentLogin from './pages/student/StudentLogin';
import StudentSignup from './pages/student/StudentSignup';
import StudentDashboard from './pages/student/StudentDashboard';

import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mentor/login" element={<MentorLogin />} />
          <Route path="/mentor/signup" element={<MentorSignup />} />
          <Route path="/mentor/dashboard" element={<MentorDashboard />} />

          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
