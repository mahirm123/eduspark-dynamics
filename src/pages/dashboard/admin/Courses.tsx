
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Edit, Trash2, MoreHorizontal, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

// Mock data
const mockCourses = [
  {
    id: "c1",
    title: "Complete Web Development Bootcamp",
    instructor: "James Anderson",
    category: "Development",
    students: 245,
    publishedDate: "Aug 15, 2023",
    status: "published"
  },
  {
    id: "c2",
    title: "Digital Marketing Masterclass",
    instructor: "Lisa Chen",
    category: "Marketing",
    students: 178,
    publishedDate: "Sep 5, 2023",
    status: "published"
  },
  {
    id: "c3",
    title: "Advanced Machine Learning",
    instructor: "Michael Chen",
    category: "Data Science",
    students: 0,
    publishedDate: "",
    status: "pending"
  },
  {
    id: "c4",
    title: "Modern JavaScript Frameworks",
    instructor: "Jessica Kim",
    category: "Development",
    students: 0,
    publishedDate: "",
    status: "pending"
  },
  {
    id: "c5",
    title: "Business Strategy Fundamentals",
    instructor: "David Martinez",
    category: "Business",
    students: 124,
    publishedDate: "Oct 12, 2023",
    status: "published"
  }
];

const AdminCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "published") return matchesSearch && course.status === "published";
    if (activeTab === "pending") return matchesSearch && course.status === "pending";
    
    return matchesSearch;
  });

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Course Management</h1>
            <p className="text-muted-foreground">Manage courses and approvals</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Advanced Search
            </Button>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Course
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            </TabsList>
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">Category: {course.category}</span>
                          {course.status === "published" && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">Students: {course.students}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">Published: {course.publishedDate}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {course.status === "pending" ? (
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                            Pending Approval
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Published
                          </span>
                        )}
                        <div className="flex gap-2">
                          {course.status === "pending" ? (
                            <>
                              <Button variant="ghost" size="icon" className="text-green-600">
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-600">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="published" className="space-y-4">
            {/* Content for published courses tab */}
            <Card>
              <CardHeader>
                <CardTitle>Published Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCourses.map((course) => course.status === "published" && (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      {/* Same content structure as "all" tab but filtered */}
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">Category: {course.category}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">Students: {course.students}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">Published: {course.publishedDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Published
                        </span>
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {/* Content for pending courses tab */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Approval Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCourses.map((course) => course.status === "pending" && (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      {/* Same content structure as "all" tab but filtered */}
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">Category: {course.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                          Pending Approval
                        </span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600">
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
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

export default AdminCourses;
