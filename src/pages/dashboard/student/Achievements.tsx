
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const StudentAchievements = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">Your learning milestones and certificates</p>
        </div>
        
        <div className="bg-muted/50 p-8 rounded-lg flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium">Your achievements will appear here</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Complete courses to earn certificates and achievements
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAchievements;
