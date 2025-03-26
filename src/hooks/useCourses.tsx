
import { useState, useCallback } from "react";
import { Course } from "@/components/courses/CourseCard";

// Mock courses data
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node and more to become a full-stack web developer",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
    instructor: "John Smith",
    rating: 4.8,
    reviewsCount: 2453,
    price: 89.99,
    category: "development",
    level: "beginner",
    duration: "12 weeks",
    studentsCount: 12345
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Master advanced React concepts including hooks, context, state management and performance optimization",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=800",
    instructor: "Sarah Johnson",
    rating: 4.9,
    reviewsCount: 1256,
    price: 129.99,
    category: "development",
    level: "advanced",
    duration: "8 weeks",
    studentsCount: 8567
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design to create beautiful and functional designs",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    instructor: "Michael Chen",
    rating: 4.7,
    reviewsCount: 982,
    price: 79.99,
    category: "design",
    level: "beginner",
    duration: "6 weeks",
    studentsCount: 9876
  },
  {
    id: "4",
    title: "Data Science with Python",
    description: "Learn data analysis, visualization, and machine learning using Python, Pandas, and Scikit-learn",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800",
    instructor: "Emily Rodriguez",
    rating: 4.6,
    reviewsCount: 1543,
    price: 99.99,
    category: "development",
    level: "intermediate",
    duration: "10 weeks",
    studentsCount: 7654
  },
  {
    id: "5",
    title: "Digital Marketing Masterclass",
    description: "Comprehensive course on SEO, social media marketing, email campaigns, and conversion optimization",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    instructor: "Alex Thompson",
    rating: 4.5,
    reviewsCount: 876,
    price: 69.99,
    category: "marketing",
    level: "beginner",
    duration: "8 weeks",
    studentsCount: 11234
  },
  {
    id: "6",
    title: "Photography Fundamentals",
    description: "Learn composition, lighting, editing, and how to use your camera to take stunning photographs",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
    instructor: "Jessica Kim",
    rating: 4.7,
    reviewsCount: 723,
    price: 59.99,
    category: "photography",
    level: "beginner",
    duration: "4 weeks",
    studentsCount: 5432
  }
];

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [originalCourses] = useState<Course[]>(mockCourses);
  const [isLoading, setIsLoading] = useState(false);

  const filterCourses = useCallback((
    searchTerm: string,
    categoryFilter: string | null,
    levelFilter: string | null
  ) => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      let filtered = [...originalCourses];
      
      if (searchTerm) {
        filtered = filtered.filter(
          course => 
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (categoryFilter) {
        filtered = filtered.filter(course => course.category === categoryFilter);
      }
      
      if (levelFilter) {
        filtered = filtered.filter(course => course.level === levelFilter);
      }
      
      setCourses(filtered);
      setIsLoading(false);
    }, 500);
  }, [originalCourses]);

  return {
    courses,
    isLoading,
    filterCourses
  };
};
