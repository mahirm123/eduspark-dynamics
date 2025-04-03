
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Search,
  Filter,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock support tickets data
const mockTickets = [
  {
    id: "t1",
    user: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    userType: "teacher",
    subject: "Issue with uploading course videos",
    message: "I'm unable to upload videos larger than 200MB. The upload process starts but then fails at about 80% completion. I've tried multiple browsers without success.",
    status: "open",
    priority: "high",
    created: "2 hours ago",
    lastUpdated: "45 minutes ago"
  },
  {
    id: "t2",
    user: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
    userType: "student",
    subject: "Payment failed but course access denied",
    message: "My credit card was charged for the Photography Fundamentals course, but I still don't have access to the course materials. My transaction ID is TX-38492.",
    status: "in-progress",
    priority: "medium",
    created: "1 day ago",
    lastUpdated: "2 hours ago"
  },
  {
    id: "t3",
    user: "Sophia Chen",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100",
    userType: "teacher",
    subject: "Request for course category change",
    message: "I've recently updated my course 'UI/UX Fundamentals' and would like to move it from the Design category to the UX/UI specialized category.",
    status: "resolved",
    priority: "low",
    created: "3 days ago",
    lastUpdated: "1 day ago"
  },
  {
    id: "t4",
    user: "Lucas Martin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    userType: "student",
    subject: "Certificate not generating after course completion",
    message: "I've completed the Advanced Python Programming course with all assignments at 100%, but the system hasn't generated my certificate of completion.",
    status: "open",
    priority: "high",
    created: "4 hours ago",
    lastUpdated: "4 hours ago"
  }
];

const AdminSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = 
      ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "open") return matchesSearch && ticket.status === "open";
    if (activeTab === "in-progress") return matchesSearch && ticket.status === "in-progress";
    if (activeTab === "resolved") return matchesSearch && ticket.status === "resolved";
    
    return matchesSearch;
  });

  const handleResolveTicket = (ticketId: string) => {
    toast({
      title: "Ticket Resolved",
      description: "Support ticket has been marked as resolved.",
    });
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "in-progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getPriorityBadgeClasses = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300";
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Support Management</h1>
            <p className="text-muted-foreground">Manage user support tickets and inquiries</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Ticket
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Support Overview</CardTitle>
            <CardDescription>Current support ticket status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Tickets</h3>
                <p className="text-3xl font-bold mt-1">24</p>
                <p className="text-sm mt-1">Last 30 days</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Open Tickets</h3>
                <p className="text-3xl font-bold mt-1">8</p>
                <p className="text-sm text-red-600 mt-1">↑ 4 since yesterday</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Avg. Response Time</h3>
                <p className="text-3xl font-bold mt-1">3.2h</p>
                <p className="text-sm text-green-600 mt-1">↓ 1.5h from last week</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Resolution Rate</h3>
                <p className="text-3xl font-bold mt-1">92%</p>
                <p className="text-sm text-green-600 mt-1">↑ 3% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Tickets</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
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
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-2 h-[calc(80vh-10rem)] flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle>Ticket List</CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-auto flex-grow">
                <div className="space-y-2">
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <div 
                        key={ticket.id} 
                        className={`border p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedTicket === ticket.id ? 'bg-muted' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedTicket(ticket.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={ticket.avatar} alt={ticket.user} />
                              <AvatarFallback>{ticket.user[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{ticket.user}</p>
                              <Badge variant="outline" className="text-xs">
                                {ticket.userType}
                              </Badge>
                            </div>
                          </div>
                          <Badge className={`${getStatusBadgeClasses(ticket.status)}`}>
                            {ticket.status}
                          </Badge>
                        </div>
                        <h3 className="font-medium mt-2 line-clamp-1">{ticket.subject}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {ticket.message}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{ticket.created}</span>
                          </div>
                          <Badge className={`${getPriorityBadgeClasses(ticket.priority)}`}>
                            {ticket.priority}
                          </Badge>
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
            
            <Card className="lg:col-span-3 h-[calc(80vh-10rem)] flex flex-col">
              {selectedTicket ? (
                <>
                  {mockTickets.filter(t => t.id === selectedTicket).map(ticket => (
                    <div key={ticket.id} className="flex flex-col h-full">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{ticket.subject}</CardTitle>
                            <CardDescription>Ticket #{ticket.id} • {ticket.created}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Users className="h-4 w-4 mr-1" />
                              Assign
                            </Button>
                            <Button size="sm" onClick={() => handleResolveTicket(ticket.id)}>
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow overflow-y-auto">
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar>
                            <AvatarImage src={ticket.avatar} alt={ticket.user} />
                            <AvatarFallback>{ticket.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{ticket.user}</p>
                            <p className="text-xs text-muted-foreground">
                              {ticket.userType} • {ticket.created}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg mb-6">
                          <p>{ticket.message}</p>
                        </div>

                        <div className="border-t pt-4 mt-4">
                          <h3 className="font-medium mb-2">Admin Notes</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {ticket.status === "in-progress" 
                              ? "An agent is currently working on this ticket. Last updated " + ticket.lastUpdated
                              : "No admin notes yet."
                            }
                          </p>
                        </div>
                      </CardContent>
                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <Input placeholder="Type your response..." />
                          <Button>Reply</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-medium">Select a ticket to view</h3>
                    <p className="text-muted-foreground">Choose a support ticket from the list to view details</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSupport;
