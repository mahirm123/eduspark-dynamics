
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TeacherCard from "@/components/teachers/TeacherCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useTeachers } from "@/hooks/useTeachers";
import gsap from "gsap";

const Teachers = () => {
  const { teachers, isLoading, searchTeachers } = useTeachers();
  const [searchTerm, setSearchTerm] = useState("");
  const headerRef = useRef<HTMLDivElement>(null);
  const teachersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }
  }, []);

  useEffect(() => {
    // GSAP animations for teachers cards
    if (!isLoading && teachersRef.current) {
      const cards = teachersRef.current.querySelectorAll('.teacher-card');
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1,
          duration: 0.5,
          ease: "power1.out"
        }
      );
    }
  }, [isLoading, teachers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchTeachers(searchTerm);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary/5 py-12" ref={headerRef}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Expert Instructors</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn from industry professionals with years of experience in their fields. 
            Our instructors are passionate about sharing their knowledge and helping you succeed.
          </p>
          
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search instructors..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
      </div>
      
      <main className="flex-grow py-12 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="mt-4">Loading instructors...</p>
            </div>
          ) : (
            <div ref={teachersRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <TeacherCard key={teacher.id} teacher={teacher} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No instructors found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Teachers;
