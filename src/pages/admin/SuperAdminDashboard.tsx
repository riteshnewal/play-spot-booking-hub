
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  MapPin,
  Settings,
  Coins,
  Activity,
  Server,
  FileText,
  PlusCircle
} from "lucide-react";

// Mock data for super admin statistics
const mockStats = [
  {
    title: "Total Admins",
    value: "12",
    change: "+2",
    icon: <Users className="h-5 w-5" />,
    color: "text-blue-500"
  },
  {
    title: "Total Ground Owners",
    value: "67",
    change: "+5",
    icon: <MapPin className="h-5 w-5" />,
    color: "text-green-500"
  },
  {
    title: "Total Revenue",
    value: "$56,890",
    change: "+12%",
    icon: <Coins className="h-5 w-5" />,
    color: "text-purple-500"
  },
  {
    title: "System Health",
    value: "Stable",
    change: "",
    icon: <Server className="h-5 w-5" />,
    color: "text-orange-500"
  },
];

const recentActivities = [
  {
    id: 1,
    action: "New admin registered",
    subject: "Marketing Department",
    timestamp: "30 minutes ago",
    icon: <PlusCircle className="h-4 w-4 text-green-500" />
  },
  {
    id: 2,
    action: "Ground owner onboarded",
    subject: "City Sports Complex",
    timestamp: "2 hours ago",
    icon: <MapPin className="h-4 w-4 text-blue-500" />
  },
  {
    id: 3,
    action: "System configuration updated",
    subject: "Payment gateway settings",
    timestamp: "5 hours ago",
    icon: <Settings className="h-4 w-4 text-purple-500" />
  }
];

export default function SuperAdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, Super Admin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                    <span className={stat.color}>{stat.icon}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {stat.change && (
                    <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change} from last month
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent System Activities</CardTitle>
              <CardDescription>Latest administrative actions</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="mt-1">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.subject}</p>
                      <p className="text-xs text-gray-400">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
