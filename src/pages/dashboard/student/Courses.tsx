
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const StudentCourses = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Manage and track your enrolled courses</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Course content will be added here */}
          <div className="bg-muted/50 p-8 rounded-lg flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-medium">Your courses will appear here</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Enroll in courses to see them in this dashboard
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentCourses;
