
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Video, 
  FileText, 
  Send,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TeacherHelp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support Ticket Submitted",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Help & Support</h1>
            <p className="text-muted-foreground">Get assistance and find answers to your questions</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search help topics..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="faq" className="space-y-4">
          <TabsList>
            <TabsTrigger value="faq">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="guides">
              <BookOpen className="h-4 w-4 mr-2" />
              Teaching Guides
            </TabsTrigger>
            <TabsTrigger value="contact">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I create a live session?</AccordionTrigger>
                    <AccordionContent>
                      <p>To create a live session:</p>
                      <ol className="list-decimal ml-5 space-y-2 mt-2">
                        <li>Navigate to your Teacher Dashboard</li>
                        <li>Click the "Create Live Session" button</li>
                        <li>Fill out the session details including title, description, date, and time</li>
                        <li>Select the associated course</li>
                        <li>Click "Schedule Session" to publish</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I upload course materials?</AccordionTrigger>
                    <AccordionContent>
                      <p>To upload course materials:</p>
                      <ol className="list-decimal ml-5 space-y-2 mt-2">
                        <li>Go to the "Upload" section in your dashboard</li>
                        <li>Select the course you want to add materials to</li>
                        <li>Choose the file type (video, document, quiz, etc.)</li>
                        <li>Upload your file and add relevant metadata</li>
                        <li>Set visibility settings and publish</li>
                      </ol>
                      <p className="mt-2">Supported file types include: PDF, DOCX, MP4, JPG, PNG, and more.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How are my earnings calculated?</AccordionTrigger>
                    <AccordionContent>
                      <p>Your earnings are calculated based on:</p>
                      <ul className="list-disc ml-5 space-y-2 mt-2">
                        <li>Course enrollments (70% of course fee goes to the instructor)</li>
                        <li>Live session attendance (fixed rate plus attendance bonuses)</li> 
                        <li>Premium content sales (80% revenue share)</li>
                      </ul>
                      <p className="mt-2">Payments are processed monthly with a minimum threshold of $50 for withdrawal.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I respond to student messages?</AccordionTrigger>
                    <AccordionContent>
                      <p>When students send you messages, you'll receive a notification. To respond:</p>
                      <ol className="list-decimal ml-5 space-y-2 mt-2">
                        <li>Go to the "Messages" section in your dashboard</li>
                        <li>Select the conversation you want to respond to</li>
                        <li>Type your reply and send</li>
                      </ol>
                      <p className="mt-2">We recommend responding to student inquiries within 24-48 hours.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="guides" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Teaching Guides & Resources</CardTitle>
                <CardDescription>Helpful materials to improve your teaching</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-muted">
                    <CardContent className="p-4 flex gap-4">
                      <Video className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium mb-1">Creating Engaging Video Lessons</h3>
                        <p className="text-sm text-muted-foreground mb-2">Learn techniques for creating professional and engaging video content.</p>
                        <Button variant="link" className="p-0 h-auto">Read Guide</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border border-muted">
                    <CardContent className="p-4 flex gap-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium mb-1">Assessment Strategies</h3>
                        <p className="text-sm text-muted-foreground mb-2">Effective methods for assessing student learning and providing feedback.</p>
                        <Button variant="link" className="p-0 h-auto">Read Guide</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border border-muted">
                    <CardContent className="p-4 flex gap-4">
                      <MessageSquare className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium mb-1">Building Community</h3>
                        <p className="text-sm text-muted-foreground mb-2">Strategies for fostering an engaged learning community.</p>
                        <Button variant="link" className="p-0 h-auto">Read Guide</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border border-muted">
                    <CardContent className="p-4 flex gap-4">
                      <BookOpen className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium mb-1">Course Structure Best Practices</h3>
                        <p className="text-sm text-muted-foreground mb-2">How to organize your course for maximum student engagement.</p>
                        <Button variant="link" className="p-0 h-auto">Read Guide</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Submit a support ticket and we'll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="What's your question about?" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                    <select 
                      id="category" 
                      className="w-full h-10 px-3 rounded-md border border-input bg-background" 
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="content">Course Content</option>
                      <option value="payments">Payments & Earnings</option>
                      <option value="students">Student Management</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Please describe your issue in detail..." 
                      rows={5} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Attachments (Optional)</label>
                    <Input id="attachment" type="file" />
                    <p className="text-xs text-muted-foreground mt-1">Attach screenshots or relevant files (Max 5MB)</p>
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherHelp;
