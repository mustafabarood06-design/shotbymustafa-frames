
import { Badge } from '@/components/ui/badge';
import { Camera } from 'lucide-react';
import profileImage from "@/assets/profile.jpg";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-4 overflow-hidden">
      {/* Modern background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Modern Image Section */}
          <div className="flex justify-center lg:justify-start animate-scale-in">
            <div className="relative group">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 scale-110"></div>
              
              {/* Main image with modern styling */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl group-hover:scale-105 group-hover:border-primary/50 transition-all duration-500">
                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{
                  backgroundImage: `url(${profileImage})`
                }} />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Camera badge with glow */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-5 rounded-full shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-8 h-8" />
              </div>
              
              {/* Decorative rings */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 border-4 border-primary/10 rounded-full"></div>
            </div>
          </div>
          
          {/* Modern Content Section */}
          <div className="animate-fade-in space-y-8">
            {/* Section badge */}
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              About Me
            </Badge>
            
            <h2 className="font-playfair font-bold text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Meet Mustafa
            </h2>
            
            {/* Modern content card */}
            <div className="backdrop-blur-sm bg-card/50 rounded-3xl p-8 border border-border/50 shadow-xl space-y-6">
              <div className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground/90">
                <p className="hover:text-foreground transition-colors duration-300">
                  Hi, I'm <span className="font-semibold text-primary">Mustafa</span> – the eye behind "Shot by Mustafa."
                </p>
                <p className="hover:text-foreground transition-colors duration-300">
                  I'm a <span className="font-semibold text-primary">self-taught photographer</span> with a passion for capturing everything around me — from glowing sunsets and candid portraits to the raw moments of street life.
                </p>
                <p className="hover:text-foreground transition-colors duration-300">
                  I don't follow just one style, because I believe <span className="font-playfair italic text-primary">every scene has its own story</span>.
                </p>
                <p className="hover:text-foreground transition-colors duration-300">
                  Whether I'm shooting with my phone or experimenting with edits, I aim to freeze real emotion in every frame. Photography, for me, is not just art — <span className="font-semibold text-primary">it's connection</span>.
                </p>
              </div>
              
              {/* Decorative line */}
              <div className="pt-6">
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
