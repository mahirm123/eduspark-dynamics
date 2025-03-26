
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center px-4 mx-auto">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl mr-6">
          <span className="text-primary">Edu</span>
          <span>Learn</span>
        </Link>
        <div className="relative hidden md:flex items-center w-full max-w-sm mr-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="w-full pl-8"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/courses">
            <Button variant="ghost">Courses</Button>
          </Link>
          <Link to="/teachers">
            <Button variant="ghost">Teachers</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
