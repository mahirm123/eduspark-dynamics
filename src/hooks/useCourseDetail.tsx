
import { useState, useEffect } from "react";
import { Course } from "@/components/courses/CourseCard";

const mockCourseDetails: Record<string, Course> = {
  "1": {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node and more to become a full-stack web developer",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
    instructor: "John Smith",
    rating: 4.8,
    reviewsCount: 2453,
    price: 89.99,
    category: "Development",
    level: "Beginner",
    duration: "12 weeks",
    studentsCount: 12345
  },
  "2": {
    id: "2",
    title: "Advanced React Patterns",
    description: "Master advanced React concepts including hooks, context, state management and performance optimization",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=800",
    instructor: "Sarah Johnson",
    rating: 4.9,
    reviewsCount: 1256,
    price: 129.99,
    category: "Development",
    level: "Advanced",
    duration: "8 weeks",
    studentsCount: 8567
  },
  "3": {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design to create beautiful and functional designs",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    instructor: "Michael Chen",
    rating: 4.7,
    reviewsCount: 982,
    price: 79.99,
    category: "Design",
    level: "Beginner",
    duration: "6 weeks",
    studentsCount: 9876
  }
};

export const useCourseDetail = (courseId: string) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      setError(null);
      
      // Simulate API request
      setTimeout(() => {
        const foundCourse = mockCourseDetails[courseId];
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError("Course not found");
        }
        
        setIsLoading(false);
      }, 1000);
    };

    fetchCourse();
  }, [courseId]);

  return {
    course,
    isLoading,
    error
  };
};
