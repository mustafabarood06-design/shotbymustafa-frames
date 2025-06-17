
import { cn } from "@/lib/utils";

interface SignatureProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

export function Signature({ size = 'md', className, variant = 'default' }: SignatureProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const variantClasses = {
    default: 'text-muted-foreground',
    light: 'text-white/80',
    dark: 'text-photo-gray-700'
  };

  return (
    <div 
      className={cn(
        "font-playfair font-bold tracking-widest select-none transition-all duration-300",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      MUSTAFA
    </div>
  );
}
