
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Rocket, BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="hero-gradient py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 inline mr-2" />
              <span>Unlock your potential with EduLearn</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Transform Your Future With
              <span className="gradient-heading block mt-2">
                Interactive Learning
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Discover thousands of courses taught by expert instructors. Join millions of students and start learning today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses">
                <Button size="lg" className="w-full sm:w-auto group">
                  <BookOpen className="mr-2 h-5 w-5 transition-transform group-hover:rotate-6" />
                  Explore Courses
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto group"
                >
                  <Rocket className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  Join For Free
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -left-6 -top-6 w-64 h-64 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -right-6 -bottom-6 w-64 h-64 bg-secondary/10 rounded-full blur-xl"></div>
            <div className="relative rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Student learning online"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
