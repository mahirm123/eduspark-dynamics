
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  BarChart3,
  Users,
  BookOpen,
  BookMarked,
  TrendingUp,
  CreditCard,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MoreHorizontal,
  Search,
  FileText,
  Download,
  MessageSquare,
  Bell,
  UserPlus,
  Edit,
  Trash2
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import gsap from 'gsap';

const adminData = {
  stats: {
    totalUsers: 2485,
    totalCourses: 156,
    activeStudents: 1876,
    monthlyRevenue: 32750
  },
  recentUsers: [
    {
      id: "u1",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Student",
      joinDate: "Nov 5, 2023",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      status: "active"
    },
    {
      id: "u2",
      name: "Michael Chen",
      email: "michael.c@example.com",
      role: "Teacher",
      joinDate: "Nov 3, 2023",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
      status: "active"
    },
    {
      id: "u3",
      name: "Emma Davis",
      email: "emma.d@example.com",
      role: "Student",
      joinDate: "Nov 2, 2023",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100",
      status: "pending"
    },
    {
      id: "u4",
      name: "Robert Wilson",
      email: "robert.w@example.com",
      role: "Teacher",
      joinDate: "Oct 28, 2023",
      avatar: "",
      status: "active"
    }
  ],
  courseApprovals: [
    {
      id: "ca1",
      title: "Advanced Machine Learning",
      instructor: "Michael Chen",
      category: "Data Science",
      submitted: "Nov 4, 2023",
      status: "pending"
    },
    {
      id: "ca2",
      title: "Modern JavaScript Frameworks",
      instructor: "Jessica Kim",
      category: "Web Development",
      submitted: "Nov 2, 2023",
      status: "pending"
    }
  ],
  recentTransactions: [
    {
      id: "t1",
      user: "Alex Thompson",
      amount: 89.99,
      course: "Digital Marketing Masterclass",
      date: "Nov 5, 2023",
      status: "completed"
    },
    {
      id: "t2",
      user: "Emma Davis",
      amount: 129.99,
      course: "Advanced Python Programming",
      date: "Nov 4, 2023",
      status: "completed"
    },
    {
      id: "t3",
      user: "Lucas Martin",
      amount: 49.99,
      course: "UI/UX Design Essentials",
      date: "Nov 4, 2023",
      status: "pending"
    },
    {
      id: "t4",
      user: "Sophia Rodriguez",
      amount: 79.99,
      course: "Photography Fundamentals",
      date: "Nov 3, 2023",
      status: "failed"
    }
  ],
  systemAlerts: [
    {
      id: "sa1",
      title: "Server maintenance scheduled",
      description: "System will be down for maintenance on Nov 15, 1-3 AM EST",
      priority: "medium",
      date: "Nov 6, 2023"
    },
    {
      id: "sa2",
      title: "Unusual login activity detected",
      description: "Multiple failed login attempts from IP 192.168.1.34",
      priority: "high",
      date: "Nov 5, 2023"
    },
    {
      id: "sa3",
      title: "Database backup completed",
      description: "Weekly database backup completed successfully",
      priority: "low",
      date: "Nov 4, 2023"
    }
  ],
  recentTickets: [
    {
      id: "rt1",
      user: "Daniel Brown",
      subject: "Payment issue with course purchase",
      date: "Nov 5, 2023",
      status: "open"
    },
    {
      id: "rt2",
      user: "Emily Wilson",
      subject: "Cannot access course materials",
      date: "Nov 4, 2023",
      status: "open"
    },
    {
      id: "rt3",
      user: "James Anderson",
      subject: "Certificate not generating after completion",
      date: "Nov 3, 2023",
      status: "closed"
    }
  ]
};

