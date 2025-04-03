
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, Users } from 'lucide-react';

export interface ClassSession {
  id: string;
  title: string;
  date: string;
  time: string;
  students: number;
}

interface UpcomingClassesProps {
  classes: ClassSession[];
}

const UpcomingClasses = ({ classes }: UpcomingClassesProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Upcoming Classes</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/teacher/schedule">View All</Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        {classes.map((classItem) => (
          <Card key={classItem.id}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">{classItem.title}</h3>
                  
                  <div className="flex gap-4 text-sm flex-wrap">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>{classItem.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{classItem.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{classItem.students} students enrolled</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 md:self-end">
                  <Button variant="outline" size="sm">Edit Session</Button>
                  <Button size="sm">Start Session</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingClasses;
