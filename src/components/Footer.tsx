
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Clock, Shield, Send, Loader2 } from 'lucide-react';
import GoogleMap from './ui/google-map';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsLoading(true);
      setError(null);
      
      try {
        // Submit email to newsletter webhook with timestamp
        const newsletterData = {
          email,
          timestamp: new Date().toISOString(),
          submittedAt: new Date().toLocaleString()
        };
        
        // Use production webhook URL if in production, otherwise use test URL
        const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
        const webhookUrl = isProduction 
          ? 'https://kilah.app.n8n.cloud/webhook/45087257-cd72-4328-9d9f-d83cd71ed133'
          : 'https://kilah.app.n8n.cloud/webhook-test/45087257-cd72-4328-9d9f-d83cd71ed133';
        
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newsletterData),
        });

        if (response.ok) {
          console.log('Newsletter signup successful:', email);
          setIsSubmitted(true);
          setEmail('');
          
          // Reset success message after 3 seconds
          setTimeout(() => {
            setIsSubmitted(false);
          }, 3000);
        } else {
          console.error('Newsletter signup failed:', response.status, response.statusText);
          if (response.status === 404) {
            setError('Newsletter service unavailable. Please try again later.');
          } else {
            setError(`Signup failed: ${response.statusText}`);
          }
        }
      } catch (error) {
        console.error('Error submitting newsletter signup:', error);
        setError('Network error. Please check your connection and try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const faqItems = [
    {
      question: "How long does installation take?",
      answer: "Most vehicles are completed in 2-4 hours depending on the complexity. We've been perfecting our process for over 25 years."
    },
    {
      question: "What warranty do you offer?",
      answer: "We provide a 100% lifetime manufacturer's warranty with nation-wide coverage on all our premium tinting services."
    },
    {
      question: "What types of film do you use?",
      answer: "We use only the best SunTek films including High Performance, Carbon, CXP, and Ceramic options to fit your needs."
    }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
            Quick answers
          </h3>
          <p className="text-gray-600 font-light">Common questions about our services</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="text-gray-900 font-medium mb-3 text-base">
                {item.question}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="h-px bg-gray-200 mb-12 md:mb-16" />

        {/* Location Map Section */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-3 tracking-tight">
              Visit Our Shop
            </h3>
            <p className="text-gray-600 font-light">
              Professional installation facility in Fredericksburg, VA
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Map */}
            <div className="lg:col-span-2">
              <GoogleMap 
                address="10928 Patriot Hwy, Fredericksburg, VA 22408"
                height="400px"
                className="border border-gray-200"
              />
            </div>
            
            {/* Location Details */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm">
              <h4 className="text-gray-900 font-medium mb-6 text-lg">Location Details</h4>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm mb-1">Address</p>
                    <a 
                      href="https://maps.google.com/?q=10928+Patriot+Hwy,+Fredericksburg,+VA+22408" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 text-sm leading-relaxed transition-colors duration-200"
                    >
                      10928 Patriot Hwy<br />
                      Fredericksburg, VA 22408
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm mb-1">Business Hours</p>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      <div>Mon-Fri: 9:00am-5:30pm</div>
                      <div>Saturday: By Appointment</div>
                      <div>Sunday: Closed</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                    <Phone className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm mb-1">Contact</p>
                    <a href="tel:5408910696" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                      (540) 891-0696
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <a 
                  href="https://maps.google.com/?q=10928+Patriot+Hwy,+Fredericksburg,+VA+22408" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium text-sm transition-colors duration-200"
                >
                  Get Directions
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 mb-12 md:mb-16" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 md:mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/Tint_Lab_Logo.webp" 
                alt="TintLab Logo" 
                className="w-[10rem] mr-3" 
              />
              <h3 className="text-2xl font-medium text-gray-900">
                Tint<span className="font-light">Lab</span>
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed font-light text-base max-w-md">
              Veteran owned and operated. Providing Fredericksburg and surrounding areas with quality window tinting for over 25 years. We don't just offer tint, we specialize in it.
            </p>
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 text-sm font-medium">Veteran Owned & Operated</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200">
                <Facebook className="w-5 h-5 text-gray-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200">
                <Instagram className="w-5 h-5 text-gray-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200">
                <Twitter className="w-5 h-5 text-gray-600" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-900 font-medium mb-6 text-base">Services</h4>
            <ul className="space-y-3">
              {[
                'Window Tinting',
                'Custom Wheels',
                'Quality Accessories',
                'High Performance Films',
                'Carbon Tinting',
                'Ceramic Tinting'
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-normal">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="text-gray-900 font-medium mb-6 text-base">Stay Updated</h4>
            
            {/* Newsletter Signup */}
            <div className="mb-8">
              <p className="text-gray-600 font-light text-sm mb-4">
                Get notified about our latest promotions and special offers
              </p>
              
              {!isSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-700 text-xs font-medium">{error}</p>
                    </div>
                  )}
                  
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 text-black bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm transition-all duration-200"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-left">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-600 font-medium text-sm">
                    Thank you for subscribing!
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    You'll receive our latest updates.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-gray-600" />
                </div>
                <a href="tel:5408910696" className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200">
                  (540) 891-0696
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-gray-600" />
                </div>
                <a href="mailto:sales@tintlab.net" className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200">
                  sales@tintlab.net
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                  <MapPin className="w-4 h-4 text-gray-600" />
                </div>
                <a 
                  href="https://maps.google.com/?q=10928+Patriot+Hwy,+Fredericksburg,+VA+22408" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-sm font-normal leading-relaxed transition-colors duration-200"
                >
                  10928 Patriot Hwy<br />
                  Fredericksburg, VA 22408
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                  <Clock className="w-4 h-4 text-gray-600" />
                </div>
                <div className="text-gray-600 text-sm font-normal leading-relaxed">
                  <div>Mon-Fri: 9:00am-5:30pm</div>
                  <div>Saturday: By Appointment</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0 font-normal">
            © {currentYear} TintLab. All rights reserved. • Fredericksburg, VA
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm font-normal">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm font-normal">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm font-normal">
              Warranty Info
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
