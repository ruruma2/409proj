// src/pages/student/StudentDashboard.tsx
import React, { useState, useEffect } from 'react';
import '../../App.css';

interface Posting {
  id: number;
  title: string;
  description: string;
  mentorName: string;
}

// Mock function to fetch postings - replace with real API call
async function fetchPostings(): Promise<Posting[]> {
  return [
    { id: 1, title: 'Research Assistant in Machine Learning', description: 'Work on cancer detection models.', mentorName: 'Dr. Smith' },
    { id: 2, title: 'Lab Intern - Cell Biology', description: 'Help run experiments on cell cultures.', mentorName: 'Prof. Johnson' },
    { id: 3, title: 'Data Analysis Assistant', description: 'Analyze research data sets.', mentorName: 'Dr. Lee' },
  ];
}

const StudentDashboard: React.FC = () => {
  const [postings, setPostings] = useState<Posting[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPostings().then(data => setPostings(data));
  }, []);

  const filteredPostings = postings.filter(posting =>
    posting.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4 dark-blue-background">
      <h2 className="mb-4">Student Dashboard</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search job postings by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row g-3">
        {filteredPostings.map(posting => (
          <div className="col-md-4" key={posting.id}>
            <div className="card h-100 card-custom shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{posting.title}</h5>
                <p className="card-text flex-grow-1">{posting.description}</p>
                <p className="card-text text-muted" style={{ fontSize: '0.9em' }}>Mentor: {posting.mentorName}</p>
                <div className="d-flex justify-content-between mt-auto">
                  <button className="btn btn-primary">Apply</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredPostings.length === 0 && (
          <p className="text-center">No job postings found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
