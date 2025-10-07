"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Users, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        const roleRoutes = {
          ADMIN: '/admin',
          TEACHER: '/teacher',
          STUDENT: '/student',
          PARENT: '/parent',
        };
        router.push(roleRoutes[userData.role as keyof typeof roleRoutes] || '/teacher');
      } catch (error) {
        // Invalid user data, clear it
        localStorage.removeItem('user');
      }
    }
  }, [router]);

  // Seed demo data on component mount
  useEffect(() => {
    const seedDemo = async () => {
      setIsSeeding(true);
      try {
        await fetch('/api/seed', { method: 'POST' });
      } catch (error) {
        console.error('Seeding error:', error);
      } finally {
        setIsSeeding(false);
      }
    };
    seedDemo();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting login with:', email);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      const responseData = await response.json();
      console.log('Login response data:', responseData);

      if (response.ok) {
        const { user } = responseData;
        // In production, handle session properly
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect based on role
        const roleRoutes = {
          ADMIN: '/admin',
          TEACHER: '/teacher',
          STUDENT: '/student',
          PARENT: '/parent',
        };
        
        router.push(roleRoutes[user.role as keyof typeof roleRoutes] || '/teacher');
      } else {
        alert(`Login failed: ${responseData.error || 'Invalid credentials'}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = (role: string, email: string) => {
    setEmail(email);
    setPassword("demo123");
    
    // Auto-submit the form after setting credentials
    setTimeout(async () => {
      setIsLoading(true);
      try {
        console.log('Demo login attempt:', email);
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: "demo123" }),
        });

        console.log('Demo login response status:', response.status);
        const responseData = await response.json();
        console.log('Demo login response data:', responseData);

        if (response.ok) {
          const { user } = responseData;
          localStorage.setItem('user', JSON.stringify(user));
          
          const roleRoutes = {
            ADMIN: '/admin',
            TEACHER: '/teacher',
            STUDENT: '/student',
            PARENT: '/parent',
          };
          
          router.push(roleRoutes[user.role as keyof typeof roleRoutes] || '/teacher');
        } else {
          alert(`Demo login failed: ${responseData.error || 'User may not exist in database'}`);
        }
      } catch (error) {
        console.error('Demo login error:', error);
        alert('Demo login failed');
      } finally {
        setIsLoading(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">EduPlatform</span>
            </div>
            <div className="text-sm text-gray-500">
              Production-Ready School Management
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Features */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Complete School Management Platform
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Role-based access control with QA gates, lesson workflows, and comprehensive assignment management.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">QA Gate System</h3>
                  <p className="text-sm text-gray-600">Hard quality assurance before content goes live</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Role-Based Access</h3>
                  <p className="text-sm text-gray-600">Admin, Teacher, Student, and Parent dashboards</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Lesson Workflows</h3>
                  <p className="text-sm text-gray-600">Complete lesson planning and delivery system</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Assignment Management</h3>
                  <p className="text-sm text-gray-600">Create, distribute, and grade assignments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Sign In</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Demo Users */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Demo Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => demoLogin("ADMIN", "admin@school.edu")}
                    disabled={isSeeding || isLoading}
                  >
                    {isSeeding ? "Setting up..." : "Admin Demo"}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => demoLogin("TEACHER", "teacher@school.edu")}
                    disabled={isSeeding || isLoading}
                  >
                    {isSeeding ? "Setting up..." : "Teacher Demo"}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => demoLogin("STUDENT", "student@school.edu")}
                    disabled={isSeeding || isLoading}
                  >
                    {isSeeding ? "Setting up..." : "Student Demo"}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => demoLogin("PARENT", "parent@school.edu")}
                    disabled={isSeeding || isLoading}
                  >
                    {isSeeding ? "Setting up..." : "Parent Demo"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}