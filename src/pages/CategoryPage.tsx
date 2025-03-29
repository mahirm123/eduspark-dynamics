
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCourses } from "@/hooks/useCourses";
import { ArrowLeft } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { courses: allCourses, isLoading } = useCourses();
  const [courses, setCourses] = useState(allCourses);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    // Format category title
    if (category) {
      const formatted = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
      setCategoryTitle(formatted);
      
      // Filter courses by category
      const filtered = allCourses.filter(
        course => course.category.toLowerCase() === category.toLowerCase()
      );
      setCourses(filtered);
    }
  }, [category, allCourses]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4">Loading {categoryTitle} courses...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-6">{categoryTitle} Courses</h1>
          
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                We don't have any {categoryTitle.toLowerCase()} courses available at the moment.
              </p>
              <Button asChild>
                <Link to="/courses">Browse All Courses</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
