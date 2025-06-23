"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground mt-2">
          Track your tree planting progress, view your impact, and earn rewards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Trees Planted</CardTitle>
            <CardDescription>Your total contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">42</div>
            <p className="text-sm text-muted-foreground mt-2">
              +5 trees in the last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Carbon Impact</CardTitle>
            <CardDescription>CO₂ captured by your trees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">2.4</div>
            <p className="text-sm text-muted-foreground mt-2">
              Tons of CO₂ offset this year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Rewards</CardTitle>
            <CardDescription>Points earned for planting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">840</div>
            <p className="text-sm text-muted-foreground mt-2">
              250 points until next reward
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-3 border-b">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  🌱
                </div>
                <div className="flex-1">
                  <p className="font-medium">Planted 2 oak saplings</p>
                  <p className="text-sm text-muted-foreground">Jul 15, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pb-3 border-b">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  💧
                </div>
                <div className="flex-1">
                  <p className="font-medium">Watered 5 trees</p>
                  <p className="text-sm text-muted-foreground">Jul 10, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  🌳
                </div>
                <div className="flex-1">
                  <p className="font-medium">Planted 3 pine saplings</p>
                  <p className="text-sm text-muted-foreground">Jul 5, 2023</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Tree planting events near you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-3 border-b">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  📅
                </div>
                <div className="flex-1">
                  <p className="font-medium">Community Planting Day</p>
                  <p className="text-sm text-muted-foreground">Aug 12, 2023 • City Park</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pb-3 border-b">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  📅
                </div>
                <div className="flex-1">
                  <p className="font-medium">Tree Maintenance Workshop</p>
                  <p className="text-sm text-muted-foreground">Aug 18, 2023 • Botanical Garden</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  📅
                </div>
                <div className="flex-1">
                  <p className="font-medium">School Reforestation Project</p>
                  <p className="text-sm text-muted-foreground">Aug 25, 2023 • Lincoln High School</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 