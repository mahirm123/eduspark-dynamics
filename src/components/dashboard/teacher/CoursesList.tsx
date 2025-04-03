
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, Star, MoreVertical, Edit, Download, CheckCircle } from 'lucide-react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export interface Course {
  id: string;
  title: string;
  students: number;
  ratings: number;
  image: string;
  progress: number;
  published: boolean;
}

interface CoursesListProps {
  courses: Course[];
}

const CoursesList = ({ courses }: CoursesListProps) => {
  const coursesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (coursesRef.current) {
      gsap.fromTo(
        coursesRef.current.children,
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out"
        }
      );
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Courses</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/teacher/courses">View All</Link>
        </Button>
      </div>
      
      <div className="space-y-4" ref={coursesRef}>
        {courses.map((course) => (
          <Card key={course.id}>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 h-36">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {!course.published && (
                    <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                      Draft
                    </div>
                  )}
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{course.title}</h3>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{course.students} students</span>
                    </div>
                    {course.ratings > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-500" />
                        <span>{course.ratings} rating</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex gap-2 justify-end">
                    <Button size="sm" variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    {course.published ? (
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Analytics
                      </Button>
                    ) : (
                      <Button size="sm">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Publish
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
