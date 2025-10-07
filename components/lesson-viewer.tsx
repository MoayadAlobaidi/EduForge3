"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Users, CircleCheck as CheckCircle, X } from 'lucide-react';

interface LessonViewerProps {
  lessonId: string;
  onClose: () => void;
}

export function LessonViewer({ lessonId, onClose }: LessonViewerProps) {
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`/api/lessons/${lessonId}/view`);
        if (response.ok) {
          const data = await response.json();
          setLesson(data);
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">
          <p>Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">
          <p>Lesson not found</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
              <p className="text-gray-600">{lesson.subjects?.name} • {lesson.groups?.name}</p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{lesson.duration_min} minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Grade {lesson.groups?.grade}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">QA: {lesson.qa_status}</span>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{lesson.standards}</p>
            </CardContent>
          </Card>

          {lesson.lesson_plans && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Lesson Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lesson.lesson_plans.steps.map((step: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">{step.time}m</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium capitalize text-gray-900">{step.type}</h4>
                        <p className="text-sm text-gray-600 mt-1">{step.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {lesson.assessments && (
            <Card>
              <CardHeader>
                <CardTitle>Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lesson.assessments.items.map((item: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Question {index + 1}</h4>
                      <p className="text-gray-700 mb-3">{item.question}</p>
                      {item.options && (
                        <div className="space-y-1">
                          {item.options.map((option: string, optIndex: number) => (
                            <div key={optIndex} className="text-sm text-gray-600">
                              {String.fromCharCode(65 + optIndex)}. {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}