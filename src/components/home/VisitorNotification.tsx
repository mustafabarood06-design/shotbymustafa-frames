
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

export const VisitorNotification = () => {
  // Enable tracking by default - you can make this configurable later
  useVisitorTracking(true);
  
  // This component doesn't render anything visible
  return null;
};

export default VisitorNotification;
