
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { createOrder } from '@/services/order-service';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface BookingDetails {
  movieId: string;
  movieTitle: string;
  theater: string;
  showtime: string;
  date: string;
  seats: number;
  ticketPrice: number;
  totalAmount: string;
  showtimeId: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    email: ''
  });

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to proceed with checkout",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Get booking details from session storage
    const bookingDetailsStr = sessionStorage.getItem('bookingDetails');
    if (!bookingDetailsStr) {
      toast({
        title: "No Booking Found",
        description: "Please select a movie and showtime",
        variant: "destructive"
      });
      navigate('/movies/now-playing');
      return;
    }

    try {
      const details = JSON.parse(bookingDetailsStr);
      
      // Verify that showtimeId exists
      if (!details.showtimeId) {
        throw new Error("Booking details missing showtime ID");
      }
      
      setBookingDetails(details);
      console.log("Booking details loaded:", details);
    } catch (error) {
      console.error("Error parsing booking details:", error);
      toast({
        title: "Error",
        description: "Something went wrong with your booking",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate, toast, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Basic validation
    if (paymentMethod === 'creditCard' && 
      (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required credit card fields",
        variant: "destructive"
      });
      setIsProcessing(false);
      return;
    }

    if ((paymentMethod === 'venmo' || paymentMethod === 'paypal') && !formData.email) {
      toast({
        title: "Validation Error",
        description: "Please provide your email address",
        variant: "destructive"
      });
      setIsProcessing(false);
      return;
    }

    try {
      if (!bookingDetails || !user) {
        throw new Error("Missing booking details or user information");
      }

      console.log("Creating order with showtime_id:", bookingDetails.showtimeId);

      // Create order in database
      const order = {
        userId: user.id,
        movieId: bookingDetails.movieId,
        movieTitle: bookingDetails.movieTitle,
        showtimeId: bookingDetails.showtimeId,
        showtime: bookingDetails.showtime,
        date: bookingDetails.date,
        theater: bookingDetails.theater,
        seats: bookingDetails.seats,
        totalPrice: parseFloat(bookingDetails.totalAmount),
        paymentStatus: 'Completed' as 'Completed' | 'Pending' | 'Failed'
      };

      const createdOrder = await createOrder(order);
      
      // Generate a simple ticket ID (we'll use the real order ID from the database)
      const ticketId = createdOrder.id;
      
      // Store ticket details for the confirmation page
      const ticketDetails = {
        id: ticketId,
        movieTitle: bookingDetails.movieTitle,
        theater: bookingDetails.theater,
        screen: 'Screen ' + Math.floor(1 + Math.random() * 5),
        date: bookingDetails.date,
        time: bookingDetails.showtime,
        seats: [...Array(bookingDetails.seats)].map((_, i) => String.fromCharCode(65 + Math.floor(i/10)) + (i%10 + 1)),
        amount: bookingDetails.totalAmount,
        barcode: 'T' + ticketId.substring(0, 6) + 'R' + Math.floor(1000 + Math.random() * 9000),
        purchaseDate: new Date().toISOString(),
        poster: '' // Could be added if we have movie poster URL
      };
      
      sessionStorage.setItem('ticketDetails', JSON.stringify(ticketDetails));
      
      toast({
        title: "Payment Successful",
        description: "Your tickets have been confirmed!"
      });
      
      navigate(`/ticket/${ticketId}`);
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  if (!bookingDetails) {
    return (
      <Layout title="Checkout">
        <div className="container mx-auto py-12 px-4">
          <p className="text-center text-white">Loading booking details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Checkout" requireAuth={true}>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Secure Checkout</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column - Order Summary */}
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-white">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-white">{bookingDetails.movieTitle}</h3>
                      <p className="text-gray-300">
                        {bookingDetails.theater} Theater
                      </p>
                    </div>
                    
                    <div className="flex justify-between text-gray-300">
                      <span>Date:</span>
                      <span>{bookingDetails.date}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-300">
                      <span>Time:</span>
                      <span>{bookingDetails.showtime}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-300">
                      <span>Tickets:</span>
                      <span>{bookingDetails.seats}</span>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between text-gray-300">
                      <span>Price per ticket:</span>
                      <span>${bookingDetails.ticketPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between font-bold text-lg text-white">
                      <span>Total:</span>
                      <span>${bookingDetails.totalAmount}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Column - Payment Form */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-white">Payment Information</CardTitle>
                    <CardDescription>Choose your payment method</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <RadioGroup 
                        value={paymentMethod}
                        onValueChange={handlePaymentMethodChange}
                        className="mb-6"
                      >
                        <div className="flex items-center space-x-2 mb-4">
                          <RadioGroupItem value="creditCard" id="creditCard" />
                          <Label htmlFor="creditCard" className="cursor-pointer flex items-center">
                            <CreditCard className="mr-2 h-5 w-5 text-gray-300" />
                            <span className="text-white">Credit Card</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-4">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="cursor-pointer text-white">PayPal</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="venmo" id="venmo" />
                          <Label htmlFor="venmo" className="cursor-pointer text-white">Venmo</Label>
                        </div>
                      </RadioGroup>
                      
                      {paymentMethod === 'creditCard' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <Label htmlFor="cardNumber" className="text-gray-300">Card Number</Label>
                              <Input
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                className="bg-gray-800 border-gray-700 text-white"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="cardName" className="text-gray-300">Cardholder Name</Label>
                              <Input
                                id="cardName"
                                name="cardName"
                                placeholder="John Doe"
                                className="bg-gray-800 border-gray-700 text-white"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry" className="text-gray-300">Expiry Date</Label>
                                <Input
                                  id="expiry"
                                  name="expiry"
                                  placeholder="MM/YY"
                                  className="bg-gray-800 border-gray-700 text-white"
                                  value={formData.expiry}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv" className="text-gray-300">CVV</Label>
                                <Input
                                  id="cvv"
                                  name="cvv"
                                  placeholder="123"
                                  className="bg-gray-800 border-gray-700 text-white"
                                  value={formData.cvv}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {(paymentMethod === 'paypal' || paymentMethod === 'venmo') && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="your@email.com"
                              className="bg-gray-800 border-gray-700 text-white"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center mt-8 mb-4">
                        <Lock className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-sm text-gray-300">Secure payment processing by Stripe</span>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : `Pay $${bookingDetails.totalAmount}`}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
