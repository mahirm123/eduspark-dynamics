
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, UserPlus, Edit, Trash2, MoreHorizontal } from "lucide-react";

// Mock data (same as in AdminDashboard)
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

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");

  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeachers = mockTeachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage students and teachers on the platform</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Advanced Search
            </Button>
            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="students" value={selectedRole} onValueChange={setSelectedRole}>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="student">Students</TabsTrigger>
              <TabsTrigger value="teacher">Teachers</TabsTrigger>
            </TabsList>
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="student" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">Joined: {student.joinDate}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">Courses: {student.coursesEnrolled}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="teacher" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTeachers.map((teacher) => (
                    <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{teacher.name}</p>
                          <p className="text-sm text-muted-foreground">{teacher.email}</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">Joined: {teacher.joinDate}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">Courses: {teacher.coursesCreated}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">Department: {teacher.department}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
