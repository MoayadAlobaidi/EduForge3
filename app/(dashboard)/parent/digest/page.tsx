"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, BookOpen, CircleCheck as CheckCircle } from "lucide-react";

// Mock user - in production, get from session
const mockUser = {
  name: "Mike Parent",
  email: "parent@school.edu",
  role: "PARENT",
};

export default function ParentDigest() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weekly Digest</h1>
          <p className="text-gray-600 mt-2">Summary of your children's academic progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">March 18-24</div>
              <p className="text-xs text-muted-foreground">
                Week 12 of semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Completed this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91%</div>
              <p className="text-xs text-muted-foreground">
                +3% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Attended this week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Emma's Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Highlights</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Scored 95% on Chemistry quiz</li>
                    <li>• Perfect attendance this week</li>
                    <li>• Completed all assignments on time</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Mathematics</p>
                      <p className="text-sm text-gray-600">2 assignments completed</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">92%</p>
                      <p className="text-xs text-green-600">+5%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Science</p>
                      <p className="text-sm text-gray-600">1 quiz, 1 lab report</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">95%</p>
                      <p className="text-xs text-green-600">+2%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">English</p>
                      <p className="text-sm text-gray-600">1 essay submitted</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">88%</p>
                      <p className="text-xs text-gray-500">-</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alex's Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Highlights</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Improved in History by 8 points</li>
                    <li>• Active participation in class discussions</li>
                    <li>• Submitted science project early</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">History</p>
                      <p className="text-sm text-gray-600">1 essay, 1 quiz</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">85%</p>
                      <p className="text-xs text-green-600">+8%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Science</p>
                      <p className="text-sm text-gray-600">1 project submitted</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">93%</p>
                      <p className="text-xs text-green-600">+1%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Mathematics</p>
                      <p className="text-sm text-gray-600">2 worksheets</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">89%</p>
                      <p className="text-xs text-red-600">-2%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Emma's Schedule</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                    <span className="text-sm">Math Test - Quadratic Equations</span>
                    <span className="text-xs text-gray-500">Wed, Mar 20</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-sm">Science Fair Presentation</span>
                    <span className="text-xs text-gray-500">Fri, Mar 22</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm">English Essay Due</span>
                    <span className="text-xs text-gray-500">Mon, Mar 25</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Alex's Schedule</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                    <span className="text-sm">History Project Presentation</span>
                    <span className="text-xs text-gray-500">Thu, Mar 21</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                    <span className="text-sm">Math Quiz - Fractions</span>
                    <span className="text-xs text-gray-500">Fri, Mar 22</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                    <span className="text-sm">Science Lab Report Due</span>
                    <span className="text-xs text-gray-500">Tue, Mar 26</span>
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