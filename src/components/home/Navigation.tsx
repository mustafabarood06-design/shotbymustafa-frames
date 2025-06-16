
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
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo 
            size="sm" 
            onClick={() => scrollToSection('home')}
            className="hover:scale-105"
          />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-2 animate-fade-in flex flex-col gap-2">
          {navLinks.map(link => (
            <button 
              key={link.id} 
              className="text-left transition-colors text-muted-foreground hover:text-primary py-2" 
              onClick={() => {
                scrollToSection(link.id);
                setIsMenuOpen(false);
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
