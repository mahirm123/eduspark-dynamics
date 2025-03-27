
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const StudentSchedule = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Schedule</h1>
          <p className="text-muted-foreground">Your upcoming classes and events</p>
        </div>
        
        <div className="bg-muted/50 p-8 rounded-lg flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium">Your schedule will appear here</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Upcoming classes and events will be displayed in this dashboard
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentSchedule;
