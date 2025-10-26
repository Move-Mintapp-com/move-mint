import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Smartphone, 
  Watch, 
  Activity, 
  Heart,
  Clock
} from 'lucide-react';

interface DeviceConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeviceConnectionModal({ isOpen, onClose }: DeviceConnectionModalProps) {
  const devices = [
    {
      id: 'apple',
      name: 'Apple Watch',
      description: 'Connect with HealthKit for seamless step tracking',
      icon: Watch,
      available: true,
      popular: true
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      description: 'Sync your Fitbit data automatically',
      icon: Activity,
      available: true
    },
    {
      id: 'whoop',
      name: 'WHOOP',
      description: 'Track recovery and strain metrics',
      icon: Heart,
      available: false,
      comingSoon: true
    },
    {
      id: 'oura',
      name: 'Oura Ring',
      description: 'Sleep and recovery insights',
      icon: Clock,
      available: false,
      comingSoon: true
    },
    {
      id: 'googlefit',
      name: 'Google Fit',
      description: 'Android device integration',
      icon: Smartphone,
      available: true
    }
  ];

  const handleConnect = async (deviceId: string) => {
    // Mock API endpoints for different integrations
    const endpoints = {
      apple: '/api/integrations/apple',
      fitbit: '/api/integrations/fitbit',
      whoop: '/api/integrations/whoop',
      oura: '/api/integrations/oura',
      googlefit: '/api/integrations/googlefit'
    };

    try {
      // In a real app, this would handle OAuth flow
      console.log(`Connecting to ${endpoints[deviceId as keyof typeof endpoints]}`);
      // Simulate connection success
      alert(`${devices.find(d => d.id === deviceId)?.name} connected successfully!`);
      onClose();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border shadow-2xl backdrop-blur-none">
        <DialogHeader>
          <DialogTitle>Connect a Device</DialogTitle>
          <DialogDescription>
            Choose a fitness device to sync your activity data automatically
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {devices.map((device) => {
            const IconComponent = device.icon;
            
            return (
              <div 
                key={device.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{device.name}</span>
                      {device.popular && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                      {device.comingSoon && (
                        <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{device.description}</p>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  disabled={!device.available}
                  onClick={() => handleConnect(device.id)}
                  className="ml-4"
                >
                  {device.available ? 'Connect' : 'Soon'}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note for developers:</strong> Device integrations require backend OAuth and partner API access. 
            API endpoints are ready at the specified paths.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}