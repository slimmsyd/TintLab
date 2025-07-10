import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Award,
  Star,
  Loader2
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleYear: '',
    vehicleYearCustom: '',
    vehicleMake: '',
    vehicleModel: '',
    currentTinting: '',
    serviceType: '',
    tintShadePreference: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Submit form data to webhook with timestamp and status
      const submissionData = {
        ...formData,
        submissionDate: new Date().toISOString(),
        submittedAt: new Date().toLocaleString(),
        status: 'New'
      };
      
      // Use production webhook URL if in production, otherwise use test URL
      const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
      const webhookUrl = isProduction 
        ? 'https://kilah.app.n8n.cloud/webhook/004f4556-bba6-43fc-a6e8-608dbca5fefc'
        : 'https://kilah.app.n8n.cloud/webhook-test/004f4556-bba6-43fc-a6e8-608dbca5fefc';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        console.log('Form submitted successfully:', formData);
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            vehicleYear: '',
            vehicleYearCustom: '',
            vehicleMake: '',
            vehicleModel: '',
            currentTinting: '',
            serviceType: '',
            tintShadePreference: '',
            notes: ''
          });
        }, 3000);
      } else {
        console.error('Form submission failed:', response.status, response.statusText);
        if (response.status === 404) {
          setError('Webhook not found. Please check if the n8n workflow is active and the URL is correct.');
        } else {
          setError(`Submission failed: ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: "123 Main Street, City, State 12345",
      subContent: "Professional installation facility"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "(555) 123-4567",
      subContent: "Call or text anytime"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@tintlabs.com",
      subContent: "Quick response guaranteed"
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Fri: 8AM - 6PM",
      subContent: "Sat: 9AM - 4PM, Sun: Closed"
    }
  ];

  const serviceTypeOptions = [
    "Tint",
    "Rims", 
    "Full Blackout",
    "Not Sure Yet"
  ];

  const tintShadeOptions = [
    "5%",
    "20%", 
    "35%",
    "Not Sure"
  ];

  const vehicleMakeOptions = [
    "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge",
    "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep",
    "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "Mitsubishi",
    "Nissan", "Porsche", "Ram", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo", "Other"
  ];

  const vehicleYearOptions = [ ...Array.from({ length: 30 }, (_, i) => (2024 - i).toString())];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
   

      {/* Main Content */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 ">


            
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            
            {/* Contact Form */}      <section className="relative  pb-16  md:pb-20">
        <div className="max-w-7xl mx-auto px-4   ">
          <div className="text-left max-w-4xl">
            {/* Decorative Line */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="h-0.5 bg-black w-20"></div>
              <div className="h-0.5 bg-gray-300 w-40"></div>
              <div className="h-0.5 bg-black w-20"></div>
            </div>
            
            <h1 className="font-helvetica font-light text-black leading-[1.05] tracking-tight text-5xl md:text-6xl lg:text-7xl mb-8">
              Let's create something
              <br />
              <span className="font-helvetica font-light text-gray-600">exceptional together</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 font-helvetica font-light leading-relaxed max-w-3xl mb-12">
              Experience the precision and care that sets TintLabs apart. From consultation to completion, we're here to exceed your expectations.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-col space-y-4 mb-16">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-helvetica font-medium text-gray-600">Lifetime Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-helvetica font-medium text-gray-600">Certified Installers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-helvetica font-medium text-gray-600">5-Star Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>
            <div>
              <div className="mb-12">
                <h2 className="font-helvetica font-light text-black text-3xl md:text-4xl mb-4">
                  Get Your Quote
                </h2>
                <p className="text-gray-600 font-helvetica font-light text-lg leading-relaxed">
                  Tell us about your project and we'll provide a detailed quote within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <Card className="border-2 border-green-600 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-8 text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="font-helvetica font-medium text-2xl text-black mb-2">
                      Thanks!
                    </h3>
                    <p className="text-gray-800 font-helvetica font-normal">
                      Shena will reach out shortly with a custom quote for your vehicle.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                      <p className="text-red-700 font-helvetica font-medium">{error}</p>
                    </div>
                  )}
                  
                  {/* Row 1: Name, Email, Phone - Horizontal Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="h-12 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black bg-white text-black placeholder:text-gray-600 font-helvetica font-medium text-base"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="h-12 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black bg-white text-black placeholder:text-gray-600 font-helvetica font-medium text-base"
                      />
                    </div>
                    <div>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="h-12 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black bg-white text-black placeholder:text-gray-600 font-helvetica font-medium text-base"
                      />
                    </div>
                  </div>
                  
                  {/* Row 2: Vehicle Year, Make, Model */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <select
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleInputChange}
                        className="w-full h-12 border-2 border-gray-300 rounded-md px-3 py-2 font-helvetica font-medium text-base focus:border-black focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
                      >
                        <option value="" className="text-gray-600">Vehicle Year</option>
                        {vehicleYearOptions.map((year, index) => (
                          <option key={index} value={year} className="text-black">{year}</option>
                        ))}
                      </select>
                      <Input
                        name="vehicleYearCustom"
                        placeholder="Or custom year..."
                        value={formData.vehicleYearCustom}
                        onChange={handleInputChange}
                        className="h-12 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black bg-white text-black placeholder:text-gray-600 font-helvetica font-medium text-base"
                      />
                    </div>
                    <div>
                      <select
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleInputChange}
                        required
                        className="w-full h-12 border-2 border-gray-300 rounded-md px-3 py-2 font-helvetica font-medium text-base focus:border-black focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
                      >
                        <option value="" className="text-gray-600">Vehicle Make</option>
                        {vehicleMakeOptions.map((make, index) => (
                          <option key={index} value={make} className="text-black">{make}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Input
                        name="vehicleModel"
                        placeholder="Vehicle Model"
                        value={formData.vehicleModel}
                        onChange={handleInputChange}
                        required
                        className="h-12 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black bg-white text-black placeholder:text-gray-600 font-helvetica font-medium text-base"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Type, Current Tinting, and Tint Shade Preference */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        required
                        className="w-full h-12 border-2 border-gray-300 rounded-md px-3 py-2 font-helvetica font-medium text-base focus:border-black focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
                      >
                        <option value="" className="text-gray-600">Service Type</option>
                        {serviceTypeOptions.map((service, index) => (
                          <option key={index} value={service} className="text-black">{service}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        name="currentTinting"
                        value={formData.currentTinting}
                        onChange={handleInputChange}
                        required
                        className="w-full h-12 border-2 border-gray-300 rounded-md px-3 py-2 font-helvetica font-medium text-base focus:border-black focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
                      >
                        <option value="" className="text-gray-600">Current Tinting?</option>
                        <option value="Yes" className="text-black">Yes</option>
                        <option value="No" className="text-black">No</option>
                      </select>
                    </div>
                    <div>
                      <select
                        name="tintShadePreference"
                        value={formData.tintShadePreference}
                        onChange={handleInputChange}
                        required
                        className="w-full h-12 border-2 border-gray-300 rounded-md px-3 py-2 font-helvetica font-medium text-base focus:border-black focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
                      >
                        <option value="" className="text-gray-600">Tint Shade Preference</option>
                        {tintShadeOptions.map((shade, index) => (
                          <option key={index} value={shade} className="text-black">{shade}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Notes (Optional) - Full Width */}
                  <div>
                    <Textarea
                      name="notes"
                      placeholder="Notes (optional) - Tell us about your project..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      className="border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black bg-white text-black placeholder:text-gray-600 font-helvetica font-medium text-base resize-none"
                    />
                  </div>

                  {/* Submit Button - Improved Visibility */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-helvetica font-semibold text-lg transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center space-x-3 border-2 border-black shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
      
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
          <div className="text-center">
            <h2 className="font-helvetica font-light text-white text-3xl md:text-4xl mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-gray-300 font-helvetica font-light leading-relaxed max-w-2xl mx-auto mb-8">
              For urgent requests or same-day service, call us directly.
            </p>
            <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 font-helvetica font-light text-lg transition-all duration-300 hover:scale-105">
              Call Now: (540) 891-0696
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact; 