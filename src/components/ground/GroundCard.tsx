
import { Link } from "react-router-dom";
import { MapPin, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GroundCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  sports: string[];
  price: number;
  rating: number;
  facilities: string[];
}

export default function GroundCard({
  id,
  name,
  location,
  image,
  sports,
  price,
  rating,
  facilities,
}: GroundCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <div className="bg-white px-2 py-1 rounded-full shadow flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm font-semibold">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {sports.map((sport) => (
            <Badge key={sport} variant="outline" className="bg-playspot-light text-playspot-primary">
              {sport}
            </Badge>
          ))}
        </div>
        <div className="flex items-center text-gray-700 mb-4">
          <Tag size={16} className="mr-1 text-playspot-primary" />
          <span className="font-semibold">${price}/hour</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {facilities.slice(0, 3).map((facility) => (
              <Badge key={facility} variant="secondary" className="text-xs">
                {facility}
              </Badge>
            ))}
            {facilities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{facilities.length - 3}
              </Badge>
            )}
          </div>
          <Link to={`/grounds/${id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
