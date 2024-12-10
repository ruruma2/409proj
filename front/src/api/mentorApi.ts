// src/api/mentorApi.ts

export interface MentorPosting {
    id: number;
    title: string;
    description: string; // Ensure this is included
    applicantsCount: number;
  }
  
  export interface Applicant {
    id: number;
    name: string;
    email: string; // New field added
    major: string;
    year: string; // New field added
  }
  
  // Fetch Mentor Postings
  export async function fetchMentorPostings(): Promise<MentorPosting[]> {
    const res = await fetch('/api/mentor/postings', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies if using cookie-based auth
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch postings');
    }
  
    return res.json();
  }
  
  // Add Job Posting with Description
  export async function addJobPosting(title: string, description: string): Promise<MentorPosting> {
    const res = await fetch('/api/mentor/postings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }), // Include description in the payload
      credentials: 'include',
    });
  
    if (!res.ok) {
      let errorMsg = 'Failed to add job posting';
      try {
        const errorData = await res.json();
        if (errorData && errorData.message) {
          errorMsg = errorData.message;
        }
      } catch {
        // Ignore JSON parsing errors
      }
      throw new Error(errorMsg);
    }
  
    return res.json();
  }
  
  // Delete Job Posting
  export async function deleteJobPosting(id: number): Promise<void> {
    const res = await fetch(`/api/mentor/postings/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  
    if (!res.ok) {
      let errorMsg = 'Failed to delete job posting';
      try {
        const errorData = await res.json();
        if (errorData && errorData.message) {
          errorMsg = errorData.message;
        }
      } catch {
        // Ignore JSON parsing errors
      }
      throw new Error(errorMsg);
    }
  }
  
  // Fetch Applicants for a Specific Posting
  export async function fetchApplicants(postingId: number): Promise<Applicant[]> {
    const res = await fetch(`/api/mentor/postings/${postingId}/applicants`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch applicants');
    }
  
    return res.json();
  }
  