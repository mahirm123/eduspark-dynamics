
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { HelpCenterContent } from "@/components/dashboard/help/HelpCenterContent";

const StudentHelp = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">Get answers to your questions and learning support</p>
        </div>
        
        <HelpCenterContent userRole="student" />
      </div>
    </DashboardLayout>
  );
};

export default StudentHelp;
