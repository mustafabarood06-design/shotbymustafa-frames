
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-photo-gray-900 via-photo-gray-800 to-black">
        <div className="w-full h-full bg-cover bg-center opacity-40" style={{
          backgroundImage: `url('https://i.postimg.cc/52376mLP/IMG-20250611-112739-1.jpg')`
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.05),transparent)]" />
      </div>
      
      {/* Hero content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Logo 
            size="lg" 
            className="text-white/90 hover:text-white mb-4"
          />
        </div>
        
        <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl mb-6 leading-none animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <span className="block bg-gradient-to-r from-white via-white to-photo-gray-300 bg-clip-text text-5xl text-slate-300">
            Shot by
          </span>
          <span className="block text-white mt-2 tracking-wider text-6xl">Mustafa</span>
        </h1>
        
        <p style={{ animationDelay: '0.6s' }} className="text-xl font-light mb-8 text-photo-gray-200 leading-relaxed max-w-4xl mx-auto animate-fade-in text-zinc-200 text-center md:text-3xl">
          Through My Lens: Moments That Speak
        </p>

        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <Signature size="lg" variant="light" className="text-white/70 hover:text-white/90" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Button onClick={() => scrollToSection('portfolio')} className="bg-white text-black hover:bg-photo-gray-100 text-lg px-8 py-4 h-auto rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Explore my world through the lens
          </Button>
          <Button variant="outline" onClick={() => scrollToSection('contact')} className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto rounded-full backdrop-blur-sm transition-all duration-300">
            Get in touch
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-1/4 left-20 w-3 h-3 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}