const mockStudents = [
  {
    id: "s1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    joinDate: "Nov 5, 2023",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    coursesEnrolled: 3,
    lastActive: "2 days ago"
  },
  {
    id: "s2",
    name: "Michael Brown",
    email: "michael.b@example.com",
    joinDate: "Oct 22, 2023",
    avatar: "",
    coursesEnrolled: 5,
    lastActive: "1 hour ago"
  },
  {
    id: "s3",
    name: "Emily Davis",
    email: "emily.d@example.com",
    joinDate: "Nov 2, 2023",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100",
    coursesEnrolled: 2,
    lastActive: "1 day ago"
  },
  {
    id: "s4",
    name: "Robert Wilson",
    email: "robert.w@example.com",
    joinDate: "Oct 18, 2023",
    avatar: "",
    coursesEnrolled: 4,
    lastActive: "just now"
  },
  {
    id: "s5",
    name: "Sophia Rodriguez",
    email: "sophia.r@example.com",
    joinDate: "Oct 15, 2023",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100",
    coursesEnrolled: 6,
    lastActive: "3 days ago"
  }
];

const mockTeachers = [
  {
    id: "t1",
    name: "James Anderson",
    email: "james.a@example.com",
    joinDate: "Sep 10, 2023",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
    coursesCreated: 4,
    department: "Computer Science",
    rating: 4.8
  },
  {
    id: "t2",
    name: "Jessica Kim",
    email: "jessica.k@example.com",
    joinDate: "Aug 15, 2023",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
    coursesCreated: 6,
    department: "Business",
    rating: 4.9
  },
  {
    id: "t3",
    name: "David Martinez",
    email: "david.m@example.com",
    joinDate: "Sep 25, 2023",
    avatar: "",
    coursesCreated: 3,
    department: "Design",
    rating: 4.6
  },
  {
    id: "t4",
    name: "Lisa Chen",
    email: "lisa.c@example.com",
    joinDate: "Oct 5, 2023",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100",
    coursesCreated: 5,
    department: "Marketing",
    rating: 4.7
  }
];

