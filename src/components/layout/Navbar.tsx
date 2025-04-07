import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <MapPin className="h-8 w-8 text-playspot-primary" />
              <span className="ml-2 text-xl font-bold text-playspot-primary">PlaySpot</span>
            </Link>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:border-playspot-primary hover:text-playspot-primary px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/grounds" className="border-transparent text-gray-500 hover:border-playspot-primary hover:text-playspot-primary px-1 pt-1 border-b-2 text-sm font-medium">
                Find Grounds
              </Link>
              <a href="#how-it-works" className="border-transparent text-gray-500 hover:border-playspot-primary hover:text-playspot-primary px-1 pt-1 border-b-2 text-sm font-medium">
                How It Works
              </a>
              <a href="#contact" className="border-transparent text-gray-500 hover:border-playspot-primary hover:text-playspot-primary px-1 pt-1 border-b-2 text-sm font-medium">
                Contact
              </a>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link to="/owner/login">
                <Button variant="outline">Ground Owner Login</Button>
              </Link>
              <Link to="/admin/login">
                <Button>Admin Login</Button>
              </Link>
              <Link to="/super-admin/login">
                <Button variant="secondary">Super Admin Login</Button>
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-playspot-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-playspot-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-playspot-primary hover:text-playspot-primary">
              Home
            </Link>
            <Link to="/grounds" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-playspot-primary hover:text-playspot-primary">
              Find Grounds
            </Link>
            <a href="#how-it-works" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-playspot-primary hover:text-playspot-primary">
              How It Works
            </a>
            <a href="#contact" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-playspot-primary hover:text-playspot-primary">
              Contact
            </a>
            <div className="px-2 pt-2 pb-3 space-y-2">
              <Link to="/owner/login">
                <Button variant="outline" className="w-full">Ground Owner Login</Button>
              </Link>
              <Link to="/admin/login">
                <Button className="w-full">Admin Login</Button>
              </Link>
              <Link to="/super-admin/login">
                <Button variant="secondary" className="w-full">Super Admin Login</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
