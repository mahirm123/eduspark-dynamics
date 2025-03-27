
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MessageSquare, CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";
import { useState } from "react";

// Mock support tickets data
const mockTickets = [
  {
    id: "t1",
    user: "Daniel Brown",
    email: "daniel.b@example.com",
    subject: "Payment issue with course purchase",
    message: "I was charged twice for the Digital Marketing course. Can you help me get a refund for one of the charges?",
    date: "Nov 5, 2023",
    status: "open",
    priority: "high"
  },
  {
    id: "t2",
    user: "Emily Wilson",
    email: "emily.w@example.com",
    subject: "Cannot access course materials",
    message: "I purchased the Web Development course yesterday but I still can't access the materials. The page shows an error.",
    date: "Nov 4, 2023",
    status: "open",
    priority: "medium"
  },
  {
    id: "t3",
    user: "James Anderson",
    email: "james.a@example.com",
    subject: "Certificate not generating after completion",
    message: "I completed all modules of the Python course but didn't receive my certificate. The system shows 100% completion.",
    date: "Nov 3, 2023",
    status: "closed",
    priority: "low"
  },
  {
    id: "t4",
    user: "Olivia Martinez",
    email: "olivia.m@example.com",
    subject: "Requesting course refund",
    message: "I would like to request a refund for the UX Design course. It's not what I expected and I've only watched the first two videos.",
    date: "Nov 2, 2023",
    status: "open",
    priority: "medium"
  },
  {
    id: "t5",
    user: "Michael Johnson",
    email: "michael.j@example.com",
    subject: "Video playback issues",
    message: "The videos in my JavaScript course keep buffering and sometimes won't play at all. I've tried different browsers.",
    date: "Nov 1, 2023",
    status: "in-progress",
    priority: "high"
  }
];

const AdminSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = 
      ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "open") return matchesSearch && ticket.status === "open";
    if (activeTab === "in-progress") return matchesSearch && ticket.status === "in-progress";
    if (activeTab === "closed") return matchesSearch && ticket.status === "closed";
    
    return matchesSearch;
  });

  const getPriorityBadgeClasses = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "open":
        return "bg-amber-100 text-amber-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Support Tickets</h1>
            <p className="text-muted-foreground">Manage user support requests</p>
          </div>
          <Button size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Bulk Resolve
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Open Tickets</p>
                  <p className="text-3xl font-bold mt-1">12</p>
                </div>
                <div className="bg-amber-100 text-amber-800 rounded-full p-2">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-3xl font-bold mt-1">5</p>
                </div>
                <div className="bg-blue-100 text-blue-800 rounded-full p-2">
                  <MessageSquare className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                  <p className="text-3xl font-bold mt-1">8</p>
                </div>
                <div className="bg-green-100 text-green-800 rounded-full p-2">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                  <p className="text-3xl font-bold mt-1">4.2h</p>
                </div>
                <div className="bg-purple-100 text-purple-800 rounded-full p-2">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Tickets</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg overflow-hidden">
                      <div className="p-4 flex flex-col md:flex-row md:items-center gap-4 justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>{ticket.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium">{ticket.user}</p>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClasses(ticket.status)}`}>
                                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBadgeClasses(ticket.priority)}`}>
                                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{ticket.email}</p>
                            <p className="font-medium mt-2">{ticket.subject}</p>
                            <div className="text-sm mt-1">{ticket.message}</div>
                            <p className="text-xs text-muted-foreground mt-2">{ticket.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 md:self-start">
                          {ticket.status !== "closed" && (
                            <Button variant="outline" size="sm">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Reply
                            </Button>
                          )}
                          {ticket.status === "open" && (
                            <Button variant="outline" size="sm">
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark In Progress
                            </Button>
                          )}
                          {ticket.status === "in-progress" && (
                            <Button variant="outline" size="sm">
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Resolve
                            </Button>
                          )}
                          {ticket.status === "closed" && (
                            <Button variant="outline" size="sm">
                              <XCircle className="mr-2 h-4 w-4" />
                              Reopen
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No tickets found matching your search</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSupport;
