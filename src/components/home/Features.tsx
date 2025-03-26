
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, MessageSquare, Shield, Clock, Award, BarChart } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Interactive Video Lessons",
    description:
      "High-quality video lessons with interactive elements to enhance learning experience",
  },
  {
    icon: MessageSquare,
    title: "Live Classes & Discussion",
    description:
      "Join live sessions with instructors and participate in community discussions",
  },
  {
    icon: Shield,
    title: "Expert Instructors",
    description:
      "Learn from industry experts with years of experience and proven success",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description:
      "Learn at your own pace with lifetime access to course materials",
  },
  {
    icon: Award,
    title: "Certificates & Badges",
    description:
      "Earn recognized certificates and skill badges to showcase your achievements",
  },
  {
    icon: BarChart,
    title: "Progress Tracking",
    description:
      "Track your learning progress and get personalized recommendations",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Why Choose EduLearn
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Our platform offers everything you need for an effective learning experience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border bg-background">
              <CardHeader className="pb-2">
                <feature.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
