
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/order-service';
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
  showtimeId: string; // Make sure this is included
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

      // Create order in database with the correct payment_status type
      const order = {
        user_id: user.id,
        showtime_id: bookingDetails.showtimeId,
        seats: bookingDetails.seats,
        total_amount: parseFloat(bookingDetails.totalAmount),
        payment_status: 'Completed' as 'Completed' | 'Pending' | 'Failed'
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
    <Layout title="Checkout">
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
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Date:</span>
                      <span className="font-medium text-white">{new Date(bookingDetails.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Showtime:</span>
                      <span className="font-medium text-white">{bookingDetails.showtime}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Tickets:</span>
                      <span className="font-medium text-white">{bookingDetails.seats} x ${bookingDetails.ticketPrice.toFixed(2)}</span>
                    </div>

                    <Separator />
                    
                    <div className="flex justify-between font-bold text-white">
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
                    <CardTitle className="flex items-center text-white">
                      <Lock className="h-5 w-5 mr-2 text-green-600" />
                      Secure Payment
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      All transactions are secure and encrypted
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      {/* Payment Method Selection */}
                      <div className="mb-6">
                        <Label className="mb-2 block text-white">Payment Method</Label>
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={handlePaymentMethodChange}
                          className="gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="creditCard" id="creditCard" />
                            <Label htmlFor="creditCard" className="flex items-center text-white">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Credit Card
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="text-white">PayPal</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="venmo" id="venmo" />
                            <Label htmlFor="venmo" className="text-white">Venmo</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {/* Credit Card Fields */}
                      {paymentMethod === 'creditCard' && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="mt-1 text-white"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cardName" className="text-white">Cardholder Name</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              placeholder="John Smith"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              className="mt-1 text-white"
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry" className="text-white">Expiration Date</Label>
                              <Input
                                id="expiry"
                                name="expiry"
                                placeholder="MM/YY"
                                value={formData.expiry}
                                onChange={handleInputChange}
                                className="mt-1 text-white"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv" className="text-white">CVV</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className="mt-1 text-white"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* PayPal / Venmo Fields */}
                      {(paymentMethod === 'paypal' || paymentMethod === 'venmo') && (
                        <div>
                          <Label htmlFor="email" className="text-white">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 text-white"
                            required
                          />
                          <p className="text-sm text-gray-300 mt-2">
                            You'll be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 'Venmo'} to complete your payment.
                          </p>
                        </div>
                      )}

                      {/* Security Info */}
                      <Accordion type="single" collapsible className="mt-6">
                        <AccordionItem value="security">
                          <AccordionTrigger className="text-white">Security Information</AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            <p className="text-sm">
                              Your payment information is encrypted and securely transmitted. We do not store your full credit card details and use industry-standard security protocols.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </form>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/movies/' + bookingDetails.movieId)}
                      className="text-white border-white hover:text-white"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark text-white"
                    >
                      {isProcessing ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        `Pay $${bookingDetails.totalAmount}`
                      )}
                    </Button>
                  </CardFooter>
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
