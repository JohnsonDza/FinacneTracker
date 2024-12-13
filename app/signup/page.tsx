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

// Signup page component
export default function SignUpPage() {
  // State for form inputs and loading status
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hooks for navigation and notifications
  const router = useRouter();
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Check if all fields are filled and passwords match
      if (username && password && password === confirmPassword) {
        // In a real app, you would hash the password and store it securely
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        // Show success notification
        toast({
          title: "Sign Up Successful",
          description: "Welcome to Finance Tracker!",
        });
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        // Show error for invalid input
        toast({
          title: "Sign Up Failed",
          description: "Please fill all fields and ensure passwords match.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      // Show error for unexpected issues
      toast({
        title: "Sign Up Error",
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
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create a new account to use Finance Tracker
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
                placeholder="johndoe"
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
            {/* Confirm password input */}
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            {/* Submit button */}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
        <CardFooter>
          {/* Link to login page */}
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
