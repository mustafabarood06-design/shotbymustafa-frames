
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Menu, X } from "lucide-react";

type NavigationProps = {
  scrollToSection: (sectionId: string) => void;
};

const navLinks = [{
  id: 'home',
  label: "Home"
}, {
  id: 'about',
  label: "About"
}, {
  id: 'portfolio',
  label: "Portfolio"
}, {
  id: 'skills',
  label: "Skills"
}, {
  id: "contact",
  label: "Contact"
}];

export default function Navigation({
  scrollToSection
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-xl border-b border-white/10 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="p-2 bg-primary/10 backdrop-blur-sm rounded-xl border border-primary/20 group-hover:scale-105 transition-all duration-300">
              <Logo 
                size="sm" 
                className="text-primary drop-shadow-sm group-hover:text-primary-light transition-colors"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-space font-semibold text-foreground text-lg">Shot by Mustafa</span>
              <span className="font-space text-xs text-muted-foreground tracking-wider">PHOTOGRAPHY</span>
            </div>
          </div>
          
          {/* Modern Desktop Navigation */}
          <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-2xl px-2 py-2 border border-white/20 shadow-lg">
            {navLinks.map((link, index) => (
              <button 
                key={link.id} 
                className="relative px-6 py-3 text-foreground hover:text-primary transition-all duration-300 font-space font-medium text-sm tracking-wide group rounded-xl hover:bg-white/10"
                onClick={() => scrollToSection(link.id)}
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 transition-all duration-300" />
              </button>
            ))}
          </div>
          
          {/* Modern Mobile Menu Button */}
          <button
            className="md:hidden p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <div className={`absolute top-1 left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2.5' : ''}`} />
              <div className={`absolute top-2.5 left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`absolute top-4 left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>
      
      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-2xl animate-slide-up">
          <div className="max-w-md mx-auto px-6 py-6">
            {navLinks.map((link, index) => (
              <button 
                key={link.id} 
                className="w-full text-left py-4 px-6 text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 font-space font-medium rounded-xl mb-2 group" 
                onClick={() => {
                  scrollToSection(link.id);
                  setIsMenuOpen(false);
                }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full group-hover:scale-150 transition-transform duration-300" />
                  <span>{link.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
