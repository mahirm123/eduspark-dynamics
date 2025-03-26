
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { UserRole } from "@/components/dashboard/DashboardSidebar";
import { useToast } from "@/hooks/use-toast";

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
      toast({
        title: "No role found",
        description: "Defaulting to student dashboard. Please log in to access your proper dashboard.",
        variant: "default"
      });
    }
  }, [toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to the appropriate dashboard based on user role
  switch (userRole) {
    case "teacher":
      return <Navigate to="/dashboard/teacher" replace />;
    case "admin":
      return <Navigate to="/dashboard/admin" replace />;
    default:
      return <Navigate to="/dashboard" replace />;
  }
};

export default Dashboard;
