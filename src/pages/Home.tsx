
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar, 
  CreditCard, 
  MapPin,
  Football,
  Cricket,
  Tennis,
  Basketball
} from "lucide-react";

export default function Home() {
  const [searchLocation, setSearchLocation] = useState("");

  const sportIcons = [
    { 
      name: "Football", 
      icon: <Football className="h-8 w-8 text-playspot-primary mb-2" />,
      color: "bg-blue-100" 
    },
    { 
      name: "Cricket", 
      icon: <Cricket className="h-8 w-8 text-playspot-primary mb-2" />, 
      color: "bg-green-100" 
    },
    { 
      name: "Tennis", 
      icon: <Tennis className="h-8 w-8 text-playspot-primary mb-2" />,
      color: "bg-yellow-100" 
    },
    { 
      name: "Basketball", 
      icon: <Basketball className="h-8 w-8 text-playspot-primary mb-2" />, 
      color: "bg-orange-100" 
    }
  ];

  const steps = [
    {
      title: "Find a Ground",
      description: "Search for grounds near you based on your sport preference and location.",
      icon: <Search className="h-8 w-8 text-playspot-primary" />
    },
    {
      title: "Select Date & Time",
      description: "Choose your preferred date and available time slot for booking.",
      icon: <Calendar className="h-8 w-8 text-playspot-primary" />
    },
    {
      title: "Make Payment",
      description: "Complete your booking by making a secure payment online.",
      icon: <CreditCard className="h-8 w-8 text-playspot-primary" />
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would use this to filter grounds
    window.location.href = "/grounds";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-playspot-dark to-playspot-primary text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center md:text-left md:w-3/5">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Find and Book Sports Grounds Near You</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Book your favorite sports ground with just a few clicks. Easy, fast, and secure.
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto md:mx-0">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <Input
                  type="text"
                  placeholder="Enter your location"
                  className="pl-10 py-6 bg-white text-gray-800 rounded-md w-full"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="whitespace-nowrap">
                Find Grounds
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Sports Categories */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Popular Sports</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {sportIcons.map((sport, index) => (
              <Link 
                to="/grounds" 
                key={index}
                className="flex flex-col items-center justify-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white w-full max-w-xs"
              >
                <div className={`p-4 rounded-full ${sport.color} mb-2`}>
                  {sport.icon}
                </div>
                <span className="font-medium">{sport.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div id="how-it-works" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Booking your favorite sports ground has never been easier. Follow these simple steps.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="p-3 bg-playspot-light rounded-full mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Grounds */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Grounds</h2>
            <Link to="/grounds">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* We would typically fetch these from an API */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Football Arena</h3>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">Downtown, City Center</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-playspot-primary">$40/hour</span>
                  <Link to="/grounds/1">
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Cricket Ground</h3>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">Sports Complex, West Side</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-playspot-primary">$35/hour</span>
                  <Link to="/grounds/2">
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Tennis Court</h3>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">Green Park, North Side</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-playspot-primary">$25/hour</span>
                  <Link to="/grounds/3">
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-playspot-primary py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Book Your Ground?</h2>
          <p className="mb-6 max-w-3xl mx-auto text-opacity-90 text-white">
            Join thousands of sports enthusiasts who book grounds through PlaySpot every day.
          </p>
          <Link to="/grounds">
            <Button size="lg" className="bg-white text-playspot-primary hover:bg-gray-100">
              Find Grounds Now
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
