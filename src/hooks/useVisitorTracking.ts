
import { useEffect, useState } from 'react';
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
        'service_fhe62uc', // Your EmailJS service ID
        'template_nzokwut', // Your EmailJS template ID
        {
          to_email: 'mustafabarood06@gmail.com', // Your email from contact section
          visitor_time: visitorData.timestamp,
          visitor_page: visitorData.page,
          visitor_browser: visitorData.userAgent,
          visitor_referrer: visitorData.referrer || 'Direct visit',
        },
        'vkRwfJaiqA1TnYoS1' // Your EmailJS public key
      );
      console.log('Email notification sent successfully');
    } catch (error) {
      console.error('Failed to send email notification:', error);
      // Don't throw error - continue with other notifications
      // This prevents visitor tracking from failing completely
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

    try {
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

      // Send notifications (don't await to prevent blocking)
      sendEmailNotification(visitorData).catch(err => 
        console.warn('Email notification failed but continuing:', err)
      );
      sendBrowserNotification(visitorData);

      setHasTracked(true);
    } catch (error) {
      console.error('Visitor tracking failed:', error);
      // Still mark as tracked to prevent infinite retries
      setHasTracked(true);
    }
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
