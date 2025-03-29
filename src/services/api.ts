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

// Teacher API calls
export const teacherAPI = {
  // Get teacher profile
  getTeacherProfile: async (id: string) => {
    try {
      const response = await authFetch(`/users/teachers/${id}`);
      return response.json();
    } catch (error) {
      console.error("Error fetching teacher profile:", error);
      // Fallback to mock data for demo purposes
      return new Promise(resolve => {
        setTimeout(() => {
          import("@/hooks/useTeachers").then(({ useTeachers }) => {
            const { teachers } = useTeachers();
            const teacher = teachers.find(t => t.id === id);
            resolve(teacher || null);
          });
        }, 500);
      });
    }
  },
  
  // Get teacher courses
  getTeacherCourses: async (id: string) => {
    try {
      const response = await authFetch(`/courses/teacher/${id}`);
      return response.json();
    } catch (error) {
      console.error("Error fetching teacher courses:", error);
      // Fallback to mock data for demo purposes
      return new Promise(resolve => {
        setTimeout(() => {
          // Get mock courses that have this teacher as instructor
          const mockCourses = [
            {
              id: "1",
              title: "Complete Web Development Bootcamp",
              description: "Learn HTML, CSS, JavaScript, React, Node.js, and more to become a full-stack web developer",
              instructor: "John Smith",
              price: 89.99,
              rating: 4.9,
              reviewsCount: 1234,
              studentsCount: 8745,
              level: "All Levels",
              category: "Development",
              duration: "48 hours",
              lastUpdated: "April 2023",
              image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1470&q=80",
              language: "English",
              bestseller: true
            },
            {
              id: "2",
              title: "JavaScript: From Fundamentals to Advanced",
              description: "Master JavaScript with practical exercises and real-world projects",
              instructor: "John Smith",
              price: 69.99,
              rating: 4.8,
              reviewsCount: 876,
              studentsCount: 5432,
              level: "Beginner to Advanced",
              category: "Development",
              duration: "36 hours",
              lastUpdated: "June 2023",
              image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1374&q=80",
              language: "English",
              bestseller: false
            }
          ];
          resolve(mockCourses);
        }, 500);
      });
    }
  }
};