const AdminDashboard = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState(mockStudents);
  const [teachers, setTeachers] = useState(mockTeachers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  useEffect(() => {
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

    if (chartsRef.current) {
      gsap.fromTo(
        chartsRef.current.children,
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
  }, [activeTab]);

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.password) {
      const id = `new-${Date.now()}`;
      
      if (newUser.role === "student") {
        const newStudent = {
          id,
          name: newUser.name,
          email: newUser.email,
          joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          avatar: "",
          coursesEnrolled: 0,
          lastActive: "just now"
        };
        setStudents([newStudent, ...students]);
      } else {
        const newTeacher = {
          id,
          name: newUser.name,
          email: newUser.email,
          joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          avatar: "",
          coursesCreated: 0,
          department: "General",
          rating: 5.0
        };
        setTeachers([newTeacher, ...teachers]);
      }
      
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "student"
      });
      
      setIsAddUserDialogOpen(false);
    }
  };

  const handleDeleteUser = (id: string, role: string) => {
    if (role === "student") {
      setStudents(students.filter(student => student.id !== id));
    } else {
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage platform users, courses, and activities</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                2
              </span>
            </Button>
            <Button size="sm" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" ref={statsRef}>
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="flex items-center justify-between">
                    <Users className="h-8 w-8 text-primary" />
                    <span className="text-3xl font-bold">{adminData.stats.totalUsers}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="flex items-center justify-between">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <span className="text-3xl font-bold">{adminData.stats.activeStudents}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="flex items-center justify-between">
                    <BookMarked className="h-8 w-8 text-primary" />
                    <span className="text-3xl font-bold">{adminData.stats.totalCourses}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="flex items-center justify-between">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <span className="text-3xl font-bold">${adminData.stats.monthlyRevenue}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" ref={chartsRef}>
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Platform Activity</CardTitle>
                    <CardDescription>User registrations and course enrollments</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">Weekly</Button>
                    <Button size="sm" variant="outline">Monthly</Button>
                    <Button size="sm">Yearly</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                    <span className="ml-2 text-muted-foreground">Activity Chart (Visualization)</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Distribution</CardTitle>
                  <CardDescription>By course category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Development</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Business</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Design</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Marketing</span>
                        <span>10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Other</span>
                        <span>5%</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Users</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="w-9 px-0">
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/dashboard/admin/users">View All</Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adminData.recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{user.role}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">Joined {user.joinDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.status === "pending" ? (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                              Pending
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Active
                            </span>
                          )}
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Course Approvals</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard/admin/courses">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adminData.courseApprovals.map((course) => (
                      <div key={course.id} className="border rounded-md p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{course.title}</h3>
                            <div className="text-sm text-muted-foreground">By {course.instructor}</div>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="text-muted-foreground">{course.category}</span>
                              <span className="text-muted-foreground">Submitted: {course.submitted}</span>
                            </div>
                          </div>
                          <div>
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                              Pending Review
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="gap-1">
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                          <Button size="sm" className="gap-1">
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Transactions</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard/admin/payments">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adminData.recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{transaction.user}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{transaction.course}</p>
                          <p className="text-xs text-muted-foreground mt-1">{transaction.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-medium">${transaction.amount}</p>
                            <p className={`text-xs ${
                              transaction.status === "completed" 
                                ? "text-green-600" 
                                : transaction.status === "pending" 
                                  ? "text-amber-600" 
                                  : "text-red-600"
                            }`}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adminData.systemAlerts.map((alert) => (
                        <div key={alert.id} className="flex gap-3 items-start pb-4 border-b last:border-0 last:pb-0">
                          <div className={`mt-0.5 flex-shrink-0 ${
                            alert.priority === "high" 
                              ? "text-red-500" 
                              : alert.priority === "medium" 
                                ? "text-amber-500" 
                                : "text-green-500"
                          }`}>
                            {alert.priority === "high" ? (
                              <AlertTriangle className="h-5 w-5" />
                            ) : alert.priority === "medium" ? (
                              <Bell className="h-5 w-5" />
                            ) : (
                              <CheckCircle2 className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{alert.title}</p>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Support Tickets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adminData.recentTickets.map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                          <div>
                            <p className="font-medium">{ticket.user}</p>
                            <p className="text-sm text-muted-foreground">{ticket.subject}</p>
                            <p className="text-xs text-muted-foreground mt-1">{ticket.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              ticket.status === "open" 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </span>
                            <Button variant="ghost" size="icon">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-muted-foreground">Manage all users on the platform</p>
              </div>
              <div className="flex gap-2">
                <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user account for the platform.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={newUser.name} 
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})} 
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={newUser.email} 
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                          id="password" 
                          type="password" 
                          value={newUser.password} 
                          onChange={(e) => setNewUser({...newUser, password: e.target.value})} 
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select 
                          value={newUser.role} 
                          onValueChange={(value) => setNewUser({...newUser, role: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddUser}>Add User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-9 w-full sm:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="teacher">Teachers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {selectedRole === "student" ? (
                <div className="border rounded-md divide-y">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <div key={student.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span>Joined: {student.joinDate}</span>
                              <span>Courses: {student.coursesEnrolled}</span>
                              <span>Last active: {student.lastActive}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 sm:mt-0">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(student.id, "student")}>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No students found matching your search.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border rounded-md divide-y">
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <div key={teacher.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={teacher.avatar} />
                            <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-sm text-muted-foreground">{teacher.email}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span>Joined: {teacher.joinDate}</span>
                              <span>Department: {teacher.department}</span>
                              <span>Rating: {teacher.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 sm:mt-0">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(teacher.id, "teacher")}>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No teachers found matching your search.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold">Course Management</h2>
                <p className="text-muted-foreground">Manage all courses on the platform</p>
              </div>
              <div className="flex items-center justify-center p-12 border rounded-md">
                <div className="text-center">
                  <BookMarked className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Course Management Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">This section is under development. Check back later for full course management functionality.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold">Reports</h2>
                <p className="text-muted-foreground">View and generate platform reports</p>
              </div>
              <div className="flex items-center justify-center p-12 border rounded-md">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Reports Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">This section is under development. Check back later for comprehensive reporting functionality.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
