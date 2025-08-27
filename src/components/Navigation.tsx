import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToSectionOrHome = (sectionId: string) => {
    if (isHomePage) {
      // If we're on the home page, just scroll to the section
      scrollToSection(sectionId);
    } else {
      // If we're on a different page, navigate to home with hash
      navigate('/', { replace: true });
      // Use a small delay to ensure the page loads before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navigateToContact = () => {
    navigate('/contact');
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'tint', action: () => navigateToSectionOrHome('tint-section') },
    { name: 'wheels', action: () => navigateToSectionOrHome('wheels-section') },
    { name: 'gallery', action: () => navigateToSectionOrHome('latest-work') },
    { name: 'contact', action: navigateToContact },
  ];

  return (
    <nav className="relative top-0 left-0 right-0 z-50 bg-black border-b border-white/20">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center cursor-pointer group"
          >
            <img 
              src="/Logo.png" 
              alt="TintLab Logo" 
              className="w-[10rem]  mr-3 group-hover:opacity-80 transition-opacity duration-300" 
            />
            <h1 className="text-2xl font-helvetica font-light text-white group-hover:text-gray-300 transition-colors duration-300">
              tint<span className="text-gray-300 font-normal">lab</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="text-white font-helvetica font-light text-base tracking-wide hover:text-gray-300 transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            
            {/* CTA Button */}
            <Button 
              onClick={navigateToContact}
              className="bg-white text-black hover:bg-gray-100 py-3 px-8 text-sm font-helvetica font-medium tracking-widest uppercase transition-all duration-300 rounded-none border-0 ml-6"
            >
              free quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-6 space-y-2 bg-black/95 backdrop-blur-lg mt-2 border border-white/20">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="block w-full text-left px-8 py-4 text-white font-helvetica font-light text-base tracking-wide hover:text-gray-300 hover:bg-white/5 transition-all duration-300"
              >
                {item.name}
              </button>
            ))}
            
            <div className="px-8 pt-4">
              <Button 
                onClick={navigateToContact}
                className="bg-white text-black hover:bg-gray-100 py-3 px-8 text-sm w-full font-helvetica font-medium tracking-widest uppercase transition-all duration-300 rounded-none border-0"
              >
                free quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 