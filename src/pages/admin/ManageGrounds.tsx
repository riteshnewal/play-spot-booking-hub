
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Search, Calendar } from "lucide-react";
import AdminBookingForm from "@/components/admin/AdminBookingForm";

// Mock data for grounds
const mockGrounds = [
  {
    id: "1",
    name: "City Sports Complex",
    location: "Downtown, Central Park",
    owner: "John Doe",
    sports: ["Cricket", "Football"],
    status: "active"
  },
  {
    id: "2",
    name: "Riverside Turf",
    location: "Riverside Area, East Zone",
    owner: "Jane Smith",
    sports: ["Football", "Tennis"],
    status: "active"
  },
  {
    id: "3",
    name: "Green Valley Ground",
    location: "Green Valley, West Hills",
    owner: "Mike Johnson",
    sports: ["Cricket", "Baseball"],
    status: "maintenance"
  },
  {
    id: "4",
    name: "Urban Play Arena",
    location: "Central City, Metro Street",
    owner: "Sarah Williams",
    sports: ["Basketball", "Volleyball", "Badminton"],
    status: "active"
  },
  {
    id: "5",
    name: "Sunset Fields",
    location: "Sunset Boulevard, North District",
    owner: "Robert Brown",
    sports: ["Football", "Rugby"],
    status: "active"
  }
];

export default function ManageGrounds() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGround, setSelectedGround] = useState<{id: string; name: string} | null>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  
  const filteredGrounds = mockGrounds.filter(ground => 
    ground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ground.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ground.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleBookGround = (id: string, name: string) => {
    setSelectedGround({ id, name });
    setIsBookingDialogOpen(true);
  };
  
  const handleBookingComplete = () => {
    setIsBookingDialogOpen(false);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Manage Grounds</h1>
            
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search grounds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ground Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Sports</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrounds.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No grounds found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGrounds.map((ground) => (
                    <TableRow key={ground.id}>
                      <TableCell className="font-medium">{ground.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4 text-gray-500" />
                          <span>{ground.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>{ground.owner}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {ground.sports.map((sport) => (
                            <span 
                              key={sport} 
                              className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                            >
                              {sport}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          ground.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {ground.status.charAt(0).toUpperCase() + ground.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center"
                          onClick={() => handleBookGround(ground.id, ground.name)}
                        >
                          <Calendar className="mr-1 h-4 w-4" />
                          Book
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Book Ground</DialogTitle>
            <DialogDescription>
              Create a new booking for {selectedGround?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedGround && (
            <AdminBookingForm 
              groundId={selectedGround.id} 
              groundName={selectedGround.name} 
              onBookingComplete={handleBookingComplete}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
