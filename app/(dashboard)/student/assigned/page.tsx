"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SquareCheck as CheckSquare, Clock, BookOpen, TriangleAlert as AlertTriangle } from "lucide-react";

// Mock user - in production, get from session
const mockUser = {
  name: "Emma Student",
  email: "student@school.edu",
  role: "STUDENT",
};

export default function StudentAssigned() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assigned Work</h1>
          <p className="text-gray-600 mt-2">Your current assignments and due dates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Due Today</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Need attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Due by Friday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckSquare className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">
                +4% improvement
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Urgent - Due Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-red-800">History Essay - World War II</h3>
                    <p className="text-sm text-red-600">History • Due: Today at 11:59 PM</p>
                    <p className="text-xs text-red-500 mt-1">⚠️ Overdue by 2 hours</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="destructive" size="sm">
                      Submit Now
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-yellow-800">Math Quiz - Linear Equations</h3>
                    <p className="text-sm text-yellow-600">Mathematics • Due: Today at 11:59 PM</p>
                    <p className="text-xs text-yellow-500 mt-1">⏰ 8 hours remaining</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Start Quiz
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Science Lab Report - Cell Division</h3>
                    <p className="text-sm text-gray-600">Biology • Due: March 20, 2024</p>
                    <p className="text-xs text-gray-500 mt-1">📝 In Progress</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      Draft Saved
                    </span>
                    <Button variant="outline" size="sm">
                      Continue
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">English Reading Assignment</h3>
                    <p className="text-sm text-gray-600">English Literature • Due: March 22, 2024</p>
                    <p className="text-xs text-gray-500 mt-1">📖 Chapter 5-8</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      Not Started
                    </span>
                    <Button variant="outline" size="sm">
                      Start Reading
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Chemistry Worksheet - Reactions</h3>
                    <p className="text-sm text-gray-600">Chemistry • Due: March 23, 2024</p>
                    <p className="text-xs text-gray-500 mt-1">🧪 Practice Problems</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      Not Started
                    </span>
                    <Button variant="outline" size="sm">
                      Start Worksheet
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recently Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-green-800">Math Quiz - Algebra Basics</h3>
                    <p className="text-sm text-green-600">Mathematics • Submitted: March 15, 2024</p>
                    <p className="text-xs text-green-500 mt-1">✅ Score: 92%</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                      Graded
                    </span>
                    <Button variant="outline" size="sm">
                      View Feedback
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-800">Biology Lab - Microscopy</h3>
                    <p className="text-sm text-blue-600">Biology • Submitted: March 12, 2024</p>
                    <p className="text-xs text-blue-500 mt-1">⏳ Awaiting Grade</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      Submitted
                    </span>
                    <Button variant="outline" size="sm">
                      View Submission
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