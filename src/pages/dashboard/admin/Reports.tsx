
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Download, FileText, Filter } from "lucide-react";

const AdminReports = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Analytics and platform statistics</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Reports
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Analytics</TabsTrigger>
            <TabsTrigger value="courses">Course Analytics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                  <CardDescription>New users and course enrollments</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  <span className="ml-2 text-muted-foreground">Growth Chart Visualization</span>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>User Registration</CardTitle>
                  <CardDescription>New user sign-ups over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  <span className="ml-2 text-muted-foreground">User Registration Chart</span>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Course Enrollments</CardTitle>
                  <CardDescription>Enrollments by category</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  <span className="ml-2 text-muted-foreground">Course Enrollments Chart</span>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Most Popular Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="pb-4 border-b">
                      <p className="font-medium">Complete Web Development Bootcamp</p>
                      <p className="text-sm text-muted-foreground">245 students enrolled</p>
                    </div>
                    <div className="pb-4 border-b">
                      <p className="font-medium">Digital Marketing Masterclass</p>
                      <p className="text-sm text-muted-foreground">178 students enrolled</p>
                    </div>
                    <div className="pb-4 border-b">
                      <p className="font-medium">Business Strategy Fundamentals</p>
                      <p className="text-sm text-muted-foreground">124 students enrolled</p>
                    </div>
                    <div>
                      <p className="font-medium">UX/UI Design Principles</p>
                      <p className="text-sm text-muted-foreground">98 students enrolled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Instructors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="pb-4 border-b">
                      <p className="font-medium">Jessica Kim</p>
                      <p className="text-sm text-muted-foreground">6 courses · 4.9 avg rating</p>
                    </div>
                    <div className="pb-4 border-b">
                      <p className="font-medium">Lisa Chen</p>
                      <p className="text-sm text-muted-foreground">5 courses · 4.7 avg rating</p>
                    </div>
                    <div className="pb-4 border-b">
                      <p className="font-medium">James Anderson</p>
                      <p className="text-sm text-muted-foreground">4 courses · 4.8 avg rating</p>
                    </div>
                    <div>
                      <p className="font-medium">David Martinez</p>
                      <p className="text-sm text-muted-foreground">3 courses · 4.6 avg rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="pb-4 border-b">
                      <p className="font-medium">November 2023</p>
                      <p className="text-sm text-muted-foreground">$15,750 (+12% from October)</p>
                    </div>
                    <div className="pb-4 border-b">
                      <p className="font-medium">October 2023</p>
                      <p className="text-sm text-muted-foreground">$14,050 (+8% from September)</p>
                    </div>
                    <div className="pb-4 border-b">
                      <p className="font-medium">September 2023</p>
                      <p className="text-sm text-muted-foreground">$13,000 (+15% from August)</p>
                    </div>
                    <div>
                      <p className="font-medium">August 2023</p>
                      <p className="text-sm text-muted-foreground">$11,300</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <CardDescription>Detailed user statistics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <FileText className="h-16 w-16 text-muted-foreground/50" />
                  <span className="ml-2 text-muted-foreground">User analytics reports will appear here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Analytics</CardTitle>
                <CardDescription>Detailed course statistics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <FileText className="h-16 w-16 text-muted-foreground/50" />
                  <span className="ml-2 text-muted-foreground">Course analytics reports will appear here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Detailed revenue statistics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <FileText className="h-16 w-16 text-muted-foreground/50" />
                  <span className="ml-2 text-muted-foreground">Revenue analytics reports will appear here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;
