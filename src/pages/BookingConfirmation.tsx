
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, MapPin, Clock, Phone, User, Calendar as CalendarIcon } from "lucide-react";

// Mock booking data
const mockBooking = {
  id: "booking123",
  groundName: "Football Arena",
  groundAddress: "123 Sports Lane, Downtown, City Center",
  date: "April 10, 2025",
  time: "2:00 PM - 3:00 PM",
  customerName: "John Doe",
  customerPhone: "+1 (555) 987-6543",
  price: 40,
  serviceFee: 4,
  total: 44,
  bookingCode: "SP1234567"
};

export default function BookingConfirmation() {
  const { bookingId } = useParams<{ bookingId: string }>();
  
  // In a real app, we would fetch the booking data using the ID
  const booking = mockBooking;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="bg-gray-50 py-8 flex-grow">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-playspot-primary p-6 text-white text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-3" />
              <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
              <p className="opacity-90">Your ground has been booked successfully.</p>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Booking Details</h2>
                  <span className="text-sm bg-playspot-light text-playspot-primary px-3 py-1 rounded-full">
                    {booking.bookingCode}
                  </span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CalendarIcon className="h-5 w-5 text-playspot-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Date & Time</h3>
                    <p>{booking.date}</p>
                    <p className="text-gray-600">{booking.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-playspot-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Ground</h3>
                    <p>{booking.groundName}</p>
                    <p className="text-gray-600">{booking.groundAddress}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <User className="h-5 w-5 text-playspot-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Booking Details</h3>
                    <p>Name: {booking.customerName}</p>
                    <p className="text-gray-600">Phone: {booking.customerPhone}</p>
                  </div>
                </div>
                
                <div className="border-t border-dashed pt-4">
                  <h3 className="font-semibold mb-3">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ground Rental</span>
                      <span>${booking.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Fee</span>
                      <span>${booking.serviceFee}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Total Paid</span>
                      <span>${booking.total}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  A confirmation email has been sent to your registered email address.
                </p>
                <Link to="/">
                  <Button variant="default">Return to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
