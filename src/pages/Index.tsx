import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Camera, Frame, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
const Index = () => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!contact.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return false;
    }
    if (!contact.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contact.email)) {
      toast({ title: "Valid email is required", variant: "destructive" });
      return false;
    }
    if (!contact.message.trim()) {
      toast({ title: "Message is required", variant: "destructive" });
      return false;
    }
    return true;
  };

  // 🔑 Replace this with your real Formspree endpoint (after you register at formspree.io)
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT";

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          message: contact.message,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll respond soon.",
        });
        setContact({ name: "", email: "", message: "" });
      } else {
        toast({
          title: "Error sending message",
          description: "Please try again, or message me on Instagram.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An unexpected error occurred",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  return <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with your uploaded image */}
        <div className="absolute inset-0 bg-gradient-to-br from-photo-gray-900 via-photo-gray-800 to-black">
          <div className="w-full h-full bg-cover bg-center opacity-40" style={{
          backgroundImage: `url('https://i.postimg.cc/52376mLP/IMG-20250611-112739-1.jpg')`
        }} />
          {/* Modern overlay with subtle texture */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.05),transparent)]" />
        </div>

        {/* Enhanced content with modern typography */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          {/* Animated badge */}
          <div className="mb-8 animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            
          </div>

          {/* Enhanced main heading with modern typography */}
          <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl mb-6 leading-none animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
            <span className="block bg-gradient-to-r from-white via-white to-photo-gray-300 bg-clip-text text-transparent">
              Shot by
            </span>
            <span className="block text-white mt-2 tracking-wider">
              Mustafa
            </span>
          </h1>

          {/* Enhanced subheading */}
          <p className="text-xl md:text-3xl font-light mb-12 text-photo-gray-200 leading-relaxed max-w-4xl mx-auto animate-fade-in" style={{
          animationDelay: '0.6s'
        }}>
            Capturing real emotion in quiet, honest frames.
          </p>

          {/* Modern CTA section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{
          animationDelay: '0.8s'
        }}>
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

        {/* Floating elements for modern touch */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{
        animationDelay: '1.5s'
      }}></div>
        <div className="absolute bottom-1/4 left-20 w-3 h-3 border border-white/20 rounded-full animate-pulse" style={{
        animationDelay: '2s'
      }}></div>
      </section>

      {/* About Section */}
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
                  backgroundImage: `url('https://i.postimg.cc/DZQRdRxS/IMG-20250603-145648.jpg')`
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

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Portfolio
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of moments that speak louder than words
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
            src: 'https://i.postimg.cc/nr05NBbZ/IMG-20250527-191655.jpg',
            title: 'CITY IN MOTION',
            category: 'Street'
          }, {
            src: 'https://i.postimg.cc/4NxjVLV3/IMG-20250603-150330.jpg',
            title: 'PEDAL PAUSE',
            category: 'Everyday Moments'
          }, {
            src: 'https://i.postimg.cc/ZnJ3Cs7P/IMG-20250529-WA0147-3.jpg',
            title: 'MOMENT BENEATH THE BUSH',
            category: 'Portraits'
          }, {
            src: 'https://i.postimg.cc/YqDZ36zz/IMG-20250529-175114.jpg',
            title: 'CITY LINES',
            category: 'Black & White'
          }, {
            src: 'https://i.postimg.cc/6Q3QnC3P/IMG-20250611-102952.jpg',
            title: 'RURAL MOMENTS',
            category: 'Everyday Moments'
          }, {
            src: 'https://i.postimg.cc/qvVNW1wH/IMG-20250606-185628.jpg',
            title: 'URBAN LAYERS',
            category: 'Portraits'
          }].map((item, index) => <div key={index} className="group relative overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="aspect-square overflow-hidden">
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="mb-1 text-justify font-bold text-lg">{item.title}</h3>
                    <p className="text-sm opacity-80">{item.category}</p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-8">
              My Eye for Moments
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              I capture honest, everyday moments through minimal, quiet frames — with a strong sense of mood and story, especially in black & white.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            icon: Camera,
            title: 'Street Photography',
            description: 'Capturing authentic moments in urban environments'
          }, {
            icon: Frame,
            title: 'Black & White',
            description: 'Finding emotion and contrast in monochrome'
          }, {
            icon: Instagram,
            title: 'Visual Storytelling',
            description: 'Every frame tells a unique story'
          }].map((skill, index) => <div key={index} className="p-8 rounded-lg border border-border hover:border-primary transition-colors duration-300 animate-scale-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <skill.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-xl mb-3">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Let's Connect
            </h2>
            <p className="text-xl text-muted-foreground">
              Ready to capture your story? Get in touch.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-fade-in">
              <h3 className="font-semibold text-2xl mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-lg">9479745254</span>
                </div>
                <div className="flex items-center gap-4 rounded-xl">
                  <Instagram className="w-5 h-5 text-primary" />
                  <a href="https://instagram.com/shot_by_mustafa" className="text-lg hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    @shot_by_mustafa
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-xl">mustafabarood06@gmail.com</span>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="animate-scale-in">
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div>
                  <Input
                    placeholder="Your Name"
                    name="name"
                    value={contact.name}
                    onChange={handleInputChange}
                    className="bg-background"
                    autoComplete="name"
                    disabled={loading}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={contact.email}
                    onChange={handleInputChange}
                    className="bg-background"
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={4}
                    value={contact.message}
                    onChange={handleInputChange}
                    className="bg-background"
                    disabled={loading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
              <div className="text-xs text-muted-foreground mt-3">
                Powered by <a href="https://formspree.io" className="underline" target="_blank" rel="noopener noreferrer">Formspree</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground mb-4">
            © 2024 Shot by Mustafa. Capturing moments, creating memories.
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://instagram.com/shot_by_mustafa" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;
