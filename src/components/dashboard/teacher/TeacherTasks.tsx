
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  deadline: string;
  count: number;
}

interface TeacherTasksProps {
  tasks: Task[];
}

const TeacherTasks = ({ tasks }: TeacherTasksProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pending Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0">
              <div>
                <p className="font-medium">{task.title}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">Due: {task.deadline}</span>
                  <span className="text-xs text-primary">{task.count} items</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherTasks;
