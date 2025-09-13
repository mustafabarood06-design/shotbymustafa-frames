
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageZoomProps {
  src: string;
  alt: string;
  title: string;
  category: string;
  className?: string;
}

export default function ImageZoom({ src, alt, title, category, className = "" }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const openZoom = () => {
    setIsZoomed(true);
    document.body.style.overflow = 'hidden';
  };

  const closeZoom = () => {
    setIsZoomed(false);
    document.body.style.overflow = 'unset';
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeZoom();
      }
    };

    if (isZoomed) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isZoomed]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <img 
        src={src} 
        alt={alt} 
        className={`photo w-full h-full object-cover transition-all duration-300 hover:scale-[1.02] hover:brightness-110 cursor-zoom-in ${className}`}
        onClick={openZoom}
        decoding="async"
      />
      
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeZoom}
        >
          <div 
            className="relative max-w-[90vw] max-h-[90vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={src} 
              alt={alt} 
              className="max-w-full max-h-full object-contain border-4 border-white rounded-lg shadow-2xl"
              decoding="async"
            />
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold text-xl mb-1 tracking-wide">{title}</h3>
              <p className="text-white/80 text-sm font-medium">{category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
