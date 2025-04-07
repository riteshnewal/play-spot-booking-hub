
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, CheckCircleIcon, Clock } from "lucide-react";

export default function Home() {
  // Using proper lucide-react icons that are available
  const sportIcons = [
    { name: "Football", icon: <MapPinIcon className="h-8 w-8" /> },
    { name: "Cricket", icon: <CalendarIcon className="h-8 w-8" /> },
    { name: "Tennis", icon: <CheckCircleIcon className="h-8 w-8" /> },
    { name: "Basketball", icon: <Clock className="h-8 w-8" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Sports Grounds With Ease</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find and book the perfect sports ground near you for football, cricket, tennis, and more.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/grounds">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                Find Grounds
              </Button>
            </Link>
            <Link to="/owner/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-500">
                Ground Owner Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Nearby Grounds</h3>
              <p className="text-gray-600">
                Discover sports grounds close to your location with all the facilities you need.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Your Time Slot</h3>
              <p className="text-gray-600">
                Book your preferred date and time slot with instant confirmation.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Play and Enjoy</h3>
              <p className="text-gray-600">
                Show up and enjoy your game with hassle-free access to the ground.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Browse By Sport</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {sportIcons.map((sport, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-green-600 mb-4">
                    {sport.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{sport.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Next Game?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose from hundreds of sports grounds and book your slot in minutes.
          </p>
          <Link to="/grounds">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
              Browse All Grounds
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
