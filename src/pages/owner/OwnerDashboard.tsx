
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import {
  Calendar as CalendarIcon,
  Clock,
  TrendingUp,
  Activity,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

// Mock data for statistics
const mockStats = [
  {
    title: "Today's Bookings",
    value: "5",
    change: "+2",
    icon: <CalendarIcon className="h-5 w-5" />,
    color: "text-blue-500"
  },
  {
    title: "Total Bookings",
    value: "42",
    change: "+8",
    icon: <CheckCircle2 className="h-5 w-5" />,
    color: "text-green-500"
  },
  {
    title: "Hours Booked",
    value: "87",
    change: "+12",
    icon: <Clock className="h-5 w-5" />,
    color: "text-purple-500"
  },
  {
    title: "Revenue",
    value: "$1,845",
    change: "+15%",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "text-orange-500"
  },
];

// Mock data for charts
const timeSlotData = [
  { name: "Morning (11AM-2PM)", value: 15 },
  { name: "Afternoon (2PM-6PM)", value: 25 },
  { name: "Evening (6PM-10PM)", value: 35 },
  { name: "Night (10PM-6AM)", value: 10 }
];

const COLORS = ['#2E7D32', '#4CAF50', '#1976D2', '#FFA000'];

// Mock upcoming bookings
const upcomingBookings = [
  {
    id: 1,
    customerName: "John Doe",
    sport: "Football",
    date: "Today",
    time: "2:00 PM - 3:00 PM",
    status: "Confirmed"
  },
  {
    id: 2,
    customerName: "Alice Smith",
    sport: "Football",
    date: "Today",
    time: "5:00 PM - 6:00 PM",
    status: "Confirmed"
  },
  {
    id: 3,
    customerName: "Robert Johnson",
    sport: "Football",
    date: "Tomorrow",
    time: "1:00 PM - 2:00 PM",
    status: "Pending"
  }
];

export default function OwnerDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="owner" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Ground Owner Dashboard</h1>
            <p className="text-gray-600">Welcome back, Football Arena</p>
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
                    {stat.change} from last week
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Booking Calendar and Time Slot Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Booking Calendar</CardTitle>
                <CardDescription>View and manage your bookings</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pt-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Bookings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Time Slot Distribution</CardTitle>
                <CardDescription>Most popular booking times</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={timeSlotData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {timeSlotData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Today's Upcoming Bookings</CardTitle>
              <CardDescription>Bookings for the next 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{booking.customerName}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{booking.date}, {booking.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Bookings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
