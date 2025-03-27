
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const TeacherCourses = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Manage your created courses</p>
        </div>
        
        <div className="bg-muted/50 p-8 rounded-lg flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium">Your courses will appear here</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Create courses to manage them from this dashboard
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherCourses;
