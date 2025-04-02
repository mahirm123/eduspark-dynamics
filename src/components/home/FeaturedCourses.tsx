
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, BookOpen, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const courseCategories = {
  "Development": "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
  "Data Science": "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300",
  "Marketing": "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300",
  "Design": "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300",
  "Development": "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300"
};

const levels = {
  "Beginner": "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300",
  "Intermediate": "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-300",
  "Advanced": "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300",
  "All Levels": "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
};

const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and more",
    instructor: "Sarah Johnson",
    price: "$89.99",
    rating: 4.9,
    students: 12340,
    category: "Development",
    level: "Beginner",
    hours: 42,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    title: "Data Science and Machine Learning",
    description: "Master Python, R, and machine learning algorithms",
    instructor: "Michael Chen",
    price: "$94.99",
    rating: 4.8,
    students: 8720,
    category: "Data Science",
    level: "Intermediate",
    hours: 38,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    title: "Digital Marketing Masterclass",
    description: "Complete guide to SEO, SEM, social media, and email marketing",
    instructor: "Emma Patel",
    price: "$79.99",
    rating: 4.7,
    students: 9430,
    category: "Marketing",
    level: "All Levels",
    hours: 32,
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 4,
    title: "UX/UI Design Fundamentals",
    description: "Learn to create beautiful user interfaces and experiences",
    instructor: "Alex Wong",
    price: "$84.99",
    rating: 4.9,
    students: 7850,
    category: "Design",
    level: "Beginner",
    hours: 28,
    image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 5,
    title: "Mobile App Development with React Native",
    description: "Build native mobile apps for iOS and Android",
    instructor: "Jessica Kim",
    price: "$99.99",
    rating: 4.8,
    students: 6320,
    category: "Development",
    level: "Intermediate",
    hours: 35,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

const CourseCard = ({ course }: { course: typeof featuredCourses[0] }) => {
  return (
    <Card className="h-full flex flex-col card-hover overflow-hidden">
      <div className="aspect-video w-full overflow-hidden rounded-t-lg relative">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            ${course.price.substring(1)}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Badge variant="outline" className={`mb-2 ${courseCategories[course.category as keyof typeof courseCategories] || "bg-gray-100 text-gray-600"}`}>
            {course.category}
          </Badge>
          <Badge className={`${levels[course.level as keyof typeof levels] || "bg-gray-100 text-gray-600"}`}>
            {course.level}
          </Badge>
        </div>
        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-sm font-medium">Instructor: {course.instructor}</p>
        <div className="flex items-center mt-2 gap-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {new Intl.NumberFormat().format(course.students)}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {course.hours}h
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 mt-auto">
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-bold text-primary">{course.price}</span>
          <Button size="sm" className="group" asChild>
            <Link to={`/courses/${course.id}`}>
              View Course
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const FeaturedCourses = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight gradient-heading inline-block">
              Featured Courses
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-4"></div>
            <p className="text-muted-foreground">
              Explore our most popular courses across all categories
            </p>
          </div>
          <Link to="/courses" className="mt-4 md:mt-0">
            <Button variant="outline" className="group">
              View All Courses
              <BookOpen className="ml-2 h-4 w-4 transition-transform group-hover:rotate-6" />
            </Button>
          </Link>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredCourses.map((course) => (
              <CarouselItem key={course.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <CourseCard course={course} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative static mx-2 left-0 translate-y-0 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20" />
            <CarouselNext className="relative static mx-2 right-0 translate-y-0 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedCourses;
