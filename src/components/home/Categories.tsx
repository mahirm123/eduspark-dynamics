
import { 
  Code, 
  LineChart, 
  PenTool, 
  BookOpen, 
  Columns, 
  Camera, 
  Users, 
  Megaphone,
  Rocket,
  Flask,
  Music,
  Globe,
  Heart,
  Smile,
  Laptop,
  PieChart
} from "lucide-react";
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
    color: "bg-blue-100 text-blue-600",
    hoverColor: "hover:bg-blue-600 hover:text-white",
    link: "/categories/development",
  },
  {
    name: "Business",
    icon: LineChart,
    courses: "840",
    color: "bg-green-100 text-green-600",
    hoverColor: "hover:bg-green-600 hover:text-white",
    link: "/categories/business",
  },
  {
    name: "Design",
    icon: PenTool,
    courses: "720",
    color: "bg-purple-100 text-purple-600",
    hoverColor: "hover:bg-purple-600 hover:text-white",
    link: "/categories/design",
  },
  {
    name: "Academics",
    icon: BookOpen,
    courses: "980",
    color: "bg-amber-100 text-amber-600",
    hoverColor: "hover:bg-amber-600 hover:text-white",
    link: "/categories/academics",
  },
  {
    name: "Software",
    icon: Laptop,
    courses: "590",
    color: "bg-indigo-100 text-indigo-600",
    hoverColor: "hover:bg-indigo-600 hover:text-white",
    link: "/categories/software",
  },
  {
    name: "Photography",
    icon: Camera,
    courses: "320",
    color: "bg-rose-100 text-rose-600",
    hoverColor: "hover:bg-rose-600 hover:text-white",
    link: "/categories/photography",
  },
  {
    name: "Personal Development",
    icon: Smile,
    courses: "540",
    color: "bg-cyan-100 text-cyan-600",
    hoverColor: "hover:bg-cyan-600 hover:text-white",
    link: "/categories/personal-development",
  },
  {
    name: "Marketing",
    icon: Megaphone,
    courses: "480",
    color: "bg-orange-100 text-orange-600",
    hoverColor: "hover:bg-orange-600 hover:text-white",
    link: "/categories/marketing",
  },
  {
    name: "Science",
    icon: Flask,
    courses: "320",
    color: "bg-teal-100 text-teal-600",
    hoverColor: "hover:bg-teal-600 hover:text-white",
    link: "/categories/science",
  },
  {
    name: "Music",
    icon: Music,
    courses: "260",
    color: "bg-pink-100 text-pink-600",
    hoverColor: "hover:bg-pink-600 hover:text-white",
    link: "/categories/music",
  },
  {
    name: "Languages",
    icon: Globe,
    courses: "410",
    color: "bg-emerald-100 text-emerald-600",
    hoverColor: "hover:bg-emerald-600 hover:text-white",
    link: "/categories/languages",
  },
  {
    name: "Health",
    icon: Heart,
    courses: "390",
    color: "bg-red-100 text-red-600",
    hoverColor: "hover:bg-red-600 hover:text-white",
    link: "/categories/health",
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-muted/30 dark:from-background dark:to-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight gradient-heading inline-block mb-3">
            Browse Top Categories
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
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
              <CarouselItem key={category.name} className="pl-2 md:pl-4 md:basis-1/4 lg:basis-1/4 sm:basis-1/2">
                <Link
                  to={category.link}
                  className="flex flex-col items-center p-6 bg-background rounded-xl border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 h-full group"
                >
                  <div
                    className={`p-4 rounded-xl ${category.color} mb-4 transition-colors duration-300 ${category.hoverColor} group-hover:scale-110`}
                  >
                    <category.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-center text-lg">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.courses} courses
                  </p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative static mx-2 left-0 translate-y-0 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20" />
            <CarouselNext className="relative static mx-2 right-0 translate-y-0 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Categories;
