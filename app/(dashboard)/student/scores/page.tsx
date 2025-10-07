"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar as BarChart3, TrendingUp, Target, Award } from "lucide-react";

// Mock user - in production, get from session
const mockUser = {
  name: "Emma Student",
  email: "student@school.edu",
  role: "STUDENT",
};

export default function StudentScores() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Scores</h1>
          <p className="text-gray-600 mt-2">Track your academic performance and progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">
                +4% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Subject</CardTitle>
              <Award className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">
                Chemistry
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Improvement</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+7%</div>
              <p className="text-xs text-muted-foreground">
                Since last semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3rd</div>
              <p className="text-xs text-muted-foreground">
                Out of 28 students
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Chemistry</p>
                    <p className="text-sm text-gray-600">8 assignments</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">95%</p>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-15 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Mathematics</p>
                    <p className="text-sm text-gray-600">12 assignments</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">92%</p>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-14 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">English Literature</p>
                    <p className="text-sm text-gray-600">6 assignments</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">90%</p>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-14 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Biology</p>
                    <p className="text-sm text-gray-600">10 assignments</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">88%</p>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-14 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">History</p>
                    <p className="text-sm text-gray-600">7 assignments</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-600">85%</p>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-13 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Math Quiz - Linear Equations</p>
                    <p className="text-sm text-gray-600">March 18, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">92%</p>
                    <p className="text-xs text-gray-500">A-</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Chemistry Worksheet</p>
                    <p className="text-sm text-gray-600">March 15, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">95%</p>
                    <p className="text-xs text-gray-500">A</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">History Essay - WWII</p>
                    <p className="text-sm text-gray-600">March 14, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">88%</p>
                    <p className="text-xs text-gray-500">B+</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">English Reading Quiz</p>
                    <p className="text-sm text-gray-600">March 12, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">90%</p>
                    <p className="text-xs text-gray-500">A-</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Biology Lab Report</p>
                    <p className="text-sm text-gray-600">March 10, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">87%</p>
                    <p className="text-xs text-gray-500">B+</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Progress Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-green-800">Strengths</h3>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Consistent high performance in Chemistry</li>
                  <li>• Strong improvement in Mathematics</li>
                  <li>• Excellent assignment completion rate</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-yellow-800">Areas to Focus</h3>
                  <Target className="h-4 w-4 text-yellow-600" />
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• History essay writing skills</li>
                  <li>• Time management for assignments</li>
                  <li>• Biology lab report structure</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-blue-800">Goals</h3>
                  <Award className="h-4 w-4 text-blue-600" />
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Maintain 90%+ average</li>
                  <li>• Improve History grade to A-</li>
                  <li>• Complete all assignments on time</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}