
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Trophy, 
  Settings, 
  HelpCircle, 
  LogOut, 
  BookMarked,
  Users,
  BellRing,
  BarChart3,
  FileText,
  UploadCloud,
  Clock,
  CreditCard
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export type UserRole = "student" | "teacher" | "admin";

interface DashboardSidebarProps {
  role: UserRole;
}

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const studentMenuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { title: 'My Courses', path: '/dashboard/courses', icon: BookOpen },
    { title: 'Upcoming Classes', path: '/dashboard/schedule', icon: Calendar },
    { title: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    { title: 'Achievements', path: '/dashboard/achievements', icon: Trophy },
  ];
  
  const teacherMenuItems = [
    { title: 'Dashboard', path: '/dashboard/teacher', icon: LayoutDashboard },
    { title: 'My Courses', path: '/dashboard/teacher/courses', icon: BookMarked },
    { title: 'Students', path: '/dashboard/teacher/students', icon: Users },
    { title: 'Schedule', path: '/dashboard/teacher/schedule', icon: Calendar },
    { title: 'Messages', path: '/dashboard/teacher/messages', icon: MessageSquare },
    { title: 'Upload Content', path: '/dashboard/teacher/upload', icon: UploadCloud },
  ];
  
  const adminMenuItems = [
    { title: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard },
    { title: 'Users', path: '/dashboard/admin/users', icon: Users },
    { title: 'Courses', path: '/dashboard/admin/courses', icon: BookMarked },
    { title: 'Reports', path: '/dashboard/admin/reports', icon: BarChart3 },
    { title: 'Notifications', path: '/dashboard/admin/notifications', icon: BellRing },
    { title: 'Payments', path: '/dashboard/admin/payments', icon: CreditCard },
  ];
  
  let menuItems;
  let userTitle;
  let userRole;
  
  switch (role) {
    case 'teacher':
      menuItems = teacherMenuItems;
      userTitle = 'John Smith';
      userRole = 'Course Instructor';
      break;
    case 'admin':
      menuItems = adminMenuItems;
      userTitle = 'Admin User';
      userRole = 'Administrator';
      break;
    default:
      menuItems = studentMenuItems;
      userTitle = 'Alex Johnson';
      userRole = 'Student';
  }

  return (
    <Sidebar>
      <SidebarHeader className="px-2 py-2">
        <div className="flex items-center gap-2 px-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="font-semibold text-lg">EduLearn</div>
          </Link>
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link to="/dashboard/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Help & Support">
                  <Link to="/dashboard/help">
                    <HelpCircle />
                    <span>Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-2">
        <div className="p-2">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" />
              <AvatarFallback>{userTitle[0]}</AvatarFallback>
            </Avatar>
            <div className="truncate">
              <div className="font-medium truncate">{userTitle}</div>
              <div className="text-xs text-muted-foreground truncate">{userRole}</div>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2" asChild>
            <Link to="/login">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
