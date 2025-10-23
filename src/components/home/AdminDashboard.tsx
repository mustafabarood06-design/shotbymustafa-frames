import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Settings, Trash2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface VisitorData {
  timestamp: string;
  userAgent: string;
  referrer: string;
  page: string;
}

export const AdminDashboard = () => {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadVisitors = () => {
      const visitorLogs = JSON.parse(localStorage.getItem('visitor_logs') || '[]');
      setVisitors(visitorLogs);
    };

    loadVisitors();
    // Refresh every 30 seconds
    const interval = setInterval(loadVisitors, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const clearLogs = () => {
    localStorage.removeItem('visitor_logs');
    setVisitors([]);
  };

  const getBrowserName = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-20 right-4 z-40">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-background/95 backdrop-blur-sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          Visitor Stats
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 w-96 max-h-[500px] z-40">
      <Card className="bg-background/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <Alert variant="destructive" className="mb-3">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Security Notice</AlertTitle>
            <AlertDescription className="text-xs">
              This visitor dashboard is publicly accessible. For production use, implement server-side authentication with Lovable Cloud.
            </AlertDescription>
          </Alert>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Visitor Dashboard</CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
              >
                ×
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{visitors.length} total visits</Badge>
            <Button onClick={clearLogs} variant="ghost" size="sm">
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="max-h-64 overflow-y-auto space-y-2">
          {visitors.length === 0 ? (
            <p className="text-sm text-muted-foreground">No visitors yet</p>
          ) : (
            visitors.map((visitor, index) => (
              <div
                key={index}
                className="text-xs p-2 border rounded-md space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {new Date(visitor.timestamp).toLocaleTimeString()}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {getBrowserName(visitor.userAgent)}
                  </Badge>
                </div>
                <div className="text-muted-foreground">
                  Page: {visitor.page || '/'}
                </div>
                {visitor.referrer && (
                  <div className="text-muted-foreground">
                    From: {new URL(visitor.referrer).hostname}
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
