import React from 'react';

interface GoogleMapProps {
  address: string;
  className?: string;
  height?: string;
  width?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  address, 
  className = '', 
  height = '300px', 
  width = '100%' 
}) => {
  // Encode the address for URL
  const encodedAddress = encodeURIComponent(address);
  
  // Google Maps Embed API URL
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&q=${encodedAddress}&zoom=15&maptype=roadmap`;
  
  return (
    <div className={`rounded-lg overflow-hidden shadow-sm ${className}`}>
      <iframe
        src={mapSrc}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="TintLab Location"
        className="w-full"
      />
    </div>
  );
};

export default GoogleMap; 