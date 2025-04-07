
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <MapPin className="h-8 w-8 text-playspot-secondary" />
              <span className="ml-2 text-xl font-bold">PlaySpot</span>
            </div>
            <p className="text-gray-300 mb-4">
              Book your favorite sports grounds with ease. Play, enjoy, and create memories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/grounds" className="text-gray-300 hover:text-white">Find Grounds</Link>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-white">How It Works</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Sports</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Football</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Cricket</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Tennis</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Basketball</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-playspot-secondary" />
                <span>123 Sports Lane, Playground City</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-playspot-secondary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-playspot-secondary" />
                <span>contact@playspot.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PlaySpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
