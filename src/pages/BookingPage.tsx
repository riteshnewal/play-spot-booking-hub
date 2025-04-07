
import { useState } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock,
  ChevronRight
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TimeSlotPicker, { TimeSlot } from "@/components/booking/TimeSlotPicker";

// Mock ground data
const mockGround = {
  id: "1",
  name: "Football Arena",
  location: "123 Sports Lane, Downtown, City Center",
  image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800",
  price: 40
};

// Generate mock time slots
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 11;
  const endHour = 30; // 6 AM next day (24 + 6)

  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = `${hour % 24}:00`;
    const endTime = `${(hour + 1) % 24}:00`;
    
    const isBooked = Math.random() > 0.7; // Randomly mark some slots as booked
    
    slots.push({
      id: `slot-${hour}`,
      startTime,
      endTime,
      status: isBooked ? "booked" : "available"
    });
  }
  
  return slots;
};

export default function BookingPage() {
  const { groundId } = useParams<{ groundId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // In a real app, we would fetch the ground data using the ID
  const ground = mockGround;
  
  const urlDate = searchParams.get('date');
  const initialDate = urlDate ? new Date(urlDate) : new Date();
  
  const [date, setDate] = useState<Date>(initialDate);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      // In a real app, we would fetch available slots for the selected date
      setTimeSlots(generateTimeSlots());
      setSelectedSlot(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }
    
    if (!formData.name || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }
    
    // In a real app, we would submit the booking data to an API
    // For now, we'll just navigate to the payment page
    navigate("/payment/booking123");
  };

  const selectedTimeSlot = timeSlots.find(slot => slot.id === selectedSlot);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="bg-gray-50 py-8 flex-grow">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-6">
            <Link to={`/grounds/${groundId}`} className="text-playspot-primary hover:text-playspot-dark mb-2 inline-block">
              ← Back to Ground Details
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h1 className="text-xl md:text-2xl font-bold mb-4">Book {ground.name}</h1>
              
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-md overflow-hidden">
                  <img
                    src={ground.image}
                    alt={ground.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold">{ground.name}</h2>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={14} className="mr-1" />
                    <span>{ground.location}</span>
                  </div>
                  <div className="text-playspot-primary font-semibold mt-1">
                    ${ground.price}/hour
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Date Selection */}
                <div>
                  <Label htmlFor="booking-date">1. Select a Date</Label>
                  <div className="mt-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="booking-date"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(date, "MMMM dd, yyyy")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateChange}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <Label>2. Select a Time Slot</Label>
                  <div className="mt-3">
                    <TimeSlotPicker
                      timeSlots={timeSlots}
                      selectedSlot={selectedSlot}
                      onSelectSlot={setSelectedSlot}
                    />
                  </div>
                  
                  {selectedTimeSlot && (
                    <div className="mt-4 p-3 bg-playspot-light rounded-md text-playspot-primary">
                      <div className="font-semibold flex items-center">
                        <Clock size={16} className="mr-1" />
                        Selected Time: 
                        <span className="ml-1">
                          {format(new Date(`2000-01-01 ${selectedTimeSlot.startTime}`), "h:mm a")} - 
                          {format(new Date(`2000-01-01 ${selectedTimeSlot.endTime}`), "h:mm a")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Details */}
                <div>
                  <Label>3. Enter Your Details</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Booking Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center py-2">
                      <span>Ground Rental (1 hour)</span>
                      <span>${ground.price}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Service Fee</span>
                      <span>${Math.round(ground.price * 0.1)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 font-semibold">
                      <span>Total</span>
                      <span>${ground.price + Math.round(ground.price * 0.1)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center">
                    Proceed to Payment
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
