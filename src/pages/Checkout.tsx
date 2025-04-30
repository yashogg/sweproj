
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
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
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    const storedUser = localStorage.getItem('ticketeer_user');
    if (!storedUser) {
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
      setBookingDetails(details);
    } catch (error) {
      console.error("Error parsing booking details:", error);
      toast({
        title: "Error",
        description: "Something went wrong with your booking",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Generate a simple ticket ID
      const ticketId = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store ticket details for the confirmation page
      const ticketDetails = {
        id: ticketId,
        movieTitle: bookingDetails?.movieTitle,
        theater: bookingDetails?.theater,
        screen: 'Screen ' + Math.floor(1 + Math.random() * 5),
        date: bookingDetails?.date,
        time: bookingDetails?.showtime,
        seats: [...Array(bookingDetails?.seats)].map((_, i) => String.fromCharCode(65 + Math.floor(i/10)) + (i%10 + 1)),
        amount: bookingDetails?.totalAmount,
        barcode: 'T' + ticketId + 'R' + Math.floor(1000 + Math.random() * 9000),
        purchaseDate: new Date().toISOString().split('T')[0]
      };
      
      sessionStorage.setItem('ticketDetails', JSON.stringify(ticketDetails));
      
      // Save to order history (in a real app, this would be an API call)
      const storedUser = JSON.parse(localStorage.getItem('ticketeer_user') || '{}');
      const orderHistory = JSON.parse(localStorage.getItem(`orderHistory_${storedUser.id}`) || '[]');
      orderHistory.push({
        ...ticketDetails,
        purchaseDate: new Date().toISOString()
      });
      localStorage.setItem(`orderHistory_${storedUser.id}`, JSON.stringify(orderHistory));
      
      toast({
        title: "Payment Successful",
        description: "Your tickets have been confirmed!"
      });
      
      navigate(`/ticket/${ticketId}`);
    }, 2000);
  };

  if (!bookingDetails) {
    return (
      <Layout title="Checkout">
        <div className="container mx-auto py-12 px-4">
          <p className="text-center">Loading booking details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Checkout" requireAuth={true}>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Secure Checkout</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column - Order Summary */}
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{bookingDetails.movieTitle}</h3>
                      <p className="text-gray-600">
                        {bookingDetails.theater} Theater
                      </p>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Date:</span>
                      <span className="font-medium">{new Date(bookingDetails.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Showtime:</span>
                      <span className="font-medium">{bookingDetails.showtime}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Tickets:</span>
                      <span className="font-medium">{bookingDetails.seats} x ${bookingDetails.ticketPrice.toFixed(2)}</span>
                    </div>

                    <Separator />
                    
                    <div className="flex justify-between font-bold">
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
                    <CardTitle className="flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-green-600" />
                      Secure Payment
                    </CardTitle>
                    <CardDescription>
                      All transactions are secure and encrypted
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      {/* Payment Method Selection */}
                      <div className="mb-6">
                        <Label className="mb-2 block">Payment Method</Label>
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={handlePaymentMethodChange}
                          className="gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="creditCard" id="creditCard" />
                            <Label htmlFor="creditCard" className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Credit Card
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal">PayPal</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="venmo" id="venmo" />
                            <Label htmlFor="venmo">Venmo</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {/* Credit Card Fields */}
                      {paymentMethod === 'creditCard' && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="mt-1"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cardName">Cardholder Name</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              placeholder="John Smith"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              className="mt-1"
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiration Date</Label>
                              <Input
                                id="expiry"
                                name="expiry"
                                placeholder="MM/YY"
                                value={formData.expiry}
                                onChange={handleInputChange}
                                className="mt-1"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className="mt-1"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* PayPal / Venmo Fields */}
                      {(paymentMethod === 'paypal' || paymentMethod === 'venmo') && (
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1"
                            required
                          />
                          <p className="text-sm text-gray-500 mt-2">
                            You'll be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 'Venmo'} to complete your payment.
                          </p>
                        </div>
                      )}

                      {/* Security Info */}
                      <Accordion type="single" collapsible className="mt-6">
                        <AccordionItem value="security">
                          <AccordionTrigger>Security Information</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-gray-600">
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
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark"
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
