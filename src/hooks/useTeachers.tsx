
import { useState, useCallback } from "react";
import { Teacher } from "@/components/teachers/TeacherCard";

// Mock teachers data
const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "John Smith",
    title: "Web Development Expert",
    avatar: "https://i.pravatar.cc/150?img=1",
    specialty: "Full-Stack Development",
    rating: 4.9,
    reviewsCount: 1234,
    coursesCount: 15,
    studentsCount: 8745,
    bio: "John is a senior web developer with over 10 years of experience in building complex web applications. He specializes in JavaScript frameworks and loves teaching others."
  },
  {
    id: "2",
    name: "Sarah Johnson",
    title: "UI/UX Design Instructor",
    avatar: "https://i.pravatar.cc/150?img=5",
    specialty: "User Interface Design",
    rating: 4.8,
    reviewsCount: 987,
    coursesCount: 8,
    studentsCount: 5321,
    bio: "Sarah is a design professional with experience working with major tech companies. She focuses on teaching practical design skills that help students land jobs."
  },
  {
    id: "3",
    name: "Michael Chen",
    title: "Data Science Professor",
    avatar: "https://i.pravatar.cc/150?img=3",
    specialty: "Machine Learning",
    rating: 4.9,
    reviewsCount: 765,
    coursesCount: 12,
    studentsCount: 6543,
    bio: "Michael holds a PhD in Computer Science and has published numerous papers on machine learning algorithms. His teaching approach combines theory with practical projects."
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    title: "Digital Marketing Specialist",
    avatar: "https://i.pravatar.cc/150?img=9",
    specialty: "Social Media Marketing",
    rating: 4.7,
    reviewsCount: 543,
    coursesCount: 6,
    studentsCount: 4321,
    bio: "Emily has helped dozens of businesses grow their online presence. She brings real-world case studies to her courses and provides actionable marketing strategies."
  },
  {
    id: "5",
    name: "David Wilson",
    title: "Mobile App Developer",
    avatar: "https://i.pravatar.cc/150?img=7",
    specialty: "React Native",
    rating: 4.8,
    reviewsCount: 876,
    coursesCount: 10,
    studentsCount: 7654,
    bio: "David has developed mobile apps used by millions of people. He teaches development best practices and helps students create portfolio-ready apps."
  },
  {
    id: "6",
    name: "Jessica Kim",
    title: "Photography Instructor",
    avatar: "https://i.pravatar.cc/150?img=10",
    specialty: "Portrait Photography",
    rating: 4.9,
    reviewsCount: 432,
    coursesCount: 5,
    studentsCount: 3210,
    bio: "Jessica is an award-winning photographer whose work has been featured in major publications. She teaches both technical skills and artistic composition."
  },
  {
    id: "7",
    name: "Robert Taylor",
    title: "Business Strategy Consultant",
    avatar: "https://i.pravatar.cc/150?img=12",
    specialty: "Entrepreneurship",
    rating: 4.6,
    reviewsCount: 654,
    coursesCount: 7,
    studentsCount: 5432,
    bio: "Robert has founded three successful startups and now shares his knowledge with aspiring entrepreneurs. His courses cover business planning, fundraising, and growth strategies."
  },
  {
    id: "8",
    name: "Lisa Wang",
    title: "Language Learning Expert",
    avatar: "https://i.pravatar.cc/150?img=20",
    specialty: "Language Acquisition",
    rating: 4.8,
    reviewsCount: 765,
    coursesCount: 9,
    studentsCount: 8765,
    bio: "Lisa is multilingual and has developed a unique approach to language learning that helps students become conversational quickly. Her methods focus on practical usage rather than memorization."
  }
];

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [originalTeachers] = useState<Teacher[]>(mockTeachers);
  const [isLoading, setIsLoading] = useState(false);

  const searchTeachers = useCallback((searchTerm: string) => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      if (!searchTerm) {
        setTeachers(originalTeachers);
      } else {
        const filtered = originalTeachers.filter(
          teacher => 
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTeachers(filtered);
      }
      
      setIsLoading(false);
    }, 500);
  }, [originalTeachers]);

  return {
    teachers,
    isLoading,
    searchTeachers
  };
};
