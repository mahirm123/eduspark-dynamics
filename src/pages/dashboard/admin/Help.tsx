
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { HelpCenterContent } from "@/components/dashboard/help/HelpCenterContent";

const AdminHelp = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">Get assistance with the platform and common questions</p>
        </div>
        
        <HelpCenterContent userRole="admin" />
      </div>
    </DashboardLayout>
  );
};

export default AdminHelp;
