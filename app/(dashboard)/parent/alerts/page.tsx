"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Clock, X } from "lucide-react";

// Mock user - in production, get from session
const mockUser = {
  name: "Mike Parent",
  email: "parent@school.edu",
  role: "PARENT",
};

export default function ParentAlerts() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
          <p className="text-gray-600 mt-2">Important updates about your children's education</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Next 7 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total This Month</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20</div>
              <p className="text-xs text-muted-foreground">
                All notifications
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Urgent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-red-800">Missing Assignment - Emma</h3>
                    <p className="text-sm text-red-600 mt-1">
                      History essay was due yesterday but hasn't been submitted yet.
                    </p>
                    <p className="text-xs text-red-500 mt-2">Due: March 17, 2024 • Overdue by 1 day</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Contact Teacher
                  </Button>
                  <Button size="sm" variant="ghost">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-start justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-yellow-800">Low Grade Alert - Alex</h3>
                    <p className="text-sm text-yellow-600 mt-1">
                      Mathematics grade has dropped to 72% (C-). Consider additional support.
                    </p>
                    <p className="text-xs text-yellow-500 mt-2">Grade 7 Mathematics • Teacher: Ms. Johnson</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Schedule Meeting
                  </Button>
                  <Button size="sm" variant="ghost">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-start justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-orange-800">Attendance Notice - Emma</h3>
                    <p className="text-sm text-orange-600 mt-1">
                      Missed 2 consecutive Science classes this week. Please provide explanation.
                    </p>
                    <p className="text-xs text-orange-500 mt-2">March 16-17, 2024 • Grade 9 Science</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Submit Excuse
                  </Button>
                  <Button size="sm" variant="ghost">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-green-800">Assignment Graded - Emma</h3>
                  <p className="text-sm text-green-600">Chemistry quiz scored 95% (A)</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-blue-800">Assignment Submitted - Alex</h3>
                  <p className="text-sm text-blue-600">Science project submitted successfully</p>
                  <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-purple-800">Upcoming Test - Emma</h3>
                  <p className="text-sm text-purple-600">Math test on Quadratic Equations scheduled for March 20</p>
                  <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Parent-Teacher Conference Scheduled</h3>
                  <p className="text-sm text-gray-600">Meeting with Ms. Wilson on March 22 at 3:00 PM</p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-yellow-800">Field Trip Permission - Alex</h3>
                  <p className="text-sm text-yellow-600">Science museum trip requires signed permission slip</p>
                  <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}