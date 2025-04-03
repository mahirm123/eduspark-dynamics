
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Video, 
  Plus, 
  ArrowLeft, 
  ArrowRight,
  MoreHorizontal,
  Edit,
  Trash,
  FileEdit
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock schedule data
const scheduleData = {
  upcomingSessions: [
    {
      id: 1,
      title: "Live Q&A: React Hooks Deep Dive",
      date: "Nov 12, 2023",
      startTime: "3:00 PM",
      endTime: "4:30 PM",
      students: 45,
      course: "Advanced React Patterns",
      type: "Q&A"
    },
    {
      id: 2,
      title: "Workshop: Building a Portfolio Website",
      date: "Nov 18, 2023",
      startTime: "2:00 PM",
      endTime: "5:00 PM",
      students: 32,
      course: "Complete Web Development Bootcamp",
      type: "Workshop"
    },
    {
      id: 3,
      title: "Design Systems Fundamentals",
      date: "Nov 24, 2023",
      startTime: "1:00 PM",
      endTime: "2:30 PM",
      students: 28,
      course: "UI/UX Design Fundamentals",
      type: "Lecture"
    }
  ],
  pastSessions: [
    {
      id: 4,
      title: "JavaScript ES6+ Features",
      date: "Oct 28, 2023",
      startTime: "3:00 PM",
      endTime: "4:00 PM",
      students: 38,
      course: "Complete Web Development Bootcamp",
      type: "Lecture",
      recordings: true
    },
    {
      id: 5,
      title: "Project Review Session",
      date: "Nov 2, 2023",
      startTime: "4:00 PM",
      endTime: "6:00 PM",
      students: 12,
      course: "Advanced React Patterns",
      type: "Review",
      recordings: true
    }
  ],
  calendar: {
    currentMonth: "November 2023",
    days: Array.from({ length: 30 }, (_, i) => i + 1),
    events: [
      { day: 12, events: 1, title: "React Hooks Q&A" },
      { day: 18, events: 1, title: "Portfolio Workshop" },
      { day: 24, events: 1, title: "Design Systems" }
    ]
  }
};

// Function to get badge color based on session type
const getSessionTypeBadge = (type: string) => {
  switch (type) {
    case "Lecture":
      return "bg-blue-100 text-blue-600 border-blue-200";
    case "Workshop":
      return "bg-green-100 text-green-600 border-green-200";
    case "Q&A":
      return "bg-violet-100 text-violet-600 border-violet-200";
    case "Review":
      return "bg-amber-100 text-amber-600 border-amber-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

const TeacherSchedule = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Schedule</h1>
            <p className="text-muted-foreground">Manage your teaching schedule and live sessions</p>
          </div>
          
          <Button onClick={() => navigate("/dashboard/teacher/create-live-session")}>
            <Video className="mr-2 h-4 w-4" />
            Create Live Session
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past Sessions</TabsTrigger>
                </TabsList>
                
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="web-dev">Web Development</SelectItem>
                    <SelectItem value="react">Advanced React</SelectItem>
                    <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <TabsContent value="upcoming" className="m-0 space-y-4">
                {scheduleData.upcomingSessions.map((session) => (
                  <Card key={session.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-2/12 bg-primary/5 p-4 flex flex-row sm:flex-col items-center sm:justify-center gap-3">
                          <div className="text-center">
                            <CalendarIcon className="h-5 w-5 text-primary mx-auto mb-1" />
                            <div className="font-medium">{session.date}</div>
                          </div>
                          <div className="text-center">
                            <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
                            <div className="text-sm">{session.startTime}</div>
                          </div>
                        </div>
                        
                        <div className="p-4 flex-grow space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{session.title}</h3>
                              <p className="text-sm text-muted-foreground">{session.course}</p>
                            </div>
                            <Badge variant="outline" className={getSessionTypeBadge(session.type)}>
                              {session.type}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{session.startTime} - {session.endTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{session.students} students enrolled</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4 mr-1" />
                                  Options
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Session
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash className="h-4 w-4 mr-2" />
                                  Cancel Session
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Button>
                              Start Session
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="past" className="m-0 space-y-4">
                {scheduleData.pastSessions.map((session) => (
                  <Card key={session.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-2/12 bg-muted/50 p-4 flex flex-row sm:flex-col items-center sm:justify-center gap-3">
                          <div className="text-center">
                            <CalendarIcon className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                            <div className="font-medium">{session.date}</div>
                          </div>
                          <div className="text-center">
                            <Clock className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                            <div className="text-sm">{session.startTime}</div>
                          </div>
                        </div>
                        
                        <div className="p-4 flex-grow space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{session.title}</h3>
                              <p className="text-sm text-muted-foreground">{session.course}</p>
                            </div>
                            <Badge variant="outline" className={getSessionTypeBadge(session.type)}>
                              {session.type}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{session.startTime} - {session.endTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{session.students} attended</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <FileEdit className="h-4 w-4 mr-2" />
                              Session Notes
                            </Button>
                            {session.recordings && (
                              <Button size="sm">
                                View Recording
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Calendar</CardTitle>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{scheduleData.calendar.currentMonth}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
                    <div key={i} className="p-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-1">
                  {/* Empty spaces at start of month (for alignment) */}
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={`empty-${i}`} className="p-2 rounded-md text-center"></div>
                  ))}
                  
                  {scheduleData.calendar.days.map((day) => {
                    const event = scheduleData.calendar.events.find(e => e.day === day);
                    return (
                      <div
                        key={day}
                        className={`p-2 rounded-md text-center relative cursor-pointer ${
                          event ? "bg-primary/10 font-medium" : "hover:bg-muted/50"
                        }`}
                      >
                        <div>{day}</div>
                        {event && (
                          <div className="absolute -bottom-0.5 left-0 right-0 flex justify-center">
                            <div className="h-1 w-1 rounded-full bg-primary"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium">Upcoming Sessions</h3>
                  <div className="space-y-2">
                    {scheduleData.calendar.events.map((event, idx) => (
                      <div key={idx} className="text-xs p-2 bg-muted/50 rounded flex justify-between items-center">
                        <span>{event.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {event.day} Nov
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to="/dashboard/teacher/create-live-session">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Session
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherSchedule;
