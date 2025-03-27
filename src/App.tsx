
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

// Student Dashboard Pages
import StudentCourses from "./pages/dashboard/student/Courses";
import StudentSchedule from "./pages/dashboard/student/Schedule";
import StudentMessages from "./pages/dashboard/student/Messages";
import StudentAchievements from "./pages/dashboard/student/Achievements";
import StudentSettings from "./pages/dashboard/student/Settings";
import StudentHelp from "./pages/dashboard/student/Help";

// Teacher Dashboard Pages
import TeacherCourses from "./pages/dashboard/teacher/Courses";
import TeacherStudents from "./pages/dashboard/teacher/Students";
import TeacherSchedule from "./pages/dashboard/teacher/Schedule";
import TeacherMessages from "./pages/dashboard/teacher/Messages";
import TeacherUpload from "./pages/dashboard/teacher/Upload";

// Admin Dashboard Pages
import AdminUsers from "./pages/dashboard/admin/Users";
import AdminCourses from "./pages/dashboard/admin/Courses";
import AdminReports from "./pages/dashboard/admin/Reports";
import AdminPayments from "./pages/dashboard/admin/Payments";
import AdminSupport from "./pages/dashboard/admin/Support";

import NotFound from "./pages/NotFound";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Smooth scrolling navigation
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
    
    // GSAP page transitions
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
      // Clean up event listeners if needed
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Main Dashboard Route */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Student Dashboard Routes */}
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/dashboard/courses" element={<StudentCourses />} />
            <Route path="/dashboard/schedule" element={<StudentSchedule />} />
            <Route path="/dashboard/messages" element={<StudentMessages />} />
            <Route path="/dashboard/achievements" element={<StudentAchievements />} />
            <Route path="/dashboard/settings" element={<StudentSettings />} />
            <Route path="/dashboard/help" element={<StudentHelp />} />
            
            {/* Teacher Dashboard Routes */}
            <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
            <Route path="/dashboard/teacher/courses" element={<TeacherCourses />} />
            <Route path="/dashboard/teacher/students" element={<TeacherStudents />} />
            <Route path="/dashboard/teacher/schedule" element={<TeacherSchedule />} />
            <Route path="/dashboard/teacher/messages" element={<TeacherMessages />} />
            <Route path="/dashboard/teacher/upload" element={<TeacherUpload />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/users" element={<AdminUsers />} />
            <Route path="/dashboard/admin/courses" element={<AdminCourses />} />
            <Route path="/dashboard/admin/reports" element={<AdminReports />} />
            <Route path="/dashboard/admin/payments" element={<AdminPayments />} />
            <Route path="/dashboard/admin/support" element={<AdminSupport />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
