
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { UserRole } from "@/components/dashboard/DashboardSidebar";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Rocket, Zap } from "lucide-react";

const Dashboard = () => {
  const { userData, isLoading } = useUserDashboard();
  const [userRole, setUserRole] = useState<UserRole>("student");
  const { toast } = useToast();

  useEffect(() => {
    // Get user role from localStorage (set during login)
    const storedRole = localStorage.getItem("userRole") as UserRole | null;
    if (storedRole && (storedRole === "student" || storedRole === "teacher" || storedRole === "admin")) {
      setUserRole(storedRole);
    } else {
      // If no role is stored, default to student
      setUserRole("student");
      // Store a default role for demo purposes
      localStorage.setItem("userRole", "student");
      toast({
        title: "No role found",
        description: "Defaulting to student dashboard. Please log in to access your proper dashboard.",
        variant: "default"
      });
    }
  }, [toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-fuchsia-950/30">
        <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mb-4"></div>
          <p className="mt-4 text-lg font-medium">Loading your dashboard...</p>
          <p className="text-muted-foreground">Please wait while we prepare your personalized experience</p>
        </div>
      </div>
    );
  }

  // Show different icons based on role
  const getRoleIcon = () => {
    switch (userRole) {
      case "teacher": 
        return <Rocket className="h-24 w-24 text-primary animate-pulse" />;
      case "admin":
        return <Zap className="h-24 w-24 text-primary animate-pulse" />;
      default:
        return <GraduationCap className="h-24 w-24 text-primary animate-pulse" />;
    }
  };

  // Redirect to the appropriate dashboard based on user role
  switch (userRole) {
    case "teacher":
      return <Navigate to="/dashboard/teacher" replace />;
    case "admin":
      return <Navigate to="/dashboard/admin" replace />;
    case "student":
      return <Navigate to="/dashboard/student" replace />;
    default:
      return <Navigate to="/dashboard/student" replace />;
  }
};

export default Dashboard;
