
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, UserPlus, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCourses />
        <Categories />
        <Features />
        <Testimonials />
        
        {/* CTA Section */}
        <section className="py-20 cta-gradient text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-white"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Join over 500,000 learners worldwide</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to start your learning journey?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
              Join thousands of students already learning on our platform. Get started today with free courses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold bg-white text-primary hover:bg-white/90 group"
                asChild
              >
                <Link to="/courses">
                  <BookOpen className="mr-2 h-5 w-5 transition-transform group-hover:rotate-6" />
                  Explore Courses
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white font-semibold hover:bg-white/20 group"
                asChild
              >
                <Link to="/signup">
                  <UserPlus className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Sign Up Free
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
