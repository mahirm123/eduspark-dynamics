
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface Message {
  id: string;
  student: string;
  avatar: string;
  message: string;
  time: string;
  read: boolean;
}

interface RecentMessagesProps {
  messages: Message[];
}

const RecentMessages = ({ messages }: RecentMessagesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 pb-4 border-b last:border-0 last:pb-0 ${!message.read ? 'bg-muted/50 -mx-4 px-4 py-2 rounded-md' : ''}`}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={message.avatar} />
                <AvatarFallback>{message.student[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{message.student}</p>
                  {!message.read && (
                    <span className="bg-primary h-2 w-2 rounded-full" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                <p className="text-xs text-muted-foreground">{message.time}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link to="/dashboard/teacher/messages">View All Messages</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentMessages;
