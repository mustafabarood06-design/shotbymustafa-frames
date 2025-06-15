import { Badge } from '@/components/ui/badge';
import { Camera } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-8">
              Meet Mustafa
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Hi, I'm Mustafa – the eye behind "Shot by Mustafa."
              </p>
              <p>
                I'm a self-taught photographer with a passion for capturing everything around me — from glowing sunsets and candid portraits to the raw moments of street life.
              </p>
              <p>
                I don't follow just one style, because I believe every scene has its own story.
              </p>
              <p>
                Whether I'm shooting with my phone or experimenting with edits, I aim to freeze real emotion in every frame. Photography, for me, is not just art — it's connection.
              </p>
            </div>
            <div className="mt-8">
              <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 text-sm">
                <Camera className="w-4 h-4" />
                Currently Building My Portfolio
              </Badge>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end animate-scale-in">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-border shadow-2xl">
                <div className="w-full h-full bg-cover bg-center grayscale" style={{
                  backgroundImage: `url('https://i.postimg.cc/d1MK92vx/DSC00846-1.jpg')`
                }} />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full">
                <Camera className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
