"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  // Apply dashboard mode to body element
  useEffect(() => {
    document.body.setAttribute('data-dashboard-mode', 'true');
    
    return () => {
      document.body.removeAttribute('data-dashboard-mode');
    };
  }, []);

  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, don't show content (will redirect due to useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
} 