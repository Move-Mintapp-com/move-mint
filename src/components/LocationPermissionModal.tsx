import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { MapPin, Shield } from 'lucide-react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
  onDeny: () => void;
}

export function LocationPermissionModal({ isOpen, onClose, onAllow, onDeny }: LocationPermissionModalProps) {
  const handleAllow = () => {
    onAllow();
    onClose();
  };

  const handleDeny = () => {
    onDeny();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-md mx-auto bg-card border-border shadow-2xl backdrop-blur-none">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-xl text-white">Location Access</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Allow access to enhance your fitness tracking experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Allow Move-Mint to access your location to show nearby offers and track steps more accurately.
          </p>
          
          <div className="space-y-2 text-sm text-muted-foreground bg-muted/20 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Find partner stores near you</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Get location-based step tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Receive nearby offer notifications</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleAllow}
              className="w-full"
              size="lg"
            >
              Allow Location Access
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleDeny}
              className="w-full"
            >
              Don't Allow
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            You can change this permission later in your device settings.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}