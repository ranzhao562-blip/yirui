
import React from 'react';

interface AssetImageProps {
  src: string;
  alt: string;
  className?: string;
  label?: string;
}

const AssetImage: React.FC<AssetImageProps> = ({ src, alt, className = "", label }) => {
  return (
    <div className={`relative group ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain drop-shadow-lg"
        draggable={false}
      />
      {label && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/70 text-white text-xs px-2 py-1 rounded pointer-events-none">
          {label}
        </div>
      )}
    </div>
  );
};

export default AssetImage;
