
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Banknote, ArrowRight } from 'lucide-react';

// Sample movie data
const movieDetails = {
  id: 1,
  title: 'Spider-Man: No Way Home',
  date: '2025-05-05',
  time: '19:30',
  theater: 'Lubbock - North Ridge',
  ticketPrice: 12.50,
  poster: 'https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Spider-Man',
  seats: ['F7', 'F8']
};

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    venmoId: '',
    paypalEmail: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const subtotal = movieDetails.ticketPrice * movieDetails.seats.length;
  const fee = 1.99;
  const total = subtotal + fee;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation based on payment method
    if (paymentMethod === 'creditCard') {
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        toast({
          title: "Missing information",
          description: "Please fill in all credit card fields.",
          variant: "destructive"
        });
        return;
      }
    } else if (paymentMethod === 'venmo') {
      if (!formData.venmoId) {
        toast({
          title: "Missing information",
          description: "Please enter your Venmo ID.",
          variant: "destructive"
        });
        return;
      }
    } else if (paymentMethod === 'paypal') {
      if (!formData.paypalEmail) {
        toast({
          title: "Missing information",
          description: "Please enter your PayPal email.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would process the payment via an API
      // await processPayment({...formData, method: paymentMethod, total});
      
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Payment successful!",
          description: "Your tickets have been booked.",
        });
        
        // Redirect to confirmation page
        navigate(`/ticket/123`);
      }, 1500);
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Checkout" requireAuth={true}>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="flex mb-4">
                  <img 
                    src={movieDetails.poster} 
                    alt={movieDetails.title}
                    className="w-24 h-36 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold">{movieDetails.title}</h3>
                    <p className="text-gray-600 text-sm">{movieDetails.theater}</p>
                    <p className="text-gray-600 text-sm">
                      {new Date(movieDetails.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })} | {movieDetails.time}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      Seats: {movieDetails.seats.join(', ')}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span>Tickets ({movieDetails.seats.length})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Convenience Fee</span>
                    <span>${fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Payment Method</h3>
                    
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="creditCard" id="creditCard" />
                        <Label htmlFor="creditCard" className="flex items-center cursor-pointer">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Credit / Debit Card
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="venmo" id="venmo" />
                        <Label htmlFor="venmo" className="flex items-center cursor-pointer">
                          <Banknote className="w-5 h-5 mr-2" />
                          Venmo
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                          <Banknote className="w-5 h-5 mr-2" />
                          PayPal
                        </Label>
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
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            type="password"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Venmo Fields */}
                  {paymentMethod === 'venmo' && (
                    <div>
                      <Label htmlFor="venmoId">Venmo ID</Label>
                      <Input
                        id="venmoId"
                        name="venmoId"
                        placeholder="@your-venmo-id"
                        value={formData.venmoId}
                        onChange={handleChange}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        You'll receive a payment request from Ticketeer.
                      </p>
                    </div>
                  )}
                  
                  {/* PayPal Fields */}
                  {paymentMethod === 'paypal' && (
                    <div>
                      <Label htmlFor="paypalEmail">PayPal Email</Label>
                      <Input
                        id="paypalEmail"
                        name="paypalEmail"
                        type="email"
                        placeholder="your-email@example.com"
                        value={formData.paypalEmail}
                        onChange={handleChange}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        You'll be redirected to PayPal to complete your payment.
                      </p>
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="mt-6 w-full bg-ticketeer-purple hover:bg-ticketeer-purple-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Pay ${total.toFixed(2)} <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
