// src/api/index.ts
export interface AuthResponse {
  token: string;
  role: 'mentor' | 'student';
}

// Login Mentor
export async function loginMentor(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch('/api/mentor/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

// Signup Mentor with name and Area of Interest
export async function signupMentor(
  email: string,
  password: string,
  name: string,
  areaOfInterest: string
): Promise<AuthResponse> {
  const res = await fetch('/api/mentor/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name, areaOfInterest }),
  });
  if (!res.ok) {
    // Attempt to parse error message from response
    let errorMsg = 'Signup failed';
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

// Login Student
export async function loginStudent(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch('/api/student/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function signupStudent(
  email: string,
  password: string,
  year: string,
  major: string,
  name: string
): Promise<AuthResponse> {
  const res = await fetch('/api/student/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, year, major, name }),
  });
  if (!res.ok) {
    // Attempt to parse error message from response
    let errorMsg = 'Signup failed';
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
