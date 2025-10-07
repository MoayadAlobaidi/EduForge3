"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, GraduationCap, BookOpen } from "lucide-react";

// Mock user - in production, get from session
const mockUser = {
  name: "Sarah Admin",
  email: "admin@school.edu",
  role: "ADMIN",
};

export default function AdminGroups() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Groups Management</h1>
            <p className="text-gray-600 mt-2">Manage all classes and student groups</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Across all grades
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">324</div>
              <p className="text-xs text-muted-foreground">
                Enrolled this semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teachers</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                Active instructors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Size</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">27</div>
              <p className="text-xs text-muted-foreground">
                Students per group
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Grade 8 Mathematics</h3>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Teacher: John Smith</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">24 students</span>
                    <span className="text-gray-500">12 lessons</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Grade 9 Science</h3>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Teacher: Jane Doe</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">28 students</span>
                    <span className="text-gray-500">15 lessons</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Grade 10 History</h3>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Teacher: Mike Johnson</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">26 students</span>
                    <span className="text-gray-500">18 lessons</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Grade 11 English</h3>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Teacher: Sarah Wilson</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">22 students</span>
                    <span className="text-gray-500">20 lessons</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Grade 12 Physics</h3>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Teacher: David Brown</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">19 students</span>
                    <span className="text-gray-500">16 lessons</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Grade 9 Art</h3>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">New</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Teacher: Lisa Garcia</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">30 students</span>
                    <span className="text-gray-500">8 lessons</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}