
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  UploadCloud,
  File,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { uploadAPI, courseAPI } from "@/services/api";

const TeacherUpload = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [lessonId, setLessonId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // Mock courses data - would be fetched from API in real app
  const [courses, setCourses] = useState([
    { id: "1", title: "Complete Web Development Bootcamp" },
    { id: "2", title: "JavaScript: From Fundamentals to Advanced" },
    { id: "3", title: "Modern React with Redux and Hooks" }
  ]);
  
  // Mock lessons data - would be fetched based on selected course
  const [lessons, setLessons] = useState([
    { id: "1", title: "Introduction to the Course" },
    { id: "2", title: "Getting Started with Fundamentals" },
    { id: "3", title: "Advanced Concepts" }
  ]);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile || !selectedCourse) {
      toast({
        title: "Missing information",
        description: "Please select a course and a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', title || selectedFile.name);
      formData.append('description', description);
      
      if (lessonId) {
        formData.append('lessonId', lessonId);
      }
      
      // In a real app, this would call the actual API
      // const response = await uploadAPI.uploadCourseContent(selectedCourse, formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast({
        title: "Upload successful",
        description: "Your content has been uploaded successfully",
      });
      
      // Reset form after successful upload
      setTimeout(() => {
        setIsUploading(false);
        setSelectedFile(null);
        setUploadProgress(0);
        setTitle("");
        setDescription("");
      }, 1000);
      
    } catch (error) {
      clearInterval(progressInterval);
      console.error("Upload error:", error);
      
      toast({
        title: "Upload failed",
        description: "There was an error uploading your content. Please try again.",
        variant: "destructive",
      });
      
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  
  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Upload Content</h1>
          <p className="text-muted-foreground">Upload course materials, videos, and resources</p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="course">Select Course</Label>
                <Select
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                >
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCourse && (
                <div className="grid gap-3">
                  <Label htmlFor="lesson">Lesson (Optional)</Label>
                  <Select
                    value={lessonId}
                    onValueChange={setLessonId}
                  >
                    <SelectTrigger id="lesson">
                      <SelectValue placeholder="Select a lesson or create new" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Create New Lesson</SelectItem>
                      {lessons.map(lesson => (
                        <SelectItem key={lesson.id} value={lesson.id}>
                          {lesson.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Leave empty to create a new lesson with this content
                  </p>
                </div>
              )}
              
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter content title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter content description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="grid gap-3">
                <Label>Upload File</Label>
                <div
                  className={`border-2 border-dashed rounded-md p-8 ${
                    selectedFile ? "border-primary" : "border-input"
                  } hover:border-primary transition-colors`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.mp4,.jpg,.jpeg,.png,.pptx,.docx"
                  />
                  
                  {!selectedFile ? (
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                      <UploadCloud className="h-12 w-12 text-muted-foreground" />
                      <div>
                        <p className="text-base font-medium">
                          Drag and drop a file here, or{" "}
                          <Button
                            type="button"
                            variant="link"
                            className="p-0 h-auto text-primary"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            browse
                          </Button>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Support for PDF, MP4, JPEG, PNG, PPTX, DOCX (Max 50MB)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <File className="h-8 w-8 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={removeSelectedFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {isUploading && (
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Uploading...</span>
                    <span className="text-sm">{uploadProgress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload Content"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherUpload;
