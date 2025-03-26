
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EnrolledCourseCard from "@/components/dashboard/EnrolledCourseCard";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { Calendar, Clock, PlayCircle, BellRing, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const StudentDashboard = () => {
  const { userData, isLoading } = useUserDashboard();
  const statsRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations
    if (statsRef.current && !isLoading) {
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

    if (coursesRef.current && !isLoading) {
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
  }, [isLoading]);

  if (isLoading) {
    return (
      <DashboardLayout role="student">
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-lg">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {userData?.name || "Student"}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <BellRing className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <Button asChild size="sm">
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" ref={statsRef}>
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex items-center justify-between">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold">{userData?.enrolledCourses.length || 0}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex items-center justify-between">
                <Calendar className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold">{userData?.upcomingClasses?.length || 0}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Hours Learning</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex items-center justify-between">
                <Clock className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold">{userData?.hoursLearned || 0}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex items-center justify-between">
                <PlayCircle className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold">{userData?.certificates || 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Learning</h2>
          
          <Tabs defaultValue="in-progress">
            <TabsList>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
            </TabsList>
            
            <TabsContent value="in-progress" className="mt-6">
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                ref={coursesRef}
              >
                {userData?.enrolledCourses.map((course) => (
                  <EnrolledCourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">No completed courses yet</h3>
                <p className="text-muted-foreground">
                  Continue learning to complete your enrolled courses
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="bookmarked" className="mt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">No bookmarked courses</h3>
                <p className="text-muted-foreground">
                  Bookmark courses to save them for later
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Upcoming Schedule</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/schedule">View All</Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {userData?.upcomingClasses?.slice(0, 2).map((classItem) => (
              <Card key={classItem.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">{classItem.title}</h3>
                      <div className="text-sm text-muted-foreground">{classItem.description}</div>
                      <div className="flex items-center gap-6 text-sm flex-wrap">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{classItem.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{classItem.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 md:self-end">
                      <Button variant="outline" size="sm">Add to Calendar</Button>
                      <Button size="sm">Join Class</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Recommended For You</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userData?.recommendations?.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
                    <div className="p-4 text-white">
                      <h3 className="font-medium line-clamp-1">{course.title}</h3>
                      <p className="text-xs opacity-90">{course.instructor}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <PlayCircle className="h-4 w-4" />
                      <span>{course.lessonsCount} lessons</span>
                    </div>
                    <span className="font-medium">${course.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
