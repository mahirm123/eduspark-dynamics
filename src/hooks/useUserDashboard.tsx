
import { useState, useEffect } from "react";
import { EnrolledCourse } from "@/components/dashboard/EnrolledCourseCard";

interface UpcomingClass {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  participants: number;
}

interface RecommendedCourse {
  id: string;
  title: string;
  instructor: string;
  image: string;
  lessonsCount: number;
  price: number;
}

interface UserData {
  name: string;
  email: string;
  enrolledCourses: EnrolledCourse[];
  completedCourses: number;
  certificates: number;
  hoursLearned: number;
  upcomingClasses: UpcomingClass[];
  recommendations: RecommendedCourse[];
}

// Mock user dashboard data
const mockUserData: UserData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  enrolledCourses: [
    {
      id: "1",
      title: "Complete Web Development Bootcamp",
      instructor: "John Smith",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
      progress: 65,
      lastLesson: "CSS Flexbox and Grid Layout",
      lessonsCompleted: 15,
      totalLessons: 24
    },
    {
      id: "2",
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=800",
      progress: 30,
      lastLesson: "Context API Deep Dive",
      lessonsCompleted: 6,
      totalLessons: 20
    },
    {
      id: "3",
      title: "UI/UX Design Fundamentals",
      instructor: "Michael Chen",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
      progress: 80,
      lastLesson: "Creating User Personas",
      lessonsCompleted: 16,
      totalLessons: 20
    }
  ],
  completedCourses: 3,
  certificates: 2,
  hoursLearned: 87,
  upcomingClasses: [
    {
      id: "1",
      title: "Live Q&A: Advanced JavaScript Concepts",
      description: "Join our instructor for a live session to discuss advanced JavaScript topics and ask questions",
      date: "Nov 15, 2023",
      time: "3:00 PM - 4:30 PM EST",
      participants: 45
    },
    {
      id: "2",
      title: "Workshop: Building a Portfolio Website",
      description: "Practical workshop where we'll build a portfolio website from scratch using HTML, CSS and JavaScript",
      date: "Nov 18, 2023",
      time: "2:00 PM - 5:00 PM EST",
      participants: 32
    }
  ],
  recommendations: [
    {
      id: "4",
      title: "Data Science with Python",
      instructor: "Emily Rodriguez",
      image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800",
      lessonsCount: 24,
      price: 99.99
    },
    {
      id: "5",
      title: "Digital Marketing Masterclass",
      instructor: "Alex Thompson",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      lessonsCount: 18,
      price: 69.99
    },
    {
      id: "6",
      title: "Photography Fundamentals",
      instructor: "Jessica Kim",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
      lessonsCount: 15,
      price: 59.99
    },
    {
      id: "7",
      title: "Mobile App Development with React Native",
      instructor: "David Wilson",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=800",
      lessonsCount: 22,
      price: 89.99
    }
  ]
};

export const useUserDashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API request to fetch user dashboard data
    const fetchUserData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        setUserData(mockUserData);
        setIsLoading(false);
      }, 1200);
    };

    fetchUserData();
  }, []);

  return {
    userData,
    isLoading
  };
};
