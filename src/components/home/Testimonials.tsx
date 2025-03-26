
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "EduLearn completely transformed my career. The courses are so well-structured and the instructors are incredibly knowledgeable. I landed my dream job just 3 months after completing their web development program!",
    author: {
      name: "Jason Miller",
      role: "Frontend Developer at TechCorp",
      avatar: "JM",
    },
    rating: 5,
  },
  {
    id: 2,
    content:
      "I've tried many online learning platforms, but none compare to EduLearn. The interactive lessons and real-time feedback make it easy to stay engaged. Plus, the community is so supportive!",
    author: {
      name: "Sophia Chen",
      role: "UX Designer",
      avatar: "SC",
    },
    rating: 5,
  },
  {
    id: 3,
    content:
      "As someone who's always on the go, I appreciate how flexible EduLearn is. I can learn at my own pace, and the mobile app makes it easy to continue my courses during my commute. Well worth the investment!",
    author: {
      name: "Marcus Johnson",
      role: "Marketing Specialist",
      avatar: "MJ",
    },
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            What Our Students Say
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Thousands of students have achieved their goals with EduLearn
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.content}"</p>
                <div className="flex items-center mt-auto">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback>{testimonial.author.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
