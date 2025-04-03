
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, MessageSquare, MoreHorizontal, ArrowUpDown, 
  ChevronDown, FileText, Award, BookOpen, UserPlus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock student data
const studentsData = [
  {
    id: 1,
    name: "Emma Watson",
    email: "emma.w@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    enrolledCourses: 2,
    progress: 75,
    lastActivity: "2 hours ago",
    status: "active"
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "michael.b@example.com",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
    enrolledCourses: 3,
    progress: 92,
    lastActivity: "Yesterday",
    status: "active"
  },
  {
    id: 3,
    name: "Sophia Chen",
    email: "sophia.c@example.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100",
    enrolledCourses: 1,
    progress: 45,
    lastActivity: "3 days ago",
    status: "active"
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.w@example.com",
    avatar: "",
    enrolledCourses: 2,
    progress: 60,
    lastActivity: "1 week ago",
    status: "inactive"
  },
  {
    id: 5,
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100",
    enrolledCourses: 3,
    progress: 88,
    lastActivity: "5 hours ago",
    status: "active"
  },
  {
    id: 6,
    name: "William Davis",
    email: "william.d@example.com",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
    enrolledCourses: 1,
    progress: 15,
    lastActivity: "2 weeks ago",
    status: "inactive"
  }
];

const studentStats = {
  totalStudents: 367,
  activeStudents: 310,
  completionRate: 78,
  averageProgress: 64,
  courseEnrollments: {
    "Complete Web Development Bootcamp": 148,
    "Advanced React Patterns": 91,
    "UI/UX Design Fundamentals": 42
  }
};

const TeacherStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredStudents = studentsData.filter(
    student => student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Students</h1>
            <p className="text-muted-foreground">Manage students enrolled in your courses</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Export List
            </Button>
            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Student
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="text-4xl font-bold text-primary">{studentStats.totalStudents}</div>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="text-4xl font-bold text-emerald-500">{studentStats.activeStudents}</div>
              <p className="text-sm text-muted-foreground">Active Students</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="text-4xl font-bold text-amber-500">{studentStats.completionRate}%</div>
              <p className="text-sm text-muted-foreground">Average Completion Rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="text-4xl font-bold text-blue-500">{studentStats.averageProgress}%</div>
              <p className="text-sm text-muted-foreground">Average Progress</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <TabsList className="md:w-auto">
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="web-dev">Web Development</SelectItem>
                  <SelectItem value="react">Advanced React</SelectItem>
                  <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="all" className="m-0">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Student List</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Student</th>
                        <th className="text-left p-4 font-medium whitespace-nowrap">
                          <div className="flex items-center">
                            Courses
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-left p-4 font-medium">
                          <div className="flex items-center">
                            Progress
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="text-left p-4 font-medium">Last Activity</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-center p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9 border">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-xs text-muted-foreground">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">{student.enrolledCourses}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Progress value={student.progress} className="h-2 w-24" />
                              <span className="text-xs tabular-nums">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{student.lastActivity}</td>
                          <td className="p-4">
                            <Badge variant={student.status === 'active' ? 'outline' : 'secondary'} className={
                              student.status === 'active' ? 'border-green-500 text-green-500 bg-green-50' : ''
                            }>
                              {student.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="icon">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    <span>View Courses</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Award className="mr-2 h-4 w-4" />
                                    <span>View Progress</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Send Message</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredStudents.length === 0 && (
                    <div className="text-center p-8 text-muted-foreground">
                      No students found matching your search criteria
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active" className="m-0">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  Active students will appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive" className="m-0">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  Inactive students will appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherStudents;
