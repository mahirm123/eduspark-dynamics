
import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock, Users, Calendar, Award, FileText, Star } from "lucide-react";
import { useCourseDetail } from "@/hooks/useCourseDetail";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { course, isLoading } = useCourseDetail(id || "");
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && headerRef.current && contentRef.current) {
      // Animate header
      gsap.fromTo(
        headerRef.current.children,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out"
        }
      );

      // Animate content on scroll
      const sections = contentRef.current.querySelectorAll("section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          }
        );
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-lg">Loading course...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
            <p className="mb-8">The course you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/courses">Browse All Courses</Link>
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
      
      <div className="bg-primary/5 pt-16 pb-12" ref={headerRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-7/12">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    {course.category}
                  </Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
                <p className="text-lg text-muted-foreground">{course.description}</p>
                
                <div className="flex items-center gap-6 py-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-muted-foreground">({course.reviewsCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>{course.studentsCount} students</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <img 
                    src="https://i.pravatar.cc/40?img=3" 
                    alt={course.instructor} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">Instructor</p>
                    <p className="font-medium">{course.instructor}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-5/12">
              <div className="bg-card rounded-lg shadow-lg overflow-hidden sticky top-24">
                <div className="aspect-video relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button className="rounded-full size-16" size="icon">
                      <PlayCircle className="h-12 w-12" />
                    </Button>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="text-3xl font-bold">${course.price}</div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full text-md h-12">Enroll Now</Button>
                    <Button variant="outline" className="w-full text-md h-12">Try For Free</Button>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span>Duration</span>
                      </div>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span>Lessons</span>
                      </div>
                      <span className="font-medium">24 Lessons</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>Last Updated</span>
                      </div>
                      <span className="font-medium">June 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-muted-foreground" />
                        <span>Certificate</span>
                      </div>
                      <span className="font-medium">Yes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-12 bg-background" ref={contentRef}>
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full md:w-7/12">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <div className="prose max-w-none">
                  <p>
                    This comprehensive course is designed to take you from beginner to proficient. 
                    You'll learn theory and practical applications through hands-on projects and 
                    real-world examples.
                  </p>
                  <p>
                    By the end of this course, you'll have a thorough understanding of the subject 
                    and be able to apply your knowledge to solve complex problems in the field.
                  </p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Master essential concepts and techniques",
                    "Build real-world projects for your portfolio",
                    "Understand best practices and industry standards",
                    "Troubleshoot common issues and challenges",
                    "Optimize performance and efficiency",
                    "Deploy your projects to production"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Basic understanding of the field</li>
                  <li>A computer with internet access</li>
                  <li>Enthusiasm and dedication to learn</li>
                </ul>
              </section>
            </TabsContent>
            
            <TabsContent value="curriculum" className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                <div className="text-sm text-muted-foreground mb-4">
                  24 lessons • 6 modules • 12 hours total
                </div>
                
                <Accordion type="multiple" className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((module) => (
                    <AccordionItem key={module} value={`module-${module}`} className="border">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-center w-full">
                          <div className="font-medium text-base">Module {module}: Introduction to Concepts</div>
                          <div className="text-sm text-muted-foreground">4 lessons • 2 hours</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pt-1 pb-3">
                        {[1, 2, 3, 4].map((lesson) => (
                          <div key={lesson} className="py-3 flex items-center justify-between border-b last:border-0">
                            <div className="flex items-center gap-3">
                              <PlayCircle className="h-5 w-5 text-muted-foreground" />
                              <span>Lesson {lesson}: Core concepts explained</span>
                            </div>
                            <div className="text-sm text-muted-foreground">30 min</div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </TabsContent>
            
            <TabsContent value="instructor">
              <section>
                <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src="https://i.pravatar.cc/100?img=3" 
                    alt={course.instructor} 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{course.instructor}</h3>
                    <p className="text-muted-foreground">Expert & Senior Educator</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span>4.8 Instructor Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>12,345 Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <PlayCircle className="h-4 w-4" />
                        <span>15 Courses</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p>
                    With over 10 years of industry experience and 5 years of teaching, I specialize in making complex subjects accessible to learners of all levels.
                  </p>
                  <p>
                    My teaching philosophy centers on practical application and real-world examples. I believe in learning by doing, and my courses reflect this approach with hands-on projects and exercises.
                  </p>
                  <p>
                    I'm passionate about helping students achieve their goals and build valuable skills that will serve them throughout their careers.
                  </p>
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="reviews">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Student Reviews</h2>
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3 p-6 bg-muted/30 rounded-lg text-center">
                    <div className="text-5xl font-bold mb-2">{course.rating}</div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`h-5 w-5 ${star <= Math.round(course.rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} 
                        />
                      ))}
                    </div>
                    <div className="text-muted-foreground">{course.reviewsCount} reviews</div>
                  </div>
                  
                  <div className="md:w-2/3 space-y-6">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const percentage = Math.floor(Math.random() * 100);
                      return (
                        <div key={rating} className="flex items-center gap-4">
                          <div className="flex items-center gap-1 w-20">
                            <span>{rating}</span>
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          </div>
                          <div className="flex-grow bg-muted h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="w-16 text-right text-muted-foreground">{percentage}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-6 last:border-0">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={`https://i.pravatar.cc/40?img=${review + 10}`}
                            alt="Reviewer" 
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="text-sm text-muted-foreground">2 months ago</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`h-4 w-4 ${star <= 5 ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p>
                        This course exceeded my expectations! The instructor explains complex topics clearly,
                        and the practical examples were incredibly helpful. I've already applied what I learned
                        to my own projects with great results.
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
