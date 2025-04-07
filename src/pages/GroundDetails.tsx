
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  MapPin, 
  Star, 
  Phone, 
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2
} from "lucide-react";

// Mock ground data
const mockGround = {
  id: "1",
  name: "Football Arena",
  description: "A premium football ground with state-of-the-art facilities, perfect for both casual games and professional training sessions. The ground features a well-maintained grass surface, floodlights for evening games, and spacious changing rooms with shower facilities.",
  location: "123 Sports Lane, Downtown, City Center",
  images: [
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800",
    "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=800",
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800",
  ],
  sports: ["Football"],
  price: 40,
  rating: 4.8,
  reviews: 124,
  facilities: [
    "Changing Room",
    "Floodlights",
    "Parking",
    "Water",
    "Toilets",
    "Shower",
    "Cafeteria"
  ],
  openingHours: "11:00 AM - 6:00 AM (Next day)",
  contactPhone: "+1 (555) 123-4567",
  rules: [
    "No smoking inside the premises",
    "Proper sports shoes required",
    "No food or drinks on the field",
    "Cancellations must be made 24 hours in advance",
    "Be respectful to staff and other players"
  ]
};

export default function GroundDetails() {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // In a real app, we would fetch the ground data using the ID
  const ground = mockGround;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="bg-gray-50 py-8 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/grounds" className="text-playspot-primary hover:text-playspot-dark mb-2 inline-block">
              ← Back to Grounds
            </Link>
          </div>

          {/* Ground Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 rounded-lg overflow-hidden">
              <img 
                src={ground.images[activeImageIndex]} 
                alt={ground.name} 
                className="w-full h-full object-cover max-h-[400px]"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {ground.images.map((image, index) => (
                <div 
                  key={index}
                  className={`rounded-lg overflow-hidden cursor-pointer border-2 ${activeImageIndex === index ? 'border-playspot-primary' : 'border-transparent'}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${ground.name} image ${index + 1}`} 
                    className="w-full h-32 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ground Details */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{ground.name}</h1>
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin size={18} className="mr-1" />
                      <span>{ground.location}</span>
                    </div>
                  </div>
                  <div className="bg-playspot-light px-3 py-2 rounded-full flex items-center text-playspot-primary">
                    <Star className="fill-current text-yellow-500 mr-1" size={20} />
                    <span className="font-semibold">{ground.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({ground.reviews})</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ground.sports.map((sport) => (
                      <Badge key={sport} variant="outline" className="bg-playspot-light text-playspot-primary border-playspot-secondary">
                        {sport}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-gray-600">{ground.description}</p>
                </div>

                <Tabs defaultValue="facilities">
                  <TabsList className="mb-4">
                    <TabsTrigger value="facilities">Facilities</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="facilities">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {ground.facilities.map((facility) => (
                        <div key={facility} className="flex items-center">
                          <CheckCircle2 className="text-playspot-primary mr-2" size={18} />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rules">
                    <ul className="space-y-2">
                      {ground.rules.map((rule, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-playspot-primary font-semibold mr-2">{index + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="contact">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="text-playspot-primary mr-3" size={20} />
                        <span>{ground.contactPhone}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-playspot-primary mr-3" size={20} />
                        <div>
                          <p className="font-medium">Opening Hours</p>
                          <p className="text-gray-600">{ground.openingHours}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Booking Card */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <div className="mb-4 pb-4 border-b">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-playspot-primary">${ground.price}</span>
                    <span className="text-gray-600">per hour</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Select Date</h3>
                  <div className="bg-gray-50 rounded-md p-1">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="mx-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  
                  {selectedDate && (
                    <div className="pt-3 border-t">
                      <p className="text-center text-gray-600 mb-4">
                        Selected Date: {format(selectedDate, "MMMM dd, yyyy")}
                      </p>
                      <Link to={`/booking/${ground.id}?date=${format(selectedDate, "yyyy-MM-dd")}`}>
                        <Button className="w-full">
                          Check Availability & Book
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
