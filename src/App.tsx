
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseLearning from "./pages/CourseLearning";
import Teachers from "./pages/Teachers";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentCourses from "./pages/dashboard/student/Courses";
import StudentSchedule from "./pages/dashboard/student/Schedule";
import StudentMessages from "./pages/dashboard/student/Messages";
import StudentAchievements from "./pages/dashboard/student/Achievements";
import StudentSettings from "./pages/dashboard/student/Settings";
import StudentHelp from "./pages/dashboard/student/Help";
import TeacherProfile from "./pages/TeacherProfile";
import TeacherCourses from "./pages/TeacherCourses";
// Import existing teacher pages
import TeacherStudents from "./pages/dashboard/teacher/Students";
import TeacherSchedule from "./pages/dashboard/teacher/Schedule";
import TeacherMessages from "./pages/dashboard/teacher/Messages";
import TeacherUpload from "./pages/dashboard/teacher/Upload";
// Import admin dashboard components
import AdminUsers from "./pages/dashboard/admin/Users";
import AdminCourses from "./pages/dashboard/admin/Courses";
import AdminReports from "./pages/dashboard/admin/Reports";
import AdminPayments from "./pages/dashboard/admin/Payments";
import AdminSupport from "./pages/dashboard/admin/Support";
import AdminNotifications from "./pages/dashboard/admin/Notifications";
import NotFound from "./pages/NotFound";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ThemeProvider } from "./components/theme/ThemeProvider";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          gsap.to(window, {
            duration: 1, 
            scrollTo: targetId,
            ease: "power2.inOut"
          });
        }
      });
    });
    
    const pageTransition = (callback: () => void) => {
      const tl = gsap.timeline();
      tl.to('main', { 
        opacity: 0, 
        y: -20, 
        duration: 0.3,
        onComplete: callback
      });
      tl.from('main', { 
        opacity: 0, 
        y: 20, 
        duration: 0.3,
      });
    };
    
    return () => {
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/courses/:id/learn" element={<CourseLearning />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/teachers/:id" element={<TeacherProfile />} />
              <Route path="/teachers/:id/courses" element={<TeacherCourses />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/courses" element={<StudentCourses />} />
              <Route path="/dashboard/schedule" element={<StudentSchedule />} />
              <Route path="/dashboard/messages" element={<StudentMessages />} />
              <Route path="/dashboard/achievements" element={<StudentAchievements />} />
              <Route path="/dashboard/settings" element={<StudentSettings />} />
              <Route path="/dashboard/help" element={<StudentHelp />} />
              
              <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
              <Route path="/dashboard/teacher/courses" element={<TeacherCourses />} />
              <Route path="/dashboard/teacher/students" element={<TeacherStudents />} />
              <Route path="/dashboard/teacher/schedule" element={<TeacherSchedule />} />
              <Route path="/dashboard/teacher/messages" element={<TeacherMessages />} />
              <Route path="/dashboard/teacher/upload" element={<TeacherUpload />} />
              
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/dashboard/admin/users" element={<AdminUsers />} />
              <Route path="/dashboard/admin/courses" element={<AdminCourses />} />
              <Route path="/dashboard/admin/reports" element={<AdminReports />} />
              <Route path="/dashboard/admin/payments" element={<AdminPayments />} />
              <Route path="/dashboard/admin/support" element={<AdminSupport />} />
              <Route path="/dashboard/admin/notifications" element={<AdminNotifications />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
