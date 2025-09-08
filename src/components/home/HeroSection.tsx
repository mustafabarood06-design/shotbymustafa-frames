
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Signature } from '@/components/ui/signature';

type HeroSectionProps = {
  scrollToSection: (sectionId: string) => void;
};

export default function HeroSection({
  scrollToSection
}: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern Background with Glassmorphism */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-accent bg-300% animate-gradient" />
        
        {/* Overlay image with better blending */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay" style={{
          backgroundImage: `url('https://i.postimg.cc/52376mLP/IMG-20250611-112739-1.jpg')`
        }} />
        
        {/* Multiple gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20" />
        
        {/* Animated light effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
      </div>
      
      {/* Hero Content with Modern Typography */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Floating Logo */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl hover:scale-105 transition-all duration-500">
            <Logo 
              size="lg" 
              className="text-white drop-shadow-lg"
            />
          </div>
        </div>
        
        {/* Main Title with Gradient Text */}
        <h1 className="font-display font-black text-7xl md:text-9xl lg:text-[10rem] mb-8 leading-none animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <span className="block text-2xl md:text-4xl font-space font-light tracking-[0.3em] mb-4 text-white/80">
            SHOT BY
          </span>
          <span className="block bg-gradient-to-r from-white via-accent to-primary-light bg-clip-text text-transparent font-playfair tracking-tight">
            Mustafa
          </span>
        </h1>
        
        {/* Elegant Subtitle */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-6 text-white/90 leading-relaxed max-w-4xl mx-auto font-space">
            Through My Lens: <span className="font-playfair italic text-accent">Moments That Speak</span>
          </p>
          
          {/* Artistic signature */}
          <div className="flex justify-center items-center space-x-4">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white/50"></div>
            <Signature size="md" variant="light" className="text-white/60 hover:text-accent transition-colors duration-300" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white/50"></div>
          </div>
        </div>
        
        {/* Modern CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <Button 
            onClick={() => scrollToSection('portfolio')} 
            className="relative bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-primary text-lg px-10 py-6 h-auto rounded-2xl font-medium transition-all duration-500 hover:scale-105 shadow-xl group"
          >
            <span className="relative z-10">Explore Portfolio</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500" />
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => scrollToSection('contact')} 
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/60 text-lg px-10 py-6 h-auto rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 font-medium"
          >
            Get in Touch
          </Button>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-white/60 font-space tracking-widest">SCROLL</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center bg-white/5 backdrop-blur-sm">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-glow"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-[10%] w-2 h-2 bg-white/30 rounded-full animate-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-[15%] w-1 h-1 bg-accent/50 rounded-full animate-glow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-1/4 left-[20%] w-3 h-3 border border-white/30 rounded-full animate-glow backdrop-blur-sm" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-[8%] w-4 h-4 bg-primary/20 rounded-full blur-sm animate-float" style={{ animationDelay: '2.5s' }}></div>
    </section>
  );
}
