
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Star, TrendingUp } from 'lucide-react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface TeacherStatsProps {
  stats: {
    totalStudents: number;
    totalCourses: number;
    averageRating: number;
    totalRevenue: number;
  }
}

const TeacherStats = ({ stats }: TeacherStatsProps) => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out"
        }
      );
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" ref={statsRef}>
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div className="flex items-center justify-between">
            <Users className="h-8 w-8 text-primary" />
            <span className="text-3xl font-bold">{stats.totalStudents}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div className="flex items-center justify-between">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-3xl font-bold">{stats.totalCourses}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div className="flex items-center justify-between">
            <Star className="h-8 w-8 text-primary" />
            <span className="text-3xl font-bold">{stats.averageRating}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div className="flex items-center justify-between">
            <TrendingUp className="h-8 w-8 text-primary" />
            <span className="text-3xl font-bold">${stats.totalRevenue}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherStats;
