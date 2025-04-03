
export interface TeacherData {
  courses: {
    id: string;
    title: string;
    students: number;
    ratings: number;
    image: string;
    progress: number;
    published: boolean;
  }[];
  recentMessages: {
    id: string;
    student: string;
    avatar: string;
    message: string;
    time: string;
    read: boolean;
  }[];
  pendingTasks: {
    id: string;
    title: string;
    deadline: string;
    count: number;
  }[];
  upcomingClasses: {
    id: string;
    title: string;
    date: string;
    time: string;
    students: number;
  }[];
  stats: {
    totalStudents: number;
    totalCourses: number;
    averageRating: number;
    totalRevenue: number;
  };
}

// Mock data for teacher dashboard
export const teacherData: TeacherData = {
  courses: [
    {
      id: "t1",
      title: "Complete Web Development Bootcamp",
      students: 245,
      ratings: 4.8,
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
      progress: 100,
      published: true
    },
    {
      id: "t2",
      title: "Advanced React Patterns",
      students: 128,
      ratings: 4.6,
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=800",
      progress: 85,
      published: true
    },
    {
      id: "t3",
      title: "UI/UX Design Fundamentals",
      students: 0,
      ratings: 0,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
      progress: 50,
      published: false
    }
  ],
  recentMessages: [
    {
      id: "m1",
      student: "Emma Watson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      message: "I have a question about the React Hooks lecture",
      time: "2 hours ago",
      read: false
    },
    {
      id: "m2",
      student: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
      message: "Thank you for the feedback on my project",
      time: "Yesterday",
      read: true
    },
    {
      id: "m3",
      student: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100",
      message: "Will the deadline for the final project be extended?",
      time: "2 days ago",
      read: true
    }
  ],
  pendingTasks: [
    {
      id: "pt1",
      title: "Grade Advanced React pattern exercises",
      deadline: "Tomorrow",
      count: 12
    },
    {
      id: "pt2",
      title: "Prepare live session materials",
      deadline: "Nov 15, 2023",
      count: 1
    },
    {
      id: "pt3",
      title: "Review course feedback",
      deadline: "Nov 20, 2023",
      count: 5
    }
  ],
  upcomingClasses: [
    {
      id: "uc1",
      title: "Live Q&A: React Hooks Deep Dive",
      date: "Nov 12, 2023",
      time: "3:00 PM - 4:30 PM",
      students: 45
    },
    {
      id: "uc2",
      title: "Workshop: Building a Portfolio Website",
      date: "Nov 18, 2023",
      time: "2:00 PM - 5:00 PM",
      students: 32
    }
  ],
  stats: {
    totalStudents: 560,
    totalCourses: 3,
    averageRating: 4.7,
    totalRevenue: 24850
  }
};
