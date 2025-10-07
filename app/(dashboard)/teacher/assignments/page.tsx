"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SquareCheck as CheckSquare, Plus, Clock, Users, FileText } from "lucide-react";

// Mock user - in production, get from session
const mockUser = {
  name: "John Teacher",
  email: "teacher@school.edu",
  role: "TEACHER",
};

export default function TeacherAssignments() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
            <p className="text-gray-600 mt-2">Create and manage student assignments</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Assignment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                3 due this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Awaiting review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Math Quiz - Linear Equations</h3>
                    <p className="text-sm text-gray-600">Grade 8 Mathematics • Due: March 20, 2024</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>24 students</span>
                      <span>18 submitted</span>
                      <span>6 pending</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                      Active
                    </span>
                    <Button variant="outline" size="sm">
                      Grade
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Science Lab Report - Cell Division</h3>
                    <p className="text-sm text-gray-600">Grade 9 Science • Due: March 25, 2024</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>28 students</span>
                      <span>12 submitted</span>
                      <span>16 pending</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      Active
                    </span>
                    <Button variant="outline" size="sm">
                      Grade
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Biology Worksheet - Photosynthesis</h3>
                    <p className="text-sm text-gray-600">Grade 9 Biology • Due: March 18, 2024</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>22 students</span>
                      <span>22 submitted</span>
                      <span>8 graded</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                      Grading
                    </span>
                    <Button variant="outline" size="sm">
                      Continue
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Chemistry Quiz - Chemical Reactions</h3>
                    <p className="text-sm text-gray-600">Grade 10 Chemistry • Due: March 15, 2024</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>26 students</span>
                      <span>26 submitted</span>
                      <span>26 graded</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      Completed
                    </span>
                    <Button variant="outline" size="sm">
                      View Results
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}