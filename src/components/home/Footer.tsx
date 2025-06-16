
import { Instagram } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Signature } from "@/components/ui/signature";

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <Logo size="md" className="opacity-80" />
          
          <Signature size="md" className="opacity-70 hover:opacity-100 transition-opacity" />
          
          <p className="text-muted-foreground text-center max-w-md">
            © 2024 Mustafa Photography. Capturing moments, creating memories.
          </p>
          
          <div className="flex justify-center gap-6">
            <a 
              href="https://instagram.com/shot_by_mustafa" 
              className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
