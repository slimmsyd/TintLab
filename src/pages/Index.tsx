
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import PremiumSection from '../components/PremiumSection';
import AdCopySection from '../components/AdCopySection';
import LatestWorkSection from '../components/LatestWorkSection';
import FAQ from '../components/FAQ';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import WheelsSection from '../components/WheelsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-automotive-black">
      <Navigation />
      <Hero />
      <PremiumSection />
      <AdCopySection />
      <LatestWorkSection />
      <WheelsSection />

      {/* <Benefits /> */}
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      {/* <Chatbot /> */}
    </div>
  );
};

export default Index;
