
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, BookOpen, PlayCircle, CheckCircle, Clock, Award, BarChart } from "lucide-react";
import { useCourseDetail } from "@/hooks/useCourseDetail";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const CourseLearning = () => {
  const { id } = useParams<{ id: string }>();
  const { course, isLoading } = useCourseDetail(id || "");
  const { toast } = useToast();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState(30); // Mock progress value

  // Mock lessons data
  const lessons = [
    { id: "1", title: "Introduction to the Course", duration: "15:00", completed: true, type: "video" },
    { id: "2", title: "Getting Started with Fundamentals", duration: "22:30", completed: true, type: "video" },
    { id: "3", title: "Core Concepts and Principles", duration: "18:45", completed: false, type: "video" },
    { id: "4", title: "Practical Applications", duration: "25:10", completed: false, type: "video" },
    { id: "5", title: "Quiz 1: Fundamentals", duration: "10:00", completed: false, type: "quiz" },
    { id: "6", title: "Advanced Techniques", duration: "30:15", completed: false, type: "video" },
    { id: "7", title: "Case Studies and Examples", duration: "28:00", completed: false, type: "video" },
    { id: "8", title: "Final Assessment", duration: "20:00", completed: false, type: "quiz" },
  ];

  // Mock notes data
  const [notes, setNotes] = useState<string[]>([
    "Remember to review the key concepts from lesson 2",
    "The formula explained at 12:30 is important for the quiz"
  ]);
  const [newNote, setNewNote] = useState("");

  const currentLesson = lessons[currentLessonIndex];

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote("");
      toast({
        title: "Note added",
        description: "Your note has been saved successfully."
      });
    }
  };

  const markComplete = () => {
    // Would update to the backend in a real app
    setProgress(Math.min(progress + 10, 100));
    toast({
      title: "Progress updated",
      description: "Lesson marked as completed."
    });
  };

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-lg">Loading course content...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-background">
        <div className="container mx-auto px-4 py-8">
          {course ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                {/* Video Player and Content Section */}
                <div className="w-full md:w-2/3 space-y-6">
                  <div className="bg-black aspect-video rounded-lg flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white opacity-80" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{currentLesson.duration}</span>
                      </div>
                    </div>
                    
                    <Progress value={progress} className="h-2" />
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={prevLesson} 
                        disabled={currentLessonIndex === 0}
                      >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={nextLesson} 
                        disabled={currentLessonIndex === lessons.length - 1}
                      >
                        Next
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={markComplete} 
                        className="ml-auto"
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Mark as Complete
                      </Button>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="content">
                    <TabsList>
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="notes">My Notes</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="content" className="p-4 border rounded-md mt-2 min-h-[200px]">
                      <div className="prose max-w-none">
                        <h3>Course Description</h3>
                        <p>{course.description}</p>
                        <p>This lesson covers the fundamental concepts you need to understand before diving deeper into the course material. Pay special attention to the terminology introduced here as it will be used throughout the course.</p>
                        <h4>Key Learning Points:</h4>
                        <ul>
                          <li>Understanding the core principles</li>
                          <li>How to apply these concepts in real-world scenarios</li>
                          <li>Common pitfalls and how to avoid them</li>
                          <li>Best practices for implementation</li>
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="notes" className="p-4 border rounded-md mt-2 min-h-[200px]">
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            className="flex-grow border rounded-md px-3 py-2"
                            placeholder="Add a new note..." 
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addNote()}
                          />
                          <Button onClick={addNote}>Add Note</Button>
                        </div>
                        
                        <div className="space-y-2">
                          {notes.map((note, i) => (
                            <div key={i} className="bg-muted p-3 rounded-md">
                              <p>{note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="resources" className="p-4 border rounded-md mt-2 min-h-[200px]">
                      <div className="space-y-4">
                        <h3 className="font-medium">Additional Resources</h3>
                        <ul className="space-y-2">
                          <li>
                            <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                              <BookOpen className="h-4 w-4" />
                              <span>Supplementary Reading Material</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                              <PlayCircle className="h-4 w-4" />
                              <span>Workshop Recording - Practice Session</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                              <BarChart className="h-4 w-4" />
                              <span>Case Study: Real-world Applications</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* Course Outline Section */}
                <div className="w-full md:w-1/3 bg-card rounded-lg border shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">Course Outline</h2>
                    <div className="text-sm text-muted-foreground">{progress}% Complete</div>
                  </div>
                  
                  <Progress value={progress} className="h-2 mb-4" />
                  
                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                    {lessons.map((lesson, index) => (
                      <div 
                        key={lesson.id}
                        className={`p-3 rounded-md cursor-pointer transition-colors ${
                          currentLessonIndex === index 
                            ? "bg-primary/10 border border-primary/30" 
                            : "hover:bg-accent"
                        }`}
                        onClick={() => setCurrentLessonIndex(index)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 ${lesson.completed ? "text-primary" : "text-muted-foreground"}`}>
                              {lesson.type === "video" ? <PlayCircle className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                            </div>
                            <div>
                              <div className={`text-sm font-medium ${lesson.completed ? "text-primary" : ""}`}>
                                {lesson.title}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>
                          {lesson.completed && <CheckCircle className="h-4 w-4 text-primary" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="text-center">
                    <Button variant="outline" className="w-full" disabled={progress < 100}>
                      <Award className="mr-2 h-4 w-4" />
                      Get Certificate
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Complete all lessons to earn your certificate
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Course not found</h2>
              <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <a href="/courses">Browse Courses</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseLearning;
