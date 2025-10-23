
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Instagram, Mail, Send, MapPin, MessageCircle } from 'lucide-react';
import emailjs from 'emailjs-com';
import { z } from 'zod';

// Secure input validation schema
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, hyphens and apostrophes" }),
  email: z.string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" })
});

export default function ContactSection() {
  const { toast } = useToast();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  // EmailJS configuration
  const SERVICE_ID = "service_fhe62uc";
  const TEMPLATE_ID = "template_nzokwut";
  const PUBLIC_KEY = "vkRwfJaiqA1TnYoS1";

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    
    // Enforce max length on input
    let sanitizedValue = value;
    if (name === 'name' && value.length > 100) return;
    if (name === 'email' && value.length > 255) return;
    if (name === 'message' && value.length > 2000) return;
    
    setContact(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  }

  function validate() {
    try {
      // Comprehensive validation using zod schema
      contactSchema.parse(contact);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive"
        });
      }
      return false;
    }
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      // Sanitize data before sending
      const sanitizedData = {
        from_name: contact.name.trim(),
        from_email: contact.email.trim().toLowerCase(),
        message: contact.message.trim()
      };
      
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, sanitizedData, PUBLIC_KEY);
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll respond soon."
      });
      
      setContact({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again, or message me on Instagram.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Contact
          </div>
          <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to capture your story? Get in touch and let's create something beautiful together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="animate-fade-in space-y-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-2xl mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <span className="text-lg font-medium">+919479745254</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Instagram</p>
                    <a 
                      href="https://instagram.com/shot_by_mustafa" 
                      className="text-lg font-medium hover:text-primary transition-colors duration-200" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      @shot_by_mustafa
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reddit</p>
                    <a 
                      href="https://reddit.com/u/MUSTAFAEYES" 
                      className="text-lg font-medium hover:text-primary transition-colors duration-200" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      u/MUSTAFAEYES
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a 
                      href="mailto:mustafabarood06@gmail.com"
                      className="text-lg font-medium hover:text-primary transition-colors duration-200"
                    >
                      mustafabarood06@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-scale-in">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Your Name <span className="text-xs text-muted-foreground/60">({contact.name.length}/100)</span>
                  </label>
                  <Input 
                    placeholder="Enter your name" 
                    name="name" 
                    value={contact.name} 
                    onChange={handleInputChange} 
                    className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl"
                    autoComplete="name" 
                    disabled={loading}
                    maxLength={100}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Your Email <span className="text-xs text-muted-foreground/60">({contact.email.length}/255)</span>
                  </label>
                  <Input 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    value={contact.email} 
                    onChange={handleInputChange} 
                    className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl"
                    autoComplete="email" 
                    disabled={loading}
                    maxLength={255}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Your Message <span className="text-xs text-muted-foreground/60">({contact.message.length}/2000)</span>
                  </label>
                  <Textarea 
                    name="message" 
                    placeholder="Tell me about your project... (minimum 10 characters)" 
                    rows={5} 
                    value={contact.message} 
                    onChange={handleInputChange} 
                    className="bg-background/50 border-border/50 focus:border-primary rounded-xl resize-none"
                    disabled={loading}
                    maxLength={2000}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-xl font-medium text-lg flex items-center gap-2 transition-all duration-200 hover:scale-[1.02]" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
              
              <div className="text-xs text-muted-foreground mt-4 text-center">
                Powered by <a href="https://www.emailjs.com/" className="underline hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">EmailJS</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
