
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
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* LCP image for discovery */}
      <img 
        src={heroImage} 
        alt="Shot by Mustafa - Photography Portfolio Background" 
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
      />
      
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-background">
      </div>
      
      {/* Clean Hero Content */}
      <div className="relative z-10 text-center text-foreground px-4 max-w-4xl mx-auto">
        {/* Simple Logo */}
        <div className="mb-16">
          <Logo 
            size="lg" 
            className="text-foreground"
          />
        </div>
        
        {/* Clean Typography */}
        <h1 className="font-display font-light text-6xl md:text-8xl mb-6 leading-tight tracking-tight">
          <span className="block text-lg md:text-xl font-space font-normal tracking-[0.2em] mb-6 text-muted-foreground">
            SHOT BY
          </span>
          <span className="block text-foreground font-playfair">
            Mustafa
          </span>
        </h1>
        
        {/* Simple Subtitle */}
        <div className="mb-16">
          <p className="text-lg md:text-xl font-light mb-8 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Through My Lens: <span className="font-playfair italic text-primary">Moments That Speak</span>
          </p>
          
          {/* Clean signature */}
          <div className="flex justify-center items-center space-x-6">
            <div className="w-12 h-[1px] bg-border"></div>
            <Signature size="sm" className="text-muted-foreground" />
            <div className="w-12 h-[1px] bg-border"></div>
          </div>
        </div>
        
        {/* Clean CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => scrollToSection('portfolio')} 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base font-medium transition-colors duration-300"
          >
            Explore Portfolio
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => scrollToSection('contact')} 
            className="border-border text-foreground hover:bg-secondary px-8 py-3 text-base font-medium transition-colors duration-300"
          >
            Get in Touch
          </Button>
        </div>
        
        {/* Simple Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-muted-foreground font-space tracking-widest">SCROLL</span>
            <div className="w-5 h-8 border border-border rounded-full flex justify-center">
              <div className="w-0.5 h-2 bg-muted-foreground rounded-full mt-1.5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
