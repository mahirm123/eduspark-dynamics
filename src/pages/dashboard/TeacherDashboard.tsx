
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Video, PlusCircle } from 'lucide-react';

// Import teacher dashboard data
import { teacherData } from '@/data/teacherDashboardData';

// Import refactored components
import TeacherStats from '@/components/dashboard/teacher/TeacherStats';
import CoursesList from '@/components/dashboard/teacher/CoursesList';
import UpcomingClasses from '@/components/dashboard/teacher/UpcomingClasses';
import TeacherTasks from '@/components/dashboard/teacher/TeacherTasks';
import RecentMessages from '@/components/dashboard/teacher/RecentMessages';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleCreateLiveSession = () => {
    navigate('/dashboard/teacher/create-live-session');
  };

  const handleCreateNewCourse = () => {
    navigate('/dashboard/teacher/create-course');
  };

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Manage your courses and students</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleCreateLiveSession}>
              <Video className="mr-2 h-4 w-4" />
              Create Live Session
            </Button>
            <Button size="sm" onClick={handleCreateNewCourse}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
          </div>
        </div>
        
        <TeacherStats stats={teacherData.stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CoursesList courses={teacherData.courses} />
            <UpcomingClasses classes={teacherData.upcomingClasses} />
          </div>
          
          <div className="space-y-6">
            <TeacherTasks tasks={teacherData.pendingTasks} />
            <RecentMessages messages={teacherData.recentMessages} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
