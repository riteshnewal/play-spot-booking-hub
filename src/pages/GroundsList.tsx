
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GroundCard from "@/components/ground/GroundCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { MapPin, Search, Filter, SlidersHorizontal } from "lucide-react";

// Mock data for demonstration
const mockGrounds = [
  {
    id: '1',
    name: 'Football Arena',
    location: 'Downtown, City Center',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=500',
    sports: ['Football'],
    price: 40,
    rating: 4.8,
    facilities: ['Changing Room', 'Floodlights', 'Parking', 'Water'],
  },
  {
    id: '2',
    name: 'Cricket Ground',
    location: 'Sports Complex, West Side',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=500',
    sports: ['Cricket'],
    price: 35,
    rating: 4.5,
    facilities: ['Changing Room', 'Cafeteria', 'Parking', 'Toilets'],
  },
  {
    id: '3',
    name: 'Tennis Court',
    location: 'Green Park, North Side',
    image: 'https://images.unsplash.com/photo-1534872221173-662bdf4bd7a7?q=80&w=500',
    sports: ['Tennis'],
    price: 25,
    rating: 4.2,
    facilities: ['Water', 'Toilets'],
  },
  {
    id: '4',
    name: 'Multi-Sport Complex',
    location: 'Central Park, East Side',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500',
    sports: ['Football', 'Basketball', 'Tennis'],
    price: 50,
    rating: 4.7,
    facilities: ['Changing Room', 'Cafeteria', 'Parking', 'Toilets', 'Showers'],
  },
  {
    id: '5',
    name: 'Basketball Arena',
    location: 'Downtown, South City',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=500',
    sports: ['Basketball'],
    price: 30,
    rating: 4.0,
    facilities: ['Water', 'Toilets', 'Parking'],
  },
  {
    id: '6',
    name: 'Indoor Sports Center',
    location: 'Metro Mall, City Center',
    image: 'https://images.unsplash.com/photo-1626184793513-0748cb1d2887?q=80&w=500',
    sports: ['Badminton', 'Table Tennis', 'Basketball'],
    price: 45,
    rating: 4.6,
    facilities: ['AC', 'Changing Room', 'Cafeteria', 'Toilets', 'Showers'],
  },
];

const sportsList = ['Football', 'Cricket', 'Tennis', 'Basketball', 'Badminton', 'Table Tennis'];
const facilitiesList = ['Changing Room', 'Toilets', 'Parking', 'Cafeteria', 'Floodlights', 'Water', 'Showers', 'AC'];

export default function GroundsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [filteredGrounds, setFilteredGrounds] = useState(mockGrounds);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Filter grounds based on criteria
    const filtered = mockGrounds.filter((ground) => {
      // Filter by search term
      const searchMatch = 
        searchTerm === "" || 
        ground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ground.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by price
      const priceMatch = ground.price >= priceRange[0] && ground.price <= priceRange[1];
      
      // Filter by sports
      const sportMatch = 
        selectedSports.length === 0 || 
        ground.sports.some(sport => selectedSports.includes(sport));
      
      // Filter by facilities
      const facilityMatch = 
        selectedFacilities.length === 0 || 
        selectedFacilities.every(facility => ground.facilities.includes(facility));
      
      return searchMatch && priceMatch && sportMatch && facilityMatch;
    });

    setFilteredGrounds(filtered);
  }, [searchTerm, priceRange, selectedSports, selectedFacilities]);

  const toggleSport = (sport: string) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter(s => s !== sport));
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const toggleFacility = (facility: string) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter(f => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="bg-gray-50 py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold">Find Sports Grounds</h1>
              <p className="text-gray-600 mt-1">Discover and book the best sports grounds near you</p>
            </div>
            
            <div className="flex items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <Input
                  type="text"
                  placeholder="Search grounds or location"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="ml-2 md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Sports</h3>
                  <div className="space-y-2">
                    {sportsList.map((sport) => (
                      <div key={sport} className="flex items-center">
                        <Checkbox 
                          id={`sport-${sport}`} 
                          checked={selectedSports.includes(sport)}
                          onCheckedChange={() => toggleSport(sport)}
                        />
                        <Label htmlFor={`sport-${sport}`} className="ml-2 cursor-pointer">
                          {sport}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Price Range</h3>
                  <div className="px-1">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={5}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Facilities</h3>
                  <div className="space-y-2">
                    {facilitiesList.map((facility) => (
                      <div key={facility} className="flex items-center">
                        <Checkbox 
                          id={`facility-${facility}`} 
                          checked={selectedFacilities.includes(facility)}
                          onCheckedChange={() => toggleFacility(facility)}
                        />
                        <Label htmlFor={`facility-${facility}`} className="ml-2 cursor-pointer">
                          {facility}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Filters - Mobile */}
            {showFilters && (
              <div className="md:hidden bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Sports</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {sportsList.map((sport) => (
                      <div key={sport} className="flex items-center">
                        <Checkbox 
                          id={`mobile-sport-${sport}`} 
                          checked={selectedSports.includes(sport)}
                          onCheckedChange={() => toggleSport(sport)}
                        />
                        <Label htmlFor={`mobile-sport-${sport}`} className="ml-2 cursor-pointer">
                          {sport}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Price Range</h3>
                  <div className="px-1">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={5}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Facilities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {facilitiesList.map((facility) => (
                      <div key={facility} className="flex items-center">
                        <Checkbox 
                          id={`mobile-facility-${facility}`} 
                          checked={selectedFacilities.includes(facility)}
                          onCheckedChange={() => toggleFacility(facility)}
                        />
                        <Label htmlFor={`mobile-facility-${facility}`} className="ml-2 cursor-pointer">
                          {facility}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
            
            {/* Ground Cards */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrounds.length > 0 ? (
                  filteredGrounds.map((ground) => (
                    <GroundCard
                      key={ground.id}
                      id={ground.id}
                      name={ground.name}
                      location={ground.location}
                      image={ground.image}
                      sports={ground.sports}
                      price={ground.price}
                      rating={ground.rating}
                      facilities={ground.facilities}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center">
                    <p className="text-lg text-gray-500">No grounds matching your criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setPriceRange([0, 100]);
                        setSelectedSports([]);
                        setSelectedFacilities([]);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
