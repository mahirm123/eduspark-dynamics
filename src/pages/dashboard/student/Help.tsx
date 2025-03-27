
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const StudentHelp = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">Get assistance with your learning journey</p>
        </div>
        
        <div className="bg-muted/50 p-8 rounded-lg flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium">Help resources will appear here</h3>
          <p className="text-sm text-muted-foreground mt-2">
            FAQs, tutorials, and support contact information will be available soon
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentHelp;
