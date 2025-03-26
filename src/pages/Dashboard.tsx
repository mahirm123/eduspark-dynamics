
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Calendar, 
  Clock, 
  BarChart,
  Users,
  PlayCircle
} from "lucide-react";
import EnrolledCourseCard from "@/components/dashboard/EnrolledCourseCard";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import gsap from "gsap";

const Dashboard = () => {
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-lg">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {userData?.name || "Student"}</p>
            </div>
            <Button asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10" ref={statsRef}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Enrolled Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <span className="text-3xl font-bold">{userData?.enrolledCourses.length || 0}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completed Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <span className="text-3xl font-bold">{userData?.completedCourses || 0}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Certificates Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Award className="h-8 w-8 text-primary" />
                  <span className="text-3xl font-bold">{userData?.certificates || 0}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Hours Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Clock className="h-8 w-8 text-primary" />
                  <span className="text-3xl font-bold">{userData?.hoursLearned || 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="my-courses" className="mb-10">
            <TabsList className="mb-8">
              <TabsTrigger value="my-courses">My Courses</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={coursesRef}>
                {userData?.enrolledCourses.length ? (
                  userData.enrolledCourses.map((course) => (
                    <EnrolledCourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No courses enrolled yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start your learning journey by enrolling in a course
                    </p>
                    <Button asChild>
                      <Link to="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <div className="space-y-4">
                {userData?.upcomingClasses?.length ? (
                  userData.upcomingClasses.map((classItem) => (
                    <Card key={classItem.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <h3 className="font-medium">{classItem.title}</h3>
                            <div className="text-sm text-muted-foreground">{classItem.description}</div>
                            <div className="flex items-center gap-6 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{classItem.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{classItem.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{classItem.participants} participants</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 self-end">
                            <Button variant="outline" size="sm">Add to Calendar</Button>
                            <Button size="sm">Join Class</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No upcoming classes</h3>
                    <p className="text-muted-foreground">
                      Check back later for scheduled live sessions
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Certificates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userData?.certificates ? (
                      <div className="space-y-4">
                        {[...Array(userData.certificates)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                              <Award className="h-9 w-9 text-primary" />
                              <div>
                                <div className="font-medium">Certificate of Completion</div>
                                <div className="text-sm text-muted-foreground">Web Development Fundamentals</div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <h3 className="font-medium mb-1">No certificates yet</h3>
                        <p className="text-sm text-muted-foreground">
                          Complete courses to earn certificates
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Web Development</span>
                          <span className="text-muted-foreground">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Data Science</span>
                          <span className="text-muted-foreground">40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Marketing</span>
                          <span className="text-muted-foreground">80%</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Design</span>
                          <span className="text-muted-foreground">25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userData?.recommendations?.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <div className="font-medium line-clamp-1">{course.title}</div>
                        <div className="text-xs opacity-80">{course.instructor}</div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <PlayCircle className="h-4 w-4" />
                        <span>{course.lessonsCount} lessons</span>
                      </div>
                      <div className="font-medium">${course.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
