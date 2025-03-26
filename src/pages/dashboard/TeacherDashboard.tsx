
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Users, BookOpen, Video, MessageSquare, 
  TrendingUp, Star, Clock, CalendarDays, 
  PlusCircle, Edit, MoreVertical, Download, 
  CheckCircle, XCircle
} from 'lucide-react';
import gsap from 'gsap';

// Mock data for teacher dashboard
const teacherData = {
  courses: [
    {
      id: "t1",
      title: "Complete Web Development Bootcamp",
      students: 245,
      ratings: 4.8,
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
      progress: 100,
      published: true
    },
    {
      id: "t2",
      title: "Advanced React Patterns",
      students: 128,
      ratings: 4.6,
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=800",
      progress: 85,
      published: true
    },
    {
      id: "t3",
      title: "UI/UX Design Fundamentals",
      students: 0,
      ratings: 0,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
      progress: 50,
      published: false
    }
  ],
  recentMessages: [
    {
      id: "m1",
      student: "Emma Watson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      message: "I have a question about the React Hooks lecture",
      time: "2 hours ago",
      read: false
    },
    {
      id: "m2",
      student: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
      message: "Thank you for the feedback on my project",
      time: "Yesterday",
      read: true
    },
    {
      id: "m3",
      student: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100",
      message: "Will the deadline for the final project be extended?",
      time: "2 days ago",
      read: true
    }
  ],
  pendingTasks: [
    {
      id: "pt1",
      title: "Grade Advanced React pattern exercises",
      deadline: "Tomorrow",
      count: 12
    },
    {
      id: "pt2",
      title: "Prepare live session materials",
      deadline: "Nov 15, 2023",
      count: 1
    },
    {
      id: "pt3",
      title: "Review course feedback",
      deadline: "Nov 20, 2023",
      count: 5
    }
  ],
  upcomingClasses: [
    {
      id: "uc1",
      title: "Live Q&A: React Hooks Deep Dive",
      date: "Nov 12, 2023",
      time: "3:00 PM - 4:30 PM",
      students: 45
    },
    {
      id: "uc2",
      title: "Workshop: Building a Portfolio Website",
      date: "Nov 18, 2023",
      time: "2:00 PM - 5:00 PM",
      students: 32
    }
  ],
  stats: {
    totalStudents: 560,
    totalCourses: 3,
    averageRating: 4.7,
    totalRevenue: 24850
  }
};

const TeacherDashboard = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

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
    <DashboardLayout role="teacher">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Manage your courses and students</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Video className="mr-2 h-4 w-4" />
              Create Live Session
            </Button>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" ref={statsRef}>
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold">{teacherData.stats.totalStudents}</span>
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
                <span className="text-3xl font-bold">{teacherData.stats.totalCourses}</span>
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
                <span className="text-3xl font-bold">{teacherData.stats.averageRating}</span>
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
                <span className="text-3xl font-bold">${teacherData.stats.totalRevenue}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Your Courses</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/teacher/courses">View All</Link>
                </Button>
              </div>
              
              <div className="space-y-4" ref={coursesRef}>
                {teacherData.courses.map((course) => (
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
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Upcoming Classes</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/teacher/schedule">View All</Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                {teacherData.upcomingClasses.map((classItem) => (
                  <Card key={classItem.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="font-medium">{classItem.title}</h3>
                          
                          <div className="flex gap-4 text-sm flex-wrap">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <CalendarDays className="h-4 w-4" />
                              <span>{classItem.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{classItem.time}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{classItem.students} students enrolled</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 md:self-end">
                          <Button variant="outline" size="sm">Edit Session</Button>
                          <Button size="sm">Start Session</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherData.pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">Due: {task.deadline}</span>
                          <span className="text-xs text-primary">{task.count} items</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherData.recentMessages.map((message) => (
                    <div key={message.id} className={`flex gap-3 pb-4 border-b last:border-0 last:pb-0 ${!message.read ? 'bg-muted/50 -mx-4 px-4 py-2 rounded-md' : ''}`}>
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>{message.student[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{message.student}</p>
                          {!message.read && (
                            <span className="bg-primary h-2 w-2 rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                        <p className="text-xs text-muted-foreground">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/dashboard/teacher/messages">View All Messages</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
