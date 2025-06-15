
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
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
  );
}
