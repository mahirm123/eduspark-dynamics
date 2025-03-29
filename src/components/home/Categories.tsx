
import { Code, LineChart, PenTool, BookOpen, Columns, Camera, Users, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const categories = [
  {
    name: "Development",
    icon: Code,
    courses: "1,240",
    color: "bg-blue-100 text-blue-700",
    link: "/categories/development",
  },
  {
    name: "Business",
    icon: LineChart,
    courses: "840",
    color: "bg-green-100 text-green-700",
    link: "/categories/business",
  },
  {
    name: "Design",
    icon: PenTool,
    courses: "720",
    color: "bg-purple-100 text-purple-700",
    link: "/categories/design",
  },
  {
    name: "Academics",
    icon: BookOpen,
    courses: "980",
    color: "bg-amber-100 text-amber-700",
    link: "/categories/academics",
  },
  {
    name: "Software",
    icon: Columns,
    courses: "590",
    color: "bg-indigo-100 text-indigo-700",
    link: "/categories/software",
  },
  {
    name: "Photography",
    icon: Camera,
    courses: "320",
    color: "bg-rose-100 text-rose-700",
    link: "/categories/photography",
  },
  {
    name: "Personal Development",
    icon: Users,
    courses: "540",
    color: "bg-cyan-100 text-cyan-700",
    link: "/categories/personal-development",
  },
  {
    name: "Marketing",
    icon: Megaphone,
    courses: "480",
    color: "bg-orange-100 text-orange-700",
    link: "/categories/marketing",
  },
];

const Categories = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Browse Top Categories
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Explore our wide range of courses across different categories to find
            the right one for you
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category) => (
              <CarouselItem key={category.name} className="pl-2 md:pl-4 md:basis-1/4 lg:basis-1/4">
                <Link
                  to={category.link}
                  className="flex flex-col items-center p-6 bg-background rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow h-full"
                >
                  <div
                    className={`p-3 rounded-full ${category.color} mb-4`}
                  >
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-center">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.courses} courses
                  </p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="relative static mx-2 left-0 translate-y-0" />
            <CarouselNext className="relative static mx-2 right-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Categories;
