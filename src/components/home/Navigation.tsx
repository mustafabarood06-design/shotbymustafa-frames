
import { useState } from "react";
import { Button } from "@/components/ui/button";

type NavigationProps = {
  scrollToSection: (sectionId: string) => void;
};

const navLinks = [
  { id: 'home', label: "Home" },
  { id: 'about', label: "About" },
  { id: 'portfolio', label: "Portfolio" },
  { id: 'skills', label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navigation({ scrollToSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        <span className="font-display text-xl font-bold tracking-tight">Shot by Mustafa</span>
        <div className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              className="transition-colors text-muted-foreground hover:text-primary"
              onClick={() => scrollToSection(link.id)}
            >{link.label}</button>
          ))}
        </div>
        <Button
          className="md:hidden"
          variant="outline"
          onClick={() => setIsMenuOpen(x => !x)}
          aria-label="Open Menu"
        >
          <span className="text-lg">☰</span>
        </Button>
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
            >{link.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
