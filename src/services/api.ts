
import { Course } from "@/components/courses/CourseCard";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
let token: string | null = null;

// Set the token for authenticated requests
export const setToken = (newToken: string) => {
  token = newToken;
  localStorage.setItem('token', newToken);
};

// Get token from local storage on init
if (!token) {
  token = localStorage.getItem('token');
}

// Helper for making authenticated requests
const authFetch = async (url: string, options: RequestInit = {}) => {
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers
  });

  // Handle unauthorized
  if (response.status === 401) {
    localStorage.removeItem('token');
    token = null;
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  return response;
};

// Course API calls
export const courseAPI = {
  // Get all courses
  getAllCourses: async (params?: Record<string, string>) => {
    let url = '/courses';
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, value);
      });
      url += `?${searchParams.toString()}`;
    }
    
    const response = await authFetch(url);
    return response.json();
  },
  
  // Get course by ID
  getCourseById: async (id: string) => {
    const response = await authFetch(`/courses/${id}`);
    return response.json();
  },
  
  // Create new course
  createCourse: async (courseData: Partial<Course>) => {
    const response = await authFetch('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData)
    });
    return response.json();
  },
  
  // Add lesson to course
  addLesson: async (courseId: string, lessonData: any) => {
    const response = await authFetch(`/courses/${courseId}/lessons`, {
      method: 'POST',
      body: JSON.stringify(lessonData)
    });
    return response.json();
  },
  
  // Enroll in course
  enrollInCourse: async (courseId: string) => {
    const response = await authFetch(`/courses/${courseId}/enroll`, {
      method: 'POST'
    });
    return response.json();
  }
};

// Upload API calls
export const uploadAPI = {
  // Upload course content
  uploadCourseContent: async (courseId: string, formData: FormData) => {
    const response = await fetch(`${API_URL}/uploads/course-content/${courseId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    return response.json();
  },
  
  // Get all content for a course
  getCourseContent: async (courseId: string) => {
    const response = await authFetch(`/uploads/course-content/${courseId}`);
    return response.json();
  },
  
  // Delete course content
  deleteResource: async (courseId: string, lessonId: string, resourceId: string) => {
    const response = await authFetch(`/uploads/course-content/${courseId}/${lessonId}/${resourceId}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

// User API calls
export const userAPI = {
  // Login
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok && data.token) {
      setToken(data.token);
    }
    
    return data;
  },
  
  // Register
  register: async (userData: any) => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (response.ok && data.token) {
      setToken(data.token);
    }
    
    return data;
  },
  
  // Get current user
  getCurrentUser: async () => {
    const response = await authFetch('/users/me');
    return response.json();
  }
};
