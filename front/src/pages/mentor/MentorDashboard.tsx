// src/pages/mentor/MentorDashboard.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import '../../App.css';
import {
  fetchMentorPostings,
  addJobPosting,
  deleteJobPosting,
  fetchApplicants,
  MentorPosting,
  Applicant,
} from '../../api/mentorApi'; // Updated import path

const MentorDashboard: React.FC = () => {
  const [postings, setPostings] = useState<MentorPosting[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPosting, setSelectedPosting] = useState<MentorPosting | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [newPostingTitle, setNewPostingTitle] = useState('');
  const [newPostingDescription, setNewPostingDescription] = useState(''); // New state for description
  const [error, setError] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchApplicantsError, setFetchApplicantsError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // For loading indicator

  // Fetch postings on component mount
  useEffect(() => {
    loadPostings();
  }, []);

  const loadPostings = async () => {
    setLoading(true);
    try {
      const data = await fetchMentorPostings();
      setPostings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplicants = async (posting: MentorPosting) => {
    setSelectedPosting(posting);
    setFetchApplicantsError(null);
    try {
      const fetchedApplicants = await fetchApplicants(posting.id);
      setApplicants(fetchedApplicants);
    } catch (err: any) {
      setApplicants([]);
      setFetchApplicantsError(`Error fetching applicants: ${err.message}`);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPosting(null);
    setApplicants([]);
    setFetchApplicantsError(null);
  };

  const handleAddPosting = async (e: FormEvent) => {
    e.preventDefault();
    setAddError(null);
    if (!newPostingTitle.trim()) {
      setAddError('Job title cannot be empty.');
      return;
    }
    if (!newPostingDescription.trim()) {
      setAddError('Job description cannot be empty.');
      return;
    }
    setIsSubmitting(true);
    try {
      const newPosting = await addJobPosting(newPostingTitle.trim(), newPostingDescription.trim()); // Pass description
      setPostings([...postings, newPosting]);
      setNewPostingTitle('');
      setNewPostingDescription(''); // Reset description field
    } catch (err: any) {
      setAddError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePosting = async (id: number) => {
    setDeleteError(null);
    if (!window.confirm('Are you sure you want to delete this job posting?')) {
      return;
    }
    try {
      await deleteJobPosting(id);
      setPostings(postings.filter(posting => posting.id !== id));
    } catch (err: any) {
      setDeleteError(err.message);
    }
  };

  return (
    <div className="container py-4 dark-blue-background">
      <h2 className="mb-4">Mentor Dashboard</h2>
      <p className="mb-3">Manage your job postings below.</p>

      {/* Add Job Posting Form */}
      <div className="card p-3 mb-4 shadow">
        <h4>Add New Job Posting</h4>
        {addError && <div className="alert alert-danger">{addError}</div>}
        <form onSubmit={handleAddPosting}>
          {/* Job Title Field */}
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter job title"
              value={newPostingTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPostingTitle(e.target.value)}
              required
            />
          </div>

          {/* Job Description Field */}
          <div className="mb-3">
            <label className="form-label">Job Description</label>
            <textarea
              className="form-control"
              placeholder="Enter job description"
              value={newPostingDescription}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewPostingDescription(e.target.value)}
              required
              rows={4} // Adjust rows as needed
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Posting'}
          </button>
        </form>
      </div>

      {/* Job Postings Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">Posting Title</th>
              <th scope="col">Applicants</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center">
                  Loading postings...
                </td>
              </tr>
            ) : postings.length > 0 ? (
              postings.map(p => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.applicantsCount}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      disabled={p.applicantsCount === 0}
                      onClick={() => handleViewApplicants(p)}
                    >
                      View Applicants
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeletePosting(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  No postings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Applicants */}
      {showModal && selectedPosting && (
        <div
          className="modal d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} // Semi-transparent background
        >
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content modal-content-custom">
              <div className="modal-header">
                <h5 className="modal-title">
                  Applicants for: {selectedPosting.title}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                {fetchApplicantsError && <div className="alert alert-danger">{fetchApplicantsError}</div>}
                {applicants.length > 0 ? (
                  <ul className="list-group">
                    {applicants.map(a => (
                      <li className="list-group-item card-custom" key={a.id}>
                        <strong>{a.name}</strong><br />
                        <span className="text-muted" style={{ fontSize: '0.9em' }}>Email: {a.email}</span><br />
                        <span className="text-muted" style={{ fontSize: '0.9em' }}>Major: {a.major}</span><br />
                        <span className="text-muted" style={{ fontSize: '0.9em' }}>Year: {a.year}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No applicants found.</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
