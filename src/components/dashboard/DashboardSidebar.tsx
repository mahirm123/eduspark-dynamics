
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
  PieChart,
  CreditCard,
  Sparkles,
  Rocket,
  Zap,
  Heart,
  Lightbulb
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export type UserRole = "student" | "teacher" | "admin";

interface DashboardSidebarProps {
  role: UserRole;
}

const iconColors = {
  dashboard: "text-violet-500",
  courses: "text-emerald-500",
  schedule: "text-amber-500",
  messages: "text-sky-500",
  achievements: "text-rose-500",
  settings: "text-indigo-500",
  help: "text-teal-500",
  students: "text-blue-500",
  upload: "text-fuchsia-500",
  users: "text-cyan-500",
  reports: "text-orange-500",
  payments: "text-lime-500",
  notifications: "text-pink-500",
}

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const studentMenuItems = [
    { title: 'Dashboard', path: '/dashboard/student', icon: LayoutDashboard, color: iconColors.dashboard },
    { title: 'My Courses', path: '/dashboard/student/courses', icon: BookOpen, color: iconColors.courses },
    { title: 'Upcoming Classes', path: '/dashboard/student/schedule', icon: Calendar, color: iconColors.schedule },
    { title: 'Messages', path: '/dashboard/student/messages', icon: MessageSquare, color: iconColors.messages },
    { title: 'Achievements', path: '/dashboard/student/achievements', icon: Trophy, color: iconColors.achievements },
  ];
  
  const teacherMenuItems = [
    { title: 'Dashboard', path: '/dashboard/teacher', icon: LayoutDashboard, color: iconColors.dashboard },
    { title: 'My Courses', path: '/dashboard/teacher/courses', icon: BookMarked, color: iconColors.courses },
    { title: 'Students', path: '/dashboard/teacher/students', icon: Users, color: iconColors.students },
    { title: 'Schedule', path: '/dashboard/teacher/schedule', icon: Calendar, color: iconColors.schedule },
    { title: 'Messages', path: '/dashboard/teacher/messages', icon: MessageSquare, color: iconColors.messages },
    { title: 'Upload Content', path: '/dashboard/teacher/upload', icon: UploadCloud, color: iconColors.upload },
  ];
  
  const adminMenuItems = [
    { title: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard, color: iconColors.dashboard },
    { title: 'Users', path: '/dashboard/admin/users', icon: Users, color: iconColors.users },
    { title: 'Courses', path: '/dashboard/admin/courses', icon: BookMarked, color: iconColors.courses },
    { title: 'Reports', path: '/dashboard/admin/reports', icon: BarChart3, color: iconColors.reports },
    { title: 'Notifications', path: '/dashboard/admin/notifications', icon: BellRing, color: iconColors.notifications },
    { title: 'Payments', path: '/dashboard/admin/payments', icon: CreditCard, color: iconColors.payments },
  ];
  
  let menuItems;
  let userTitle;
  let userRole;
  let userIcon;
  
  switch (role) {
    case 'teacher':
      menuItems = teacherMenuItems;
      userTitle = 'John Smith';
      userRole = 'Course Instructor';
      userIcon = <Rocket className="h-5 w-5 text-primary" />;
      break;
    case 'admin':
      menuItems = adminMenuItems;
      userTitle = 'Admin User';
      userRole = 'Administrator';
      userIcon = <Zap className="h-5 w-5 text-primary" />;
      break;
    default:
      menuItems = studentMenuItems;
      userTitle = 'Alex Johnson';
      userRole = 'Student';
      userIcon = <Sparkles className="h-5 w-5 text-primary" />;
  }

  return (
    <Sidebar>
      <SidebarHeader className="px-2 py-2">
        <div className="flex items-center gap-2 px-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-md bg-gradient-to-r from-primary to-secondary p-1">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="font-semibold text-lg gradient-heading">EduLearn</div>
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
                      <item.icon className={isActive(item.path) ? "" : item.color} />
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
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive(`/dashboard/${role}/settings`)}
                  tooltip="Settings"
                >
                  <Link to={`/dashboard/${role}/settings`}>
                    <Settings className={iconColors.settings} />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive(`/dashboard/${role}/help`)} 
                  tooltip="Help & Support"
                >
                  <Link to={`/dashboard/${role}/help`}>
                    <HelpCircle className={iconColors.help} />
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
            <Avatar className="border-2 border-primary/30">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" />
              <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">{userTitle[0]}</AvatarFallback>
            </Avatar>
            <div className="truncate">
              <div className="font-medium truncate flex items-center gap-1">
                {userTitle}
                {userIcon}
              </div>
              <div className="text-xs text-muted-foreground truncate">{userRole}</div>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2 group" asChild>
            <Link to="/login">
              <LogOut className="h-4 w-4 text-rose-500 transition-transform group-hover:-translate-x-1" />
              <span>Sign Out</span>
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
