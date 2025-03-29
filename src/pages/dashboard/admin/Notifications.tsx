
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const AdminNotifications = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Manage system notifications</p>
        </div>
        
        <div className="bg-muted/50 p-8 rounded-lg flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium">Notifications will appear here</h3>
          <p className="text-sm text-muted-foreground mt-2">
            System notifications and alerts will be displayed in this dashboard
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminNotifications;
