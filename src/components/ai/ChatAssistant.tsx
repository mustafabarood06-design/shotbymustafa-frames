
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, X, Minimize2, Maximize2, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { z } from 'zod';

// Secure message validation
const messageSchema = z.string()
  .trim()
  .min(1, "Message cannot be empty")
  .max(500, "Message too long (max 500 characters)");

const apiKeySchema = z.string()
  .regex(/^sk-[a-zA-Z0-9]{48}$/, "Invalid OpenAI API key format")
  .or(z.literal(""));

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const fallbackResponses: Record<string, string> = {
  pricing: "I'd be happy to help with pricing information! For detailed quotes on photography sessions, please use the contact form or email directly. Pricing varies based on session type, duration, and specific requirements.",
  booking: "To book a photography session, please reach out through the contact form or send an email directly. I'll respond with available dates and can discuss your specific needs and preferences.",
  portfolio: "You can view Mustafa's photography portfolio right here on this website! Browse through different categories to see various styles and previous work. Each photo showcases different techniques and artistic approaches.",
  experience: "Mustafa has extensive experience in professional photography, specializing in various styles and techniques. Check out the About section and portfolio to learn more about the background and expertise.",
  services: "Photography services include portrait sessions, event photography, commercial work, and artistic projects. Each service is tailored to meet specific client needs and creative visions.",
  location: "Photography sessions can be arranged at various locations depending on your preferences - studio, outdoor locations, or on-site at your chosen venue. Location options will be discussed during booking.",
  equipment: "Professional-grade equipment is used for all photography sessions to ensure the highest quality results. This includes professional cameras, lighting equipment, and post-processing tools.",
  editing: "All photography sessions include professional post-processing and editing to enhance the final images. This ensures you receive polished, professional-quality photographs.",
  contact: "You can get in touch through the contact form on this website or by email. I'll respond promptly to discuss your photography needs and answer any questions you may have."
};

const getSmartResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
    return fallbackResponses.pricing;
  }
  if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment')) {
    return fallbackResponses.booking;
  }
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('photos')) {
    return fallbackResponses.portfolio;
  }
  if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('about')) {
    return fallbackResponses.experience;
  }
  if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('do')) {
    return fallbackResponses.services;
  }
  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('studio')) {
    return fallbackResponses.location;
  }
  if (lowerMessage.includes('equipment') || lowerMessage.includes('camera') || lowerMessage.includes('gear')) {
    return fallbackResponses.equipment;
  }
  if (lowerMessage.includes('edit') || lowerMessage.includes('retouch') || lowerMessage.includes('process')) {
    return fallbackResponses.editing;
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
    return fallbackResponses.contact;
  }
  
  return "Thank you for your question! I'm here to help with information about photography services, portfolio, booking, and pricing. Feel free to ask about any specific aspects you'd like to know more about, or use the contact form for detailed inquiries.";
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your photography assistant. I can help you learn about Mustafa's work, pricing, booking sessions, or answer any questions about photography services. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    // Validate message input
    try {
      messageSchema.parse(inputMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid message",
          description: error.errors[0].message,
          variant: "destructive"
        });
      }
      return;
    }

    const sanitizedMessage = inputMessage.trim().slice(0, 500);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: sanitizedMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = sanitizedMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      let responseText = '';

      // Try AI response if API key is available
      if (apiKey) {
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                {
                  role: 'system',
                  content: `You are an AI assistant for Mustafa Barood's photography portfolio website. You help visitors with information about:
                  - Photography services and specialties
                  - Booking sessions and pricing inquiries
                  - Portfolio and past work
                  - Photography tips and advice
                  - Contact information
                  
                  Be friendly, professional, and knowledgeable about photography. If asked about specific pricing or booking, encourage them to use the contact form or email directly for detailed quotes.
                  
                  Keep responses concise but helpful. You represent a professional photographer's brand.`
                },
                {
                  role: 'user',
                  content: currentMessage
                }
              ],
              max_tokens: 300,
              temperature: 0.7,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            responseText = data.choices[0].message.content;
          } else {
            throw new Error('AI request failed');
          }
        } catch (error) {
          console.log('AI request failed, using fallback response');
          responseText = getSmartResponse(currentMessage);
        }
      } else {
        // Use smart fallback response
        responseText = getSmartResponse(currentMessage);
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Please try asking your question again, or feel free to use the contact form for direct assistance.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-72 shadow-xl transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[400px]'}`}>
        <CardHeader className="flex flex-row items-center justify-between p-3 pb-2 flex-shrink-0">
          <CardTitle className="text-base">Photography Assistant</CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="h-7 w-7"
            >
              <Settings className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-7 w-7"
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-7 w-7"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-3 pt-0 flex flex-col h-full overflow-hidden">
            <Collapsible open={showSettings} onOpenChange={setShowSettings}>
              <CollapsibleContent>
                <div className="mb-3 p-2 bg-muted rounded-lg flex-shrink-0">
                  <p className="text-xs mb-2">Optional: Add OpenAI API key for enhanced responses</p>
                  <Input
                    type="password"
                    placeholder="sk-... (optional)"
                    value={apiKey}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 60) { // Reasonable max length
                        setApiKey(value);
                      }
                    }}
                    className="mb-2 text-xs"
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground">
                    Chat works without API key using smart responses. Your API key is stored only in memory and never sent to our servers.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex-1 overflow-y-auto mb-3 space-y-2 min-h-0">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2 rounded-lg text-xs ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-2 rounded-lg text-xs animate-pulse">
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <Input
                placeholder="Ask about photography services..."
                value={inputMessage}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 500) {
                    setInputMessage(value);
                  }
                }}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 text-xs"
                maxLength={500}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                size="icon"
                className="flex-shrink-0 h-9 w-9"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatAssistant;
