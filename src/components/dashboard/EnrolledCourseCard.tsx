
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen } from "lucide-react";

export interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  image: string;
  progress: number;
  lastLesson: string;
  lessonsCompleted: number;
  totalLessons: number;
}

interface EnrolledCourseCardProps {
  course: EnrolledCourse;
}

const EnrolledCourseCard = ({ course }: EnrolledCourseCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="aspect-video w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h3 className="font-semibold">{course.title}</h3>
            <p className="text-sm opacity-90">By {course.instructor}</p>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
          
          <div className="text-sm">
            <p className="font-medium">Last lesson:</p>
            <p className="text-muted-foreground truncate">{course.lastLesson}</p>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>
                {course.lessonsCompleted}/{course.totalLessons} lessons
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button asChild className="w-full">
          <Link to={`/courses/${course.id}/learn`}>
            <PlayCircle className="mr-2 h-4 w-4" />
            Continue Learning
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EnrolledCourseCard;
