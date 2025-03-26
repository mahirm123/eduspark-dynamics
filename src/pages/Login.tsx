
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import { FaGithub, FaGoogle } from "react-icons/fa";

// Test credentials for different roles
const TEST_CREDENTIALS = {
  student: { email: "student@example.com", password: "student123" },
  teacher: { email: "teacher@example.com", password: "teacher123" },
  admin: { email: "admin@example.com", password: "admin123" }
};

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login API call with a delay
    setTimeout(() => {
      // Check against test credentials
      let userRole = null;

      if (email === TEST_CREDENTIALS.student.email && password === TEST_CREDENTIALS.student.password) {
        userRole = "student";
      } else if (email === TEST_CREDENTIALS.teacher.email && password === TEST_CREDENTIALS.teacher.password) {
        userRole = "teacher";
      } else if (email === TEST_CREDENTIALS.admin.email && password === TEST_CREDENTIALS.admin.password) {
        userRole = "admin";
      }

      if (userRole) {
        // Store login state and role in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", userRole);

        toast({
          title: "Login successful",
          description: `Welcome back, ${userRole}!`,
        });

        // Redirect based on role
        if (userRole === "admin") {
          navigate("/dashboard/admin");
        } else if (userRole === "teacher") {
          navigate("/dashboard/teacher");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try our test accounts: student@example.com/student123, teacher@example.com/teacher123, or admin@example.com/admin123",
          variant: "destructive",
        });
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Login to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <p>Test accounts:</p>
              <div className="grid grid-cols-1 gap-2 mt-2 text-xs bg-muted p-2 rounded-md">
                <div>
                  <p className="font-medium">Student:</p>
                  <p className="text-muted-foreground">student@example.com / student123</p>
                </div>
                <div>
                  <p className="font-medium">Teacher:</p>
                  <p className="text-muted-foreground">teacher@example.com / teacher123</p>
                </div>
                <div>
                  <p className="font-medium">Admin:</p>
                  <p className="text-muted-foreground">admin@example.com / admin123</p>
                </div>
              </div>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="w-full">
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <FaGithub className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;
