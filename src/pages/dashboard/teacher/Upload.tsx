
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const TeacherUpload = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Upload Content</h1>
          <p className="text-muted-foreground">Upload course materials and content</p>
        </div>
        
        <div className="bg-muted/50 p-8 rounded-lg flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium">Upload content here</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Upload course videos, documents, and materials
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherUpload;
