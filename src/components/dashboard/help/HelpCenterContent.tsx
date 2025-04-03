
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpArticle } from "@/components/dashboard/help/HelpArticle";
import { HelpFAQSection } from "@/components/dashboard/help/HelpFAQSection";
import { HelpContactForm } from "@/components/dashboard/help/HelpContactForm";
import { Search, BookOpen, HelpCircle, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type UserRoleType = "student" | "teacher" | "admin";

interface HelpCenterContentProps {
  userRole: UserRoleType;
}

export const HelpCenterContent = ({ userRole }: HelpCenterContentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search submitted",
        description: `Searching for: "${searchQuery}"`,
      });
      // In a real app, we would search for help articles here
    }
  };
  
  const roleSpecificContent = {
    admin: {
      guides: [
        {
          id: "user-management",
          title: "User Management Guide",
          description: "Learn how to manage users, roles, and permissions in the admin dashboard.",
          image: "https://images.unsplash.com/photo-1574192773749-57e7591906e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: "Administration",
        },
        {
          id: "content-moderation",
          title: "Content Moderation",
          description: "Guidelines for moderating course content and ensuring quality.",
          image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: "Moderation",
        },
        {
          id: "reports-analytics",
          title: "Reports & Analytics",
          description: "Understanding and utilizing the analytics dashboard effectively.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: "Analytics",
        },
      ],
      faqs: [
        {
          question: "How do I approve a new teacher account?",
          answer: "Navigate to Users > Pending Approvals in your admin dashboard. Review the teacher's credentials and click the 'Approve' button to grant them teacher privileges."
        },
        {
          question: "How can I generate custom reports?",
          answer: "Go to Reports > Custom Reports. Select the metrics you want to include, specify the date range, and click 'Generate Report'. You can then download it in CSV or PDF format."
        },
        {
          question: "How do I handle user support tickets?",
          answer: "All support tickets appear in the Support section. Click on a ticket to view details, assign it to a team member, or respond directly. Mark as resolved when completed."
        },
      ]
    },
    teacher: {
      guides: [
        {
          id: "course-creation",
          title: "Course Creation Guide",
          description: "Step-by-step instructions for creating engaging courses.",
          image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: "Teaching",
        },
        {
          id: "student-management",
          title: "Managing Your Students",
          description: "Best practices for student engagement and progress tracking.",
          image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: "Management",
        },
        {
          id: "video-upload",
          title: "Video Lesson Creation",
          description: "How to record, edit, and upload high-quality video lessons.",
          image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: "Content",
        },
      ],
      faqs: [
        {
          question: "How do I schedule a live session?",
          answer: "Navigate to your Dashboard > Schedule > Create Live Session. Enter the session details, select the course, set the date and time, then click 'Schedule Session'."
        },
        {
          question: "How do I view student progress?",
          answer: "Go to your Students tab, select a specific student, and you'll see their progress across your courses including completion rates, quiz scores, and time spent."
        },
        {
          question: "How are teacher payments calculated?",
          answer: "Teacher payments are calculated based on course sales minus the platform fee (20%). Payments are processed monthly and detailed in your Earnings dashboard."
        },
      ]
    },
    student: {
      guides: [
        {
          id: "getting-started",
          title: "Getting Started Guide",
          description: "Everything you need to know to start learning on our platform.",
          image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: "Basics",
        },
        {
          id: "course-navigation",
          title: "Navigating Courses",
          description: "Learn how to make the most of course materials and features.",
          image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: "Learning",
        },
        {
          id: "certificates",
          title: "Course Certificates",
          description: "How to earn and download certificates for completed courses.",
          image: "https://images.unsplash.com/photo-1471970394675-613138e45da3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: "Achievements",
        },
      ],
      faqs: [
        {
          question: "How do I join a live class?",
          answer: "When a live class is scheduled, you'll receive a notification. Go to your Dashboard > Schedule, find the class, and click 'Join Class' at the scheduled time."
        },
        {
          question: "Can I download course materials for offline viewing?",
          answer: "Yes, most course materials can be downloaded for offline viewing. Look for the download icon next to lectures, PDFs, and other resources."
        },
        {
          question: "How do I request a refund?",
          answer: "Refunds can be requested within 30 days of purchase. Go to My Courses > [Course Name] > Request Refund. Fill out the form explaining your reason."
        },
      ]
    }
  };

  // Get content based on user role
  const content = roleSpecificContent[userRole] || roleSpecificContent.student;

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">How can we help you today?</h2>
              <p className="text-muted-foreground">
                Search our knowledge base or browse through common topics
              </p>
            </div>
            
            <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search help articles..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex justify-center mt-2">
                <Button type="submit">Search</Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="guides">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="guides" className="flex gap-2 items-center">
            <BookOpen className="h-4 w-4" />
            <span>Help Guides</span>
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex gap-2 items-center">
            <HelpCircle className="h-4 w-4" />
            <span>FAQs</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex gap-2 items-center">
            <MessageSquare className="h-4 w-4" />
            <span>Contact Support</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.guides.map((article) => (
              <HelpArticle key={article.id} article={article} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <HelpFAQSection faqs={content.faqs} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support Team</CardTitle>
            </CardHeader>
            <CardContent>
              <HelpContactForm userRole={userRole} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
