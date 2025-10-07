"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Clock, User, X, CircleCheck as CheckCircle } from 'lucide-react';

interface SubmissionViewerProps {
  submissionId: string;
  onClose: () => void;
}

export function SubmissionViewer({ submissionId, onClose }: SubmissionViewerProps) {
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await fetch(`/api/submissions/${submissionId}/view`);
        if (response.ok) {
          const data = await response.json();
          setSubmission(data);
        }
      } catch (error) {
        console.error('Error fetching submission:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [submissionId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">
          <p>Loading submission...</p>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">
          <p>Submission not found</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </div>
      </div>
    );
  }

  const answers = JSON.parse(submission.answers);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {submission.assignments?.lessons?.title}
              </h1>
              <p className="text-gray-600">
                {submission.assignments?.lessons?.subjects?.name} • {submission.assignments?.type}
              </p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{submission.users?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Status: {submission.status}</span>
            </div>
          </div>

          {submission.score && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Grade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {submission.score}%
                  </span>
                  <span className="text-sm text-gray-600">
                    Graded: {new Date(submission.graded_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Student Answers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(answers).map(([key, answer], index) => (
                  <div key={key} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Question {index + 1}</h4>
                    <p className="text-gray-700">{String(answer)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {submission.feedback && (
            <Card>
              <CardHeader>
                <CardTitle>Teacher Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{submission.feedback}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}