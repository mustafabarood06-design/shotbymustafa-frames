
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function Logo({ size = 'md', className, onClick }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl xl:text-4xl'
  };

  return (
    <div 
      className={cn(
        "font-playfair font-bold text-foreground tracking-widest uppercase cursor-pointer transition-all duration-300 hover:text-primary select-none",
        sizeClasses[size],
        className
      )}
      onClick={onClick}
    >
      Mustafa Photography
    </div>
  );
}
