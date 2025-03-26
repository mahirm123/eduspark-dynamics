
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import gsap from "gsap";

const Navbar = () => {
  // For demo purposes only - in a real app this would come from auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Simple animation for navbar elements
    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.05,
        duration: 0.3,
        ease: "power1.out"
      }
    );
    
    // For demo purposes - simulate login status from localStorage
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center px-4 mx-auto">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl mr-6 nav-item">
          <span className="text-primary">Edu</span>
          <span>Learn</span>
        </Link>
        <div className="relative hidden md:flex items-center w-full max-w-sm mr-4 nav-item">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="w-full pl-8"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/courses" className="nav-item">
            <Button variant="ghost">Courses</Button>
          </Link>
          <Link to="/teachers" className="nav-item">
            <Button variant="ghost">Teachers</Button>
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="nav-item">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button 
                variant="outline" 
                className="nav-item"
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem("isLoggedIn");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup" className="nav-item">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
