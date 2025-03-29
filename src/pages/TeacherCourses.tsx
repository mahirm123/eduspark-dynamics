import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Search, 
  SlidersHorizontal 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CourseCard from "@/components/courses/CourseCard";
import { Teacher } from "@/components/teachers/TeacherCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import gsap from "gsap";

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
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
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
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    language: "English",
    bestseller: false
  },
  {
    id: "3",
    title: "Modern React with Redux and Hooks",
    description: "Learn to build powerful web applications with React, Redux, and modern JavaScript",
    instructor: "John Smith",
    price: 79.99,
    rating: 4.9,
    reviewsCount: 1021,
    studentsCount: 6789,
    level: "Intermediate",
    category: "Development",
    duration: "42 hours",
    lastUpdated: "August 2023",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    language: "English",
    bestseller: true
  },
  {
    id: "4",
    title: "Node.js: Complete Backend Development",
    description: "Learn to build scalable backend systems with Node.js, Express, and MongoDB",
    instructor: "John Smith",
    price: 84.99,
    rating: 4.7,
    reviewsCount: 743,
    studentsCount: 4321,
    level: "Intermediate",
    category: "Development",
    duration: "38 hours",
    lastUpdated: "July 2023",
    image: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    language: "English",
    bestseller: false
  },
  {
    id: "5",
    title: "TypeScript Masterclass",
    description: "Master TypeScript and build type-safe applications with confidence",
    instructor: "John Smith",
    price: 74.99,
    rating: 4.8,
    reviewsCount: 654,
    studentsCount: 3987,
    level: "Advanced",
    category: "Development",
    duration: "28 hours",
    lastUpdated: "September 2023",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    language: "English",
    bestseller: false
  },
  {
    id: "6",
    title: "Web Security and Authentication",
    description: "Learn how to secure your web applications from common vulnerabilities",
    instructor: "John Smith",
    price: 89.99,
    rating: 4.9,
    reviewsCount: 512,
    studentsCount: 2876,
    level: "Intermediate to Advanced",
    category: "Development",
    duration: "32 hours",
    lastUpdated: "October 2023",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    language: "English",
    bestseller: false
  }
];

const TeacherCourses = () => {
  const { id } = useParams<{ id: string }>();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [courses, setCourses] = useState(mockCourses);
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          import("@/hooks/useTeachers").then(({ useTeachers }) => {
            const { teachers } = useTeachers();
            const foundTeacher = teachers.find(t => t.id === id);
            if (foundTeacher) {
              setTeacher(foundTeacher);
            }
            setLoading(false);
          });
        }, 500);
      } catch (error) {
        console.error("Failed to fetch teacher:", error);
        setLoading(false);
      }
    };

    fetchTeacher();

    const tl = gsap.timeline();
    tl.fromTo(
      ".course-animate",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" }
    );
  }, [id]);

  useEffect(() => {
    let result = [...courses];
    
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    switch (sortOption) {
      case "popular":
        result.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case "highest-rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setFilteredCourses(result);
  }, [searchTerm, sortOption, courses]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4">Loading teacher courses...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Teacher Not Found</h2>
            <p className="text-muted-foreground mb-6">The teacher profile you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/teachers">Back to Teachers</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 course-animate">
            <Button variant="ghost" className="mb-4" asChild>
              <Link to={`/teachers/${teacher.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profile
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/10">
                <AvatarImage src={teacher.avatar} alt={teacher.name} />
                <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{teacher.name}'s Courses</h1>
                <p className="text-muted-foreground">
                  {filteredCourses.length} courses • {teacher.studentsCount} students
                </p>
              </div>
            </div>
          </div>
          
          <Card className="mb-8 course-animate">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search courses..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </form>
                
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm whitespace-nowrap">Sort by:</span>
                  <Select
                    value={sortOption}
                    onValueChange={setSortOption}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="highest-rated">Highest Rated</SelectItem>
                      <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                      <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 course-animate">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 course-animate">
              <h2 className="text-xl font-semibold mb-2">No courses found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setSortOption("popular");
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherCourses;
