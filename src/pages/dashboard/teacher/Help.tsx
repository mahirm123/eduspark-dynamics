
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { HelpCenterContent } from "@/components/dashboard/help/HelpCenterContent";

const TeacherHelp = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">Get assistance with teaching and course management</p>
        </div>
        
        <HelpCenterContent userRole="teacher" />
      </div>
    </DashboardLayout>
  );
};

export default TeacherHelp;
