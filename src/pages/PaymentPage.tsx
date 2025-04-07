
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  CreditCard,
  Calendar as CalendarIcon,
  User,
  ChevronsRight,
  CheckCircle2
} from "lucide-react";

// Mock booking data
const mockBooking = {
  id: "booking123",
  groundName: "Football Arena",
  date: "April 10, 2025",
  time: "2:00 PM - 3:00 PM",
  price: 40,
  serviceFee: 4,
  total: 44
};

export default function PaymentPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  
  // In a real app, we would fetch the booking data using the ID
  const booking = mockBooking;
  
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // In a real app, we would submit payment data to a payment processor
    // Here we're just simulating a payment process
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`/confirmation/${booking.id}`);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="bg-gray-50 py-8 flex-grow">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-6">
            <Link to={`/booking/1`} className="text-playspot-primary hover:text-playspot-dark mb-2 inline-block">
              ← Back to Booking
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold">Complete Payment</h1>
            <p className="text-gray-600">Finalize your booking by completing the payment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                    <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Credit/Debit Card
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          required
                          placeholder="MM/YY"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          placeholder="123"
                          className="mt-1"
                          type="password"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center">
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Pay ${booking.total} Now
                          <ChevronsRight className="ml-1 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Your payment is securely processed. By proceeding, you agree to our terms and conditions.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="font-semibold text-lg mb-4">Booking Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CalendarIcon className="h-5 w-5 text-playspot-primary mt-1" />
                    <div>
                      <p className="font-medium">{booking.date}</p>
                      <p className="text-gray-600">{booking.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-playspot-primary mt-1" />
                    <div>
                      <p className="font-medium">{booking.groundName}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">Ground Rental</span>
                      <span>${booking.price}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">Service Fee</span>
                      <span>${booking.serviceFee}</span>
                    </div>
                    <div className="flex justify-between py-1 font-semibold border-t mt-2 pt-2">
                      <span>Total Amount</span>
                      <span>${booking.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
