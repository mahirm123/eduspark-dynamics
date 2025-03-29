import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Mail, 
  Globe, 
  Facebook, 
  Twitter, 
  Linkedin
} from "lucide-react";
import { Teacher } from "@/components/teachers/TeacherCard";
import CourseCard from "@/components/courses/CourseCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import gsap from "gsap";
import { teacherAPI } from "@/services/api";

const TeacherProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherData = async () => {
      setLoading(true);
      try {
        const teacherData = await teacherAPI.getTeacherProfile(id || "");
        setTeacher(teacherData);
        
        const teacherCourses = await teacherAPI.getTeacherCourses(id || "");
        setCourses(teacherCourses);
      } catch (error) {
        console.error("Failed to fetch teacher data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();

    // Animation for page elements
    const tl = gsap.timeline();
    tl.fromTo(
      ".profile-animate",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" }
    );
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4">Loading teacher profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Teacher Not Found</h2>
            <p className="text-muted-foreground mb-6">The teacher profile you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/teachers">Back to Teachers</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="profile-animate">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-32 w-32 mb-4 border-4 border-primary/10">
                      <AvatarImage src={teacher.avatar} alt={teacher.name} />
                      <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <h1 className="text-2xl font-bold">{teacher.name}</h1>
                    <p className="text-muted-foreground">{teacher.title}</p>
                    
                    <div className="flex items-center mt-3">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="ml-1 font-medium">{teacher.rating}</span>
                      <span className="text-muted-foreground ml-1">({teacher.reviewsCount} reviews)</span>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="grid grid-cols-2 w-full gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold">{teacher.studentsCount}</p>
                        <p className="text-sm text-muted-foreground">Students</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{teacher.coursesCount}</p>
                        <p className="text-sm text-muted-foreground">Courses</p>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="w-full">
                      <h3 className="font-medium mb-2 text-left">Specialty</h3>
                      <Badge variant="secondary" className="mr-1 mb-1">
                        {teacher.specialty}
                      </Badge>
                    </div>
                    
                    <div className="w-full mt-6">
                      <h3 className="font-medium mb-2 text-left">Connect</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Globe className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="courses" className="profile-animate">
                <TabsList className="mb-6">
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Courses by {teacher.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                  {courses.length > 0 && (
                    <div className="text-center mt-8">
                      <Button asChild>
                        <Link to={`/teachers/${teacher.id}/courses`}>
                          View All Courses
                        </Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="about">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">About {teacher.name}</h2>
                      <p className="text-muted-foreground mb-6">{teacher.bio}</p>
                      
                      <h3 className="text-lg font-semibold mb-3">Experience & Credentials</h3>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <Award className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                          <span>10+ years of industry experience in {teacher.specialty}</span>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                          <span>PhD in Computer Science from Stanford University</span>
                        </li>
                        <li className="flex items-start">
                          <BookOpen className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                          <span>Author of "Mastering Web Development" (2021)</span>
                        </li>
                        <li className="flex items-start">
                          <Users className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                          <span>Technical Lead at Google (2015-2020)</span>
                        </li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mb-3">Teaching Style</h3>
                      <p className="text-muted-foreground">
                        I believe in practical, project-based learning that prepares students for real-world challenges. 
                        My courses include hands-on exercises, coding challenges, and comprehensive projects that will 
                        help you build a strong portfolio. I'm known for explaining complex concepts in simple terms and 
                        providing personalized feedback to help you grow.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Student Reviews</h2>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-5 w-5 ${i < Math.floor(teacher.rating) ? "text-amber-400 fill-amber-400" : "text-muted"}`} 
                              />
                            ))}
                          </div>
                          <span className="font-medium">{teacher.rating}</span>
                          <span className="text-muted-foreground ml-1">({teacher.reviewsCount} reviews)</span>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <p className="text-center text-muted-foreground py-8">
                          Reviews are loading...
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherProfile;
