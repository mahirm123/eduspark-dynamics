
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const StudentMessages = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Your conversations with instructors and classmates</p>
        </div>
        
        <div className="bg-muted/50 p-8 rounded-lg flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium">Your messages will appear here</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Start a conversation with instructors or classmates to see messages here
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentMessages;
