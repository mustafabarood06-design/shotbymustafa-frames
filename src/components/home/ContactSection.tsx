import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Instagram, Mail } from 'lucide-react';
import emailjs from 'emailjs-com';
export default function ContactSection() {
  const {
    toast
  } = useToast();
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
    const {
      name,
      value
    } = e.target;
    setContact(prev => ({
      ...prev,
      [name]: value
    }));
  }
  function validate() {
    if (!contact.name.trim()) {
      toast({
        title: "Name is required",
        variant: "destructive"
      });
      return false;
    }
    if (!contact.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contact.email)) {
      toast({
        title: "Valid email is required",
        variant: "destructive"
      });
      return false;
    }
    if (!contact.message.trim()) {
      toast({
        title: "Message is required",
        variant: "destructive"
      });
      return false;
    }
    return true;
  }
  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: contact.name,
        from_email: contact.email,
        message: contact.message
      }, PUBLIC_KEY);
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
  return <section id="contact" className="py-20 px-4 bg-muted">
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
                <span className="text-lg">+919479745254</span>
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
                <Input placeholder="Your Name" name="name" value={contact.name} onChange={handleInputChange} className="bg-background" autoComplete="name" disabled={loading} />
              </div>
              <div>
                <Input type="email" name="email" placeholder="Your Email" value={contact.email} onChange={handleInputChange} className="bg-background" autoComplete="email" disabled={loading} />
              </div>
              <div>
                <Textarea name="message" placeholder="Tell me about your project..." rows={4} value={contact.message} onChange={handleInputChange} className="bg-background" disabled={loading} />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
            <div className="text-xs text-muted-foreground mt-3">
              Powered by <a href="https://www.emailjs.com/" className="underline" target="_blank" rel="noopener noreferrer">EmailJS</a>
            </div>
          </div>
        </div>
      </div>
    </section>;
}