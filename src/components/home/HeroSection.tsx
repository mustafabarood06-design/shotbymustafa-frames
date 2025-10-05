
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Signature } from '@/components/ui/signature';
import heroImage from "@/assets/hero-bg.jpg";

type HeroSectionProps = {
  scrollToSection: (sectionId: string) => void;
};

export default function HeroSection({
  scrollToSection
}: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* LCP image with modern overlay */}
      <img 
        src={heroImage} 
        alt="Shot by Mustafa - Photography Portfolio Background" 
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none mix-blend-overlay"
      />
      
      {/* Modern Hero Content */}
      <div className="relative z-10 text-center text-foreground px-4 max-w-5xl mx-auto">
        {/* Animated Logo */}
        <div className="mb-12 animate-fade-in">
          <Logo 
            size="lg" 
            className="text-foreground hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Modern Typography with gradient text */}
        <h1 className="font-display font-light text-6xl md:text-8xl lg:text-9xl mb-8 leading-tight tracking-tight animate-scale-in">
          <span className="block text-sm md:text-base font-space font-medium tracking-[0.3em] mb-8 text-muted-foreground uppercase opacity-80">
            Shot by
          </span>
          <span className="block font-playfair font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
            Mustafa
          </span>
        </h1>
        
        {/* Modern Subtitle with backdrop blur */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="backdrop-blur-sm bg-background/30 rounded-2xl p-8 border border-border/50 shadow-lg">
            <p className="text-lg md:text-2xl font-light mb-6 leading-relaxed">
              Through My Lens: <span className="font-playfair italic text-primary font-semibold">Moments That Speak</span>
            </p>
            
            {/* Modern signature line */}
            <div className="flex justify-center items-center space-x-6">
              <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-primary"></div>
              <Signature size="sm" className="text-primary" />
              <div className="w-20 h-[2px] bg-gradient-to-l from-transparent via-primary to-primary"></div>
            </div>
          </div>
        </div>
        
        {/* Modern CTA Buttons with glow effect */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            onClick={() => scrollToSection('portfolio')} 
            className="group relative bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 rounded-full"
          >
            <span className="relative z-10">Explore Portfolio</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => scrollToSection('contact')} 
            className="border-2 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary px-10 py-6 text-lg font-semibold transition-all duration-500 hover:scale-105 rounded-full backdrop-blur-sm"
          >
            Get in Touch
          </Button>
        </div>
        
        {/* Modern Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col items-center space-y-3">
            <span className="text-xs text-muted-foreground font-space tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-2 backdrop-blur-sm">
              <div className="w-1 h-3 bg-primary rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
