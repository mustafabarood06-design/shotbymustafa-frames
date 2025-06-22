
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';

interface VisitorData {
  timestamp: string;
  userAgent: string;
  referrer: string;
  page: string;
}

export const useVisitorTracking = (isEnabled: boolean = true) => {
  const [hasTracked, setHasTracked] = useState(false);

  const sendEmailNotification = async (visitorData: VisitorData) => {
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // You'll need to replace this with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // You'll need to replace this with your EmailJS template ID
        {
          to_email: 'mustafa@youremail.com', // Replace with your email
          visitor_time: visitorData.timestamp,
          visitor_page: visitorData.page,
          visitor_browser: visitorData.userAgent,
          visitor_referrer: visitorData.referrer || 'Direct visit',
        },
        'YOUR_PUBLIC_KEY' // You'll need to replace this with your EmailJS public key
      );
      console.log('Email notification sent successfully');
    } catch (error) {
      console.error('Failed to send email notification:', error);
    }
  };

  const sendBrowserNotification = (visitorData: VisitorData) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Website Visitor!', {
        body: `Someone visited your portfolio at ${new Date(visitorData.timestamp).toLocaleTimeString()}`,
        icon: '/favicon.ico',
      });
    }
  };

  const trackVisitor = async () => {
    if (!isEnabled || hasTracked) return;

    const visitorData: VisitorData = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      page: window.location.pathname,
    };

    // Store in localStorage for admin dashboard
    const existingVisitors = JSON.parse(localStorage.getItem('visitor_logs') || '[]');
    existingVisitors.unshift(visitorData);
    localStorage.setItem('visitor_logs', JSON.stringify(existingVisitors.slice(0, 100))); // Keep last 100 visits

    // Send notifications
    await sendEmailNotification(visitorData);
    sendBrowserNotification(visitorData);
    
    // Show toast if you're on the site
    toast({
      title: "New Visitor Detected!",
      description: `Someone is viewing your portfolio right now`,
    });

    setHasTracked(true);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    trackVisitor();
  }, [isEnabled]);

  return { trackVisitor };
};
