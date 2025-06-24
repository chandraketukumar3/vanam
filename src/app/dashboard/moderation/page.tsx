// Creating moderation page
"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiCheck, FiX } from "react-icons/fi";
import { toast } from "sonner";

interface TreeSubmission {
  id: number;
  username: string;
  species: string;
  confidence: number;
  location: string;
}

export default function ModerationPage() {
  const [submissions, setSubmissions] = useState<TreeSubmission[]>([
    { id: 1, username: "Ravi Kumar", species: "Neem Tree", confidence: 92.5, location: "Patna, Bihar" },
    { id: 2, username: "Anjali Singh", species: "Peepal Tree", confidence: 91.8, location: "Delhi, India" },
    { id: 3, username: "Amit Verma", species: "Gulmohar", confidence: 94.1, location: "Pune, Maharashtra" },
  ]);

  const handleApprove = (id: number) => {
    setSubmissions(submissions.filter(sub => sub.id !== id));
    toast.success("Tree Approved & Added to Community Database");
  };

  const handleReject = (id: number) => {
    setSubmissions(submissions.filter(sub => sub.id !== id));
    toast.error("Submission Rejected");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Moderation Panel</h1>
      <p className="text-muted-foreground">Approve or Reject submitted trees by users.</p>

      {submissions.length === 0 ? (
        <p className="text-center text-muted-foreground mt-10">No pending submissions.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {submissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <CardTitle>{submission.username}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p><b>Species:</b> {submission.species}</p>
                <p><b>Confidence:</b> {submission.confidence}%</p>
                <p><b>Location:</b> {submission.location}</p>

                <div className="flex gap-3 mt-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleApprove(submission.id)}>
                    <FiCheck className="mr-2" /> Approve
                  </Button>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => handleReject(submission.id)}>
                    <FiX className="mr-2" /> Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
