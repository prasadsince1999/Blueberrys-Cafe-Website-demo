import { ImgHTMLAttributes, useState } from 'react';
import { cn } from '../../lib/utils';
import { Camera } from 'lucide-react';

interface PlaceholderImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  label?: string;
  className?: string;
  aspectRatio?: string;
  src?: string;
  alt?: string;
}

export function PlaceholderImage({ 
  src, 
  alt, 
  label = 'Image Placeholder', 
  className,
  aspectRatio,
  ...props 
}: PlaceholderImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If there's an actual SRC provided by the user later, it will try to load it.
  // For now, if no SRC or if it errors, we show the elegant placeholder.
  
  if (!src || hasError) {
    return (
      <div 
        className={cn("relative overflow-hidden bg-cafe-cream/30 border border-cafe-teal/10 flex flex-col items-center justify-center text-cafe-teal", className)} 
        style={{ aspectRatio }}
      >
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--color-cafe-teal)_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
        <Camera className="w-8 h-8 mb-3 opacity-40 stroke-[1]" />
        <span className="text-sm font-serif italic opacity-60 tracking-wide text-center px-4">{label}</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-cafe-cream flex items-center justify-center", className)} style={{ aspectRatio }}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-cafe-cream/50" />
      )}
      <img
        src={src}
        alt={alt || label}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        {...props}
      />
    </div>
  );
}

