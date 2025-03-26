
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  rating: number;
  reviewsCount: number;
  price: number;
  category: string;
  level: string;
  duration: string;
  studentsCount: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      gsap.fromTo(
        card,
        { 
          y: 50,
          opacity: 0 
        },
        { 
          y: 0,
          opacity: 1, 
          duration: 0.5, 
          delay: 0.1,
          ease: "power1.out",
        }
      );
    }
  }, []);

  return (
    <Card 
      ref={cardRef} 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg group"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="bg-white/90 text-primary">
            {course.level}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Link to={`/courses/${course.id}`} className="font-semibold text-lg hover:text-primary transition-colors">
            {course.title}
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>
              {course.rating} ({course.reviewsCount})
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{course.studentsCount} students</span>
        </div>
      </CardFooter>
      <div className="absolute top-3 right-3 bg-primary text-white text-sm font-medium px-2 py-1 rounded">
        ${course.price}
      </div>
    </Card>
  );
};

export default CourseCard;
