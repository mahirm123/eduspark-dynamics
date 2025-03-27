
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, CheckCircle2, AlertTriangle, Info, Clock } from "lucide-react";
import { useState } from "react";

// Mock notifications data
const mockNotifications = [
  {
    id: "n1",
    title: "New course submission",
    message: "Michael Chen submitted 'Advanced Machine Learning' for review",
    type: "course",
    time: "10 minutes ago",
    read: false
  },
  {
    id: "n2",
    title: "System alert",
    message: "Unusual login activity detected from IP 192.168.1.34",
    type: "alert",
    time: "1 hour ago",
    read: false
  },
  {
    id: "n3",
    title: "Payment processed",
    message: "Emma Davis completed payment for 'Advanced Python Programming'",
    type: "payment",
    time: "2 hours ago",
    read: false
  },
  {
    id: "n4",
    title: "Support ticket",
    message: "New support ticket: Payment issue with course purchase",
    type: "support",
    time: "3 hours ago",
    read: true
  },
  {
    id: "n5",
    title: "User registration",
    message: "5 new users registered in the last 24 hours",
    type: "user",
    time: "1 day ago",
    read: true
  }
];

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case "course":
        return <Bell className="h-5 w-5 text-blue-500" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "payment":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "support":
        return <Info className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-purple-500" />;
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              Manage platform notifications and alerts
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Notifications</span>
              <span className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded-full">
                {unreadCount} unread
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex gap-4 p-4 rounded-lg ${notification.read ? 'bg-background' : 'bg-muted/50'}`}
                  >
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No notifications at this time</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminNotifications;
