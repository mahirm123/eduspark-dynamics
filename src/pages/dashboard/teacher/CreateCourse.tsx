
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Upload, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Course Created",
      description: "Your course has been created as a draft. You can now add lessons and content.",
    });
    navigate("/dashboard/teacher/courses");
  };

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create New Course</h1>
            <p className="text-muted-foreground">Start building your new online course</p>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        <Tabs defaultValue="basic" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Provide the essential details about your course.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input id="title" placeholder="Enter an engaging course title" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="short-description">Short Description</Label>
                    <Input 
                      id="short-description" 
                      placeholder="Brief description (displayed in search results)" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Full Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Detailed description of what students will learn"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="health">Health & Fitness</SelectItem>
                          <SelectItem value="language">Language</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="level">Difficulty Level</Label>
                      <Select required>
                        <SelectTrigger id="level">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Course Thumbnail</Label>
                    <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-2">
                        <p className="text-sm font-medium">Drag & drop your image here</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP (16:9 ratio recommended)</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4">
                        <Upload className="mr-2 h-4 w-4" />
                        Browse Files
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("details")}>
                      Continue to Course Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                  <CardDescription>
                    Define what students will learn and course requirements.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">What Students Will Learn</h3>
                      <Button variant="outline" size="sm" type="button">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Item
                      </Button>
                    </div>
                    
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex gap-2 items-center">
                        <Input placeholder={`Learning outcome ${item}`} className="flex-grow" />
                        <Button variant="ghost" size="icon" type="button">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Course Requirements</h3>
                      <Button variant="outline" size="sm" type="button">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Requirement
                      </Button>
                    </div>
                    
                    {[1, 2].map((item) => (
                      <div key={item} className="flex gap-2 items-center">
                        <Input placeholder={`Requirement ${item}`} className="flex-grow" />
                        <Button variant="ghost" size="icon" type="button">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="promo-video">Promotional Video URL (Optional)</Label>
                    <Input id="promo-video" placeholder="YouTube or Vimeo URL" />
                    <p className="text-xs text-muted-foreground">
                      Add a short video to showcase your course to potential students
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Estimated Course Duration</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input id="duration" type="number" min="1" placeholder="Number of hours" />
                      </div>
                      <div>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Time unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between space-x-2">
                    <Button variant="outline" type="button" onClick={() => setActiveTab("basic")}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("pricing")}>
                      Continue to Pricing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Course Pricing</CardTitle>
                  <CardDescription>
                    Set your course pricing and access options.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Pricing Type</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                      <div className="border rounded-lg p-4 cursor-pointer bg-primary/5">
                        <div className="font-medium">Free</div>
                        <p className="text-sm text-muted-foreground">
                          Available to anyone at no cost
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 cursor-pointer">
                        <div className="font-medium">One-time Payment</div>
                        <p className="text-sm text-muted-foreground">
                          Single payment for lifetime access
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 cursor-pointer">
                        <div className="font-medium">Subscription</div>
                        <p className="text-sm text-muted-foreground">
                          Recurring payment for access
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 opacity-50 pointer-events-none">
                    <Label htmlFor="price">Price ($USD)</Label>
                    <Input id="price" type="number" placeholder="0.00" disabled />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Additional Options</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="border shadow-none">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Course Certificate</p>
                              <p className="text-xs text-muted-foreground">
                                Issue certificates upon completion
                              </p>
                            </div>
                            <input type="checkbox" className="h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border shadow-none">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Download Materials</p>
                              <p className="text-xs text-muted-foreground">
                                Allow resource downloads
                              </p>
                            </div>
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex justify-between space-x-2">
                    <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                      Back
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline">Save as Draft</Button>
                      <Button type="submit">Create Course</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CreateCourse;
