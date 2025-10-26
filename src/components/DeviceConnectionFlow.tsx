import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Loader2, Bluetooth, Check } from 'lucide-react';

interface DeviceConnectionFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Device {
  id: string;
  name: string;
  type: string;
  connected: boolean;
}

export function DeviceConnectionFlow({ isOpen, onClose }: DeviceConnectionFlowProps) {
  const [step, setStep] = useState<'bluetooth' | 'detecting' | 'devices' | 'success'>('bluetooth');
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'Fitbit Inspire 3', type: 'fitness-tracker', connected: false },
    { id: '2', name: 'Apple Watch', type: 'smartwatch', connected: false },
    { id: '3', name: 'MoveBand X', type: 'fitness-band', connected: false }
  ]);

  const handleBluetoothCheck = () => {
    setStep('detecting');
    // Simulate detection delay
    setTimeout(() => {
      setStep('devices');
    }, 3000);
  };

  const handleDeviceConnect = (deviceId: string, deviceName: string) => {
    setSelectedDevice(deviceName);
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, connected: true } : device
    ));
    setStep('success');
  };

  const handleClose = () => {
    setStep('bluetooth');
    setSelectedDevice('');
    setDevices(prev => prev.map(device => ({ ...device, connected: false })));
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 'bluetooth':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Bluetooth className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-white mb-2">Connect New Device</h3>
              <p className="text-gray-300">
                Make sure your Bluetooth is on.
              </p>
            </div>
            <Button 
              onClick={handleBluetoothCheck}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Continue
            </Button>
          </div>
        );

      case 'detecting':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <div>
              <h3 className="text-white mb-2">Detecting Devices</h3>
              <p className="text-gray-300">
                Detecting nearby fitness devices...
              </p>
            </div>
          </div>
        );

      case 'devices':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-card-foreground mb-2">Available Devices</h3>
              <p className="text-muted-foreground">
                Select a device to connect
              </p>
            </div>
            <div className="space-y-3">
              {devices.map((device) => (
                <div 
                  key={device.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Bluetooth className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-card-foreground">{device.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {device.type.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeviceConnect(device.id, device.name)}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-card-foreground mb-2">Device Connected!</h3>
              <p className="text-muted-foreground">
                ✅ {selectedDevice} connected successfully!
              </p>
            </div>
            <Button 
              onClick={handleClose}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Done
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border shadow-2xl backdrop-blur-none">
        <DialogHeader>
          <DialogTitle className="text-white">
            {step === 'success' ? 'Success!' : 'Device Connection'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === 'success' ? 'Your device has been connected successfully' : 'Connect your fitness device to sync your activity data'}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}