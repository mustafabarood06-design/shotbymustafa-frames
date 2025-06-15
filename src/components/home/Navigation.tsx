import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  return <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-background border-t border-border px-4 py-2 animate-fade-in flex flex-col gap-2">
          {navLinks.map(link => <button key={link.id} className="text-left transition-colors text-muted-foreground hover:text-primary py-2" onClick={() => {
        scrollToSection(link.id);
        setIsMenuOpen(false);
      }}>{link.label}</button>)}
        </div>}
    </nav>;
}