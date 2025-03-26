
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserDashboard } from "@/hooks/useUserDashboard";

const Dashboard = () => {
  const { userData, isLoading } = useUserDashboard();

  // For demonstration purposes, we'll redirect based on a simulated role
  // In a real application, this would come from an authentication system
  const userRole = "student"; // Could be "student", "teacher", or "admin"

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-lg">Loading...</p>
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
