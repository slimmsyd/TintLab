import React, { useState } from 'react';
import { Calendar, ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does window tinting installation take?",
      answer: "Professional installation typically takes 2-4 hours depending on your vehicle type and the number of windows being tinted. We ensure precision and quality over speed, so your installation is done right the first time."
    },
    {
      question: "What's the difference between your tinting films?",
      answer: "We offer three premium tiers: Ceramic films provide excellent heat rejection and UV protection, Carbon films offer superior durability and appearance, and our top-tier CXP technology features nano-hybrid carbon for maximum performance and clarity."
    },
    {
      question: "Is window tinting legal in my area?",
      answer: "Window tinting laws vary by location. We stay current with all local regulations and will ensure your tinting complies with legal requirements. We'll discuss the appropriate tint levels during your consultation."
    },
    {
      question: "Do you offer a warranty on your work?",
      answer: "Yes! We provide a comprehensive lifetime warranty on our premium installations. This covers bubbling, peeling, discoloration, and adhesion failure. We stand behind our craftsmanship and premium materials."
    },
    {
      question: "How should I care for my newly tinted windows?",
      answer: "Wait 3-7 days before cleaning to allow full curing. Use only ammonia-free cleaners and soft cloths. Avoid abrasive materials and sharp objects. With proper care, your tint will maintain its appearance and performance for years."
    },
    {
      question: "Can you tint any type of vehicle?",
      answer: "We specialize in all vehicle types including sedans, SUVs, trucks, luxury cars, and sports cars. Our precision-cutting technology and expertise allows us to handle any make and model with perfect results."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center space-x-6 mb-8">
            <div className="h-0.5 bg-black w-20"></div>
            <div className="h-0.5 bg-gray-300 w-40"></div>
          </div>
          <div className="max-w-4xl">
            <h2 className="font-helvetica font-light text-black leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-8">
              Frequently asked questions
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-helvetica font-light leading-relaxed max-w-2xl">
              Everything you need to know about our premium window tinting services and process.
            </p>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between group focus:outline-none"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <HelpCircle className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                    <h3 className="font-helvetica font-light text-black text-lg md:text-xl leading-tight group-hover:text-gray-700 transition-colors duration-300">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-6 md:pb-8' : 'max-h-0'
                }`}>
                  <div className="px-6 md:px-8 pl-16 md:pl-20">
                    <p className="text-gray-600 font-helvetica font-light text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <h3 className="font-helvetica font-light text-black text-2xl md:text-3xl mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-500 font-helvetica font-light text-base md:text-lg mb-8">
              Our experts are here to help you choose the perfect tinting solution for your vehicle.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-10 py-4 rounded-none font-helvetica font-light text-base tracking-wide transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-4 h-4" />
              <span className="ml-2">
                Get Your Free Quote
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 