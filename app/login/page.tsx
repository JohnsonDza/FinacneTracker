"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Login page component
export default function LoginPage() {
  // State for form inputs and loading status
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hooks for navigation and notifications
  const router = useRouter();
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Check if credentials match admin user
      if (username === "admin" && password === "admin") {
        // Set login status in local storage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        // Show success notification
        toast({
          title: "Login Successful",
          description: "Welcome back, Admin!",
        });
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        // Show error for invalid credentials
        toast({
          title: "Login Failed",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      // Show error for unexpected issues
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username and password to login
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {/* Username input */}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {/* Password input */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {/* Submit button */}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
        <CardFooter>
          {/* Link to signup page */}
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
