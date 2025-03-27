
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, FileText, Video, Image } from "lucide-react";

const TeacherUpload = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Upload Content</h1>
          <p className="text-muted-foreground">Add materials to your courses</p>
        </div>
        
        <Tabs defaultValue="files">
          <TabsList>
            <TabsTrigger value="files">Course Files</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="quiz">Quizzes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="files" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
                <CardDescription>Upload documents, presentations, and other learning materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <UploadCloud className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drag and drop files here</p>
                    <p className="text-sm text-muted-foreground mt-1">or click to browse files from your computer</p>
                  </div>
                  <div>
                    <Label htmlFor="file-upload" className="sr-only">Choose files</Label>
                    <Button variant="outline">Browse Files</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Videos</CardTitle>
                <CardDescription>Add video lectures and tutorials to your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drag and drop videos here</p>
                    <p className="text-sm text-muted-foreground mt-1">or click to browse videos from your computer</p>
                  </div>
                  <div>
                    <Label htmlFor="video-upload" className="sr-only">Choose videos</Label>
                    <Button variant="outline">Browse Videos</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quiz" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Quizzes</CardTitle>
                <CardDescription>Build assessments and quizzes for your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">No quizzes created yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Create a new quiz to assess your students</p>
                  </div>
                  <div>
                    <Button>Create New Quiz</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherUpload;
