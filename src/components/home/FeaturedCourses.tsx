
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
import { Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

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
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

const CourseCard = ({ course }: { course: typeof featuredCourses[0] }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Badge variant="outline" className="mb-2">
            {course.category}
          </Badge>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            {course.level}
          </Badge>
        </div>
        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-sm">Instructor: {course.instructor}</p>
        <div className="flex items-center mt-2 gap-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-primary text-primary mr-1" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {new Intl.NumberFormat().format(course.students)} students
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 mt-auto">
        <div className="flex items-center justify-between w-full">
          <span className="font-bold">{course.price}</span>
          <Button size="sm" asChild>
            <Link to={`/courses/${course.id}`}>View Course</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const FeaturedCourses = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Courses
            </h2>
            <p className="text-muted-foreground mt-2">
              Explore our most popular courses across all categories
            </p>
          </div>
          <Link to="/courses" className="mt-4 md:mt-0">
            <Button variant="outline">View All Courses</Button>
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
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="relative static mx-2 left-0 translate-y-0" />
            <CarouselNext className="relative static mx-2 right-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedCourses;
