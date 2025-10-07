"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmissionViewer } from "@/components/submission-viewer";
import { useState, useEffect } from "react";
import { FileText, CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle } from "lucide-react";

// Mock user - in production, get from session
const mockUser = {
  name: "Emma Student",
  email: "student@school.edu",
  role: "STUDENT",
};

export default function StudentSubmissions() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // For demo purposes, we'll use the existing submission data
        // In a real app, you'd fetch user-specific submissions
        const mockSubmissions = [
          {
            id: '1',
            assignment: {
              lessons: {
                title: 'Introduction to Quadratic Equations',
                subjects: { name: 'Mathematics' }
              },
              type: 'QUIZ'
            },
            submitted_at: new Date().toISOString(),
            score: 92,
            status: 'GRADED',
            graded_at: new Date().toISOString(),
            answers: JSON.stringify({
              q1: 'x² + 3x - 4 = 0',
              q2: 'x = 2 or x = 3'
            }),
            feedback: 'Excellent work! You correctly identified the quadratic equation and solved it perfectly.'
          }
        ];
        setSubmissions(mockSubmissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Submissions</h1>
          <p className="text-gray-600 mt-2">Track your assignment submissions and grades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                This semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Graded</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                78% completion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Awaiting grades
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Late Submissions</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Needs attention
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">Math Quiz - Linear Equations</h3>
                  <p className="text-sm text-gray-600">Mathematics • Submitted: March 18, 2024 at 10:30 AM</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm font-medium text-green-600">Score: 92%</span>
                    <span className="text-xs text-gray-500">Grade: A-</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    Graded
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedSubmission('1')}
                  >
                    View Feedback
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">Science Lab Report - Cell Division</h3>
                  <p className="text-sm text-gray-600">Biology • Submitted: March 16, 2024 at 2:15 PM</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">Awaiting grade</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                    Under Review
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedSubmission('1')}
                  >
                    View Submission
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">History Essay - World War II</h3>
                  <p className="text-sm text-gray-600">History • Submitted: March 14, 2024 at 11:45 PM</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm font-medium text-blue-600">Score: 88%</span>
                    <span className="text-xs text-gray-500">Grade: B+</span>
                    <span className="text-xs text-red-500">⚠️ Late submission</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                    Late
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedSubmission('1')}
                  >
                    View Feedback
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">Chemistry Worksheet - Reactions</h3>
                  <p className="text-sm text-gray-600">Chemistry • Submitted: March 12, 2024 at 3:20 PM</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm font-medium text-green-600">Score: 95%</span>
                    <span className="text-xs text-gray-500">Grade: A</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    Graded
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedSubmission('1')}
                  >
                    View Feedback
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">English Reading Quiz - Chapter 4</h3>
                  <p className="text-sm text-gray-600">English Literature • Submitted: March 10, 2024 at 1:10 PM</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm font-medium text-green-600">Score: 90%</span>
                    <span className="text-xs text-gray-500">Grade: A-</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    Graded
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedSubmission('1')}
                  >
                    View Feedback
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">Biology Lab - Microscopy</h3>
                  <p className="text-sm text-gray-600">Biology • Submitted: March 8, 2024 at 4:30 PM</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">Awaiting grade</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                    Under Review
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedSubmission('1')}
                  >
                    View Submission
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedSubmission && (
          <SubmissionViewer
            submissionId={selectedSubmission}
            onClose={() => setSelectedSubmission(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}