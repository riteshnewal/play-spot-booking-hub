
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for ground owners
const mockOwners = [
  { id: 1, name: "John Smith", email: "john@example.com", phone: "123-456-7890", grounds: 2, joinedOn: "2023-05-12" },
  { id: 2, name: "Sarah Williams", email: "sarah@example.com", phone: "234-567-8901", grounds: 1, joinedOn: "2023-07-23" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "345-678-9012", grounds: 3, joinedOn: "2023-04-05" },
];

export default function ManageOwners() {
  const [owners, setOwners] = useState(mockOwners);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredOwners = owners.filter(owner => 
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Manage Ground Owners</h1>

      <div className="flex justify-between items-center mb-6">
        <Input
          className="max-w-xs"
          placeholder="Search owners..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button>Register New Owner</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Ground Owners</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Grounds</TableHead>
                <TableHead>Joined On</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOwners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell>{owner.id}</TableCell>
                  <TableCell>{owner.name}</TableCell>
                  <TableCell>{owner.email}</TableCell>
                  <TableCell>{owner.phone}</TableCell>
                  <TableCell>{owner.grounds}</TableCell>
                  <TableCell>{owner.joinedOn}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Deactivate</Button>
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
