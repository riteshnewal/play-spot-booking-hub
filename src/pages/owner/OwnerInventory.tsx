
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Mock data for inventory
const mockInventory = [
  { id: 1, name: "Tennis Soft Balls", totalQuantity: 50, availableQuantity: 42, price: 5.99, status: "in-stock" },
  { id: 2, name: "Cricket Bats", totalQuantity: 8, availableQuantity: 5, price: 45.99, status: "in-stock" },
  { id: 3, name: "Footballs", totalQuantity: 12, availableQuantity: 10, price: 29.99, status: "in-stock" },
  { id: 4, name: "Basketball", totalQuantity: 5, availableQuantity: 0, status: "out-of-stock", price: 34.99 },
];

export default function OwnerInventory() {
  const [inventory, setInventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [useQuantity, setUseQuantity] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUseInventory = () => {
    if (!selectedItem) return;
    
    setInventory(inventory.map(item => {
      if (item.id === selectedItem.id) {
        const newAvailableQuantity = Math.max(0, item.availableQuantity - useQuantity);
        return {
          ...item,
          availableQuantity: newAvailableQuantity,
          status: newAvailableQuantity === 0 ? "out-of-stock" : "in-stock"
        };
      }
      return item;
    }));
    
    setUseQuantity(1);
    setSelectedItem(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Inventory</h1>

      <div className="flex justify-between items-center mb-6">
        <Input
          className="max-w-xs"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button>Request More Items</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Equipment</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Total Quantity</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.totalQuantity}</TableCell>
                  <TableCell>{item.availableQuantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "in-stock" ? "default" : "destructive"}>
                      {item.status === "in-stock" ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={item.availableQuantity === 0}
                          onClick={() => setSelectedItem(item)}
                        >
                          Use Item
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Use Inventory Item</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="mb-4">
                            Using <span className="font-medium">{selectedItem?.name}</span>
                          </p>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="quantity">Quantity to use</Label>
                              <Input 
                                id="quantity" 
                                type="number" 
                                min={1} 
                                max={selectedItem?.availableQuantity} 
                                value={useQuantity}
                                onChange={(e) => setUseQuantity(parseInt(e.target.value) || 1)}
                                className="mt-1"
                              />
                            </div>
                            <Button onClick={handleUseInventory} className="w-full">
                              Confirm
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
