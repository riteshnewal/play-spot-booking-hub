
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import {
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  Activity,
  ArrowRight,
  PlusCircle
} from "lucide-react";

// Mock data for statistics
const mockStats = [
  {
    title: "Total Grounds",
    value: "24",
    change: "+3",
    icon: <MapPin className="h-5 w-5" />,
    color: "text-blue-500"
  },
  {
    title: "Ground Owners",
    value: "16",
    change: "+2",
    icon: <Users className="h-5 w-5" />,
    color: "text-green-500"
  },
  {
    title: "Total Bookings",
    value: "342",
    change: "+28",
    icon: <Calendar className="h-5 w-5" />,
    color: "text-purple-500"
  },
  {
    title: "Revenue",
    value: "$4,628",
    change: "+12%",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "text-orange-500"
  },
];

// Mock data for charts
const bookingData = [
  { name: "Jan", bookings: 65 },
  { name: "Feb", bookings: 59 },
  { name: "Mar", bookings: 80 },
  { name: "Apr", bookings: 81 },
  { name: "May", bookings: 56 },
  { name: "Jun", bookings: 55 },
  { name: "Jul", bookings: 40 },
];

const revenueData = [
  { name: "Jan", revenue: 1800 },
  { name: "Feb", revenue: 1600 },
  { name: "Mar", revenue: 2200 },
  { name: "Apr", revenue: 2400 },
  { name: "May", revenue: 1500 },
  { name: "Jun", revenue: 1800 },
  { name: "Jul", revenue: 1200 },
];

// Mock recent activities
const recentActivities = [
  {
    id: 1,
    action: "New ground registered",
    subject: "Tennis Court at Downtown",
    timestamp: "10 minutes ago",
    icon: <PlusCircle className="h-4 w-4 text-green-500" />
  },
  {
    id: 2,
    action: "New booking",
    subject: "Football Arena for April 12",
    timestamp: "30 minutes ago",
    icon: <Calendar className="h-4 w-4 text-blue-500" />
  },
  {
    id: 3,
    action: "Payment received",
    subject: "$45 from John Doe",
    timestamp: "1 hour ago",
    icon: <TrendingUp className="h-4 w-4 text-purple-500" />
  },
  {
    id: 4,
    action: "New ground owner registered",
    subject: "Sports Complex Inc.",
    timestamp: "2 hours ago",
    icon: <Users className="h-4 w-4 text-orange-500" />
  },
];

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin</p>
          </div>
          
          {/* Stats Cards */}
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
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Bookings</CardTitle>
                <CardDescription>Number of bookings over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={bookingData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="bookings" fill="#4CAF50" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Monthly revenue in USD</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#1976D2" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions and events</CardDescription>
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
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
