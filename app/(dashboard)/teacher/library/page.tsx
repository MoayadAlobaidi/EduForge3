"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LessonViewer } from "@/components/lesson-viewer";
import { useState, useEffect } from "react";
import { FileText, Search, Plus, BookOpen, Filter } from "lucide-react";

// Mock user - in production, get from session
const mockUser = {
  name: "John Teacher",
  email: "teacher@school.edu",
  role: "TEACHER",
};

export default function TeacherLibrary() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch('/api/lessons?userRole=TEACHER');
        if (response.ok) {
          const data = await response.json();
          setLessons(data);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const createSampleLessons = async () => {
    try {
      const response = await fetch('/api/lessons/sample', { method: 'POST' });
      if (response.ok) {
        // Refresh lessons
        const lessonsResponse = await fetch('/api/lessons?userRole=TEACHER');
        if (lessonsResponse.ok) {
          const data = await lessonsResponse.json();
          setLessons(data);
        }
      }
    } catch (error) {
      console.error('Error creating sample lessons:', error);
    }
  };
  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lesson Library</h1>
            <p className="text-gray-600 mt-2">Browse and manage your lesson content</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={createSampleLessons}>
              <Plus className="h-4 w-4 mr-2" />
              Create Sample Lessons
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Lesson
            </Button>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search lessons..."
                className="pl-10"
              />
            </div>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p>Loading lessons...</p>
          </div>
        ) : lessons.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No lessons found. Create some sample lessons to get started!</p>
            <Button onClick={createSampleLessons}>
              <Plus className="h-4 w-4 mr-2" />
              Create Sample Lessons
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {lesson.subject?.name} • Grade {lesson.group?.grade}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      lesson.status === 'PUBLISHED' 
                        ? 'bg-green-100 text-green-800'
                        : lesson.status === 'DRAFT'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {lesson.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      {lesson.standards}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{lesson.duration_min} min</span>
                      <span>QA: {lesson.qa_status}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedLesson(lesson.id)}
                      >
                        <BookOpen className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedLesson && (
          <LessonViewer
            lessonId={selectedLesson}
            onClose={() => setSelectedLesson(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}