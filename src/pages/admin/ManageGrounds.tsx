
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for grounds
const mockGrounds = [
  { id: 1, name: "Green Park Football Ground", location: "South City", owner: "John Smith", sport: "Football" },
  { id: 2, name: "Central Cricket Arena", location: "Downtown", owner: "Mike Johnson", sport: "Cricket" },
  { id: 3, name: "Riverside Tennis Court", location: "East End", owner: "Sarah Williams", sport: "Tennis" },
];

export default function ManageGrounds() {
  const [grounds, setGrounds] = useState(mockGrounds);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredGrounds = grounds.filter(ground => 
    ground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ground.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ground.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Manage Grounds</h1>

      <div className="flex justify-between items-center mb-6">
        <Input
          className="max-w-xs"
          placeholder="Search grounds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button>Add New Ground</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Grounds</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrounds.map((ground) => (
                <TableRow key={ground.id}>
                  <TableCell>{ground.id}</TableCell>
                  <TableCell>{ground.name}</TableCell>
                  <TableCell>{ground.location}</TableCell>
                  <TableCell>{ground.sport}</TableCell>
                  <TableCell>{ground.owner}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
