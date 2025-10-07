"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Search, Plus } from "lucide-react";

// Mock user - in production, get from session
const mockUser = {
  name: "Mike Parent",
  email: "parent@school.edu",
  role: "PARENT",
};

export default function ParentMessages() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600 mt-2">Communicate with teachers and school staff</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <MessageSquare className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                New messages
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">
                This semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Threads</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Ongoing conversations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                Within 24 hours
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm">Ms. Johnson</h3>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                    <p className="text-xs text-gray-600">Emma's math progress discussion</p>
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                  </div>

                  <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm">Mr. Davis</h3>
                      <span className="text-xs text-gray-500">1d ago</span>
                    </div>
                    <p className="text-xs text-gray-600">Science fair project guidelines</p>
                  </div>

                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm">Ms. Wilson</h3>
                      <span className="text-xs text-gray-500">3h ago</span>
                    </div>
                    <p className="text-xs text-gray-600">Alex's attendance concern</p>
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1"></span>
                  </div>

                  <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm">Principal Smith</h3>
                      <span className="text-xs text-gray-500">2d ago</span>
                    </div>
                    <p className="text-xs text-gray-600">Parent-teacher conference scheduling</p>
                  </div>

                  <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm">Ms. Garcia</h3>
                      <span className="text-xs text-gray-500">3d ago</span>
                    </div>
                    <p className="text-xs text-gray-600">Art class supply list</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Ms. Johnson</CardTitle>
                    <p className="text-sm text-gray-600">Mathematics Teacher • Grade 9</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">MJ</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="max-w-xs bg-gray-100 rounded-lg p-3">
                      <p className="text-sm">Hi Mr. Parent, I wanted to discuss Emma's recent progress in mathematics. She's been doing exceptionally well!</p>
                      <p className="text-xs text-gray-500 mt-1">Today, 2:30 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="max-w-xs bg-blue-500 text-white rounded-lg p-3">
                      <p className="text-sm">That's wonderful to hear! We've been working on her homework together. Any specific areas she should focus on?</p>
                      <p className="text-xs text-blue-200 mt-1">Today, 2:45 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="max-w-xs bg-gray-100 rounded-lg p-3">
                      <p className="text-sm">She's mastering quadratic equations very well. I'd suggest she continue practicing word problems to strengthen her application skills.</p>
                      <p className="text-xs text-gray-500 mt-1">Today, 3:00 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="max-w-xs bg-gray-100 rounded-lg p-3">
                      <p className="text-sm">Also, there's a math competition coming up next month. I think Emma would be a great candidate if she's interested.</p>
                      <p className="text-xs text-gray-500 mt-1">Today, 3:01 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="max-w-xs bg-blue-500 text-white rounded-lg p-3">
                      <p className="text-sm">Thank you for the suggestion! I'll discuss the competition with Emma tonight. She loves challenges like this.</p>
                      <p className="text-xs text-blue-200 mt-1">Today, 4:15 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}