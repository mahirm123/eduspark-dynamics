
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, CreditCard, Filter, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

// Mock transactions data
const mockTransactions = [
  {
    id: "t1",
    user: "Alex Thompson",
    email: "alex.t@example.com",
    amount: 89.99,
    course: "Digital Marketing Masterclass",
    date: "Nov 5, 2023",
    status: "completed",
    paymentMethod: "Credit Card"
  },
  {
    id: "t2",
    user: "Emma Davis",
    email: "emma.d@example.com",
    amount: 129.99,
    course: "Advanced Python Programming",
    date: "Nov 4, 2023",
    status: "completed",
    paymentMethod: "PayPal"
  },
  {
    id: "t3",
    user: "Lucas Martin",
    email: "lucas.m@example.com",
    amount: 49.99,
    course: "UI/UX Design Essentials",
    date: "Nov 4, 2023",
    status: "pending",
    paymentMethod: "Credit Card"
  },
  {
    id: "t4",
    user: "Sophia Rodriguez",
    email: "sophia.r@example.com",
    amount: 79.99,
    course: "Photography Fundamentals",
    date: "Nov 3, 2023",
    status: "failed",
    paymentMethod: "Credit Card"
  },
  {
    id: "t5",
    user: "Michael Brown",
    email: "michael.b@example.com",
    amount: 159.99,
    course: "Complete Web Development Bootcamp",
    date: "Nov 2, 2023",
    status: "completed",
    paymentMethod: "PayPal"
  },
  {
    id: "t6",
    user: "Jennifer Wilson",
    email: "jennifer.w@example.com",
    amount: 69.99,
    course: "Social Media Marketing",
    date: "Nov 1, 2023",
    status: "refunded",
    paymentMethod: "Credit Card"
  }
];

const AdminPayments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
      transaction.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "completed") return matchesSearch && transaction.status === "completed";
    if (activeTab === "pending") return matchesSearch && transaction.status === "pending";
    if (activeTab === "failed") return matchesSearch && (transaction.status === "failed" || transaction.status === "refunded");
    
    return matchesSearch;
  });

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4" />;
      case "failed":
        return <XCircle className="h-4 w-4" />;
      case "refunded":
        return <CreditCard className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Payment Management</h1>
            <p className="text-muted-foreground">Track and manage all transactions</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Transactions
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Revenue Summary</CardTitle>
            <CardDescription>Current period overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
                <p className="text-3xl font-bold mt-1">$32,750</p>
                <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Completed Transactions</h3>
                <p className="text-3xl font-bold mt-1">187</p>
                <p className="text-sm text-green-600 mt-1">↑ 8% from last month</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Average Order Value</h3>
                <p className="text-3xl font-bold mt-1">$75.32</p>
                <p className="text-sm text-green-600 mt-1">↑ 5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed">Failed/Refunded</TabsTrigger>
            </TabsList>
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{transaction.user}</p>
                          <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusBadgeClasses(transaction.status)}`}>
                            {getStatusIcon(transaction.status)}
                            <span>{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span>
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{transaction.email}</p>
                        <p className="text-sm text-muted-foreground mt-1">{transaction.course}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{transaction.date}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{transaction.paymentMethod}</span>
                        </div>
                      </div>
                      <div className="mt-3 md:mt-0">
                        <span className="text-xl font-bold">${transaction.amount}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No transactions found matching your search</p>
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

export default AdminPayments;
