import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackClassName?: string;
}

export const FallbackImage: React.FC<FallbackImageProps> = ({ 
  src, 
  alt, 
  fallbackText,
  fallbackClassName = "bg-industrial-800 border border-white/10",
  className,
  ...props 
}) => {
  const [error, setError] = useState(!src);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center w-full h-full text-white/30 ${fallbackClassName} ${className || ''}`}>
        {fallbackText ? (
          <span className="text-xl font-bold tracking-widest uppercase">{fallbackText}</span>
        ) : (
          <ImageIcon className="w-1/3 h-1/3 max-w-[48px] max-h-[48px] opacity-20" />
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Image"}
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
};
