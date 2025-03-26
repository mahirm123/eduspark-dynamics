
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Users, Star } from "lucide-react";
import { useRef } from "react";

export interface Teacher {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  coursesCount: number;
  studentsCount: number;
  bio: string;
}

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Card ref={cardRef} className="overflow-hidden transition-all duration-300 hover:shadow-lg group teacher-card">
      <div className="text-center p-6 pb-0">
        <div className="inline-block relative mb-4">
          <div className="w-28 h-28 rounded-full overflow-hidden mx-auto border-4 border-primary/10">
            <img
              src={teacher.avatar || `https://i.pravatar.cc/112?img=${Math.floor(Math.random() * 70)}`}
              alt={teacher.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
        
        <h3 className="font-semibold text-lg">{teacher.name}</h3>
        <p className="text-muted-foreground text-sm">{teacher.title}</p>
        
        <div className="mt-3 text-sm flex justify-center items-center gap-1">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span className="font-medium">{teacher.rating}</span>
          <span className="text-muted-foreground">({teacher.reviewsCount} reviews)</span>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex justify-between text-sm text-center border-t border-b py-3">
          <div className="flex-1 border-r">
            <div className="font-semibold">{teacher.coursesCount}</div>
            <div className="text-muted-foreground text-xs">Courses</div>
          </div>
          <div className="flex-1">
            <div className="font-semibold">{teacher.studentsCount}</div>
            <div className="text-muted-foreground text-xs">Students</div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Button variant="ghost" className="w-1/2 rounded-none rounded-bl-lg border-r" size="sm" asChild>
          <Link to={`/teachers/${teacher.id}`}>
            <span>Profile</span>
          </Link>
        </Button>
        <Button className="w-1/2 rounded-none rounded-br-lg" size="sm" asChild>
          <Link to={`/teachers/${teacher.id}/courses`}>
            <span>Courses</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeacherCard;
