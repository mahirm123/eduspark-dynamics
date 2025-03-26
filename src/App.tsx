
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
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<StudentDashboard />} />
            
            {/* Student Dashboard Routes */}
            <Route path="/dashboard/courses" element={<StudentDashboard />} />
            <Route path="/dashboard/schedule" element={<StudentDashboard />} />
            <Route path="/dashboard/messages" element={<StudentDashboard />} />
            <Route path="/dashboard/achievements" element={<StudentDashboard />} />
            <Route path="/dashboard/settings" element={<StudentDashboard />} />
            <Route path="/dashboard/help" element={<StudentDashboard />} />
            
            {/* Teacher Dashboard Routes */}
            <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
            <Route path="/dashboard/teacher/courses" element={<TeacherDashboard />} />
            <Route path="/dashboard/teacher/students" element={<TeacherDashboard />} />
            <Route path="/dashboard/teacher/schedule" element={<TeacherDashboard />} />
            <Route path="/dashboard/teacher/messages" element={<TeacherDashboard />} />
            <Route path="/dashboard/teacher/upload" element={<TeacherDashboard />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/users" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/courses" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/reports" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/notifications" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/payments" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/support" element={<AdminDashboard />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
