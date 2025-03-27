
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const TeacherStudents = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage students enrolled in your courses</p>
        </div>
        
        <div className="bg-muted/50 p-8 rounded-lg flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium">Your students will appear here</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Student information and performance data will be displayed in this dashboard
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherStudents;
