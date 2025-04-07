
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for bookings
const mockBookings = [
  { id: 1, customerName: "Alex Johnson", phone: "123-456-7890", date: new Date(2025, 3, 8), slot: "11:00 AM - 12:00 PM", status: "confirmed" },
  { id: 2, customerName: "Emma Wilson", phone: "234-567-8901", date: new Date(2025, 3, 8), slot: "1:00 PM - 2:00 PM", status: "confirmed" },
  { id: 3, customerName: "Michael Brown", phone: "345-678-9012", date: new Date(2025, 3, 9), slot: "5:00 PM - 6:00 PM", status: "pending" },
  { id: 4, customerName: "Sophia Davis", phone: "456-789-0123", date: new Date(2025, 3, 10), slot: "7:00 PM - 8:00 PM", status: "confirmed" },
];

export default function GroundBookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Filter bookings for the selected date
  const filteredBookings = selectedDate 
    ? bookings.filter(booking => 
        booking.date.getDate() === selectedDate.getDate() && 
        booking.date.getMonth() === selectedDate.getMonth() && 
        booking.date.getFullYear() === selectedDate.getFullYear())
    : bookings;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Ground Bookings</h1>

      <Tabs defaultValue="calendar" className="mb-6">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedDate && `Bookings for ${format(selectedDate, "MMMM d, yyyy")}`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredBookings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Time Slot</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.customerName}</TableCell>
                          <TableCell>{booking.phone}</TableCell>
                          <TableCell>{booking.slot}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No bookings for this date
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>{format(booking.date, "MMM d, yyyy")}</TableCell>
                      <TableCell>{booking.slot}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Details</Button>
                          <Button variant="destructive" size="sm">Cancel</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Button>Create New Booking</Button>
      </div>
    </div>
  );
}
